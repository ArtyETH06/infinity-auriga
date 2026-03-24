import { defineConfig } from 'vite';
import mockApiPlugin from './plugins/vite-mock-api.js';

export default defineConfig({
    plugins: [mockApiPlugin()],
    server: { hmr: { protocol: 'ws', host: 'localhost' } },
});
