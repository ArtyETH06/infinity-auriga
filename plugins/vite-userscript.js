import { transform } from 'esbuild';

const USERSCRIPT_HEADER = `// ==UserScript==
// @name         Infinity Auriga
// @namespace    infinity-auriga
// @version      0.1.0
// @description  Make Auriga Great Again - enhanced grades UI for EPITA
// @author       KazeTachinuu & contributors
// @match        https://auriga.epita.fr/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
`;

export default function userscriptPlugin() {
    return {
        name: 'vite-userscript',
        enforce: 'post',
        async generateBundle(_, bundle) {
            // Collect and minify CSS
            let css = '';
            const cssFiles = [];

            for (const [name, file] of Object.entries(bundle)) {
                if (file.type === 'asset' && name.endsWith('.css')) {
                    css += file.source;
                    cssFiles.push(name);
                }
            }

            for (const name of cssFiles) {
                delete bundle[name];
            }

            // Minify CSS with esbuild
            if (css) {
                const minified = await transform(css, { loader: 'css', minify: true });
                css = minified.code;
            }

            for (const file of Object.values(bundle)) {
                if (file.type === 'chunk' && file.isEntry) {
                    const cssInjection = css
                        ? `\n;(function(){var s=document.createElement('style');s.textContent=${JSON.stringify(css)};(document.head||document.documentElement).appendChild(s)})();\n`
                        : '';

                    file.code = USERSCRIPT_HEADER + cssInjection + file.code;
                    const newName = file.fileName.replace(/\.js$/, '.user.js');
                    file.fileName = newName;
                }
            }
        },
    };
}
