import { app } from './app.js';

import topTriangle from './assets/images/top_triangle.svg?raw';
import bottomTriangle from './assets/images/bottom_triangle.svg?raw';
import LogoSvg from './assets/images/logo.svg?raw';
import SpinnerSvg from './assets/images/spinner.svg?raw';
import ComboBoxArrowSvg from './assets/images/combo_box_arrow.svg?raw';
import UpdateArrowSvg from './assets/images/update_arrow.svg?raw';
import IncreaseArrowSvg from './assets/images/increase_arrow.svg?raw';
import DecreaseArrowSvg from './assets/images/decrease_arrow.svg?raw';
import PlusSvg from './assets/images/plus.svg?raw';
import MinusSvg from './assets/images/minus.svg?raw';

// NOTE: All innerHTML usage in this file injects only build-time SVG imports
// (Vite ?raw), never user-supplied content. This is safe from XSS.

function h(tag, attrs = {}, ...children) {
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

function html(tag, attrs, rawHtml) {
    const el = h(tag, attrs);
    el.innerHTML = rawHtml;
    return el;
}

function gc(value) {
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

function fmt(value) {
    if (value === 0.01) return 'Abs.';
    if (value !== 0 && !value) return '--,--';
    return value.toFixed(2).replace('.', ',');
}

function gradeSpan(value) {
    return h('span', { class: 'value', style: { color: gc(value) } }, fmt(value));
}

function signSvg(type, value, old) {
    switch (type) {
        case 'average-update':
        case 'update': return value > old ? IncreaseArrowSvg : DecreaseArrowSvg;
        case 'add': return PlusSvg;
        case 'remove': return MinusSvg;
    }
}

function hasEqualCoefficients(subject) {
    return subject.marks.every(m => m.coefficient === subject.marks[0].coefficient);
}

function renderComboBox(name, values, currentValue, onUpdate) {
    const wrapper = h('div', { class: 'combo-box' });
    const selected = (values.find(v => v.value === currentValue) || { name: '...' }).name;

    const box = h('div', { class: 'box clickable' });
    const setBoxContent = (text) => {
        box.textContent = '';
        box.append(text + ' ');
        const arrow = html('span', {}, ComboBoxArrowSvg);
        box.appendChild(arrow.firstElementChild || arrow);
    };
    setBoxContent(selected);

    let opened = false;
    let choicesEl = null;

    const close = () => {
        opened = false;
        box.classList.remove('opened');
        choicesEl?.remove();
        choicesEl = null;
    };

    box.addEventListener('click', () => {
        if (opened) return close();
        opened = true;
        box.classList.add('opened');
        choicesEl = h('div', { class: 'choices card' },
            ...values.map(choice =>
                h('div', {
                    class: 'choice clickable opaque',
                    onclick: () => { close(); setBoxContent(choice.name); onUpdate(choice); }
                }, choice.name)
            )
        );
        wrapper.appendChild(choicesEl);
    });

    document.addEventListener('click', (e) => {
        if (opened && !wrapper.contains(e.target)) close();
    });

    wrapper.append(h('span', { class: 'name' }, name), box);
    return wrapper;
}

export function renderSpinner(message) {
    return h('div', { class: 'loading' },
        html('div', { class: 'spinner' }, SpinnerSvg),
        h('div', { class: 'subtitle' }, message || 'Chargement...')
    );
}

function renderUpdate(upd) {
    const hasValue = upd.value === 0 || upd.value;
    const hasOld = upd.old === 0 || upd.old;
    const displayValue = hasValue ? upd.value : upd.old;
    const targetLabel = upd.type.includes('average') ? 'moyenne' : 'note';
    const sign = signSvg(upd.type, upd.value, upd.old);

    return h('div', { class: 'update' },
        h('div', { class: 'point big' }),
        h('div', { class: 'top' },
            h('div', { class: 'id' }, upd.subject),
            h('div', { class: 'dash' }, '-'),
            h('div', { class: 'name' }, upd.name + '\u00a0', html('span', { class: 'target' }, `\u00b7\u00a0 ${targetLabel}`))
        ),
        h('div', { class: 'mark' },
            h('div', { class: 'point' }),
            ...(hasValue && hasOld ? [h('div', { class: 'from' }, fmt(upd.old)), html('div', { class: 'update-arrow' }, UpdateArrowSvg)] : []),
            h('div', { class: 'to' }, gradeSpan(displayValue), '\u00a0/ 20'),
            ...(sign ? [html('div', { class: 'type-sign' }, sign)] : [])
        )
    );
}

function renderSubject(subject, moduleId) {
    // Left side: strip module prefix from code (e.g. "CN_PROD" under module "CN" → "PROD")
    const shortId = subject.id.startsWith(moduleId + '_') ? subject.id.slice(moduleId.length + 1) : subject.id;
    const rawCode = shortId.replace(/_/g, ' ');
    // Full resolved name
    const fullName = subject.name !== subject.id.replace(/_/g, ' ') ? subject.name : null;
    // For very short cryptic codes (2-3 letter abbreviations), prefer the full name — but only if it fits
    const useNameAsLabel = fullName && rawCode.length < 5 && fullName.length <= 16;
    const codeLabel = useNameAsLabel ? fullName : rawCode;

    const metaParts = [];
    if (subject.classAverage != null) metaParts.push(`promo: ${fmt(subject.classAverage)}`);
    if (subject.coefficient != null && subject.coefficient !== 1) metaParts.push(`coeff. ${fmt(subject.coefficient)}`);

    const info = h('div', { class: 'info' },
        h('div', { class: 'top' }, h('div', { class: 'id' }, codeLabel)),
        h('div', { class: 'bottom' },
            h('div', { class: 'average' }, gradeSpan(subject.average), '\u00a0/ 20'),
            ...(metaParts.length ? [h('div', { class: 'class-average' }, `(${metaParts.join(', ')})`)] : [])
        ),
        h('hr', { class: 'bottom-line' })
    );

    // Right side: always show marks panel with full name header
    const marksContent = subject.marks.map(mark => {
        const meta = [];
        if (mark.classAverage != null) meta.push(`moyenne: ${fmt(mark.classAverage)}`);
        if (!hasEqualCoefficients(subject)) meta.push(`${Math.round(mark.coefficient * 100)}%`);

        // Strip subject name prefix from mark name to avoid redundancy
        let markName = mark.name;
        if (fullName) {
            if (markName.startsWith(fullName + ' - ')) markName = markName.slice(fullName.length + 3);
            else if (markName.startsWith(fullName + ' ')) markName = markName.slice(fullName.length + 1);
        }

        return h('div', { class: 'mark' },
            h('div', { class: 'point' }),
            h('div', { class: 'line' },
                h('div', { class: 'name' }, markName),
                '\u00a0:\u00a0',
                h('div', { class: 'value' }, h('span', { class: 'itself', style: { color: gc(mark.value) } }, fmt(mark.value)), '\u00a0/ 20')
            ),
            ...(meta.length ? [h('div', { class: 'class-average' },
                h('span', { class: 'parenthesis' }, '('), meta.join(', '), h('span', { class: 'parenthesis' }, ')')
            )] : [])
        );
    });

    const marksEl = subject.marks.length === 0
        ? h('div', { class: 'no-marks' }, 'Aucune note')
        : h('div', { class: 'marks' },
            ...(fullName && !useNameAsLabel ? [h('div', { class: 'marks-title' }, fullName)] : []),
            ...marksContent
        );

    return h('div', { class: 'subject card' }, info, marksEl);
}

function renderFooter() {
    const resetLink = h('a', { href: '#', onclick: (e) => { e.preventDefault(); localStorage.clear(); window.location.reload(); } }, 'Reset');
    return h('div', { id: 'footer' },
        h('div', { id: 'links' },
            h('a', { href: `${app.repository}/tree/master/src/lib/pegasus/coefficients`, target: '_blank' }, 'Coefficients'),
            '\u00a0\u00b7\u00a0',
            h('a', { href: app.repository, target: '_blank' }, 'Sources'),
            '\u00a0\u00b7\u00a0',
            resetLink
        ),
        html('p', { class: 'subtext' }, `${app.name} &copy; 2019-2026<br/>Licensed under <a class="link colored" href="${app.repository}/blob/master/LICENSE" target="_blank">MIT License</a>`)
    );
}

export function renderApp(container, { name, marks, averages, filters, filtersValues, updates, onSemesterChange }) {
    container.replaceChildren();

    // Background (pure CSS gradient, no WebGL)
    container.appendChild(h('div', { id: 'background' },
        html('div', { id: 'top-triangle', class: 'triangle' }, topTriangle),
        html('div', { id: 'bottom-triangle', class: 'triangle' }, bottomTriangle)
    ));

    const visibleUpdates = updates.filter(u => u.type !== 'average-update');

    const avgEntries = [
        { label: 'Etudiant', value: averages.student, colored: true },
        { label: 'Promotion', value: averages.promo, colored: false },
    ];

    const moduleEls = marks.flatMap(mod => [
        h('div', { class: 'header module' },
            h('div', { class: 'text' },
                h('div', { class: 'name' }, mod.name),
                h('div', { class: 'point' }),
                h('div', { class: 'bottom' },
                    h('span', { class: 'average', style: { color: gc(mod.average) } }, fmt(mod.average)),
                    h('span', { class: 'max' }, '\u00a0/ 20'),
                    ...(mod.classAverage != null ? [h('span', { class: 'class-average' }, `(promo: ${fmt(mod.classAverage)})`)] : [])
                )
            ),
            h('hr', { class: 'bottom-line' })
        ),
        ...mod.subjects.map(s => renderSubject(s, mod.id))
    ]);

    container.appendChild(h('div', { id: 'content', class: 'variable wide' },
        h('div', { id: 'header' },
            html('div', { id: 'logo', class: 'variable' }, LogoSvg),
            ...(name ? [h('a', { id: 'logout', href: 'https://auriga.epita.fr' }, 'Se deconnecter')] : [])
        ),
        h('div', { id: 'main' },
            h('div', { class: 'content' },
                h('div', { class: 'filters' },
                    ...filters.map(f => renderComboBox(f.name, f.values, filtersValues[f.id], (choice) => {
                        if (f.id === 'semester') onSemesterChange(choice.value);
                    }))
                ),
                h('div', { class: 'header' }, 'Derniers changements', h('hr')),
                ...(visibleUpdates.length === 0
                    ? [h('div', { class: 'no-updates' }, 'Aucun changement depuis votre derniere visite.')]
                    : []),
                h('div', { class: 'updates' }, ...visibleUpdates.map(renderUpdate)),
                h('div', { class: 'header' }, 'Moyennes', h('hr')),
                h('div', { class: 'big-list' }, ...avgEntries.map(e =>
                    h('div', { class: 'entry' },
                        h('div', { class: 'point' }),
                        h('div', { class: 'name' }, e.label),
                        h('div', { class: 'point small' }),
                        h('div', { class: 'mark' },
                            h('span', { class: 'value', style: { color: e.colored ? gc(e.value) : 'auto' } }, fmt(e.value)),
                            '\u00a0/ 20'
                        )
                    )
                )),
                h('hr', { class: 'separator' }),
                ...moduleEls
            )
        ),
        renderFooter()
    ));
}
