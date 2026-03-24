/**
 * Loading screen with animated spinner and status messages.
 */

import { h, html, topTriangle, bottomTriangle, LogoSvg, SpinnerSvg } from './dom.js';
import { renderFooter } from './components.js';

const LOADING_QUOTES = [
    'Auriga va moins vite que votre grand-mère...',
    'On négocie avec le serveur...',
    'Pendant ce temps, les profs corrigent vos copies...',
    'Chargement plus rapide qu\'un rendu de projet EPITA...',
    'Patience, même Auriga a besoin de café le matin...',
    'Calcul de votre moyenne... priez.',
    'On hack le système pour vous (légalement)...',
    'Les notes arrivent... comme les bus, par paquets.',
    'Optimisation en cours... contrairement à votre code.',
    'Bientôt prêt, promis (pas comme vos deadlines).',
];

export function renderLoadingScreen(container, message) {
    container.replaceChildren();

    container.appendChild(h('div', { id: 'background' },
        html('div', { id: 'top-triangle', class: 'triangle' }, topTriangle),
        html('div', { id: 'bottom-triangle', class: 'triangle' }, bottomTriangle)
    ));

    const quote = LOADING_QUOTES[Math.floor(Math.random() * LOADING_QUOTES.length)];
    const stepLabel = h('div', { class: 'loading-step' }, message || 'Chargement...');
    const requestLabel = h('div', { class: 'loading-request' });
    const quoteLabel = h('div', { class: 'loading-quote' }, quote);

    const loading = h('div', { class: 'loading' },
        html('div', { class: 'spinner' }, SpinnerSvg),
        stepLabel,
        requestLabel,
        quoteLabel
    );

    container.appendChild(h('div', { id: 'content', class: 'variable' },
        h('div', { id: 'header' },
            html('div', { id: 'logo', class: 'variable' }, LogoSvg)
        ),
        h('div', { id: 'main' }, loading),
        renderFooter()
    ));

    return {
        step(text) { stepLabel.textContent = text; requestLabel.textContent = ''; },
        request(url) { requestLabel.textContent = url; },
    };
}
