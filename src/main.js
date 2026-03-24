import './style.css';
import { setAccessToken } from './lib/auriga/api';
import { isLogged, getName } from './lib/auriga/auth';
import { getMarks, getMarksFilters } from './lib/auriga/marks';
import { getUpdates } from './lib/updates';
import { renderApp } from './render';
import SpinnerSvg from './assets/images/spinner.svg?raw';

if (window.location.hostname === 'localhost') {
    setAccessToken('dev-mock-token');

    // Seed previous S08 grades to test diff system
    // These are "old" values - the mock API returns different ones
    // so the update tracker will detect: new grades, changed values
    if (!localStorage.getItem('auriga_marks_save')) {
        // Seed with old S08 data matching exact API structure
        // Different values trigger "update" diffs, missing grades trigger "add"
        const oldS08 = {
            '{"semester":"S08_2526"}': [
                { id: 'AEE8', name: 'Apprentissage en entreprise', average: 15.50, subjects: [
                    { id: 'AEE8', name: 'Evaluation de l\'apprentissage en entreprise', average: 15.50, marks: [
                        { id: 0, name: 'Evaluation de l\'apprentissage en entreprise', value: 15.50, coefficient: 1 }
                    ]}
                ]},
                { id: 'AG', name: 'Agir', average: 14.00, subjects: [
                    { id: 'AG_ANGLA', name: 'AG ANGLA', average: 16.00, marks: [
                        { id: 0, name: 'Anglais-4', value: 16.00, coefficient: 1 }
                    ]},
                    { id: 'AG_MIN', name: 'Mineure internationale', average: 10.00, marks: [
                        { id: 0, name: 'Mineure internationale', value: 10.00, coefficient: 1 }
                    ]},
                    { id: 'AG_MSST', name: 'S\u00e9curit\u00e9 et sant\u00e9 au travail', average: 16.00, marks: [
                        { id: 0, name: 'S\u00e9curit\u00e9 et sant\u00e9 au travail', value: 16.00, coefficient: 1 }
                    ]}
                ]},
                { id: 'CN', name: 'Concevoir', average: 13.13, subjects: [
                    { id: 'CN_ALGA', name: 'Algorithmie avanc\u00e9e', average: 14.75, marks: [
                        { id: 0, name: 'Algorithmie avanc\u00e9e', value: 14.75, coefficient: 1 }
                    ]},
                    { id: 'CN_PBS1', name: 'Probabilit\u00e9 et statistiques 1', average: 11.50, marks: [
                        { id: 0, name: 'Probabilit\u00e9 et statistiques 1', value: 11.50, coefficient: 1 }
                    ]}
                ]},
                { id: 'CS', name: 'CS', average: 14.50, subjects: [
                    { id: 'CS_GR', name: 'G\u00e9rer', average: 13.00, marks: [
                        { id: 0, name: 'Forensics', value: 14.00, coefficient: 0.5 },
                        { id: 1, name: 'Forensics - Projet en groupe', value: 15.00, coefficient: 0.5 },
                        { id: 2, name: 'S\u00e9curit\u00e9 Web: Analyses et D\u00e9fenses - QCM', value: 9.50, coefficient: 0.5 },
                        { id: 3, name: 'S\u00e9curit\u00e9 Web: Analyses et D\u00e9fenses', value: 14.50, coefficient: 0.5 }
                    ]}
                ]},
            ]
        };
        localStorage.setItem('auriga_marks_save', JSON.stringify(oldS08));
        localStorage.setItem('auriga_filters', JSON.stringify({ semester: 'S08_2526' }));
    }
}

const container = document.getElementById('app');
let state = { name: null, marks: [], averages: {}, filters: [], filtersValues: {}, updates: [] };

async function load() {
    showLoading('Chargement...');
    if (isLogged()) {
        state.name = await getName().catch(() => 'Etudiant');
        state.filters = await getMarksFilters();
        const saved = localStorage.getItem('auriga_filters');
        if (saved) state.filtersValues = JSON.parse(saved);
        else if (state.filters[0]?.values.length > 0) state.filtersValues = { semester: state.filters[0].values.at(-1).value };
        await refresh();
    }
}

async function refresh() {
    showLoading('Recuperation des notes...');
    const result = await getMarks(state.filtersValues);
    state.marks = result.marks;
    state.averages = { student: result.average, promo: result.classAverage };
    state.updates = await getUpdates(state.filtersValues, state.marks);
    render();
}

function changeSemester(val) {
    state.filtersValues = { semester: val };
    localStorage.setItem('auriga_filters', JSON.stringify(state.filtersValues));
    refresh();
}

function showLoading(msg) {
    while (container.firstChild) container.removeChild(container.firstChild);
    const div = document.createElement('div');
    div.className = 'loading';
    div.style.cssText = 'flex-direction:column;align-items:center;justify-content:center;flex-grow:1;';
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.innerHTML = SpinnerSvg;
    const text = document.createElement('div');
    text.className = 'subtitle';
    text.textContent = msg;
    div.appendChild(spinner);
    div.appendChild(text);
    container.appendChild(div);
}

function render() {
    renderApp(container, { ...state, onSemesterChange: changeSemester });
}

load().catch(err => {
    console.error('[Infinity Auriga]', err);
    container.textContent = 'Erreur: ' + err.message;
});
