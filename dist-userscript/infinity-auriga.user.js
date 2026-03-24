// ==UserScript==
// @name         Infinity Auriga
// @namespace    infinity-auriga
// @version      1.2.0
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

;(function(){if(localStorage.getItem('infinity_auriga_enabled')==='0')return;var s=document.createElement('style');s.setAttribute('data-infinity','1');s.textContent="*,*:before,*:after{box-sizing:border-box}body{margin:0;overflow:hidden}div{display:flex}div,hr{box-sizing:border-box}button{outline:none;border:none;background:none}a{color:inherit;text-decoration:inherit}:root{--bg-dark: #343D55;--bg-darker: #151925;--text-primary: #151925;--text-muted: #868DA0;--text-meta: #909090;--surface: #FFFFFF;--surface-alt: #F3F4F5;--dot-color: #D5D9DC;--accent: #3D69ED;--radius: 6px;--content-px: clamp(25px, 5vw, 75px);--font-header: clamp(20px, 3vw, 32px);--font-body: clamp(13px, 1.5vw, 18px);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif}#app{height:100dvh}button,a,.clickable{cursor:pointer;user-select:none;transition:opacity .15s}button:not(.opaque):hover,a:not(.opaque):hover,.clickable:not(.opaque):hover{opacity:.8}button:not(.opaque):active,a:not(.opaque):active,.clickable:not(.opaque):active{opacity:.6}.subtext{color:var(--text-muted);font-size:clamp(13px,1.5vw,16px);line-height:22px;text-align:center}.link.colored{color:var(--accent)}.card{border-radius:var(--radius);box-shadow:#00000026 0 2px 8px;transition:all .2s}.card.clickable:hover{box-shadow:#00000040 0 2px 9px;transform:translateY(-1px)}.variable{transition:width .6s cubic-bezier(.65,0,.35,1),margin .6s cubic-bezier(.65,0,.35,1)}.class-average{color:var(--text-meta)}.point{flex-shrink:0;width:8px;height:8px;background-color:var(--dot-color);border-radius:50%}.point.big{width:10px;height:10px}.point.small{width:6px;height:6px}#background{position:relative;z-index:1;flex-grow:1;overflow:hidden;background:linear-gradient(-212deg,var(--bg-dark) 0%,var(--bg-darker) 95%)}.triangle{position:absolute}#top-triangle{top:-175px;left:-175px;width:500px;filter:drop-shadow(3px 3px 15px rgba(0,0,0,.25))}#bottom-triangle{bottom:-75px;right:-100px;width:600px;filter:drop-shadow(-3px -3px 15px rgba(0,0,0,.25))}#content{flex-direction:column;justify-content:space-between;align-items:center;z-index:2;width:575px;padding:35px 0;overflow-y:auto;background-color:var(--surface)}#content.wide{width:1200px}#content.wide #header #logo{width:300px;margin:0}#header{width:100%;padding:20px var(--content-px);justify-content:space-between;align-items:center;flex-shrink:0;overflow:hidden}#header #logo{flex-shrink:0;width:400px;margin-top:25px;margin-left:12.5px}#header #logo svg{width:100%;height:auto}#header #logout{color:#251515;font-size:clamp(16px,2vw,22px);font-weight:500}#footer{flex-direction:column;flex-shrink:0}#footer #links{justify-content:center;margin-bottom:8px;font-weight:500;font-size:clamp(16px,2vw,22px);color:var(--text-primary)}#main{flex-direction:column;flex-grow:1;justify-content:center;width:100%}.loading{flex-direction:column;align-items:center;padding:0 var(--content-px)}.loading-step{margin-top:clamp(20px,4vw,40px);font-size:clamp(16px,2vw,20px);font-weight:600;color:var(--text-primary);text-align:center}.loading-request{margin-top:6px;min-height:1.4em;max-width:100%;font-size:clamp(11px,1.2vw,13px);font-family:SF Mono,Cascadia Code,Fira Code,monospace;color:var(--text-muted);text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;opacity:0;transition:opacity .15s}.loading-request:not(:empty){opacity:1}.loading-quote{margin-top:clamp(25px,4vw,40px);font-size:clamp(13px,1.4vw,15px);font-style:italic;color:var(--text-muted);text-align:center;opacity:.6}.spinner{width:clamp(60px,8vw,85px);animation:spin .75s linear infinite}.spinner svg{width:100%;height:100%}@keyframes spin{to{transform:rotate(360deg)}}.content{flex-direction:column;flex-grow:1;align-items:flex-start;padding:5px var(--content-px);margin-bottom:25px;overflow-y:auto}.header{flex-direction:column;position:relative;z-index:-1;font-weight:700;font-size:var(--font-header)}.header hr{width:100%;border-bottom:0;border-color:var(--surface)}.filters{justify-content:space-between;width:100%;margin-bottom:clamp(30px,4vw,50px)}.combo-box{flex-direction:column;position:relative}.combo-box .name{height:20px;margin-bottom:clamp(5px,1vw,8px);margin-left:1px;color:#343434;font-size:clamp(14px,1.5vw,16px)}.combo-box .box{justify-content:space-between;align-items:center;min-width:clamp(200px,30vw,400px);height:clamp(32px,4vw,40px);padding:0 12px;border-radius:var(--radius);background-color:var(--surface-alt);font-size:clamp(12px,1.5vw,16px)}.combo-box .box svg{height:clamp(8px,1vw,10px);margin-top:2px;transition:transform .125s}.combo-box .box.opened svg{transform:rotate(180deg)}.combo-box .choices{flex-direction:column;position:absolute;top:75px;z-index:2;width:100%;background-color:var(--surface);border-radius:var(--radius);font-size:clamp(12px,1.5vw,16px)}.combo-box .choices .choice{padding:8px 12px;transition:background-color .15s}.combo-box .choices .choice:hover{background-color:#0000000d}.combo-box .choices .choice:active{background-color:#0000001a}.combo-box .choices .choice:first-child{border-top-left-radius:var(--radius);border-top-right-radius:var(--radius)}.combo-box .choices .choice:last-child{border-bottom-left-radius:var(--radius);border-bottom-right-radius:var(--radius)}.no-updates{margin-bottom:20px;font-size:var(--font-body)}.updates{flex-direction:column;width:100%;margin-bottom:15px}.updates .update{align-items:center;margin-bottom:10px;padding-left:35px;font-size:clamp(18px,2.5vw,28px)}.updates .update .top{align-items:center}.updates .update .top .id{margin-left:15px;margin-right:10px;font-weight:700}.updates .update .top .dash{margin-right:10px;font-size:clamp(18px,2vw,24px)}.updates .update .top .name{font-size:var(--font-body);margin-right:10px}.updates .update .top .name .target{font-weight:500}.updates .update .mark{align-items:center;margin-bottom:1px;font-weight:500}.updates .update .mark .point{margin-left:2px;margin-right:12px}.updates .update .mark .from{color:#a5a9b5;text-decoration:line-through}.updates .update .mark .update-arrow{margin:0 10px}.updates .update .mark .type-sign{margin-left:12px;margin-bottom:2px}.updates .update .mark .type-sign svg{width:30px}.big-list{flex-direction:column;margin-bottom:20px;padding-top:5px;transition:opacity .15s}.big-list .entry{align-items:center;margin-bottom:12px;padding-left:clamp(15px,3vw,35px);font-size:clamp(14px,2vw,21px)}.big-list .entry .name{margin-left:12px;margin-right:10px}.big-list .entry .mark{margin-left:10px}.big-list .entry .mark .value{font-weight:700}.coeff-info{flex-direction:column;margin-top:8px;padding-left:clamp(15px,3vw,35px);font-size:clamp(14px,1.8vw,18px)}.coeff-main{align-items:center;gap:12px;font-weight:500}.coeff-muted{color:var(--text-muted);font-weight:400}.coeff-links{margin-top:5px;margin-left:20px;font-size:clamp(12px,1.4vw,15px);font-weight:500}hr.separator{width:100%;margin-top:25px;opacity:.3;border-bottom:0;border-color:var(--surface)}.header.module{max-width:100%;margin-top:50px}.header.module .text{align-items:center}.header.module .name,.header.module .average,.header.module .class-average,.header.module .max{white-space:nowrap}.header.module .name{display:inline-block;overflow:hidden;text-overflow:ellipsis}.header.module .point{margin:2px 10px 0}.header.module .class-average{margin-left:10px;font-weight:400}.subject{width:100%;margin:15px 0}.subject .info{flex-direction:column;align-items:center;flex-shrink:0;width:250px;padding-top:15px;padding-bottom:17px}.subject .info .top,.subject .info .bottom{display:contents}.subject .info .id{font-weight:700;font-size:24px;word-break:break-word}.subject .info .point{display:none}.subject .info .average{margin-top:10px;font-size:24px}.subject .info .average .value{font-weight:700}.subject .info .class-average{font-size:14px}.subject .info .bottom-line{display:none}.subject .marks{flex-direction:column;flex-grow:1;justify-content:center;max-width:calc(100% - 275px);padding:15px 0;font-size:16px}.subject .marks .marks-title{font-weight:600;font-size:15px;margin-bottom:6px;color:#444}.subject .marks .mark{align-items:center;max-width:100%;margin:3px 0}.subject .marks .mark .point{margin-bottom:1px}.subject .marks .mark .line{display:contents}.subject .marks .mark .name,.subject .marks .mark .value,.subject .marks .mark .class-average{white-space:nowrap}.subject .marks .mark .name{display:inline-block;margin-left:15px;overflow:hidden;text-overflow:ellipsis}.subject .marks .mark .value{justify-content:flex-end;margin-left:1px;font-weight:700}.subject .marks .mark .class-average{margin-left:10px}.coeff-override{margin-left:6px;color:var(--accent);font-weight:600;font-size:.85em}.no-marks{flex-grow:1;justify-content:center;align-items:center;width:100%;font-size:28px}@media (max-width: 850px){.filters{flex-direction:column;gap:15px}.header hr{margin-top:9px}.updates{margin-top:4px;margin-bottom:12px}.updates .update{display:grid;grid-template-columns:17px 100%;margin-bottom:6px;padding-left:15px}.updates .update>.point{width:6px;height:6px}.updates .update .top .id{margin-left:0;margin-right:6px}.updates .update .top .name{display:inline-block;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.updates .update .top .name .target{display:none}.updates .update .mark{grid-column:2 / 3;height:23px}.updates .update .mark .point{display:none}.updates .update .mark .update-arrow{width:20px;margin:0 6px 1px}.updates .update .mark .type-sign{width:14px;margin-left:6px;margin-bottom:2px}.header.module{margin-top:20px;margin-bottom:6px}.header.module .text{flex-direction:column;align-items:flex-start;margin-left:-1px}.header.module .text .name{max-width:100%;margin-bottom:2px;font-size:20px}.header.module .text .point{display:none}.header.module .text .bottom{align-items:center;font-size:16px}.header.module .text .bottom .class-average{margin-left:5px;font-size:14px}.header.module .bottom-line{margin-top:7px;margin-bottom:1px;opacity:.6}.subject{flex-direction:column;margin:10px 0;padding:10px 14px}.subject .no-marks{margin:4px 0;font-size:14px}.subject .info{align-items:flex-start;width:100%;padding:0}.subject .info .top,.subject .info .bottom{display:flex;align-items:center;max-width:100%}.subject .info .id{font-size:18px}.subject .info .point{display:block;width:5px;height:5px;margin:0 8px}.subject .info .average{margin:0;font-size:14px}.subject .info .class-average{margin-left:5px;font-size:12px}.subject .info .bottom-line{display:block;width:100%;border-bottom:0;border-color:var(--surface);opacity:.3}.subject .marks{max-width:100%;padding:0}.subject .marks .mark{display:grid;grid-template-columns:12px calc(100% - 5px);padding:0 5px}.subject .marks .mark .point{width:5px;height:5px;margin-top:1px}.subject .marks .mark .line{display:flex;flex-direction:row-reverse;justify-content:flex-end;font-size:13px}.subject .marks .mark .line .name{margin-left:0}.subject .marks .mark .line .value{width:auto;margin-left:0}.subject .marks .mark .class-average{grid-column:2 / 3;margin-left:0;font-size:11px}.subject .marks .mark .class-average .parenthesis{display:none}}@media (max-width: 575px){#header{flex-direction:column;padding:0;justify-content:center;margin-bottom:20px}#header #logo{margin-top:15px;margin-left:0;max-width:80%}#content{padding:15px 0}hr.separator{margin-top:0;margin-bottom:5px}}@media (max-height: 650px){#header #logo{margin-top:0}#header #logo svg{height:115px}}@media (max-height: 550px){#header{margin-bottom:10px}#header #logo svg{height:100px}#header #logout{font-size:16px}}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--dot-color);border-radius:3px}\n";(document.head||document.documentElement).appendChild(s)})();
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
		if (!response.ok) throw new Error(`Auriga API error: ${response.status} ${response.statusText}`);
		return response.json();
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
	//#region src/lib/auriga/hierarchy.js
	/**
	* Parse an Auriga exam code into its hierarchical components.
	*
	* Codes follow: {year}_{?}_{school}_{track}_{semester}_{...path}_{evalType}
	* The format is consistent across all tracks (FISA, FISE, GISTRE, etc.)
	*/
	var EVAL_TYPES = new Set([
		"EX",
		"PRJ",
		"EXF",
		"EXO",
		"FAF",
		"PROJ"
	]);
	function parseExamCode(code) {
		const parts = code.split("_");
		if (parts.length < 5) return null;
		const year = parts[0];
		const track = parts[3];
		const semester = parts[4];
		const rest = parts.slice(5);
		let evalType = null;
		let path = rest;
		if (rest.length > 0 && EVAL_TYPES.has(rest[rest.length - 1])) {
			evalType = rest[rest.length - 1];
			path = rest.slice(0, -1);
		}
		return {
			year,
			track,
			semester,
			path,
			evalType,
			fullCode: code
		};
	}
	/**
	* Build a name lookup from synthesis lines (menuEntry 1144).
	*/
	function buildNameLookup(lines) {
		const lookup = /* @__PURE__ */ new Map();
		for (const line of lines) {
			const code = line[2];
			const caption = line[3] || {};
			lookup.set(code, {
				name: caption.fr || caption.en || code,
				avgPreRatt: line[1],
				avgFinal: line[4]
			});
		}
		return lookup;
	}
	/**
	* Find the best subject grouping level for a grade path.
	*
	* Walks the path upward from one level above the leaf, looking for the
	* deepest code that has a name in the lookup. This groups related grades:
	*   CS_FR_MSE       -> subject = CS_FR ("Formaliser")
	*   CS_SAE_INT_PEN  -> subject = CS_SAE_INT ("Tests d'intrusions")
	*   CS_SAE_INT_MAS  -> subject = CS_SAE_INT ("Tests d'intrusions")  <- grouped!
	*   CS_CN_AI4SEC    -> subject = CS_CN (fallback, groups with COCO)
	*/
	function findSubjectLevel(prefix, path, nameLookup) {
		for (let depth = path.length - 1; depth >= 2; depth--) {
			const candidateId = path.slice(0, depth).join("_");
			const candidateCode = `${prefix}_${candidateId}`;
			if (nameLookup.has(candidateCode)) return {
				id: candidateId,
				code: candidateCode
			};
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
		let info = nameLookup.get(code);
		if (info) return info;
		let bestPartial = null;
		let bestPartialLen = Infinity;
		for (const [key, val] of nameLookup) {
			if (key.endsWith(suffix)) return val;
			if (key.indexOf(suffix + "_") !== -1 && key.length < bestPartialLen) {
				bestPartial = val;
				bestPartialLen = key.length;
			}
		}
		return bestPartial;
	}
	/**
	* Build the grade tree from API data.
	*
	* Module = 1st path segment (CS, AG, PL, PR, etc.)
	* Subject = deepest named ancestor in the hierarchy (auto-detected)
	* Mark = individual grade
	*/
	function buildGradeTree(gradeLines, nameLookup) {
		const modules = /* @__PURE__ */ new Map();
		for (const line of gradeLines) {
			const [, markStr, coef, examCode] = line;
			const parsed = parseExamCode(examCode);
			if (!parsed) continue;
			const mark = parseFloat(markStr);
			if (isNaN(mark)) continue;
			const { semester, path } = parsed;
			const prefix = `${parsed.year}_I_INF_${parsed.track}_${semester}`;
			const moduleId = path[0] || "TC";
			const moduleCode = `${prefix}_${moduleId}`;
			const subject = findSubjectLevel(prefix, path, nameLookup);
			if (!modules.has(moduleCode)) {
				const info = resolveName(moduleCode, "_" + moduleId, nameLookup);
				let name = moduleId;
				if (info) if (info.name.length <= 40) name = info.name;
				else {
					const m = info.name.match(/en\s+(\S+)\s+semestre/i);
					if (m) name = m[1].charAt(0).toUpperCase() + m[1].slice(1);
				}
				modules.set(moduleCode, {
					id: moduleId,
					_code: moduleCode,
					name,
					credits: 0,
					average: null,
					classAverage: null,
					subjects: /* @__PURE__ */ new Map()
				});
			}
			const mod = modules.get(moduleCode);
			if (!mod.subjects.has(subject.code)) {
				const info = resolveName(subject.code, "_" + subject.id, nameLookup);
				mod.subjects.set(subject.code, {
					id: subject.id,
					_code: subject.code,
					name: info && info.name.length <= 40 ? info.name : subject.id.replace(/_/g, " "),
					average: null,
					classAverage: null,
					coefficient: 1,
					marks: []
				});
			}
			const sub = mod.subjects.get(subject.code);
			if (sub.marks.some((m) => m._code === examCode)) continue;
			const examInfo = nameLookup.get(examCode);
			const promoAvg = examInfo?.avgPreRatt ? parseFloat(examInfo.avgPreRatt) : null;
			sub.marks.push({
				id: sub.marks.length,
				_code: examCode,
				name: examInfo ? examInfo.name : parsed.evalType || "Note",
				value: mark,
				classAverage: isNaN(promoAvg) ? null : promoAvg,
				coefficient: coef || 100
			});
		}
		const result = [];
		for (const [, mod] of modules) {
			mod.subjects = [...mod.subjects.values()];
			result.push(mod);
		}
		return result;
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
			grades: entries["APP_040_010_MES_NOTES"],
			synthesis: entries["APP_040_010_MES_NOTES_SYNT"]
		};
		return _menuConfig;
	}
	var _cachedSynthesisLines = null;
	async function getMarksFilters() {
		const synth = (await getMenuConfig()).synthesis;
		const lines = await fetchAllSearchResults(synth.menuEntryId, synth.queryId);
		const semesters = /* @__PURE__ */ new Map();
		for (const line of lines) {
			const code = line[2];
			const parsed = parseExamCode(code);
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
		_cachedSynthesisLines = lines;
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
		const semesterPrefix = `${year}_I_INF_`;
		const config = await getMenuConfig();
		const grades = config.grades;
		const filteredGrades = (await fetchAllSearchResults(grades.menuEntryId, grades.queryId)).filter((line) => {
			const code = line[3];
			return code && code.startsWith(semesterPrefix) && code.includes(`_${semester}_`);
		});
		let synthesisLines = _cachedSynthesisLines;
		if (!synthesisLines) {
			const synth = config.synthesis;
			synthesisLines = await fetchAllSearchResults(synth.menuEntryId, synth.queryId);
		}
		const filteredSynthesis = synthesisLines.filter((line) => {
			const code = line[2];
			return code && code.startsWith(semesterPrefix) && code.includes(`_${semester}_`);
		});
		const marks = buildGradeTree(filteredGrades, buildNameLookup(synthesisLines));
		let classAverage = null;
		const promoValues = filteredSynthesis.filter((l) => l[1] != null).map((l) => parseFloat(l[1])).filter((v) => !isNaN(v) && v > 0);
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
			"2526_I_INF_FISA_S07_CS_GR_WS_EX": 2,
			"2526_I_INF_FISA_S07_CS_SAE_DEVSEC_PROJ_EX": 3,
			"2526_I_INF_FISA_S07_CS_SAE_INT_MAS_EX": 2,
			"2526_I_INF_FISA_S07_CS_SAE_INT_PEN_EX": 2
		};
	}));
	//#endregion
	//#region src/lib/coefficients/index.js
	/**
	* Coefficient override system.
	*
	* Auriga returns all coefficients as 100 (equal weight).
	* This module provides the real coefficients at any level:
	*   - Module code  → weights the module in the student average
	*   - Subject code → weights the subject in the module average
	*   - Mark code    → weights the mark in the subject average
	*
	* To add coefficients for a new semester:
	*   1. Create src/lib/coefficients/{semester}_{year}_{track}.js  (e.g. s07_2526_fisa.js)
	*   2. Export a default object mapping codes to their coefficient.
	*   3. Open a PR. That's it — no registry to update.
	*
	* Filename convention: s{semester}_{year}_{track}.js (all lowercase)
	*   → looked up as S{SEMESTER}_{YEAR}_{TRACK}
	*
	* Only entries with non-default coefficients need to be listed (default is 1).
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
	* Apply coefficient overrides to marks, then recompute all averages.
	* If no overrides, uses the raw API coefficients.
	*
	* @param {Module[]} marks - grade tree (mutated in place)
	* @param {Map|null} overrides - from loadCoefficients
	* @returns {{ average: number|null }}
	*/
	function applyCoefficients(marks, overrides) {
		for (const mod of marks) {
			if (overrides && mod._code && overrides.has(mod._code)) {
				mod.coefficient = overrides.get(mod._code);
				mod._overridden = true;
			}
			if (!mod.coefficient || mod.coefficient === 100) mod.coefficient = 1;
			for (const sub of mod.subjects) {
				if (overrides && sub._code && overrides.has(sub._code)) {
					sub.coefficient = overrides.get(sub._code);
					sub._overridden = true;
				}
				if (sub.coefficient === 100) sub.coefficient = 1;
				for (const mark of sub.marks) {
					if (overrides && mark._code && overrides.has(mark._code)) {
						mark.coefficient = overrides.get(mark._code);
						mark._overridden = true;
					}
					if (mark.coefficient === 100) mark.coefficient = 1;
				}
			}
		}
		let totalAvg = 0;
		let totalWeight = 0;
		for (const mod of marks) {
			let modTotal = 0;
			let modWeight = 0;
			for (const sub of mod.subjects) {
				let subTotal = 0;
				let subWeight = 0;
				for (const mark of sub.marks) if (mark.value != null && mark.value !== .01) {
					subTotal += mark.value * mark.coefficient;
					subWeight += mark.coefficient;
				}
				sub.average = subWeight > 0 ? subTotal / subWeight : null;
				if (subWeight > 0) for (const mark of sub.marks) {
					mark._rawCoefficient = mark.coefficient;
					mark.coefficient = mark.coefficient / subWeight;
				}
				if (sub.average != null) {
					modTotal += sub.average * sub.coefficient;
					modWeight += sub.coefficient;
				}
			}
			mod.average = modWeight > 0 ? modTotal / modWeight : null;
			if (mod.average != null) {
				totalAvg += mod.average * mod.coefficient;
				totalWeight += mod.coefficient;
			}
		}
		return { average: totalWeight > 0 ? totalAvg / totalWeight : null };
	}
	//#endregion
	//#region src/lib/session.js
	/**
	* Load initial session: user name, available filters, last selection.
	*/
	async function loadSession(status) {
		status?.step("Récupération du profil...");
		const name = await getName().catch(() => "Etudiant");
		status?.step("Récupération des filtres...");
		const filters = await getMarksFilters();
		const saved = localStorage.getItem("auriga_filters");
		return {
			name,
			filters,
			filtersValues: saved ? JSON.parse(saved) : filters[0]?.values.length > 0 ? { semester: filters[0].values.at(-1).value } : {}
		};
	}
	/**
	* Fetch marks, apply coefficient overrides, compute updates.
	*/
	async function fetchMarksAndUpdates(filtersValues, status) {
		status?.step("Récupération des notes...");
		const result = await getMarks(filtersValues);
		const marks = result.marks;
		const track = (marks.flatMap((m) => m.subjects.flatMap((s) => s.marks)).find((m) => m._code)?._code)?.split("_")[3] ?? null;
		status?.step("Application des coefficients...");
		const coeffData = track ? await loadCoefficients(filtersValues.semester, track) : null;
		const { average } = applyCoefficients(marks, coeffData?.overrides ?? null);
		status?.step("Calcul des changements...");
		const updates = await getUpdates(filtersValues, marks);
		return {
			marks,
			averages: {
				student: average,
				promo: result.classAverage
			},
			updates,
			coeffSource: coeffData?.file ?? null
		};
	}
	/**
	* Persist semester selection.
	*/
	function saveSemesterFilter(value) {
		const filtersValues = { semester: value };
		localStorage.setItem("auriga_filters", JSON.stringify(filtersValues));
		return filtersValues;
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
	//#region src/style.css
	var require_style = /* @__PURE__ */ __commonJSMin((() => {}));
	//#endregion
	//#region src/app.js
	var app;
	var init_app = __esmMin((() => {
		app = {
			name: "Infinity Auriga",
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
	//#region src/render.js
	var render_exports = /* @__PURE__ */ __exportAll({
		renderApp: () => renderApp,
		renderLoadingScreen: () => renderLoadingScreen
	});
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
	function html(tag, attrs, rawHtml) {
		const el = h(tag, attrs);
		el.innerHTML = rawHtml;
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
		if (subject.coefficient != null && subject.coefficient !== 1) metaParts.push(`coeff. ${formatGrade(subject.coefficient)}`);
		const subOverriddenEl = subject._overridden ? h("span", { class: "coeff-override" }, `\u00d7${subject.coefficient}`) : null;
		const info = h("div", { class: "info" }, h("div", { class: "top" }, h("div", { class: "id" }, codeLabel)), h("div", { class: "bottom" }, h("div", { class: "average" }, gradeSpan(subject.average), "\xA0/ 20"), ...metaParts.length || subOverriddenEl ? [h("div", { class: "class-average" }, ...metaParts.length ? [`(${metaParts.join(", ")})`] : [], ...subOverriddenEl ? [subOverriddenEl] : [])] : []), h("hr", { class: "bottom-line" }));
		const marksContent = subject.marks.map((mark) => {
			const meta = [];
			if (mark.classAverage != null) meta.push(`moyenne: ${formatGrade(mark.classAverage)}`);
			if (!hasEqualCoefficients(subject)) meta.push(`${Math.round(mark.coefficient * 100)}%`);
			const overriddenEl = mark._overridden && mark._rawCoefficient != null ? h("span", { class: "coeff-override" }, `\u00d7${mark._rawCoefficient}`) : null;
			let markName = mark.name;
			if (fullName) {
				if (markName.startsWith(fullName + " - ")) markName = markName.slice(fullName.length + 3);
				else if (markName.startsWith(fullName + " ")) markName = markName.slice(fullName.length + 1);
			}
			return h("div", { class: "mark" }, h("div", { class: "point" }), h("div", { class: "line" }, h("div", { class: "name" }, markName), "\xA0:\xA0", h("div", { class: "value" }, h("span", {
				class: "itself",
				style: { color: gradeColor(mark.value) }
			}, formatGrade(mark.value)), "\xA0/ 20")), ...meta.length || overriddenEl ? [h("div", { class: "class-average" }, ...meta.length ? [
				h("span", { class: "parenthesis" }, "("),
				meta.join(", "),
				h("span", { class: "parenthesis" }, ")")
			] : [], ...overriddenEl ? [overriddenEl] : [])] : []);
		});
		return h("div", { class: "subject card" }, info, subject.marks.length === 0 ? h("div", { class: "no-marks" }, "Aucune note") : h("div", { class: "marks" }, ...fullName && !useNameAsLabel ? [h("div", { class: "marks-title" }, fullName)] : [], ...marksContent));
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
		}, "Sources"), "\xA0·\xA0", resetLink), html("p", { class: "subtext" }, `${app.name} &copy; 2019-2026<br/>Licensed under <a class="link colored" href="${app.repository}/blob/master/LICENSE" target="_blank">MIT License</a>`));
	}
	function renderApp(container, { name, marks, averages, filters, filtersValues, updates, coeffSource, onSemesterChange }) {
		container.replaceChildren();
		container.appendChild(h("div", { id: "background" }, html("div", {
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
			const modOverriddenEl = mod._overridden ? h("span", { class: "coeff-override" }, `\u00d7${mod.coefficient}`) : null;
			return [h("div", { class: "header module" }, h("div", { class: "text" }, h("div", { class: "name" }, mod.name), h("div", { class: "point" }), h("div", { class: "bottom" }, h("span", {
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
		}, "Se deconnecter")] : []), h("div", { id: "main" }, h("div", { class: "content" }, h("div", { class: "filters" }, ...filters.map((f) => renderComboBox(f.name, f.values, filtersValues[f.id], (choice) => {
			if (f.id === "semester") onSemesterChange(choice.value);
		}))), h("div", { class: "header" }, "Derniers changements", h("hr")), ...visibleUpdates.length === 0 ? [h("div", { class: "no-updates" }, "Aucun changement depuis votre derniere visite.")] : [], h("div", { class: "updates" }, ...visibleUpdates.map(renderUpdate)), h("div", { class: "header" }, "Moyennes", h("hr")), h("div", { class: "big-list" }, ...avgEntries.map((e) => h("div", { class: "entry" }, h("div", { class: "point" }), h("div", { class: "name" }, e.label), h("div", { class: "point small" }), h("div", { class: "mark" }, h("span", {
			class: "value",
			style: { color: e.colored ? gradeColor(e.value) : "auto" }
		}, formatGrade(e.value)), "\xA0/ 20")))), h("div", { class: "coeff-info" }, h("div", { class: "coeff-main" }, h("div", { class: "point" }), h("div", { class: "coeff-content" }, coeffSource ? h("span", {}, "Coefficients corrigés par la communauté") : h("span", {}, "Coefficients non corrigés ", h("span", { class: "coeff-muted" }, "(Auriga les considère tous égaux)")))), h("div", { class: "coeff-links" }, ...coeffSource ? [
			h("a", {
				href: `${app.repository}/blob/master/src/lib/coefficients/${coeffSource}`,
				target: "_blank",
				class: "link colored"
			}, "Voir la source"),
			"\xA0·\xA0",
			h("a", {
				href: `${app.repository}/tree/master/src/lib/coefficients`,
				target: "_blank",
				class: "link colored"
			}, "Modifier")
		] : [h("a", {
			href: `${app.repository}/tree/master/src/lib/coefficients`,
			target: "_blank",
			class: "link colored"
		}, "Contribuer les vrais coefficients")])), h("hr", { class: "separator" }), ...moduleEls)), renderFooter()));
	}
	var LOADING_QUOTES;
	var init_render = __esmMin((() => {
		init_app();
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
	//#region src/userscript-entry.js
	installTokenInterceptor();
	async function main() {
		if (document.readyState === "loading") await new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve));
		if (!isInfinityEnabled()) {
			setupToggle("classic");
			return;
		}
		await waitForToken();
		Promise.resolve().then(() => /* @__PURE__ */ __toESM(require_style(), 1));
		document.title = "Infinity Auriga";
		while (document.body.firstChild) document.body.removeChild(document.body.firstChild);
		for (const el of document.querySelectorAll("link[rel=\"stylesheet\"], style:not([data-infinity])")) el.remove();
		const container = document.createElement("div");
		container.id = "app";
		document.body.appendChild(container);
		setupToggle("infinity");
		const { renderLoadingScreen, renderApp } = await Promise.resolve().then(() => (init_render(), render_exports));
		const status = renderLoadingScreen(container, "Chargement...");
		setApiRequestHook((url) => status.request(url));
		const session = await loadSession(status);
		let { filtersValues } = session;
		const { name, filters } = session;
		async function refresh() {
			const s = renderLoadingScreen(container);
			setApiRequestHook((url) => s.request(url));
			const data = await fetchMarksAndUpdates(filtersValues, s);
			renderApp(container, {
				name,
				filters,
				filtersValues,
				...data,
				onSemesterChange(value) {
					filtersValues = saveSemesterFilter(value);
					refresh();
				}
			});
		}
		await refresh();
	}
	main().catch((err) => console.error("[Infinity Auriga]", err));
	//#endregion
})();
