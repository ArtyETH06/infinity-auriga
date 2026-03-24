import { installTokenInterceptor, waitForToken } from './lib/auriga/auth.js';
import { isInfinityEnabled, setupToggle } from './lib/toggle.js';
import { boot } from './boot.js';

installTokenInterceptor();

async function main() {
    if (document.readyState === 'loading') {
        await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
    }

    // If user prefers Classique, just show the toggle and leave Auriga alone
    if (!isInfinityEnabled()) {
        setupToggle('classic');
        return;
    }

    // Wait for auth before touching the page.
    // If logged in: Angular refreshes the Keycloak token → interceptor fires → we proceed.
    // If not logged in: Angular redirects to Keycloak (different domain) → page navigates
    //   away and this promise never resolves, which is fine — our script dies with the navigation.
    await waitForToken();

    // Auth confirmed — take over the page
    import('./style.css');

    document.title = 'Infinity Auriga';
    while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
    for (const el of document.querySelectorAll('link[rel="stylesheet"], style:not([data-infinity])')) el.remove();

    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);

    await boot(container);
}

main().catch(err => console.error('[Infinity Auriga]', err));
