"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestAnimationFrame_1 = require("./requestAnimationFrame");
var CanvasEffect = (function () {
    function CanvasEffect(config) {
        this.config = config ? config : {};
        this.canvas;
        this.ctx;
        this.delay = 500;
        this.requestId;
        this.timer;
        this.createCanvas();
        this.setCanvasSize();
    }
    CanvasEffect.prototype.init = function () {
        if (!this.requestId) {
            this.main();
        }
    };
    CanvasEffect.prototype.main = function () {
        this.requestId = requestAnimationFrame_1.requestAnimFrame(this.main.bind(this));
        this.update();
        this.render();
    };
    CanvasEffect.prototype.render = function () {
        this.clear();
    };
    CanvasEffect.prototype.debounce = function () {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(this.resize.bind(this), this.delay);
        this.clear();
    };
    CanvasEffect.prototype.resize = function () {
        this.setCanvasSize();
        this.init();
    };
    CanvasEffect.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    CanvasEffect.prototype.createCanvas = function () {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        if (this.config.backgroundColor) {
            this.canvas.style.backgroundColor = this.config.backgroundColor;
        }
        var container = document.querySelector(this.config.container);
        if (container && container.nodeName == 'DIV') {
            container.appendChild(this.canvas);
        }
        else {
            throw new TypeError("Invalid container: " + this.config.container + ".");
        }
    };
    CanvasEffect.prototype.hasValidDimensions = function (w, h) {
        if (typeof w == 'number' || typeof w == 'string') {
            if (typeof w == 'string' && w.slice(-1) != '%') {
                return false;
            }
            return true;
        }
        if (typeof h == 'number' || typeof h == 'string') {
            if (typeof h == 'string' && h.slice(-1) != '%') {
                return false;
            }
            return true;
        }
        return false;
    };
    CanvasEffect.prototype.setCanvasSize = function () {
        var width = this.config.width;
        var height = this.config.height;
        if (this.hasValidDimensions(width, height)) {
            if (typeof width == 'string' || typeof height == 'string') {
                var per = width.slice(0, -1);
                if (typeof width == 'string') {
                    width = (per / 100) * window.innerWidth;
                }
                if (typeof height == 'string') {
                    height = (per / 100) * window.innerHeight;
                }
                window.addEventListener('resize', this.debounce.bind(this));
            }
            this.canvas.width = width;
            this.canvas.height = height;
        }
        else {
            throw new TypeError("Invalid dimensions: " + width + ", " + height + ".");
        }
    };
    return CanvasEffect;
}());
exports.default = CanvasEffect;
