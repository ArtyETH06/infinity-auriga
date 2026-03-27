import { describe, it, expect, vi } from 'vitest';

// Test the isNewer logic directly by importing the module and mocking fetch
describe('version check', () => {
    it('detects newer major version', async () => {
        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: true, json: () => Promise.resolve({ version: '2.0.0' }),
        })));

        const { checkForUpdate } = await import('./version-check.js');
        const result = await checkForUpdate();
        expect(result.available).toBe(true);
        expect(result.version).toBe('2.0.0');

        vi.unstubAllGlobals();
    });

    it('detects newer minor version', async () => {
        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: true, json: () => Promise.resolve({ version: '1.10.0' }),
        })));

        const { checkForUpdate } = await import('./version-check.js');
        const result = await checkForUpdate();
        expect(result.available).toBe(true);

        vi.unstubAllGlobals();
    });

    it('returns false when same version', async () => {
        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: true, json: () => Promise.resolve({ version: '1.9.0' }),
        })));

        const { checkForUpdate } = await import('./version-check.js');
        const result = await checkForUpdate();
        expect(result.available).toBe(false);

        vi.unstubAllGlobals();
    });

    it('returns false when older version', async () => {
        vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
            ok: true, json: () => Promise.resolve({ version: '1.8.0' }),
        })));

        const { checkForUpdate } = await import('./version-check.js');
        const result = await checkForUpdate();
        expect(result.available).toBe(false);

        vi.unstubAllGlobals();
    });

    it('returns false on fetch failure', async () => {
        vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));

        const { checkForUpdate } = await import('./version-check.js');
        const result = await checkForUpdate();
        expect(result.available).toBe(false);

        vi.unstubAllGlobals();
    });
});
