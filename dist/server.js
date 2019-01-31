/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/serve-favicon/index.js":
/*!*********************************************!*\
  !*** ./node_modules/serve-favicon/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*!\n * serve-favicon\n * Copyright(c) 2010 Sencha Inc.\n * Copyright(c) 2011 TJ Holowaychuk\n * Copyright(c) 2014-2017 Douglas Christopher Wilson\n * MIT Licensed\n */\n\n\n\n/**\n * Module dependencies.\n * @private\n */\n\nvar Buffer = __webpack_require__(/*! safe-buffer */ \"safe-buffer\").Buffer\nvar etag = __webpack_require__(/*! etag */ \"etag\")\nvar fresh = __webpack_require__(/*! fresh */ \"fresh\")\nvar fs = __webpack_require__(/*! fs */ \"fs\")\nvar ms = __webpack_require__(/*! ms */ \"ms\")\nvar parseUrl = __webpack_require__(/*! parseurl */ \"parseurl\")\nvar path = __webpack_require__(/*! path */ \"path\")\nvar resolve = path.resolve\n\n/**\n * Module exports.\n * @public\n */\n\nmodule.exports = favicon\n\n/**\n * Module variables.\n * @private\n */\n\nvar ONE_YEAR_MS = 60 * 60 * 24 * 365 * 1000 // 1 year\n\n/**\n * Serves the favicon located by the given `path`.\n *\n * @public\n * @param {String|Buffer} path\n * @param {Object} [options]\n * @return {Function} middleware\n */\n\nfunction favicon (path, options) {\n  var opts = options || {}\n\n  var icon // favicon cache\n  var maxAge = calcMaxAge(opts.maxAge)\n\n  if (!path) {\n    throw new TypeError('path to favicon.ico is required')\n  }\n\n  if (Buffer.isBuffer(path)) {\n    icon = createIcon(Buffer.from(path), maxAge)\n  } else if (typeof path === 'string') {\n    path = resolveSync(path)\n  } else {\n    throw new TypeError('path to favicon.ico must be string or buffer')\n  }\n\n  return function favicon (req, res, next) {\n    if (getPathname(req) !== '/favicon.ico') {\n      next()\n      return\n    }\n\n    if (req.method !== 'GET' && req.method !== 'HEAD') {\n      res.statusCode = req.method === 'OPTIONS' ? 200 : 405\n      res.setHeader('Allow', 'GET, HEAD, OPTIONS')\n      res.setHeader('Content-Length', '0')\n      res.end()\n      return\n    }\n\n    if (icon) {\n      send(req, res, icon)\n      return\n    }\n\n    fs.readFile(path, function (err, buf) {\n      if (err) return next(err)\n      icon = createIcon(buf, maxAge)\n      send(req, res, icon)\n    })\n  }\n}\n\n/**\n * Calculate the max-age from a configured value.\n *\n * @private\n * @param {string|number} val\n * @return {number}\n */\n\nfunction calcMaxAge (val) {\n  var num = typeof val === 'string'\n    ? ms(val)\n    : val\n\n  return num != null\n    ? Math.min(Math.max(0, num), ONE_YEAR_MS)\n    : ONE_YEAR_MS\n}\n\n/**\n * Create icon data from Buffer and max-age.\n *\n * @private\n * @param {Buffer} buf\n * @param {number} maxAge\n * @return {object}\n */\n\nfunction createIcon (buf, maxAge) {\n  return {\n    body: buf,\n    headers: {\n      'Cache-Control': 'public, max-age=' + Math.floor(maxAge / 1000),\n      'ETag': etag(buf)\n    }\n  }\n}\n\n/**\n * Create EISDIR error.\n *\n * @private\n * @param {string} path\n * @return {Error}\n */\n\nfunction createIsDirError (path) {\n  var error = new Error('EISDIR, illegal operation on directory \\'' + path + '\\'')\n  error.code = 'EISDIR'\n  error.errno = 28\n  error.path = path\n  error.syscall = 'open'\n  return error\n}\n\n/**\n * Get the request pathname.\n *\n * @param {object} req\n * @return {string}\n */\n\nfunction getPathname (req) {\n  try {\n    return parseUrl(req).pathname\n  } catch (e) {\n    return undefined\n  }\n}\n\n/**\n * Determine if the cached representation is fresh.\n *\n * @param {object} req\n * @param {object} res\n * @return {boolean}\n * @private\n */\n\nfunction isFresh (req, res) {\n  return fresh(req.headers, {\n    'etag': res.getHeader('ETag'),\n    'last-modified': res.getHeader('Last-Modified')\n  })\n}\n\n/**\n * Resolve the path to icon.\n *\n * @param {string} iconPath\n * @private\n */\n\nfunction resolveSync (iconPath) {\n  var path = resolve(iconPath)\n  var stat = fs.statSync(path)\n\n  if (stat.isDirectory()) {\n    throw createIsDirError(path)\n  }\n\n  return path\n}\n\n/**\n * Send icon data in response to a request.\n *\n * @private\n * @param {IncomingMessage} req\n * @param {OutgoingMessage} res\n * @param {object} icon\n */\n\nfunction send (req, res, icon) {\n  // Set headers\n  var headers = icon.headers\n  var keys = Object.keys(headers)\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i]\n    res.setHeader(key, headers[key])\n  }\n\n  // Validate freshness\n  if (isFresh(req, res)) {\n    res.statusCode = 304\n    res.end()\n    return\n  }\n\n  // Send icon\n  res.statusCode = 200\n  res.setHeader('Content-Length', icon.body.length)\n  res.setHeader('Content-Type', 'image/x-icon')\n  res.end(icon.body)\n}\n\n\n//# sourceURL=webpack:///./node_modules/serve-favicon/index.js?");

