import { app } from './app.js';

import NoisyVerticalGradient from './lib/ui/background.js';

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

/**
 * Create a DOM element with attributes and children.
 */
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

/**
 * Create an element with innerHTML (for SVG injection).
 */
function html(tag, attrs, rawHtml) {
    const el = h(tag, attrs);
    el.innerHTML = rawHtml;
    return el;
}

/**
 * Grade color function (original Pegasus gradient).
 */
function gc(value) {
    if (value === 0.01) return '#666670';
    if (value === null || value === undefined) return 'auto';

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

/**
 * Format a grade value (French comma separator).
 */
function fmt(value) {
    if (value === 0.01) return 'Abs.';
    if (value !== 0 && !value) return '--,--';
    return value.toFixed(2).replace('.', ',');
}

/**
 * Get the sign SVG for an update type.
 */
function getSignForUpdate(type, value, old) {
    switch (type) {
        case 'average-update':
        case 'update':
            return value > old ? IncreaseArrowSvg : DecreaseArrowSvg;
        case 'add':
            return PlusSvg;
        case 'remove':
            return MinusSvg;
    }
}

/**
 * Check if all marks in a subject have equal coefficients.
 */
function hasEqualCoefficients(subject) {
    return subject.marks.every(m => m.coefficient === subject.marks[0].coefficient);
}

/**
 * Set up the background with noisy gradient and triangles.
 */
function renderBackground() {
    const bg = h('div', { id: 'background' });
    bg.appendChild(html('div', { id: 'top-triangle', class: 'triangle' }, topTriangle));
    bg.appendChild(html('div', { id: 'bottom-triangle', class: 'triangle' }, bottomTriangle));

    // Apply noisy gradient
    try {
        const nvg = new NoisyVerticalGradient(50, Math.max(window.visualViewport?.height ?? window.innerHeight, 1080), ['#343D55', '#0e1016']);
        const png = nvg.render_png();
        if (png) bg.style.backgroundImage = png;
    } catch (_) { /* fallback: CSS gradient */ }

    return bg;
}

/**
 * Render a combo box dropdown.
 */
function renderComboBox(name, values, currentValue, onUpdate) {
    const wrapper = h('div', { class: 'combo-box' });
    const label = h('span', { class: 'name' }, name);
    wrapper.appendChild(label);

    const selected = (values.find(v => v.value === currentValue) || { name: '...' }).name;

    const box = h('div', { class: 'box clickable' });
    box.appendChild(document.createTextNode(selected + ' '));
    const arrowEl = html('span', {}, ComboBoxArrowSvg);
    box.appendChild(arrowEl.firstElementChild || arrowEl);

    let opened = false;
    let choicesEl = null;

    function toggle() {
        opened = !opened;
        if (opened) {
            box.classList.add('opened');
            choicesEl = h('div', { class: 'choices card' });
            for (const choice of values) {
                choicesEl.appendChild(
                    h('div', {
                        class: 'choice clickable opaque',
                        onclick: () => {
                            opened = false;
                            box.classList.remove('opened');
                            if (choicesEl) { choicesEl.remove(); choicesEl = null; }
                            // Update box text
                            box.textContent = '';
                            box.appendChild(document.createTextNode(choice.name + ' '));
                            const newArrow = html('span', {}, ComboBoxArrowSvg);
                            box.appendChild(newArrow.firstElementChild || newArrow);
                            onUpdate(choice);
                        }
                    }, choice.name)
                );
            }
            wrapper.appendChild(choicesEl);
        } else {
            box.classList.remove('opened');
            if (choicesEl) { choicesEl.remove(); choicesEl = null; }
        }
    }

    box.addEventListener('click', toggle);

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (opened && !wrapper.contains(e.target)) {
            opened = false;
            box.classList.remove('opened');
            if (choicesEl) { choicesEl.remove(); choicesEl = null; }
        }
    });

    wrapper.appendChild(box);
    return wrapper;
}

/**
 * Render the spinner loading state.
 */
export function renderSpinner(message) {
    return h('div', { class: 'loading' },
        html('div', { class: 'spinner' }, SpinnerSvg),
        h('div', { class: 'subtitle' }, message || 'Chargement...')
    );
}

/**
 * Render the footer.
 */
function renderFooter() {
    const footer = h('div', { id: 'footer' });

    const links = h('div', { id: 'links' });
    const coeffLink = h('a', { href: `${app.repository}/tree/master/src/lib/pegasus/coefficients`, target: '_blank' }, 'Coefficients');
    const sourcesLink = h('a', { href: app.repository, target: '_blank' }, 'Sources');
    const resetLink = h('a', { href: '#' });
    resetLink.textContent = 'Reset';
    resetLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    });

    links.appendChild(coeffLink);
    links.appendChild(document.createTextNode('\u00a0\u00b7\u00a0'));
    links.appendChild(sourcesLink);
    links.appendChild(document.createTextNode('\u00a0\u00b7\u00a0'));
    links.appendChild(resetLink);
    footer.appendChild(links);

    const copyright = h('p', { class: 'subtext' });
    copyright.innerHTML = `${app.name} &copy; 2019-2026<br/>Licensed under <a class="link colored" href="${app.repository}/blob/master/LICENSE" target="_blank">MIT License</a>`;
    footer.appendChild(copyright);

    return footer;
}

