/**
 * Tooltip + click-to-copy for exam codes.
 */

import { h } from './dom.js';

let _tooltip = null;

export function showTooltip(anchor, text, type) {
    if (!_tooltip) {
        _tooltip = h('div', { class: 'code-tooltip' });
        document.body.appendChild(_tooltip);
    }
    _tooltip.textContent = text;
    _tooltip.className = 'code-tooltip ' + (type || '');
    _tooltip.style.opacity = '1';
    const rect = anchor.getBoundingClientRect();
    _tooltip.style.left = rect.left + 'px';
    _tooltip.style.top = (rect.top - _tooltip.offsetHeight - 6) + 'px';
    // If tooltip overflows right, shift left
    const tipRect = _tooltip.getBoundingClientRect();
    if (tipRect.right > window.innerWidth - 8) {
        _tooltip.style.left = (window.innerWidth - 8 - tipRect.width) + 'px';
    }
}

export function hideTooltip() {
    if (_tooltip) _tooltip.style.opacity = '0';
}

export function copyCodeEl(code, label) {
    if (!code) return h('span', {}, label);
    let copyTimeout = null;
    const el = h('span', {
        class: 'copy-code clickable',
        onmouseenter: () => { if (!copyTimeout) showTooltip(el, code); },
        onmouseleave: () => { if (!copyTimeout) hideTooltip(); },
        onclick: () => {
            navigator.clipboard.writeText(code);
            showTooltip(el, 'Copié !', 'copied');
            clearTimeout(copyTimeout);
            copyTimeout = setTimeout(() => { copyTimeout = null; hideTooltip(); }, 1200);
        }
    }, label);
    return el;
}