/***/ }),

/***/ "./src/server/config/index.ts":
/*!************************************!*\
  !*** ./src/server/config/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.default = {\r\n    mysql: {\r\n        host: \"localhost\",\r\n        port: 3306,\r\n        user: \"ballpythons\",\r\n        database: \"ballpythons\",\r\n        password: \"bpgenetics\",\r\n        multipleStatements: true\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./src/server/config/index.ts?");

/***/ }),

/***/ "./src/server/db/basicgenetics.ts":
/*!****************************************!*\
  !*** ./src/server/db/basicgenetics.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar _this = this;\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar index_1 = __webpack_require__(/*! ./index */ \"./src/server/db/index.ts\");\r\nexports.all = function () { return __awaiter(_this, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, new Promise(function (resolve, reject) {\r\n                index_1.Connection.query(\"select bg.ID, bg.Name, gt.Name as GeneType from basicgenetics bg join genetypes gt on gt.ID = bg.GeneType;\", function (err, results) {\r\n                    if (err) {\r\n                        return reject(err);\r\n                    }\r\n                    resolve(results);\r\n                });\r\n            })];\r\n    });\r\n}); };\r\nexports.one = function (ID) { return __awaiter(_this, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, new Promise(function (resolve, reject) {\r\n                index_1.Connection.query(\"select bg.ID, bg.Name, gt.Name as GeneType from basicgenetics bg join genetypes gt on gt.ID = bg.GeneType WHERE ID = ?\", [ID], function (err, results) {\r\n                    if (err) {\r\n                        return reject(err);\r\n                    }\r\n                    resolve(results);\r\n                });\r\n            })];\r\n    });\r\n}); };\r\nexports.default = {\r\n    all: exports.all,\r\n    one: exports.one\r\n};\r\n\n\n//# sourceURL=webpack:///./src/server/db/basicgenetics.ts?");

/***/ }),

