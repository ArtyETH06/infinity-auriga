import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Vite plugin that serves mock API responses from captured Auriga data.
 * Only active in dev mode (configureServer is not called during build).
 */
export default function mockApiPlugin() {
    let captures = null;
    let projectRoot = '';

    function loadCaptures() {
        if (captures) return captures;
        try {
            const raw = readFileSync(resolve(projectRoot, 'tools/auriga-capture.json'), 'utf-8');
            captures = JSON.parse(raw);
            console.log(`[mock-api] Loaded ${captures.length} captured API responses`);
        } catch {
            captures = [];
            console.warn('[mock-api] No capture file at tools/auriga-capture.json - API calls will 404');
        }
        return captures;
    }

    function findMatch(method, url) {
        const data = loadCaptures();
        return data.find(c => c.method === method && c.url === url && c.status === 200)
            || data.find(c => c.method === method && c.url.split('?')[0] === url.split('?')[0] && c.status === 200);
    }

    return {
        name: 'vite-mock-api',
        configResolved(config) {
            projectRoot = config.root;
        },
        configureServer(server) {
            server.middlewares.use('/api', (req, res) => {
                const url = '/api' + req.url;
                const method = req.method;

                let body = '';
                req.on('data', chunk => body += chunk);
                req.on('end', () => {
                    const match = findMatch(method, url);
                    if (match) {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(typeof match.response === 'string' ? match.response : JSON.stringify(match.response));
                    } else {
                        res.statusCode = 404;
                        res.end(JSON.stringify({ error: 'No mock data' }));
                    }
                });
            });
        },
    };
}
