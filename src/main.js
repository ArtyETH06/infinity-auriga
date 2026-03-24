import { setAccessToken } from './lib/auriga/api.js';
import { isLogged } from './lib/auriga/auth.js';
import { isInfinityEnabled, setupToggle } from './lib/toggle.js';
import { boot } from './boot.js';

if (window.location.hostname === 'localhost') {
    setAccessToken('dev-mock-token');
}

async function main() {
    if (!isInfinityEnabled()) {
        // Show mock Auriga page + toggle
        const app = document.getElementById('app');
        app.remove();
        const mock = document.createElement('div');
        mock.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;height:100dvh;font-family:system-ui;background:#f0f1f3;color:#333;';
        const title = document.createElement('div');
        title.style.cssText = 'font-size:28px;font-weight:700;margin-bottom:12px;';
        title.textContent = 'Auriga';
        const sub = document.createElement('div');
        sub.style.cssText = 'font-size:15px;color:#888;';
        sub.textContent = 'Ceci est un aperçu de la page Auriga originale (mock)';
        mock.append(title, sub);
        document.body.appendChild(mock);
        setupToggle('classic');
        return;
    }

    await import('./style.css');

    if (!isLogged()) return;
    await boot(document.getElementById('app'));
}

main().catch(err => console.error('[Infinity Auriga]', err));
