/**
 * Auriga API response schema — column mappings and line parsers.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  THIS IS THE SINGLE FILE TO UPDATE IF AURIGA CHANGES FORMAT.   │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * Auriga search endpoints return { content: { columns: [...], lines: [...] } }.
 * Each line is an array of values whose positions are defined below.
 *
 * GRADES endpoint (APP_040_010_MES_NOTES, e.g. menuEntry 1036):
 *   [0] internalId   [1] mark (string)  [2] coefficient  [3] examCode  [4] examType
 *
 * SYNTHESIS endpoint (APP_040_010_MES_NOTES_SYNT, e.g. menuEntry 1144):
 *   [0] personId     [1] avgPreRatt     [2] examCode      [3] caption {fr,en}  [4] avgFinal
 *
 * Last verified: 2026-03-24 against capture auriga-capture-1774299604740.json
 */

// --- Menu entry codes (how Auriga identifies its grade views) -------------------

export const MENU_CODES = {
    grades:    'APP_040_010_MES_NOTES',
    synthesis: 'APP_040_010_MES_NOTES_SYNT',
};

// --- Column indices -------------------------------------------------------------

const GRADES = { internalId: 0, mark: 1, coefficient: 2, examCode: 3, examType: 4 };
const SYNTHESIS = { personId: 0, avgPreRatt: 1, examCode: 2, caption: 3, avgFinal: 4 };

// --- Line parsers ---------------------------------------------------------------

/**
 * Parse a raw grade line into a named object.
 *
 * @param {Array} line - Raw array from Auriga searchResult
 * @returns {{ mark: number, coefficient: number, examCode: string, examType: string|null } | null}
 */
export function parseGradeLine(line) {
    const examCode = line[GRADES.examCode];
    if (!examCode || typeof examCode !== 'string') {
        console.warn('[Infinity] Unexpected grade line — examCode missing at index', GRADES.examCode, line);
        return null;
    }

    const mark = parseFloat(line[GRADES.mark]);
    if (isNaN(mark)) return null;

    return {
        mark,
        coefficient: line[GRADES.coefficient] || 100,
        examCode,
        examType: line[GRADES.examType] || null,
    };
}

/**
 * Parse a raw synthesis line into a named object.
 *
 * @param {Array} line - Raw array from Auriga searchResult
 * @returns {{ examCode: string, name: string, avgPreRatt: *, avgFinal: * } | null}
 */
export function parseSynthesisLine(line) {
    const examCode = line[SYNTHESIS.examCode];
    if (!examCode || typeof examCode !== 'string') {
        console.warn('[Infinity] Unexpected synthesis line — examCode missing at index', SYNTHESIS.examCode, line);
        return null;
    }

    const caption = line[SYNTHESIS.caption] || {};
    return {
        examCode,
        name: caption.fr || caption.en || examCode,
        avgPreRatt: line[SYNTHESIS.avgPreRatt],
        avgFinal: line[SYNTHESIS.avgFinal],
    };
}
