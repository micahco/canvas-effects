"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CanvasEffect_1 = require("../CanvasEffect");
var Point_1 = require("./Point");
var Line_1 = require("./Line");
var validate = require("../CanvasEffect/validate");
var Constellations = /** @class */ (function (_super) {
    __extends(Constellations, _super);
    function Constellations(config) {
        var _this = _super.call(this, config) || this;
        _this.complexity;
        _this.lines;
        _this.points;
        _this.seed = 8000;
        _this.init();
        return _this;
    }
    Constellations.prototype.init = function () {
        if (validate.number(this.config.seed)) {
            this.complexity = this.getComplexity(this.config.seed);
        }
        else {
            this.complexity = this.getComplexity(this.seed);
        }
        this.lines = [];
        this.points = [];
        this.generate();
        _super.prototype.init.call(this);
    };
    Constellations.prototype.update = function () {
        for (var p = 0; p < this.complexity; p++) {
            this.points[p].update();
        }
        var l = 0;
        for (var i = 0; i < this.complexity; i++) {
            for (var j = i + 1; j < this.complexity; j++) {
                var x1 = this.points[i].pos[0];
                var y1 = this.points[i].pos[1];
                var x2 = this.points[j].pos[0];
                var y2 = this.points[j].pos[1];
                this.lines[l].update([x1, y1], [x2, y2]);
                l++;
            }
        }
    };
    Constellations.prototype.render = function () {
        _super.prototype.render.call(this);
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].render();
        }
        for (var j = 0; j < this.lines.length; j++) {
            this.lines[j].render();
        }
    };
    Constellations.prototype.generate = function () {
        var k = 0;
        for (var i = 0; i < this.complexity; i++) {
            var x = Math.random() * this.canvas.width;
            var y = Math.random() * this.canvas.height;
            this.points[i] = new Point_1.default(this.ctx, [x, y]);
            this.points[i].init(this.config.point);
            for (var j = i + 1; j < this.complexity; j++) {
                this.lines[k] = new Line_1.default(this.ctx);
                this.lines[k].init(this.config.line);
                k++;
            }
        }
    };
    Constellations.prototype.getComplexity = function (seed) {
        return Math.round(this.canvas.width * this.canvas.height / seed);
    };
    return Constellations;
}(CanvasEffect_1.default));
exports.default = Constellations;
