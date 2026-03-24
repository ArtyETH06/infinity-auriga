const AURIGA_API = '/api';

let _accessToken = null;

export function setAccessToken(token) {
    _accessToken = token;
}

export function getAccessToken() {
    return _accessToken;
}

export async function apiFetch(path, options = {}, _retried = false) {
    if (!_accessToken) {
        throw new Error('No access token available');
    }

    const url = path.startsWith('http') ? path : `${AURIGA_API}${path}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Bearer ${_accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (response.status === 401 && !_retried) {
        // Token expired - wait for Angular to refresh it, then retry once
        await new Promise(r => setTimeout(r, 2000));
        return apiFetch(path, options, true);
    }

    if (!response.ok) {
        throw new Error(`Auriga API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Fetch all pages of a search result endpoint.
 * Handles pagination transparently - returns all lines across pages.
 */
export async function fetchAllSearchResults(menuEntryId, queryId) {
    const queryDef = await apiFetch(`/menuEntries/${menuEntryId}/query/${queryId}`);
    const body = queryDef.queryDefinition;

    let allLines = [];
    let page = 1;
    let totalPages = 1;

    do {
        const result = await apiFetch(
            `/menuEntries/${menuEntryId}/searchResult?size=100&page=${page}&sort=id&disableWarnings=true`,
            { method: 'POST', body: JSON.stringify(body) }
        );
        allLines = allLines.concat(result.content.lines);
        totalPages = result.totalPages;
        page++;
    } while (page <= totalPages);

    return allLines;
}
