import { transform } from 'esbuild';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const REPO = 'https://github.com/KazeTachinuu/infinity-auriga';
const RAW = 'https://raw.githubusercontent.com/KazeTachinuu/infinity-auriga/master/dist-userscript/infinity-auriga.user.js';

export default function userscriptPlugin() {
    let projectRoot = '';

    return {
        name: 'vite-userscript',
        enforce: 'post',
        configResolved(config) {
            projectRoot = config.root;
        },
        async generateBundle(_, bundle) {
            const pkg = JSON.parse(readFileSync(resolve(projectRoot, 'package.json'), 'utf-8'));
            const version = pkg.version;

            const header = `// ==UserScript==
// @name         Infinity Auriga
// @namespace    infinity-auriga
// @version      ${version}
// @description  Make Auriga Great Again - enhanced grades UI for EPITA
// @author       KazeTachinuu & contributors
// @match        https://auriga.epita.fr/*
// @grant        none
// @run-at       document-start
// @homepageURL  ${REPO}
// @supportURL   ${REPO}/issues
// @updateURL    ${RAW}
// @downloadURL  ${RAW}
// ==/UserScript==
`;

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

            if (css) {
                const minified = await transform(css, { loader: 'css', minify: true });
                css = minified.code;
            }

            for (const file of Object.values(bundle)) {
                if (file.type === 'chunk' && file.isEntry) {
                    const cssInjection = css
                        ? `\n;(function(){if(localStorage.getItem('infinity_auriga_enabled')==='0')return;var s=document.createElement('style');s.setAttribute('data-infinity','1');s.textContent=${JSON.stringify(css)};(document.head||document.documentElement).appendChild(s)})();\n`
                        : '';

                    file.code = header + cssInjection + file.code;
                    const newName = file.fileName.replace(/\.js$/, '.user.js');
                    file.fileName = newName;
                }
            }
        },
    };
}
