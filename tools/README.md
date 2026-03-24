# Dev Tools

## Auriga Capture

`auriga-capture.user.js` is a Tampermonkey script that captures Auriga API responses for local development.

### Usage

1. Install the script in Tampermonkey (drag the file or paste its contents)
2. Go to [auriga.epita.fr](https://auriga.epita.fr) and log in
3. Navigate to your **grades page** — the script intercepts all API calls automatically
4. A purple panel in the bottom-right shows how many calls were captured
5. Click **Download API Only** to save the captured data

### Setting up local dev

Rename the downloaded file to `auriga-capture.json` and place it in this `tools/` directory:

```
tools/auriga-capture.json
```

Then run `bun run dev` — the mock API server serves this data with simulated latency.

### What it captures

- All XHR and fetch requests to `/api/*` and Keycloak token endpoints
- POST request bodies (search filters)
- Response headers
- Skips static assets (SVGs, fonts, i18n)

The captured JSON files contain your real grades and are gitignored.
