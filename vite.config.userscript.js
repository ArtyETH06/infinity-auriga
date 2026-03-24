import { defineConfig } from 'vite';
import userscriptPlugin from './plugins/vite-userscript.js';
import path from 'path';

export default defineConfig({
    plugins: [userscriptPlugin()],
    build: {
        lib: {
            entry: path.resolve(import.meta.dirname, 'src/userscript-entry.js'),
            formats: ['iife'],
            name: 'InfinityAuriga',
            fileName: () => 'infinity-auriga.js',
        },
        outDir: 'dist-userscript',
        target: ['es2020'],
        minify: 'esbuild',
    },
});
