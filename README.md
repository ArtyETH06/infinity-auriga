# Infinity Auriga

Enhanced grades UI for [Auriga](https://auriga.epita.fr) (EPITA). Replaces the default interface with a cleaner, faster grade viewer with weighted averages and change tracking.

Fork of [Litarvan/infinity-pegasus](https://github.com/Litarvan/infinity-pegasus).

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. Download `infinity-auriga.user.js` from [Releases](https://github.com/KazeTachinuu/infinity-auriga/releases)
3. Tampermonkey prompts to install — click **Install**
4. Go to [auriga.epita.fr](https://auriga.epita.fr) and log in

The toggle in the bottom-left switches between Infinity and classic Auriga.

## Features

- Clean grade display with module/subject hierarchy
- Weighted averages with community-contributed coefficient overrides
- Change tracking — new/updated grades highlighted since last visit
- Live loading screen with API request status
- One-click toggle between Infinity and classic Auriga

## Coefficients

Auriga returns all coefficients as equal. Infinity overrides them with real weights so your averages are accurate.

The UI shows which coefficient file is active (or "Coefficients par défaut" if none exists for your semester).

### Contributing coefficients

Coefficient files live in [`src/lib/coefficients/`](src/lib/coefficients/).

**1. Create a file** — `src/lib/coefficients/s{semester}_{track}_{year}.js`:

```js
// Coefficients for S07 FISA 2025/2026
// Only non-default coefficients (default = 1)
export default {
    '2526_I_INF_FISA_S07_CS_GR_WS_EX': 2,
    '2526_I_INF_FISA_S07_CS_SAE_DEVSEC_PROJ_EX': 3,
};
```

**2. Register it** in `src/lib/coefficients/index.js`:

```js
const registry = {
    'S07_2526_FISA': { loader: () => import('./s7_fisa_2526.js'), file: 's7_fisa_2526.js' },
};
```

The key format is `{semester}_{year}_{track}`.

**3. Open a PR.**

To find exam codes, check network requests to `/api/menuEntries/*/searchResult` in the browser devtools on Auriga.

## Development

```bash
bun install
bun run dev                # Dev server with mock API
bun run build:userscript   # Build Tampermonkey userscript
```

Mock API uses `tools/auriga-capture.json` with simulated latency.

## License

[MIT](LICENSE)