/***/ "./src/server/db/genecombos.ts":
/*!*************************************!*\
  !*** ./src/server/db/genecombos.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar _this = this;\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar index_1 = __webpack_require__(/*! ./index */ \"./src/server/db/index.ts\");\r\nexports.all = function () { return __awaiter(_this, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, new Promise(function (resolve, reject) {\r\n                index_1.Connection.query(\"select gc.Name, gc.Description, bg1.Name as Gene1, bg2.Name as Gene2, bg3.Name as Gene3, bg4.Name as Gene4, bg5.Name as Gene5, bg6.Name as Gene6, gc.URL from genecombos gc left join basicgenetics bg1 on bg1.id = gc.Gene1 left join basicgenetics bg2 on bg2.id = gc.Gene2 left join basicgenetics bg3 on bg3.id = gc.Gene3 left join basicgenetics bg4 on bg4.id = gc.Gene4 left join basicgenetics bg5 on bg5.id = gc.Gene5 left join basicgenetics bg6 on bg6.id = gc.Gene6;\", function (err, results) {\r\n                    if (err) {\r\n                        return reject(err);\r\n                    }\r\n                    resolve(results);\r\n                });\r\n            })];\r\n    });\r\n}); };\r\nexports.one = function (Name) { return __awaiter(_this, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, new Promise(function (resolve, reject) {\r\n                index_1.Connection.query(\"select gc.Name, gc.Description, bg1.Name as Gene1, bg2.Name as Gene2, bg3.Name as Gene3, bg4.Name as Gene4, bg5.Name as Gene5, bg6.Name as Gene6, gc.URL from genecombos gc left join basicgenetics bg1 on bg1.id = gc.Gene1 left join basicgenetics bg2 on bg2.id = gc.Gene2 left join basicgenetics bg3 on bg3.id = gc.Gene3 left join basicgenetics bg4 on bg4.id = gc.Gene4 left join basicgenetics bg5 on bg5.id = gc.Gene5 left join basicgenetics bg6 on bg6.id = gc.Gene6 WHERE gc.Name = ?\", [Name], function (err, results) {\r\n                    if (err) {\r\n                        return reject(err);\r\n                    }\r\n                    resolve(results);\r\n                });\r\n            })];\r\n    });\r\n}); };\r\nexports.default = {\r\n    all: exports.all,\r\n    one: exports.one\r\n};\r\n\n\n//# sourceURL=webpack:///./src/server/db/genecombos.ts?");

/***/ }),

/***/ "./src/server/db/genetypes.ts":
/*!************************************!*\
  !*** ./src/server/db/genetypes.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar _this = this;\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar index_1 = __webpack_require__(/*! ./index */ \"./src/server/db/index.ts\");\r\nexports.all = function () { return __awaiter(_this, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, new Promise(function (resolve, reject) {\r\n                index_1.Connection.query(\"select * from genetypes\", function (err, results) {\r\n                    if (err) {\r\n                        return reject(err);\r\n                    }\r\n                    resolve(results);\r\n                });\r\n            })];\r\n    });\r\n}); };\r\nexports.one = function (ID) { return __awaiter(_this, void 0, void 0, function () {\r\n    return __generator(this, function (_a) {\r\n        return [2 /*return*/, new Promise(function (resolve, reject) {\r\n                index_1.Connection.query(\"select * from genetypes WHERE ID = ?\", [ID], function (err, results) {\r\n                    if (err) {\r\n                        return reject(err);\r\n                    }\r\n                    resolve(results);\r\n                });\r\n            })];\r\n    });\r\n}); };\r\nexports.default = {\r\n    all: exports.all,\r\n    one: exports.one\r\n};\r\n\n\n//# sourceURL=webpack:///./src/server/db/genetypes.ts?");

/***/ }),

