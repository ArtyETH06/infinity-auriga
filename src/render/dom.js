/**
 * Lightweight DOM helpers and grade formatting utilities.
 *
 * These are stable, low-level building blocks used by all render modules.
 */

import topTriangle from '../assets/images/top_triangle.svg?raw';
import bottomTriangle from '../assets/images/bottom_triangle.svg?raw';
import LogoSvg from '../assets/images/logo.svg?raw';
import SpinnerSvg from '../assets/images/spinner.svg?raw';
import ComboBoxArrowSvg from '../assets/images/combo_box_arrow.svg?raw';
import UpdateArrowSvg from '../assets/images/update_arrow.svg?raw';
import IncreaseArrowSvg from '../assets/images/increase_arrow.svg?raw';
import DecreaseArrowSvg from '../assets/images/decrease_arrow.svg?raw';
import PlusSvg from '../assets/images/plus.svg?raw';
import MinusSvg from '../assets/images/minus.svg?raw';

// Re-export SVGs for use by other render modules
export { topTriangle, bottomTriangle, LogoSvg, SpinnerSvg, ComboBoxArrowSvg };
export { UpdateArrowSvg, IncreaseArrowSvg, DecreaseArrowSvg, PlusSvg, MinusSvg };

// SECURITY NOTE: All innerHTML usage across render modules injects only build-time
// SVG imports (Vite ?raw string literals), never user-supplied content.

export function h(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === 'class') el.className = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
        else el.setAttribute(k, v);
    }
    for (const c of children.flat()) {
        if (c == null) continue;
        el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
}

/**
 * Create an element and set its innerHTML to a trusted build-time SVG string.
 * Only use with Vite ?raw imports — never with user-supplied content.
 */
export function html(tag, attrs, trustedSvg) {
    const el = h(tag, attrs);
    // Safe: trustedSvg is always a build-time ?raw import, not user input
    el.innerHTML = trustedSvg;
    return el;
}

export function gradeColor(value) {
    if (value === 0.01) return '#666670';
    if (value == null) return 'auto';
    const yellow = [255, 206, 40];
    let v = value;
    const min = v >= 10 ? yellow : [227, 14, 14];
    const max = v < 10 ? yellow : [68, 183, 50];
    if (v >= 10) v -= 10;
    let result = '#';
    for (let i = 0; i < 3; i++) {
        result += Math.round(min[i] + (max[i] - min[i]) * (v / 10)).toString(16).padStart(2, '0');
    }
    return result;
}

export function formatGrade(value) {
    if (value === 0.01) return 'Abs.';
    if (value !== 0 && !value) return '--,--';
    return value.toFixed(2).replace('.', ',');
}

export function gradeSpan(value) {
    return h('span', { class: 'value', style: { color: gradeColor(value) } }, formatGrade(value));
}

export function signSvg(type, value, old) {
    switch (type) {
        case 'average-update':
        case 'update': return value > old ? IncreaseArrowSvg : DecreaseArrowSvg;
        case 'add': return PlusSvg;
        case 'remove': return MinusSvg;
    }
}

export function hasEqualCoefficients(subject) {
    return subject.marks.every(m => m.coefficient === subject.marks[0].coefficient);
}
