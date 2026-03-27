/** Coefficient override system — applies community-contributed ECTS weights to Auriga's flat grades. */

import { app } from '../app.js';

const CDN_BASE = `${app.cdnBase}/coefficients`;

/** Bundled coefficients as fallback when CDN is unreachable. */
const bundled = import.meta.glob('../../coefficients/*.js');

/** Parse filename: s07_2526_fisa_cs.js → { semester, year, track, major } */
export function parseFilename(path) {
    const name = path.replace(/^.*\//, '').replace('.js', '');
    const parts = name.split('_');
    if (parts.length < 3) return null;
    return {
        semester: parts[0].toUpperCase(),
        year: parts[1],
        track: parts[2].toUpperCase(),
        major: parts[3]?.toUpperCase() || null,
    };
}

/** Parse raw JS module text into { meta, default } without eval. */
export function parseModuleText(text) {
    // Strip comments
    const clean = text.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
    const extractObject = (prefix) => {
        const idx = clean.indexOf(prefix);
        if (idx === -1) return null;
        const start = clean.indexOf('{', idx);
        if (start === -1) return null;
        let depth = 0, end = start;
        for (; end < clean.length; end++) {
            if (clean[end] === '{') depth++;
            else if (clean[end] === '}') { depth--; if (depth === 0) break; }
        }
        const raw = clean.slice(start, end + 1)
            .replace(/'/g, '"')                    // single → double quotes
            .replace(/(\w+)\s*:/g, '"$1":')        // unquoted keys
            .replace(/,\s*([}\]])/g, '$1');         // trailing commas
        return JSON.parse(raw);
    };
    return { meta: extractObject('const meta'), default: extractObject('export default') };
}

/** Build the expected filename for a semester/track/major combo. */
export function buildFilename(semester, year, track, major) {
    const parts = [semester.toLowerCase(), year, track.toLowerCase()];
    if (major) parts.push(major.toLowerCase());
    return parts.join('_') + '.js';
}

/** Try fetching a coefficient file from jsDelivr CDN. */
async function fetchRemote(filename) {
    const url = `${CDN_BASE}/${filename}`;
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) return null;
    const text = await res.text();
    return parseModuleText(text);
}

