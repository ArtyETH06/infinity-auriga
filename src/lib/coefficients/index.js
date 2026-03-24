/**
 * Coefficient override system.
 *
 * Auriga returns all coefficients as 100 (equal weight).
 * This module provides the real coefficients per exam code.
 * Contributors add/update coefficient files per semester via PR.
 *
 * Each file exports an object mapping exam codes to their coefficient.
 * Only exams with non-default coefficients need to be listed (default is 1).
 */

const registry = {
    'S07_2526_FISA': { loader: () => import('./s7_fisa_2526.js'), file: 's7_fisa_2526.js' },
};

/**
 * Load coefficient overrides for a semester/track combo.
 * Returns { overrides: Map<examCode, coefficient>, file: string } or null.
 */
export async function loadCoefficients(semesterKey, track) {
    const entry = registry[`${semesterKey}_${track}`];
    if (!entry) return null;
    const mod = await entry.loader();
    return { overrides: new Map(Object.entries(mod.default)), file: entry.file };
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
