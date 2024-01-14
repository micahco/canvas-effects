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
var Line = /** @class */ (function () {
    function Line(ctx) {
        this.ctx = ctx;
        this.a = [0, 0];
        this.b = [0, 0];
        this.alpha = 0;
        this.color = [0, 0, 0, 1];
        this.fade = true;
        this.max = 100;
        this.width = 1;
    }
    Line.prototype.init = function (config) {
        if (config) {
            if (config.color && validate.color(config.color)) {
                this.color = config.color;
            }
            if (validate.boolean(config.fade)) {
                this.fade = config.fade;
            }
            if (config.max && validate.number(config.max)) {
                this.max = config.max;
            }
            if (config.width && validate.number(config.width)) {
                this.width = config.width;
            }
        }
    };
    Line.prototype.update = function (a, b) {
        this.a = a;
        this.b = b;
    };
    Line.prototype.render = function () {
        if (this.getDistance() < this.max) {
            if (this.fade) {
                this.alpha = 1 - (this.getDistance() / this.max);
            }
            else {
                this.alpha = this.color[3];
            }
        }
        else {
            this.alpha = 0;
        }
        if (this.alpha > 0) {
            this.ctx.strokeStyle = "rgba(".concat(this.color[0], ",").concat(this.color[1], ",").concat(this.color[2], ",").concat(this.alpha, ")");
            this.ctx.lineWidth = this.width;
            this.ctx.beginPath();
            this.ctx.moveTo(this.a[0], this.a[1]);
            this.ctx.lineTo(this.b[0], this.b[1]);
            this.ctx.stroke();
        }
    };
    Line.prototype.getDistance = function () {
        return Math.sqrt((this.a[0] - this.b[0]) * (this.a[0] - this.b[0]) + (this.a[1] - this.b[1]) * (this.a[1] - this.b[1]));
    };
    return Line;
}());
exports.default = Line;
