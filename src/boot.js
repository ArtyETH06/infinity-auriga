import { setApiRequestHook } from './lib/auriga/api.js';
import { loadSession, fetchMarksAndUpdates, saveSemesterFilter } from './lib/session.js';
import { setupToggle } from './lib/toggle.js';

/**
 * Shared boot sequence for both dev (main.js) and prod (userscript-entry.js).
 *
 * Both entry points handle their own environment setup (mock tokens, DOM takeover,
 * token interception, etc.) then call this function with a ready container.
 *
 * Flow: setupToggle → loadSession → refresh loop (fetch marks → render)
 *
 * @param {HTMLElement} container - The #app element, already in the DOM
 */
export async function boot(container) {
    setupToggle('infinity');

    const { renderLoadingScreen, renderApp } = await import('./render/index.js');

    const status = renderLoadingScreen(container, 'Chargement...');
    setApiRequestHook((url) => status.request(url));

    const session = await loadSession(status);
    let { filtersValues } = session;
    const { name, filters } = session;

    async function refresh() {
        const s = renderLoadingScreen(container);
        setApiRequestHook((url) => s.request(url));
        const data = await fetchMarksAndUpdates(filtersValues, s);
        renderApp(container, {
            name, filters, filtersValues,
            ...data,
            onSemesterChange(value) {
                filtersValues = saveSemesterFilter(value);
                refresh();
            },
        });
    }

    await refresh();
}
