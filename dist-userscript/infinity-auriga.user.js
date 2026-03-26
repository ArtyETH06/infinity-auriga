// ==UserScript==
// @name         Infinity Auriga
// @namespace    infinity-auriga
// @version      1.6.1
// @description  Make Auriga Great Again - enhanced grades UI for EPITA
// @author       KazeTachinuu & contributors
// @match        https://auriga.epita.fr/*
// @grant        none
// @run-at       document-start
// @homepageURL  https://github.com/KazeTachinuu/infinity-auriga
// @supportURL   https://github.com/KazeTachinuu/infinity-auriga/issues
// @updateURL    https://raw.githubusercontent.com/KazeTachinuu/infinity-auriga/master/dist-userscript/infinity-auriga.user.js
// @downloadURL  https://raw.githubusercontent.com/KazeTachinuu/infinity-auriga/master/dist-userscript/infinity-auriga.user.js
// ==/UserScript==

;(function(){if(localStorage.getItem('infinity_auriga_enabled')==='0')return;var s=document.createElement('style');s.setAttribute('data-infinity','1');s.textContent="*,*:before,*:after{box-sizing:border-box}body{margin:0;overflow:hidden}div{display:flex}div,hr{box-sizing:border-box}button{outline:none;border:none;background:none}a{color:inherit;text-decoration:inherit}:root{--bg-dark: #343D55;--bg-darker: #151925;--text-primary: #151925;--text-muted: #868DA0;--text-meta: #909090;--surface: #FFFFFF;--surface-alt: #F3F4F5;--dot-color: #D5D9DC;--accent: #3D69ED;--radius: 6px;--content-px: clamp(25px, 5vw, 75px);--font-header: clamp(20px, 3vw, 32px);--font-body: clamp(13px, 1.5vw, 18px);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif}#app{height:100dvh}button,a,.clickable{cursor:pointer;user-select:none;transition:opacity .15s}button:not(.opaque):hover,a:not(.opaque):hover,.clickable:not(.opaque):hover{opacity:.8}button:not(.opaque):active,a:not(.opaque):active,.clickable:not(.opaque):active{opacity:.6}.subtext{color:var(--text-muted);font-size:clamp(13px,1.5vw,16px);line-height:22px;text-align:center}.link.colored{color:var(--accent)}.card{border-radius:var(--radius);box-shadow:#00000026 0 2px 8px;transition:all .2s}.card.clickable:hover{box-shadow:#00000040 0 2px 9px;transform:translateY(-1px)}.variable{transition:width .6s cubic-bezier(.65,0,.35,1),margin .6s cubic-bezier(.65,0,.35,1)}.class-average{color:var(--text-meta)}.point{flex-shrink:0;width:8px;height:8px;background-color:var(--dot-color);border-radius:50%}.point.big{width:10px;height:10px}.point.small{width:6px;height:6px}#background{position:relative;z-index:1;flex-grow:1;overflow:hidden;background:linear-gradient(-212deg,var(--bg-dark) 0%,var(--bg-darker) 95%)}.triangle{position:absolute}#top-triangle{top:-175px;left:-175px;width:500px;filter:drop-shadow(3px 3px 15px rgba(0,0,0,.25))}#bottom-triangle{bottom:-75px;right:-100px;width:600px;filter:drop-shadow(-3px -3px 15px rgba(0,0,0,.25))}#content{flex-direction:column;justify-content:space-between;align-items:center;z-index:2;width:575px;padding:35px 0;overflow-y:auto;background-color:var(--surface)}#content.wide{width:1200px}#content.wide #header #logo{width:300px;margin:0}#header{width:100%;padding:20px var(--content-px);justify-content:space-between;align-items:center;flex-shrink:0;overflow:hidden}#header #logo{flex-shrink:0;width:400px;margin-top:25px;margin-left:12.5px}#header #logo svg{width:100%;height:auto}#header #logout{color:#251515;font-size:clamp(16px,2vw,22px);font-weight:500}#footer{flex-direction:column;flex-shrink:0}#footer #links{justify-content:center;margin-bottom:8px;font-weight:500;font-size:clamp(16px,2vw,22px);color:var(--text-primary)}#main{flex-direction:column;flex-grow:1;justify-content:center;width:100%}.loading{flex-direction:column;align-items:center;padding:0 var(--content-px)}.loading-step{margin-top:clamp(20px,4vw,40px);font-size:clamp(16px,2vw,20px);font-weight:600;color:var(--text-primary);text-align:center}.loading-request{margin-top:6px;min-height:1.4em;max-width:100%;font-size:clamp(11px,1.2vw,13px);font-family:SF Mono,Cascadia Code,Fira Code,monospace;color:var(--text-muted);text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:0;transition:opacity .15s}.loading-request:not(:empty){opacity:1}.loading-quote{margin-top:clamp(25px,4vw,40px);font-size:clamp(13px,1.4vw,15px);font-style:italic;color:var(--text-muted);text-align:center;opacity:.6}.spinner{width:clamp(60px,8vw,85px);animation:spin .75s linear infinite}.spinner svg{width:100%;height:100%}@keyframes spin{to{transform:rotate(360deg)}}.content{flex-direction:column;flex-grow:1;align-items:flex-start;padding:5px var(--content-px);margin-bottom:25px;overflow-y:auto}.header{flex-direction:column;position:relative;font-weight:700;font-size:var(--font-header)}.header hr{width:100%;border-bottom:0;border-color:var(--surface);position:relative;z-index:-1}.filters{justify-content:space-between;width:100%;margin-bottom:clamp(30px,4vw,50px)}.combo-box{flex-direction:column;position:relative}.combo-box .name{height:20px;margin-bottom:clamp(5px,1vw,8px);margin-left:1px;color:#343434;font-size:clamp(14px,1.5vw,16px)}.combo-box .box{justify-content:space-between;align-items:center;min-width:clamp(200px,30vw,400px);height:clamp(32px,4vw,40px);padding:0 12px;border-radius:var(--radius);background-color:var(--surface-alt);font-size:clamp(12px,1.5vw,16px)}.combo-box .box svg{height:clamp(8px,1vw,10px);margin-top:2px;transition:transform .125s}.combo-box .box.opened svg{transform:rotate(180deg)}.combo-box .choices{flex-direction:column;position:absolute;top:75px;z-index:2;width:100%;background-color:var(--surface);border-radius:var(--radius);font-size:clamp(12px,1.5vw,16px)}.combo-box .choices .choice{padding:8px 12px;transition:background-color .15s}.combo-box .choices .choice:hover{background-color:#0000000d}.combo-box .choices .choice:active{background-color:#0000001a}.combo-box .choices .choice:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.combo-box .choices .choice:last-child{border-bottom-left-radius:var(--radius);border-bottom-right-radius:var(--radius)}.no-updates{margin-bottom:20px;font-size:var(--font-body)}.updates{flex-direction:column;width:100%;margin-bottom:15px}.updates .update{align-items:center;margin-bottom:10px;padding-left:35px;font-size:clamp(18px,2.5vw,28px)}.updates .update .top{align-items:center}.updates .update .top .id{margin-left:15px;margin-right:10px;font-weight:700}.updates .update .top .dash{margin-right:10px;font-size:clamp(18px,2vw,24px)}.updates .update .top .name{font-size:var(--font-body);margin-right:10px}.updates .update .top .name .target{font-weight:500}.updates .update .mark{align-items:center;margin-bottom:1px;font-weight:500}.updates .update .mark .point{margin-left:2px;margin-right:12px}.updates .update .mark .from{color:#a5a9b5;text-decoration:line-through}.updates .update .mark .update-arrow{margin:0 10px}.updates .update .mark .type-sign{margin-left:12px;margin-bottom:2px}.updates .update .mark .type-sign svg{width:30px}.big-list{flex-direction:column;margin-bottom:20px;padding-top:5px;transition:opacity .15s}.big-list .entry{align-items:center;margin-bottom:12px;padding-left:clamp(15px,3vw,35px);font-size:clamp(18px,2.8vw,26px)}.big-list .entry .name{margin-left:12px;margin-right:10px}.big-list .entry .mark{margin-left:10px}.big-list .entry .mark .value{font-weight:700}.coeff-info{flex-direction:column;margin-top:8px;padding-left:clamp(15px,3vw,35px);font-size:clamp(14px,1.8vw,18px)}.coeff-main{align-items:center;gap:12px;font-weight:500}.coeff-muted{color:var(--text-muted);font-weight:400}.coeff-links{margin-top:5px;margin-left:20px;font-size:clamp(12px,1.4vw,15px);font-weight:500}.coeff-copied{color:#44b732!important}.api-error-panel{flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;height:100%;padding:40px 30px;gap:16px;z-index:2}.api-error-title{font-size:22px;font-weight:700;color:#e34e4e}.api-error-desc{font-size:14px;color:#aaa;line-height:1.6;max-width:400px}.api-error-box{background:#1e2233;color:#ff6b6b;padding:12px 18px;border-radius:10px;font-size:11px;max-width:100%;overflow-x:auto;text-align:left;white-space:pre-wrap;word-break:break-word}.api-error-actions{gap:10px;flex-wrap:wrap;justify-content:center}.api-error-btn{padding:8px 20px;border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;border:1px solid #444;background:none;color:#aaa;text-decoration:none}.api-error-btn.primary{background:#fff;color:#151925;border-color:#fff}.api-error-btn.muted{color:#666;border-color:#444;font-weight:400}.api-error-btn:hover{opacity:.85}.empty-state{flex-direction:column;align-items:center;justify-content:center;width:100%;flex-grow:1;padding:60px 20px;text-align:center;gap:8px}.empty-state-text{font-size:18px;font-weight:600;color:var(--text-primary)}.empty-state-hint{font-size:14px;color:var(--text-muted)}hr.separator{width:100%;margin-top:25px;opacity:.3;border-bottom:0;border-color:var(--surface)}.header.module{max-width:100%;margin-top:50px}.header.module .text{align-items:center}.header.module .name,.header.module .average,.header.module .class-average,.header.module .max{white-space:nowrap}.header.module .name{display:inline-block;overflow:hidden;text-overflow:ellipsis;padding-bottom:2px}.header.module .point{margin:2px 10px 0}.header.module .class-average{margin-left:10px;font-weight:400}.subject{width:100%;margin:15px 0}.subject .info{flex-direction:column;align-items:center;flex-shrink:0;width:250px;padding-top:15px;padding-bottom:17px}.subject .info .top,.subject .info .bottom{display:contents}.subject .info .id{font-weight:700;font-size:24px;word-break:break-word}.subject .info .point{display:none}.subject .info .average{margin-top:10px;font-size:24px}.subject .info .average .value{font-weight:700}.subject .info .class-average{font-size:14px}.subject .info .bottom-line{display:none}.subject .marks{flex-direction:column;flex-grow:1;justify-content:center;max-width:calc(100% - 275px);padding:15px 0;font-size:16px}.subject .marks .marks-title{font-weight:600;font-size:15px;margin-bottom:6px;color:#444}.subject .marks .mark{align-items:center;max-width:100%;margin:3px 0}.subject .marks .mark .point{margin-bottom:1px}.subject .marks .mark .line{display:contents}.subject .marks .mark .name,.subject .marks .mark .value,.subject .marks .mark .class-average{white-space:nowrap}.subject .marks .mark .name{display:inline-block;margin-left:15px;overflow:hidden;text-overflow:ellipsis;padding-bottom:2px}.subject .marks .mark .value{justify-content:flex-end;margin-left:1px;font-weight:700}.subject .marks .mark .class-average{margin-left:10px}.coeff-override{margin-left:8px;color:var(--text-muted);font-weight:400;font-size:.75em;opacity:.7}.copy-code{display:inline-block;border-bottom:1px dashed var(--dot-color)}.copy-code:hover{border-bottom-color:var(--text-muted)}.code-tooltip{position:fixed;z-index:9999;padding:5px 12px;border-radius:5px;background:var(--bg-darker);color:#e8eaed;font-size:13px;font-weight:500;letter-spacing:.3px;font-family:SF Mono,Cascadia Code,Fira Code,monospace;white-space:nowrap;pointer-events:none;box-shadow:0 4px 12px #0000004d;opacity:0;transition:opacity .12s}.code-tooltip.copied{background:var(--accent);color:#fff;font-family:inherit}.no-marks{flex-grow:1;justify-content:center;align-items:center;width:100%;font-size:28px}@media (max-width: 850px){.filters{flex-direction:column;gap:15px}.header hr{margin-top:9px}.updates{margin-top:4px;margin-bottom:12px}.updates .update{display:grid;grid-template-columns:17px 100%;margin-bottom:6px;padding-left:15px}.updates .update>.point{width:6px;height:6px}.updates .update .top .id{margin-left:0;margin-right:6px}.updates .update .top .name{display:inline-block;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.updates .update .top .name .target{display:none}.updates .update .mark{grid-column:2 / 3;height:23px}.updates .update .mark .point{display:none}.updates .update .mark .update-arrow{width:20px;margin:0 6px 1px}.updates .update .mark .type-sign{width:14px;margin-left:6px;margin-bottom:2px}.header.module{margin-top:20px;margin-bottom:6px}.header.module .text{flex-direction:column;align-items:flex-start;margin-left:-1px}.header.module .text .name{max-width:100%;margin-bottom:2px;font-size:20px}.header.module .text .point{display:none}.header.module .text .bottom{align-items:center;font-size:16px}.header.module .text .bottom .class-average{margin-left:5px;font-size:14px}.header.module .bottom-line{margin-top:7px;margin-bottom:1px;opacity:.6}.subject{flex-direction:column;margin:10px 0;padding:10px 14px}.subject .no-marks{margin:4px 0;font-size:14px}.subject .info{align-items:flex-start;width:100%;padding:0}.subject .info .top,.subject .info .bottom{display:flex;align-items:center;max-width:100%}.subject .info .id{font-size:18px}.subject .info .point{display:block;width:5px;height:5px;margin:0 8px}.subject .info .average{margin:0;font-size:14px}.subject .info .class-average{margin-left:5px;font-size:12px}.subject .info .bottom-line{display:block;width:100%;border-bottom:0;border-color:var(--surface);opacity:.3}.subject .marks{max-width:100%;padding:0}.subject .marks .mark{display:grid;grid-template-columns:12px calc(100% - 5px);padding:0 5px}.subject .marks .mark .point{width:5px;height:5px;margin-top:1px}.subject .marks .mark .line{display:flex;flex-direction:row-reverse;justify-content:flex-end;font-size:13px}.subject .marks .mark .line .name{margin-left:0}.subject .marks .mark .line .value{width:auto;margin-left:0}.subject .marks .mark .class-average{grid-column:2 / 3;margin-left:0;font-size:11px}.subject .marks .mark .class-average .parenthesis{display:none}}@media (max-width: 575px){#header{flex-direction:column;padding:0;justify-content:center;margin-bottom:20px}#header #logo{margin-top:15px;margin-left:0;max-width:80%}#content{padding:15px 0}hr.separator{margin-top:0;margin-bottom:5px}}@media (max-height: 650px){#header #logo{margin-top:0}#header #logo svg{height:115px}}@media (max-height: 550px){#header{margin-bottom:10px}#header #logo svg{height:100px}#header #logout{font-size:16px}}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--dot-color);border-radius:3px}\n";(document.head||document.documentElement).appendChild(s)})();
(function() {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
	var __commonJSMin = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
	var __exportAll = (all, no_symbols) => {
		let target = {};
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
		if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
		return target;
	};
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	//#region src/lib/auriga/api.js
	var AURIGA_API = "/api";
	var _accessToken = null;
	var _onApiRequest = null;
	function setApiRequestHook(fn) {
		_onApiRequest = fn;
	}
	function setAccessToken(token) {
		_accessToken = token;
	}
	function getAccessToken() {
		return _accessToken;
	}
	async function apiFetch(path, options = {}, _retried = false) {
		if (!_accessToken) throw new Error("No access token available");
		const url = path.startsWith("http") ? path : `${AURIGA_API}${path}`;
		_onApiRequest?.(url);
		const response = await fetch(url, {
			...options,
			headers: {
				"Authorization": `Bearer ${_accessToken}`,
				"Content-Type": "application/json",
				...options.headers
			}
		});
		if (response.status === 401 && !_retried) {
			await new Promise((r) => setTimeout(r, 2e3));
			return apiFetch(path, options, true);
		}
		if (!response.ok) throw new Error(`Auriga API error: ${response.status} ${response.statusText} (${url})`);
		const text = await response.text();
		try {
			return JSON.parse(text);
		} catch {
			throw new Error(`Auriga API returned invalid JSON for ${url} (got ${text.substring(0, 100)}...)`);
		}
	}
	/**
	* Fetch all pages of a search result endpoint.
	* Handles pagination transparently - returns all lines across pages.
	*/
	async function fetchAllSearchResults(menuEntryId, queryId) {
		const body = (await apiFetch(`/menuEntries/${menuEntryId}/query/${queryId}`)).queryDefinition;
		let allLines = [];
		let page = 1;
		let totalPages = 1;
		do {
			const result = await apiFetch(`/menuEntries/${menuEntryId}/searchResult?size=100&page=${page}&sort=id&disableWarnings=true`, {
				method: "POST",
				body: JSON.stringify(body)
			});
			allLines = allLines.concat(result.content.lines);
			totalPages = result.totalPages;
			page++;
		} while (page <= totalPages);
		return allLines;
	}
	//#endregion
	//#region src/lib/auriga/auth.js
	var _userInfo = null;
	var _tokenListeners = [];
	/**
	* Intercept XHR calls to the Keycloak token endpoint to capture fresh tokens.
	* The Angular app refreshes the token on load and every ~60s — we piggyback on that.
	*/
	function installTokenInterceptor() {
		const origOpen = XMLHttpRequest.prototype.open;
		const origSend = XMLHttpRequest.prototype.send;
		XMLHttpRequest.prototype.open = function(method, url, ...args) {
			this._aurigaUrl = url;
			return origOpen.call(this, method, url, ...args);
		};
		XMLHttpRequest.prototype.send = function(body) {
			if (this._aurigaUrl && this._aurigaUrl.includes("openid-connect/token")) this.addEventListener("load", function() {
				try {
					const data = JSON.parse(this.responseText);
					if (data.access_token) {
						setAccessToken(data.access_token);
						_tokenListeners.forEach((fn) => fn());
						_tokenListeners = [];
					}
				} catch (e) {}
			});
			return origSend.call(this, body);
		};
	}
	/**
	* Wait for the token interceptor to capture a valid token.
	*
	* Resolves immediately if a token is already available.
	* Otherwise, waits for the next token capture event.
	*
	* No artificial timeout — if the user isn't logged in, Angular will
	* redirect to Keycloak (different domain) and this promise simply
	* never resolves, which is fine since our script dies with the navigation.
	*/
	function waitForToken() {
		if (getAccessToken()) return Promise.resolve();
		return new Promise((resolve) => {
			_tokenListeners.push(resolve);
		});
	}
	/**
	* Fetch and cache user info from /api/me.
	* Returns { firstName, lastName, fullName, personId }.
	*/
	async function getUserInfo() {
		if (_userInfo) return _userInfo;
		if (window.location.hostname === "localhost") {
			_userInfo = {
				firstName: "Dev",
				lastName: "User",
				fullName: "Dev User",
				personId: 0
			};
			return _userInfo;
		}
		const data = await apiFetch("/me");
		_userInfo = {
			firstName: data.person.currentFirstName,
			lastName: data.person.currentLastName,
			fullName: `${data.person.currentFirstName} ${data.person.currentLastName}`,
			personId: data.person.id
		};
		return _userInfo;
	}
	/**
	* Get user display name.
	*/
	async function getName() {
		return (await getUserInfo()).fullName;
	}
	//#endregion
	//#region src/lib/toggle.js
	var PREF_KEY = "infinity_auriga_enabled";
	function isInfinityEnabled() {
		return localStorage.getItem(PREF_KEY) !== "0";
	}
	/**
	* Create the view switcher. Switching modes reloads the page.
	*/
	function setupToggle(active) {
		const style = document.createElement("style");
		style.textContent = `
        #view-switcher { display:flex; position:fixed; bottom:28px; left:28px; z-index:9999; padding:4px; border-radius:14px; background:#fff; box-shadow:0 4px 20px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.06); font-family:system-ui,-apple-system,sans-serif; }
        #view-switcher .switcher-pill { position:absolute; top:4px; left:4px; width:calc(50% - 4px); height:calc(100% - 8px); border-radius:11px; background:#151925; transition:transform .3s cubic-bezier(.4,0,.2,1); pointer-events:none; }
        #view-switcher .switcher-option { position:relative; z-index:1; padding:10px 24px; border-radius:11px; background:none; border:none; outline:none; color:#868DA0; font-size:14px; font-weight:600; font-family:inherit; letter-spacing:.3px; cursor:pointer; user-select:none; white-space:nowrap; transition:color .25s; }
        #view-switcher .switcher-option:hover { color:#151925; }
        #view-switcher .switcher-option.active { color:#fff; }
    `;
		document.head.appendChild(style);
		const switcher = document.createElement("div");
		switcher.id = "view-switcher";
		const pill = document.createElement("div");
		pill.className = "switcher-pill";
		const btnInfinity = document.createElement("button");
		btnInfinity.className = "switcher-option" + (active === "infinity" ? " active" : "");
		btnInfinity.textContent = "Infinity";
		const btnClassic = document.createElement("button");
		btnClassic.className = "switcher-option" + (active === "classic" ? " active" : "");
		btnClassic.textContent = "Classique";
		pill.style.transform = active === "infinity" ? "translateX(0)" : "translateX(100%)";
		switcher.append(pill, btnInfinity, btnClassic);
		document.body.appendChild(switcher);
		btnInfinity.addEventListener("click", () => {
			if (active === "infinity") return;
			localStorage.setItem(PREF_KEY, "1");
			window.location.reload();
		});
		btnClassic.addEventListener("click", () => {
			if (active === "classic") return;
			localStorage.setItem(PREF_KEY, "0");
			window.location.reload();
		});
	}
	//#endregion
	//#region src/lib/auriga/hierarchy.js
	/**
	* Parse an Auriga exam code into its hierarchical components.
	*
	* Code anatomy:
	*   2526_I_INF_FISA_S07_CS_GR_WS_EX
	*   │    │ │   │    │   └── path segments ──┘ └─ evalType
	*   [0]  1 2   3    4       5...               last (if in EVAL_TYPES)
	*
	*   [0] year       — academic year (25/26)
	*   [1] constant   — always "I"
	*   [2] school     — school code (INF for EPITA informatique)
	*   [3] track      — FISA, FISE, GISTRE, ...
	*   [4] semester   — S07, S08, ...
	*   [5+] path      — module / subject / exam segments
	*   [last] evalType — EX, PRJ, etc. (stripped from path if recognized)
	*/
	var EVAL_TYPES = new Set([
		"EX",
		"PRJ",
		"EXF",
		"EXO",
		"FAF",
		"PROJ"
	]);
	var EVAL_LABELS = {
		EX: "Examen",
		EXF: "Examen final",
		EXO: "Examen oral",
		PRJ: "Projet",
		PROJ: "Projet",
		FAF: "Contrôle continu"
	};
	/**
	* @param {string} code - The full exam code
	* @param {string|null} [apiExamType] - Exam type from the API column (skips guessing when present)
	*/
	function parseExamCode(code, apiExamType = null) {
		const parts = code.split("_");
		if (parts.length < 5) return null;
		const year = parts[0];
		const school = parts[2];
		const track = parts[3];
		const semester = parts[4];
		const rest = parts.slice(5);
		let evalType = apiExamType;
		let path = rest;
		if (!evalType && rest.length > 0 && EVAL_TYPES.has(rest[rest.length - 1])) {
			evalType = rest[rest.length - 1];
			path = rest.slice(0, -1);
		}
		return {
			year,
			school,
			track,
			semester,
			path,
			evalType,
			fullCode: code
		};
	}
	/**
	* Build a name lookup from parsed synthesis entries.
	*/
	function buildNameLookup(entries) {
		const lookup = /* @__PURE__ */ new Map();
		for (const entry of entries) lookup.set(entry.examCode, {
			name: entry.name,
			avgPreRatt: entry.avgPreRatt,
			avgFinal: entry.avgFinal
		});
		return lookup;
	}
	/**
	* Detect transparent path prefixes — codes that are containers (semester wrappers,
	* phantom groupings like SAE) rather than real UEs.
	*
	* A prefix is transparent if:
	*   1. Pedagogical API marks it as "Semester" type, OR
	*   2. Its synthesis name contains "semestre", OR
	*   3. It has no synthesis name AND has multiple distinct children
	*      (phantom grouping — e.g. SAE groups DEVSEC + INT but isn't a real UE)
	*
	* Detection is applied recursively: if CS is transparent and SAE (under CS) is also
	* transparent, both are stripped. CS_SAE_INT_PEN → [INT, PEN].
	*/
	function detectTransparentPrefixes(grades, nameLookup, componentTypes) {
		const children = /* @__PURE__ */ new Map();
		for (const grade of grades) {
			const parsed = parseExamCode(grade.examCode, grade.examType);
			if (!parsed || parsed.path.length < 2) continue;
			const id0 = parsed.path[0];
			if (!children.has(id0)) children.set(id0, /* @__PURE__ */ new Set());
			children.get(id0).add(parsed.path[1]);
			if (parsed.path.length >= 3) {
				const key = id0 + ">" + parsed.path[1];
				if (!children.has(key)) children.set(key, /* @__PURE__ */ new Set());
				children.get(key).add(parsed.path[2]);
			}
		}
		const transparent = /* @__PURE__ */ new Set();
		function isTransparent(pathId, fullCode, key) {
			if (componentTypes) {
				const type = componentTypes.get(fullCode);
				if (type && /semester/i.test(type)) return true;
			}
			const info = resolveName(fullCode, "_" + pathId, nameLookup);
			if (info && /semestre/i.test(info.name)) return true;
			if (!info && (children.get(key)?.size ?? 0) > 1) return true;
			return false;
		}
		const checked = /* @__PURE__ */ new Set();
		for (const grade of grades) {
			const parsed = parseExamCode(grade.examCode, grade.examType);
			if (!parsed || parsed.path.length < 2) continue;
			const prefix = `${parsed.year}_I_${parsed.school}_${parsed.track}_${parsed.semester}`;
			const id0 = parsed.path[0];
			if (!checked.has(id0)) {
				checked.add(id0);
				if (isTransparent(id0, `${prefix}_${id0}`, id0)) transparent.add(id0);
			}
			if (transparent.has(id0) && parsed.path.length >= 3) {
				const id1 = parsed.path[1];
				const key = id0 + ">" + id1;
				if (!checked.has(key)) {
					checked.add(key);
					if (isTransparent(id1, `${prefix}_${id0}_${id1}`, key)) transparent.add(key);
				}
			}
		}
		return transparent;
	}
	/**
	* Get the effective path for a grade, skipping transparent prefixes.
	* CS_SAE_INT_PEN → [INT, PEN] (CS and SAE both skipped)
	* CS_CN_COCO     → [CN, COCO] (CS skipped)
	* CN_COLIN       → [CN, COLIN] (no skip)
	*/
	function effectivePath(path, transparentPrefixes) {
		let p = path;
		if (p.length >= 2 && transparentPrefixes.has(p[0])) {
			const key = p[0] + ">" + p[1];
			if (p.length >= 3 && transparentPrefixes.has(key)) p = p.slice(2);
			else p = p.slice(1);
		}
		return p;
	}
	/**
	* Pre-scan to detect which depth-2 path prefixes need depth-3 subject grouping.
	* Only promotes when depth-3 entries have children (path length >= 4),
	* meaning they're sub-subject groupings, not leaf exams.
	*/
	function detectSubjectDepths(grades, transparentPrefixes) {
		const info = /* @__PURE__ */ new Map();
		for (const grade of grades) {
			const parsed = parseExamCode(grade.examCode, grade.examType);
			if (!parsed) continue;
			const path = effectivePath(parsed.path, transparentPrefixes);
			if (path.length < 3) continue;
			const key = path.slice(0, 2).join("_");
			if (!info.has(key)) info.set(key, {
				subGroups: /* @__PURE__ */ new Set(),
				maxDepth: 0
			});
			const entry = info.get(key);
			entry.subGroups.add(path[2]);
			entry.maxDepth = Math.max(entry.maxDepth, path.length);
		}
		const deep = /* @__PURE__ */ new Set();
		for (const [key, { subGroups, maxDepth }] of info) if (subGroups.size > 1 && maxDepth >= 4) deep.add(key);
		return deep;
	}
	/**
	* Find the subject grouping level for a path.
	* Default depth 2, promoted to depth 3 when detected as deep.
	*/
	function findSubjectLevel(prefix, path, deepPrefixes) {
		if (path.length >= 3) {
			const d2 = path.slice(0, 2).join("_");
			if (deepPrefixes.has(d2)) {
				const id = path.slice(0, 3).join("_");
				return {
					id,
					code: `${prefix}_${id}`
				};
			}
		}
		if (path.length >= 2) {
			const id = path.slice(0, 2).join("_");
			return {
				id,
				code: `${prefix}_${id}`
			};
		}
		return {
			id: path[0] || "TC",
			code: `${prefix}_${path[0] || "TC"}`
		};
	}
	/**
	* Resolve a name from the lookup, falling back to cross-semester suffix matching.
	*/
	function resolveName(code, suffix, nameLookup) {
		const info = nameLookup.get(code);
		if (info) return info;
		for (const [key, val] of nameLookup) if (key.endsWith(suffix)) return val;
		return null;
	}
	/**
	* Build the grade tree from parsed grade entries.
	*
	* Hierarchy: Module (UE) → Subject (ECUE) → Mark (individual grade)
	*
	* Semester containers (e.g. CS) are detected and made transparent —
	* their children are promoted to top-level modules. This merges
	* entries like CS_CN_* and CN_* into the same module.
	*/
	function buildGradeTree(grades, nameLookup, componentTypes = null) {
		const transparentPrefixes = detectTransparentPrefixes(grades, nameLookup, componentTypes);
		const deepPrefixes = detectSubjectDepths(grades, transparentPrefixes);
		const modules = /* @__PURE__ */ new Map();
		for (const grade of grades) {
			const parsed = parseExamCode(grade.examCode, grade.examType);
			if (!parsed) continue;
			const { semester, school } = parsed;
			const prefix = `${parsed.year}_I_${school}_${parsed.track}_${semester}`;
			const path = effectivePath(parsed.path, transparentPrefixes);
			const moduleId = path[0] || "TC";
			const moduleCode = `${prefix}_${moduleId}`;
			const subject = findSubjectLevel(prefix, path, deepPrefixes);
			if (!modules.has(moduleCode)) {
				const info = resolveName(moduleCode, "_" + moduleId, nameLookup);
				let name = moduleId;
				if (info) name = info.name.length <= 40 ? info.name : moduleId;
				const modPromo = info?.avgPreRatt ? parseFloat(info.avgPreRatt) : NaN;
				modules.set(moduleCode, {
					id: moduleId,
					_code: moduleCode,
					name,
					average: null,
					classAverage: isNaN(modPromo) ? null : modPromo,
					subjects: /* @__PURE__ */ new Map()
				});
			}
			const mod = modules.get(moduleCode);
			if (!mod.subjects.has(subject.code)) {
				const info = resolveName(subject.code, "_" + subject.id, nameLookup);
				const subPromo = info?.avgPreRatt ? parseFloat(info.avgPreRatt) : NaN;
				mod.subjects.set(subject.code, {
					id: subject.id,
					_code: subject.code,
					name: info ? info.name : subject.id.replace(/_/g, " "),
					average: null,
					classAverage: isNaN(subPromo) ? null : subPromo,
					coefficient: 1,
					marks: []
				});
			}
			const sub = mod.subjects.get(subject.code);
			if (sub.marks.some((m) => m._code === grade.examCode)) continue;
			const examInfo = nameLookup.get(grade.examCode);
			const promoAvg = examInfo?.avgPreRatt ? parseFloat(examInfo.avgPreRatt) : null;
			sub.marks.push({
				id: sub.marks.length,
				_code: grade.examCode,
				name: examInfo ? examInfo.name : parsed.evalType || "Note",
				value: grade.mark,
				classAverage: isNaN(promoAvg) ? null : promoAvg,
				coefficient: grade.coefficient
			});
		}
		const result = [];
		for (const [, mod] of modules) {
			mod.subjects = [...mod.subjects.values()];
			for (const sub of mod.subjects) {
				if (sub.marks.length < 2) continue;
				const baseName = (name) => {
					const i = name.lastIndexOf(" - ");
					return i > 0 ? name.slice(0, i) : name;
				};
				const baseCounts = /* @__PURE__ */ new Map();
				for (const mark of sub.marks) {
					const base = baseName(mark.name);
					baseCounts.set(base, (baseCounts.get(base) || 0) + 1);
				}
				for (const mark of sub.marks) {
					const base = baseName(mark.name);
					if (baseCounts.get(base) < 2) continue;
					mark._group = base;
					if (mark.name === base) {
						const parsed = parseExamCode(mark._code);
						mark.name = parsed?.evalType ? EVAL_LABELS[parsed.evalType] || parsed.evalType : base;
					}
				}
			}
			result.push(mod);
		}
		return result;
	}
	//#endregion
	//#region src/lib/auriga/schema.js
	/**
	* Auriga API response schema — column mappings and line parsers.
	*
	* ┌─────────────────────────────────────────────────────────────────┐
	* │  THIS IS THE SINGLE FILE TO UPDATE IF AURIGA CHANGES FORMAT.   │
	* └─────────────────────────────────────────────────────────────────┘
	*
	* Auriga search endpoints return { content: { columns: [...], lines: [...] } }.
	* Each line is an array of values whose positions are defined below.
	*
	* GRADES endpoint (APP_040_010_MES_NOTES, e.g. menuEntry 1036):
	*   [0] internalId   [1] mark (string)  [2] coefficient  [3] examCode  [4] examType
	*
	* SYNTHESIS endpoint (APP_040_010_MES_NOTES_SYNT, e.g. menuEntry 1144):
	*   [0] personId     [1] avgPreRatt     [2] examCode      [3] caption {fr,en}  [4] avgFinal
	*
	* PEDAGOGICAL REGISTRATION endpoint (APP_000_014_INSC_PEDA, e.g. menuEntry 1034):
	*   [0] internalId   [1] examCode       [2] obligationType {en,fr}   [3] registrationStatus {en,fr}
	*   Component types (en): "Semester", "EU Resource", "EU Authentic Assessment Situation",
	*                         "Educational unit (ECUE)"
	*
	* Last verified: 2026-03-26 against capture auriga-capture-1774299604740.json
	*/
	var MENU_CODES = {
		grades: "APP_040_010_MES_NOTES",
		synthesis: "APP_040_010_MES_NOTES_SYNT",
		pedagogical: "APP_000_014_INSC_PEDA"
	};
	var GRADES = {
		internalId: 0,
		mark: 1,
		coefficient: 2,
		examCode: 3,
		examType: 4
	};
	var SYNTHESIS = {
		personId: 0,
		avgPreRatt: 1,
		examCode: 2,
		caption: 3,
		avgFinal: 4
	};
	var PEDAGOGICAL = {
		internalId: 0,
		examCode: 1,
		obligationType: 2,
		registrationStatus: 3
	};
	/**
	* Check parsed results for signs that the API format has changed.
	* Call after parsing a batch of lines — throws if most lines failed to parse.
	*
	* @param {string} endpoint - Human-readable name ("grades" or "synthesis")
	* @param {Array} rawLines - Original raw lines from the API
	* @param {Array} parsed - Successfully parsed entries (nulls filtered out)
	*/
	function validateParseResults(endpoint, rawLines, parsed) {
		if (rawLines.length === 0) return;
		const failRate = 1 - parsed.length / rawLines.length;
		if (failRate > .5) throw new Error(`API format changed: ${Math.round(failRate * 100)}% of ${endpoint} lines failed to parse (${parsed.length}/${rawLines.length} succeeded). Check schema.js column indices against a fresh capture.`);
	}
	/**
	* Parse a raw grade line into a named object.
	*
	* @param {Array} line - Raw array from Auriga searchResult
	* @returns {{ mark: number, coefficient: number, examCode: string, examType: string|null } | null}
	*/
	function parseGradeLine(line) {
		const examCode = line[GRADES.examCode];
		if (!examCode || typeof examCode !== "string") {
			console.warn("[Infinity] Unexpected grade line — examCode missing at index", GRADES.examCode, line);
			return null;
		}
		const mark = parseFloat(line[GRADES.mark]);
		if (isNaN(mark)) return null;
		return {
			mark,
			coefficient: line[GRADES.coefficient] || 100,
			examCode,
			examType: line[GRADES.examType] || null
		};
	}
	/**
	* Parse a raw synthesis line into a named object.
	*
	* @param {Array} line - Raw array from Auriga searchResult
	* @returns {{ examCode: string, name: string, avgPreRatt: *, avgFinal: * } | null}
	*/
	function parseSynthesisLine(line) {
		const examCode = line[SYNTHESIS.examCode];
		if (!examCode || typeof examCode !== "string") {
			console.warn("[Infinity] Unexpected synthesis line — examCode missing at index", SYNTHESIS.examCode, line);
			return null;
		}
		const caption = line[SYNTHESIS.caption] || {};
		return {
			examCode,
			name: caption.fr || caption.en || examCode,
			avgPreRatt: line[SYNTHESIS.avgPreRatt],
			avgFinal: line[SYNTHESIS.avgFinal]
		};
	}
	/**
	* Parse a pedagogical registration line into a named object.
	* Returns the component type (en) which tells us the hierarchy level.
	*
	* @param {Array} line - Raw array from Auriga searchResult
	* @returns {{ examCode: string, componentType: string } | null}
	*/
	function parsePedagogicalLine(line) {
		const examCode = line[PEDAGOGICAL.examCode];
		if (!examCode || typeof examCode !== "string") return null;
		const typeCaption = line[PEDAGOGICAL.obligationType] || {};
		return {
			examCode,
			componentType: typeCaption.en || typeCaption.fr || ""
		};
	}
	//#endregion
	//#region src/lib/auriga/marks.js
	var _menuConfig = null;
	async function getMenuConfig() {
		if (_menuConfig) return _menuConfig;
		const menus = await apiFetch("/menus");
		const entries = {};
		for (const menu of menus.menus) for (const obj of menu.objects || []) entries[obj.menuEntryCode] = {
			menuEntryId: obj.menuEntryId,
			queryId: obj.queryId,
			formId: obj.formId
		};
		_menuConfig = {
			grades: entries[MENU_CODES.grades],
			synthesis: entries[MENU_CODES.synthesis],
			pedagogical: entries[MENU_CODES.pedagogical]
		};
		if (!_menuConfig.grades) throw new Error(`Menu entries not found: grades (${MENU_CODES.grades}). Available: ${Object.keys(entries).join(", ")}. Auriga may have renamed its menu structure.`);
		if (!_menuConfig.synthesis) throw new Error(`Menu entries not found: synthesis (${MENU_CODES.synthesis}). Available: ${Object.keys(entries).join(", ")}. Auriga may have renamed its menu structure.`);
		return _menuConfig;
	}
	var _cachedSynthesisEntries = null;
	var _componentTypesPromise;
	/**
	* Fetch component type map from the pedagogical registration endpoint.
	* Returns a Map<examCode, componentType> (e.g. "Semester", "EU Resource", etc.)
	* Falls back to null if the endpoint is unavailable.
	*/
	function getComponentTypes() {
		if (_componentTypesPromise) return _componentTypesPromise;
		_componentTypesPromise = (async () => {
			const config = await getMenuConfig();
			if (!config.pedagogical) return null;
			try {
				const entries = (await fetchAllSearchResults(config.pedagogical.menuEntryId, config.pedagogical.queryId)).map(parsePedagogicalLine).filter(Boolean);
				const types = /* @__PURE__ */ new Map();
				for (const { examCode, componentType } of entries) types.set(examCode, componentType);
				return types;
			} catch (err) {
				console.warn("[Infinity Auriga] Failed to fetch pedagogical data, using fallback:", err.message);
				return null;
			}
		})();
		return _componentTypesPromise;
	}
	async function getMarksFilters() {
		const synth = (await getMenuConfig()).synthesis;
		const rawLines = await fetchAllSearchResults(synth.menuEntryId, synth.queryId);
		const entries = rawLines.map(parseSynthesisLine).filter(Boolean);
		validateParseResults("synthesis", rawLines, entries);
		_cachedSynthesisEntries = entries;
		const semesters = /* @__PURE__ */ new Map();
		for (const entry of entries) {
			const parsed = parseExamCode(entry.examCode);
			if (!parsed) continue;
			const key = `${parsed.semester}_${parsed.year}`;
			if (!semesters.has(key)) {
				const semNum = parsed.semester.replace("S", "");
				const yearStart = "20" + parsed.year.substring(0, 2);
				const yearEnd = "20" + parsed.year.substring(2, 4);
				semesters.set(key, {
					name: `Semestre ${semNum} - ${yearStart}/${yearEnd}`,
					value: key
				});
			}
		}
		return [{
			id: "semester",
			name: "Semestre",
			values: Array.from(semesters.values()).sort((a, b) => b.value.localeCompare(a.value))
		}];
	}
	async function getMarks(filters) {
		const semFilter = filters.semester;
		if (!semFilter) throw new Error("No semester selected");
		const [semester, year] = semFilter.split("_");
		const config = await getMenuConfig();
		const [rawGrades, synthesisEntries, componentTypes] = await Promise.all([
			fetchAllSearchResults(config.grades.menuEntryId, config.grades.queryId).then((raw) => {
				const entries = raw.map(parseGradeLine).filter(Boolean);
				validateParseResults("grades", raw, entries);
				return entries;
			}),
			_cachedSynthesisEntries ? Promise.resolve(_cachedSynthesisEntries) : fetchAllSearchResults(config.synthesis.menuEntryId, config.synthesis.queryId).then((raw) => {
				const entries = raw.map(parseSynthesisLine).filter(Boolean);
				validateParseResults("synthesis", raw, entries);
				return entries;
			}),
			getComponentTypes()
		]);
		const filteredGrades = rawGrades.filter((g) => {
			const parsed = parseExamCode(g.examCode);
			return parsed && parsed.year === year && parsed.semester === semester;
		});
		const filteredSynthesis = synthesisEntries.filter((e) => {
			const parsed = parseExamCode(e.examCode);
			return parsed && parsed.year === year && parsed.semester === semester;
		});
		const nameLookup = buildNameLookup(synthesisEntries);
		let gradesToBuild = filteredGrades;
		if (filteredGrades.length === 0) {
			const parents = /* @__PURE__ */ new Set();
			const candidates = filteredSynthesis.filter((e) => {
				const p = parseExamCode(e.examCode);
				return p && p.path.length >= 2;
			});
			for (const e of candidates) {
				const parts = e.examCode.split("_");
				for (let i = 1; i < parts.length; i++) parents.add(parts.slice(0, i).join("_"));
			}
			gradesToBuild = candidates.filter((e) => !parents.has(e.examCode)).map((e) => ({
				examCode: e.examCode,
				mark: null,
				coefficient: 100,
				examType: null
			}));
		}
		const marks = buildGradeTree(gradesToBuild, nameLookup, componentTypes);
		let classAverage = null;
		const promoValues = filteredSynthesis.filter((e) => e.avgPreRatt != null).map((e) => parseFloat(e.avgPreRatt)).filter((v) => !isNaN(v) && v > 0);
		if (promoValues.length > 0) classAverage = promoValues.reduce((s, v) => s + v, 0) / promoValues.length;
		return {
			classAverage,
			marks
		};
	}
	//#endregion
	//#region src/lib/updates.js
	var UPDATE_EXPIRATION_MS = 1e3 * 60 * 60 * 24 * 7;
	function getUpdates(filters, marks) {
		const save = JSON.parse(localStorage.getItem("auriga_marks_save") || "{}");
		const updates = JSON.parse(localStorage.getItem("auriga_updates") || "{}");
		const key = JSON.stringify(filters);
		const previous = save[key];
		if (!previous) {
			save[key] = marks;
			localStorage.setItem("auriga_marks_save", JSON.stringify(save));
			return [];
		}
		if (marks.every((m) => m.subjects.every((s) => s.marks.every((mk) => mk.value === void 0)))) return [];
		let result = updates[key] || [];
		for (const module of marks) {
			const prevModule = previous.find((m) => m.name === module.name);
			if (!prevModule) continue;
			for (const subject of module.subjects) {
				const prevSubject = prevModule.subjects.find((s) => s.name === subject.name);
				if (!prevSubject) continue;
				for (const { id, name, value, classAverage } of subject.marks) {
					const prevMark = prevSubject.marks.find((m) => m.id === id && m.name === name);
					if (!prevMark) {
						if (value !== null) pushUpdate(result, subject.id, "add", id, name, value);
					} else if (prevMark.value !== value) {
						let type = "update";
						if (prevMark.value === void 0) type = "add";
						else if (value === void 0) type = "remove";
						pushUpdate(result, subject.id, type, id, name, value, prevMark.value);
					} else if (prevMark.classAverage !== classAverage) pushUpdate(result, subject.id, "average-update", id, name, classAverage, prevMark.classAverage);
				}
				for (const mark of prevSubject.marks) if (!subject.marks.find((m) => m.name === mark.name)) pushUpdate(result, subject.id, "remove", mark.id, mark.name, void 0, mark.value);
			}
		}
		result = removeExpired(result).sort((a, b) => new Date(b.date) - new Date(a.date));
		save[key] = marks;
		updates[key] = result;
		localStorage.setItem("auriga_marks_save", JSON.stringify(save));
		localStorage.setItem("auriga_updates", JSON.stringify(updates));
		return result;
	}
	/**
	* Add or merge an update entry into the result list.
	*/
	function pushUpdate(result, subjectId, type, id, name, value, old) {
		const existing = result.find((u) => u.subject === subjectId && u.id === id && u.name === name);
		if (existing && (!(existing.type === "average-update" || type === "average-update") || existing.type === type)) {
			existing.type = type;
			existing.date = /* @__PURE__ */ new Date();
			existing.value = value;
			existing.old = old;
			return;
		}
		result.push({
			date: /* @__PURE__ */ new Date(),
			type,
			subject: subjectId,
			id,
			name,
			...value != null ? { value } : {},
			...old != null ? { old } : {}
		});
	}
	/**
	* Remove updates older than the expiration delay.
	*/
	function removeExpired(updates) {
		const cutoff = Date.now() - UPDATE_EXPIRATION_MS;
		return updates.filter((u) => new Date(u.date).getTime() > cutoff);
	}
	//#endregion
	//#region src/lib/coefficients/s07_2526_fisa.js
	var s07_2526_fisa_exports = /* @__PURE__ */ __exportAll({ default: () => s07_2526_fisa_default });
	var s07_2526_fisa_default;
	var init_s07_2526_fisa = __esmMin((() => {
		s07_2526_fisa_default = {
			"2526_I_INF_FISA_S07_AEE": 8,
			"2526_I_INF_FISA_S07_AG": 1,
			"2526_I_INF_FISA_S07_CN": 3,
			"2526_I_INF_FISA_S07_FR": 2,
			"2526_I_INF_FISA_S07_GR": 3,
			"2526_I_INF_FISA_S07_PR": 3,
			"2526_I_INF_FISA_S07_PR_42SH": {
				"ects": 2,
				"module": "SAE 42SH",
				"name": "Projet Shell"
			},
			"2526_I_INF_FISA_S07_DEVSEC": 3,
			"2526_I_INF_FISA_S07_INT": 4,
			"2526_I_INF_FISA_S07_PL": 1
		};
	}));
	//#endregion
	//#region src/lib/coefficients/index.js
	/**
	* Coefficient override system — flat weighted average.
	*
	* Auriga treats all exams as equally weighted (coefficient 100).
	* This module applies the real coefficients contributed by the community.
	*
	* The student average is a flat weighted average of all marks:
	*   Σ(mark × coef) / Σ(coef)
	*
	* Subject and module weights are derived from the sum of their children's
	* coefficients by default, but can be explicitly overridden if needed.
	*
	* Only entries whose coefficient is NOT 1 need to be listed.
	*/
	var modules = /* @__PURE__ */ Object.assign({ "./s07_2526_fisa.js": () => Promise.resolve().then(() => (init_s07_2526_fisa(), s07_2526_fisa_exports)).then((m) => m["default"]) });
	/**
	* Load coefficient overrides for a semester/track combo.
	* Returns { overrides: Map, file: string } or null.
	*/
	async function loadCoefficients(semesterKey, track) {
		const file = `${semesterKey}_${track}`.toLowerCase() + ".js";
		const loader = modules[`./${file}`];
		if (!loader) return null;
		const data = await loader();
		return {
			overrides: new Map(Object.entries(data)),
			file
		};
	}
	/**
	* Generate a pre-filled coefficient template from the current grade tree.
	* All marks are listed with coefficient 1, organized by module/subject with
	* human-readable comments — ready for a contributor to fill in real values.
	*
	* @param {Module[]} marks - grade tree
	* @param {string} semesterKey - e.g. "S07_2526"
	* @param {string} track - e.g. "FISA"
	* @param {Map|null} [overrides] - existing coefficient overrides to pre-fill
	* @returns {{ filename: string, content: string }}
	*/
	function generateTemplate(marks, semesterKey, track, overrides = null) {
		const [semester, year] = semesterKey.split("_");
		const filename = `${semesterKey}_${track}`.toLowerCase() + ".js";
		const yearLabel = `20${year.slice(0, 2)}/20${year.slice(2)}`;
		const allCodes = [];
		for (const mod of marks) {
			allCodes.push(mod._code);
			for (const sub of mod.subjects) allCodes.push(sub._code);
		}
		const maxLen = Math.max(...allCodes.map((c) => c.length));
		const lines = [
			`/**`,
			` * Coefficients — ${semester} ${track} ${yearLabel}`,
			` * Filename: ${filename}`,
			` * Set ECTS at module level (applies equally to all subjects).`,
			` * If a module mixes UEs with different ECTS, uncomment the`,
			` * subject lines below it and set their ECTS individually.`,
			` */`,
			`export default {`
		];
		const modsWithMarks = marks.filter((m) => m.subjects.some((s) => s.marks.length > 0));
		for (let i = 0; i < modsWithMarks.length; i++) {
			const mod = modsWithMarks[i];
			const rawCoef = overrides?.get(mod._code) ?? 1;
			const coef = typeof rawCoef === "object" ? JSON.stringify(rawCoef) : rawCoef;
			const pad = " ".repeat(Math.max(1, maxLen - mod._code.length));
			lines.push(`    '${mod._code}': ${coef},${pad} // ${mod.name}`);
			if (mod.subjects.length > 1) {
				if (!mod.subjects.some((s) => overrides?.has(s._code))) lines.push(`    // Uncomment below to override individual subjects (when they have different ECTS):`);
				for (const sub of mod.subjects) {
					const raw = overrides?.get(sub._code);
					const subPad = " ".repeat(Math.max(1, maxLen - sub._code.length));
					if (raw != null) {
						const val = typeof raw === "object" ? JSON.stringify(raw) : raw;
						lines.push(`    '${sub._code}': ${val},${subPad} // └ ${sub.name || sub.id}`);
					} else lines.push(`    // '${sub._code}': ?,${subPad} // └ ${sub.name || sub.id}`);
				}
			}
			if (i < modsWithMarks.length - 1) lines.push("");
		}
		lines.push(`};`, "");
		return {
			filename,
			content: lines.join("\n")
		};
	}
	/**
	* Apply coefficient overrides and compute all averages.
	*
	* @param {Module[]} marks - grade tree (mutated in place)
	* @param {Map|null} overrides - from loadCoefficients
	* @returns {{ average: number|null }}
	*/
	function applyCoefficients(marks, overrides) {
		function applyOverride(node) {
			if (!overrides?.has(node._code)) return;
			const val = overrides.get(node._code);
			if (typeof val === "object" && val !== null) {
				node.coefficient = val.ects;
				if (val.name) node.name = val.name;
				if (val.module) node._promoteTo = val.module;
			} else node.coefficient = val;
			node._overridden = true;
		}
		for (const mod of marks) {
			applyOverride(mod);
			if (!mod.coefficient || mod.coefficient === 100) mod.coefficient = 1;
			for (const sub of mod.subjects) {
				applyOverride(sub);
				if (sub.coefficient === 100) sub.coefficient = 1;
				for (const mark of sub.marks) {
					applyOverride(mark);
					if (mark.coefficient === 100) mark.coefficient = 1;
				}
			}
		}
		const promoted = /* @__PURE__ */ new Map();
		for (const mod of marks) {
			const detached = mod.subjects.filter((s) => s._promoteTo);
			if (detached.length === 0) continue;
			mod.subjects = mod.subjects.filter((s) => !s._promoteTo);
			for (const sub of detached) {
				const modName = sub._promoteTo;
				if (promoted.has(modName)) promoted.get(modName).subjects.push(sub);
				else {
					const newMod = {
						id: sub.id,
						_code: sub._code,
						name: modName,
						average: null,
						classAverage: sub.classAverage,
						coefficient: sub.coefficient,
						_overridden: true,
						subjects: [sub]
					};
					promoted.set(modName, newMod);
					marks.push(newMod);
				}
			}
		}
		for (const mod of marks) {
			for (const sub of mod.subjects) {
				let subTotal = 0;
				let subWeight = 0;
				for (const mark of sub.marks) if (mark.value != null && mark.value !== .01) {
					subTotal += mark.value * mark.coefficient;
					subWeight += mark.coefficient;
				}
				sub.average = subWeight > 0 ? subTotal / subWeight : null;
				if (!sub._overridden) sub.coefficient = subWeight || 1;
				if (subWeight > 0) for (const mark of sub.marks) {
					mark._rawCoefficient = mark.coefficient;
					mark.coefficient = mark.coefficient / subWeight;
				}
			}
			let modTotal = 0;
			let modWeight = 0;
			for (const sub of mod.subjects) if (sub.average != null) {
				modTotal += sub.average * sub.coefficient;
				modWeight += sub.coefficient;
			}
			mod.average = modWeight > 0 ? modTotal / modWeight : null;
			if (!mod._overridden) mod.coefficient = modWeight || 1;
		}
		let totalSum = 0;
		let totalWeight = 0;
		for (const mod of marks) if (mod.average != null) {
			totalSum += mod.average * mod.coefficient;
			totalWeight += mod.coefficient;
		}
		return { average: totalWeight > 0 ? totalSum / totalWeight : null };
	}
	//#endregion
	//#region src/lib/session.js
	var FILTERS_KEY = "auriga_filters";
	/** Detect track (e.g. "FISA") from grade codes. */
	function detectTrack(marks) {
		return (marks.flatMap((m) => m.subjects.flatMap((s) => s.marks)).find((m) => m._code)?._code)?.split("_")[3] ?? null;
	}
	/** Load coefficients + generate template for a given marks tree. */
	async function loadCoeffData(marks, filtersValues) {
		const track = detectTrack(marks);
		if (!track) return {
			coeffData: null,
			coeffTemplate: null
		};
		const coeffData = await loadCoefficients(filtersValues.semester, track);
		return {
			coeffData,
			coeffTemplate: generateTemplate(marks, filtersValues.semester, track, coeffData?.overrides ?? null)
		};
	}
	/**
	* Load initial session: user name, available filters, last selection.
	*/
	async function loadSession(status) {
		status?.step("Récupération du profil...");
		const name = await getName().catch(() => "Etudiant");
		status?.step("Récupération des filtres...");
		const filters = await getMarksFilters();
		const saved = localStorage.getItem(FILTERS_KEY);
		return {
			name,
			filters,
			filtersValues: saved ? JSON.parse(saved) : filters[0]?.values.length > 0 ? { semester: filters[0].values[0].value } : {}
		};
	}
	/**
	* Fetch marks, apply coefficient overrides, compute updates.
	*/
	async function fetchMarksAndUpdates(filtersValues, status) {
		status?.step("Récupération des notes...");
		const { marks, classAverage } = await getMarks(filtersValues);
		status?.step("Application des coefficients...");
		const { coeffData, coeffTemplate } = await loadCoeffData(marks, filtersValues);
		const { average } = applyCoefficients(marks, coeffData?.overrides ?? null);
		status?.step("Calcul des changements...");
		const updates = getUpdates(filtersValues, marks);
		return {
			marks,
			averages: {
				student: average,
				promo: classAverage
			},
			updates,
			coeffSource: coeffData?.file ?? null,
			coeffTemplate
		};
	}
	/**
	* Try to load marks from localStorage cache (saved by the updates system).
	* Returns a render-ready data object, or null if no cache exists.
	*/
	async function loadCachedMarks(filtersValues) {
		const save = JSON.parse(localStorage.getItem("auriga_marks_save") || "{}");
		const key = JSON.stringify(filtersValues);
		const marks = save[key];
		if (!marks || marks.length === 0) return null;
		const { coeffData, coeffTemplate } = await loadCoeffData(marks, filtersValues);
		const { average } = applyCoefficients(marks, coeffData?.overrides ?? null);
		const updates = JSON.parse(localStorage.getItem("auriga_updates") || "{}");
		return {
			marks,
			averages: {
				student: average,
				promo: null
			},
			updates: updates[key] || [],
			coeffSource: coeffData?.file ?? null,
			coeffTemplate
		};
	}
	/**
	* Load saved semester filter from localStorage.
	*/
	function loadSavedFilters() {
		const saved = localStorage.getItem(FILTERS_KEY);
		return saved ? JSON.parse(saved) : {};
	}
	/**
	* Persist semester selection.
	*/
	function saveSemesterFilter(value) {
		const filtersValues = { semester: value };
		localStorage.setItem(FILTERS_KEY, JSON.stringify(filtersValues));
		return filtersValues;
	}
	//#endregion
	//#region package.json
	var version;
	var init_package = __esmMin((() => {
		version = "1.6.1";
	}));
	//#endregion
	//#region src/app.js
	var app;
	var init_app$1 = __esmMin((() => {
		init_package();
		app = {
			name: "Infinity Auriga",
			version,
			repository: "https://github.com/KazeTachinuu/infinity-auriga"
		};
	}));
	//#endregion
	//#region src/assets/images/top_triangle.svg?raw
	var top_triangle_default;
	var init_top_triangle = __esmMin((() => {
		top_triangle_default = "<svg width=\"517\" height=\"402\" viewBox=\"0 0 517 402\" xmlns=\"http://www.w3.org/2000/svg\"><defs><linearGradient id=\"a\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"matrix(-357.189,-156.656,156.656,-357.189,499.959,834.755)\"><stop offset=\"0\" stop-color=\"rgb(49,66,222)\"/><stop offset=\"1\" stop-color=\"rgb(20,12,124)\"/></linearGradient><linearGradient id=\"b\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"matrix(-124.762,-268.039,308.094,-108.541,505.5,838.787)\"><stop offset=\"0\" stop-color=\"rgb(50,71,255)\"/><stop offset=\"1\" stop-color=\"rgb(22,11,168)\"/></linearGradient></defs><path d=\"M622.959,432.755L499.959,834.755L105.994,696.755Z\" transform=\"translate(-105.994,-432.755)\" fill=\"url(#a)\"/><path d=\"M492.461,816.973L615.828,466.193L168.497,665.143Z\" transform=\"matrix(0.997024,0,0,1.14602,-97.0293,-534.265)\" fill=\"url(#b)\"/></svg>\n";
	}));
	//#endregion
	//#region src/assets/images/bottom_triangle.svg?raw
	var bottom_triangle_default;
	var init_bottom_triangle = __esmMin((() => {
		bottom_triangle_default = "<svg width=\"676\" height=\"303\" viewBox=\"0 0 676 303\" xmlns=\"http://www.w3.org/2000/svg\"><defs><linearGradient id=\"a\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"matrix(-269,316.5,-316.5,-269,1754,593.5)\"><stop offset=\"0\" stop-color=\"rgb(49,66,222)\"/><stop offset=\"1\" stop-color=\"rgb(20,12,124)\"/></linearGradient><linearGradient id=\"b\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"matrix(41.8528,307.949,-307.949,41.8528,1782,653)\"><stop offset=\"0\" stop-color=\"rgb(50,71,255)\"/><stop offset=\"1\" stop-color=\"rgb(22,11,168)\"/></linearGradient></defs><path d=\"M1741.5,614L2111,854L1435,917Z\" transform=\"translate(-1435,-614)\" fill=\"url(#a)\"/><path d=\"M1786.5,690L2156,930L1555,986Z\" transform=\"translate(-1480,-690)\" fill=\"url(#b)\"/></svg>\n";
	}));
	//#endregion
	//#region src/assets/images/logo.svg?raw
	var logo_default;
	var init_logo = __esmMin((() => {
		logo_default = "<svg viewBox=\"0 0 300 100\" xmlns=\"http://www.w3.org/2000/svg\">\n  <text x=\"0\" y=\"38\" font-family=\"system-ui,-apple-system,'Segoe UI',Roboto,sans-serif\" font-size=\"26\" font-weight=\"500\" fill=\"#343D55\">Infinity</text>\n  <text x=\"0\" y=\"92\" font-family=\"system-ui,-apple-system,'Segoe UI',Roboto,sans-serif\" font-size=\"52\" font-weight=\"bold\" fill=\"#151925\" letter-spacing=\"2\">AURIGA</text>\n</svg>\n";
	}));
	//#endregion
	//#region src/assets/images/spinner.svg?raw
	var spinner_default;
	var init_spinner = __esmMin((() => {
		spinner_default = "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M139.5,34C139.5,31.239 137.261,29 134.5,29C77.339,29 31,75.339 31,132.5C31,189.623 77.377,236 134.5,236C191.623,236 238,189.623 238,132.5C238,105.05 227.096,78.724 207.686,59.314C205.733,57.362 202.567,57.362 200.614,59.314L199.918,60.011C197.965,61.964 197.965,65.129 199.918,67.082C217.268,84.432 227.015,107.963 227.015,132.5C227.015,183.56 185.56,225.015 134.5,225.015C83.44,225.015 41.985,183.56 41.985,132.5C41.985,81.405 83.405,39.985 134.5,39.985C137.261,39.985 139.5,37.746 139.5,34.985Z\" transform=\"translate(-6.5,-4.5)\" fill=\"#151925\"/></svg>\n";
	}));
	//#endregion
	//#region src/assets/images/combo_box_arrow.svg?raw
	var combo_box_arrow_default;
	var init_combo_box_arrow = __esmMin((() => {
		combo_box_arrow_default = "<svg width=\"21\" height=\"13\" viewBox=\"0 0 21 13\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"#979797\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M1.529 2L9.822 10.293a1 1 0 001.414 0L15.529 2\"/></svg>\n";
	}));
	//#endregion
	//#region src/assets/images/update_arrow.svg?raw
	var update_arrow_default;
	var init_update_arrow = __esmMin((() => {
		update_arrow_default = "<svg width=\"40\" height=\"21\" viewBox=\"0 0 40 21\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"#A5A9B5\" stroke-width=\"3\" stroke-linecap=\"round\"><line x1=\"0\" y1=\"10.5\" x2=\"30\" y2=\"10.5\"/><polyline points=\"21,19 30,10.5 21,2\"/></svg>\n";
	}));
	//#endregion
	//#region src/assets/images/increase_arrow.svg?raw
	var increase_arrow_default;
	var init_increase_arrow = __esmMin((() => {
		increase_arrow_default = "<svg width=\"29\" height=\"29\" viewBox=\"0 0 29 29\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"#44B728\" stroke-width=\"3\" stroke-linecap=\"round\"><line x1=\"0\" y1=\"20\" x2=\"24\" y2=\"8\"/><polyline points=\"15,3 24,8 19,17\"/></svg>\n";
	}));
	//#endregion
	//#region src/assets/images/decrease_arrow.svg?raw
	var decrease_arrow_default;
	var init_decrease_arrow = __esmMin((() => {
		decrease_arrow_default = "<svg width=\"29\" height=\"29\" viewBox=\"0 0 29 29\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"#D52121\" stroke-width=\"3\" stroke-linecap=\"round\"><line x1=\"0\" y1=\"8\" x2=\"24\" y2=\"20\"/><polyline points=\"15,26 24,20 19,11\"/></svg>\n";
	}));
	//#endregion
	//#region src/assets/images/plus.svg?raw
	var plus_default;
	var init_plus = __esmMin((() => {
		plus_default = "<svg width=\"29\" height=\"29\" viewBox=\"0 0 29 29\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"#44B728\" stroke-width=\"3\" stroke-linecap=\"round\"><line x1=\"14.5\" y1=\"2\" x2=\"14.5\" y2=\"27\"/><line x1=\"2\" y1=\"14.5\" x2=\"27\" y2=\"14.5\"/></svg>\n";
	}));
	//#endregion
	//#region src/assets/images/minus.svg?raw
	var minus_default;
	var init_minus = __esmMin((() => {
		minus_default = "<svg width=\"29\" height=\"4\" viewBox=\"0 0 29 4\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" stroke=\"#D52121\" stroke-width=\"3\" stroke-linecap=\"round\"><line x1=\"2\" y1=\"2\" x2=\"27\" y2=\"2\"/></svg>\n";
	}));
	//#endregion
	//#region src/render/dom.js
	function h(tag, attrs = {}, ...children) {
		const el = document.createElement(tag);
		for (const [k, v] of Object.entries(attrs)) if (k === "class") el.className = v;
		else if (k === "style" && typeof v === "object") Object.assign(el.style, v);
		else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
		else el.setAttribute(k, v);
		for (const c of children.flat()) {
			if (c == null) continue;
			el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
		}
		return el;
	}
	/**
	* Create an element and set its innerHTML to a trusted build-time SVG string.
	* Only use with Vite ?raw imports — never with user-supplied content.
	*/
	function html(tag, attrs, trustedSvg) {
		const el = h(tag, attrs);
		el.innerHTML = trustedSvg;
		return el;
	}
	function gradeColor(value) {
		if (value === .01) return "#666670";
		if (value == null) return "auto";
		const yellow = [
			255,
			206,
			40
		];
		let v = value;
		const min = v >= 10 ? yellow : [
			227,
			14,
			14
		];
		const max = v < 10 ? yellow : [
			68,
			183,
			50
		];
		if (v >= 10) v -= 10;
		let result = "#";
		for (let i = 0; i < 3; i++) result += Math.round(min[i] + (max[i] - min[i]) * (v / 10)).toString(16).padStart(2, "0");
		return result;
	}
	function formatGrade(value) {
		if (value === .01) return "Abs.";
		if (value !== 0 && !value) return "--,--";
		return value.toFixed(2).replace(".", ",");
	}
	function gradeSpan(value) {
		return h("span", {
			class: "value",
			style: { color: gradeColor(value) }
		}, formatGrade(value));
	}
	function signSvg(type, value, old) {
		switch (type) {
			case "average-update":
			case "update": return value > old ? increase_arrow_default : decrease_arrow_default;
			case "add": return plus_default;
			case "remove": return minus_default;
		}
	}
	function hasEqualCoefficients(subject) {
		return subject.marks.every((m) => m.coefficient === subject.marks[0].coefficient);
	}
	var init_dom = __esmMin((() => {
		init_top_triangle();
		init_bottom_triangle();
		init_logo();
		init_spinner();
		init_combo_box_arrow();
		init_update_arrow();
		init_increase_arrow();
		init_decrease_arrow();
		init_plus();
		init_minus();
	}));
	//#endregion
	//#region src/render/tooltip.js
	function showTooltip(anchor, text, type) {
		if (!_tooltip) {
			_tooltip = h("div", { class: "code-tooltip" });
			document.body.appendChild(_tooltip);
		}
		_tooltip.textContent = text;
		_tooltip.className = "code-tooltip " + (type || "");
		_tooltip.style.opacity = "1";
		const rect = anchor.getBoundingClientRect();
		_tooltip.style.left = rect.left + "px";
		_tooltip.style.top = rect.top - _tooltip.offsetHeight - 6 + "px";
		const tipRect = _tooltip.getBoundingClientRect();
		if (tipRect.right > window.innerWidth - 8) _tooltip.style.left = window.innerWidth - 8 - tipRect.width + "px";
	}
	function hideTooltip() {
		if (_tooltip) _tooltip.style.opacity = "0";
	}
	function copyCodeEl(code, label) {
		if (!code) return h("span", {}, label);
		let copyTimeout = null;
		const el = h("span", {
			class: "copy-code clickable",
			onmouseenter: () => {
				if (!copyTimeout) showTooltip(el, code);
			},
			onmouseleave: () => {
				if (!copyTimeout) hideTooltip();
			},
			onclick: () => {
				navigator.clipboard.writeText(code);
				showTooltip(el, "Copié !", "copied");
				clearTimeout(copyTimeout);
				copyTimeout = setTimeout(() => {
					copyTimeout = null;
					hideTooltip();
				}, 1200);
			}
		}, label);
		return el;
	}
	var _tooltip;
	var init_tooltip = __esmMin((() => {
		init_dom();
		_tooltip = null;
	}));
	//#endregion
	//#region src/render/components.js
	function renderComboBox(name, values, currentValue, onUpdate) {
		const wrapper = h("div", { class: "combo-box" });
		const selected = (values.find((v) => v.value === currentValue) || { name: "..." }).name;
		const box = h("div", { class: "box clickable" });
		const setBoxContent = (text) => {
			box.textContent = "";
			box.append(text + " ");
			const arrow = html("span", {}, combo_box_arrow_default);
			box.appendChild(arrow.firstElementChild || arrow);
		};
		setBoxContent(selected);
		let opened = false;
		let choicesEl = null;
		const close = () => {
			opened = false;
			box.classList.remove("opened");
			choicesEl?.remove();
			choicesEl = null;
		};
		box.addEventListener("click", () => {
			if (opened) return close();
			opened = true;
			box.classList.add("opened");
			choicesEl = h("div", { class: "choices card" }, ...values.map((choice) => h("div", {
				class: "choice clickable opaque",
				onclick: () => {
					close();
					setBoxContent(choice.name);
					onUpdate(choice);
				}
			}, choice.name)));
			wrapper.appendChild(choicesEl);
		});
		document.addEventListener("click", (e) => {
			if (opened && !wrapper.contains(e.target)) close();
		});
		wrapper.append(h("span", { class: "name" }, name), box);
		return wrapper;
	}
	function renderUpdate(upd) {
		const hasValue = upd.value === 0 || upd.value;
		const hasOld = upd.old === 0 || upd.old;
		const displayValue = hasValue ? upd.value : upd.old;
		const targetLabel = upd.type.includes("average") ? "moyenne" : "note";
		const sign = signSvg(upd.type, upd.value, upd.old);
		return h("div", { class: "update" }, h("div", { class: "point big" }), h("div", { class: "top" }, h("div", { class: "id" }, upd.subject), h("div", { class: "dash" }, "-"), h("div", { class: "name" }, upd.name + "\xA0", html("span", { class: "target" }, `\u00b7\u00a0 ${targetLabel}`))), h("div", { class: "mark" }, h("div", { class: "point" }), ...hasValue && hasOld ? [h("div", { class: "from" }, formatGrade(upd.old)), html("div", { class: "update-arrow" }, update_arrow_default)] : [], h("div", { class: "to" }, gradeSpan(displayValue), "\xA0/ 20"), ...sign ? [html("div", { class: "type-sign" }, sign)] : []));
	}
	function renderSubject(subject, moduleId) {
		const rawCode = (subject.id.startsWith(moduleId + "_") ? subject.id.slice(moduleId.length + 1) : subject.id).replace(/_/g, " ");
		const fullName = subject.name !== subject.id.replace(/_/g, " ") ? subject.name : null;
		const useNameAsLabel = fullName && rawCode.length < 5 && fullName.length <= 16;
		const codeLabel = useNameAsLabel ? fullName : rawCode;
		const metaParts = [];
		if (subject.classAverage != null) metaParts.push(`promo: ${formatGrade(subject.classAverage)}`);
		if (!subject._overridden && subject.coefficient != null && subject.coefficient !== 1) metaParts.push(`coeff. ${formatGrade(subject.coefficient)}`);
		const subOverriddenEl = subject._overridden ? h("span", { class: "coeff-override" }, `${subject.coefficient} ECTS`) : null;
		const info = h("div", { class: "info" }, h("div", { class: "top" }, h("div", { class: "id" }, copyCodeEl(subject._code, codeLabel))), h("div", { class: "bottom" }, h("div", { class: "average" }, gradeSpan(subject.average), "\xA0/ 20"), ...metaParts.length || subOverriddenEl ? [h("div", { class: "class-average" }, ...metaParts.length ? [`(${metaParts.join(", ")})`] : [], ...subOverriddenEl ? [subOverriddenEl] : [])] : []), h("hr", { class: "bottom-line" }));
		function renderMark(mark) {
			const meta = [];
			if (mark.classAverage != null) meta.push(`moyenne: ${formatGrade(mark.classAverage)}`);
			if (!hasEqualCoefficients(subject) && !mark._overridden) meta.push(`${Math.round(mark.coefficient * 100)}%`);
			const overriddenEl = mark._overridden && mark._rawCoefficient != null ? h("span", { class: "coeff-override" }, `${mark._rawCoefficient} ECTS`) : null;
			let markName = mark.name;
			const prefix = mark._group || fullName;
			if (prefix) {
				if (markName.startsWith(prefix + " - ")) markName = markName.slice(prefix.length + 3);
				else if (markName.startsWith(prefix + " ")) markName = markName.slice(prefix.length + 1);
			}
			return h("div", { class: "mark" }, h("div", { class: "point" }), h("div", { class: "line" }, h("div", { class: "name" }, copyCodeEl(mark._code, markName)), "\xA0:\xA0", h("div", { class: "value" }, h("span", {
				class: "itself",
				style: { color: gradeColor(mark.value) }
			}, formatGrade(mark.value)), "\xA0/ 20")), ...meta.length || overriddenEl ? [h("div", { class: "class-average" }, ...meta.length ? [
				h("span", { class: "parenthesis" }, "("),
				meta.join(", "),
				h("span", { class: "parenthesis" }, ")")
			] : [], ...overriddenEl ? [overriddenEl] : [])] : []);
		}
		const marksContent = [];
		let lastGroup = null;
		for (const mark of subject.marks) {
			if (mark._group && mark._group !== lastGroup) {
				marksContent.push(h("div", { class: "marks-title" }, mark._group));
				lastGroup = mark._group;
			}
			marksContent.push(renderMark(mark));
		}
		return h("div", { class: "subject card" }, info, subject.marks.length === 0 ? h("div", { class: "no-marks" }, "Aucune note") : h("div", { class: "marks" }, ...fullName && !useNameAsLabel && !lastGroup ? [h("div", { class: "marks-title" }, fullName)] : [], ...marksContent));
	}
	function renderFooter() {
		const resetLink = h("a", {
			href: "#",
			onclick: (e) => {
				e.preventDefault();
				localStorage.clear();
				window.location.reload();
			}
		}, "Reset");
		return h("div", { id: "footer" }, h("div", { id: "links" }, h("a", {
			href: `${app.repository}/tree/master/src/lib/coefficients`,
			target: "_blank"
		}, "Coefficients"), "\xA0·\xA0", h("a", {
			href: app.repository,
			target: "_blank"
		}, "Sources"), "\xA0·\xA0", resetLink), h("p", { class: "subtext" }, h("span", {}, `${app.name} v${app.version} \u00a9 ${(/* @__PURE__ */ new Date()).getFullYear()} KazeTachinuu`), h("br"), h("span", {}, "Licensed under "), h("a", {
			class: "link colored",
			href: `${app.repository}/blob/master/LICENSE`,
			target: "_blank"
		}, "MIT License")));
	}
	var init_components = __esmMin((() => {
		init_app$1();
		init_dom();
		init_tooltip();
	}));
	//#endregion
	//#region src/render/app.js
	/**
	* Build the error panel shown in the #background sidebar when the API fails.
	* Adapts its message depending on whether cached grades are available.
	*/
	function createApiErrorPanel(error, hasCachedData) {
		const message = error?.message || String(error);
		let hint = "";
		if (message.includes("Menu entries not found") || message.includes("menu")) hint = "Le format du menu Auriga a peut-être changé. ";
		else if (message.includes("API error") || message.includes("fetch")) hint = "Le serveur Auriga ne répond pas correctement. ";
		else if (message.includes("access token") || message.includes("401")) hint = "Votre session a expiré. ";
		else if (message.includes("API format changed") || message.includes("parse")) hint = "Le format des données Auriga a changé. ";
		const desc = hasCachedData ? hint + "Vos notes en cache sont affichées à droite, mais elles peuvent être obsolètes." : hint + "Essayez de recharger la page. Si le problème persiste, signalez-le.";
		const reportUrl = `${app.repository}/issues/new?title=${encodeURIComponent("Erreur: " + message.substring(0, 80))}&body=${encodeURIComponent("## Erreur\n```\n" + message + "\n```\n\n## Contexte\n- Version: " + app.version + "\n- URL: " + window.location.href + "\n- Date: " + (/* @__PURE__ */ new Date()).toISOString())}`;
		return h("div", { class: "api-error-panel" }, h("div", { class: "api-error-title" }, "Oups, quelque chose a cassé"), h("div", { class: "api-error-desc" }, desc), h("pre", { class: "api-error-box" }, message), h("div", { class: "api-error-actions" }, h("button", {
			class: "api-error-btn primary",
			onclick: () => window.location.reload()
		}, "Recharger"), h("a", {
			href: reportUrl,
			target: "_blank",
			class: "api-error-btn"
		}, "Signaler"), h("button", {
			class: "api-error-btn muted",
			onclick: () => {
				localStorage.clear();
				window.location.reload();
			}
		}, "Reset cache")));
	}
	/**
	* Copy coefficient template to clipboard.
	*/
	function createCopyTemplateBtn({ content }) {
		const btn = h("a", {
			href: "#",
			class: "link colored",
			onclick: (e) => {
				e.preventDefault();
				navigator.clipboard.writeText(content).then(() => {
					btn.textContent = "Copié !";
					btn.classList.add("coeff-copied");
				});
			}
		}, "Copier les codes");
		return btn;
	}
	function renderApp(container, { name, marks, averages, filters, filtersValues, updates, coeffSource, coeffTemplate, apiError, onSemesterChange }) {
		container.replaceChildren();
		const hasCachedData = marks.length > 0;
		container.appendChild(apiError ? h("div", { id: "background" }, createApiErrorPanel(apiError, hasCachedData)) : h("div", { id: "background" }, html("div", {
			id: "top-triangle",
			class: "triangle"
		}, top_triangle_default), html("div", {
			id: "bottom-triangle",
			class: "triangle"
		}, bottom_triangle_default)));
		const visibleUpdates = updates.filter((u) => u.type !== "average-update");
		const avgEntries = [{
			label: "Etudiant",
			value: averages.student,
			colored: true
		}, {
			label: "Promotion",
			value: averages.promo,
			colored: false
		}];
		const moduleEls = marks.flatMap((mod) => {
			const modOverriddenEl = mod._overridden ? h("span", { class: "coeff-override" }, `${mod.coefficient} ECTS`) : null;
			return [h("div", { class: "header module" }, h("div", { class: "text" }, h("div", { class: "name" }, copyCodeEl(mod._code, mod.name)), h("div", { class: "point" }), h("div", { class: "bottom" }, h("span", {
				class: "average",
				style: { color: gradeColor(mod.average) }
			}, formatGrade(mod.average)), h("span", { class: "max" }, "\xA0/ 20"), ...mod.classAverage != null ? [h("span", { class: "class-average" }, `(promo: ${formatGrade(mod.classAverage)})`)] : [], ...modOverriddenEl ? [modOverriddenEl] : [])), h("hr", { class: "bottom-line" })), ...mod.subjects.map((s) => renderSubject(s, mod.id))];
		});
		container.appendChild(h("div", {
			id: "content",
			class: "variable wide"
		}, h("div", { id: "header" }, html("div", {
			id: "logo",
			class: "variable"
		}, logo_default), ...name ? [h("a", {
			id: "logout",
			href: "#",
			onclick: (e) => {
				e.preventDefault();
				window.location.href = "https://ionisepita-auth.np-auriga.nfrance.net/auth/realms/npionisepita/protocol/openid-connect/logout?post_logout_redirect_uri=" + encodeURIComponent("https://auriga.epita.fr");
			}
		}, "Se deconnecter")] : []), h("div", { id: "main" }, h("div", { class: "content" }, ...!apiError ? [
			h("div", { class: "filters" }, ...filters.map((f) => renderComboBox(f.name, f.values, filtersValues[f.id], (choice) => {
				if (f.id === "semester") onSemesterChange(choice.value);
			}))),
			h("div", { class: "header" }, "Derniers changements", h("hr")),
			...visibleUpdates.length === 0 ? [h("div", { class: "no-updates" }, "Aucun changement depuis votre derniere visite.")] : [],
			h("div", { class: "updates" }, ...visibleUpdates.map(renderUpdate)),
			h("div", { class: "header" }, "Moyennes", h("hr")),
			h("div", { class: "big-list" }, ...avgEntries.map((e) => h("div", { class: "entry" }, h("div", { class: "point" }), h("div", { class: "name" }, e.label), h("div", { class: "point small" }), h("div", { class: "mark" }, h("span", {
				class: "value",
				style: { color: e.colored ? gradeColor(e.value) : "auto" }
			}, formatGrade(e.value)), "\xA0/ 20"))))
		] : [], ...!hasCachedData && apiError ? [h("div", { class: "empty-state" }, h("div", { class: "empty-state-text" }, "Aucune note en cache"), h("div", { class: "empty-state-hint" }, "Les notes seront disponibles ici une fois la connexion rétablie."))] : [
			h("div", { class: "coeff-info" }, h("div", { class: "coeff-main" }, h("div", { class: "point" }), h("div", { class: "coeff-content" }, coeffSource ? h("span", {}, "Coefficients corrigés par la communauté") : h("span", {}, "Coefficients non corrigés ", h("span", { class: "coeff-muted" }, "(Auriga les considère tous égaux)")))), h("div", { class: "coeff-links" }, ...coeffSource ? [h("a", {
				href: `${app.repository}/blob/master/src/lib/coefficients/${coeffSource}`,
				target: "_blank",
				class: "link colored"
			}, "Voir la source"), ...coeffTemplate ? ["\xA0·\xA0", createCopyTemplateBtn(coeffTemplate)] : []] : [...coeffTemplate ? [createCopyTemplateBtn(coeffTemplate), "\xA0·\xA0"] : [], h("a", {
				href: `${app.repository}/tree/master/src/lib/coefficients`,
				target: "_blank",
				class: "link colored"
			}, "Contribuer")])),
			h("hr", { class: "separator" }),
			...moduleEls
		])), renderFooter()));
	}
	var init_app = __esmMin((() => {
		init_app$1();
		init_dom();
		init_tooltip();
		init_components();
	}));
	//#endregion
	//#region src/render/loading.js
	function renderLoadingScreen(container, message) {
		container.replaceChildren();
		container.appendChild(h("div", { id: "background" }, html("div", {
			id: "top-triangle",
			class: "triangle"
		}, top_triangle_default), html("div", {
			id: "bottom-triangle",
			class: "triangle"
		}, bottom_triangle_default)));
		const quote = LOADING_QUOTES[Math.floor(Math.random() * LOADING_QUOTES.length)];
		const stepLabel = h("div", { class: "loading-step" }, message || "Chargement...");
		const requestLabel = h("div", { class: "loading-request" });
		const quoteLabel = h("div", { class: "loading-quote" }, quote);
		const loading = h("div", { class: "loading" }, html("div", { class: "spinner" }, spinner_default), stepLabel, requestLabel, quoteLabel);
		container.appendChild(h("div", {
			id: "content",
			class: "variable"
		}, h("div", { id: "header" }, html("div", {
			id: "logo",
			class: "variable"
		}, logo_default)), h("div", { id: "main" }, loading), renderFooter()));
		return {
			step(text) {
				stepLabel.textContent = text;
				requestLabel.textContent = "";
			},
			request(url) {
				requestLabel.textContent = url;
			}
		};
	}
	var LOADING_QUOTES;
	var init_loading = __esmMin((() => {
		init_dom();
		init_components();
		LOADING_QUOTES = [
			"Auriga va moins vite que votre grand-mère...",
			"On négocie avec le serveur...",
			"Pendant ce temps, les profs corrigent vos copies...",
			"Chargement plus rapide qu'un rendu de projet EPITA...",
			"Patience, même Auriga a besoin de café le matin...",
			"Calcul de votre moyenne... priez.",
			"On hack le système pour vous (légalement)...",
			"Les notes arrivent... comme les bus, par paquets.",
			"Optimisation en cours... contrairement à votre code.",
			"Bientôt prêt, promis (pas comme vos deadlines)."
		];
	}));
	//#endregion
	//#region src/render/index.js
	var render_exports = /* @__PURE__ */ __exportAll({
		renderApp: () => renderApp,
		renderLoadingScreen: () => renderLoadingScreen
	});
	var init_render = __esmMin((() => {
		init_app();
		init_loading();
	}));
	//#endregion
	//#region src/boot.js
	var EMPTY_DATA = {
		marks: [],
		averages: {
			student: null,
			promo: null
		},
		updates: [],
		coeffSource: null,
		coeffTemplate: null
	};
	/**
	* Shared boot sequence for both dev (main.js) and prod (userscript-entry.js).
	*
	* Both entry points handle their own environment setup (mock tokens, DOM takeover,
	* token interception, etc.) then call this function with a ready container.
	*
	* Flow: setupToggle → loadSession → refresh loop (fetch marks → render)
	*
	* @param {HTMLElement} container - The #app element, already in the DOM
	*/
	async function boot(container) {
		setupToggle("infinity");
		const { renderLoadingScreen, renderApp } = await Promise.resolve().then(() => (init_render(), render_exports));
		try {
			const status = renderLoadingScreen(container, "Chargement...");
			setApiRequestHook((url) => status.request(url));
			const session = await loadSession(status);
			let { filtersValues } = session;
			const { name, filters } = session;
			async function refresh() {
				const onSemesterChange = (value) => {
					filtersValues = saveSemesterFilter(value);
					refresh();
				};
				try {
					const s = renderLoadingScreen(container);
					setApiRequestHook((url) => s.request(url));
					const data = await fetchMarksAndUpdates(filtersValues, s);
					renderApp(container, {
						name,
						filters,
						filtersValues,
						...data,
						onSemesterChange
					});
				} catch (err) {
					console.error("[Infinity Auriga]", err);
					const cached = await loadCachedMarks(filtersValues);
					renderApp(container, {
						name,
						filters,
						filtersValues,
						...cached || EMPTY_DATA,
						apiError: err,
						onSemesterChange
					});
				}
			}
			await refresh();
		} catch (err) {
			console.error("[Infinity Auriga]", err);
			const filtersValues = loadSavedFilters();
			renderApp(container, {
				name: "Etudiant",
				filters: [],
				filtersValues,
				...await loadCachedMarks(filtersValues) || EMPTY_DATA,
				apiError: err,
				onSemesterChange(value) {
					saveSemesterFilter(value);
					window.location.reload();
				}
			});
		}
	}
	//#endregion
	//#region src/style.css
	var require_style = /* @__PURE__ */ __commonJSMin((() => {}));
	//#endregion
	//#region src/userscript-entry.js
	installTokenInterceptor();
	async function main() {
		if (document.readyState === "loading") await new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve));
		if (!isInfinityEnabled()) {
			setupToggle("classic");
			return;
		}
		await waitForToken();
		await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require_style(), 1));
		document.title = "Infinity Auriga";
		while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
		for (const el of document.querySelectorAll("link[rel=\"stylesheet\"], style:not([data-infinity])")) el.remove();
		const container = document.createElement("div");
		container.id = "app";
		document.body.appendChild(container);
		await boot(container);
	}
	main().catch((err) => console.error("[Infinity Auriga]", err));
	//#endregion
})();
