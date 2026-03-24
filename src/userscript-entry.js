import './style.css';
import { installTokenInterceptor, waitForToken } from './lib/auriga/auth';
import { setAccessToken } from './lib/auriga/api';
import { isLogged, getName } from './lib/auriga/auth';
import { getMarks, getMarksFilters } from './lib/auriga/marks';
import { getUpdates } from './lib/updates';
import { renderApp } from './render';

installTokenInterceptor();

async function main() {
    const hasToken = await waitForToken(60000);
    if (!hasToken) return;

    if (document.readyState === 'loading') {
        await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
    }

    document.title = 'Infinity Auriga';
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);

    for (const el of document.querySelectorAll('link[rel="stylesheet"], style')) el.remove();

    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);

    const name = await getName().catch(() => 'Etudiant');
    const filters = await getMarksFilters();
    let filtersValues = {};
    const saved = localStorage.getItem('auriga_filters');
    if (saved) filtersValues = JSON.parse(saved);
    else if (filters[0]?.values.length > 0) filtersValues = { semester: filters[0].values.at(-1).value };

    async function refresh() {
        const result = await getMarks(filtersValues);
        const updates = await getUpdates(filtersValues, result.marks);
        renderApp(container, {
            name, marks: result.marks,
            averages: { student: result.average, promo: result.classAverage },
            filters, filtersValues, updates,
            onSemesterChange: (val) => {
                filtersValues = { semester: val };
                localStorage.setItem('auriga_filters', JSON.stringify(filtersValues));
                refresh();
            },
        });
    }

    await refresh();
}

main().catch(err => console.error('[Infinity Auriga]', err));
