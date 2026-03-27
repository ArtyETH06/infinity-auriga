/** Check for newer versions of Infinity Auriga via jsDelivr CDN. */

import { app } from './app.js';

/** Compare semver strings. Returns true if remote > local. */
function isNewer(remote, local) {
    const r = remote.split('.').map(Number);
    const l = local.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        if ((r[i] || 0) > (l[i] || 0)) return true;
        if ((r[i] || 0) < (l[i] || 0)) return false;
    }
    return false;
}

/**
 * Check if a newer version is available.
 * Returns { available: true, version, url } or { available: false }.
 */
export async function checkForUpdate() {
    try {
        const res = await fetch(`${app.cdnBase}/package.json`, { cache: 'no-cache' });
        if (!res.ok) return { available: false };
        const pkg = await res.json();
        if (isNewer(pkg.version, app.version)) {
            return {
                available: true,
                version: pkg.version,
                url: `${app.repository}/raw/refs/heads/master/dist-userscript/infinity-auriga.user.js`,
            };
        }
    } catch { /* CDN unreachable */ }
    return { available: false };
}
