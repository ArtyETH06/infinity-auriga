/**
 * Parse an Auriga exam code into its hierarchical components.
 *
 * Codes follow: {year}_{?}_{school}_{track}_{semester}_{...path}_{evalType}
 * The format is consistent across all tracks (FISA, FISE, GISTRE, etc.)
 */

const EVAL_TYPES = new Set(['EX', 'PRJ', 'EXF', 'EXO', 'FAF', 'PROJ']);

export function parseExamCode(code) {
    const parts = code.split('_');
    if (parts.length < 5) return null;

    const year = parts[0];
    const track = parts[3];
    const semester = parts[4];
    const rest = parts.slice(5);

    let evalType = null;
    let path = rest;

    if (rest.length > 0 && EVAL_TYPES.has(rest[rest.length - 1])) {
        evalType = rest[rest.length - 1];
        path = rest.slice(0, -1);
    }

    return { year, track, semester, path, evalType, fullCode: code };
}

/**
 * Build a name lookup from synthesis lines (menuEntry 1144).
 */
export function buildNameLookup(lines) {
    const lookup = new Map();
    for (const line of lines) {
        const code = line[2];
        const caption = line[3] || {};
        lookup.set(code, {
            name: caption.fr || caption.en || code,
            avgPreRatt: line[1],
            avgFinal: line[4],
        });
    }
    return lookup;
}

/**
 * Find the best subject grouping level for a grade path.
 *
 * Walks the path upward from one level above the leaf, looking for the
 * deepest code that has a name in the lookup. This groups related grades:
 *   CS_FR_MSE       -> subject = CS_FR ("Formaliser")
 *   CS_SAE_INT_PEN  -> subject = CS_SAE_INT ("Tests d'intrusions")
 *   CS_SAE_INT_MAS  -> subject = CS_SAE_INT ("Tests d'intrusions")  <- grouped!
 *   CS_CN_AI4SEC    -> subject = CS_CN (fallback, groups with COCO)
 */
function findSubjectLevel(prefix, path, nameLookup) {
    // Start one level up from leaf to ensure grouping
    for (let depth = path.length - 1; depth >= 2; depth--) {
        const candidateId = path.slice(0, depth).join('_');
        const candidateCode = `${prefix}_${candidateId}`;
        if (nameLookup.has(candidateCode)) {
            return { id: candidateId, code: candidateCode };
        }
    }

    // Fallback: use first 2 segments if available
    if (path.length >= 2) {
        const id = path.slice(0, 2).join('_');
        return { id, code: `${prefix}_${id}` };
    }

    // Single segment: subject = module
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
 * Build the grade tree from API data.
 *
 * Module = 1st path segment (CS, AG, PL, PR, etc.)
 * Subject = deepest named ancestor in the hierarchy (auto-detected)
 * Mark = individual grade
 */
export function buildGradeTree(gradeLines, nameLookup) {
    const modules = new Map();

    for (const line of gradeLines) {
        const [, markStr, coef, examCode] = line;
        const parsed = parseExamCode(examCode);
        if (!parsed) continue;

        const mark = parseFloat(markStr);
        if (isNaN(mark)) continue;

        const { semester, path } = parsed;
        const prefix = `${parsed.year}_I_INF_${parsed.track}_${semester}`;

        const moduleId = path[0] || 'TC';
        const moduleCode = `${prefix}_${moduleId}`;

        const subject = findSubjectLevel(prefix, path, nameLookup);

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
        if (sub.marks.some(m => m._code === examCode)) continue;

        const examInfo = nameLookup.get(examCode);
        const promoAvg = examInfo?.avgPreRatt ? parseFloat(examInfo.avgPreRatt) : null;
        sub.marks.push({
            id: sub.marks.length,
            _code: examCode,
            name: examInfo ? examInfo.name : (parsed.evalType || 'Note'),
            value: mark,
            classAverage: isNaN(promoAvg) ? null : promoAvg,
            coefficient: coef || 100,
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
