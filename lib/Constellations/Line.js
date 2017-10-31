"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate = require("../CanvasEffect/validate");
var Line = /** @class */ (function () {
    function Line(ctx) {
        this.ctx = ctx;
        this.a;
        this.b;
        this.alpha = 0;
        this.color = [0, 0, 0, 1];
        this.fade = true;
        this.max = 100;
        this.width = 1;
    }
    Line.prototype.init = function (config) {
        if (config) {
            this.color = validate.color(config.color) ? config.color : this.color;
            this.fade = validate.boolean(config.fade) ? config.fade : this.fade;
            this.max = validate.number(config.max) ? config.max : this.max;
            this.width = validate.number(config.width) ? config.width : this.width;
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
            this.ctx.strokeStyle = "rgba(" + this.color[0] + "," + this.color[1] + "," + this.color[2] + "," + this.alpha + ")";
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