/***/ "./src/server/db/index.ts":
/*!********************************!*\
  !*** ./src/server/db/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar mysql = __webpack_require__(/*! mysql */ \"mysql\");\r\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/server/config/index.ts\");\r\nvar genecombos_1 = __webpack_require__(/*! ./genecombos */ \"./src/server/db/genecombos.ts\");\r\nvar genetypes_1 = __webpack_require__(/*! ./genetypes */ \"./src/server/db/genetypes.ts\");\r\nvar basicgenetics_1 = __webpack_require__(/*! ./basicgenetics */ \"./src/server/db/basicgenetics.ts\");\r\nexports.Connection = mysql.createConnection(config_1.default.mysql);\r\nexports.Connection.connect(function (err) {\r\n    if (err)\r\n        console.log(err);\r\n});\r\nexports.default = {\r\n    geneCombos: genecombos_1.default,\r\n    geneTypes: genetypes_1.default,\r\n    basicGenetics: basicgenetics_1.default\r\n};\r\n\n\n//# sourceURL=webpack:///./src/server/db/index.ts?");

/***/ }),

/***/ "./src/server/routes.ts":
/*!******************************!*\
  !*** ./src/server/routes.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nvar _this = this;\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar db_1 = __webpack_require__(/*! ./db */ \"./src/server/db/index.ts\");\r\nvar router = express.Router();\r\nrouter.get(\"/api/hello\", function (req, res, next) {\r\n    res.json(\"World\");\r\n});\r\nrouter.get(\"/api/morphs\", function (req, res) { return __awaiter(_this, void 0, void 0, function () {\r\n    var geneCombos, e_1;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                _a.trys.push([0, 2, , 3]);\r\n                return [4 /*yield*/, db_1.default.geneCombos.all()];\r\n            case 1:\r\n                geneCombos = _a.sent();\r\n                res.json(geneCombos);\r\n                return [3 /*break*/, 3];\r\n            case 2:\r\n                e_1 = _a.sent();\r\n                console.log(e_1);\r\n                res.sendStatus(500);\r\n                return [3 /*break*/, 3];\r\n            case 3: return [2 /*return*/];\r\n        }\r\n    });\r\n}); });\r\nrouter.get(\"/api/morphs/:Name\", function (req, res) { return __awaiter(_this, void 0, void 0, function () {\r\n    var geneCombos, e_2;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                _a.trys.push([0, 2, , 3]);\r\n                return [4 /*yield*/, db_1.default.geneCombos.one(req.params.Name)];\r\n            case 1:\r\n                geneCombos = _a.sent();\r\n                res.json(geneCombos);\r\n                return [3 /*break*/, 3];\r\n            case 2:\r\n                e_2 = _a.sent();\r\n                console.log(e_2);\r\n                res.sendStatus(500);\r\n                return [3 /*break*/, 3];\r\n            case 3: return [2 /*return*/];\r\n        }\r\n    });\r\n}); });\r\nrouter.get(\"/api/genetypes\", function (req, res) { return __awaiter(_this, void 0, void 0, function () {\r\n    var geneTypes, e_3;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                _a.trys.push([0, 2, , 3]);\r\n                return [4 /*yield*/, db_1.default.geneTypes.all()];\r\n            case 1:\r\n                geneTypes = _a.sent();\r\n                res.json(geneTypes);\r\n                return [3 /*break*/, 3];\r\n            case 2:\r\n                e_3 = _a.sent();\r\n                console.log(e_3);\r\n                res.sendStatus(500);\r\n                return [3 /*break*/, 3];\r\n            case 3: return [2 /*return*/];\r\n        }\r\n    });\r\n}); });\r\nrouter.get(\"/api/genetypes/:ID\", function (req, res) { return __awaiter(_this, void 0, void 0, function () {\r\n    var geneTypes, e_4;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                _a.trys.push([0, 2, , 3]);\r\n                return [4 /*yield*/, db_1.default.geneTypes.one(req.params.ID)];\r\n            case 1:\r\n                geneTypes = _a.sent();\r\n                res.json(geneTypes);\r\n                return [3 /*break*/, 3];\r\n            case 2:\r\n                e_4 = _a.sent();\r\n                console.log(e_4);\r\n                res.sendStatus(500);\r\n                return [3 /*break*/, 3];\r\n            case 3: return [2 /*return*/];\r\n        }\r\n    });\r\n}); });\r\nrouter.get(\"/api/basicmorphs\", function (req, res) { return __awaiter(_this, void 0, void 0, function () {\r\n    var basicGenetics, e_5;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                _a.trys.push([0, 2, , 3]);\r\n                return [4 /*yield*/, db_1.default.basicGenetics.all()];\r\n            case 1:\r\n                basicGenetics = _a.sent();\r\n                res.json(basicGenetics);\r\n                return [3 /*break*/, 3];\r\n            case 2:\r\n                e_5 = _a.sent();\r\n                console.log(e_5);\r\n                res.sendStatus(500);\r\n                return [3 /*break*/, 3];\r\n            case 3: return [2 /*return*/];\r\n        }\r\n    });\r\n}); });\r\nrouter.get(\"/api/basicmorphs/:ID\", function (req, res) { return __awaiter(_this, void 0, void 0, function () {\r\n    var basicGenetics, e_6;\r\n    return __generator(this, function (_a) {\r\n        switch (_a.label) {\r\n            case 0:\r\n                _a.trys.push([0, 2, , 3]);\r\n                return [4 /*yield*/, db_1.default.basicGenetics.one(req.params.ID)];\r\n            case 1:\r\n                basicGenetics = _a.sent();\r\n                res.json(basicGenetics);\r\n                return [3 /*break*/, 3];\r\n            case 2:\r\n                e_6 = _a.sent();\r\n                console.log(e_6);\r\n                res.sendStatus(e_6);\r\n                return [3 /*break*/, 3];\r\n            case 3: return [2 /*return*/];\r\n        }\r\n    });\r\n}); });\r\nexports.default = router;\r\n\n\n//# sourceURL=webpack:///./src/server/routes.ts?");

