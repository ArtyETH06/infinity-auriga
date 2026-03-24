/**
 * Coefficient override system.
 *
 * Auriga returns all coefficients as 100 (equal weight).
 * This module provides the real coefficients per exam code.
 *
 * To add coefficients for a new semester:
 *   1. Create src/lib/coefficients/{semester}_{year}_{track}.js  (e.g. s07_2526_fisa.js)
 *   2. Export a default object mapping exam codes to their coefficient.
 *   3. Open a PR. That's it — no registry to update.
 *
 * Filename convention: s{semester}_{year}_{track}.js (all lowercase)
 *   → looked up as S{SEMESTER}_{YEAR}_{TRACK}
 *
 * Only exams with non-default coefficients need to be listed (default is 1).
 */

// Auto-discover all coefficient files at build time (Vite glob import)
const modules = import.meta.glob('./*.js', { import: 'default' });

/**
 * Load coefficient overrides for a semester/track combo.
 * Returns { overrides: Map, file: string } or null.
 */
export async function loadCoefficients(semesterKey, track) {
    // semesterKey = "S07_2526", track = "FISA" → filename = "s07_2526_fisa.js"
    const file = `${semesterKey}_${track}`.toLowerCase() + '.js';
    const loader = modules[`./${file}`];
    if (!loader) return null;
    const data = await loader();
    return { overrides: new Map(Object.entries(data)), file };
}

/**
 * Apply coefficient overrides to marks, then recompute all averages.
 * If no overrides, uses the raw API coefficients.
 *
 * @param {Module[]} marks - grade tree (mutated in place)
 * @param {Map|null} overrides - from loadCoefficients
 * @returns {{ average: number|null }}
 */
export function applyCoefficients(marks, overrides) {
    // Apply overrides to individual marks
    for (const mod of marks) {
        for (const sub of mod.subjects) {
            for (const mark of sub.marks) {
                if (overrides && mark._code && overrides.has(mark._code)) {
                    mark.coefficient = overrides.get(mark._code);
                }
                // If no override and API gave 100 (uniform), default to 1
                if (mark.coefficient === 100) mark.coefficient = 1;
            }
        }
    }

    // Recompute averages bottom-up
    let totalAvg = 0;
    let totalMods = 0;

    for (const mod of marks) {
        let modTotal = 0;
        let modWeight = 0;

        for (const sub of mod.subjects) {
            let subTotal = 0;
            let subWeight = 0;

            for (const mark of sub.marks) {
                if (mark.value != null && mark.value !== 0.01) {
                    subTotal += mark.value * mark.coefficient;
                    subWeight += mark.coefficient;
                }
            }

            sub.average = subWeight > 0 ? subTotal / subWeight : null;

            // Normalize coefficients for display (fractions)
            if (subWeight > 0) {
                for (const mark of sub.marks) {
                    mark.coefficient = mark.coefficient / subWeight;
                }
            }

            if (sub.average != null) {
                modTotal += sub.average;
                modWeight += 1;
            }
        }

        mod.average = modWeight > 0 ? modTotal / modWeight : null;

        if (mod.average != null) {
            totalAvg += mod.average;
            totalMods += 1;
        }
    }

    return { average: totalMods > 0 ? totalAvg / totalMods : null };
}
