import { apiFetch, fetchAllSearchResults } from './api.js';
import { buildNameLookup, buildGradeTree, parseExamCode } from './hierarchy.js';

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
        grades: entries['APP_040_010_MES_NOTES'],
        synthesis: entries['APP_040_010_MES_NOTES_SYNT'],
    };

    return _menuConfig;
}

let _cachedSynthesisLines = null;

export async function getMarksFilters() {
    const config = await getMenuConfig();
    const synth = config.synthesis;
    const lines = await fetchAllSearchResults(synth.menuEntryId, synth.queryId);
    const semesters = new Map();
    for (const line of lines) {
        const code = line[2];
        const parsed = parseExamCode(code);
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

    _cachedSynthesisLines = lines;

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
    const semesterPrefix = `${year}_I_INF_`;

    const config = await getMenuConfig();
    const grades = config.grades;
    const gradeLines = await fetchAllSearchResults(grades.menuEntryId, grades.queryId);

    const filteredGrades = gradeLines.filter(line => {
        const code = line[3];
        return code && code.startsWith(semesterPrefix) && code.includes(`_${semester}_`);
    });
    let synthesisLines = _cachedSynthesisLines;
    if (!synthesisLines) {
        const synth = config.synthesis;
        synthesisLines = await fetchAllSearchResults(synth.menuEntryId, synth.queryId);
    }

    const filteredSynthesis = synthesisLines.filter(line => {
        const code = line[2];
        return code && code.startsWith(semesterPrefix) && code.includes(`_${semester}`);
    });

    // Use ALL synthesis lines for name resolution (cross-semester names like CS_CN → "Concevoir")
    // but filtered synthesis for averages
    const nameLookup = buildNameLookup(synthesisLines);
    const marks = buildGradeTree(filteredGrades, nameLookup);
    const validModules = marks.filter(m => m.average != null);
    let average = null;
    if (validModules.length > 0) {
        average = validModules.reduce((s, m) => s + m.average, 0) / validModules.length;
    }

    // Extract promo average from synthesis data (avgPreRatt field)
    let classAverage = null;
    const promoValues = filteredSynthesis
        .filter(l => l[1] != null)
        .map(l => parseFloat(l[1]))
        .filter(v => !isNaN(v) && v > 0);
    if (promoValues.length > 0) {
        classAverage = promoValues.reduce((s, v) => s + v, 0) / promoValues.length;
    }

    return {
        average,
        classAverage,
        marks,
    };
}
