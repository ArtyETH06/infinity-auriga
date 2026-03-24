import { setAccessToken, apiFetch, getAccessToken } from './api';

let _userInfo = null;

/**
 * Intercept XHR calls to the Keycloak token endpoint to capture fresh tokens.
 * The Angular app refreshes the token every ~60s - we piggyback on that.
 */
export function installTokenInterceptor() {
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, ...args) {
        this._aurigaUrl = url;
        return origOpen.call(this, method, url, ...args);
    };

    XMLHttpRequest.prototype.send = function (body) {
        if (this._aurigaUrl && this._aurigaUrl.includes('openid-connect/token')) {
            this.addEventListener('load', function () {
                try {
                    const data = JSON.parse(this.responseText);
                    if (data.access_token) {
                        setAccessToken(data.access_token);
                    }
                } catch (e) {
                    // ignore parse errors
                }
            });
        }
        return origSend.call(this, body);
    };
}

/**
 * Wait for the Angular app to have completed at least one token refresh.
 * Returns true once we have a valid token, or false after timeout.
 */
export function waitForToken(timeoutMs = 15000) {
    return new Promise((resolve) => {
        if (getAccessToken()) {
            resolve(true);
            return;
        }

        const interval = setInterval(() => {
            if (getAccessToken()) {
                clearInterval(interval);
                clearTimeout(timeout);
                resolve(true);
            }
        }, 200);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            resolve(false);
        }, timeoutMs);
    });
}

/**
 * Check if we have a valid session (token captured from Auriga).
 */
export function isLogged() {
    // In dev mode (localhost), bypass token check for UI development
    if (window.location.hostname === 'localhost') {
        return true;
    }
    return !!getAccessToken();
}

/**
 * Fetch and cache user info from /api/me.
 * Returns { firstName, lastName, fullName, personId }.
 */
export async function getUserInfo() {
    if (_userInfo) return _userInfo;

    if (window.location.hostname === 'localhost') {
        _userInfo = { firstName: 'Dev', lastName: 'User', fullName: 'Dev User', personId: 0 };
        return _userInfo;
    }

    const data = await apiFetch('/me');
    _userInfo = {
        firstName: data.person.currentFirstName,
        lastName: data.person.currentLastName,
        fullName: `${data.person.currentFirstName} ${data.person.currentLastName}`,
        personId: data.person.id,
    };
    return _userInfo;
}

/**
 * Get user display name.
 */
export async function getName() {
    const info = await getUserInfo();
    return info.fullName;
}
