/**
 * Parse an Auriga exam code into its hierarchical components.
 *
 * Code anatomy:
 *   2526_I_INF_FISA_S07_CS_GR_WS_EX
 *   │    │ │   │    │   └── path segments ──┘ └─ evalType
 *   [0]  1 2   3    4       5...               last (if in EVAL_TYPES)
 *
 *   [0] year       — academic year (25/26)
 *   [1] constant   — always "I"
 *   [2] school     — school code (INF for EPITA informatique)
 *   [3] track      — FISA, FISE, GISTRE, ...
 *   [4] semester   — S07, S08, ...
 *   [5+] path      — module / subject / exam segments
 *   [last] evalType — EX, PRJ, etc. (stripped from path if recognized)
 */

// Recognized evaluation type suffixes.
// Used as fallback when the API doesn't provide examType in a separate column.
const EVAL_TYPES = new Set(['EX', 'PRJ', 'EXF', 'EXO', 'FAF', 'PROJ']);

/**
 * @param {string} code - The full exam code
 * @param {string|null} [apiExamType] - Exam type from the API column (skips guessing when present)
 */
export function parseExamCode(code, apiExamType = null) {
    const parts = code.split('_');
    if (parts.length < 5) return null;

    const year = parts[0];
    const school = parts[2];
    const track = parts[3];
    const semester = parts[4];
    const rest = parts.slice(5);

    let evalType = apiExamType;
    let path = rest;

    // If the API didn't provide examType, detect it from the code suffix
    if (!evalType && rest.length > 0 && EVAL_TYPES.has(rest[rest.length - 1])) {
        evalType = rest[rest.length - 1];
        path = rest.slice(0, -1);
    }

    return { year, school, track, semester, path, evalType, fullCode: code };
}

/**
 * Build a name lookup from parsed synthesis entries.
 *
 * @param {{ examCode: string, name: string, avgPreRatt: *, avgFinal: * }[]} entries
 * @returns {Map<string, { name: string, avgPreRatt: *, avgFinal: * }>}
 */
export function buildNameLookup(entries) {
    const lookup = new Map();
    for (const entry of entries) {
        lookup.set(entry.examCode, {
            name: entry.name,
            avgPreRatt: entry.avgPreRatt,
            avgFinal: entry.avgFinal,
        });
    }
    return lookup;
}

/**
 * Find the subject grouping level for a grade path.
 *
 * Subject is always the first 2 path segments (Module > Subject):
 *   CS_FR_MSE       -> subject = CS_FR
 *   CS_SAE_INT_PEN  -> subject = CS_SAE
 *   CS_SAE_INT_MAS  -> subject = CS_SAE  <- grouped!
 *   CS_CN_AI4SEC    -> subject = CS_CN
 */
function findSubjectLevel(prefix, path) {
    if (path.length >= 2) {
        const id = path.slice(0, 2).join('_');
        return { id, code: `${prefix}_${id}` };
    }

    return { id: path[0] || 'TC', code: `${prefix}_${path[0] || 'TC'}` };
}

/**
 * Resolve a name from the lookup, falling back to cross-semester suffix matching.
 */
function resolveName(code, suffix, nameLookup) {
    let info = nameLookup.get(code);
    if (info) return info;

    let bestPartial = null;
    let bestPartialLen = Infinity;
    for (const [key, val] of nameLookup) {
        if (key.endsWith(suffix)) return val;
        const idx = key.indexOf(suffix + '_');
        if (idx !== -1 && key.length < bestPartialLen) {
            bestPartial = val;
            bestPartialLen = key.length;
        }
    }
    return bestPartial;
}

/**
 * Build the grade tree from parsed grade entries.
 *
 * Module = 1st path segment (CS, AG, PL, PR, etc.)
 * Subject = deepest named ancestor in the hierarchy (auto-detected)
 * Mark = individual grade
 *
 * @param {{ mark: number, coefficient: number, examCode: string, examType: string|null }[]} grades
 * @param {Map} nameLookup - From buildNameLookup()
 */
export function buildGradeTree(grades, nameLookup) {
    const modules = new Map();

    for (const grade of grades) {
        const parsed = parseExamCode(grade.examCode, grade.examType);
        if (!parsed) continue;

        const { semester, path, school } = parsed;
        // Build prefix dynamically from the code — no hardcoded school
        const prefix = `${parsed.year}_I_${school}_${parsed.track}_${semester}`;

        const moduleId = path[0] || 'TC';
        const moduleCode = `${prefix}_${moduleId}`;

        const subject = findSubjectLevel(prefix, path);

        if (!modules.has(moduleCode)) {
            const info = resolveName(moduleCode, '_' + moduleId, nameLookup);
            // API names for top-level modules are often long obligation titles like
            // "Ingénieur en informatique ... en cybersécurité semestre 07 (Promo 2027)"
            // Extract the specialty keyword (last word before "semestre") as a short name
            let name = moduleId;
            if (info) {
                if (info.name.length <= 40) {
                    name = info.name;
                } else {
                    const m = info.name.match(/en\s+(\S+)\s+semestre/i);
                    if (m) name = m[1].charAt(0).toUpperCase() + m[1].slice(1);
                }
            }
            modules.set(moduleCode, {
                id: moduleId,
                _code: moduleCode,
                name,
                credits: 0,
                average: null,
                classAverage: null,
                subjects: new Map(),
            });
        }

        const mod = modules.get(moduleCode);

        if (!mod.subjects.has(subject.code)) {
            const info = resolveName(subject.code, '_' + subject.id, nameLookup);
            mod.subjects.set(subject.code, {
                id: subject.id,
                _code: subject.code,
                name: info && info.name.length <= 40 ? info.name : subject.id.replace(/_/g, ' '),
                average: null,
                classAverage: null,
                coefficient: 1,
                marks: [],
            });
        }

        const sub = mod.subjects.get(subject.code);

        // Deduplicate: skip if same exam code already added
        if (sub.marks.some(m => m._code === grade.examCode)) continue;

        const examInfo = nameLookup.get(grade.examCode);
        const promoAvg = examInfo?.avgPreRatt ? parseFloat(examInfo.avgPreRatt) : null;
        sub.marks.push({
            id: sub.marks.length,
            _code: grade.examCode,
            name: examInfo ? examInfo.name : (parsed.evalType || 'Note'),
            value: grade.mark,
            classAverage: isNaN(promoAvg) ? null : promoAvg,
            coefficient: grade.coefficient,
        });
    }

    // Convert Maps to arrays and compute averages
    const result = [];
    for (const [, mod] of modules) {
        mod.subjects = [...mod.subjects.values()];
        result.push(mod);
    }

    return result;
}
