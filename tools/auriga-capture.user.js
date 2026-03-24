// ==UserScript==
// @name         Auriga Capture
// @namespace    infinity-auriga
// @version      3.0
// @description  Capture Auriga API responses for Infinity Auriga development
// @match        https://auriga.epita.fr/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const captures = [];

    // API paths that need full (untruncated) responses
    const FULL_CAPTURE_PATTERNS = [
        '/api/me',
        '/api/menus',
        '/api/menuEntries/',
        '/api/searchResult',
    ];

    // Skip static assets
    const SKIP_PATTERNS = [
        '/assets/', '.svg', '.woff', '.ttf', '.css', '.js',
        'dataviz', 'academicCalendars', 'plannings',
    ];

    function shouldSkip(url) {
        return SKIP_PATTERNS.some(p => url.includes(p));
    }

    function shouldFullCapture(url) {
        return FULL_CAPTURE_PATTERNS.some(p => url.includes(p));
    }

    function captureResponse(type, method, url, status, responseText, headers, requestBody) {
        if (shouldSkip(url)) return;
        // Only capture API calls, not Keycloak/auth endpoints
        if (!url.includes('/api/')) return;

        const full = shouldFullCapture(url);
        const maxLen = full ? 500000 : 10000;

        const entry = {
            type,
            method,
            url,
            status,
            response: responseText ? responseText.substring(0, maxLen) : null,
            truncated: responseText ? responseText.length > maxLen : false,
            fullLength: responseText ? responseText.length : 0,
            timestamp: new Date().toISOString()
        };

        if (requestBody && method === 'POST') {
            try {
                entry.requestBody = typeof requestBody === 'string'
                    ? requestBody.substring(0, 50000)
                    : JSON.stringify(requestBody).substring(0, 50000);
            } catch (e) {
                entry.requestBody = '[could not serialize]';
            }
        }

        if (headers) {
            entry.responseHeaders = headers;
        }

        captures.push(entry);
    }

    // Intercept XHR
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, ...args) {
        this._captureMethod = method;
        this._captureUrl = url;
        return origOpen.call(this, method, url, ...args);
    };

    XMLHttpRequest.prototype.send = function (body) {
        const requestBody = body;
        this.addEventListener('load', function () {
            let responseText;
            try { responseText = this.responseText; }
            catch (e) { responseText = null; }
            captureResponse(
                'xhr', this._captureMethod, this._captureUrl,
                this.status, responseText, this.getAllResponseHeaders(), requestBody
            );
        });
        return origSend.call(this, body);
    };

    // Intercept fetch
    const origFetch = window.fetch;
    window.fetch = function (input, init) {
        const url = typeof input === 'string' ? input : input.url;
        const method = init?.method || 'GET';
        const requestBody = init?.body;

        return origFetch.call(this, input, init).then(response => {
            const cloned = response.clone();
            cloned.text().then(text => {
                captureResponse('fetch', method, url, response.status, text, null, requestBody);
            }).catch(() => {});
            return response;
        });
    };

    // UI
    function makeEl(tag, styles, text) {
        const el = document.createElement(tag);
        if (styles) Object.assign(el.style, styles);
        if (text) el.textContent = text;
        return el;
    }

    const panel = makeEl('div', {
        position: 'fixed', bottom: '20px', right: '20px', zIndex: '99999',
        background: '#673ab7', color: 'white', padding: '12px 16px',
        borderRadius: '12px', fontFamily: 'sans-serif', fontSize: '13px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)', maxWidth: '300px'
    });

    const statusEl = makeEl('div', { marginBottom: '10px' }, 'Waiting for API calls...');
    const downloadBtn = makeEl('button', {
        padding: '8px 16px', border: 'none', borderRadius: '8px',
        background: 'white', color: '#673ab7', fontWeight: 'bold',
        cursor: 'pointer', fontSize: '13px', width: '100%'
    }, 'Download auriga-capture.json');

    panel.appendChild(makeEl('div', { fontWeight: 'bold', marginBottom: '6px' }, 'Auriga Capture'));
    panel.appendChild(statusEl);
    panel.appendChild(downloadBtn);
    document.body.appendChild(panel);

    setInterval(() => {
        statusEl.textContent = `${captures.length} API calls captured`;
    }, 1000);

    downloadBtn.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(captures, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'auriga-capture.json';
        a.click();
        URL.revokeObjectURL(url);
        statusEl.textContent = `Downloaded ${captures.length} captures!`;
    });

    console.log('[Auriga Capture] Ready. Navigate to your grades page, then click Download.');
})();
