// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class EarthstarError extends Error {
    constructor(message){
        super(message || "");
        this.name = "EarthstarError";
    }
}
class ValidationError extends EarthstarError {
    constructor(message){
        super(message || "Validation error");
        this.name = "ValidationError";
    }
}
class ReplicaIsClosedError extends EarthstarError {
    constructor(message){
        super(message || "a Replica or ReplicaDriver was used after being closed");
        this.name = "ReplicaIsClosedError";
    }
}
class ReplicaCacheIsClosedError extends EarthstarError {
    constructor(message){
        super(message || "a ReplicaCache was used after being closed");
        this.name = "ReplicaCacheIsClosedError";
    }
}
class QueryFollowerIsClosedError extends EarthstarError {
    constructor(message){
        super(message || "a QueryFollower was used after being closed");
        this.name = "QueryFollowerIsClosedError";
    }
}
class NotFoundError extends EarthstarError {
    constructor(message){
        super(message || "not found");
        this.name = "NotFoundError";
    }
}
class NetworkError extends EarthstarError {
    constructor(message){
        super(message || "network error");
        this.name = "NetworkError";
    }
}
class TimeoutError extends EarthstarError {
    constructor(message){
        super(message || "timeout error");
        this.name = "TimeoutError";
    }
}
class ConnectionRefusedError extends EarthstarError {
    constructor(message){
        super(message || "connection refused");
        this.name = "ConnectionRefused";
    }
}
class NotImplementedError extends EarthstarError {
    constructor(message){
        super(message || "not implemented yet");
        this.name = "NotImplementedError";
    }
}
function isErr(x2) {
    return x2 instanceof EarthstarError;
}
function notErr(x3) {
    return !(x3 instanceof EarthstarError);
}
export { EarthstarError as EarthstarError };
export { ValidationError as ValidationError };
export { ReplicaIsClosedError as ReplicaIsClosedError };
export { ReplicaCacheIsClosedError as ReplicaCacheIsClosedError };
export { QueryFollowerIsClosedError as QueryFollowerIsClosedError };
export { NotFoundError as NotFoundError };
export { NetworkError as NetworkError };
export { TimeoutError as TimeoutError };
export { ConnectionRefusedError as ConnectionRefusedError };
export { NotImplementedError as NotImplementedError };
export { isErr as isErr };
export { notErr as notErr };
const clamp = (num, min, max)=>Math.min(Math.max(num, min), max)
;
const errorConfig = new Proxy({
    log: true,
    throw: false
}, {});
const config = new Proxy({
    colorSupport: {
        highColor: true,
        trueColor: true,
        fourBitColor: true,
        threeBitColor: true
    },
    optimizeStyles: {
        chain: false,
        literal: false
    },
    errors: errorConfig
}, {});
const fourBitColors = {
    black: '\x1b[30m',
    lightBlack: '\x1b[90m',
    red: '\x1b[31m',
    lightRed: '\x1b[91m',
    green: '\x1b[32m',
    lightGreen: '\x1b[92m',
    yellow: '\x1b[33m',
    lightYellow: '\x1b[93m',
    blue: '\x1b[34m',
    lightBlue: '\x1b[94m',
    magenta: '\x1b[35m',
    lightMagenta: '\x1b[95m',
    cyan: '\x1b[36m',
    lightCyan: '\x1b[96m',
    white: '\x1b[37m',
    lightWhite: '\x1b[97m'
};
const ansi4ToAnsi3 = (code)=>code % 8
;
for(const color in fourBitColors){
    const colorAscii = fourBitColors[color];
    const matches = /[0-9][0-9]/.exec(colorAscii);
    if (!matches) continue;
    const capitalized = color[0].toUpperCase() + color.slice(1);
    const colorCode = matches[0];
    Reflect.set(fourBitColors, `bg${capitalized}`, colorAscii.replace(colorCode, String(parseInt(colorCode) + 10)));
}
const attributes = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    italic: '\x1b[3m',
    underline: '\x1b[4m',
    blink: '\x1b[5m',
    fastBlink: '\x1b[6m',
    invert: '\x1b[7m',
    hidden: '\x1b[8m',
    strikethrough: '\x1b[9m',
    boldOff: '\x1b[21m',
    doubleUnderline: '\x1b[21m',
    boldOrDimOff: '\x1b[22m',
    italicOff: '\x1b[23m',
    underlineOff: '\x1b[24m',
    blinkOff: '\x1b[25m',
    invertOff: '\x1b[26m',
    hiddenOff: '\x1b[27m',
    strikethroughOff: '\x1b[28m'
};
const crayonError = (message)=>{
    if (errorConfig.log) console.log(`[${fourBitColors.red + attributes.bold}crayon${attributes.reset}] ${fourBitColors.yellow}${message}${attributes.reset}`);
    if (errorConfig.throw) throw new Error(message);
    return false;
};
const rgbToAnsi4 = (r, g4, b1)=>{
    const value = Math.round(Math.max(r, g4, b1) / 64);
    return !value ? 0 : (value >= 3 ? 8 : 0) + (Math.round(b1 / 255) << 2) | Math.round(g4 / 255) << 1 | Math.round(r / 255);
};
const rgbToAnsi8 = (r, g5, b2)=>{
    r = Math.round(r);
    g5 = Math.round(g5);
    b2 = Math.round(b2);
    return r >> 4 === g5 >> 4 && g5 >> 4 === b2 >> 4 ? r < 8 ? 16 : r > 248 ? 231 : Math.round((r - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g5 / 255 * 5) + Math.round(b2 / 255 * 5);
};
const ansi8ToAnsi4 = (code)=>{
    if (code >= 232) {
        const grayness = (code - 232) * 10 + 8;
        return rgbToAnsi4(grayness, grayness, grayness);
    }
    code -= 16;
    const rem = code % 36;
    const r = Math.floor(code / 36) / 5 * 255;
    const g6 = Math.floor(rem / 6) / 5 * 255;
    const b3 = rem % 6 / 5 * 255;
    return rgbToAnsi4(r, g6, b3);
};
const hslToRgb = (h1, s2, l2)=>{
    l2 /= 100;
    const a1 = s2 * Math.min(l2, 1 - l2) / 100;
    const f = (number)=>{
        const k2 = (number + h1 / 30) % 12;
        const color1 = l2 - a1 * Math.max(Math.min(k2 - 3, 9 - k2, 1), -1);
        return clamp(Math.round(255 * color1), 0, 255);
    };
    return [
        f(0),
        f(8),
        f(4)
    ];
};
const functions = {
    keyword (k3) {
        const style = styles[k3];
        if (style) return style;
        crayonError('Invalid keyword given in keyword function');
        return '';
    },
    ansi3 (c, bg) {
        if (typeof c !== 'number' || c > 7 || c < 0) crayonError('Invalid usage of ansi3 function, syntax: 0-7');
        if (!config.colorSupport.threeBitColor) return '';
        return `\x1b[${(bg ? 40 : 30) + clamp(c, 0, 7)}m`;
    },
    ansi4 (c, bg) {
        if (typeof c !== 'number' || c > 15 || c < 0) crayonError('Invalid usage of ansi4 function, syntax: 0-15');
        if (!config.colorSupport.fourBitColor) return functions.ansi3(ansi4ToAnsi3(c), bg);
        return `\x1b[${clamp(c, 0, 15) + (bg ? 10 : 0) + (c > 7 ? 82 : 30)}m`;
    },
    ansi8 (c, bg) {
        if (typeof c !== 'number' || c > 255 || c < 0) crayonError('Invalid usage of ansi8 function, syntax: 0-255');
        if (!config.colorSupport.highColor) return functions.ansi4(ansi8ToAnsi4(c), bg);
        return `\x1b[${bg ? 48 : 38};5;${clamp(c, 0, 255)}m`;
    },
    rgb (r, g7, b4, bg) {
        if (typeof r !== 'number' || typeof g7 !== 'number' || typeof b4 !== 'number' || r > 255 || r < 0 || g7 > 255 || g7 < 0 || b4 > 255 || b4 < 0) crayonError('Invalid usage of rgb function, syntax: r: 0-255, g: 0-255, b: 0-255');
        if (!config.colorSupport.trueColor) return functions.ansi8(rgbToAnsi8(r, g7, b4), bg);
        return `\x1b[${bg ? 48 : 38};2;${r};${g7};${b4}m`;
    },
    hsl (h2, s3, l3, bg) {
        if (typeof h2 !== 'number' || typeof s3 !== 'number' || typeof l3 !== 'number' || h2 > 360 || h2 < 0 || s3 > 100 || s3 < 0 || l3 > 100 || l3 < 0) crayonError('Incorrect usage of hsl function, syntax: h: 0-360, s: 0-100, l: 0-100');
        const rgb = hslToRgb(h2, s3, l3);
        if (!config.colorSupport.trueColor) return functions.ansi8(rgbToAnsi8(...rgb), bg);
        return functions.rgb(...rgb, bg);
    },
    hex (hex, ansi8, bg) {
        if (/#[0-F]{6}/.test(hex)) {
            hex = hex.slice(1);
            const chunks = hex.match(/.{2}/g);
            const rgb = chunks.map((v2)=>parseInt(v2, 16)
            );
            return ansi8 ? functions.ansi8(rgbToAnsi8(...rgb), bg) : functions.rgb(...rgb, bg);
        }
        crayonError('Incorrect usage of hex function, syntax: "#[0-F]{6}"');
        return '';
    },
    bgHex (hex, ansi8) {
        return functions.hex(hex, ansi8, true);
    }
};
const styles = {};
const optimizeStyles = (string)=>string.replace(/(\x1b\[([0-9]|;|)+?m)+\x1b\[0m/, styles.reset)
;
const crayonPrototype = {
    styleCache: '',
    preserveCache: false,
    config,
    instance (preserveCache, styleCache) {
        return buildCrayon(preserveCache, styleCache);
    },
    clone (clear, addCache) {
        return buildCrayon(this.preserveCache, (clear ? this.clearCache() : this.styleCache) + (addCache || ''));
    },
    clearCache () {
        const cache = this.styleCache;
        if (this.preserveCache) return cache;
        this.styleCache = '';
        return cache;
    },
    strip (text) {
        return text.replace(/\x1b\[[0-9]([0-9])?([0-9])?m/gi, '');
    }
};
const reloadStyles = ()=>{
    for(const value in styles){
        Object.defineProperty(crayonPrototype, value, {
            configurable: true,
            get () {
                return this.clone(true, styles[value]);
            }
        });
    }
};
reloadStyles();
const reloadFunctions = ()=>{
    for(const name in functions){
        if (name.startsWith('bg')) continue;
        const bgName = `bg${name[0].toUpperCase() + name.slice(1)}`;
        const func = functions[name];
        let needsSpecification = false;
        const bgFunc = functions[bgName] || (()=>{
            needsSpecification = true;
            return functions[name];
        })();
        Object.defineProperties(crayonPrototype, {
            [name]: {
                configurable: true,
                value (...args) {
                    const style = func(...args);
                    if (style !== '') return this.clone(true, style);
                    return this;
                }
            },
            [bgName]: {
                configurable: true,
                value (...args) {
                    if (needsSpecification) args.push(true);
                    const style = bgFunc(...args);
                    if (style !== '') return this.clone(true, style);
                    return this;
                }
            }
        });
    }
};
reloadFunctions();
const buildCrayon = (preserveCache, styleCache)=>{
    const crayon = function(...args) {
        if (!args.length) return buildCrayon(true);
        if (Array.isArray(args[0].raw)) {
            const returned = compileLiteral(...args);
            return crayon.config.optimizeStyles.literal ? optimizeStyles(returned) : returned;
        }
        const text = String(args.join(' '));
        const style = crayon.clearCache();
        if (!style) return text;
        const returned = style + text.replace(resetRegex, styles.reset + style) + styles.reset;
        return crayon.config.optimizeStyles.chain ? optimizeStyles(returned) : returned;
    };
    Object.setPrototypeOf(crayon, crayonPrototype);
    crayon.preserveCache = !!preserveCache;
    crayon.styleCache = styleCache || '';
    return crayon;
};
const resetRegex = /\x1b\[0m/gi;
const literalStyleRegex = /{([^\s]+\s)([^{}]+)}/;
const literalFuncRegex = /(\w+)\((.*)\)/;
const literalStringRegex = /^("|'|`)(.*)\1$/;
const compileLiteral = (...texts)=>{
    const args1 = texts.slice(1);
    const baseText = [
        ...texts[0]
    ];
    let text = '';
    while(args1.length || baseText.length){
        if (baseText.length) text += baseText.shift();
        if (args1.length) text += args1.shift();
    }
    let matches = text.match(literalStyleRegex);
    while(matches?.length){
        const style1 = matches[1].trimEnd().split('.').map((value)=>{
            const style = styles[value];
            if (style) return style;
            else {
                const match = value.match(literalFuncRegex);
                if (match?.length) {
                    const name = match[1];
                    const args = match[2].split(',').map((arg)=>{
                        const stringMatch = arg.match(literalStringRegex);
                        if (stringMatch?.length) return stringMatch[2];
                        const num = Number(arg);
                        if (num) return num;
                        return arg === 'false' || arg === 'true' ? Boolean(arg) : arg;
                    });
                    if (!name.startsWith('bg')) {
                        const func = functions[name];
                        if (func) return func(...args);
                    } else {
                        const nameWithoutBg = name[2].toLowerCase() + name.replace('bg', '').substr(1);
                        const bgFunc = functions[name] || (()=>{
                            args.push(true);
                            return functions[nameWithoutBg];
                        })();
                        if (bgFunc) return bgFunc(...args);
                    }
                }
            }
        }).join('');
        const matchedText = matches[2].split(styles.reset).join(styles.reset + style1);
        text = text.replace(matches[0], style1 + matchedText + styles.reset);
        matches = text.match(literalStyleRegex);
    }
    return text;
};
const crayonInstance = buildCrayon(false);
Object.assign(styles, attributes, fourBitColors);
const addStyleFunction = (name, func)=>{
    const status = Reflect.set(functions, name, func);
    if (status) reloadFunctions();
    return status;
};
const addStyleAlias = (alias, aliased1)=>{
    const style = styles[aliased1];
    if (!style) {
        crayonError(`Could not find style "${aliased1}"`);
        return false;
    }
    const status = Reflect.set(styles, alias, style);
    if (status) reloadStyles();
    return status;
};
const addStyleAliases = (aliases)=>{
    let status = true;
    for(const alias in aliases){
        const aliased2 = aliases[alias];
        const style = styles[aliased2];
        if (!style) {
            crayonError(`Could not find style "${aliased2}"`);
            status = false;
        } else status &&= Reflect.set(styles, alias, style);
    }
    if (status) reloadStyles();
    return status;
};
for(const aliased in styles){
    if (!aliased.toLowerCase().includes('light')) continue;
    const color = aliased.replace(/[lL]ight/, '').replace('bg', '').toLowerCase();
    const alias = (aliased.includes('bg') ? 'bg' + color[0].toUpperCase() + color.slice(1).toLowerCase() : color) + 'Bright';
    addStyleAlias(alias, aliased);
}
addStyleAliases({
    gray: 'lightBlack',
    bgGray: 'bgLightBlack',
    grey: 'lightBlack',
    bgGrey: 'bgLightBlack',
    inverse: 'invert'
});
addStyleFunction('ansi256', functions.ansi8);
var O = Object.create;
var n = Object.defineProperty;
var j = Object.getOwnPropertyDescriptor;
var a = Object.getOwnPropertyNames;
var v = Object.getPrototypeOf, y = Object.prototype.hasOwnProperty;
var d = (t)=>n(t, "__esModule", {
        value: !0
    })
;
var g = (t, r)=>()=>(r || t((r = {
            exports: {}
        }).exports, r), r.exports)
;
var m = (t, r, e, o1)=>{
    if (r && typeof r == "object" || typeof r == "function") for (let f of a(r))!y.call(t, f) && (e || f !== "default") && n(t, f, {
        get: ()=>r[f]
        ,
        enumerable: !(o1 = j(r, f)) || o1.enumerable
    });
    return t;
}, l = (t, r)=>m(d(n(t != null ? O(v(t)) : {}, "default", !r && t && t.__esModule ? {
        get: ()=>t.default
        ,
        enumerable: !0
    } : {
        value: t,
        enumerable: !0
    })), t)
;
var s = g((q, p)=>{
    "use strict";
    p.exports = function t(r, e) {
        if (r === e) return !0;
        if (r && e && typeof r == "object" && typeof e == "object") {
            if (r.constructor !== e.constructor) return !1;
            var o2, f, u;
            if (Array.isArray(r)) {
                if (o2 = r.length, o2 != e.length) return !1;
                for(f = o2; (f--) !== 0;)if (!t(r[f], e[f])) return !1;
                return !0;
            }
            if (r.constructor === RegExp) return r.source === e.source && r.flags === e.flags;
            if (r.valueOf !== Object.prototype.valueOf) return r.valueOf() === e.valueOf();
            if (r.toString !== Object.prototype.toString) return r.toString() === e.toString();
            if (u = Object.keys(r), o2 = u.length, o2 !== Object.keys(e).length) return !1;
            for(f = o2; (f--) !== 0;)if (!Object.prototype.hasOwnProperty.call(e, u[f])) return !1;
            for(f = o2; (f--) !== 0;){
                var c = u[f];
                if (!t(r[c], e[c])) return !1;
            }
            return !0;
        }
        return r !== r && e !== e;
    };
});
var i = l(s()), S = l(s()), { default: $ , ...x } = S, w = (i.default ?? $) ?? x;
const cloneDeep = (value)=>{
    const typeofValue = typeof value;
    if ([
        "string",
        "number",
        "boolean",
        "string",
        "bigint",
        "symbol",
        "null",
        "undefined",
        "function", 
    ].includes(typeofValue)) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(cloneDeep);
    }
    if (typeofValue === "object") {
        const clone = {};
        for(let prop in value){
            clone[prop] = cloneDeep(value[prop]);
        }
        return clone;
    }
    throw new Error(`You've tried to clone something that can't be cloned`);
};
var J = Object.create;
var s1 = Object.defineProperty;
var N = Object.getOwnPropertyDescriptor;
var S1 = Object.getOwnPropertyNames;
var b = Object.getPrototypeOf, h = Object.prototype.hasOwnProperty;
var j1 = (i1)=>s1(i1, "__esModule", {
        value: !0
    })
;
var x1 = (i2, r)=>()=>(r || i2((r = {
            exports: {}
        }).exports, r), r.exports)
;
var _ = (i3, r, a2, n1)=>{
    if (r && typeof r == "object" || typeof r == "function") for (let e of S1(r))!h.call(i3, e) && (a2 || e !== "default") && s1(i3, e, {
        get: ()=>r[e]
        ,
        enumerable: !(n1 = N(r, e)) || n1.enumerable
    });
    return i3;
}, O1 = (i4, r)=>_(j1(s1(i4 != null ? J(b(i4)) : {}, "default", !r && i4 && i4.__esModule ? {
        get: ()=>i4.default
        ,
        enumerable: !0
    } : {
        value: i4,
        enumerable: !0
    })), i4)
;
var v1 = x1((C, p)=>{
    "use strict";
    p.exports = function(i5, r) {
        r || (r = {}), typeof r == "function" && (r = {
            cmp: r
        });
        var a3 = typeof r.cycles == "boolean" ? r.cycles : !1, n2 = r.cmp && function(c) {
            return function(t) {
                return function(f, u) {
                    var y2 = {
                        key: f,
                        value: t[f]
                    }, l4 = {
                        key: u,
                        value: t[u]
                    };
                    return c(y2, l4);
                };
            };
        }(r.cmp), e = [];
        return (function c(t) {
            if (t && t.toJSON && typeof t.toJSON == "function" && (t = t.toJSON()), t !== void 0) {
                if (typeof t == "number") return isFinite(t) ? "" + t : "null";
                if (typeof t != "object") return JSON.stringify(t);
                var f, u;
                if (Array.isArray(t)) {
                    for(u = "[", f = 0; f < t.length; f++)f && (u += ","), u += c(t[f]) || "null";
                    return u + "]";
                }
                if (t === null) return "null";
                if (e.indexOf(t) !== -1) {
                    if (a3) return JSON.stringify("__cycle__");
                    throw new TypeError("Converting circular structure to JSON");
                }
                var y3 = e.push(t) - 1, l5 = Object.keys(t).sort(n2 && n2(t));
                for(u = "", f = 0; f < l5.length; f++){
                    var m2 = l5[f], o3 = c(t[m2]);
                    !o3 || (u && (u += ","), u += JSON.stringify(m2) + ":" + o3);
                }
                return e.splice(y3, 1), "{" + u + "}";
            }
        })(i5);
    };
});
var g1 = O1(v1()), $1 = O1(v1()), { default: k , ...w1 } = $1, E = (g1.default ?? k) ?? w1;
var S2 = Object.create;
var l1 = Object.defineProperty;
var g2 = Object.getOwnPropertyDescriptor;
var C = Object.getOwnPropertyNames;
var I = Object.getPrototypeOf, A = Object.prototype.hasOwnProperty;
var B = (e)=>l1(e, "__esModule", {
        value: !0
    })
;
var O2 = (e, r)=>()=>(r || e((r = {
            exports: {}
        }).exports, r), r.exports)
;
var m1 = (e, r, a4, b5)=>{
    if (r && typeof r == "object" || typeof r == "function") for (let t of C(r))!A.call(e, t) && (a4 || t !== "default") && l1(e, t, {
        get: ()=>r[t]
        ,
        enumerable: !(b5 = g2(r, t)) || b5.enumerable
    });
    return e;
}, D = (e, r)=>m1(B(l1(e != null ? S2(I(e)) : {}, "default", !r && e && e.__esModule ? {
        get: ()=>e.default
        ,
        enumerable: !0
    } : {
        value: e,
        enumerable: !0
    })), e)
;
var U = O2((n3)=>{
    "use strict";
    Object.defineProperty(n3, "__esModule", {
        value: !0
    });
    function v3(e, r, a5) {
        var b6;
        if (a5 === void 0 && (a5 = {}), !r.codes) {
            r.codes = {};
            for(var t = 0; t < r.chars.length; ++t)r.codes[r.chars[t]] = t;
        }
        if (!a5.loose && e.length * r.bits & 7) throw new SyntaxError("Invalid padding");
        for(var u = e.length; e[u - 1] === "=";)if (--u, !a5.loose && !((e.length - u) * r.bits & 7)) throw new SyntaxError("Invalid padding");
        for(var h3 = new ((b6 = a5.out) != null ? b6 : Uint8Array)(u * r.bits / 8 | 0), s4 = 0, i6 = 0, c = 0, f = 0; f < u; ++f){
            var x4 = r.codes[e[f]];
            if (x4 === void 0) throw new SyntaxError("Invalid character " + e[f]);
            i6 = i6 << r.bits | x4, s4 += r.bits, s4 >= 8 && (s4 -= 8, h3[c++] = 255 & i6 >> s4);
        }
        if (s4 >= r.bits || 255 & i6 << 8 - s4) throw new SyntaxError("Unexpected end of data");
        return h3;
    }
    function p(e, r, a6) {
        a6 === void 0 && (a6 = {});
        for(var b7 = a6, t = b7.pad, u = t === void 0 ? !0 : t, h4 = (1 << r.bits) - 1, s5 = "", i7 = 0, c = 0, f = 0; f < e.length; ++f)for(c = c << 8 | 255 & e[f], i7 += 8; i7 > r.bits;)i7 -= r.bits, s5 += r.chars[h4 & c >> i7];
        if (i7 && (s5 += r.chars[h4 & c << r.bits - i7]), u) for(; s5.length * r.bits & 7;)s5 += "=";
        return s5;
    }
    var d1 = {
        chars: "0123456789ABCDEF",
        bits: 4
    }, y4 = {
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
        bits: 5
    }, w2 = {
        chars: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
        bits: 5
    }, E2 = {
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        bits: 6
    }, $2 = {
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
        bits: 6
    }, F = {
        parse: function(r, a7) {
            return v3(r.toUpperCase(), d1, a7);
        },
        stringify: function(r, a8) {
            return p(r, d1, a8);
        }
    }, H1 = {
        parse: function(r, a9) {
            return a9 === void 0 && (a9 = {}), v3(a9.loose ? r.toUpperCase().replace(/0/g, "O").replace(/1/g, "L").replace(/8/g, "B") : r, y4, a9);
        },
        stringify: function(r, a10) {
            return p(r, y4, a10);
        }
    }, L1 = {
        parse: function(r, a11) {
            return v3(r, w2, a11);
        },
        stringify: function(r, a12) {
            return p(r, w2, a12);
        }
    }, M1 = {
        parse: function(r, a13) {
            return v3(r, E2, a13);
        },
        stringify: function(r, a14) {
            return p(r, E2, a14);
        }
    }, P = {
        parse: function(r, a15) {
            return v3(r, $2, a15);
        },
        stringify: function(r, a16) {
            return p(r, $2, a16);
        }
    }, j2 = {
        parse: v3,
        stringify: p
    };
    n3.base16 = F;
    n3.base32 = H1;
    n3.base32hex = L1;
    n3.base64 = M1;
    n3.base64url = P;
    n3.codec = j2;
});
var o = D(U(), 1), K = o.default.base16, N1 = o.default.base32, Q = o.default.base32hex, R = o.default.base64, T = o.default.base64url, V = o.default.codec, k1 = o.default;
const mod = {
    default: k1,
    base16: K,
    base32: N1,
    base32hex: Q,
    base64: R,
    base64url: T,
    codec: V
};
var C1 = Object.create;
var E1 = Object.defineProperty;
var D1 = Object.getOwnPropertyDescriptor;
var T1 = Object.getOwnPropertyNames;
var z = Object.getPrototypeOf, G = Object.prototype.hasOwnProperty;
var L = (t)=>E1(t, "__esModule", {
        value: !0
    })
;
var M = (t, e)=>()=>(e || t((e = {
            exports: {}
        }).exports, e), e.exports)
;
var I1 = (t, e, s6, c)=>{
    if (e && typeof e == "object" || typeof e == "function") for (let i8 of T1(e))!G.call(t, i8) && (s6 || i8 !== "default") && E1(t, i8, {
        get: ()=>e[i8]
        ,
        enumerable: !(c = D1(e, i8)) || c.enumerable
    });
    return t;
}, g3 = (t, e)=>I1(L(E1(t != null ? C1(z(t)) : {}, "default", !e && t && t.__esModule ? {
        get: ()=>t.default
        ,
        enumerable: !0
    } : {
        value: t,
        enumerable: !0
    })), t)
;
var y1 = M((u)=>{
    "use strict";
    Object.defineProperty(u, "__esModule", {
        value: !0
    });
    u.Hash = u.createHash = void 0;
    var O3 = [
        1116352408 | 0,
        1899447441 | 0,
        3049323471 | 0,
        3921009573 | 0,
        961987163 | 0,
        1508970993 | 0,
        2453635748 | 0,
        2870763221 | 0,
        3624381080 | 0,
        310598401 | 0,
        607225278 | 0,
        1426881987 | 0,
        1925078388 | 0,
        2162078206 | 0,
        2614888103 | 0,
        3248222580 | 0,
        3835390401 | 0,
        4022224774 | 0,
        264347078 | 0,
        604807628 | 0,
        770255983 | 0,
        1249150122 | 0,
        1555081692 | 0,
        1996064986 | 0,
        2554220882 | 0,
        2821834349 | 0,
        2952996808 | 0,
        3210313671 | 0,
        3336571891 | 0,
        3584528711 | 0,
        113926993 | 0,
        338241895 | 0,
        666307205 | 0,
        773529912 | 0,
        1294757372 | 0,
        1396182291 | 0,
        1695183700 | 0,
        1986661051 | 0,
        2177026350 | 0,
        2456956037 | 0,
        2730485921 | 0,
        2820302411 | 0,
        3259730800 | 0,
        3345764771 | 0,
        3516065817 | 0,
        3600352804 | 0,
        4094571909 | 0,
        275423344 | 0,
        430227734 | 0,
        506948616 | 0,
        659060556 | 0,
        883997877 | 0,
        958139571 | 0,
        1322822218 | 0,
        1537002063 | 0,
        1747873779 | 0,
        1955562222 | 0,
        2024104815 | 0,
        2227730452 | 0,
        2361852424 | 0,
        2428436474 | 0,
        2756734187 | 0,
        3204031479 | 0,
        3329325298 | 0
    ], A1 = {
        sha256: 1
    };
    function P(t) {
        if (t && !A1[t] && !A1[t.toLowerCase()]) throw new Error("Digest method not supported");
        return new F;
    }
    u.createHash = P;
    var F = class {
        constructor(){
            this.A = 1779033703 | 0, this.B = 3144134277 | 0, this.C = 1013904242 | 0, this.D = 2773480762 | 0, this.E = 1359893119 | 0, this.F = 2600822924 | 0, this.G = 528734635 | 0, this.H = 1541459225 | 0, this._size = 0, this._sp = 0, (!w3 || d2 >= 8000) && (w3 = new ArrayBuffer(8000), d2 = 0), this._byte = new Uint8Array(w3, d2, 80), this._word = new Int32Array(w3, d2, 20), d2 += 80;
        }
        update(e) {
            if (typeof e == "string") return this._utf8(e);
            if (e == null) throw new TypeError("Invalid type: " + typeof e);
            let s7 = e.byteOffset, c = e.byteLength, i9 = c / 64 | 0, f = 0;
            if (i9 && !(s7 & 3) && !(this._size % 64)) {
                let n4 = new Int32Array(e.buffer, s7, i9 * 16);
                for(; i9--;)this._int32(n4, f >> 2), f += 64;
                this._size += f;
            }
            if (e.BYTES_PER_ELEMENT !== 1 && e.buffer) {
                let n5 = new Uint8Array(e.buffer, s7 + f, c - f);
                return this._uint8(n5);
            }
            return f === c ? this : this._uint8(e, f);
        }
        _uint8(e, s8) {
            let { _byte: c , _word: i10  } = this, f = e.length;
            for(s8 = s8 | 0; s8 < f;){
                let r = this._size % 64, n6 = r;
                for(; s8 < f && n6 < 64;)c[n6++] = e[s8++];
                n6 >= 64 && this._int32(i10), this._size += n6 - r;
            }
            return this;
        }
        _utf8(e) {
            let { _byte: s9 , _word: c  } = this, i11 = e.length, f = this._sp;
            for(let r = 0; r < i11;){
                let n7 = this._size % 64, h5 = n7;
                for(; r < i11 && h5 < 64;){
                    let x5 = e.charCodeAt(r++) | 0;
                    x5 < 128 ? s9[h5++] = x5 : x5 < 2048 ? (s9[h5++] = 192 | x5 >>> 6, s9[h5++] = 128 | x5 & 63) : x5 < 55296 || x5 > 57343 ? (s9[h5++] = 224 | x5 >>> 12, s9[h5++] = 128 | x5 >>> 6 & 63, s9[h5++] = 128 | x5 & 63) : f ? (x5 = ((f & 1023) << 10) + (x5 & 1023) + 65536, s9[h5++] = 240 | x5 >>> 18, s9[h5++] = 128 | x5 >>> 12 & 63, s9[h5++] = 128 | x5 >>> 6 & 63, s9[h5++] = 128 | x5 & 63, f = 0) : f = x5;
                }
                h5 >= 64 && (this._int32(c), c[0] = c[16]), this._size += h5 - n7;
            }
            return this._sp = f, this;
        }
        _int32(e, s10) {
            let { A: c , B: i12 , C: f , D: r , E: n8 , F: h6 , G: x6 , H: a17  } = this, o4 = 0;
            for(s10 = s10 | 0; o4 < 16;)l6[o4++] = b8(e[s10++]);
            for(o4 = 16; o4 < 64; o4++)l6[o4] = j3(l6[o4 - 2]) + l6[o4 - 7] + Y(l6[o4 - 15]) + l6[o4 - 16] | 0;
            for(o4 = 0; o4 < 64; o4++){
                let p = a17 + R1(n8) + $3(n8, h6, x6) + O3[o4] + l6[o4] | 0, m3 = N2(c) + v4(c, i12, f) | 0;
                a17 = x6, x6 = h6, h6 = n8, n8 = r + p | 0, r = f, f = i12, i12 = c, c = p + m3 | 0;
            }
            this.A = c + this.A | 0, this.B = i12 + this.B | 0, this.C = f + this.C | 0, this.D = r + this.D | 0, this.E = n8 + this.E | 0, this.F = h6 + this.F | 0, this.G = x6 + this.G | 0, this.H = a17 + this.H | 0;
        }
        digest(e) {
            let { _byte: s11 , _word: c  } = this, i13 = this._size % 64 | 0;
            for(s11[i13++] = 128; i13 & 3;)s11[i13++] = 0;
            if (i13 >>= 2, i13 > 14) {
                for(; i13 < 16;)c[i13++] = 0;
                i13 = 0, this._int32(c);
            }
            for(; i13 < 16;)c[i13++] = 0;
            let f = this._size * 8, r = (f & 4294967295) >>> 0, n9 = (f - r) / 4294967296;
            return n9 && (c[14] = b8(n9)), r && (c[15] = b8(r)), this._int32(c), e === "hex" ? this._hex() : this._bin();
        }
        _hex() {
            let { A: e , B: s12 , C: c , D: i14 , E: f , F: r , G: n10 , H: h7  } = this;
            return _1(e) + _1(s12) + _1(c) + _1(i14) + _1(f) + _1(r) + _1(n10) + _1(h7);
        }
        _bin() {
            let { A: e , B: s13 , C: c , D: i15 , E: f , F: r , G: n11 , H: h8 , _byte: x7 , _word: a18  } = this;
            return a18[0] = b8(e), a18[1] = b8(s13), a18[2] = b8(c), a18[3] = b8(i15), a18[4] = b8(f), a18[5] = b8(r), a18[6] = b8(n11), a18[7] = b8(h8), x7.slice(0, 32);
        }
    };
    u.Hash = F;
    var l6 = new Int32Array(64), w3, d2 = 0, _1 = (t)=>(t + 4294967296).toString(16).substr(-8)
    , S3 = (t)=>t << 24 & 4278190080 | t << 8 & 16711680 | t >> 8 & 65280 | t >> 24 & 255
    , U1 = (t)=>t
    , b8 = k4() ? U1 : S3, $3 = (t, e, s14)=>s14 ^ t & (e ^ s14)
    , v4 = (t, e, s15)=>t & e | s15 & (t | e)
    , N2 = (t)=>(t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10)
    , R1 = (t)=>(t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7)
    , Y = (t)=>(t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3
    , j3 = (t)=>(t >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10
    ;
    function k4() {
        return new Uint8Array(new Uint16Array([
            65279
        ]).buffer)[0] === 254;
    }
});
var B1 = g3(y1()), H = g3(y1()), { __esModule: Q1 , Hash: V1 , createHash: X  } = H, { default: K1 , ...W } = H, Z = (B1.default ?? K1) ?? W;
const mod1 = {
    default: Z,
    Hash: V1,
    __esModule: Q1,
    createHash: X
};
const log = (...args)=>{};
const busdebug = "        🚌";
let J1 = JSON.stringify;
const DEFAULT_CB_MODE = "blocking";
const DEFAULT_SEP = ":";
class Superbus {
    _subs = {};
    _sep;
    constructor(sep = DEFAULT_SEP){
        this._sep = sep;
    }
    once(channelInput, callback, opts = {}) {
        return this.on(channelInput, callback, {
            ...opts,
            once: true
        });
    }
    on(channelInput, callback, opts = {}) {
        opts.mode = opts.mode ?? DEFAULT_CB_MODE;
        opts.once = opts.once ?? false;
        const callbackAndOpts = {
            ...opts,
            callback: callback
        };
        const channels = typeof channelInput === "string" ? [
            channelInput
        ] : channelInput;
        log(`${busdebug} on channels:`, J1(channels), JSON.stringify(opts));
        for (const channel1 of channels){
            log(`${busdebug} ...on one channel`, J1(channel1));
            const set = this._subs[channel1] ??= new Set();
            set.add(callbackAndOpts);
        }
        return ()=>{
            log(`${busdebug} unsubscribe from ${J1(channels)}`);
            for (const channel of channels){
                this._unsub(channel, callbackAndOpts);
            }
        };
    }
    _unsub(channel, callbackAndOpts) {
        const set = this._subs[channel];
        if (set !== undefined) {
            set.delete(callbackAndOpts);
            if (set.size === 0) {
                delete this._subs[channel];
            }
        }
    }
    _expandChannelToListeners(channel) {
        const channels = [
            channel
        ];
        if (channel.indexOf(this._sep) !== -1) {
            const [baseChannel] = channel.split(this._sep, 1);
            channels.push(baseChannel);
        }
        channels.push("*");
        log(`${busdebug} _expandChannels "${channel}" -> ${JSON.stringify(channels)}`);
        return channels;
    }
    async sendAndWait(channel, data) {
        log(`${busdebug} sendAndWait(${J1(channel)}).  expanding...`);
        if (channel === "*") {
            throw new Error("Superbus usage error: You can't send to the channel '*', you can only listen to it");
        }
        const subChannels = this._expandChannelToListeners(channel);
        let errors = [];
        for (const subChannel of subChannels){
            log(`${busdebug} ...sendAndWait: send ${J1(channel)} to subchannel ${J1(subChannel)} subscription, data = ${data})`);
            const cbsAndOpts = this._subs[subChannel];
            if (cbsAndOpts === undefined || cbsAndOpts.size === 0) continue;
            const proms = [];
            for (const cbAndOpt of cbsAndOpts){
                const { mode , callback , once  } = cbAndOpt;
                if (once === true) {
                    this._unsub(channel, cbAndOpt);
                }
                if (mode === "blocking") {
                    try {
                        const prom = callback(channel, data);
                        if (prom instanceof Promise) {
                            proms.push(prom);
                        }
                    } catch (err) {
                        log(`${busdebug} error while launching blocking callback`);
                        errors.push(err);
                    }
                } else if (mode === "nonblocking") {
                    setTimeout(()=>callback(channel, data)
                    , 1);
                }
            }
            let promResults = await Promise.allSettled(proms);
            for (let promResult of promResults){
                if (promResult.status === "rejected") {
                    let err = promResult.reason;
                    errors.push(err);
                }
            }
        }
        if (errors.length >= 1) {
            return errors;
        } else {
            return null;
        }
    }
    sendLater(channel, data) {
        const subChannels = this._expandChannelToListeners(channel);
        for (const subChannel of subChannels){
            log(`${busdebug} sendAndWait(send ${channel} to ${subChannel} subscription, ${data})`);
            const cbsAndOpts = this._subs[subChannel];
            if (cbsAndOpts === undefined || cbsAndOpts.size === 0) continue;
            for (const cbAndOpt of cbsAndOpts){
                if (cbAndOpt.once === true) {
                    this._unsub(channel, cbAndOpt);
                }
                const { callback  } = cbAndOpt;
                setTimeout(()=>callback(channel, data)
                , 1);
            }
        }
    }
    removeAllSubscriptions() {
        log(`${busdebug} removeAllSubscriptions()`);
        for (const set of Object.values(this._subs)){
            set.clear();
        }
        this._subs = {};
    }
}
const _0n = BigInt(0);
const _1n = BigInt(1);
const _2n = BigInt(2);
const _255n = BigInt(255);
const CURVE = {
    a: BigInt(-1),
    d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
    P: _2n ** _255n - BigInt(19),
    n: _2n ** BigInt(252) + BigInt("27742317777372353535851937790883648493"),
    h: BigInt(8),
    Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
    Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960")
};
const SQRT_M1 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
const SQRT_AD_MINUS_ONE = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
const INVSQRT_A_MINUS_D = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
const ONE_MINUS_D_SQ = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
const D_MINUS_ONE_SQ = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
class ExtendedPoint {
    x;
    y;
    z;
    t;
    constructor(x8, y5, z1, t){
        this.x = x8;
        this.y = y5;
        this.z = z1;
        this.t = t;
    }
    static BASE = new ExtendedPoint(CURVE.Gx, CURVE.Gy, _1n, mod2(CURVE.Gx * CURVE.Gy));
    static ZERO = new ExtendedPoint(_0n, _1n, _1n, _0n);
    static fromAffine(p) {
        if (!(p instanceof Point)) {
            throw new TypeError("ExtendedPoint#fromAffine: expected Point");
        }
        if (p.equals(Point.ZERO)) return ExtendedPoint.ZERO;
        return new ExtendedPoint(p.x, p.y, _1n, mod2(p.x * p.y));
    }
    static toAffineBatch(points) {
        const toInv = invertBatch(points.map((p)=>p.z
        ));
        return points.map((p, i16)=>p.toAffine(toInv[i16])
        );
    }
    static normalizeZ(points) {
        return this.toAffineBatch(points).map(this.fromAffine);
    }
    static fromRistrettoHash(hash) {
        hash = ensureBytes(hash);
        assertLen(64, hash);
        const r1 = bytes255ToNumberLE(hash.slice(0, 32));
        const R1 = this.calcElligatorRistrettoMap(r1);
        const r2 = bytes255ToNumberLE(hash.slice(32, 64));
        const R2 = this.calcElligatorRistrettoMap(r2);
        return R1.add(R2);
    }
    static calcElligatorRistrettoMap(r0) {
        const { d: d3  } = CURVE;
        const r = mod2(SQRT_M1 * r0 * r0);
        const Ns = mod2((r + _1n) * ONE_MINUS_D_SQ);
        let c = BigInt(-1);
        const D2 = mod2((c - d3 * r) * mod2(r + d3));
        let { isValid: Ns_D_is_sq , value: s16  } = uvRatio(Ns, D2);
        let s_ = mod2(s16 * r0);
        if (!edIsNegative(s_)) s_ = mod2(-s_);
        if (!Ns_D_is_sq) s16 = s_;
        if (!Ns_D_is_sq) c = r;
        const Nt = mod2(c * (r - _1n) * D_MINUS_ONE_SQ - D2);
        const s2 = s16 * s16;
        const W0 = mod2((s16 + s16) * D2);
        const W1 = mod2(Nt * SQRT_AD_MINUS_ONE);
        const W2 = mod2(_1n - s2);
        const W3 = mod2(_1n + s2);
        return new ExtendedPoint(mod2(W0 * W3), mod2(W2 * W1), mod2(W1 * W3), mod2(W0 * W2));
    }
    static fromRistrettoBytes(bytes) {
        bytes = ensureBytes(bytes);
        assertLen(32, bytes);
        const { a: a19 , d: d4  } = CURVE;
        const emsg = "ExtendedPoint.fromRistrettoBytes: Cannot convert bytes to Ristretto Point";
        const s17 = bytes255ToNumberLE(bytes);
        if (!equalBytes(numberToBytesLEPadded(s17, 32), bytes) || edIsNegative(s17)) {
            throw new Error(emsg);
        }
        const s2 = mod2(s17 * s17);
        const u1 = mod2(_1n + a19 * s2);
        const u2 = mod2(_1n - a19 * s2);
        const u1_2 = mod2(u1 * u1);
        const u2_2 = mod2(u2 * u2);
        const v5 = mod2(a19 * d4 * u1_2 - u2_2);
        const { isValid , value: I2  } = invertSqrt(mod2(v5 * u2_2));
        const Dx = mod2(I2 * u2);
        const Dy = mod2(I2 * Dx * v5);
        let x9 = mod2((s17 + s17) * Dx);
        if (edIsNegative(x9)) x9 = mod2(-x9);
        const y6 = mod2(u1 * Dy);
        const t = mod2(x9 * y6);
        if (!isValid || edIsNegative(t) || y6 === _0n) throw new Error(emsg);
        return new ExtendedPoint(x9, y6, _1n, t);
    }
    toRistrettoBytes() {
        let { x: x10 , y: y7 , z: z2 , t  } = this;
        const u1 = mod2(mod2(z2 + y7) * mod2(z2 - y7));
        const u2 = mod2(x10 * y7);
        const { value: invsqrt  } = invertSqrt(mod2(u1 * u2 ** _2n));
        const D11 = mod2(invsqrt * u1);
        const D2 = mod2(invsqrt * u2);
        const zInv = mod2(D11 * D2 * t);
        let D3;
        if (edIsNegative(t * zInv)) {
            let _x = mod2(y7 * SQRT_M1);
            let _y = mod2(x10 * SQRT_M1);
            x10 = _x;
            y7 = _y;
            D3 = mod2(D11 * INVSQRT_A_MINUS_D);
        } else {
            D3 = D2;
        }
        if (edIsNegative(x10 * zInv)) y7 = mod2(-y7);
        let s18 = mod2((z2 - y7) * D3);
        if (edIsNegative(s18)) s18 = mod2(-s18);
        return numberToBytesLEPadded(s18, 32);
    }
    equals(other) {
        const a20 = this;
        const b9 = other;
        return mod2(a20.t * b9.z) === mod2(b9.t * a20.z);
    }
    negate() {
        return new ExtendedPoint(mod2(-this.x), this.y, this.z, mod2(-this.t));
    }
    double() {
        const X1 = this.x;
        const Y1 = this.y;
        const Z1 = this.z;
        const { a: a21  } = CURVE;
        const A2 = mod2(X1 ** _2n);
        const B2 = mod2(Y1 ** _2n);
        const C2 = mod2(_2n * Z1 ** _2n);
        const D4 = mod2(a21 * A2);
        const E3 = mod2((X1 + Y1) ** _2n - A2 - B2);
        const G1 = mod2(D4 + B2);
        const F = mod2(G1 - C2);
        const H2 = mod2(D4 - B2);
        const X3 = mod2(E3 * F);
        const Y3 = mod2(G1 * H2);
        const T3 = mod2(E3 * H2);
        const Z3 = mod2(F * G1);
        return new ExtendedPoint(X3, Y3, Z3, T3);
    }
    add(other) {
        const X1 = this.x;
        const Y1 = this.y;
        const Z1 = this.z;
        const T11 = this.t;
        const X2 = other.x;
        const Y2 = other.y;
        const Z2 = other.z;
        const T2 = other.t;
        const A3 = mod2((Y1 - X1) * (Y2 + X2));
        const B3 = mod2((Y1 + X1) * (Y2 - X2));
        const F = mod2(B3 - A3);
        if (F === _0n) {
            return this.double();
        }
        const C3 = mod2(Z1 * _2n * T2);
        const D5 = mod2(T11 * _2n * Z2);
        const E4 = mod2(D5 + C3);
        const G2 = mod2(B3 + A3);
        const H3 = mod2(D5 - C3);
        const X3 = mod2(E4 * F);
        const Y3 = mod2(G2 * H3);
        const T3 = mod2(E4 * H3);
        const Z3 = mod2(F * G2);
        return new ExtendedPoint(X3, Y3, Z3, T3);
    }
    subtract(other) {
        return this.add(other.negate());
    }
    multiplyUnsafe(scalar) {
        let n12 = normalizeScalar(scalar);
        const P0 = ExtendedPoint.ZERO;
        if (this.equals(P0) || n12 === _1n) return this;
        let p = P0;
        let d5 = this;
        while(n12 > _0n){
            if (n12 & _1n) p = p.add(d5);
            d5 = d5.double();
            n12 >>= _1n;
        }
        return p;
    }
    precomputeWindow(W1) {
        const windows = 256 / W1 + 1;
        let points = [];
        let p = this;
        let base = p;
        for(let window = 0; window < windows; window++){
            base = p;
            points.push(base);
            for(let i17 = 1; i17 < 2 ** (W1 - 1); i17++){
                base = base.add(p);
                points.push(base);
            }
            p = base.double();
        }
        return points;
    }
    wNAF(n13, affinePoint) {
        if (!affinePoint && this.equals(ExtendedPoint.BASE)) {
            affinePoint = Point.BASE;
        }
        const W2 = affinePoint && affinePoint._WINDOW_SIZE || 1;
        if (256 % W2) {
            throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
        }
        let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
        if (!precomputes) {
            precomputes = this.precomputeWindow(W2);
            if (affinePoint && W2 !== 1) {
                precomputes = ExtendedPoint.normalizeZ(precomputes);
                pointPrecomputes.set(affinePoint, precomputes);
            }
        }
        let p = ExtendedPoint.ZERO;
        let f = ExtendedPoint.ZERO;
        const windows = 256 / W2 + 1;
        const windowSize = 2 ** (W2 - 1);
        const mask = BigInt(2 ** W2 - 1);
        const maxNumber = 2 ** W2;
        const shiftBy = BigInt(W2);
        for(let window = 0; window < windows; window++){
            const offset = window * windowSize;
            let wbits = Number(n13 & mask);
            n13 >>= shiftBy;
            if (wbits > windowSize) {
                wbits -= maxNumber;
                n13 += _1n;
            }
            if (wbits === 0) {
                let pr = precomputes[offset];
                if (window % 2) pr = pr.negate();
                f = f.add(pr);
            } else {
                let cached = precomputes[offset + Math.abs(wbits) - 1];
                if (wbits < 0) cached = cached.negate();
                p = p.add(cached);
            }
        }
        return [
            p,
            f
        ];
    }
    multiply(scalar, affinePoint) {
        const n14 = normalizeScalar(scalar);
        return ExtendedPoint.normalizeZ(this.wNAF(n14, affinePoint))[0];
    }
    toAffine(invZ = invert(this.z)) {
        const x11 = mod2(this.x * invZ);
        const y8 = mod2(this.y * invZ);
        return new Point(x11, y8);
    }
}
const pointPrecomputes = new WeakMap();
class Point {
    x;
    y;
    static BASE = new Point(CURVE.Gx, CURVE.Gy);
    static ZERO = new Point(_0n, _1n);
    _WINDOW_SIZE;
    constructor(x12, y9){
        this.x = x12;
        this.y = y9;
    }
    _setWindowSize(windowSize) {
        this._WINDOW_SIZE = windowSize;
        pointPrecomputes.delete(this);
    }
    static fromHex(hex) {
        const { d: d6 , P  } = CURVE;
        const bytes = ensureBytes(hex);
        assertLen(32, bytes);
        const normed = bytes.slice();
        normed[31] = bytes[31] & ~128;
        const y10 = bytesToNumberLE(normed);
        if (y10 >= P) throw new Error("Point.fromHex expects hex <= Fp");
        const y2 = mod2(y10 * y10);
        const u = mod2(y2 - _1n);
        const v6 = mod2(d6 * y2 + _1n);
        let { isValid , value: x13  } = uvRatio(u, v6);
        if (!isValid) throw new Error("Point.fromHex: invalid y coordinate");
        const isXOdd = (x13 & _1n) === _1n;
        const isLastByteOdd = (bytes[31] & 128) !== 0;
        if (isLastByteOdd !== isXOdd) {
            x13 = mod2(-x13);
        }
        return new Point(x13, y10);
    }
    static async fromPrivateKey(privateKey) {
        return (await calcKeys(privateKey)).P;
    }
    toRawBytes() {
        const bytes = numberToBytesLEPadded(this.y, 32);
        bytes[31] |= this.x & _1n ? 128 : 0;
        return bytes;
    }
    toHex() {
        return bytesToHex(this.toRawBytes());
    }
    toX25519() {
        return mod2((_1n + this.y) * invert(_1n - this.y));
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    negate() {
        return new Point(mod2(-this.x), this.y);
    }
    add(other) {
        return ExtendedPoint.fromAffine(this).add(ExtendedPoint.fromAffine(other)).toAffine();
    }
    subtract(other) {
        return this.add(other.negate());
    }
    multiply(scalar) {
        return ExtendedPoint.fromAffine(this).multiply(scalar, this).toAffine();
    }
}
class Signature {
    r;
    s;
    constructor(r, s19){
        this.r = r;
        if (!(r instanceof Point)) throw new Error("Expected Point instance");
        this.s = normalizeScalar(s19);
    }
    static fromHex(hex) {
        const bytes = ensureBytes(hex);
        assertLen(64, bytes);
        const r = Point.fromHex(bytes.slice(0, 32));
        const s20 = bytesToNumberLE(bytes.slice(32));
        return new Signature(r, s20);
    }
    toRawBytes() {
        const u8 = new Uint8Array(64);
        u8.set(this.r.toRawBytes());
        u8.set(numberToBytesLEPadded(this.s, 32), 32);
        return u8;
    }
    toHex() {
        return bytesToHex(this.toRawBytes());
    }
}
function concatBytes(...arrays) {
    if (!arrays.every((a22)=>a22 instanceof Uint8Array
    )) {
        throw new Error("Expected Uint8Array list");
    }
    if (arrays.length === 1) return arrays[0];
    const length = arrays.reduce((a23, arr)=>a23 + arr.length
    , 0);
    const result = new Uint8Array(length);
    for(let i18 = 0, pad = 0; i18 < arrays.length; i18++){
        const arr = arrays[i18];
        result.set(arr, pad);
        pad += arr.length;
    }
    return result;
}
const hexes = Array.from({
    length: 256
}, (v, i19)=>i19.toString(16).padStart(2, "0")
);
function bytesToHex(uint8a) {
    let hex = "";
    for(let i20 = 0; i20 < uint8a.length; i20++){
        hex += hexes[uint8a[i20]];
    }
    return hex;
}
function hexToBytes(hex) {
    if (typeof hex !== "string") {
        throw new TypeError("hexToBytes: expected string, got " + typeof hex);
    }
    if (hex.length % 2) {
        throw new Error("hexToBytes: received invalid unpadded hex");
    }
    const array = new Uint8Array(hex.length / 2);
    for(let i21 = 0; i21 < array.length; i21++){
        const j4 = i21 * 2;
        const hexByte = hex.slice(j4, j4 + 2);
        const __byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(__byte)) throw new Error("Invalid byte sequence");
        array[i21] = __byte;
    }
    return array;
}
function numberToBytesBEPadded(num, length) {
    const hex = num.toString(16).padStart(length * 2, "0");
    return hexToBytes(hex);
}
function numberToBytesLEPadded(num, length) {
    return numberToBytesBEPadded(num, length).reverse();
}
function edIsNegative(num) {
    return (mod2(num) & _1n) === _1n;
}
function bytesToNumberLE(uint8a) {
    let value = _0n;
    const _8n = BigInt(8);
    for(let i22 = 0; i22 < uint8a.length; i22++){
        value += BigInt(uint8a[i22]) << _8n * BigInt(i22);
    }
    return value;
}
function bytes255ToNumberLE(bytes) {
    return mod2(bytesToNumberLE(bytes) & _2n ** _255n - _1n);
}
function mod2(a24, b10 = CURVE.P) {
    const res = a24 % b10;
    return res >= _0n ? res : b10 + res;
}
function invert(number, modulo = CURVE.P) {
    if (number === _0n || modulo <= _0n) {
        throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
    }
    let a25 = mod2(number, modulo);
    let b11 = modulo;
    let x14 = _0n, y11 = _1n, u = _1n, v7 = _0n;
    while(a25 !== _0n){
        const q = b11 / a25;
        const r = b11 % a25;
        const m4 = x14 - u * q;
        const n15 = y11 - v7 * q;
        b11 = a25, a25 = r, x14 = u, y11 = v7, u = m4, v7 = n15;
    }
    const gcd = b11;
    if (gcd !== _1n) throw new Error("invert: does not exist");
    return mod2(x14, modulo);
}
function invertBatch(nums, modulo = CURVE.P) {
    const len = nums.length;
    const scratch = new Array(len);
    let acc = _1n;
    for(let i23 = 0; i23 < len; i23++){
        if (nums[i23] === _0n) continue;
        scratch[i23] = acc;
        acc = mod2(acc * nums[i23], modulo);
    }
    acc = invert(acc, modulo);
    for(let i1 = len - 1; i1 >= 0; i1--){
        if (nums[i1] === _0n) continue;
        let tmp = mod2(acc * nums[i1], modulo);
        nums[i1] = mod2(acc * scratch[i1], modulo);
        acc = tmp;
    }
    return nums;
}
function pow2(x15, power) {
    const { P  } = CURVE;
    let res = x15;
    while((power--) > _0n){
        res *= res;
        res %= P;
    }
    return res;
}
function pow_2_252_3(x16) {
    const { P  } = CURVE;
    const _5n = BigInt(5);
    const _10n = BigInt(10);
    const _20n = BigInt(20);
    const _40n = BigInt(40);
    const _80n = BigInt(80);
    const x2 = x16 * x16 % P;
    const b2 = x2 * x16 % P;
    const b4 = pow2(b2, _2n) * b2 % P;
    const b5 = pow2(b4, _1n) * x16 % P;
    const b10 = pow2(b5, _5n) * b5 % P;
    const b20 = pow2(b10, _10n) * b10 % P;
    const b40 = pow2(b20, _20n) * b20 % P;
    const b80 = pow2(b40, _40n) * b40 % P;
    const b160 = pow2(b80, _80n) * b80 % P;
    const b240 = pow2(b160, _80n) * b80 % P;
    const b250 = pow2(b240, _10n) * b10 % P;
    const pow_p_5_8 = pow2(b250, _2n) * x16 % P;
    return pow_p_5_8;
}
function uvRatio(u, v8) {
    const v3 = mod2(v8 * v8 * v8);
    const v7 = mod2(v3 * v3 * v8);
    let x17 = mod2(u * v3 * pow_2_252_3(u * v7));
    const vx2 = mod2(v8 * x17 * x17);
    const root1 = x17;
    const root2 = mod2(x17 * SQRT_M1);
    const useRoot1 = vx2 === u;
    const useRoot2 = vx2 === mod2(-u);
    const noRoot = vx2 === mod2(-u * SQRT_M1);
    if (useRoot1) x17 = root1;
    if (useRoot2 || noRoot) x17 = root2;
    if (edIsNegative(x17)) x17 = mod2(-x17);
    return {
        isValid: useRoot1 || useRoot2,
        value: x17
    };
}
function invertSqrt(number) {
    return uvRatio(_1n, number);
}
async function sha512ModnLE(...args) {
    const messageArray = concatBytes(...args);
    const hash = await utils.sha512(messageArray);
    const value = bytesToNumberLE(hash);
    return mod2(value, CURVE.n);
}
function equalBytes(b1, b2) {
    if (b1.length !== b2.length) {
        return false;
    }
    for(let i24 = 0; i24 < b1.length; i24++){
        if (b1[i24] !== b2[i24]) {
            return false;
        }
    }
    return true;
}
function ensureBytes(hash) {
    return hash instanceof Uint8Array ? hash : hexToBytes(hash);
}
function assertLen(len, bytes) {
    if (bytes.length !== len) throw new Error(`Expected ${len} bytes`);
}
function normalizeScalar(num, max = CURVE.n) {
    if (typeof num === "number" && num > 0 && Number.isSafeInteger(num)) {
        return BigInt(num);
    }
    if (typeof num === "bigint" && _0n < num && num < max) return num;
    throw new TypeError("Expected valid scalar: 0 < scalar < max");
}
function normalizePrivateKey(key) {
    const bytes = typeof key === "bigint" || typeof key === "number" ? numberToBytesBEPadded(normalizeScalar(key, _2n ** BigInt(256)), 32) : ensureBytes(key);
    assertLen(32, bytes);
    return bytes;
}
async function calcKeys(key) {
    const hashed = await utils.sha512(normalizePrivateKey(key));
    const head = hashed.slice(0, 32);
    head[0] &= 248;
    head[31] &= 127;
    head[31] |= 64;
    const prefix = hashed.slice(32);
    const p = mod2(bytesToNumberLE(head), CURVE.n);
    const P = Point.BASE.multiply(p);
    const pubBytes = P.toRawBytes();
    return {
        prefix,
        p,
        P,
        pubBytes
    };
}
async function getPublicKey(privateKey) {
    return (await calcKeys(privateKey)).pubBytes;
}
async function sign(msgHash, privateKey) {
    const msg = ensureBytes(msgHash);
    const { prefix , p , pubBytes  } = await calcKeys(privateKey);
    const r = await sha512ModnLE(prefix, msg);
    const R2 = Point.BASE.multiply(r);
    const k5 = await sha512ModnLE(R2.toRawBytes(), pubBytes, msg);
    const S4 = mod2(r + k5 * p, CURVE.n);
    return new Signature(R2, S4).toRawBytes();
}
async function verify(sig, msgHash, publicKey) {
    msgHash = ensureBytes(msgHash);
    if (!(publicKey instanceof Point)) publicKey = Point.fromHex(publicKey);
    if (!(sig instanceof Signature)) sig = Signature.fromHex(sig);
    const SB = ExtendedPoint.BASE.multiply(sig.s);
    const k6 = await sha512ModnLE(sig.r.toRawBytes(), publicKey.toRawBytes(), msgHash);
    const kA = ExtendedPoint.fromAffine(publicKey).multiplyUnsafe(k6);
    const RkA = ExtendedPoint.fromAffine(sig.r).add(kA);
    return RkA.subtract(SB).multiplyUnsafe(CURVE.h).equals(ExtendedPoint.ZERO);
}
Point.BASE._setWindowSize(8);
const utils = {
    TORSION_SUBGROUP: [
        "0100000000000000000000000000000000000000000000000000000000000000",
        "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
        "0000000000000000000000000000000000000000000000000000000000000080",
        "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
        "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
        "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
        "0000000000000000000000000000000000000000000000000000000000000000",
        "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa", 
    ],
    bytesToHex,
    randomBytes: (bytesLength = 32)=>{
        return crypto.getRandomValues(new Uint8Array(bytesLength));
    },
    randomPrivateKey: ()=>{
        return utils.randomBytes(32);
    },
    sha512: async (message)=>{
        const buffer = await crypto.subtle.digest("SHA-512", message.buffer);
        return new Uint8Array(buffer);
    },
    precompute (windowSize = 8, point = Point.BASE) {
        const cached = point.equals(Point.BASE) ? point : new Point(point.x, point.y);
        cached._setWindowSize(windowSize);
        cached.multiply(_1n);
        return cached;
    }
};
const mod3 = {
    CURVE: CURVE,
    ExtendedPoint: ExtendedPoint,
    getPublicKey: getPublicKey,
    Point: Point,
    sign: sign,
    utils: utils,
    verify: verify
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var lodash_isequal = createCommonjsModule(function(module, exports) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
        try {
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {}
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while(++index < length){
            var value = array[index];
            if (predicate(value, index, array)) {
                result[resIndex++] = value;
            }
        }
        return result;
    }
    function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while(++index < length){
            array[offset + index] = values[index];
        }
        return array;
    }
    function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while(++index < length){
            if (predicate(array[index], index, array)) {
                return true;
            }
        }
        return false;
    }
    function baseTimes(n16, iteratee) {
        var index = -1, result = Array(n16);
        while(++index < n16){
            result[index] = iteratee(index);
        }
        return result;
    }
    function baseUnary(func) {
        return function(value) {
            return func(value);
        };
    }
    function cacheHas(cache, key) {
        return cache.has(key);
    }
    function getValue(object, key) {
        return object == null ? void 0 : object[key];
    }
    function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
            result[++index] = [
                key,
                value
            ];
        });
        return result;
    }
    function overArg(func, transform) {
        return function(arg) {
            return func(transform(arg));
        };
    }
    function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
            result[++index] = value;
        });
        return result;
    }
    var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
    }();
    var nativeObjectToString = objectProto.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer = moduleExports ? root.Buffer : void 0, Symbol = root.Symbol, Uint8Array = root.Uint8Array, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
    var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
    var symbolProto = Symbol ? Symbol.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while(++index < length){
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
    }
    function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
    }
    function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
            var result = data[key];
            return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while(++index < length){
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
    }
    function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
            return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
            data.pop();
        } else {
            splice.call(data, index, 1);
        }
        --this.size;
        return true;
    }
    function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
            ++this.size;
            data.push([
                key,
                value
            ]);
        } else {
            data[index][1] = value;
        }
        return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while(++index < length){
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
            hash: new Hash(),
            map: new (Map || ListCache)(),
            string: new Hash()
        };
    }
    function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
    }
    function mapCacheGet(key) {
        return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
        return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
        var data = getMapData(this, key), size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
        var index = -1, length = values == null ? 0 : values.length;
        this.__data__ = new MapCache();
        while(++index < length){
            this.add(values[index]);
        }
    }
    function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
    }
    function setCacheHas(value) {
        return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
    }
    function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
    }
    function stackDelete(key) {
        var data = this.__data__, result = data["delete"](key);
        this.size = data.size;
        return result;
    }
    function stackGet(key) {
        return this.__data__.get(key);
    }
    function stackHas(key) {
        return this.__data__.has(key);
    }
    function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([
                    key,
                    value
                ]);
                this.size = ++data.size;
                return this;
            }
            data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer1(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for(var key in value){
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
                result.push(key);
            }
        }
        return result;
    }
    function assocIndexOf(array, key) {
        var length = array.length;
        while(length--){
            if (eq(array[length][0], key)) {
                return length;
            }
        }
        return -1;
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
        if (value == null) {
            return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
            return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer1(object)) {
            if (!isBuffer1(other)) {
                return false;
            }
            objIsArr = true;
            objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
        }
        if (!isSameTag) {
            return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
            return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseKeys(object) {
        if (!isPrototype(object)) {
            return nativeKeys(object);
        }
        var result = [];
        for(var key in Object(object)){
            if (hasOwnProperty.call(object, key) && key != "constructor") {
                result.push(key);
            }
        }
        return result;
    }
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
        }
        var stacked = stack.get(array);
        if (stacked && stack.get(other)) {
            return stacked == other;
        }
        var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
        stack.set(array, other);
        stack.set(other, array);
        while(++index < arrLength){
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== void 0) {
                if (compared) {
                    continue;
                }
                result = false;
                break;
            }
            if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                    if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                        return seen.push(othIndex);
                    }
                })) {
                    result = false;
                    break;
                }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result = false;
                break;
            }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result;
    }
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch(tag){
            case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                    return false;
                }
                object = object.buffer;
                other = other.buffer;
            case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
                    return false;
                }
                return true;
            case boolTag:
            case dateTag:
            case numberTag:
                return eq(+object, +other);
            case errorTag:
                return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
                return object == other + "";
            case mapTag:
                var convert = mapToArray;
            case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                    return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                    return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return result;
            case symbolTag:
                if (symbolValueOf) {
                    return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
        }
        return false;
    }
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
            return false;
        }
        var index = objLength;
        while(index--){
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
            }
        }
        var stacked = stack.get(object);
        if (stacked && stack.get(other)) {
            return stacked == other;
        }
        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while(++index < objLength){
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result = false;
                break;
            }
            skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result = false;
            }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result;
    }
    function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
    }
    function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
    }
    function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
            value[symToStringTag] = void 0;
            var unmasked = true;
        } catch (e) {}
        var result = nativeObjectToString.call(value);
        if (unmasked) {
            if (isOwn) {
                value[symToStringTag] = tag;
            } else {
                delete value[symToStringTag];
            }
        }
        return result;
    }
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
            return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
        });
    };
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
        getTag = function(value) {
            var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
                switch(ctorString){
                    case dataViewCtorString:
                        return dataViewTag;
                    case mapCtorString:
                        return mapTag;
                    case promiseCtorString:
                        return promiseTag;
                    case setCtorString:
                        return setTag;
                    case weakMapCtorString:
                        return weakMapTag;
                }
            }
            return result;
        };
    }
    function isIndex(value, length) {
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    }
    function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
    }
    function objectToString(value) {
        return nativeObjectToString.call(value);
    }
    function toSource(func) {
        if (func != null) {
            try {
                return funcToString.call(func);
            } catch (e) {}
            try {
                return func + "";
            } catch (e1) {}
        }
        return "";
    }
    function eq(value, other) {
        return value === other || value !== value && other !== other;
    }
    var isArguments = baseIsArguments(function() {
        return arguments;
    }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    var isArray = Array.isArray;
    function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
    }
    var isBuffer1 = nativeIsBuffer || stubFalse;
    function isEqual(value, other) {
        return baseIsEqual(value, other);
    }
    function isFunction(value) {
        if (!isObject(value)) {
            return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
        return value != null && typeof value == "object";
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
        return [];
    }
    function stubFalse() {
        return false;
    }
    module.exports = isEqual;
});
function createCommonjsModule1(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire1(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function commonjsRequire1() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var listNode = createCommonjsModule1(function(module) {
    (function() {
        function Node(data) {
            this.data = data;
            this.next = null;
            this.prev = null;
        }
        Node.prototype = {
            hasNext: function() {
                return this.next !== null;
            },
            hasPrev: function() {
                return this.prev !== null;
            },
            getData: function() {
                return this.data;
            },
            toString: function() {
                if (typeof this.data === "object") {
                    return JSON.stringify(this.data);
                } else {
                    return String(this.data);
                }
            }
        };
        module.exports = Node;
    })();
});
var iterator = createCommonjsModule1(function(module) {
    (function() {
        function Iterator(theList) {
            this.list = theList || null;
            this.stopIterationFlag = false;
            this.currentNode = null;
        }
        Iterator.prototype = {
            next: function() {
                var current = this.currentNode;
                if (this.currentNode !== null) {
                    this.currentNode = this.currentNode.next;
                }
                return current;
            },
            hasNext: function() {
                return this.currentNode !== null;
            },
            reset: function() {
                this.currentNode = this.list.getHeadNode();
            },
            first: function() {
                this.reset();
                return this.next();
            },
            setList: function(theList) {
                this.list = theList;
                this.reset();
            },
            each: function(callback) {
                this.reset();
                var el;
                while(this.hasNext() && !this.stopIterationFlag){
                    el = this.next();
                    callback(el);
                }
                this.stopIterationFlag = false;
            },
            last: function() {
                this.reset_reverse();
                return this.next_reverse();
            },
            reset_reverse: function() {
                this.currentNode = this.list.getTailNode();
            },
            next_reverse: function() {
                var current = this.currentNode;
                if (this.currentNode !== null) {
                    this.currentNode = this.currentNode.prev;
                }
                return current;
            },
            each_reverse: function(callback) {
                this.reset_reverse();
                var el;
                while(this.hasNext() && !this.stopIterationFlag){
                    el = this.next_reverse();
                    callback(el);
                }
                this.stopIterationFlag = false;
            },
            interrupt: function() {
                this.stopIterationFlag = true;
            }
        };
        module.exports = Iterator;
    })();
});
var dblyLinkedList = createCommonjsModule1(function(module) {
    (function() {
        var isEqual = lodash_isequal;
        var Node = listNode;
        var Iterator = iterator;
        function DoublyLinkedList() {
            this.head = null;
            this.tail = null;
            this.size = 0;
            this.iterator = new Iterator(this);
        }
        DoublyLinkedList.prototype = {
            createNewNode: function(data) {
                return new Node(data);
            },
            getHeadNode: function() {
                return this.head;
            },
            getTailNode: function() {
                return this.tail;
            },
            isEmpty: function() {
                return this.size === 0;
            },
            getSize: function() {
                return this.size;
            },
            clear: function() {
                while(!this.isEmpty()){
                    this.remove();
                }
            },
            insert: function(data) {
                var newNode = this.createNewNode(data);
                if (this.isEmpty()) {
                    this.head = this.tail = newNode;
                } else {
                    this.tail.next = newNode;
                    newNode.prev = this.tail;
                    this.tail = newNode;
                }
                this.size += 1;
                return true;
            },
            insertFirst: function(data) {
                if (this.isEmpty()) {
                    this.insert(data);
                } else {
                    var newNode = this.createNewNode(data);
                    newNode.next = this.head;
                    this.head.prev = newNode;
                    this.head = newNode;
                    this.size += 1;
                }
                return true;
            },
            insertAt: function(index, data) {
                var current = this.getHeadNode(), newNode = this.createNewNode(data), position = 0;
                if (index < 0 || index > this.getSize() - 1) {
                    return false;
                }
                if (index === 0) {
                    this.insertFirst(data);
                    return true;
                }
                while(position < index){
                    current = current.next;
                    position += 1;
                }
                current.prev.next = newNode;
                newNode.prev = current.prev;
                current.prev = newNode;
                newNode.next = current;
                this.size += 1;
                return true;
            },
            insertBefore: function(nodeData, dataToInsert) {
                var index = this.indexOf(nodeData);
                return this.insertAt(index, dataToInsert);
            },
            insertAfter: function(nodeData, dataToInsert) {
                var index = this.indexOf(nodeData);
                var size = this.getSize();
                if (index + 1 === size) {
                    return this.insert(dataToInsert);
                } else {
                    return this.insertAt(index + 1, dataToInsert);
                }
            },
            concat: function(otherLinkedList) {
                if (otherLinkedList instanceof DoublyLinkedList) {
                    var newList = new DoublyLinkedList();
                    if (this.getSize() > 0) {
                        newList.head = this.getHeadNode();
                        newList.tail = this.getTailNode();
                        newList.tail.next = otherLinkedList.getHeadNode();
                        if (otherLinkedList.getSize() > 0) {
                            newList.tail = otherLinkedList.getTailNode();
                        }
                        newList.size = this.getSize() + otherLinkedList.getSize();
                    } else {
                        newList.head = otherLinkedList.getHeadNode();
                        newList.tail = otherLinkedList.getTailNode();
                        newList.size = otherLinkedList.getSize();
                    }
                    return newList;
                } else {
                    throw new Error("Can only concat another instance of DoublyLinkedList");
                }
            },
            remove: function() {
                if (this.isEmpty()) {
                    return null;
                }
                var nodeToRemove = this.getTailNode();
                if (this.getSize() === 1) {
                    this.head = null;
                    this.tail = null;
                } else {
                    this.tail = this.getTailNode().prev;
                    this.tail.next = null;
                }
                this.size -= 1;
                return nodeToRemove;
            },
            removeFirst: function() {
                if (this.isEmpty()) {
                    return null;
                }
                var nodeToRemove;
                if (this.getSize() === 1) {
                    nodeToRemove = this.remove();
                } else {
                    nodeToRemove = this.getHeadNode();
                    this.head = this.head.next;
                    this.head.prev = null;
                    this.size -= 1;
                }
                return nodeToRemove;
            },
            removeAt: function(index) {
                var nodeToRemove = this.findAt(index);
                if (index < 0 || index > this.getSize() - 1) {
                    return null;
                }
                if (index === 0) {
                    return this.removeFirst();
                }
                if (index === this.getSize() - 1) {
                    return this.remove();
                }
                nodeToRemove.prev.next = nodeToRemove.next;
                nodeToRemove.next.prev = nodeToRemove.prev;
                nodeToRemove.next = nodeToRemove.prev = null;
                this.size -= 1;
                return nodeToRemove;
            },
            removeNode: function(nodeData) {
                var index = this.indexOf(nodeData);
                return this.removeAt(index);
            },
            indexOf: function(nodeData) {
                this.iterator.reset();
                var current;
                var index = 0;
                while(this.iterator.hasNext()){
                    current = this.iterator.next();
                    if (isEqual(current.getData(), nodeData)) {
                        return index;
                    }
                    index += 1;
                }
                return -1;
            },
            find: function(nodeData) {
                this.iterator.reset();
                var current;
                while(this.iterator.hasNext()){
                    current = this.iterator.next();
                    if (isEqual(current.getData(), nodeData)) {
                        return current;
                    }
                }
                return -1;
            },
            findAt: function(index) {
                if (this.isEmpty() || index > this.getSize() - 1) {
                    return -1;
                }
                var node = this.getHeadNode();
                var position = 0;
                while(position < index){
                    node = node.next;
                    position += 1;
                }
                return node;
            },
            contains: function(nodeData) {
                if (this.indexOf(nodeData) > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            forEach: function(fn, reverse) {
                reverse = reverse || false;
                if (reverse) {
                    this.iterator.reset_reverse();
                    this.iterator.each_reverse(fn);
                } else {
                    this.iterator.reset();
                    this.iterator.each(fn);
                }
            },
            toArray: function() {
                var listArray = [];
                this.forEach(function(node) {
                    listArray.push(node.getData());
                });
                return listArray;
            },
            interruptEnumeration: function() {
                this.iterator.interrupt();
            }
        };
        module.exports = DoublyLinkedList;
    })();
});
var commonjsGlobal1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule2(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire2(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function commonjsRequire2() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var heap = createCommonjsModule2(function(module, exports) {
    (function() {
        var Heap, defaultCmp, floor, heapify2, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest2, nsmallest2, updateItem2, _siftdown, _siftup;
        floor = Math.floor, min = Math.min;
        defaultCmp = function(x18, y12) {
            if (x18 < y12) {
                return -1;
            }
            if (x18 > y12) {
                return 1;
            }
            return 0;
        };
        insort = function(a26, x19, lo, hi, cmp) {
            var mid;
            if (lo == null) {
                lo = 0;
            }
            if (cmp == null) {
                cmp = defaultCmp;
            }
            if (lo < 0) {
                throw new Error("lo must be non-negative");
            }
            if (hi == null) {
                hi = a26.length;
            }
            while(lo < hi){
                mid = floor((lo + hi) / 2);
                if (cmp(x19, a26[mid]) < 0) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            return [].splice.apply(a26, [
                lo,
                lo - lo
            ].concat(x19)), x19;
        };
        heappush = function(array, item, cmp) {
            if (cmp == null) {
                cmp = defaultCmp;
            }
            array.push(item);
            return _siftdown(array, 0, array.length - 1, cmp);
        };
        heappop = function(array, cmp) {
            var lastelt, returnitem;
            if (cmp == null) {
                cmp = defaultCmp;
            }
            lastelt = array.pop();
            if (array.length) {
                returnitem = array[0];
                array[0] = lastelt;
                _siftup(array, 0, cmp);
            } else {
                returnitem = lastelt;
            }
            return returnitem;
        };
        heapreplace = function(array, item, cmp) {
            var returnitem;
            if (cmp == null) {
                cmp = defaultCmp;
            }
            returnitem = array[0];
            array[0] = item;
            _siftup(array, 0, cmp);
            return returnitem;
        };
        heappushpop = function(array, item, cmp) {
            var _ref;
            if (cmp == null) {
                cmp = defaultCmp;
            }
            if (array.length && cmp(array[0], item) < 0) {
                _ref = [
                    array[0],
                    item
                ], item = _ref[0], array[0] = _ref[1];
                _siftup(array, 0, cmp);
            }
            return item;
        };
        heapify2 = function(array, cmp) {
            var i25, _i, _len, _ref1, _results, _results1;
            if (cmp == null) {
                cmp = defaultCmp;
            }
            _ref1 = (function() {
                _results1 = [];
                for(var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){
                    _results1.push(_j);
                }
                return _results1;
            }).apply(this).reverse();
            _results = [];
            for(_i = 0, _len = _ref1.length; _i < _len; _i++){
                i25 = _ref1[_i];
                _results.push(_siftup(array, i25, cmp));
            }
            return _results;
        };
        updateItem2 = function(array, item, cmp) {
            var pos;
            if (cmp == null) {
                cmp = defaultCmp;
            }
            pos = array.indexOf(item);
            if (pos === -1) {
                return;
            }
            _siftdown(array, 0, pos, cmp);
            return _siftup(array, pos, cmp);
        };
        nlargest2 = function(array, n17, cmp) {
            var elem, result, _i, _len, _ref;
            if (cmp == null) {
                cmp = defaultCmp;
            }
            result = array.slice(0, n17);
            if (!result.length) {
                return result;
            }
            heapify2(result, cmp);
            _ref = array.slice(n17);
            for(_i = 0, _len = _ref.length; _i < _len; _i++){
                elem = _ref[_i];
                heappushpop(result, elem, cmp);
            }
            return result.sort(cmp).reverse();
        };
        nsmallest2 = function(array, n18, cmp) {
            var elem, los, result, _i, _j, _len, _ref, _ref1, _results;
            if (cmp == null) {
                cmp = defaultCmp;
            }
            if (n18 * 10 <= array.length) {
                result = array.slice(0, n18).sort(cmp);
                if (!result.length) {
                    return result;
                }
                los = result[result.length - 1];
                _ref = array.slice(n18);
                for(_i = 0, _len = _ref.length; _i < _len; _i++){
                    elem = _ref[_i];
                    if (cmp(elem, los) < 0) {
                        insort(result, elem, 0, null, cmp);
                        result.pop();
                        los = result[result.length - 1];
                    }
                }
                return result;
            }
            heapify2(array, cmp);
            _results = [];
            for(_j = 0, _ref1 = min(n18, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; 0 <= _ref1 ? ++_j : --_j){
                _results.push(heappop(array, cmp));
            }
            return _results;
        };
        _siftdown = function(array, startpos, pos, cmp) {
            var newitem, parent, parentpos;
            if (cmp == null) {
                cmp = defaultCmp;
            }
            newitem = array[pos];
            while(pos > startpos){
                parentpos = pos - 1 >> 1;
                parent = array[parentpos];
                if (cmp(newitem, parent) < 0) {
                    array[pos] = parent;
                    pos = parentpos;
                    continue;
                }
                break;
            }
            return array[pos] = newitem;
        };
        _siftup = function(array, pos, cmp) {
            var childpos, endpos, newitem, rightpos, startpos;
            if (cmp == null) {
                cmp = defaultCmp;
            }
            endpos = array.length;
            startpos = pos;
            newitem = array[pos];
            childpos = 2 * pos + 1;
            while(childpos < endpos){
                rightpos = childpos + 1;
                if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
                    childpos = rightpos;
                }
                array[pos] = array[childpos];
                pos = childpos;
                childpos = 2 * pos + 1;
            }
            array[pos] = newitem;
            return _siftdown(array, startpos, pos, cmp);
        };
        Heap = (function() {
            Heap2.push = heappush;
            Heap2.pop = heappop;
            Heap2.replace = heapreplace;
            Heap2.pushpop = heappushpop;
            Heap2.heapify = heapify2;
            Heap2.updateItem = updateItem2;
            Heap2.nlargest = nlargest2;
            Heap2.nsmallest = nsmallest2;
            function Heap2(cmp) {
                this.cmp = cmp != null ? cmp : defaultCmp;
                this.nodes = [];
            }
            Heap2.prototype.push = function(x20) {
                return heappush(this.nodes, x20, this.cmp);
            };
            Heap2.prototype.pop = function() {
                return heappop(this.nodes, this.cmp);
            };
            Heap2.prototype.peek = function() {
                return this.nodes[0];
            };
            Heap2.prototype.contains = function(x21) {
                return this.nodes.indexOf(x21) !== -1;
            };
            Heap2.prototype.replace = function(x22) {
                return heapreplace(this.nodes, x22, this.cmp);
            };
            Heap2.prototype.pushpop = function(x23) {
                return heappushpop(this.nodes, x23, this.cmp);
            };
            Heap2.prototype.heapify = function() {
                return heapify2(this.nodes, this.cmp);
            };
            Heap2.prototype.updateItem = function(x24) {
                return updateItem2(this.nodes, x24, this.cmp);
            };
            Heap2.prototype.clear = function() {
                return this.nodes = [];
            };
            Heap2.prototype.empty = function() {
                return this.nodes.length === 0;
            };
            Heap2.prototype.size = function() {
                return this.nodes.length;
            };
            Heap2.prototype.clone = function() {
                var heap2;
                heap2 = new Heap2();
                heap2.nodes = this.nodes.slice(0);
                return heap2;
            };
            Heap2.prototype.toArray = function() {
                return this.nodes.slice(0);
            };
            Heap2.prototype.insert = Heap2.prototype.push;
            Heap2.prototype.top = Heap2.prototype.peek;
            Heap2.prototype.front = Heap2.prototype.peek;
            Heap2.prototype.has = Heap2.prototype.contains;
            Heap2.prototype.copy = Heap2.prototype.clone;
            return Heap2;
        })();
        (function(root, factory) {
            {
                return module.exports = factory();
            }
        })(this, function() {
            return Heap;
        });
    }).call(commonjsGlobal1);
});
var heap$1 = heap;
heap$1.heapify;
heap$1.nlargest;
heap$1.nsmallest;
heap$1.pop;
heap$1.push;
heap$1.pushpop;
heap$1.replace;
heap$1.updateItem;
var commonjsGlobal2 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x25) {
    return x25 && x25.__esModule && Object.prototype.hasOwnProperty.call(x25, "default") ? x25["default"] : x25;
}
function createCommonjsModule3(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire3(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function commonjsRequire3() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var deferred = createCommonjsModule3(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.makeDeferred = void 0;
    let makeDeferred2 = ()=>{
        let resolve = null;
        let reject = null;
        let promise = new Promise((res, rej)=>{
            resolve = res;
            reject = rej;
        });
        return {
            promise,
            resolve,
            reject
        };
    };
    exports.makeDeferred = makeDeferred2;
});
var chan = createCommonjsModule3(function(module, exports) {
    var __importDefault = commonjsGlobal2 && commonjsGlobal2.__importDefault || function(mod4) {
        return mod4 && mod4.__esModule ? mod4 : {
            default: mod4
        };
    };
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Chan = exports.ChannelIsSealedError = exports.ChannelIsClosedError = exports.ChannelTimeoutError = exports.removeLinkedListNode = void 0;
    const dbly_linked_list_1 = __importDefault(dblyLinkedList);
    let removeLinkedListNode2 = (list, node)=>{
        if (node.next && node.prev) {
            node.next.prev = node.prev;
            node.prev.next = node.next;
            list.size -= 1;
        } else if (node.next) {
            let newFirst = node.next;
            newFirst.prev = null;
            list.head = newFirst;
            list.size -= 1;
        } else if (node.prev) {
            let newLast = node.prev;
            newLast.next = null;
            list.tail = newLast;
            list.size -= 1;
        } else {
            list.clear();
        }
        node.next = null;
        node.prev = null;
    };
    exports.removeLinkedListNode = removeLinkedListNode2;
    let J5 = (x26)=>JSON.stringify(x26)
    ;
    let log2 = (msg, val)=>{};
    class ChannelTimeoutError2 extends Error {
        constructor(message){
            super(message || "");
            this.name = "ChannelTimeoutError";
        }
    }
    exports.ChannelTimeoutError = ChannelTimeoutError2;
    class ChannelIsClosedError2 extends Error {
        constructor(message){
            super(message || "");
            this.name = "ChannelIsClosedError";
        }
    }
    exports.ChannelIsClosedError = ChannelIsClosedError2;
    class ChannelIsSealedError2 extends Error {
        constructor(message){
            super(message || "");
            this.name = "ChannelIsSealedError";
        }
    }
    exports.ChannelIsSealedError = ChannelIsSealedError2;
    class Bus {
        constructor(){
            this.cbs = new Set();
        }
        subscribe(cb) {
            this.cbs.add(cb);
            return ()=>this.cbs.delete(cb)
            ;
        }
        send(msg) {
            for (let cb of this.cbs){
                cb(msg);
            }
        }
    }
    class Chan2 {
        constructor(capacity = null){
            this._isClosed = false;
            this._isSealed = false;
            this.onClose = new Bus();
            this.onSeal = new Bus();
            this._capacity = capacity;
            this._queue = new dbly_linked_list_1.default();
            this._waitingGets = new dbly_linked_list_1.default();
            this._waitingPuts = new dbly_linked_list_1.default();
        }
        close() {
            if (this._isClosed) {
                return;
            }
            this._isClosed = true;
            this._queue = new dbly_linked_list_1.default();
            this._waitingGets.forEach((node)=>{
                let waitingGet = node.getData();
                waitingGet.reject(new ChannelIsClosedError2("waiting get is cancelled because channel was closed"));
            });
            this._waitingGets = new dbly_linked_list_1.default();
            this._waitingPuts.forEach((node)=>{
                let waitingPut = node.getData();
                waitingPut.deferred.reject(new ChannelIsClosedError2("waiting get is cancelled because channel was closed"));
            });
            this._waitingPuts = new dbly_linked_list_1.default();
            this.onClose.send();
            this.onClose.cbs.clear();
            this.onSeal.cbs.clear();
        }
        get isClosed() {
            return this._isClosed;
        }
        seal() {
            if (this._isSealed) {
                return;
            }
            this._isSealed = true;
            this._waitingGets.forEach((node)=>{
                let waitingGet = node.getData();
                waitingGet.reject(new ChannelIsSealedError2("waiting get is cancelled because channel was sealed"));
            });
            this._waitingGets = new dbly_linked_list_1.default();
            this._waitingPuts.forEach((node)=>{
                let waitingPut = node.getData();
                waitingPut.deferred.reject(new ChannelIsSealedError2("waiting put is cancelled because channel was sealed"));
            });
            this._waitingPuts = new dbly_linked_list_1.default();
            this.onSeal.send();
            if (this._queue.isEmpty()) {
                this.close();
            }
        }
        get isSealed() {
            return this._isSealed;
        }
        get capacity() {
            return this._capacity;
        }
        get itemsInQueue() {
            return this._queue.getSize();
        }
        get itemsInQueueAndWaitingPuts() {
            return this._queue.getSize() + this._waitingPuts.getSize();
        }
        get numWaitingGets() {
            return this._waitingGets.getSize();
        }
        get isIdle() {
            return this._queue.getSize() + this._waitingGets.getSize() + this._waitingPuts.getSize() === 0;
        }
        get canImmediatelyPut() {
            if (this._isClosed || this.isSealed) {
                return false;
            }
            if (this._queue.isEmpty() && !this._waitingGets.isEmpty()) {
                return true;
            }
            let queueHasSpace = this._capacity === null || this._queue.getSize() < this._capacity;
            if (queueHasSpace) {
                return true;
            }
            return false;
        }
        get canImmediatelyGet() {
            if (this._isClosed) {
                return false;
            }
            if (!this._queue.isEmpty()) {
                return true;
            }
            if (!this._waitingPuts.isEmpty()) {
                return true;
            }
            return false;
        }
        async put(item, opts) {
            var _a;
            log2(`put(${J5(item)}, ${J5(opts)})...`);
            if (this._isSealed) {
                throw new ChannelIsSealedError2("cannot put() to a sealed channel");
            }
            if (this._isClosed) {
                throw new ChannelIsClosedError2("cannot put() to a closed channel");
            }
            let queueHasSpace = this._capacity === null || this._queue.getSize() < this._capacity;
            if (this._queue.isEmpty() && !this._waitingGets.isEmpty()) {
                let getDeferred = (_a = this._waitingGets.getHeadNode()) === null || _a === void 0 ? void 0 : _a.getData();
                this._waitingGets.removeFirst();
                getDeferred.resolve(item);
                return;
            }
            if (queueHasSpace) {
                this._queue.insert(item);
                return;
            }
            let opts2 = opts !== null && opts !== void 0 ? opts : {
                timeout: null
            };
            let timeout = opts2.timeout;
            if (timeout === 0) {
                throw new ChannelTimeoutError2("queue is full and timeout is zero");
            }
            let putDeferred = (0, deferred.makeDeferred)();
            let waitingPut = {
                item,
                deferred: putDeferred
            };
            this._waitingPuts.insert(waitingPut);
            let waitingPutNode = this._waitingPuts.getTailNode();
            if (timeout !== null && timeout > 0) {
                let timer = setTimeout(()=>{
                    (0, exports.removeLinkedListNode)(this._waitingPuts, waitingPutNode);
                    putDeferred.reject(new ChannelTimeoutError2("timeout occurred"));
                }, timeout);
                putDeferred.promise.then(()=>{
                    clearTimeout(timer);
                }).catch(()=>{});
            }
            return putDeferred.promise;
        }
        async get(opts) {
            var _a, _b, _c;
            log2(`get(${J5(opts)})...`);
            if (this._isClosed) {
                if (this._isSealed) {
                    throw new ChannelIsSealedError2("cannot get() from a sealed channel");
                } else {
                    throw new ChannelIsClosedError2("cannot get() from a closed channel");
                }
            }
            if (!this._queue.isEmpty()) {
                let item = (_a = this._queue.getHeadNode()) === null || _a === void 0 ? void 0 : _a.getData();
                this._queue.removeFirst();
                if (this._isSealed && this._queue.isEmpty()) {
                    this.close();
                }
                if (!this._waitingPuts.isEmpty() && this._capacity !== null && this._queue.getSize() < this._capacity) {
                    let waitingPut = (_b = this._waitingPuts.getHeadNode()) === null || _b === void 0 ? void 0 : _b.getData();
                    this._waitingPuts.removeFirst();
                    let { item: item2 , deferred: deferred2  } = waitingPut;
                    this._queue.insert(item2);
                    deferred2.resolve(void 0);
                }
                return item;
            }
            if (!this._waitingPuts.isEmpty()) {
                let waitingPut = (_c = this._waitingPuts.getHeadNode()) === null || _c === void 0 ? void 0 : _c.getData();
                this._waitingPuts.removeFirst();
                let { item , deferred: deferred2  } = waitingPut;
                deferred2.resolve(void 0);
                return item;
            }
            let opts2 = opts !== null && opts !== void 0 ? opts : {
                timeout: null
            };
            let timeout = opts2.timeout;
            if (timeout === 0) {
                throw new ChannelTimeoutError2("nothing to get and timeout is zero");
            }
            let getDeferred = (0, deferred.makeDeferred)();
            this._waitingGets.insert(getDeferred);
            let waitingGetNode = this._waitingGets.getTailNode();
            if (timeout !== null && timeout > 0) {
                let timer = setTimeout(()=>{
                    (0, exports.removeLinkedListNode)(this._waitingGets, waitingGetNode);
                    getDeferred.reject(new ChannelTimeoutError2("timeout occurred"));
                }, timeout);
                getDeferred.promise.then(()=>{
                    clearTimeout(timer);
                }).catch(()=>{});
            }
            return getDeferred.promise;
        }
        async forEach(cb, opts) {
            while(true){
                let item;
                try {
                    item = await this.get(opts);
                } catch (err) {
                    if (err instanceof ChannelIsClosedError2) {
                        return;
                    }
                    if (err instanceof ChannelIsSealedError2) {
                        return;
                    }
                    if (err instanceof ChannelTimeoutError2) {
                        return;
                    }
                    throw err;
                }
                let keepRunning = await cb(item);
                if (keepRunning === false) {
                    return;
                }
            }
        }
        async toArray(opts) {
            let arr = [];
            try {
                await this.forEach((item)=>arr.push(item)
                , opts);
            } catch (err) {
                if (err instanceof ChannelTimeoutError2 || err instanceof ChannelIsClosedError2 || err instanceof ChannelIsSealedError2) {
                    return arr;
                } else {
                    throw err;
                }
            }
            return arr;
        }
    }
    exports.Chan = Chan2;
});
var conveyor = createCommonjsModule3(function(module, exports) {
    var __importDefault = commonjsGlobal2 && commonjsGlobal2.__importDefault || function(mod5) {
        return mod5 && mod5.__esModule ? mod5 : {
            default: mod5
        };
    };
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Conveyor = void 0;
    const heap_1 = __importDefault(heap$1);
    class Conveyor2 {
        constructor(handler){
            this._threadIsRunning = false;
            this._ii = 1000;
            this._handlerFn = handler;
            this._queue = new heap_1.default((a27, b12)=>{
                if (a27.priority < b12.priority) {
                    return -1;
                }
                if (a27.priority > b12.priority) {
                    return 1;
                }
                return 0;
            });
        }
        async push(item, priority) {
            let deferred$1 = (0, deferred.makeDeferred)();
            this._queue.push({
                item,
                deferred: deferred$1,
                priority: priority !== null && priority !== void 0 ? priority : this._ii
            });
            if (priority === void 0) {
                this._ii += 1;
            }
            queueMicrotask(this._thread.bind(this));
            return deferred$1.promise;
        }
        async _thread() {
            if (this._threadIsRunning) {
                return;
            }
            this._threadIsRunning = true;
            while(true){
                let nextItem;
                nextItem = this._queue.pop();
                if (nextItem === void 0) {
                    this._threadIsRunning = false;
                    return;
                }
                let { item , deferred: deferred2 , priority  } = nextItem;
                try {
                    let result = this._handlerFn(item);
                    if (result instanceof Promise) {
                        result = await result;
                    }
                    deferred2.resolve(result);
                } catch (err) {
                    deferred2.reject(err);
                }
            }
        }
    }
    exports.Conveyor = Conveyor2;
});
var lock = createCommonjsModule3(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Lock = void 0;
    class Lock2 {
        constructor(){
            let handlerFn = async (fnToRun)=>{
                let result = fnToRun();
                if (result instanceof Promise) {
                    result = await result;
                }
                return result;
            };
            this._conveyor = new conveyor.Conveyor(handlerFn);
        }
        async run(fnToRun, opts) {
            let priority = opts === void 0 ? void 0 : opts.priority;
            let bypass = opts === void 0 ? false : opts.bypass === true;
            if (bypass) {
                let d7 = (0, deferred.makeDeferred)();
                queueMicrotask(async ()=>{
                    try {
                        d7.resolve(await fnToRun());
                    } catch (err) {
                        d7.reject(err);
                    }
                });
                return d7.promise;
            } else {
                return await this._conveyor.push(fnToRun, priority);
            }
        }
    }
    exports.Lock = Lock2;
});
var build = createCommonjsModule3(function(module, exports) {
    var __createBinding = commonjsGlobal2 && commonjsGlobal2.__createBinding || (Object.create ? function(o5, m5, k7, k2) {
        if (k2 === void 0) k2 = k7;
        Object.defineProperty(o5, k2, {
            enumerable: true,
            get: function() {
                return m5[k7];
            }
        });
    } : function(o6, m6, k8, k2) {
        if (k2 === void 0) k2 = k8;
        o6[k2] = m6[k8];
    });
    var __exportStar = commonjsGlobal2 && commonjsGlobal2.__exportStar || function(m7, exports2) {
        for(var p in m7)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m7, p);
    };
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    __exportStar(chan, exports);
    __exportStar(conveyor, exports);
    __exportStar(deferred, exports);
    __exportStar(lock, exports);
});
getDefaultExportFromCjs(build);
build.Chan;
build.ChannelIsClosedError;
build.ChannelIsSealedError;
build.ChannelTimeoutError;
build.Conveyor;
var Lock = build.Lock;
build.makeDeferred;
build.removeLinkedListNode;
class RpcError extends Error {
    constructor(message){
        super(message || '');
        this.name = 'RpcError';
    }
}
class RpcErrorUseAfterClose extends RpcError {
    constructor(message){
        super(message || 'A connection or transport was used after being closed.');
        this.name = 'RpcErrorUseAfterClose';
    }
}
class RpcErrorUnknownMethod extends RpcError {
    constructor(message){
        super(message || 'No method was found with the given name.');
        this.name = 'RpcErrorUnknownMethod';
    }
}
class RpcErrorTimeout extends RpcError {
    constructor(message){
        super(message || 'A timeout occurred.');
        this.name = 'RpcErrorTimeout';
    }
}
class RpcErrorNetworkProblem extends RpcError {
    constructor(message){
        super(message || 'A network problem occurred.');
        this.name = 'RpcErrorNetworkProblem';
    }
}
class RpcErrorFromMethod extends RpcError {
    constructor(message){
        super(message || 'The method threw an error.');
        this.name = 'RpcErrorFromMethod';
    }
}
function fetchWithTimeout(timeout, ...args) {
    const controller = new AbortController();
    const [input, init] = args;
    const timeoutId = setTimeout(()=>{
        if (!controller.signal.aborted) {
            controller.abort();
        }
    }, timeout);
    const request = fetch(input, {
        ...init,
        signal: controller.signal
    }).then((res)=>{
        clearTimeout(timeoutId);
        return res;
    });
    const cancel = ()=>{
        clearTimeout(timeoutId);
        if (!controller.signal.aborted) {
            controller.abort();
        }
    };
    const clearFetchTimeout = ()=>{
        clearTimeout(timeoutId);
    };
    return {
        request,
        cancel,
        clearFetchTimeout
    };
}
const withTimeout = async (ms, prom)=>{
    let timeout = 0;
    const rejectAfterMs = new Promise((res, rej)=>{
        timeout = setTimeout(()=>rej(new RpcErrorTimeout())
        , ms);
    });
    const result = await Promise.race([
        rejectAfterMs,
        prom
    ]);
    clearTimeout(timeout);
    return result;
};
const ensureEndsWith = (s21, suffix)=>{
    if (s21.endsWith(suffix)) return s21;
    return s21 + suffix;
};
const makeDeferred = ()=>{
    const def = {};
    def.promise = new Promise((resolve, reject)=>{
        def.resolve = (arg)=>{
            try {
                resolve(arg);
            } catch (err) {
                console.error(err);
            }
        };
        def.reject = (arg)=>{
            try {
                reject(arg);
            } catch (err) {
                console.error(err);
            }
        };
    });
    return def;
};
const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms)
    )
;
const randInt = (lo, hi)=>lo + Math.floor(Math.random() * (hi - lo))
;
const makeId = ()=>('' + randInt(0, 999999999999999)).padStart(15, '0')
;
let showLogs = false;
const logConnection = (...args)=>{
    if (showLogs) {
        console.log('  ' + crayonInstance.bgMagenta.black(' connection '), ...args);
    }
};
const logTransport = (...args)=>{
    if (showLogs) {
        console.log('    ' + crayonInstance.bgCyan.black(' transport '), ...args);
    }
};
const logWatchable = (...args)=>{
    if (showLogs) {
        console.log(crayonInstance.bgRed.black(' watchable '), ...args);
    }
};
const logPullState = (...args)=>{
    if (showLogs) {
        console.log('    ' + crayonInstance.bgLightMagenta.black(' pull state '), ...args);
    }
};
class Watchable {
    value;
    _cbs = new Set();
    _cbsByTarget = new Map();
    constructor(val){
        logWatchable('constructor:', val);
        this.value = val;
    }
    get() {
        return this.value;
    }
    set(newVal) {
        const oldVal = this.value;
        logWatchable('set:', oldVal, ' --> ', newVal);
        this.value = newVal;
        if (newVal !== oldVal) {
            for (const cb1 of this._cbs){
                cb1(oldVal, this.value);
            }
            const cbsByTarget = this._cbsByTarget.get(newVal);
            if (cbsByTarget) {
                cbsByTarget.forEach((cb)=>cb(oldVal, newVal)
                );
            }
        }
    }
    onChange(cb) {
        this._cbs.add(cb);
        return ()=>this._cbs.delete(cb)
        ;
    }
    onChangeTo(target, cb) {
        const cbsByTarget = this._cbsByTarget.get(target) ?? new Set();
        cbsByTarget.add(cb);
        this._cbsByTarget.set(target, cbsByTarget);
        return ()=>{
            this._cbsByTarget.get(target)?.delete(cb);
        };
    }
    waitUntil(target, timeout) {
        if (this.value === target) {
            logWatchable('waitUntil: is already equal to', target);
            return Promise.resolve();
        }
        logWatchable('waitUntil: setting up Promise', target);
        let prom = new Promise((resolve, reject)=>{
            let unsub = this.onChangeTo(target, (oldVal, newVal)=>{
                unsub();
                resolve();
            });
        });
        if (timeout !== undefined) {
            logWatchable('waitUntil: adding timeout', target);
            prom = withTimeout(timeout, prom);
        }
        return prom;
    }
}
class WatchableSet extends Set {
    _addCbs = new Set();
    _deleteCbs = new Set();
    _changeCbs = new Set();
    constructor(iterable){
        super(iterable);
    }
    add(value) {
        const had = super.has(value);
        super.add(value);
        if (!had) {
            this._addCbs.forEach((cb)=>cb(value)
            );
            this._changeCbs.forEach((cb)=>cb()
            );
        }
        return this;
    }
    delete(value) {
        const had = super.has(value);
        super.delete(value);
        if (had) {
            this._deleteCbs.forEach((cb)=>cb(value)
            );
            this._changeCbs.forEach((cb)=>cb()
            );
        }
        return had;
    }
    clear() {
        for (const value of super.values()){
            super.delete(value);
            this._deleteCbs.forEach((cb)=>cb(value)
            );
        }
        this._changeCbs.forEach((cb)=>cb()
        );
    }
    onAdd(cb) {
        this._addCbs.add(cb);
        return ()=>this._addCbs.delete(cb)
        ;
    }
    onDelete(cb) {
        this._deleteCbs.add(cb);
        return ()=>this._deleteCbs.delete(cb)
        ;
    }
    onChange(cb) {
        this._changeCbs.add(cb);
        return ()=>this._changeCbs.delete(cb)
        ;
    }
}
class Connection {
    status = new Watchable('CONNECTING');
    _closeCbs = new Set();
    description;
    _transport;
    _deviceId;
    _otherDeviceId = null;
    _methods;
    _sendEnvelope;
    _deferredRequests = new Map();
    _lastSeen = 0;
    constructor(opts){
        logConnection(`Connection constructor: ${opts.deviceId} "${opts.description}"`);
        this._transport = opts.transport;
        this._deviceId = opts.deviceId;
        this.description = opts.description;
        this._methods = opts.methods;
        this._sendEnvelope = opts.sendEnvelope;
    }
    get isClosed() {
        return this.status.value === 'CLOSED';
    }
    onClose(cb) {
        if (this.isClosed) throw new RpcErrorUseAfterClose('the connection is closed');
        this._closeCbs.add(cb);
        return ()=>this._closeCbs.delete(cb)
        ;
    }
    close() {
        if (this.isClosed) return;
        logConnection(`${this.description} | closing...`);
        this.status.set('CLOSED');
        for (const cb of this._closeCbs)cb();
        this._closeCbs.clear();
        logConnection(`${this.description} | ...closed.`);
    }
    async handleIncomingEnvelope(env) {
        if (this.isClosed) throw new RpcErrorUseAfterClose('the connection is closed');
        logConnection(`${this.description} | incoming envelope:`, env);
        if (env.kind === 'NOTIFY') {
            if (!Object.prototype.hasOwnProperty.call(this._methods, env.method)) {
                console.warn(`> error in NOTIFY handler: no notify method called "${env.method}"`);
            } else {
                try {
                    await this._methods[env.method](...env.args);
                } catch (error) {
                    console.warn(`> error when running NOTIFY method:`, env, error);
                }
            }
        } else if (env.kind === 'REQUEST') {
            try {
                if (!Object.prototype.hasOwnProperty.call(this._methods, env.method)) {
                    throw new RpcErrorUnknownMethod(`unknown method in REQUEST: ${env.method}`);
                }
                const data = await this._methods[env.method](...env.args);
                const responseEnvData = {
                    kind: 'RESPONSE',
                    fromDeviceId: this._deviceId,
                    envelopeId: env.envelopeId,
                    data
                };
                await this._sendEnvelope(this, responseEnvData);
            } catch (error) {
                const responseEnvError = {
                    kind: 'RESPONSE',
                    fromDeviceId: this._deviceId,
                    envelopeId: env.envelopeId,
                    error: `${error}`
                };
                await this._sendEnvelope(this, responseEnvError);
            }
        } else if (env.kind === 'RESPONSE') {
            const deferred1 = this._deferredRequests.get(env.envelopeId);
            if (deferred1 === undefined) {
                return;
            }
            if ('data' in env) {
                deferred1.resolve(env.data);
            } else if ('error' in env) {
                deferred1.reject(new RpcErrorFromMethod(env.error));
            } else {
                console.warn('> RESPONSE has neither data nor error.  this should never happen');
                deferred1.reject(new RpcError('> RESPONSE had neither data nor error??'));
            }
            this._deferredRequests.delete(env.envelopeId);
        }
        logConnection(`${this.description} | ...done with incoming envelope`);
    }
    async notify(method, ...args) {
        if (this.isClosed) throw new RpcErrorUseAfterClose('the connection is closed');
        const env = {
            kind: 'NOTIFY',
            fromDeviceId: this._deviceId,
            envelopeId: 'env:' + makeId(),
            method,
            args
        };
        logConnection(`${this.description} | sending NOTIFY:`, env);
        await this._sendEnvelope(this, env);
        logConnection(`${this.description} | done sending NOTIFY.`);
    }
    async request(method, ...args) {
        if (this.isClosed) throw new RpcErrorUseAfterClose('the connection is closed');
        const env = {
            kind: 'REQUEST',
            fromDeviceId: this._deviceId,
            envelopeId: 'env:' + makeId(),
            method,
            args
        };
        const deferred2 = makeDeferred();
        this._deferredRequests.set(env.envelopeId, deferred2);
        logConnection(`${this.description} | sending REQUEST:`, env);
        await this._sendEnvelope(this, env);
        logConnection(`${this.description} | done sending REQUEST.`);
        return deferred2.promise;
    }
}
const RECONNECT_TIMEOUT = 2000;
class TransportWebsocketClient {
    status = new Watchable('OPEN');
    deviceId;
    methods;
    connections = new WatchableSet();
    constructor(opts){
        logTransport('constructor for device', opts.deviceId);
        this.deviceId = opts.deviceId;
        this.methods = opts.methods;
    }
    get isClosed() {
        return this.status.value === 'CLOSED';
    }
    onClose(cb) {
        return this.status.onChangeTo('CLOSED', cb);
    }
    close() {
        if (this.isClosed) return;
        logTransport('closing...');
        this.status.set('CLOSED');
        logTransport('...closing connections...');
        for (const conn of this.connections){
            conn.close();
        }
        logTransport('...closed');
    }
    addConnection(url) {
        logTransport('addConnection to url:', url);
        let ws;
        try {
            ws = new WebSocket(url);
        } catch (error) {
            throw new RpcErrorNetworkProblem(error);
        }
        ws.onopen = (e)=>{
            logTransport('>>> ws on open');
            conn1.status.set('OPEN');
        };
        ws.onmessage = async (e)=>{
            logTransport('>>> ws on message');
            conn1.status.set('OPEN');
            let env = JSON.parse(e.data);
            logTransport(`>>> ws on message: it\'s a ${env.kind}`);
            logTransport(`>>> ws on message: handling...`);
            await conn1.handleIncomingEnvelope(env);
            logTransport(`>>> ws on message: done`);
        };
        ws.onerror = (e)=>{
            logTransport('>>> ws on error 2');
            conn1.status.set('ERROR');
            logTransport(`could not connect.  retrying in ${RECONNECT_TIMEOUT} ms...`);
            const timeout = setTimeout(()=>{
                logTransport('reconnecting');
                this.addConnection(url);
            }, RECONNECT_TIMEOUT);
            conn1.onClose(()=>{
                clearTimeout(timeout);
            });
        };
        ws.onclose = (e)=>{
            logTransport('>>> ws on close.  closing the connection.');
            conn1.close();
        };
        const conn1 = new Connection({
            description: url,
            transport: this,
            deviceId: this.deviceId,
            methods: this.methods,
            sendEnvelope: async (conn, env)=>{
                if (conn.isClosed) throw new RpcErrorUseAfterClose('the connection is closed');
                logTransport(`connection "${conn.description}" is sending an envelope:`, env);
                logTransport('waiting for OPEN...');
                await conn.status.waitUntil('OPEN', 2000);
                if (ws.readyState === ws.OPEN) {
                    logTransport('send...');
                    ws.send(JSON.stringify(env));
                    logTransport('...done');
                }
            }
        });
        conn1.onClose(async ()=>{
            logTransport('>>> connection onClose.  closing the ws.');
            if (ws.bufferedAmount !== 0) {
                await sleep(1000);
            }
            ws.close();
            this.connections.delete(conn1);
        });
        conn1.status.onChange((oldVal, newVal)=>{
            logTransport(`connection status changed from ${oldVal} --> ${newVal}`);
        });
        this.connections.add(conn1);
        logTransport('...done adding connection');
        return conn1;
    }
}
const TIMEOUT = 1000;
class ScheduledPullState {
    closed = false;
    _timeoutId;
    _opts;
    constructor(opts){
        this._opts = opts;
        this._timeoutId = setTimeout(()=>{
            logPullState(`(SCHEDULED -> IN-FLIGHT) Began a pull!`);
            this._opts.setState(new InFlightPullState(this._opts));
        }, opts.ms);
    }
    reschedule(ms) {
        clearTimeout(this._timeoutId);
        if (ms) {
            logPullState(`(SCHEDULED -> SCHEDULED) Rescheduled a pull in ${ms}ms'}`);
            this._opts.setState(new ScheduledPullState({
                ms,
                ...this._opts
            }));
        } else {
            logPullState(`(SCHEDULED -> IN-FLIGHT) Rescheduled a pull to right now!`);
            this._opts.setState(new InFlightPullState({
                ...this._opts
            }));
        }
    }
    close() {
        clearTimeout(this._timeoutId);
        this._opts.setState({
            closed: true
        });
        logPullState(`(SCHEDULED -> CLOSED) Closed while waiting for the next pull!`);
    }
}
class InFlightPullState {
    _abortController;
    _opts;
    _timeoutTimer;
    closed = false;
    _closedInMeantime = false;
    constructor(opts){
        this._abortController = new AbortController();
        this._opts = opts;
        this._timeoutTimer = setTimeout(()=>{
            if (!this._abortController.signal.aborted) {
                this._abortController.abort();
            }
        }, TIMEOUT);
        fetch(opts.urlToFetch, {
            signal: this._abortController.signal
        }).then(async (response)=>{
            logPullState('(IN-FLIGHT) Fetched successfully!');
            if (!response.ok) {
                throw new RpcErrorNetworkProblem('pull thread HTTP response was not ok');
            }
            const envs = await response.json();
            if (!Array.isArray(envs)) throw new RpcError('expected an array');
            const pollInMs = envs.length >= 1 ? 10 : 1000;
            logPullState('(IN-FLIGHT) Got this many envelopes:', envs.length);
            logPullState(`(IN-FLIGHT -> SCHEDULED) Scheduled next pull in ${pollInMs}ms`);
            this._opts.setState(new ScheduledPullState({
                ...this._opts,
                ms: pollInMs
            }));
            this._opts.connection.status.set('OPEN');
            logTransport(`got ${envs.length} envelopes`);
            for (const env of envs){
                this._opts.connection.handleIncomingEnvelope(env);
            }
        }).catch((error)=>{
            if (error.message === 'The signal has been aborted' || error.message === 'The user aborted a request.') {
                logPullState('(IN-FLIGHT) Request was cancelled.');
                return;
            }
            this._opts.connection.status.set('ERROR');
            logPullState('Got an error!:', error);
            if (!this._closedInMeantime) {
                logPullState(`(IN-FLIGHT -> SCHEDULED) Scheduled next pull in ${3000}ms (due to error)`);
                this._opts.setState(new ScheduledPullState({
                    ...this._opts,
                    ms: 3000
                }));
            }
            console.warn('> problem polling for envelopes:', error);
        }).finally(()=>{
            clearTimeout(this._timeoutTimer);
        });
    }
    close() {
        this._closedInMeantime = true;
        clearTimeout(this._timeoutTimer);
        this._abortController.abort();
        this._opts.setState({
            closed: true
        });
        logPullState(`(IN-FLIGHT -> CLOSED) Closed!`);
    }
}
class TransportHttpClient {
    status = new Watchable('OPEN');
    deviceId;
    methods;
    connections = new WatchableSet();
    _pullStates = new Map();
    constructor(opts){
        logTransport('constructor for device', opts.deviceId);
        this.deviceId = opts.deviceId;
        this.methods = opts.methods;
    }
    get isClosed() {
        return this.status.value === 'CLOSED';
    }
    onClose(cb) {
        return this.status.onChangeTo('CLOSED', cb);
    }
    close() {
        if (this.isClosed) return;
        logTransport('closing...');
        this.status.set('CLOSED');
        logTransport('...closing connections...');
        for (const conn of this.connections){
            conn.close();
        }
        this.connections.clear();
        logTransport('...closed');
    }
    addConnection(url) {
        url = ensureEndsWith(url, '/');
        logTransport('addConnection to url:', url);
        const conn1 = new Connection({
            description: url,
            transport: this,
            deviceId: this.deviceId,
            methods: this.methods,
            sendEnvelope: async (conn, env)=>{
                if (conn.isClosed) throw new RpcErrorUseAfterClose('the connection is closed');
                logTransport(`connection "${conn.description}" is sending an envelope:`, env);
                logTransport('send...');
                conn.status.set('CONNECTING');
                const urlToPost = url + `from/${this.deviceId}`;
                logTransport(`send... POSTing to ${urlToPost}`);
                const { request , cancel: cancelRequest , clearFetchTimeout  } = fetchWithTimeout(1000, urlToPost, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([
                        env
                    ])
                });
                conn.onClose(()=>{
                    clearFetchTimeout();
                    cancelRequest();
                });
                try {
                    const res = await request;
                    clearFetchTimeout();
                    if (this.isClosed) return;
                    if (!res.ok) {
                        logTransport('send... POST was not ok...');
                        throw new RpcErrorNetworkProblem(`a POST to ${urlToPost} resulted in http ${res.status}`);
                    } else {
                        logTransport('send... success.');
                        const pullState = this._pullStates.get(conn.description);
                        if (pullState && 'reschedule' in pullState) {
                            logPullState('Sent envelopes, expecting some back... let\'s reschedule!');
                            pullState.reschedule(0);
                        }
                        conn.status.set('OPEN');
                    }
                } catch (error) {
                    clearFetchTimeout();
                    if (error.message === 'The signal has been aborted' || error.message === 'The user aborted a request.') {
                        return;
                    }
                    logTransport('send... error.');
                    conn.status.set('ERROR');
                    throw error;
                }
            }
        });
        const newPullState = new InFlightPullState({
            connection: conn1,
            setState: (state)=>this._pullStates.set(conn1.description, state)
            ,
            urlToFetch: url + `for/${this.deviceId}`
        });
        this._pullStates.set(conn1.description, newPullState);
        conn1.onClose(()=>{
            const pullState = this._pullStates.get(conn1.description);
            if (pullState && pullState.closed === false) {
                pullState.close();
            }
            this.connections.delete(conn1);
        });
        this.connections.add(conn1);
        return conn1;
    }
}
class TransportLocal {
    status = new Watchable('OPEN');
    deviceId;
    methods;
    connections = new WatchableSet();
    description;
    constructor(opts){
        logTransport(`TransportLocal constructor: ${opts.deviceId} "${opts.description}"`);
        this.deviceId = opts.deviceId;
        this.methods = opts.methods;
        this.description = `transport ${opts.description}`;
    }
    get isClosed() {
        return this.status.value === 'CLOSED';
    }
    onClose(cb) {
        return this.status.onChangeTo('CLOSED', cb);
    }
    close() {
        if (this.isClosed) return;
        logTransport(`${this.deviceId} | closing...`);
        this.status.set('CLOSED');
        logTransport(`${this.deviceId} | ...closing connections...`);
        for (const conn of this.connections){
            conn.close();
        }
        this.connections.clear();
        logTransport(`${this.deviceId} | ...closed`);
    }
    addConnection(otherTrans) {
        if (this.isClosed) throw new Error('Can\'t use a transport after it\'s closed');
        let thisConn;
        let otherConn;
        thisConn = new Connection({
            description: `conn ${this.deviceId} to ${otherTrans.deviceId}`,
            transport: this,
            deviceId: this.deviceId,
            methods: this.methods,
            sendEnvelope: async (conn, env)=>{
                await otherConn.handleIncomingEnvelope(env);
            }
        });
        otherConn = new Connection({
            description: `conn ${otherTrans.deviceId} to ${this.deviceId}`,
            transport: otherTrans,
            deviceId: otherTrans.deviceId,
            methods: otherTrans.methods,
            sendEnvelope: async (conn, env)=>{
                await thisConn.handleIncomingEnvelope(env);
            }
        });
        thisConn.onClose(()=>{
            otherConn.close();
            this.connections.delete(thisConn);
        });
        otherConn.onClose(()=>thisConn.close()
        );
        this.connections.add(thisConn);
        otherTrans.connections.add(otherConn);
        return {
            thisConn,
            otherConn
        };
    }
}
class Simplebus {
    _cbs;
    _cbsOnce;
    _lock;
    constructor(){
        this._cbs = new Set();
        this._cbsOnce = new Set();
        this._lock = new Lock();
    }
    async send(data, opts) {
        let useLock = opts === undefined ? true : opts.useLock;
        await this._lock.run(async ()=>{
            for (let cb of this._cbs){
                await cb(data);
            }
            for (let cb1 of this._cbsOnce){
                await cb1(data);
            }
            this._cbsOnce.clear();
        }, {
            bypass: !useLock
        });
    }
    on(cb) {
        this._cbs.add(cb);
        return ()=>this._cbs.delete(cb)
        ;
    }
    once(cb) {
        this._cbsOnce.add(cb);
        return ()=>this._cbsOnce.delete(cb)
        ;
    }
    removeAllSubscribers() {
        this._cbs.clear();
        this._cbsOnce.clear();
    }
}
function log1(...args) {}
let mapdebug = "        🗺";
class SuperbusMap {
    bus;
    _map;
    _sep;
    constructor(mapToClone, sep = ":"){
        this._sep = sep;
        if (mapToClone instanceof SuperbusMap) {
            this._map = new Map(mapToClone._map);
        } else if (mapToClone != null) {
            this._map = new Map(mapToClone);
        } else {
            this._map = new Map();
        }
        this.bus = new Superbus(sep);
    }
    async set(key, value) {
        log1(`${mapdebug} set("${key}", ${JSON.stringify(value)})`);
        let oldValue = this.get(key);
        this._map.set(key, value);
        if (oldValue === undefined) {
            await this.bus.sendAndWait("added" + this._sep + key, {
                key,
                value
            });
            return "added";
        } else {
            if (!w(value, oldValue)) {
                await this.bus.sendAndWait("changed" + this._sep + key, {
                    key,
                    value,
                    oldValue
                });
                return "changed";
            } else {
                return "unchanged";
            }
        }
    }
    async clear() {
        log1(`${mapdebug} clear()`);
        for (let key of this.keys()){
            await this.delete(key);
        }
    }
    async delete(key) {
        log1(`${mapdebug} delete("${key}")`);
        let oldValue = this.get(key);
        if (oldValue === undefined) {
            log1(`${mapdebug} ...delete("${key}") - already gone`);
            return false;
        }
        this._map.delete(key);
        await this.bus.sendAndWait("deleted" + this._sep + key, {
            key,
            oldValue
        });
        return true;
    }
    get size() {
        return this._map.size;
    }
    get(key) {
        return this._map.get(key);
    }
    has(key) {
        return this._map.has(key);
    }
    keys() {
        return this._map.keys();
    }
    values() {
        return this._map.values();
    }
    entries() {
        return this._map.entries();
    }
    forEach(cb) {
        this._map.forEach(cb);
    }
}
const decoder = new TextDecoder();
const encoder = new TextEncoder();
function bytesToString(bytes) {
    return decoder.decode(bytes);
}
function stringToBytes(str) {
    return encoder.encode(str);
}
function stringLengthInBytes(str) {
    return stringToBytes(str).length;
}
function concatBytes1(a28, b13) {
    if (!b13 || b13.length === 0) return a28;
    if (!a28 || a28.length === 0) return b13;
    var c = new Uint8Array(a28.length + b13.length);
    c.set(a28);
    c.set(b13, a28.length);
    return c;
}
function b64StringToBytes(b64string) {
    return mod.base64.parse(b64string);
}
function isBytes(bytes) {
    return bytes?.constructor?.name === "Uint8Array";
}
function isBuffer(buf) {
    return buf?.constructor?.name === "Buffer";
}
function identifyBufOrBytes(bufOrBytes) {
    if (isBytes(bufOrBytes)) return "bytes";
    if (isBuffer(bufOrBytes)) return "buffer";
    return "?";
}
export { bytesToString as bytesToString };
export { stringToBytes as stringToBytes };
export { stringLengthInBytes as stringLengthInBytes };
export { concatBytes1 as concatBytes };
export { b64StringToBytes as b64StringToBytes };
export { isBytes as isBytes };
export { isBuffer as isBuffer };
export { identifyBufOrBytes as identifyBufOrBytes };
function onlyHasChars(str, allowedChars) {
    for (let s22 of str){
        if (allowedChars.indexOf(s22) === -1) return false;
    }
    return true;
}
function isOnlyPrintableAscii(s23) {
    let bytes = stringToBytes(s23);
    for (let __byte of bytes){
        if (__byte < 32 || __byte > 126) return false;
    }
    return true;
}
function isDigit(ch) {
    if (ch === "") return false;
    return digits.indexOf(ch) !== -1;
}
const alphaLower = "abcdefghijklmnopqrstuvwxyz";
const alphaUpper = alphaLower.toUpperCase();
const digits = "0123456789";
const b32chars = alphaLower + "234567";
const authorNameChars = alphaLower + digits;
const authorKeyChars = b32chars;
const authorAddressChars = authorNameChars + b32chars + "@.";
const workspaceNameChars = alphaLower + digits;
const workspaceKeyChars = alphaLower + digits;
const workspaceAddressChars = workspaceNameChars + b32chars + "+.";
const pathPunctuation = "/'()-._~!$&+,:=@%";
const pathChars = alphaLower + alphaUpper + digits + pathPunctuation;
export { onlyHasChars as onlyHasChars };
export { isOnlyPrintableAscii as isOnlyPrintableAscii };
export { isDigit as isDigit };
export { alphaLower as alphaLower };
export { alphaUpper as alphaUpper };
export { digits as digits };
export { b32chars as b32chars };
export { authorNameChars as authorNameChars };
export { authorKeyChars as authorKeyChars };
export { authorAddressChars as authorAddressChars };
export { workspaceNameChars as workspaceNameChars };
export { workspaceKeyChars as workspaceKeyChars };
export { workspaceAddressChars as workspaceAddressChars };
export { pathPunctuation as pathPunctuation };
export { pathChars as pathChars };
function assembleAuthorAddress(name, encodedPubkey) {
    return `@${name}.${encodedPubkey}`;
}
function assembleShareAddress(name, encodedPubkey) {
    return `+${name}.${encodedPubkey}`;
}
function checkAuthorIsValid(addr) {
    let parsed = parseAuthorAddress(addr);
    if (notErr(parsed)) return true;
    return parsed;
}
function checkShareIsValid(addr) {
    let parsed = parseShareAddress(addr);
    if (notErr(parsed)) return true;
    return parsed;
}
function parseAuthorAddress(address) {
    return parseAddress(address, {
        sigil: "@",
        separator: ".",
        minNameLength: 4,
        maxNameLength: 4,
        minPubkeyLength: 53,
        maxPubkeyLength: 53,
        allowedNameCharacters: authorNameChars,
        allowedPubkeyCharacters: authorKeyChars,
        pubkeyMustStartWithB: true
    });
}
function parseShareAddress(address) {
    return parseAddress(address, {
        sigil: "+",
        separator: ".",
        minNameLength: 1,
        maxNameLength: 15,
        minPubkeyLength: 1,
        maxPubkeyLength: 53,
        allowedNameCharacters: workspaceNameChars,
        allowedPubkeyCharacters: workspaceKeyChars,
        pubkeyMustStartWithB: false
    });
}
function parseAddress(address, opts) {
    let { sigil , separator , minNameLength , maxNameLength , minPubkeyLength , maxPubkeyLength , allowedNameCharacters , allowedPubkeyCharacters , pubkeyMustStartWithB ,  } = opts;
    if (typeof address !== "string") {
        return new ValidationError("address must be a string");
    }
    if (address.length < 4) return new ValidationError("address is too short");
    if (address[0] !== sigil) {
        return new ValidationError(`address must start with a sigil: "${sigil}"`);
    }
    if (address.indexOf(separator) === -1) {
        return new ValidationError(`address must contain a separator character: "${separator}"`);
    }
    let parts = address.slice(1).split(separator);
    if (parts.length !== 2) {
        return new ValidationError(`address must have exactly 2 parts separated by a "${separator}" separator`);
    }
    let [name, pubkey] = parts;
    if (name.length < minNameLength || name.length > maxNameLength) {
        return new ValidationError(`name must be between ${minNameLength} and ${maxNameLength} characters long, but is ${name.length}`);
    }
    if (pubkey.length < minPubkeyLength || pubkey.length > maxPubkeyLength) {
        return new ValidationError(`pubkey must be between ${minPubkeyLength} and ${maxPubkeyLength} characters long, but is ${pubkey.length}`);
    }
    if (!onlyHasChars(name, allowedNameCharacters)) {
        return new ValidationError(`name "${name}" must only have allowed characters`);
    }
    if (!onlyHasChars(pubkey, allowedPubkeyCharacters)) {
        return new ValidationError(`pubkey "${pubkey}" must only have allowed characters`);
    }
    if (isDigit(name[0])) {
        return new ValidationError(`name "${name}" must not start with a digit`);
    }
    if (isDigit(pubkey[0])) {
        return new ValidationError(`pubkey "${pubkey}" must not start with a digit`);
    }
    if (pubkeyMustStartWithB && pubkey[0] !== "b") {
        return new ValidationError(`pubkey "${pubkey}" must start with 'b'`);
    }
    return {
        address,
        name,
        pubkey
    };
}
export { assembleAuthorAddress as assembleAuthorAddress };
export { assembleShareAddress as assembleShareAddress };
export { checkAuthorIsValid as checkAuthorIsValid };
export { checkShareIsValid as checkShareIsValid };
export { parseAuthorAddress as parseAuthorAddress };
export { parseShareAddress as parseShareAddress };
export { parseAddress as parseAddress };
function isPlainObject(obj) {
    if (Object.prototype.toString.call(obj) !== "[object Object]") {
        return false;
    }
    if (("" + obj.constructor).startsWith("class")) return false;
    return true;
}
function checkIsPlainObject(x27) {
    return isPlainObject(x27) ? null : "expected plain object but got " + x27;
}
function checkLiteral(val) {
    return (x28)=>{
        if (x28 !== val) return `expected literal value ${JSON.stringify(val)}`;
        return null;
    };
}
function checkString(opts = {}) {
    return (x29)=>{
        if (opts.optional !== true && x29 === undefined) return "required";
        if (opts.optional === true && x29 === undefined) return null;
        let len = stringLengthInBytes(x29);
        if (typeof x29 !== "string") {
            return "expected a string but got " + JSON.stringify(x29);
        }
        if (opts.minLen !== undefined && len < opts.minLen) {
            return `string shorter than min length of ${opts.minLen} chars`;
        }
        if (opts.maxLen !== undefined && len > opts.maxLen) {
            return `string shorter than max length of ${opts.maxLen} chars`;
        }
        if (opts.len !== undefined && len !== opts.len) {
            return `string does not have required length of ${opts.len} chars: ${x29}`;
        }
        if (opts.allowedChars !== undefined && !onlyHasChars(x29, opts.allowedChars)) {
            return "contains disallowed characters";
        }
        return null;
    };
}
function checkInt(opts = {}) {
    return (x30)=>{
        if (opts.optional !== true && x30 === undefined) return "required";
        if (opts.optional === true && x30 === undefined) return null;
        if (opts.nullable !== true && x30 === null) return "not nullable";
        if (opts.nullable === true && x30 === null) return null;
        if (typeof x30 !== "number") {
            return "expected a number but got " + JSON.stringify(x30);
        }
        if (isNaN(x30)) return "is NaN";
        if (!isFinite(x30)) return "is Infinity";
        if (x30 !== Math.round(x30)) return "expected an integer";
        if (opts.min !== undefined && x30 < opts.min) {
            return `integer too small (must be >= ${opts.min})`;
        }
        if (opts.max !== undefined && x30 > opts.max) {
            return `integer too large (must be <= ${opts.max})`;
        }
        return null;
    };
}
function checkObj(opts = {}) {
    opts.allowLiteralUndefined = opts.allowLiteralUndefined ?? false;
    opts.allowExtraKeys = opts.allowExtraKeys ?? false;
    return (x31)=>{
        if (!isPlainObject(x31)) return "expected an object";
        if (opts.allowLiteralUndefined === false) {
            for (let [k9, v9] of Object.entries(x31)){
                if (v9 === undefined) {
                    return `${k9} is explicitly set to undefined but should be missing instead`;
                }
            }
        }
        if (opts.objSchema !== undefined) {
            if (opts.allowExtraKeys === false) {
                let objKeys = Object.keys(x31);
                let schemaKeys = Object.keys(opts.objSchema);
                let extraObjKeys = objKeys.filter((k10)=>schemaKeys.indexOf(k10) === -1
                );
                if (extraObjKeys.length > 0) {
                    return `object has extra keys not in the schema: ${extraObjKeys.join(", ")}`;
                }
            }
            for (let [key, validator] of Object.entries(opts.objSchema)){
                let err = validator(x31[key]);
                if (err !== null) return `${key}: ${err}`;
            }
        }
        return null;
    };
}
export { isPlainObject as isPlainObject };
export { checkIsPlainObject as checkIsPlainObject };
export { checkLiteral as checkLiteral };
export { checkString as checkString };
export { checkInt as checkInt };
export { checkObj as checkObj };
const { codec  } = mod;
const myEncoding = {
    chars: "abcdefghijklmnopqrstuvwxyz234567",
    bits: 5
};
function base32BytesToString(bytes) {
    return "b" + codec.stringify(bytes, myEncoding, {
        pad: false
    });
}
function base32StringToBytes(str) {
    if (!str.startsWith("b")) {
        throw new ValidationError("can't decode base32 string - it should start with a 'b'. " + str);
    }
    if (str[str.length - 1] === "=") {
        throw new ValidationError("can't decode base32 string - it contains padding characters ('=')");
    }
    return codec.parse(str.slice(1), myEncoding, {
        loose: true
    });
}
export { base32BytesToString as base32BytesToString };
export { base32StringToBytes as base32StringToBytes };
var LogLevel;
(function(LogLevel1) {
    LogLevel1[LogLevel1["None"] = -1] = "None";
    LogLevel1[LogLevel1["Error"] = 0] = "Error";
    LogLevel1[LogLevel1["Warn"] = 1] = "Warn";
    LogLevel1[LogLevel1["Log"] = 2] = "Log";
    LogLevel1[LogLevel1["Info"] = 3] = "Info";
    LogLevel1[LogLevel1["Debug"] = 4] = "Debug";
})(LogLevel || (LogLevel = {}));
const DEFAULT_LOG_LEVEL = LogLevel.Error;
let globalLogLevels = {
    _default: DEFAULT_LOG_LEVEL
};
function updateLogLevels(newLogLevels) {
    globalLogLevels = {
        ...globalLogLevels,
        ...newLogLevels
    };
}
function setLogLevel(source, level) {
    globalLogLevels[source] = level;
}
function setDefaultLogLevel(level) {
    globalLogLevels._default = level;
}
function getLogLevel(source) {
    if (source in globalLogLevels) {
        return globalLogLevels[source];
    } else {
        return globalLogLevels._default;
    }
}
function getLogLevels() {
    return globalLogLevels;
}
class Logger {
    source;
    color = undefined;
    constructor(source, color2){
        this.source = source;
        this.color = color2 || "blueBright";
    }
    _print(level, showTag, indent, ...args) {
        if (level <= getLogLevel(this.source)) {
            if (showTag) {
                let tag = `[${this.source}]`;
                if (this.color !== undefined) {
                    tag = crayonInstance[this.color](tag);
                }
                console.log(indent, tag, ...args);
            } else {
                console.log(indent, ...args);
            }
        }
    }
    error(...args) {
        this._print(LogLevel.Error, true, "!!", ...args);
    }
    warn(...args) {
        this._print(LogLevel.Warn, true, "! ", ...args);
    }
    log(...args) {
        this._print(LogLevel.Log, true, "  ", ...args);
    }
    info(...args) {
        this._print(LogLevel.Info, true, "    ", ...args);
    }
    debug(...args) {
        this._print(LogLevel.Debug, true, "      ", ...args);
    }
    blank() {
        this._print(LogLevel.Info, false, "");
    }
}
export { LogLevel as LogLevel };
export { DEFAULT_LOG_LEVEL as DEFAULT_LOG_LEVEL };
export { updateLogLevels as updateLogLevels };
export { setLogLevel as setLogLevel };
export { setDefaultLogLevel as setDefaultLogLevel };
export { getLogLevel as getLogLevel };
export { getLogLevels as getLogLevels };
export { Logger as Logger };
const { createHash  } = mod1;
const logger = new Logger("crypto-driver-noble", "cyan");
const CryptoDriverNoble = class {
    static sha256(input) {
        if (typeof input === "string") {
            return Promise.resolve(createHash("sha256").update(input, "utf-8").digest());
        } else {
            return Promise.resolve(createHash("sha256").update(input).digest());
        }
    }
    static async generateKeypairBytes() {
        logger.debug("generateKeypairBytes");
        const secret = mod3.utils.randomPrivateKey();
        const pubkey = await mod3.getPublicKey(secret);
        return {
            pubkey,
            secret
        };
    }
    static sign(keypairBytes, msg) {
        logger.debug("sign");
        if (typeof msg === "string") msg = stringToBytes(msg);
        return mod3.sign(msg, keypairBytes.secret);
    }
    static async verify(publicKey, sig, msg) {
        logger.debug("verify");
        try {
            if (typeof msg === "string") msg = stringToBytes(msg);
            const result = await mod3.verify(sig, msg, publicKey);
            return result;
        } catch  {
            return false;
        }
    }
};
export { CryptoDriverNoble as CryptoDriverNoble };
export { w as deepEqual };
function microsecondNow() {
    return Date.now() * 1000;
}
function sleep1(ms) {
    return new Promise((res)=>{
        setTimeout(res, ms);
    });
}
function randomId() {
    return "" + Math.random() + Math.random();
}
function replaceAll(str, from, to) {
    return str.split(from).join(to);
}
function countChars(str, __char) {
    if (__char.length != 1) {
        throw new Error("char must have length 1 but is " + JSON.stringify(__char));
    }
    return str.split(__char).length - 1;
}
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
export { microsecondNow as microsecondNow };
export { sleep1 as sleep };
export { randomId as randomId };
export { replaceAll as replaceAll };
export { countChars as countChars };
export { isObjectEmpty as isObjectEmpty };
function encodeAuthorKeypairToStrings(shortname, pair) {
    return {
        address: assembleAuthorAddress(shortname, base32BytesToString(pair.pubkey)),
        secret: base32BytesToString(pair.secret)
    };
}
function decodeAuthorKeypairToBytes(pair) {
    try {
        let authorParsed = parseAuthorAddress(pair.address);
        if (isErr(authorParsed)) return authorParsed;
        let bytes = {
            pubkey: base32StringToBytes(authorParsed.pubkey),
            secret: base32StringToBytes(pair.secret)
        };
        if (bytes.pubkey.length !== 32) {
            return new ValidationError(`pubkey bytes should be 32 bytes long, not ${bytes.pubkey.length} after base32 decoding.  ${pair.address}`);
        }
        if (bytes.secret.length !== 32) {
            return new ValidationError(`secret bytes should be 32 bytes long, not ${bytes.secret.length} after base32 decoding.  ${pair.secret}`);
        }
        return bytes;
    } catch (err) {
        return new ValidationError("crash while decoding author keypair: " + err.message);
    }
}
export { encodeAuthorKeypairToStrings as encodeAuthorKeypairToStrings };
export { decodeAuthorKeypairToBytes as decodeAuthorKeypairToBytes };
let logger1 = new Logger("crypto", "cyanBright");
let GlobalCryptoDriver = CryptoDriverNoble;
function setGlobalCryptoDriver(driver) {
    logger1.debug(`set global crypto driver: ${driver.name}`);
    GlobalCryptoDriver = driver;
}
export { GlobalCryptoDriver as GlobalCryptoDriver };
export { setGlobalCryptoDriver as setGlobalCryptoDriver };
let logger2 = new Logger("crypto", "cyanBright");
const Crypto = class {
    static async sha256base32(input) {
        const b32 = await GlobalCryptoDriver.sha256(input);
        return base32BytesToString(b32);
    }
    static async generateAuthorKeypair(name) {
        logger2.debug(`generateAuthorKeypair("${name}")`);
        const keypairBytes = await GlobalCryptoDriver.generateKeypairBytes();
        const keypairFormatted = {
            address: assembleAuthorAddress(name, base32BytesToString(keypairBytes.pubkey)),
            secret: base32BytesToString(keypairBytes.secret)
        };
        const err = checkAuthorIsValid(keypairFormatted.address);
        if (isErr(err)) return err;
        return keypairFormatted;
    }
    static async sign(keypair, msg) {
        logger2.debug(`sign`);
        try {
            let keypairBytes = decodeAuthorKeypairToBytes(keypair);
            if (isErr(keypairBytes)) return keypairBytes;
            const signed = await GlobalCryptoDriver.sign(keypairBytes, msg);
            return base32BytesToString(signed);
        } catch (err) {
            return new ValidationError("unexpected error while signing: " + err.message);
        }
    }
    static async verify(authorAddress, sig, msg) {
        logger2.debug(`verify`);
        try {
            let authorParsed = parseAuthorAddress(authorAddress);
            if (isErr(authorParsed)) return false;
            return GlobalCryptoDriver.verify(base32StringToBytes(authorParsed.pubkey), base32StringToBytes(sig), msg);
        } catch (err) {
            return false;
        }
    }
    static async checkAuthorKeypairIsValid(keypair) {
        logger2.debug(`checkAuthorKeypairIsValid`);
        try {
            if (typeof keypair.address !== "string" || typeof keypair.secret !== "string") {
                return new ValidationError("address and secret must be strings");
            }
            let addressErr = checkAuthorIsValid(keypair.address);
            if (isErr(addressErr)) return addressErr;
            let msg = "a test message to sign. " + randomId();
            let sig = await this.sign(keypair, msg);
            if (isErr(sig)) return sig;
            let isValid = await this.verify(keypair.address, sig, msg);
            if (isValid === false) {
                return new ValidationError("pubkey does not match secret");
            }
            return true;
        } catch (err) {
            return new ValidationError("unexpected error in checkAuthorKeypairIsValid: " + err.message);
        }
    }
};
export { Crypto as Crypto };
new Logger("validator es.4", "red");
const FUTURE_CUTOFF_MICROSECONDS = 10 * 60 * 1000 * 1000;
const ES4_CORE_SCHEMA = {
    objSchema: {
        format: checkLiteral("es.4"),
        author: checkString({
            allowedChars: authorAddressChars
        }),
        content: checkString({
            maxLen: 4000000
        }),
        contentHash: checkString({
            allowedChars: b32chars,
            len: 53
        }),
        deleteAfter: checkInt({
            min: 10000000000000,
            max: 9007199254740990,
            nullable: true
        }),
        path: checkString({
            allowedChars: pathChars,
            minLen: 2,
            maxLen: 512
        }),
        signature: checkString({
            allowedChars: b32chars,
            len: 104
        }),
        timestamp: checkInt({
            min: 10000000000000,
            max: 9007199254740990
        }),
        workspace: checkString({
            allowedChars: workspaceAddressChars
        })
    },
    allowLiteralUndefined: false,
    allowExtraKeys: false
};
const FormatValidatorEs4 = class {
    static format = "es.4";
    static async hashDocument(doc) {
        let docWithFakeSig = {
            ...doc,
            signature: "bthisisafakesignatureusedtofillintheobjectwhenvalidatingitforhashingaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        };
        let err = this._checkBasicDocumentValidity(docWithFakeSig);
        if (isErr(err)) return err;
        return Crypto.sha256base32(`author\t${doc.author}\n` + `contentHash\t${doc.contentHash}\n` + (doc.deleteAfter === null ? "" : `deleteAfter\t${doc.deleteAfter}\n`) + `format\t${doc.format}\n` + `path\t${doc.path}\n` + `timestamp\t${doc.timestamp}\n` + `workspace\t${doc.workspace}\n`);
    }
    static async signDocument(keypair, doc) {
        if (keypair.address !== doc.author) {
            return new ValidationError("when signing a document, keypair address must match document author");
        }
        let hash = await this.hashDocument(doc);
        if (isErr(hash)) return hash;
        let sig = await Crypto.sign(keypair, hash);
        if (isErr(sig)) return sig;
        return {
            ...doc,
            signature: sig
        };
    }
    static removeExtraFields(doc) {
        if (!isPlainObject(doc)) {
            return new ValidationError("doc is not a plain javascript object");
        }
        let validKeys = new Set(Object.keys(ES4_CORE_SCHEMA.objSchema || {}));
        let doc2 = {};
        let extras = {};
        for (let [key, val] of Object.entries(doc)){
            if (validKeys.has(key)) {
                doc2[key] = val;
            } else {
                if (!key.startsWith("_")) {
                    return new ValidationError("extra document fields must have names starting with an underscore");
                }
                extras[key] = val;
            }
        }
        return {
            doc: doc2,
            extras
        };
    }
    static checkDocumentIsValid(doc, now) {
        if (now === undefined) now = Date.now() * 1000;
        let errBV = this._checkBasicDocumentValidity(doc);
        if (isErr(errBV)) return errBV;
        let errT = this._checkTimestampIsOk(doc.timestamp, doc.deleteAfter, now);
        if (isErr(errT)) return errT;
        let errW = this._checkAuthorCanWriteToPath(doc.author, doc.path);
        if (isErr(errW)) return errW;
        let errP = this._checkPathIsValid(doc.path, doc.deleteAfter);
        if (isErr(errP)) return errP;
        let errAA = checkAuthorIsValid(doc.author);
        if (isErr(errAA)) return errAA;
        let errWA = checkShareIsValid(doc.workspace);
        if (isErr(errWA)) return errWA;
        let errS = this._checkAuthorSignatureIsValid(doc);
        if (isErr(errS)) return errS;
        let errCH = this._checkContentMatchesHash(doc.content, doc.contentHash);
        if (isErr(errCH)) return errCH;
        return true;
    }
    static _checkBasicDocumentValidity(doc) {
        let err = checkObj(ES4_CORE_SCHEMA)(doc);
        if (err !== null) return new ValidationError(err);
        return true;
    }
    static _checkAuthorCanWriteToPath(author, path) {
        if (path.indexOf("~") === -1) return true;
        if (path.indexOf("~" + author) !== -1) return true;
        return new ValidationError(`author ${author} can't write to path ${path}`);
    }
    static _checkTimestampIsOk(timestamp, deleteAfter, now) {
        if (timestamp > now + FUTURE_CUTOFF_MICROSECONDS) {
            return new ValidationError("timestamp too far in the future");
        }
        if (deleteAfter !== null) {
            if (now > deleteAfter) {
                return new ValidationError("ephemeral doc has expired");
            }
            if (deleteAfter <= timestamp) {
                return new ValidationError("ephemeral doc expired before it was created");
            }
        }
        return true;
    }
    static _checkPathIsValid(path, deleteAfter) {
        if (!path.startsWith("/")) {
            return new ValidationError("invalid path: must start with /");
        }
        if (path.endsWith("/")) {
            return new ValidationError("invalid path: must not end with /");
        }
        if (path.startsWith("/@")) {
            return new ValidationError('invalid path: must not start with "/@"');
        }
        if (path.indexOf("//") !== -1) {
            return new ValidationError("invalid path: must not contain two consecutive slashes");
        }
        if (deleteAfter !== undefined) {
            if (path.indexOf("!") === -1 && deleteAfter !== null) {
                return new ValidationError("when deleteAfter is set, path must contain '!'");
            }
            if (path.indexOf("!") !== -1 && deleteAfter === null) {
                return new ValidationError("when deleteAfter is null, path must not contain '!'");
            }
        }
        return true;
    }
    static async _checkAuthorSignatureIsValid(doc) {
        try {
            let hash = await this.hashDocument(doc);
            if (isErr(hash)) return hash;
            let verified = await Crypto.verify(doc.author, doc.signature, hash);
            if (verified !== true) {
                return new ValidationError("signature is invalid");
            }
            return true;
        } catch (err) {
            return new ValidationError("signature is invalid (unexpected exception)");
        }
    }
    static async _checkContentMatchesHash(content, contentHash) {
        if (await Crypto.sha256base32(content) !== contentHash) {
            return new ValidationError("content does not match contentHash");
        }
        return true;
    }
};
export { FormatValidatorEs4 as FormatValidatorEs4 };
var Cmp;
(function(Cmp1) {
    Cmp1[Cmp1["LT"] = -1] = "LT";
    Cmp1[Cmp1["EQ"] = 0] = "EQ";
    Cmp1[Cmp1["GT"] = 1] = "GT";
})(Cmp || (Cmp = {}));
export { Cmp as Cmp };
function sortedInPlace(array) {
    array.sort();
    return array;
}
function compareBasic(a29, b14, order = "ASC") {
    if (w(a29, b14)) return Cmp.EQ;
    if (order === "ASC" || order === undefined) {
        return a29 < b14 ? Cmp.LT : Cmp.GT;
    } else if (order === "DESC") {
        return a29 > b14 ? Cmp.LT : Cmp.GT;
    } else {
        throw new Error("unexpected sort order to compareBasic: " + JSON.stringify(order));
    }
}
function compareArrays(a30, b15, sortOrders) {
    let minLen = Math.min(a30.length, b15.length);
    for(let ii = 0; ii < minLen; ii++){
        let sortOrder = sortOrders?.[ii] ?? "ASC";
        let elemCmp = compareBasic(a30[ii], b15[ii], sortOrder);
        if (elemCmp !== Cmp.EQ) return elemCmp;
    }
    if (a30.length === b15.length) return Cmp.EQ;
    let ii1 = Math.min(a30.length, b15.length);
    let sortOrder = sortOrders?.[ii1] ?? "ASC";
    return compareBasic(a30.length, b15.length, sortOrder);
}
function compareByObjKey(key, sortOrder = "ASC") {
    return (a31, b16)=>compareBasic(a31[key], b16[key], sortOrder)
    ;
}
function compareByFn(fn) {
    return (a32, b17)=>compareBasic(fn(a32), fn(b17))
    ;
}
function compareByObjArrayFn(fn) {
    return (a33, b18)=>compareArrays(fn(a33), fn(b18))
    ;
}
export { sortedInPlace as sortedInPlace };
export { compareBasic as compareBasic };
export { compareArrays as compareArrays };
export { compareByObjKey as compareByObjKey };
export { compareByFn as compareByFn };
export { compareByObjArrayFn as compareByObjArrayFn };
function saltAndHashShare(salt, share) {
    return Crypto.sha256base32(salt + share + salt);
}
function makeSyncerBag(peer) {
    return {
        async serveSaltedHandshake () {
            const salt = randomId();
            const saltedShares = await Promise.all(peer.shares().map((ws)=>saltAndHashShare(salt, ws)
            ));
            return {
                peerId: peer.peerId,
                salt,
                saltedShares
            };
        },
        async processSaltedHandshake (response) {
            const { peerId , salt , saltedShares  } = response;
            const serverSaltedSet = new Set(saltedShares);
            const commonShareSet = new Set();
            for (const plainWs of peer.shares()){
                const saltedWs = await saltAndHashShare(salt, plainWs);
                if (serverSaltedSet.has(saltedWs)) {
                    commonShareSet.add(plainWs);
                }
            }
            const commonShares = sortedInPlace([
                ...commonShareSet
            ]);
            return {
                partnerPeerId: peerId,
                partnerLastSeenAt: microsecondNow(),
                commonShares
            };
        },
        serveAllShareStates (request) {
            const shareStates = {};
            for (const share of request.commonShares){
                const storage = peer.getReplica(share);
                if (storage === undefined) {
                    continue;
                }
                const shareState = {
                    share,
                    partnerStorageId: storage.replicaId,
                    partnerMaxLocalIndexOverall: storage.getMaxLocalIndex()
                };
                shareStates[share] = shareState;
            }
            return {
                partnerPeerId: peer.peerId,
                shareStates
            };
        },
        processAllShareStates (existingShareStates, request, response) {
            const { commonShares  } = request;
            const { partnerPeerId , shareStates  } = response;
            const newShareStates = {};
            for (const share of Object.keys(shareStates)){
                const shareStateFromServer = shareStates[share];
                if (shareStateFromServer.share !== share) {
                    throw new ValidationError(`server shenanigans: server response is not self-consistent, share key does not match data in the Record ${shareStateFromServer.share} & ${share}`);
                }
                if (commonShares.indexOf(share) === -1) {
                    throw new ValidationError(`server shenanigans: server included a share that is not common: ${share}`);
                }
                const clientStorage = peer.getReplica(share);
                if (clientStorage === undefined) {
                    throw new ValidationError(`server shenanigans: referenced a share we don't have: ${share}`);
                }
                const existingShareState = existingShareStates[share] || {};
                newShareStates[share] = {
                    share,
                    partnerStorageId: shareStateFromServer.partnerStorageId,
                    partnerMaxLocalIndexOverall: shareStateFromServer.partnerMaxLocalIndexOverall,
                    partnerMaxLocalIndexSoFar: existingShareState.partnerMaxLocalIndexSoFar ?? -1,
                    storageId: clientStorage.replicaId,
                    lastSeenAt: microsecondNow()
                };
            }
            return {
                partnerPeerId,
                shareStates: newShareStates,
                lastSeenAt: microsecondNow()
            };
        },
        async serveShareQuery (request) {
            const { share , storageId , query  } = request;
            const replica = peer.getReplica(share);
            if (replica === undefined) {
                const err = `share ${share} is unknown; skipping`;
                throw err;
            }
            if (replica.replicaId !== storageId) {
                const err = `storageId for ${share} is not ${storageId} anymore, it's ${replica.replicaId}`;
                throw err;
            }
            const docs = await replica.queryDocs(query);
            return {
                share,
                storageId,
                partnerMaxLocalIndexOverall: replica.getMaxLocalIndex(),
                docs
            };
        },
        async processShareQuery (existingShareStates, response) {
            const { share , storageId , docs ,  } = response;
            const storage = peer.getReplica(share);
            if (storage === undefined) {
                const err = `share ${share} is unknown; skipping`;
                throw err;
            }
            const myShareState = existingShareStates[share];
            if (storageId !== myShareState.partnerStorageId) {
                const err = `storageId for ${share} is not ${storageId} anymore, it's ${myShareState.partnerStorageId}`;
                throw err;
            }
            const ingests = docs.map((doc)=>{
                return new Promise((resolve, reject)=>{
                    const shareState = existingShareStates[share];
                    if (storageId !== shareState.partnerStorageId) {
                        const err = `storageId for ${share} is not ${storageId} anymore, it's ${myShareState.partnerStorageId}`;
                        throw reject(err);
                    }
                    storage.ingest(doc).then((ingestEvent)=>{
                        if (ingestEvent.kind === "failure") {
                            return resolve({
                                pulled: false,
                                localIndex: -1
                            });
                        }
                        return resolve({
                            pulled: true,
                            localIndex: doc._localIndex ?? -1
                        });
                    });
                });
            });
            const ingestResults = await Promise.all(ingests);
            const pulled1 = ingestResults.filter(({ pulled  })=>pulled
            );
            return {
                pulled: pulled1.length,
                lastSeenAt: microsecondNow(),
                shareStates: {
                    ...existingShareStates,
                    [share]: {
                        ...myShareState,
                        partnerMaxLocalIndexSoFar: pulled1.length > 0 ? Math.max(...pulled1.map(({ localIndex  })=>localIndex
                        )) : myShareState.partnerMaxLocalIndexSoFar,
                        lastSeenAt: microsecondNow()
                    }
                }
            };
        }
    };
}
class SyncCoordinator {
    _connection;
    _syncerBag;
    _shareStates = {};
    _timeout = null;
    commonShares = [];
    partnerLastSeenAt = null;
    state = "ready";
    constructor(peer, connection){
        this._syncerBag = makeSyncerBag(peer);
        this._connection = connection;
    }
    async start() {
        this.state = "active";
        const saltedHandshakeRes = await this._connection.request("serveSaltedHandshake");
        const { commonShares , partnerLastSeenAt  } = await this._syncerBag.processSaltedHandshake(saltedHandshakeRes);
        this.commonShares = commonShares;
        this.partnerLastSeenAt = partnerLastSeenAt;
        this._connection.onClose(()=>{
            this.close();
        });
        await this._getShareStates();
        await this.pull();
    }
    async pull() {
        if (this.state === "closed") {
            return;
        }
        const docPulls = Object.keys(this._shareStates).map((key)=>{
            return new Promise((resolve)=>{
                const state = this._shareStates[key];
                this._pullDocs({
                    query: {
                        orderBy: "localIndex ASC",
                        startAfter: {
                            localIndex: state.partnerMaxLocalIndexSoFar
                        }
                    },
                    storageId: state.partnerStorageId,
                    share: state.share
                }).then(resolve);
            });
        });
        await Promise.all(docPulls);
        this._timeout = setTimeout(()=>this.pull()
        , 1000);
    }
    async _getShareStates() {
        const shareStatesRequest = {
            commonShares: this.commonShares
        };
        const shareStatesResponse = await this._connection.request("serveAllShareStates", shareStatesRequest);
        const { lastSeenAt , shareStates  } = this._syncerBag.processAllShareStates(this._shareStates, shareStatesRequest, shareStatesResponse);
        this.partnerLastSeenAt = lastSeenAt;
        this._shareStates = shareStates;
    }
    async _pullDocs(shareQuery) {
        const queryResponse = await this._connection.request("serveShareQuery", shareQuery);
        const { lastSeenAt , shareStates , pulled  } = await this._syncerBag.processShareQuery(this._shareStates, queryResponse);
        this._mergeShareStates(shareStates);
        this.partnerLastSeenAt = lastSeenAt;
        return pulled;
    }
    _mergeShareStates(newShareStates) {
        const nextShareStates = {};
        for(const shareAddress in newShareStates){
            const newShareState = newShareStates[shareAddress];
            const existingShareState = this._shareStates[shareAddress];
            if (!existingShareState) {
                nextShareStates[shareAddress] = newShareState;
                break;
            }
            nextShareStates[shareAddress] = {
                ...newShareState,
                lastSeenAt: Math.max(newShareState.lastSeenAt, existingShareState.lastSeenAt),
                partnerMaxLocalIndexOverall: Math.max(newShareState.partnerMaxLocalIndexOverall, existingShareState.partnerMaxLocalIndexOverall),
                partnerMaxLocalIndexSoFar: Math.max(newShareState.partnerMaxLocalIndexSoFar, existingShareState.partnerMaxLocalIndexSoFar)
            };
        }
        this._shareStates = nextShareStates;
    }
    close() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        this.state = "closed";
    }
}
class Syncer {
    transport;
    _coordinators = new Map();
    _peer;
    constructor(peer, makeTransport){
        this._peer = peer;
        this.transport = makeTransport(makeSyncerBag(peer));
        this.transport.connections.onAdd((connection)=>{
            const coordinator = new SyncCoordinator(this._peer, connection);
            this._coordinators.set(connection._deviceId, coordinator);
            coordinator.start();
        });
        this.transport.connections.onDelete((connection)=>{
            const coordinator = this._coordinators.get(connection.description);
            if (coordinator) {
                coordinator.close();
            }
            this._coordinators.delete(connection.description);
        });
    }
    close() {
        this._coordinators.forEach((coordinator)=>{
            coordinator.close();
        });
        this._coordinators.clear();
        this.transport.close();
    }
}
export { Syncer as Syncer };
const logger3 = new Logger("peer", "blueBright");
const J2 = JSON.stringify;
class Peer {
    peerId;
    replicaMap;
    constructor(){
        logger3.debug("constructor");
        this.replicaMap = new SuperbusMap();
        this.peerId = "peer:" + randomId();
    }
    hasShare(share) {
        return this.replicaMap.has(share);
    }
    shares() {
        const keys = [
            ...this.replicaMap.keys()
        ];
        keys.sort();
        return keys;
    }
    replicas() {
        const keys = [
            ...this.replicaMap.keys()
        ];
        keys.sort();
        return keys.map((key)=>this.replicaMap.get(key)
        );
    }
    size() {
        return this.replicaMap.size;
    }
    getReplica(ws) {
        return this.replicaMap.get(ws);
    }
    async addReplica(replica) {
        logger3.debug(`addReplica(${J2(replica.share)})`);
        if (this.replicaMap.has(replica.share)) {
            logger3.debug(`already had a replica with that share`);
            throw new Error(`Peer.addReplica: already has a replica with share ${J2(replica.share)}.  Don't add another one.`);
        }
        await this.replicaMap.set(replica.share, replica);
        logger3.debug(`    ...addReplica: done`);
    }
    async removeReplicaByShare(share) {
        logger3.debug(`removeReplicaByShare(${J2(share)})`);
        await this.replicaMap.delete(share);
    }
    async removeReplica(replica) {
        const existingReplica = this.replicaMap.get(replica.share);
        if (replica === existingReplica) {
            logger3.debug(`removeReplica(${J2(replica.share)})`);
            await this.removeReplicaByShare(replica.share);
        } else {
            logger3.debug(`removeReplica(${J2(replica.share)}) -- same share but it's a different instance now; ignoring`);
        }
    }
    _httpSyncer = null;
    _websocketSyncer = null;
    _localSyncer = null;
    _targetLocalSyncers = new Map();
    _addOrGetWebsocketSyncer() {
        if (!this._websocketSyncer) {
            this._websocketSyncer = new Syncer(this, (methods)=>{
                return new TransportWebsocketClient({
                    deviceId: this.peerId,
                    methods
                });
            });
        }
        return this._websocketSyncer;
    }
    _addOrGetHttpSyncer() {
        if (!this._httpSyncer) {
            this._httpSyncer = new Syncer(this, (methods)=>{
                return new TransportHttpClient({
                    deviceId: this.peerId,
                    methods
                });
            });
        }
        return this._httpSyncer;
    }
    _addOrGetLocalSyncer() {
        if (!this._localSyncer) {
            this._localSyncer = new Syncer(this, (methods)=>{
                return new TransportLocal({
                    deviceId: this.peerId,
                    methods,
                    description: `Local:${this.peerId}}`
                });
            });
        }
        return this._localSyncer;
    }
    sync(target) {
        try {
            const url = new URL(target);
            if (url.protocol.startsWith("ws")) {
                const websocketSyncer = this._addOrGetWebsocketSyncer();
                const connection = websocketSyncer.transport.addConnection(url.toString());
                return ()=>{
                    connection.close();
                };
            }
            const httpSyncer = this._addOrGetHttpSyncer();
            const connection = httpSyncer.transport.addConnection(url.toString());
            return ()=>{
                connection.close();
            };
        } catch  {
            const localSyncer = this._addOrGetLocalSyncer();
            if (this === target) {
                return ()=>{};
            }
            const maybeExistingSyncer = this._targetLocalSyncers.get(target.peerId);
            if (maybeExistingSyncer) {
                return ()=>{
                    maybeExistingSyncer.close();
                };
            }
            const otherSyncer = new Syncer(target, (methods)=>{
                return new TransportLocal({
                    deviceId: target.peerId,
                    methods,
                    description: target.peerId
                });
            });
            this._targetLocalSyncers.set(target.peerId, otherSyncer);
            localSyncer.transport.addConnection(otherSyncer.transport);
            return ()=>{
                this._targetLocalSyncers.delete(target.peerId);
                otherSyncer.close();
            };
        }
    }
    stopSyncing() {
        if (this._httpSyncer) {
            this._httpSyncer.close();
            this._httpSyncer = null;
        }
        if (this._websocketSyncer) {
            this._websocketSyncer.close();
            this._websocketSyncer = null;
        }
        if (this._localSyncer) {
            this._targetLocalSyncers.forEach((targetSyncer)=>{
                targetSyncer.close();
            });
            this._targetLocalSyncers.clear();
            this._localSyncer.close();
            this._localSyncer = null;
        }
    }
}
export { Peer as Peer };
const DEFAULT_QUERY = {
    historyMode: "latest",
    orderBy: "path ASC",
    startAfter: undefined,
    limit: undefined,
    filter: undefined
};
export { DEFAULT_QUERY as DEFAULT_QUERY };
let logger4 = new Logger("query", "greenBright");
function cleanUpQuery(inputQuery) {
    let query = {
        ...DEFAULT_QUERY,
        ...inputQuery
    };
    let invalidResponse = {
        query: {
            limit: 0
        },
        isValid: false,
        willMatch: "nothing"
    };
    if (query.limit !== undefined && query.limit < 0) {
        logger4.debug("cleanUpQuery: unreasonable limit - returning empty invalid query", invalidResponse);
        return invalidResponse;
    }
    if (query.orderBy?.startsWith("path") && query.startAfter?.localIndex !== undefined) {
        logger4.debug('cleanUpQuery: orderBy is "path" but startAfter is not compatible - returning empty invalid query', invalidResponse);
        return invalidResponse;
    }
    if (query.orderBy?.startsWith("localIndex") && query.startAfter?.path !== undefined) {
        logger4.debug('cleanUpQuery: orderBy is "localIndex" but startAfter is not compatible - returning empty invalid query', invalidResponse);
        return invalidResponse;
    }
    if (query.historyMode !== undefined && query.historyMode !== "all" && query.historyMode !== "latest") {
        logger4.debug(`cleanUpQuery: unknown historyMode ${JSON.stringify(query.historyMode)} - returning empty invalid query`, invalidResponse);
        return invalidResponse;
    }
    if (query.orderBy !== undefined) {
        if ([
            "path ASC",
            "path DESC",
            "localIndex ASC",
            "localIndex DESC"
        ].indexOf(query.orderBy) === -1) {
            logger4.debug(`cleanUpQuery: unrecognized orderBy value ${JSON.stringify(query.orderBy)} - returning empty invalid query`, invalidResponse);
            return invalidResponse;
        }
    }
    let willMatch = query.historyMode === "all" ? "all" : "all-latest";
    if (query.filter !== undefined && !w(query.filter, {})) {
        willMatch = "some";
    }
    if (query.startAfter !== undefined && !w(query.startAfter, {})) {
        willMatch = "some";
    }
    if (query.limit !== undefined) {
        if (query.limit > 0) willMatch = "some";
        if (query.limit === 0) willMatch = "nothing";
    }
    if (query.filter !== undefined) {
        let filter = query.filter;
        if (filter.path && filter.pathStartsWith && !filter.path.startsWith(filter.pathStartsWith)) {
            willMatch = "nothing";
        }
        if (filter.path && filter.pathEndsWith && !filter.path.endsWith(filter.pathEndsWith)) {
            willMatch = "nothing";
        }
        if (filter.timestamp && filter.timestampGt && !(filter.timestamp > filter.timestampGt)) {
            willMatch = "nothing";
        }
        if (filter.timestamp && filter.timestampLt && !(filter.timestamp < filter.timestampLt)) {
            willMatch = "nothing";
        }
        if (filter.timestampGt && filter.timestampLt && !(filter.timestampLt + 1 < filter.timestampGt)) {
            willMatch = "nothing";
        }
        if (filter.contentLength && filter.contentLengthGt && !(filter.contentLength > filter.contentLengthGt)) {
            willMatch = "nothing";
        }
        if (filter.contentLength && filter.contentLengthLt && !(filter.contentLength < filter.contentLengthLt)) {
            willMatch = "nothing";
        }
        if (filter.contentLengthGt && filter.contentLengthLt && !(filter.contentLengthLt + 1 < filter.contentLengthGt)) {
            willMatch = "nothing";
        }
    }
    if (willMatch === "nothing") {
        let nopQuery = {
            query: {
                limit: 0
            },
            isValid: true,
            willMatch: "nothing"
        };
        logger4.debug(`cleanUpQuery - this query will match nothing, so returning a simpler query that also matches nothing`, nopQuery);
        return nopQuery;
    }
    logger4.debug(`cleanUpQuery - query is ok!  willMatch = ${willMatch}`);
    return {
        query,
        isValid: true,
        willMatch
    };
}
function docMatchesFilter(doc, filter) {
    if (filter.path !== undefined && doc.path !== filter.path) return false;
    if (filter.pathStartsWith !== undefined && !doc.path.startsWith(filter.pathStartsWith)) {
        return false;
    }
    if (filter.pathEndsWith !== undefined && !doc.path.endsWith(filter.pathEndsWith)) {
        return false;
    }
    if (filter.author !== undefined && doc.author !== filter.author) {
        return false;
    }
    if (filter.timestamp !== undefined && doc.timestamp !== filter.timestamp) {
        return false;
    }
    if (filter.timestampGt !== undefined && !(doc.timestamp > filter.timestampGt)) {
        return false;
    }
    if (filter.timestampLt !== undefined && !(doc.timestamp < filter.timestampLt)) {
        return false;
    }
    let contentLength = stringLengthInBytes(doc.content);
    if (filter.contentLength !== undefined && contentLength !== filter.contentLength) {
        return false;
    }
    if (filter.contentLengthGt !== undefined && !(contentLength > filter.contentLengthGt)) {
        return false;
    }
    if (filter.contentLengthLt !== undefined && !(contentLength < filter.contentLengthLt)) {
        return false;
    }
    return true;
}
export { cleanUpQuery as cleanUpQuery };
export { docMatchesFilter as docMatchesFilter };
new Logger("query helpers", "yellowBright");
const escapeRegex = /[.*+?^${}()|[\]\\]/g;
function escapeStringForRegex(s24) {
    return s24.replace(escapeRegex, "\\$&");
}
let _matchAll = (re, str)=>{
    if (re.flags.indexOf("g") === -1) {
        throw new TypeError('matchAll requires a regex with the "g" flag set');
    }
    let matches = [];
    let m8;
    while((m8 = re.exec(str)) !== null){
        matches.push(m8);
    }
    return matches;
};
let globToRegex = (glob, forceEntireMatch = true)=>{
    if (glob.indexOf("***") !== -1) {
        throw new ValidationError("invalid glob query has three stars in a row: " + glob);
    }
    let regex = replaceAll(glob, "**", ";");
    regex = replaceAll(regex, "*", "#");
    regex = escapeStringForRegex(regex);
    regex = replaceAll(regex, ";", ".*");
    regex = replaceAll(regex, "#", "[^/]*");
    if (forceEntireMatch) {
        regex = "^" + regex + "$";
    }
    return regex;
};
let globToQueryAndRegex = (glob)=>{
    if (glob.indexOf("*") === -1) {
        return {
            query: {
                filter: {
                    path: glob
                }
            },
            regex: null
        };
    }
    let globParts = glob.split("*");
    let firstPart = globParts[0];
    let lastPart = globParts[globParts.length - 1];
    let filter = {};
    let query = {};
    if (firstPart) filter.pathStartsWith = firstPart;
    if (lastPart) filter.pathEndsWith = lastPart;
    let regex = "?";
    if (globParts.length === 3) {
        let [a34, b19, c] = globParts;
        if (a34 === "" && b19 === "") regex = null;
        if (b19 === "" && c === "") regex = null;
    }
    if (regex === "?") {
        regex = globToRegex(glob);
    }
    if (!isObjectEmpty(filter)) {
        query.filter = filter;
    }
    return {
        query,
        regex
    };
};
let queryByGlobAsync = async (replica, glob, moreQueryOptions = {})=>{
    let { query , regex  } = globToQueryAndRegex(glob);
    query = {
        ...query,
        ...moreQueryOptions
    };
    let docs = await replica.queryDocs(query);
    if (regex !== null) {
        let re = new RegExp(regex);
        docs = docs.filter((doc)=>re.test(doc.path)
        );
    }
    return docs;
};
function parseTemplate(template) {
    if (template.indexOf("}{") !== -1) {
        throw new ValidationError("template is not allowed to have to adjacent variables {like}{this}");
    }
    if (template.indexOf("*{") !== -1 || template.indexOf("}*") !== -1) {
        throw new ValidationError("template cannot have a star touching a variable *{likeThis}");
    }
    let numLBrackets = countChars(template, "{");
    let numRBrackets = countChars(template, "}");
    if (numLBrackets !== numRBrackets) {
        throw new ValidationError("unbalanced curly braces");
    }
    let bracketVarRe = /\{(.*?)\}/g;
    let validVarName = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
    let varMatches = _matchAll(bracketVarRe, template);
    let varNames = varMatches.map((match)=>match[1]
    );
    for (let varName of varNames){
        if (!validVarName.test(varName)) {
            throw new ValidationError("variable name in template is not valid.  can only contain alphanumeric and underscore, and not start with number");
        }
    }
    if (numLBrackets !== varNames.length || numRBrackets !== varNames.length) {
        throw new ValidationError("weird curly brace mismatch, maybe }backwards{");
    }
    let varNamesSet = new Set(varNames);
    if (varNamesSet.size !== varNames.length) {
        throw new ValidationError("variable names may not be repeated");
    }
    let glob = template.replace(bracketVarRe, "*");
    let parts = [];
    if (varMatches.length === 0) {
        parts.push(globToRegex(template, false));
    }
    for(let ii = 0; ii < varMatches.length; ii++){
        let bracketMatch = varMatches[ii];
        let varName = bracketMatch[1];
        let matchStart = bracketMatch.index;
        let matchEnd = bracketMatch.index + bracketMatch[0].length;
        if (ii === 0) {
            let begin = template.slice(0, matchStart);
            parts.push(globToRegex(begin, false));
        }
        let reForThisVariable = "(?<" + varName + ">[^/]*)";
        parts.push(reForThisVariable);
        if (ii <= varMatches.length - 2) {
            let nextMatch = varMatches[ii + 1];
            let between = template.slice(matchEnd, nextMatch.index);
            parts.push(globToRegex(between, false));
        } else {
            let end = template.slice(matchEnd);
            parts.push(globToRegex(end, false));
        }
    }
    let namedCaptureRegex = "^" + parts.join("") + "$";
    return {
        template,
        varNames,
        glob,
        namedCaptureRegex
    };
}
let extractTemplateVariablesFromPathUsingRegex = (namedCaptureRegex, path)=>{
    const matches2 = path.match(new RegExp(namedCaptureRegex));
    if (matches2 === null) return null;
    return {
        ...matches2.groups
    };
};
let extractTemplateVariablesFromPath = (template, path)=>{
    if (template.indexOf("{") === -1 && template.indexOf("}") === -1) {
        return template === path ? {} : null;
    }
    let { namedCaptureRegex  } = parseTemplate(template);
    return extractTemplateVariablesFromPathUsingRegex(namedCaptureRegex, path);
};
let insertVariablesIntoTemplate = (vars, template)=>{
    for (let [varName, value] of Object.entries(vars)){
        template = template.replace("{" + varName + "}", value);
    }
    return template;
};
let queryByTemplateAsync = async (replica, template, moreQueryOptions = {})=>{
    let { glob  } = parseTemplate(template);
    let { query , regex  } = globToQueryAndRegex(glob);
    query = {
        ...query,
        ...moreQueryOptions
    };
    let docs = await replica.queryDocs(query);
    if (regex != null) {
        let re = new RegExp(regex);
        docs = docs.filter((doc)=>re.test(doc.path)
        );
    }
    return docs;
};
export { escapeStringForRegex as escapeStringForRegex };
export { _matchAll as _matchAll };
export { globToRegex as globToRegex };
export { globToQueryAndRegex as globToQueryAndRegex };
export { queryByGlobAsync as queryByGlobAsync };
export { parseTemplate as parseTemplate };
export { extractTemplateVariablesFromPathUsingRegex as extractTemplateVariablesFromPathUsingRegex };
export { extractTemplateVariablesFromPath as extractTemplateVariablesFromPath };
export { insertVariablesIntoTemplate as insertVariablesIntoTemplate };
export { queryByTemplateAsync as queryByTemplateAsync };
let logger5 = new Logger("QueryFollower", "redBright");
let loggerSub = new Logger("QueryFollowerSub", "red");
let J3 = JSON.stringify;
class QueryFollower {
    replica;
    query;
    bus;
    _state = "new";
    _unsub = null;
    constructor(replica, query){
        logger5.debug("constructor");
        this.replica = replica;
        this.query = cloneDeep(query);
        this.bus = new Simplebus();
        logger5.debug("...enforcing rules on supported queries");
        if (query.historyMode !== "all") {
            throw new NotImplementedError(`QueryFollower historyMode must be 'all'`);
        }
        if (query.orderBy !== "localIndex ASC") {
            throw new NotImplementedError(`QueryFollower orderBy must be 'localIndex ASC'`);
        }
        if (query.limit !== undefined) {
            throw new NotImplementedError(`QueryFollower must not have a limit`);
        }
    }
    _expectState(states) {
        if (states.indexOf(this._state) === -1) {
            throw new Error(`QueryFollower expected state to be one of ${J3(states)} but instead found ${this._state}`);
        }
    }
    state() {
        logger5.debug("state() => " + this._state);
        return this._state;
    }
    async hatch() {
        logger5.debug("hatch...");
        this._expectState([
            "new"
        ]);
        logger5.debug("...hatch: calling _catchUp");
        await this._catchUp();
        this._expectState([
            "closed",
            "error",
            "live"
        ]);
        logger5.debug("...hatch: done calling _catchUp");
        logger5.debug(`...hatch: state is "${this._state}"`);
        logger5.debug(`...hatch is done`);
    }
    async _catchUp() {
        logger5.debug("_catchUp...");
        this._expectState([
            "new"
        ]);
        let storage = this.replica;
        let driver = this.replica.replicaDriver;
        let query = this.query;
        if (query.startAfter === undefined) {
            logger5.debug(`..._catchUp was not needed becaue startAfter is undefined, so we're going right to live mode.`);
            this._state = "live";
            let idleEvent = {
                kind: "idle"
            };
            await this.bus.send(idleEvent);
            this._subscribe();
            return;
        }
        this._state = "catching-up";
        logger5.debug(`QueryFollower has a startAfter already; catching up.`);
        while(true){
            let asOf1 = -100;
            let asOf2 = -100;
            let asOf3 = -100;
            let maxReturned = -100;
            try {
                asOf1 = driver.getMaxLocalIndex();
                logger5.debug(`...at ${asOf1}, started querying for existing docs`);
                let existingDocs = await storage.queryDocs(query);
                for (let doc of existingDocs){
                    maxReturned = Math.max(maxReturned, doc._localIndex ?? -1);
                }
                asOf2 = driver.getMaxLocalIndex();
                logger5.debug(`...at ${asOf2}, got ${existingDocs.length} existing docs`);
                logger5.debug(`...sending docs to bus...`);
                for (let doc1 of existingDocs){
                    let event = {
                        kind: "existing",
                        maxLocalIndex: asOf2,
                        doc: doc1
                    };
                    await this.bus.send(event);
                }
                asOf3 = driver.getMaxLocalIndex();
                logger5.debug(`...at ${asOf3}, finished running ${existingDocs.length} callbacks for existing docs`);
            } catch (err) {
                if (err instanceof ReplicaIsClosedError) {
                    logger5.debug(`storage was closed while we were catching up, oh well.`);
                    this.close();
                } else {
                    this._state = "error";
                    throw err;
                }
            }
            let asOfSummary = `( asOf: ${asOf1} [query] ${asOf2} [callbacks] ${asOf3}.  maxReturned: ${maxReturned} )`;
            logger5.debug(`...query and callback summary: ${asOfSummary}`);
            if (asOf1 === asOf3) {
                logger5.debug(`...asOf stayed at ${asOf1} so nothing new has happened since we did the query, so we can stop catching up now.`);
                logger5.debug(`...setting startAfter to localIndex: ${asOf1}`);
                query.startAfter = {
                    localIndex: asOf1
                };
                this._state = "live";
                let idleEvent = {
                    kind: "idle"
                };
                await this.bus.send(idleEvent);
                this._subscribe();
                break;
            } else {
                logger5.debug(`...asOf went from ${asOf1} to ${asOf3} so changes happened since we did our query; gotta query again to get those changes.`);
                logger5.debug(`...setting startAfter to localIndex: ${maxReturned} which is the max returned doc we saw.`);
                query.startAfter = {
                    localIndex: maxReturned
                };
                await sleep1(10);
            }
        }
        logger5.debug(`..._catchUp is done, we should now be live: '${this.state()}'`);
        this._expectState([
            "live"
        ]);
    }
    _subscribe() {
        logger5.debug("_subscribe...");
        this._expectState([
            "live"
        ]);
        let driver = this.replica.replicaDriver;
        let query = this.query;
        let queryFilter = query.filter || {};
        let queryStartAfter = driver.getMaxLocalIndex();
        if (query.startAfter !== undefined && query.startAfter.localIndex !== undefined) {
            queryStartAfter = query.startAfter.localIndex;
        }
        logger5.debug(`QueryFollower is switching to subscription mode:`);
        logger5.debug(`...queryFilter: ${J3(queryFilter)}`);
        logger5.debug(`...start paying attention after local index ${queryStartAfter}.  subscribing...`);
        this._unsub = this.replica.bus.on("*", async (channel, data)=>{
            this._expectState([
                "live"
            ]);
            loggerSub.debug(`--- QueryFollower subscription: got an event on channel ${channel}`);
            let event = data;
            if (channel === "willClose") {
                let event = {
                    kind: "willClose",
                    maxLocalIndex: driver.getMaxLocalIndex()
                };
                await this.bus.send(event);
            } else if (channel === "didClose") {
                let event = {
                    kind: "didClose"
                };
                loggerSub.debug("storage did close.  sending that event...");
                await this.bus.send(event);
                loggerSub.debug("storage did close.  ...and closing the queryFollower...");
                await this.close();
                loggerSub.debug("storage did close.  ...done.");
            } else if (data === undefined || data.kind === undefined) {
                loggerSub.error("weird event on channel ", channel);
                return;
            } else if (event.kind === "success") {
                loggerSub.debug(`--- it's a write success.  do we care?`);
                let doc_li = event.doc._localIndex ?? -1;
                let query_sa = queryStartAfter;
                if (doc_li <= query_sa) {
                    loggerSub.debug(`--- don't care; localIndex is old (doc.localIndex ${doc_li} <= queryStartAfter ${query_sa})`);
                } else {
                    if (!docMatchesFilter(event.doc, queryFilter)) {
                        loggerSub.debug(`--- don't care; filter doesn't match`);
                    } else {
                        loggerSub.debug(`--- we care! filter matches (if there is one) and doc.localIndex comes after query.startAt.`);
                        loggerSub.debug(`--- running callback blockingly...`);
                        await this.bus.send(event);
                        loggerSub.debug(`--- ...done running callback`);
                    }
                }
            } else if (event.kind === "failure") {
                loggerSub.debug(`--- ingest failure event`);
                await this.bus.send(event);
            } else if (event.kind === "nothing_happened") {
                loggerSub.debug(`--- nothing happened event`);
                await this.bus.send(event);
            } else {
                loggerSub.debug(`--- WARNING: unknown event type event`);
                console.warn("this should never happen:", event);
                console.warn("this should never happen: unrecognised kind of LiveQueryEvent: " + event.kind);
            }
        });
    }
    async close() {
        if (this._state === "closed") return;
        logger5.debug("close...");
        this._state = "closed";
        if (this._unsub) this._unsub;
        let event = {
            kind: "queryFollowerDidClose"
        };
        await this.bus.send(event);
        logger5.debug("...close is done.");
        return Promise.resolve();
    }
}
export { QueryFollower as QueryFollower };
const J4 = JSON.stringify;
const logger6 = new Logger("replica", "yellowBright");
const loggerSet = new Logger("replica set", "yellowBright");
const loggerIngest = new Logger("replica ingest", "yellowBright");
function docCompareNewestFirst(a35, b20) {
    return compareArrays([
        a35.timestamp,
        a35.signature
    ], [
        b20.timestamp,
        a35.signature
    ], [
        "DESC",
        "ASC"
    ]);
}
class Replica {
    replicaId;
    share;
    formatValidator;
    replicaDriver;
    bus;
    _isClosed = false;
    _ingestLock;
    constructor(share, validator, driver){
        const addressIsValidResult = checkShareIsValid(share);
        if (isErr(addressIsValidResult)) {
            throw addressIsValidResult;
        }
        logger6.debug(`constructor.  driver = ${driver?.constructor?.name}`);
        this.replicaId = "replica-" + randomId();
        this.share = share;
        this.formatValidator = validator;
        this.replicaDriver = driver;
        this.bus = new Superbus("|");
        this._ingestLock = new Lock();
    }
    isClosed() {
        return this._isClosed;
    }
    async close(erase) {
        logger6.debug("closing...");
        if (this._isClosed) throw new ReplicaIsClosedError();
        logger6.debug("    sending willClose blockingly...");
        await this.bus.sendAndWait("willClose");
        logger6.debug("    marking self as closed...");
        this._isClosed = true;
        logger6.debug(`    closing ReplicaDriver (erase = ${erase})...`);
        await this.replicaDriver.close(erase);
        logger6.debug("    sending didClose nonblockingly...");
        await this.bus.sendAndWait("didClose");
        logger6.debug("...closing done");
        return Promise.resolve();
    }
    async getConfig(key) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        return await this.replicaDriver.getConfig(key);
    }
    async setConfig(key, value) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        return await this.replicaDriver.setConfig(key, value);
    }
    async listConfigKeys() {
        if (this._isClosed) throw new ReplicaIsClosedError();
        return await this.replicaDriver.listConfigKeys();
    }
    async deleteConfig(key) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        return await this.replicaDriver.deleteConfig(key);
    }
    getMaxLocalIndex() {
        if (this._isClosed) throw new ReplicaIsClosedError();
        return this.replicaDriver.getMaxLocalIndex();
    }
    async getDocsAfterLocalIndex(historyMode, startAfter, limit) {
        logger6.debug(`getDocsAfterLocalIndex(${historyMode}, ${startAfter}, ${limit})`);
        if (this._isClosed) throw new ReplicaIsClosedError();
        let query = {
            historyMode: historyMode,
            orderBy: "localIndex ASC",
            startAfter: {
                localIndex: startAfter
            },
            limit
        };
        return await this.replicaDriver.queryDocs(query);
    }
    async getAllDocs() {
        logger6.debug(`getAllDocs()`);
        if (this._isClosed) throw new ReplicaIsClosedError();
        return await this.replicaDriver.queryDocs({
            historyMode: "all",
            orderBy: "path ASC"
        });
    }
    async getLatestDocs() {
        logger6.debug(`getLatestDocs()`);
        if (this._isClosed) throw new ReplicaIsClosedError();
        return await this.replicaDriver.queryDocs({
            historyMode: "latest",
            orderBy: "path ASC"
        });
    }
    async getAllDocsAtPath(path) {
        logger6.debug(`getAllDocsAtPath("${path}")`);
        if (this._isClosed) throw new ReplicaIsClosedError();
        return await this.replicaDriver.queryDocs({
            historyMode: "all",
            orderBy: "path ASC",
            filter: {
                path: path
            }
        });
    }
    async getLatestDocAtPath(path) {
        logger6.debug(`getLatestDocsAtPath("${path}")`);
        if (this._isClosed) throw new ReplicaIsClosedError();
        let docs = await this.replicaDriver.queryDocs({
            historyMode: "latest",
            orderBy: "path ASC",
            filter: {
                path: path
            }
        });
        if (docs.length === 0) return undefined;
        return docs[0];
    }
    async queryDocs(query = {}) {
        logger6.debug(`queryDocs`, query);
        if (this._isClosed) throw new ReplicaIsClosedError();
        return await this.replicaDriver.queryDocs(query);
    }
    async set(keypair, docToSet) {
        loggerSet.debug(`set`, docToSet);
        if (this._isClosed) throw new ReplicaIsClosedError();
        loggerSet.debug("...deciding timestamp: getting latest doc at the same path (from any author)");
        let timestamp;
        if (typeof docToSet.timestamp === "number") {
            timestamp = docToSet.timestamp;
            loggerSet.debug("...docToSet already has a timestamp; not changing it from ", timestamp);
        } else {
            let latestDocSamePath = await this.getLatestDocAtPath(docToSet.path);
            if (latestDocSamePath === undefined) {
                timestamp = microsecondNow();
                loggerSet.debug("...no existing latest doc, setting timestamp to now() =", timestamp);
            } else {
                timestamp = Math.max(microsecondNow(), latestDocSamePath.timestamp + 1);
                loggerSet.debug("...existing latest doc found, bumping timestamp to win if needed =", timestamp);
            }
        }
        let doc = {
            format: "es.4",
            author: keypair.address,
            content: docToSet.content,
            contentHash: await Crypto.sha256base32(docToSet.content),
            deleteAfter: docToSet.deleteAfter ?? null,
            path: docToSet.path,
            timestamp,
            workspace: this.share,
            signature: "?"
        };
        loggerSet.debug("...signing doc");
        let signedDoc = await this.formatValidator.signDocument(keypair, doc);
        if (isErr(signedDoc)) {
            return {
                kind: "failure",
                reason: "invalid_document",
                err: signedDoc,
                maxLocalIndex: this.replicaDriver.getMaxLocalIndex()
            };
        }
        loggerSet.debug("...signature =", signedDoc.signature);
        loggerSet.debug("...ingesting");
        loggerSet.debug("-----------------------");
        let ingestEvent = await this.ingest(signedDoc);
        loggerSet.debug("-----------------------");
        loggerSet.debug("...done ingesting");
        loggerSet.debug("...set is done.");
        return ingestEvent;
    }
    async ingest(docToIngest) {
        loggerIngest.debug(`ingest`, docToIngest);
        if (this._isClosed) throw new ReplicaIsClosedError();
        loggerIngest.debug("...removing extra fields");
        let removeResultsOrErr = this.formatValidator.removeExtraFields(docToIngest);
        if (isErr(removeResultsOrErr)) {
            return {
                kind: "failure",
                reason: "invalid_document",
                err: removeResultsOrErr,
                maxLocalIndex: this.replicaDriver.getMaxLocalIndex()
            };
        }
        docToIngest = removeResultsOrErr.doc;
        let extraFields = removeResultsOrErr.extras;
        if (Object.keys(extraFields).length > 0) {
            loggerIngest.debug(`...extra fields found: ${J4(extraFields)}`);
        }
        let docIsValid = this.formatValidator.checkDocumentIsValid(docToIngest);
        if (isErr(docIsValid)) {
            return {
                kind: "failure",
                reason: "invalid_document",
                err: docIsValid,
                maxLocalIndex: this.replicaDriver.getMaxLocalIndex()
            };
        }
        let writeToDriverWithLock = async ()=>{
            loggerIngest.debug(" >> ingest: start of protected region");
            loggerIngest.debug("  > getting other history docs at the same path by any author");
            let existingDocsSamePath = await this.getAllDocsAtPath(docToIngest.path);
            loggerIngest.debug(`  > ...got ${existingDocsSamePath.length}`);
            loggerIngest.debug("  > getting prevLatest and prevSameAuthor");
            let prevLatest = existingDocsSamePath[0] ?? null;
            let prevSameAuthor = existingDocsSamePath.filter((d8)=>d8.author === docToIngest.author
            )[0] ?? null;
            loggerIngest.debug("  > checking if new doc is latest at this path");
            existingDocsSamePath.push(docToIngest);
            existingDocsSamePath.sort(docCompareNewestFirst);
            let isLatest = existingDocsSamePath[0] === docToIngest;
            loggerIngest.debug(`  > ...isLatest: ${isLatest}`);
            if (!isLatest && prevSameAuthor !== null) {
                loggerIngest.debug("  > new doc is not latest and there is another one from the same author...");
                let docComp = docCompareNewestFirst(docToIngest, prevSameAuthor);
                if (docComp === Cmp.GT) {
                    loggerIngest.debug("  > new doc is GT prevSameAuthor, so it is obsolete");
                    return {
                        kind: "nothing_happened",
                        reason: "obsolete_from_same_author",
                        doc: docToIngest,
                        maxLocalIndex: this.replicaDriver.getMaxLocalIndex()
                    };
                }
                if (docComp === Cmp.EQ) {
                    loggerIngest.debug("  > new doc is EQ prevSameAuthor, so it is redundant (already_had_it)");
                    return {
                        kind: "nothing_happened",
                        reason: "already_had_it",
                        doc: docToIngest,
                        maxLocalIndex: this.replicaDriver.getMaxLocalIndex()
                    };
                }
            }
            loggerIngest.debug("  > upserting into ReplicaDriver...");
            let docAsWritten = await this.replicaDriver.upsert(docToIngest);
            loggerIngest.debug("  > ...done upserting into ReplicaDriver");
            loggerIngest.debug("  > ...getting ReplicaDriver maxLocalIndex...");
            let maxLocalIndex = this.replicaDriver.getMaxLocalIndex();
            loggerIngest.debug(" >> ingest: end of protected region, returning a WriteEvent from the lock");
            return {
                kind: "success",
                maxLocalIndex,
                doc: docAsWritten,
                docIsLatest: isLatest,
                prevDocFromSameAuthor: prevSameAuthor,
                prevLatestDoc: prevLatest
            };
        };
        loggerIngest.debug(" >> ingest: running protected region...");
        let ingestEvent = await this._ingestLock.run(writeToDriverWithLock);
        loggerIngest.debug(" >> ingest: ...done running protected region");
        loggerIngest.debug("...send ingest event after releasing the lock");
        loggerIngest.debug("...ingest event:", ingestEvent);
        await this.bus.sendAndWait(`ingest|${docToIngest.path}`, ingestEvent);
        return ingestEvent;
    }
    async overwriteAllDocsByAuthor(keypair) {
        logger6.debug(`overwriteAllDocsByAuthor("${keypair.address}")`);
        if (this._isClosed) throw new ReplicaIsClosedError();
        const docsToOverwrite = await this.queryDocs({
            filter: {
                author: keypair.address
            },
            historyMode: "all"
        });
        logger6.debug(`    ...found ${docsToOverwrite.length} docs to overwrite`);
        let numOverwritten = 0;
        let numAlreadyEmpty = 0;
        for (const doc of docsToOverwrite){
            if (doc.content.length === 0) {
                numAlreadyEmpty += 1;
                continue;
            }
            const cleanedResult = this.formatValidator.removeExtraFields(doc);
            if (isErr(cleanedResult)) return cleanedResult;
            const cleanedDoc = cleanedResult.doc;
            const emptyDoc = {
                ...cleanedDoc,
                content: "",
                contentHash: await Crypto.sha256base32(""),
                timestamp: doc.timestamp + 1,
                signature: "?"
            };
            const signedDoc = await this.formatValidator.signDocument(keypair, emptyDoc);
            if (isErr(signedDoc)) return signedDoc;
            const ingestEvent = await this.ingest(signedDoc);
            if (ingestEvent.kind === "failure") {
                return new ValidationError("ingestion error during overwriteAllDocsBySameAuthor: " + ingestEvent.reason + ": " + ingestEvent.err);
            }
            if (ingestEvent.kind === "nothing_happened") {
                return new ValidationError("ingestion did nothing during overwriteAllDocsBySameAuthor: " + ingestEvent.reason);
            } else {
                numOverwritten += 1;
            }
        }
        logger6.debug(`    ...done; ${numOverwritten} overwritten to be empty; ${numAlreadyEmpty} were already empty; out of total ${docsToOverwrite.length} docs`);
        return numOverwritten;
    }
}
export { Replica as Replica };
const logger7 = new Logger("replica-cache", "green");
function justLocalIndex({ _localIndex  }) {
    return _localIndex;
}
function sortAndLimit(query, docs) {
    const filteredDocs = [];
    for (const doc of docs){
        if (query.orderBy === "path ASC") {
            if (query.startAfter !== undefined) {
                if (query.startAfter.path !== undefined && doc.path <= query.startAfter.path) {
                    continue;
                }
            }
        }
        if (query.orderBy === "path DESC") {
            if (query.startAfter !== undefined) {
                if (query.startAfter.path !== undefined && doc.path >= query.startAfter.path) {
                    continue;
                }
            }
        }
        if (query.orderBy === "localIndex ASC") {
            if (query.startAfter !== undefined) {
                if (query.startAfter.localIndex !== undefined && (doc._localIndex || 0) <= query.startAfter.localIndex) {
                    continue;
                }
            }
        }
        if (query.orderBy === "localIndex DESC") {
            if (query.startAfter !== undefined) {
                if (query.startAfter.localIndex !== undefined && (doc._localIndex || 0) >= query.startAfter.localIndex) {
                    continue;
                }
            }
        }
        filteredDocs.push(doc);
        if (query.limit !== undefined && filteredDocs.length >= query.limit) {
            break;
        }
    }
    return filteredDocs;
}
class ReplicaCache {
    version = 0;
    _replica;
    _docCache = new Map();
    _timeToLive;
    _onCacheUpdatedCallbacks = new Set();
    _isClosed = false;
    _onFireCacheUpdatedsWrapper = (cb)=>cb()
    ;
    constructor(replica, timeToLive, onCacheUpdatedWrapper){
        this._replica = replica;
        this._timeToLive = timeToLive || 1000;
        if (onCacheUpdatedWrapper) {
            this._onFireCacheUpdatedsWrapper = onCacheUpdatedWrapper;
        }
    }
    async close() {
        if (this._isClosed) throw new ReplicaCacheIsClosedError();
        this._isClosed = true;
        await Promise.all(Array.from(this._docCache.values()).map((entry)=>entry.follower.close
        ));
        this._docCache.clear();
    }
    isClosed() {
        return this._isClosed;
    }
    set(keypair, docToSet) {
        if (this._isClosed) throw new ReplicaCacheIsClosedError();
        return this._replica.set(keypair, docToSet);
    }
    getAllDocs() {
        if (this._isClosed) throw new ReplicaCacheIsClosedError();
        if (this._replica.isClosed()) {
            throw new ReplicaIsClosedError();
        }
        return this.queryDocs({
            historyMode: "all",
            orderBy: "path DESC"
        });
    }
    getLatestDocs() {
        if (this._isClosed) throw new ReplicaCacheIsClosedError();
        if (this._replica.isClosed()) {
            throw new ReplicaIsClosedError();
        }
        return this.queryDocs({
            historyMode: "latest",
            orderBy: "path DESC"
        });
    }
    getAllDocsAtPath(path) {
        if (this._isClosed) throw new ReplicaCacheIsClosedError();
        if (this._replica.isClosed()) {
            throw new ReplicaIsClosedError();
        }
        return this.queryDocs({
            historyMode: "all",
            orderBy: "path DESC",
            filter: {
                path: path
            }
        });
    }
    getLatestDocAtPath(path) {
        if (this._isClosed) throw new ReplicaCacheIsClosedError();
        if (this._replica.isClosed()) {
            throw new ReplicaIsClosedError();
        }
        const docs = this.queryDocs({
            historyMode: "latest",
            orderBy: "path DESC",
            filter: {
                path: path
            }
        });
        if (docs.length === 0) {
            return undefined;
        }
        return docs[0];
    }
    queryDocs(query = {}) {
        if (this._isClosed) throw new ReplicaCacheIsClosedError();
        if (this._replica.isClosed()) {
            throw new ReplicaIsClosedError();
        }
        const cleanUpQueryResult = cleanUpQuery(query);
        if (cleanUpQueryResult.willMatch === "nothing") {
            return [];
        }
        const queryString = E(cleanUpQueryResult.query);
        const cachedResult = this._docCache.get(queryString);
        if (cachedResult) {
            if (Date.now() > cachedResult.expires) {
                this._replica.queryDocs(query).then((docs)=>{
                    const localIndexes = docs.map(justLocalIndex).sort();
                    const cacheLocalIndexes = cachedResult.docs.map(justLocalIndex).sort();
                    if (w(localIndexes, cacheLocalIndexes)) {
                        return;
                    }
                    this._docCache.set(queryString, {
                        follower: cachedResult.follower,
                        docs,
                        expires: Date.now() + this._timeToLive
                    });
                    logger7.debug("Updated cache because result expired.");
                    this._fireOnCacheUpdateds(queryString);
                });
            }
            return cachedResult.docs;
        }
        const follower = new QueryFollower(this._replica, {
            ...query,
            historyMode: "all",
            orderBy: "localIndex ASC"
        });
        follower.bus.on((event)=>{
            if (event.kind === "existing" || event.kind === "success") {
                logger7.debug({
                    doc: event.doc.path,
                    queryString
                });
                this._updateCache(queryString, event.doc);
            }
        });
        follower.hatch();
        this._docCache.set(queryString, {
            follower,
            docs: [],
            expires: Date.now() + this._timeToLive
        });
        this._replica.queryDocs(query).then((docs)=>{
            this._docCache.set(queryString, {
                follower,
                docs,
                expires: Date.now() + this._timeToLive
            });
            logger7.debug("Updated cache with a new entry.");
            this._fireOnCacheUpdateds(queryString);
        });
        return [];
    }
    overwriteAllDocsByAuthor(keypair) {
        if (this._isClosed) throw new ReplicaCacheIsClosedError();
        if (this._replica.isClosed()) {
            throw new ReplicaIsClosedError();
        }
        return this._replica.overwriteAllDocsByAuthor(keypair);
    }
    _updateCache(key, doc) {
        const entry = this._docCache.get(key);
        if (!entry) {
            return;
        }
        const query = JSON.parse(key);
        const appendDoc = ()=>{
            const nextDocs = [
                ...entry.docs,
                doc
            ];
            this._docCache.set(key, {
                ...entry,
                docs: sortAndLimit(query, nextDocs)
            });
            this._fireOnCacheUpdateds(key);
        };
        const replaceDoc = ({ exact  })=>{
            const nextDocs = entry.docs.map((existingDoc)=>{
                if (exact && existingDoc.path === doc.path && existingDoc.author === doc.author) {
                    return doc;
                } else if (!exact && existingDoc.path === doc.path) {
                    return doc;
                }
                return existingDoc;
            });
            this._docCache.set(key, {
                ...entry,
                docs: sortAndLimit(query, nextDocs)
            });
            this._fireOnCacheUpdateds(key);
        };
        const documentsWithSamePath = entry.docs.filter((existingDoc)=>existingDoc.path === doc.path
        );
        const documentsWithSamePathAndAuthor = entry.docs.filter((existingDoc)=>existingDoc.path === doc.path && existingDoc.author === doc.author
        );
        if (documentsWithSamePath.length === 0) {
            if (query.filter && docMatchesFilter(doc, query.filter) || !query.filter) {
                logger7.debug("Updated cache after appending a doc to a entry with matching filter.");
                appendDoc();
            }
            return;
        }
        const historyMode = query.historyMode || "latest";
        if (historyMode === "all") {
            if (documentsWithSamePathAndAuthor.length === 0) {
                logger7.debug("Updated cache after appending a version of a doc to a historyMode: all query.");
                appendDoc();
                return;
            }
            logger7.debug("Updated cache after replacing a version of a doc in a historyMode: all query.");
            replaceDoc({
                exact: true
            });
            return;
        }
        const latestDoc = documentsWithSamePath[0];
        const docIsDifferent = doc.author !== latestDoc?.author || !w(doc, latestDoc);
        const docIsLater = doc.timestamp > latestDoc.timestamp;
        if (docIsDifferent && docIsLater) {
            logger7.debug("Updated cache after replacing a doc with its latest version.");
            replaceDoc({
                exact: false
            });
            return;
        }
    }
    _fireOnCacheUpdateds(entry) {
        this.version++;
        this._onFireCacheUpdatedsWrapper(()=>{
            this._onCacheUpdatedCallbacks.forEach((cb)=>{
                cb(entry);
            });
        });
    }
    onCacheUpdated(callback) {
        if (this._isClosed) throw new ReplicaCacheIsClosedError();
        if (this._replica.isClosed()) {
            throw new ReplicaIsClosedError();
        }
        this._onCacheUpdatedCallbacks.add(callback);
        return ()=>{
            this._onCacheUpdatedCallbacks.delete(callback);
        };
    }
}
export { ReplicaCache as ReplicaCache };
let logger8 = new Logger("storage driver async memory", "yellow");
function combinePathAndAuthor(doc) {
    return `${doc.path}|${doc.author}`;
}
function docComparePathASCthenNewestFirst(a36, b21) {
    return compareArrays([
        a36.path,
        a36.timestamp,
        a36.signature
    ], [
        b21.path,
        b21.timestamp,
        a36.signature
    ], [
        "ASC",
        "DESC",
        "ASC"
    ]);
}
function docComparePathDESCthenNewestFirst(a37, b22) {
    return compareArrays([
        a37.path,
        a37.timestamp,
        a37.signature
    ], [
        b22.path,
        b22.timestamp,
        a37.signature
    ], [
        "DESC",
        "DESC",
        "ASC"
    ]);
}
class ReplicaDriverMemory {
    share;
    _maxLocalIndex = -1;
    _isClosed = false;
    _configKv = {};
    docByPathAndAuthor = new Map();
    docsByPathNewestFirst = new Map();
    constructor(share){
        logger8.debug("constructor");
        this.share = share;
    }
    isClosed() {
        return this._isClosed;
    }
    close(erase) {
        logger8.debug("close");
        if (this._isClosed) throw new ReplicaIsClosedError();
        if (erase) {
            logger8.debug("...close: and erase");
            this._configKv = {};
            this._maxLocalIndex = -1;
            this.docsByPathNewestFirst.clear();
            this.docByPathAndAuthor.clear();
        }
        this._isClosed = true;
        logger8.debug("...close is done.");
        return Promise.resolve();
    }
    async getConfig(key) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        return this._configKv[key];
    }
    async setConfig(key, value) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        this._configKv[key] = value;
    }
    async listConfigKeys() {
        if (this._isClosed) throw new ReplicaIsClosedError();
        return sortedInPlace(Object.keys(this._configKv));
    }
    async deleteConfig(key) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        let had = key in this._configKv;
        delete this._configKv[key];
        return had;
    }
    getMaxLocalIndex() {
        if (this._isClosed) throw new ReplicaIsClosedError();
        logger8.debug(`getMaxLocalIndex(): it's ${this._maxLocalIndex}`);
        return this._maxLocalIndex;
    }
    async _getAllDocs() {
        if (this._isClosed) throw new ReplicaIsClosedError();
        return [
            ...this.docByPathAndAuthor.values()
        ];
    }
    async _getLatestDocs() {
        if (this._isClosed) throw new ReplicaIsClosedError();
        let docs = [];
        for (let docArray of this.docsByPathNewestFirst.values()){
            docs.push(docArray[0]);
        }
        return docs;
    }
    async queryDocs(queryToClean) {
        logger8.debug("queryDocs", queryToClean);
        if (this._isClosed) throw new ReplicaIsClosedError();
        let { query , willMatch  } = cleanUpQuery(queryToClean);
        logger8.debug(`    cleanUpQuery.  willMatch = ${willMatch}`);
        if (willMatch === "nothing") {
            return [];
        }
        logger8.debug(`    getting docs; historyMode = ${query.historyMode}`);
        let docs = query.historyMode === "all" ? await this._getAllDocs() : await this._getLatestDocs();
        logger8.debug(`    ordering docs: ${query.orderBy}`);
        if (query.orderBy === "path ASC") {
            docs.sort(docComparePathASCthenNewestFirst);
        } else if (query.orderBy === "path DESC") {
            docs.sort(docComparePathDESCthenNewestFirst);
        } else if (query.orderBy === "localIndex ASC") {
            docs.sort(compareByObjKey("_localIndex", "ASC"));
        } else if (query.orderBy === "localIndex DESC") {
            docs.sort(compareByObjKey("_localIndex", "DESC"));
        } else {
            throw new ValidationError("unrecognized query orderBy: " + JSON.stringify(query.orderBy));
        }
        let filteredDocs = [];
        logger8.debug(`    filtering docs`);
        for (let doc of docs){
            if (query.orderBy === "path ASC") {
                if (query.startAfter !== undefined) {
                    if (query.startAfter.path !== undefined && doc.path <= query.startAfter.path) {
                        continue;
                    }
                }
            }
            if (query.orderBy === "path DESC") {
                if (query.startAfter !== undefined) {
                    if (query.startAfter.path !== undefined && doc.path >= query.startAfter.path) {
                        continue;
                    }
                }
            }
            if (query.orderBy === "localIndex ASC") {
                if (query.startAfter !== undefined) {
                    if (query.startAfter.localIndex !== undefined && (doc._localIndex ?? 0) <= query.startAfter.localIndex) {
                        continue;
                    }
                }
            }
            if (query.orderBy === "localIndex DESC") {
                if (query.startAfter !== undefined) {
                    if (query.startAfter.localIndex !== undefined && (doc._localIndex ?? 0) >= query.startAfter.localIndex) {
                        continue;
                    }
                }
            }
            if (query.filter && !docMatchesFilter(doc, query.filter)) continue;
            filteredDocs.push(doc);
            if (query.limit !== undefined && filteredDocs.length >= query.limit) {
                logger8.debug(`    ....hit limit of ${query.limit}`);
                break;
            }
        }
        logger8.debug(`    queryDocs is done: found ${filteredDocs.length} docs.`);
        return filteredDocs;
    }
    upsert(doc) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        doc = {
            ...doc
        };
        this._maxLocalIndex += 1;
        doc._localIndex = this._maxLocalIndex;
        Object.freeze(doc);
        logger8.debug("upsert", doc);
        this.docByPathAndAuthor.set(combinePathAndAuthor(doc), doc);
        let docsByPath = this.docsByPathNewestFirst.get(doc.path) ?? [];
        docsByPath = docsByPath.filter((d9)=>d9.author !== doc.author
        );
        docsByPath.push(doc);
        docsByPath.sort(docComparePathASCthenNewestFirst);
        this.docsByPathNewestFirst.set(doc.path, docsByPath);
        return Promise.resolve(doc);
    }
}
export { ReplicaDriverMemory as ReplicaDriverMemory };
let logger9 = new Logger("storage driver localStorage", "yellowBright");
function isSerializedDriverDocs(value) {
    if (typeof value !== "object") {
        return false;
    }
    return "byPathAndAuthor" in value && "byPathNewestFirst" in value;
}
class ReplicaDriverLocalStorage extends ReplicaDriverMemory {
    _localStorageKeyConfig;
    _localStorageKeyDocs;
    constructor(share){
        super(share);
        logger9.debug("constructor");
        this._localStorageKeyConfig = `stonesoup:config:${share}`;
        this._localStorageKeyDocs = `stonesoup:documents:pathandauthor:${share}`;
        const existingData = localStorage.getItem(this._localStorageKeyDocs);
        if (existingData !== null) {
            logger9.debug("...constructor: loading data from localStorage");
            const parsed = JSON.parse(existingData);
            if (!isSerializedDriverDocs(parsed)) {
                console.warn(`localStorage data could not be parsed for share ${share}`);
                return;
            }
            this.docByPathAndAuthor = new Map(Object.entries(parsed.byPathAndAuthor));
            this.docsByPathNewestFirst = new Map(Object.entries(parsed.byPathNewestFirst));
            const localIndexes = Array.from(this.docByPathAndAuthor.values()).map((doc)=>doc._localIndex
            );
            this._maxLocalIndex = Math.max(...localIndexes);
        } else {
            logger9.debug("...constructor: there was no existing data in localStorage");
        }
        logger9.debug("...constructor is done.");
    }
    close(erase) {
        logger9.debug("close");
        if (this._isClosed) throw new ReplicaIsClosedError();
        if (erase) {
            logger9.debug("...close: and erase");
            this._configKv = {};
            this._maxLocalIndex = -1;
            this.docsByPathNewestFirst.clear();
            this.docByPathAndAuthor.clear();
            logger9.debug("...close: erasing localStorage");
            localStorage.removeItem(this._localStorageKeyDocs);
            for (let key of this._listConfigKeysSync()){
                this._deleteConfigSync(key);
            }
            logger9.debug("...close: erasing is done");
        }
        this._isClosed = true;
        logger9.debug("...close is done.");
        return Promise.resolve();
    }
    _getConfigSync(key) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        key = `${this._localStorageKeyConfig}:${key}`;
        let result = localStorage.getItem(key);
        return result === null ? undefined : result;
    }
    _setConfigSync(key, value) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        key = `${this._localStorageKeyConfig}:${key}`;
        localStorage.setItem(key, value);
    }
    _listConfigKeysSync() {
        if (this._isClosed) throw new ReplicaIsClosedError();
        let keys = Object.keys(localStorage).filter((key)=>key.startsWith(this._localStorageKeyConfig + ":")
        ).map((key)=>key.slice(this._localStorageKeyConfig.length + 1)
        );
        keys.sort();
        return keys;
    }
    _deleteConfigSync(key) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        let hadIt = this._getConfigSync(key);
        key = `${this._localStorageKeyConfig}:${key}`;
        localStorage.removeItem(key);
        return hadIt !== undefined;
    }
    async getConfig(key) {
        return this._getConfigSync(key);
    }
    async setConfig(key, value) {
        return this._setConfigSync(key, value);
    }
    async listConfigKeys() {
        return this._listConfigKeysSync();
    }
    async deleteConfig(key) {
        return this._deleteConfigSync(key);
    }
    async upsert(doc) {
        if (this._isClosed) throw new ReplicaIsClosedError();
        const upsertedDoc = await super.upsert(doc);
        const docsToBeSerialised = {
            byPathAndAuthor: Object.fromEntries(this.docByPathAndAuthor),
            byPathNewestFirst: Object.fromEntries(this.docsByPathNewestFirst)
        };
        localStorage.setItem(this._localStorageKeyDocs, JSON.stringify(docsToBeSerialised));
        return upsertedDoc;
    }
}
const logger10 = new Logger("replica driver indexeddb", "yellowBright");
const DOC_STORE = "documents";
const DOCUMENTS_ID = "allDocs";
const CONFIG_STORE = "config";
class ReplicaDriverIndexedDB extends ReplicaDriverMemory {
    _db = null;
    constructor(share){
        super(share);
        logger10.debug("constructor");
        this.docByPathAndAuthor = new Map();
        this.docsByPathNewestFirst = new Map();
    }
    getIndexedDb() {
        return new Promise((resolve, reject)=>{
            if (this._db) {
                return resolve(this._db);
            }
            if (!window.indexedDB) {
                return reject();
            }
            const request = window.indexedDB.open(`earthstar:share:${this.share}`, 1);
            request.onerror = ()=>{
                logger10.error(`Could not open IndexedDB for ${this.share}`);
                logger10.error(request.error);
                return reject(request.error);
            };
            request.onupgradeneeded = function() {
                const db = request.result;
                db.createObjectStore(DOC_STORE, {
                    keyPath: "id"
                });
                db.createObjectStore(CONFIG_STORE, {
                    keyPath: "key"
                });
            };
            request.onsuccess = ()=>{
                this._db = request.result;
                const transaction = request.result.transaction([
                    DOC_STORE
                ], "readonly");
                const store = transaction.objectStore(DOC_STORE);
                const retrieval = store.get(DOCUMENTS_ID);
                retrieval.onsuccess = ()=>{
                    if (!retrieval.result || !retrieval.result["docs"]) {
                        return resolve(request.result);
                    }
                    const docs = retrieval.result["docs"];
                    this.docByPathAndAuthor = new Map(Object.entries(docs.byPathAndAuthor));
                    this.docsByPathNewestFirst = new Map(Object.entries(docs.byPathNewestFirst));
                    const localIndexes = Array.from(this.docByPathAndAuthor.values()).map((doc)=>doc._localIndex
                    );
                    this._maxLocalIndex = Math.max(...localIndexes);
                    return resolve(request.result);
                };
                retrieval.onerror = ()=>{
                    logger10.debug(`StorageIndexedDB constructing: No existing DB for ${this.share}`);
                    reject();
                };
            };
        });
    }
    async close(erase) {
        logger10.debug("close");
        if (this._isClosed) {
            throw new ReplicaIsClosedError();
        }
        if (erase) {
            logger10.debug("...close: and erase");
            this._configKv = {};
            this._maxLocalIndex = -1;
            this.docsByPathNewestFirst.clear();
            this.docByPathAndAuthor.clear();
            logger10.debug("...close: erasing indexeddb");
            const db = await this.getIndexedDb();
            for (let key of (await this.listConfigKeys())){
                await this.deleteConfig(key);
            }
            const deletion = db.transaction(DOC_STORE, "readwrite").objectStore(DOC_STORE).delete(DOCUMENTS_ID);
            deletion.onsuccess = ()=>{
                logger10.debug("...close: erasing is done");
            };
        }
        this._isClosed = true;
        logger10.debug("...close is done.");
    }
    async getConfig(key) {
        if (this._isClosed) {
            throw new ReplicaIsClosedError();
        }
        const db = await this.getIndexedDb();
        return new Promise((resolve, reject)=>{
            const retrieval = db.transaction(CONFIG_STORE, "readonly").objectStore(CONFIG_STORE).get(key);
            retrieval.onsuccess = ()=>{
                if (!retrieval.result) {
                    return resolve(undefined);
                }
                return resolve(retrieval.result.value);
            };
            retrieval.onerror = ()=>{
                reject(retrieval.error);
            };
        });
    }
    async setConfig(key, value) {
        if (this._isClosed) {
            throw new ReplicaIsClosedError();
        }
        const db = await this.getIndexedDb();
        return new Promise((resolve, reject)=>{
            const set = db.transaction(CONFIG_STORE, "readwrite").objectStore(CONFIG_STORE).put({
                key,
                value
            });
            set.onsuccess = ()=>{
                resolve();
            };
            set.onerror = ()=>{
                reject();
            };
        });
    }
    async listConfigKeys() {
        if (this._isClosed) {
            throw new ReplicaIsClosedError();
        }
        const db = await this.getIndexedDb();
        return new Promise((resolve, reject)=>{
            const getKeys = db.transaction(CONFIG_STORE, "readonly").objectStore(CONFIG_STORE).getAllKeys();
            getKeys.onsuccess = ()=>{
                resolve(getKeys.result.sort());
            };
            getKeys.onerror = ()=>{
                reject();
            };
        });
    }
    async deleteConfig(key) {
        if (this._isClosed) {
            throw new ReplicaIsClosedError();
        }
        const db = await this.getIndexedDb();
        const hadIt = await this.getConfig(key) !== undefined;
        return new Promise((resolve, reject)=>{
            const deletion = db.transaction(CONFIG_STORE, "readwrite").objectStore(CONFIG_STORE).delete(key);
            deletion.onsuccess = ()=>{
                resolve(hadIt);
            };
            deletion.onerror = ()=>{
                reject();
            };
        });
    }
    async queryDocs(query) {
        await this.getIndexedDb();
        const result = await super.queryDocs(query);
        return result;
    }
    async upsert(doc) {
        if (this._isClosed) {
            throw new ReplicaIsClosedError();
        }
        const upsertedDoc = await super.upsert(doc);
        const docs = {
            byPathAndAuthor: Object.fromEntries(this.docByPathAndAuthor),
            byPathNewestFirst: Object.fromEntries(this.docsByPathNewestFirst)
        };
        const db = await this.getIndexedDb();
        return new Promise((resolve, reject)=>{
            const put = db.transaction(DOC_STORE, "readwrite").objectStore(DOC_STORE).put({
                id: DOCUMENTS_ID,
                docs
            });
            put.onsuccess = ()=>{
                resolve(upsertedDoc);
            };
            put.onerror = ()=>{
                reject();
            };
        });
    }
}
export { ReplicaDriverLocalStorage as ReplicaDriverLocalStorage };
export { ReplicaDriverIndexedDB as ReplicaDriverIndexedDB };
