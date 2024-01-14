"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasEffect_1 = __importDefault(require("../CanvasEffect"));
var Triangle_1 = __importDefault(require("./Triangle"));
var validate = __importStar(require("../CanvasEffect/validate"));
var open_simplex_noise_1 = require("open-simplex-noise");
var delaunator_1 = __importDefault(require("delaunator"));
var Delaunay = /** @class */ (function (_super) {
    __extends(Delaunay, _super);
    function Delaunay(config) {
        var _this = _super.call(this, config) || this;
        _this.seed = 16000;
        if (config.seed && validate.number(config.seed)) {
            _this.seed = config.seed;
        }
        _this.apex = _this.getApexHeight();
        _this.complexity = _this.getComplexity(_this.seed);
        _this.light = _this.getLightSource(_this.apex);
        if (!validate.boolean(config.mouse) || config.mouse === true) {
            _this.canvas.addEventListener('mousemove', _this.onMouseMove.bind(_this), false);
        }
        _this.simplex = (0, open_simplex_noise_1.makeNoise2D)(Date.now());
        _this.triangles = [];
        _this.init();
        return _this;
    }
    Delaunay.prototype.init = function () {
        this.generate();
        _super.prototype.init.call(this);
    };
    Delaunay.prototype.update = function () {
        for (var i = 0; i < this.triangles.length; i++) {
            this.triangles[i].update(this.light);
        }
    };
    Delaunay.prototype.render = function () {
        _super.prototype.render.call(this);
        for (var i = 0; i < this.triangles.length; i++) {
            this.triangles[i].render();
        }
    };
    Delaunay.prototype.generate = function () {
        var points = [];
        var pad = (this.canvas.width + this.canvas.height) / 10;
        var cw = Math.floor(this.canvas.width + pad * 2);
        var ch = Math.floor(this.canvas.height + pad * 2);
        var iy = ch / Math.round(Math.sqrt((ch * this.complexity) / cw));
        var ix = cw / Math.round(this.complexity / Math.sqrt((ch * this.complexity) / cw));
        var h = this.apex;
        for (var y = -pad; y < this.canvas.height + pad; y += iy) {
            for (var x = -pad; x < this.canvas.width + pad; x += ix) {
                var px = this.getRandomArbitrary(x, x + ix);
                var py = this.getRandomArbitrary(y, y + iy);
                var pz = ((this.simplex(px, py) + 1) / 2) * h;
                points.push([px, py, pz]);
            }
        }
        points = this.triangulate(points);
        for (var i = 0, j = 0; j < points.length; i++, j += 3) {
            this.triangles[i] = new Triangle_1.default(this.ctx, this.light, points[j], points[j + 1], points[j + 2]);
            this.triangles[i].init(this.config);
        }
    };
    Delaunay.prototype.triangulate = function (points) {
        var tp = [];
        points.forEach(function (p) {
            tp.push(p[0]);
            tp.push(p[1]);
        });
        var d = new delaunator_1.default(tp).triangles;
        var t = [];
        for (var i = 0; i < d.length; i++) {
            t.push(points[d[i]]);
        }
        return t;
    };
    Delaunay.prototype.getLightSource = function (height) {
        return [
            this.canvas.width / 2,
            this.canvas.height / 2,
            height
        ];
    };
    Delaunay.prototype.getApexHeight = function () {
        return (this.canvas.height + this.canvas.width) / 2;
    };
    Delaunay.prototype.getComplexity = function (seed) {
        return Math.floor(this.canvas.width * this.canvas.height / seed);
    };
    Delaunay.prototype.getRandomArbitrary = function (max, min) {
        return Math.random() * (max - min) + min;
    };
    Delaunay.prototype.getCenteroid = function (a, b, c) {
        return [
            (a[0] + b[0] + c[0]) / 3,
            (a[1] + b[1] + c[1]) / 3
        ];
    };
    Delaunay.prototype.getMousePosition = function (e) {
        var rect = this.canvas.getBoundingClientRect();
        return [e.clientX - rect.left, e.clientY - rect.top];
    };
    Delaunay.prototype.onMouseMove = function (e) {
        var pos = this.getMousePosition(e);
        this.light = [pos[0], pos[1], this.light[2]];
    };
    return Delaunay;
}(CanvasEffect_1.default));
exports.default = Delaunay;