/** Try loading from bundled import.meta.glob. */
async function loadBundled(semester, year, track, wantMajor) {
    const hit = Object.entries(bundled).find(([path]) => {
        const f = parseFilename(path);
        if (!f) return false;
        return f.semester === semester && f.year === year && f.track === track
            && (wantMajor ? f.major?.toLowerCase() === wantMajor : !f.major);
    });
    if (!hit) return null;
    const mod = await hit[1]();
    return { meta: mod.meta, default: mod.default, file: hit[0].replace(/^.*\//, '') };
}

/** Load coefficients for a semester/track/major. Tries CDN first, falls back to bundled. */
export async function loadCoefficients(semesterKey, track, major = null) {
    const [semester, year] = semesterKey.split('_');
    const passes = major ? [major.toLowerCase(), null] : [null];

    for (const wantMajor of passes) {
        const filename = buildFilename(semester, year, track, wantMajor);

        // Try remote first
        try {
            const mod = await fetchRemote(filename);
            if (mod?.meta && mod.default) {
                const { meta } = mod;
                const metaOk = meta.semester?.toUpperCase() === semester
                    && meta.year === year && meta.track?.toUpperCase() === track
                    && (wantMajor ? meta.major?.toLowerCase() === wantMajor : !meta.major);
                if (metaOk) {
                    console.log(`[Infinity] Loaded coefficients from CDN: ${filename}`);
                    return { overrides: new Map(Object.entries(mod.default)), file: filename, meta };
                }
            }
        } catch { /* CDN unavailable, try bundled */ }

        // Fallback to bundled
        const local = await loadBundled(semester, year, track, wantMajor);
        if (local?.meta) {
            const { meta } = local;
            const metaOk = meta.semester?.toUpperCase() === semester
                && meta.year === year && meta.track?.toUpperCase() === track
                && (wantMajor ? meta.major?.toLowerCase() === wantMajor : !meta.major);
            if (metaOk) {
                console.log(`[Infinity] Loaded coefficients from bundle: ${local.file}`);
                return { overrides: new Map(Object.entries(local.default)), file: local.file, meta };
            }
        }
    }
    return null;
}

/** Generate a pre-filled template from the grade tree for contributors. */
export function generateTemplate(marks, semesterKey, track, major = null, overrides = null) {
    const [semester, year] = semesterKey.split('_');
    const majorSuffix = major ? `_${major}` : '';
    const filename = `${semesterKey}_${track}${majorSuffix}`.toLowerCase() + '.js';
    const yearLabel = `20${year.slice(0, 2)}/20${year.slice(2)}`;
    const majorLabel = major ? ` [${major.toUpperCase()}]` : '';

    const allCodes = marks.flatMap(mod => [mod._code, ...mod.subjects.map(s => s._code)]);
    const maxLen = Math.max(...allCodes.map(c => c.length));

    const lines = [
        `/**`,
        ` * Coefficients — ${semester} ${track}${majorLabel} ${yearLabel}`,
        ` * Filename: ${filename}`,
        ` */`,
        `export const meta = {`,
        `    semester: '${semester}',`,
        `    year: '${year}',`,
        `    track: '${track}',`,
        ...(major ? [`    major: '${major.toUpperCase()}',`] : [`    major: null,`]),
        `    name: '',  // TODO: fill in display name`,
        `};`,
        ``,
        `export default {`,
    ];

    const modsWithMarks = marks.filter(m => m.subjects.some(s => s.marks.length > 0));

    for (let i = 0; i < modsWithMarks.length; i++) {
        const mod = modsWithMarks[i];
        const rawCoef = overrides?.get(mod._code) ?? 1;
        const coef = typeof rawCoef === 'object' ? JSON.stringify(rawCoef) : rawCoef;
        const pad = ' '.repeat(Math.max(1, maxLen - mod._code.length));
        lines.push(`    '${mod._code}': ${coef},${pad} // ${mod.name}`);

        if (mod.subjects.length > 1) {
            if (!mod.subjects.some(s => overrides?.has(s._code))) {
                lines.push(`    // Uncomment below to override individual subjects:`);
            }
            for (const sub of mod.subjects) {
                const raw = overrides?.get(sub._code);
                const subPad = ' '.repeat(Math.max(1, maxLen - sub._code.length));
                if (raw != null) {
                    const val = typeof raw === 'object' ? JSON.stringify(raw) : raw;
                    lines.push(`    '${sub._code}': ${val},${subPad} // └ ${sub.name || sub.id}`);
                } else {
                    lines.push(`    // '${sub._code}': ?,${subPad} // └ ${sub.name || sub.id}`);
                }
            }
        }
        if (i < modsWithMarks.length - 1) lines.push('');
    }

    lines.push(`};`, '');
    return { filename, content: lines.join('\n') };
}

/** Apply coefficient overrides and compute all averages (mutates marks in place). */
export function applyCoefficients(marks, overrides) {
    function applyOverride(node) {
        if (!overrides?.has(node._code)) return;
        const val = overrides.get(node._code);
        if (typeof val === 'object' && val !== null) {
            node.coefficient = val.ects;
            if (val.name) node.name = val.name;
            if (val.module) node._promoteTo = val.module;
        } else {
            node.coefficient = val;
        }
        node._overridden = true;
    }

    function normalize(node) {
        applyOverride(node);
        if (!node.coefficient || node.coefficient === 100) node.coefficient = 1;
    }

    for (const mod of marks) {
        normalize(mod);
        for (const sub of mod.subjects) {
            normalize(sub);
            for (const mark of sub.marks) normalize(mark);
        }
    }

    // Promote subjects with _promoteTo to their own top-level module
    const promoted = new Map();
    for (const mod of marks) {
        const detached = mod.subjects.filter(s => s._promoteTo);
        if (!detached.length) continue;
        mod.subjects = mod.subjects.filter(s => !s._promoteTo);
        for (const sub of detached) {
            if (promoted.has(sub._promoteTo)) {
                promoted.get(sub._promoteTo).subjects.push(sub);
            } else {
                const newMod = {
                    id: sub.id, _code: sub._code, name: sub._promoteTo,
                    average: null, classAverage: sub.classAverage,
                    coefficient: sub.coefficient, _overridden: true,
                    subjects: [sub],
                };
                promoted.set(sub._promoteTo, newMod);
                marks.push(newMod);
            }
        }
    }

    // Bottom-up: marks → subjects → modules → overall
    for (const mod of marks) {
        for (const sub of mod.subjects) {
            let subTotal = 0, subWeight = 0;
            for (const mark of sub.marks) {
                if (mark.value != null && mark.value !== 0.01) { // 0.01 = justified absence
                    subTotal += mark.value * mark.coefficient;
                    subWeight += mark.coefficient;
                }
            }
            sub.average = subWeight > 0 ? subTotal / subWeight : null;
            if (!sub._overridden) sub.coefficient = subWeight || 1;
            if (subWeight > 0) {
                for (const mark of sub.marks) {
                    mark._rawCoefficient = mark.coefficient;
                    mark.coefficient /= subWeight;
                }
            }
        }

        let modTotal = 0, modWeight = 0;
        for (const sub of mod.subjects) {
            if (sub.average != null) {
                modTotal += sub.average * sub.coefficient;
                modWeight += sub.coefficient;
            }
        }
        mod.average = modWeight > 0 ? modTotal / modWeight : null;
        if (!mod._overridden) mod.coefficient = modWeight || 1;
    }

    let totalSum = 0, totalWeight = 0;
    for (const mod of marks) {
        if (mod.average != null) {
            totalSum += mod.average * mod.coefficient;
            totalWeight += mod.coefficient;
        }
    }
    return { average: totalWeight > 0 ? totalSum / totalWeight : null };
}
