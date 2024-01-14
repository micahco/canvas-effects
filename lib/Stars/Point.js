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
var Point = /** @class */ (function () {
    function Point(ctx, pos) {
        this.ctx = ctx;
        this.pos = pos;
        this.cw = this.ctx.canvas.width;
        this.ch = this.ctx.canvas.height;
        this.color = [0, 0, 0, 1];
        this.radius = this.getRandomArbitrary(4, 2);
        this.velocity = this.getRandomArbitrary(0.2, 0.1);
        this.theta = this.getRandomTheta();
    }
    Point.prototype.init = function (config) {
        if (config) {
            if (config.color && validate.color(config.color)) {
                this.color = config.color;
            }
            if (config.radius && validate.array(config.radius, 2)) {
                if (config.radius[0] > config.radius[1]) {
                    this.radius = this.getRandomArbitrary(config.radius[0], config.radius[1]);
                }
            }
            if (config.velocity && validate.array(config.velocity, 2)) {
                if (config.velocity[0] > config.velocity[1]) {
                    this.velocity = this.getRandomArbitrary(config.velocity[0], config.velocity[1]);
                }
            }
        }
    };
    Point.prototype.update = function () {
        if (this.pos[0] <= 0 + this.radius || this.pos[0] >= this.cw - this.radius) {
            this.theta = Math.PI - this.theta;
        }
        if (this.pos[1] <= 0 + this.radius || this.pos[1] >= this.ch - this.radius) {
            this.theta = 2 * Math.PI - this.theta;
        }
        this.pos[0] += Math.cos(this.theta) * this.velocity;
        this.pos[1] += Math.sin(this.theta) * this.velocity;
    };
    Point.prototype.render = function () {
        this.ctx.fillStyle = "rgba(".concat(this.color[0], ",").concat(this.color[1], ",").concat(this.color[2], ",").concat(this.color[3], ")");
        this.ctx.beginPath();
        this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
    };
    Point.prototype.getPosition = function () {
        return this.pos;
    };
    Point.prototype.getRandomArbitrary = function (max, min) {
        return Math.random() * (max - min) + min;
    };
    Point.prototype.getRandomTheta = function () {
        return Math.random() * 2 * Math.PI;
    };
    return Point;
}());
exports.default = Point;
