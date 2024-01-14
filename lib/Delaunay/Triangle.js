"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var validate = __importStar(require("../CanvasEffect/validate"));
/*
 * SOURCES
 * math equations: Dan Avila (https://github.com/danthecodingman)
 * light intesity: https://stackoverflow.com/a/31682068/4616986
 */
var Triangle = /** @class */ (function () {
    function Triangle(ctx, light, a, b, c) {
        this.ctx = ctx;
        this.light = light;
        this.a = a;
        this.b = b;
        this.c = c;
        this.color = [255, 255, 255, 1];
        this.hue = this.color;
        this.max = 0.5;
        this.stroke = {};
    }
    Triangle.prototype.init = function (config) {
        if (config.color && validate.color(config.color)) {
            this.color = config.color;
        }
        if (config.max && validate.number(config.max)) {
            if (config.max >= 0 && config.max <= 1) {
                this.max = config.max;
            }
        }
        if (config.stroke) {
            if (validate.color(config.stroke.color)) {
                this.stroke.color = config.stroke.color;
            }
            if (validate.number(config.stroke.width)) {
                this.stroke.width = config.stroke.width;
            }
        }
    };
    Triangle.prototype.update = function (light) {
        this.light = light;
        this.shader();
    };
    Triangle.prototype.render = function () {
        this.ctx.fillStyle = "rgba(".concat(this.hue[0], ",").concat(this.hue[1], ",").concat(this.hue[2], ",").concat(this.hue[3], ")");
        if (this.stroke.color) {
            this.ctx.strokeStyle = "rgba(".concat(this.stroke.color[0], ",").concat(this.stroke.color[1], ",").concat(this.stroke.color[2], ",").concat(this.stroke.color[3], ")");
            if (this.stroke.width) {
                this.ctx.lineWidth = this.stroke.width;
            }
        }
        else {
            this.ctx.strokeStyle = "rgba(".concat(this.hue[0], ",").concat(this.hue[1], ",").concat(this.hue[2], ",").concat(this.hue[3], ")");
        }
        this.ctx.beginPath();
        this.ctx.moveTo(this.a[0], this.a[1]);
        this.ctx.lineTo(this.b[0], this.b[1]);
        this.ctx.lineTo(this.c[0], this.c[1]);
        this.ctx.fill();
        this.ctx.stroke();
    };
    Triangle.prototype.shader = function () {
        var v1 = this.vector(this.a, this.b);
        var v2 = this.vector(this.a, this.c);
        var n = this.cross(v1, v2);
        var un = this.normalize(n);
        var l = this.vector(this.a, this.light);
        var ul = this.normalize(l);
        var dp = this.dotProduct(un, ul);
        var power = 1 - (dp + 1) / 2;
        this.hue = this.shade(this.color, this.getIntensity(power, this.max));
    };
    Triangle.prototype.vector = function (p1, p2) {
        return [
            p2[0] - p1[0],
            p2[1] - p1[1],
            p2[2] - p1[2]
        ];
    };
    Triangle.prototype.cross = function (v1, v2) {
        return [
            (v1[1] * v2[2]) - (v1[2] * v2[1]),
            (v1[2] * v2[0]) - (v1[0] * v2[2]),
            (v1[0] * v2[1]) - (v1[1] * v2[0])
        ];
    };
    Triangle.prototype.normalize = function (v) {
        var m = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        return [v[0] / m, v[1] / m, v[2] / m];
    };
    Triangle.prototype.shade = function (color, i) {
        return [
            Math.floor(color[0] * i),
            Math.floor(color[1] * i),
            Math.floor(color[2] * i),
            color[3]
        ];
    };
    Triangle.prototype.getIntensity = function (power, max) {
        return 1 - max + max * power;
    };
    Triangle.prototype.dotProduct = function (v1, v2) {
        return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
    };
    Triangle.prototype.getCenteroid = function () {
        return [
            (this.a[0] + this.b[0] + this.c[0]) / 3,
            (this.a[1] + this.b[1] + this.c[1]) / 3
        ];
    };
    return Triangle;
}());
exports.default = Triangle;
