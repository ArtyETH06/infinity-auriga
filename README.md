# Infinity Auriga

Enhanced grade viewer for EPITA students on [auriga.epita.fr](https://auriga.epita.fr).

Tampermonkey userscript that replaces Auriga's Angular UI with a cleaner interface.

Fork of [Infinity Pegasus](https://github.com/Litarvan/infinity-pegasus) by Litarvan.

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/)
2. Build: `bun run build:userscript`
3. Copy `dist-userscript/infinity-auriga.user.js` into Tampermonkey
4. Go to [auriga.epita.fr](https://auriga.epita.fr)

## Dev

```bash
bun install
bun run dev
```

The mock API needs `tools/auriga-capture.json` (not committed - capture it from Auriga).

## Stack

Vanilla HTML/CSS/JS. No framework. ~43KB output.

## License

[MIT](LICENSE)
