import { apiFetch, fetchAllSearchResults } from './api.js';
import { buildNameLookup, buildGradeTree, parseExamCode } from './hierarchy.js';
import { parseGradeLine, parseSynthesisLine, validateParseResults, MENU_CODES } from './schema.js';

let _menuConfig = null;

async function getMenuConfig() {
    if (_menuConfig) return _menuConfig;

    const menus = await apiFetch('/menus');
    const entries = {};

    for (const menu of menus.menus) {
        for (const obj of menu.objects || []) {
            entries[obj.menuEntryCode] = {
                menuEntryId: obj.menuEntryId,
                queryId: obj.queryId,
                formId: obj.formId,
            };
        }
    }

    _menuConfig = {
        grades:    entries[MENU_CODES.grades],
        synthesis: entries[MENU_CODES.synthesis],
    };

    if (!_menuConfig.grades) {
        throw new Error(`Menu entries not found: grades (${MENU_CODES.grades}). `
            + `Available: ${Object.keys(entries).join(', ')}. `
            + `Auriga may have renamed its menu structure.`);
    }
    if (!_menuConfig.synthesis) {
        throw new Error(`Menu entries not found: synthesis (${MENU_CODES.synthesis}). `
            + `Available: ${Object.keys(entries).join(', ')}. `
            + `Auriga may have renamed its menu structure.`);
    }

    return _menuConfig;
}

let _cachedSynthesisEntries = null;

export async function getMarksFilters() {
    const config = await getMenuConfig();
    const synth = config.synthesis;
    const rawLines = await fetchAllSearchResults(synth.menuEntryId, synth.queryId);

    // Parse raw lines into typed objects at the boundary
    const entries = rawLines.map(parseSynthesisLine).filter(Boolean);
    validateParseResults('synthesis', rawLines, entries);
    _cachedSynthesisEntries = entries;

    const semesters = new Map();
    for (const entry of entries) {
        const parsed = parseExamCode(entry.examCode);
        if (!parsed) continue;

        const key = `${parsed.semester}_${parsed.year}`;
        if (!semesters.has(key)) {
            const semNum = parsed.semester.replace('S', '');
            const yearStart = '20' + parsed.year.substring(0, 2);
            const yearEnd = '20' + parsed.year.substring(2, 4);
            semesters.set(key, {
                name: `Semestre ${semNum} - ${yearStart}/${yearEnd}`,
                value: key,
            });
        }
    }

    return [{
        id: 'semester',
        name: 'Semestre',
        values: Array.from(semesters.values()).sort((a, b) => b.value.localeCompare(a.value)),
    }];
}

export async function getMarks(filters) {
    const semFilter = filters.semester;
    if (!semFilter) throw new Error('No semester selected');

    const [semester, year] = semFilter.split('_');

    const config = await getMenuConfig();

    // Fetch + parse grades at the boundary
    const rawGrades = await fetchAllSearchResults(config.grades.menuEntryId, config.grades.queryId);
    const gradeEntries = rawGrades.map(parseGradeLine).filter(Boolean);
    validateParseResults('grades', rawGrades, gradeEntries);

    const filteredGrades = gradeEntries.filter(g => {
        const parsed = parseExamCode(g.examCode);
        return parsed && parsed.year === year && parsed.semester === semester;
    });

    // Fetch + parse synthesis (use cache if available)
    let synthesisEntries = _cachedSynthesisEntries;
    if (!synthesisEntries) {
        const rawSynth = await fetchAllSearchResults(config.synthesis.menuEntryId, config.synthesis.queryId);
        synthesisEntries = rawSynth.map(parseSynthesisLine).filter(Boolean);
        validateParseResults('synthesis', rawSynth, synthesisEntries);
    }

    const filteredSynthesis = synthesisEntries.filter(e => {
        const parsed = parseExamCode(e.examCode);
        return parsed && parsed.year === year && parsed.semester === semester;
    });

    // Use ALL synthesis entries for name resolution (cross-semester names)
    // but filtered synthesis for averages
    const nameLookup = buildNameLookup(synthesisEntries);
    const marks = buildGradeTree(filteredGrades, nameLookup);

    // Extract promo average from synthesis data
    let classAverage = null;
    const promoValues = filteredSynthesis
        .filter(e => e.avgPreRatt != null)
        .map(e => parseFloat(e.avgPreRatt))
        .filter(v => !isNaN(v) && v > 0);
    if (promoValues.length > 0) {
        classAverage = promoValues.reduce((s, v) => s + v, 0) / promoValues.length;
    }

    return { classAverage, marks };
}
