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
var Point_1 = __importDefault(require("./Point"));
var Line_1 = __importDefault(require("./Line"));
var validate = __importStar(require("../CanvasEffect/validate"));
var Galileo = /** @class */ (function (_super) {
    __extends(Galileo, _super);
    function Galileo(config) {
        var _this = _super.call(this, config) || this;
        _this.seed = 8000;
        _this.complexity = _this.getComplexity(_this.seed);
        if (config.seed && validate.number(config.seed)) {
            _this.complexity = _this.getComplexity(config.seed);
        }
        _this.lines = [];
        _this.points = [];
        _this.generate();
        _super.prototype.init.call(_this);
        return _this;
    }
    Galileo.prototype.update = function () {
        for (var p = 0; p < this.complexity; p++) {
            this.points[p].update();
        }
        var l = 0;
        for (var i = 0; i < this.complexity; i++) {
            for (var j = i + 1; j < this.complexity; j++) {
                var a = this.points[i].getPosition();
                var b = this.points[j].getPosition();
                this.lines[l].update([a[0], a[1]], [b[0], b[1]]);
                l++;
            }
        }
    };
    Galileo.prototype.render = function () {
        _super.prototype.render.call(this);
        for (var j = 0; j < this.lines.length; j++) {
            this.lines[j].render();
        }
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].render();
        }
    };
    Galileo.prototype.generate = function () {
        var k = 0;
        for (var i = 0; i < this.complexity; i++) {
            var x = Math.random() * this.canvas.width;
            var y = Math.random() * this.canvas.height;
            this.points[i] = new Point_1.default(this.ctx, [x, y]);
            if (this.config.point) {
                this.points[i].init(this.config.point);
            }
            else {
                this.points[i].init();
            }
            for (var j = i + 1; j < this.complexity; j++) {
                this.lines[k] = new Line_1.default(this.ctx);
                if (this.config.line) {
                    this.lines[k].init(this.config.line);
                }
                k++;
            }
        }
    };
    Galileo.prototype.getComplexity = function (seed) {
        return Math.floor(this.canvas.width * this.canvas.height / seed);
    };
    return Galileo;
}(CanvasEffect_1.default));
exports.default = Galileo;