/**
 * Main render function: generates the full Pegasus-style layout.
 */
export function renderApp(container, { name, marks, averages, filters, filtersValues, updates, onSemesterChange }) {
    container.replaceChildren();

    // === Background ===
    container.appendChild(renderBackground());

    // === Content panel ===
    const content = h('div', { id: 'content', class: 'variable wide' });

    // Header with logo and logout
    const header = h('div', { id: 'header' });
    const logo = html('div', { id: 'logo', class: 'variable' }, LogoSvg);
    header.appendChild(logo);
    if (name) {
        header.appendChild(h('a', { id: 'logout', href: 'https://auriga.epita.fr' }, 'Se deconnecter'));
    }
    content.appendChild(header);

    // Main content area
    const main = h('div', { id: 'main' });
    const mainContent = h('div', { class: 'content' });

    // --- Filters ---
    const filtersDiv = h('div', { class: 'filters' });
    for (const filter of filters) {
        filtersDiv.appendChild(
            renderComboBox(filter.name, filter.values, filtersValues[filter.id], (choice) => {
                if (filter.id === 'semester') {
                    onSemesterChange(choice.value);
                }
            })
        );
    }
    mainContent.appendChild(filtersDiv);

    // --- Updates section ---
    mainContent.appendChild(h('div', { class: 'header' },
        document.createTextNode('Derniers changements'),
        h('hr')
    ));

    const visibleUpdates = updates.filter(u => u.type !== 'average-update');
    if (visibleUpdates.length === 0) {
        mainContent.appendChild(h('div', { class: 'no-updates' }, 'Aucun changement depuis votre derniere visite.'));
    }

    const updatesDiv = h('div', { class: 'updates' });
    for (const upd of visibleUpdates) {
        const updateEl = h('div', { class: 'update' });

        // Big colored point
        updateEl.appendChild(h('div', { class: 'point big' }));

        // Top row: subject ID - name
        const topRow = h('div', { class: 'top' });
        topRow.appendChild(h('div', { class: 'id' }, upd.subject));
        topRow.appendChild(h('div', { class: 'dash' }, '-'));

        const nameDiv = h('div', { class: 'name' });
        nameDiv.appendChild(document.createTextNode(upd.name + '\u00a0'));

        const targetLabel = upd.type.includes('average') ? 'moyenne' : 'note';
        nameDiv.appendChild(html('span', { class: 'target' }, `\u00b7\u00a0 ${targetLabel}`));
        topRow.appendChild(nameDiv);
        updateEl.appendChild(topRow);

        // Mark row
        const markRow = h('div', { class: 'mark' });
        markRow.appendChild(h('div', { class: 'point' }));

        const hasValue = upd.value === 0 || upd.value;
        const hasOld = upd.old === 0 || upd.old;
        if (hasValue && hasOld) {
            markRow.appendChild(h('div', { class: 'from' }, fmt(upd.old)));
            markRow.appendChild(html('div', { class: 'update-arrow' }, UpdateArrowSvg));
        }

        const displayValue = hasValue ? upd.value : upd.old;
        const toDiv = h('div', { class: 'to' });
        toDiv.appendChild(h('span', { class: 'value', style: { color: gc(displayValue) } }, fmt(displayValue)));
        toDiv.appendChild(document.createTextNode('\u00a0/ 20'));
        markRow.appendChild(toDiv);

        const signSvg = getSignForUpdate(upd.type, upd.value, upd.old);
        if (signSvg) {
            markRow.appendChild(html('div', { class: 'type-sign' }, signSvg));
        }

        updateEl.appendChild(markRow);
        updatesDiv.appendChild(updateEl);
    }
    mainContent.appendChild(updatesDiv);

    // --- Averages section ---
    mainContent.appendChild(h('div', { class: 'header' },
        document.createTextNode('Moyennes'),
        h('hr')
    ));

    const bigList = h('div', { class: 'big-list' });
    const avgEntries = [
        { label: 'Etudiant', value: averages.student, colored: true },
        { label: 'Promotion', value: averages.promo, colored: false },
    ];
    for (const entry of avgEntries) {
        const entryEl = h('div', { class: 'entry' });
        entryEl.appendChild(h('div', { class: 'point' }));
        entryEl.appendChild(h('div', { class: 'name' }, entry.label));
        entryEl.appendChild(h('div', { class: 'point small' }));

        const markDiv = h('div', { class: 'mark' });
        markDiv.appendChild(h('span', { class: 'value', style: { color: entry.colored ? gc(entry.value) : 'auto' } }, fmt(entry.value)));
        markDiv.appendChild(document.createTextNode('\u00a0/ 20'));
        entryEl.appendChild(markDiv);

        bigList.appendChild(entryEl);
    }
    mainContent.appendChild(bigList);

    // --- Separator ---
    mainContent.appendChild(h('hr', { class: 'separator' }));

    // --- Modules ---
    for (const module of marks) {
        // Module header
        const moduleHeader = h('div', { class: 'header module' });
        const textDiv = h('div', { class: 'text' });

        textDiv.appendChild(h('div', { class: 'name' }, module.name));
        textDiv.appendChild(h('div', { class: 'point' }));

        const bottomDiv = h('div', { class: 'bottom' });
        bottomDiv.appendChild(h('span', { class: 'average', style: { color: gc(module.average) } }, fmt(module.average)));
        bottomDiv.appendChild(h('span', { class: 'max' }, '\u00a0/ 20'));
        if (module.classAverage != null) {
            bottomDiv.appendChild(h('span', { class: 'class-average' }, `(promo: ${fmt(module.classAverage)})`));
        }
        textDiv.appendChild(bottomDiv);

        moduleHeader.appendChild(textDiv);
        moduleHeader.appendChild(h('hr', { class: 'bottom-line' }));
        mainContent.appendChild(moduleHeader);

        // Subjects
        for (const subject of module.subjects) {
            const subjectCard = h('div', { class: 'subject card' });
            const isSingle = subject.marks.length === 1;

            // Info panel (left side)
            const info = h('div', { class: 'info' });
            const infoTop = h('div', { class: 'top' });

            if (isSingle) {
                // Single mark: use mark name as the subject title
                infoTop.appendChild(h('div', { class: 'id' }, subject.marks[0].name));
            } else {
                // Multi marks: show resolved name or code
                const displayName = subject.name !== subject.id.replace(/_/g, ' ') ? subject.name : subject.id.replace(/_/g, ' ');
                infoTop.appendChild(h('div', { class: 'id' }, displayName));
            }
            info.appendChild(infoTop);

            const infoBottom = h('div', { class: 'bottom' });
            const avgDiv = h('div', { class: 'average' });
            avgDiv.appendChild(h('span', { class: 'value', style: { color: gc(subject.average) } }, fmt(subject.average)));
            avgDiv.appendChild(document.createTextNode('\u00a0/ 20'));
            infoBottom.appendChild(avgDiv);

            const metaParts = [];
            if (subject.classAverage != null) metaParts.push(`promo: ${fmt(subject.classAverage)}`);
            if (subject.coefficient != null && subject.coefficient !== 1) metaParts.push(`coeff. ${fmt(subject.coefficient)}`);
            if (metaParts.length > 0) {
                infoBottom.appendChild(h('div', { class: 'class-average' }, `(${metaParts.join(', ')})`));
            }
            info.appendChild(infoBottom);

            info.appendChild(h('hr', { class: 'bottom-line' }));
            subjectCard.appendChild(info);

            // Marks list (right side) - only show for multi-mark subjects
            if (subject.marks.length === 0) {
                subjectCard.appendChild(h('div', { class: 'no-marks' }, 'Aucune note'));
            } else if (!isSingle) {
                const marksDiv = h('div', { class: 'marks' });

                for (const mark of subject.marks) {
                    const markEl = h('div', { class: 'mark' });
                    markEl.appendChild(h('div', { class: 'point' }));

                    const lineDiv = h('div', { class: 'line' });
                    lineDiv.appendChild(h('div', { class: 'name' }, mark.name));
                    lineDiv.appendChild(document.createTextNode('\u00a0:\u00a0'));

                    const valueDiv = h('div', { class: 'value' });
                    valueDiv.appendChild(h('span', { class: 'itself', style: { color: gc(mark.value) } }, fmt(mark.value)));
                    valueDiv.appendChild(document.createTextNode('\u00a0/ 20'));
                    lineDiv.appendChild(valueDiv);
                    markEl.appendChild(lineDiv);

                    const markMeta = [];
                    if (mark.classAverage != null) markMeta.push(`moyenne: ${fmt(mark.classAverage)}`);
                    if (!hasEqualCoefficients(subject)) markMeta.push(`${Math.round(mark.coefficient * 100)}%`);
                    if (markMeta.length > 0) {
                        const classAvg = h('div', { class: 'class-average' });
                        classAvg.appendChild(h('span', { class: 'parenthesis' }, '('));
                        classAvg.appendChild(document.createTextNode(markMeta.join(', ')));
                        classAvg.appendChild(h('span', { class: 'parenthesis' }, ')'));
                        markEl.appendChild(classAvg);
                    }
                    marksDiv.appendChild(markEl);
                }
                subjectCard.appendChild(marksDiv);
            }

            mainContent.appendChild(subjectCard);
        }
    }

    main.appendChild(mainContent);
    content.appendChild(main);

    // Footer
    content.appendChild(renderFooter());

    container.appendChild(content);

    // === Resize handler (original behavior) ===
    function onResize() {
        const body = document.querySelector('body');
        const appEl = document.getElementById('app');
        if (body) body.style.height = `${window.innerHeight}px`;
        if (appEl) appEl.style.height = `${window.innerHeight}px`;
    }
    window.addEventListener('resize', onResize);
    onResize();
}
