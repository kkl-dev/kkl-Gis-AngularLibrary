(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('esri-loader'), require('@arcgis/core/widgets/Zoom'), require('@arcgis/core/widgets/Compass'), require('@arcgis/core/widgets/ScaleBar')) :
    typeof define === 'function' && define.amd ? define('gis-map-component', ['exports', '@angular/core', 'esri-loader', '@arcgis/core/widgets/Zoom', '@arcgis/core/widgets/Compass', '@arcgis/core/widgets/ScaleBar'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["gis-map-component"] = {}, global.ng.core, global.esriLoader, global.Zoom, global.Compass, global.ScaleBar));
})(this, (function (exports, i0, esriLoader, Zoom, Compass, ScaleBar) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var Zoom__default = /*#__PURE__*/_interopDefaultLegacy(Zoom);
    var Compass__default = /*#__PURE__*/_interopDefaultLegacy(Compass);
    var ScaleBar__default = /*#__PURE__*/_interopDefaultLegacy(ScaleBar);

    var GisBaseService = /** @class */ (function () {
        function GisBaseService(config) {
            this.config = config;
            this.apiUrl = "";
            this.apiUrl = config.GisApiUrl;
            //this.apiUrl = 'https://kkl-yaaranutgisapi.azurewebsites.net';
        }
        return GisBaseService;
    }());
    GisBaseService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisBaseService, deps: [{ token: 'environmentFile' }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    GisBaseService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisBaseService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisBaseService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Inject,
                            args: ['environmentFile']
                        }] }];
        } });

    var GisMapComponentService = /** @class */ (function () {
        function GisMapComponentService() {
        }
        return GisMapComponentService;
    }());
    GisMapComponentService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisMapComponentService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    GisMapComponentService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisMapComponentService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisMapComponentService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var GisMapComponentComponent = /** @class */ (function () {
        function GisMapComponentComponent(gisBaseService) {
            this.gisBaseService = gisBaseService;
            this.linkProm = loadCustomStyle('https://js.arcgis.com/4.23/esri/themes/light/main.css');
        }
        Object.defineProperty(GisMapComponentComponent.prototype, "content8", {
            set: function (content) {
                if (content) {
                    this.divMassage = content;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "contentDivMassageText", {
            set: function (content) {
                if (content) {
                    this.divMassageText = content;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "content", {
            set: function (content) {
                if (content) {
                    this.mapViewEl = content;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "content2", {
            set: function (content) {
                if (content) {
                    this.layerListDiv = content;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "content1", {
            set: function (content) {
                if (content) {
                    this.basemapGalleryDiv = content;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "content7", {
            set: function (content) {
                if (content) {
                    this.buttonLegend = content.nativeElement;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "content3", {
            set: function (content) {
                if (content) {
                    this.buttonDistance = content.nativeElement;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "content4", {
            set: function (content) {
                if (content) {
                    this.buttonArea = content.nativeElement;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "content5", {
            set: function (content) {
                if (content) {
                    this.buttonClear = content.nativeElement;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "content6", {
            set: function (content) {
                if (content) {
                    this.buttonSwitch = content.nativeElement;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "layerList", {
            set: function (value) {
                this.LayerList = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "queryLayer", {
            set: function (value) {
                this.QueryLayer = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "queryStr", {
            set: function (value) {
                this.QueryStr = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GisMapComponentComponent.prototype, "queryResultEmpty", {
            set: function (value) {
                this.QueryResultEmpty = value;
            },
            enumerable: false,
            configurable: true
        });
        GisMapComponentComponent.prototype.initializeMap = function () {
            return __awaiter(this, void 0, void 0, function () {
                var divMassage_1, _a, MapView, WebMap, LayerList_1, FeatureLayer_1, Search_1, Measurement_1, Legend_1, Point, SpatialReference, webMap_1, view_1, error_1;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, this.linkProm];
                        case 1:
                            _b.sent();
                            divMassage_1 = this.divMassage;
                            return [4 /*yield*/, esriLoader.loadModules([
                                    "esri/views/MapView", "esri/WebMap",
                                    "esri/widgets/LayerList", "esri/layers/FeatureLayer",
                                    "esri/widgets/Search", "esri/widgets/Measurement", "esri/widgets/Legend",
                                    "esri/geometry/Point", "esri/geometry/SpatialReference"
                                ])];
                        case 2:
                            _a = __read.apply(void 0, [_b.sent(), 9]), MapView = _a[0], WebMap = _a[1], LayerList_1 = _a[2], FeatureLayer_1 = _a[3], Search_1 = _a[4], Measurement_1 = _a[5], Legend_1 = _a[6], Point = _a[7], SpatialReference = _a[8];
                            webMap_1 = new WebMap({
                                basemap: "topo"
                            });
                            view_1 = new MapView({
                                container: this.mapViewEl.nativeElement,
                                map: webMap_1
                            });
                            view_1.center = [31.744037, 35.049995];
                            //  let featerLayer = new FeatureLayer({
                            //  //url: "https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer/0"
                            //  url: "https://kklrgm.kkl.org.il/kklags/rest/services/allLayersForAgol/FeatureServer/7"
                            //});
                            //let featerLayer1 = new FeatureLayer({
                            //  url: "https://services2.arcgis.com/utNNrmXb4IZOLXXs/ArcGIS/rest/services/JNFILForest/FeatureServer"      
                            //});
                            this.LayerList.forEach(function (layerStr) {
                                var featureLayer = new FeatureLayer_1({
                                    url: _this.gisBaseService.apiUrl + "/ArcGIS/rest/services/" + layerStr,
                                });
                                webMap_1.add(featureLayer);
                                if (layerStr.includes(_this.QueryLayer)) {
                                    _this.queryFeatureLayer = featureLayer;
                                }
                            });
                            return [4 /*yield*/, view_1.when(function () {
                                    var layerList = new LayerList_1({ view: view_1 });
                                    //view.ui.add(layerList, "top-right");
                                    var search = new Search_1({ view: view_1 });
                                    //view.ui.add(search, "top-right");
                                    var zoom = new Zoom__default["default"]({ view: view_1, layout: "horizontal" });
                                    //view.ui.add(zoom, "bottom-right");
                                    var compassWidget = new Compass__default["default"]({ view: view_1 });
                                    view_1.ui.add(compassWidget, "top-left");
                                    var scaleBar = new ScaleBar__default["default"]({ view: view_1, unit: "metric", style: "ruler" });
                                    //view.ui.add(scaleBar, { position: "bottom-left"});
                                    //const basemapGallery = new BasemapGallery({  view: view,    container: document.createElement("div")    });
                                    //view.ui.add(basemapGallery, {   position: "top-right"    });
                                    _this.legend = new Legend_1({ view: view_1, style: { type: "classic", layout: 'stack' }, layerInfos: [{ layer: _this.queryFeatureLayer, title: "שכבת חלקות" }] });
                                    //view.ui.add(this.legend, "bottom-right");
                                    _this.measurement = new Measurement_1({ view: view_1 });
                                    view_1.ui.add(_this.measurement, "bottom-right");
                                    ////this.buttonSwitch.addEventListener("click", () => { this.switchView(Map, this.queryFeatureLayer,  measurement); });
                                    //this.buttonDistance.addEventListener("click", () => { this.distanceMeasurement( measurement); });
                                    //this.buttonArea.addEventListener("click", () => { this.areaMeasurement(measurement); });
                                    //this.buttonClear.addEventListener("click", () => { this.clearMeasurements(measurement); });
                                    //const EsriPwoerByelements = document.getElementsByClassName("esri-attribution__sources esri-interactive");
                                    //for (let i = 0; i < EsriPwoerByelements.length; i++) {
                                    //  EsriPwoerByelements[i].setAttribute("style", "display:none");
                                    //}
                                    var EsriPwoerByelements1 = document.getElementsByClassName("esri-attribution__powered-by");
                                    for (var i = 0; i < EsriPwoerByelements1.length; i++) {
                                        EsriPwoerByelements1[i].setAttribute("style", "display:none");
                                        var az = EsriPwoerByelements1[i].previousElementSibling;
                                        if (az != null)
                                            az.setAttribute("style", "display:none");
                                    }
                                    //this.featerLayerHelkot.definitionExpression = "GUSH_NUM=" + this._gush + " and PARCEL=" + this._PARCEL;
                                    //this.featerLayerHelkot.when(
                                    //  () => {
                                    //const query = this.featerLayerHelkot.createQuery();
                                    //query.where = "GUSH_NUM=" + this._gush + " and PARCEL=" + this._PARCEL;
                                    //query.outSpatialReference = view.spatialReference;
                                    //var az = this.featerLayerHelkot.queryFeatures(query)
                                    //az.then(function (results) {
                                    //  view.highlight(results);
                                    //});  
                                    //this.featerLayerHelkot.queryExtent(query)
                                    //  .then(response => {
                                    //    if (response.extent !== null) {
                                    //      response.extent.spatialReference = view.spatialReference;
                                    //      view.goTo(response.extent.expand(3));
                                    //    }
                                    //  });
                                    /* });*/
                                })];
                        case 3:
                            _b.sent();
                            view_1.whenLayerView(this.queryFeatureLayer).then(function (layerView) {
                                var query = _this.queryFeatureLayer.createQuery();
                                query.where = _this.QueryStr;
                                query.outSpatialReference = view_1.spatialReference;
                                var az = _this.queryFeatureLayer.queryFeatures(query);
                                az.then(function (results) {
                                    if (results.features.length > 0) {
                                        divMassage_1.nativeElement.style.display = 'none';
                                        layerView.highlight(results.features[0]);
                                        /*view.goTo({ geometry: results.features[0].geometry.extent.expand(3) });*/
                                        //var p: Point;
                                        //p = results.features[0].geometry as Point;
                                        //p.spatialReference = new SpatialReference({ wkid: 3857 });
                                        //view.spatialReference = new SpatialReference({ wkid: 3857 });
                                        //view.goTo({
                                        //  /*target: [35.049995, 31.744037]*/
                                        //  /*target: [222000, 630000]*/
                                        //  /*target: p*/
                                        //  target: [3926637.1977999993, 3860628.0922000031]
                                        //})
                                        view_1.when(function () {
                                            view_1.goTo({
                                                target: results.features[0],
                                                zoom: 20
                                            });
                                        });
                                    }
                                    else {
                                        divMassage_1.nativeElement.style.display = '';
                                    }
                                });
                                //this.queryFeatureLayer.queryExtent(query)
                                //  .then(response => {
                                //    if (response.extent !== null) {
                                //      response.extent.spatialReference = view.spatialReference;
                                //      view.goTo({  geometry: response.extent.expand(3) });
                                //    }
                                //  });
                            });
                            return [2 /*return*/, view_1];
                        case 4:
                            error_1 = _b.sent();
                            console.log("EsriLoader: ", error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        GisMapComponentComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.initializeMap().then(function () {
                _this.divMassageText.nativeElement.innerText = _this.QueryResultEmpty;
                console.log("View ready");
            });
        };
        GisMapComponentComponent.prototype.buttonLegendClick = function () {
            this.legend.visible = !this.legend.visible;
        };
        //switchView(Map: MapConstructor, layerView: any, measurement: any) {
        //  // Clone the viewpoint for the MapView or SceneView
        //  const viewpoint = layerView.viewpoint.clone();
        //  // Get the view type, either 2d or 3d
        //  const type = layerView.type;
        //  // Clear any measurements that had been drawn
        //  this.clearMeasurements(measurement);
        //  // Reset the measurement tools in the div
        //  layerView.container = null;
        //  layerView = null;
        //  // Set the view based on whether it switched to 2D MapView or 3D SceneView
        //  layerView = Map;
        //  layerView.set({
        //    container: "viewDiv",
        //    viewpoint: viewpoint
        //  });
        //}
        //clearMeasurements(measurement: any) {
        //  const distanceButton = document.getElementById('distance');
        //  const areaButton = document.getElementById('area');
        //  this.buttonDistance.classList.remove("active");
        //  this.buttonArea.classList.remove("active");
        //  measurement.clear();
        //}
        GisMapComponentComponent.prototype.distanceMeasurement = function () {
            this.measurement.activeTool = "distance";
            this.buttonDistance.classList.add("active");
            this.buttonArea.classList.remove("active");
        };
        GisMapComponentComponent.prototype.areaMeasurement = function () {
            this.measurement.activeTool = "area";
            this.buttonDistance.classList.remove("active");
            this.buttonArea.classList.add("active");
        };
        return GisMapComponentComponent;
    }());
    GisMapComponentComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisMapComponentComponent, deps: [{ token: GisBaseService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    GisMapComponentComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: GisMapComponentComponent, selector: "GisBase-GisMapComponent", inputs: { layerList: "layerList", queryLayer: "queryLayer", queryStr: "queryStr", queryResultEmpty: "queryResultEmpty" }, viewQueries: [{ propertyName: "content8", first: true, predicate: ["divMassage"], descendants: true, static: true }, { propertyName: "contentDivMassageText", first: true, predicate: ["divMassageText"], descendants: true, static: true }, { propertyName: "content", first: true, predicate: ["mapViewNode"], descendants: true, static: true }, { propertyName: "content2", first: true, predicate: ["layerListDiv"], descendants: true, static: true }, { propertyName: "content1", first: true, predicate: ["basemapGalleryDiv"], descendants: true, static: true }, { propertyName: "content7", first: true, predicate: ["buttonLegend"], descendants: true, static: true }, { propertyName: "content3", first: true, predicate: ["buttonDistance"], descendants: true, static: true }, { propertyName: "content4", first: true, predicate: ["buttonArea"], descendants: true, static: true }, { propertyName: "content5", first: true, predicate: ["buttonClear"], descendants: true, static: true }, { propertyName: "content6", first: true, predicate: ["buttonSwitch"], descendants: true, static: true }], ngImport: i0__namespace, template: "\n \n<div class='az' style=\"width:100%;height: 100%;position: relative \">\n    <div #mapViewNode style=\"width:100%;height: 100%;  \">\n   \n      <div id=\"toolbarDiv222\" style=\"position: absolute;margin-left: -50px;\" class=\"e____sri-component esri-widget\">\n        <button  #buttonLegend (click)=\"buttonLegendClick()\" class=\"esri-widget--button esri-interactive esri-icon-legend\" title=\"legend Panel\">    </button>\n        <button  #buttonDistance (click)=\"distanceMeasurement()\" class=\"esri-widget--button esri-interactive esri-icon-measure-line\" title=\"Distance Measurement Tool\">    </button>\n        <button  #buttonArea (click)=\"areaMeasurement()\"  class=\"esri-widget--button esri-interactive esri-icon-measure-area\" title=\"Area Measurement Tool\">    </button>\n        <button  style=\"display:none\" #buttonClear class=\"esri-widget--button esri-interactive esri-icon-trash\" title=\"Clear Measurements\">     </button>\n      </div>\n  </div>\n  <div #divMassage style=\"display:none;position: absolute;top: 25%;left: 0px;width:100%\">\n    <div #divMassageText style=\"margin: auto;width: fit-content;background-color:powderblue;padding: 10px\" >\u05DC\u05D0 \u05E0\u05D9\u05DE\u05E6\u05D0\u05D5 \u05E4\u05D5\u05DC\u05D9\u05D2\u05D5\u05E0\u05D9\u05DD \u05DE\u05EA\u05D0\u05D9\u05DE\u05D9\u05DD \u05DC\u05D7\u05D9\u05E4\u05D5\u05E9</div>\n  </div>\n</div>\n  ", isInline: true, styles: [""] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisMapComponentComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'GisBase-GisMapComponent',
                        template: "\n \n<div class='az' style=\"width:100%;height: 100%;position: relative \">\n    <div #mapViewNode style=\"width:100%;height: 100%;  \">\n   \n      <div id=\"toolbarDiv222\" style=\"position: absolute;margin-left: -50px;\" class=\"e____sri-component esri-widget\">\n        <button  #buttonLegend (click)=\"buttonLegendClick()\" class=\"esri-widget--button esri-interactive esri-icon-legend\" title=\"legend Panel\">    </button>\n        <button  #buttonDistance (click)=\"distanceMeasurement()\" class=\"esri-widget--button esri-interactive esri-icon-measure-line\" title=\"Distance Measurement Tool\">    </button>\n        <button  #buttonArea (click)=\"areaMeasurement()\"  class=\"esri-widget--button esri-interactive esri-icon-measure-area\" title=\"Area Measurement Tool\">    </button>\n        <button  style=\"display:none\" #buttonClear class=\"esri-widget--button esri-interactive esri-icon-trash\" title=\"Clear Measurements\">     </button>\n      </div>\n  </div>\n  <div #divMassage style=\"display:none;position: absolute;top: 25%;left: 0px;width:100%\">\n    <div #divMassageText style=\"margin: auto;width: fit-content;background-color:powderblue;padding: 10px\" >\u05DC\u05D0 \u05E0\u05D9\u05DE\u05E6\u05D0\u05D5 \u05E4\u05D5\u05DC\u05D9\u05D2\u05D5\u05E0\u05D9\u05DD \u05DE\u05EA\u05D0\u05D9\u05DE\u05D9\u05DD \u05DC\u05D7\u05D9\u05E4\u05D5\u05E9</div>\n  </div>\n</div>\n  ",
                        styleUrls: ['gis-map-component.component.css']
                        //   < div #layerListDiv > </div>
                        //< div #basemapGalleryDiv > </div>
                    }]
            }], ctorParameters: function () { return [{ type: GisBaseService }]; }, propDecorators: { content8: [{
                    type: i0.ViewChild,
                    args: ['divMassage', { static: true }]
                }], contentDivMassageText: [{
                    type: i0.ViewChild,
                    args: ['divMassageText', { static: true }]
                }], content: [{
                    type: i0.ViewChild,
                    args: ['mapViewNode', { static: true }]
                }], content2: [{
                    type: i0.ViewChild,
                    args: ['layerListDiv', { static: true }]
                }], content1: [{
                    type: i0.ViewChild,
                    args: ['basemapGalleryDiv', { static: true }]
                }], content7: [{
                    type: i0.ViewChild,
                    args: ['buttonLegend', { static: true }]
                }], content3: [{
                    type: i0.ViewChild,
                    args: ['buttonDistance', { static: true }]
                }], content4: [{
                    type: i0.ViewChild,
                    args: ['buttonArea', { static: true }]
                }], content5: [{
                    type: i0.ViewChild,
                    args: ['buttonClear', { static: true }]
                }], content6: [{
                    type: i0.ViewChild,
                    args: ['buttonSwitch', { static: true }]
                }], layerList: [{
                    type: i0.Input
                }], queryLayer: [{
                    type: i0.Input
                }], queryStr: [{
                    type: i0.Input
                }], queryResultEmpty: [{
                    type: i0.Input
                }] } });
    function loadCustomStyle(url) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        var isReady = new Promise(function (resolve) {
            link.onload = function () { return resolve(link); };
        });
        head.appendChild(link);
        return isReady;
    }

    var GisMapComponentModule = /** @class */ (function () {
        function GisMapComponentModule() {
        }
        GisMapComponentModule.forRoot = function (environment) {
            return {
                ngModule: GisMapComponentModule,
                providers: [GisBaseService, { provide: 'environmentFile', useValue: environment }]
            };
        };
        return GisMapComponentModule;
    }());
    GisMapComponentModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisMapComponentModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    GisMapComponentModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisMapComponentModule, declarations: [GisMapComponentComponent], exports: [GisMapComponentComponent] });
    GisMapComponentModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisMapComponentModule, imports: [[]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: GisMapComponentModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            GisMapComponentComponent
                        ],
                        imports: [],
                        exports: [
                            GisMapComponentComponent
                        ]
                    }]
            }] });

    /*
     * Public API Surface of gis-map-component
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.GisBaseService = GisBaseService;
    exports.GisMapComponentComponent = GisMapComponentComponent;
    exports.GisMapComponentModule = GisMapComponentModule;
    exports.GisMapComponentService = GisMapComponentService;
    exports.loadCustomStyle = loadCustomStyle;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=gis-map-component.umd.js.map