/***/ }),

/***/ "./src/server/server.ts":
/*!******************************!*\
  !*** ./src/server/server.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar path = __webpack_require__(/*! path */ \"path\");\r\nvar express = __webpack_require__(/*! express */ \"express\");\r\nvar routes_1 = __webpack_require__(/*! ./routes */ \"./src/server/routes.ts\");\r\nvar favIcon = __webpack_require__(/*! serve-favicon */ \"./node_modules/serve-favicon/index.js\");\r\nvar app = express();\r\napp.use(favIcon(path.join(__dirname, \"../public/favicon.ico\")));\r\nvar p = path.join(__dirname, \"../public\");\r\nconsole.log(p);\r\napp.use(express.static(p));\r\napp.use(routes_1.default);\r\nvar port = process.env.PORT || 3000;\r\napp.listen(port, function () {\r\n    console.log(\"Server listening on port: \" + port);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/server/server.ts?");

/***/ }),

/***/ "etag":
/*!***********************!*\
  !*** external "etag" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"etag\");\n\n//# sourceURL=webpack:///external_%22etag%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fresh":
/*!************************!*\
  !*** external "fresh" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fresh\");\n\n//# sourceURL=webpack:///external_%22fresh%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "ms":
/*!*********************!*\
  !*** external "ms" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ms\");\n\n//# sourceURL=webpack:///external_%22ms%22?");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mysql\");\n\n//# sourceURL=webpack:///external_%22mysql%22?");

/***/ }),

/***/ "parseurl":
/*!***************************!*\
  !*** external "parseurl" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"parseurl\");\n\n//# sourceURL=webpack:///external_%22parseurl%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "safe-buffer":
/*!******************************!*\
  !*** external "safe-buffer" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"safe-buffer\");\n\n//# sourceURL=webpack:///external_%22safe-buffer%22?");

/***/ })

/******/ });