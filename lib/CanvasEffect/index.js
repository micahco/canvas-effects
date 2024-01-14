"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var requestAnimationFrame_1 = require("./requestAnimationFrame");
var CanvasEffect = /** @class */ (function () {
    function CanvasEffect(config) {
        this.config = config;
        this.canvas = {};
        this.ctx = {};
        this.delay = 200;
        this.fps = 60;
        this.createCanvas();
        this.setCanvasSize();
    }
    CanvasEffect.prototype.init = function () {
        if (!this.requestId) {
            this.main();
        }
    };
    CanvasEffect.prototype.render = function () {
        this.clear();
    };
    CanvasEffect.prototype.main = function () {
        this.requestId = (0, requestAnimationFrame_1.requestAnimFrame)(this.main.bind(this), this.fps);
        this.update();
        this.render();
    };
    CanvasEffect.prototype.debounce = function () {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
        if (this.timer != null) {
            window.clearTimeout(this.timer);
        }
        this.timer = window.setTimeout(this.resize.bind(this), this.delay);
        this.clear();
    };
    CanvasEffect.prototype.resize = function () {
        this.setCanvasSize();
        this.init();
    };
    CanvasEffect.prototype.clear = function () {
        if (this.ctx != null) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    };
    CanvasEffect.prototype.createCanvas = function () {
        this.canvas = document.createElement('canvas');
        this.canvas.innerHTML = '<a href="https://html.spec.whatwg.org/multipage/canvas.html"><pre><canvas></pre></a>';
        this.ctx = this.canvas.getContext('2d');
    };
    CanvasEffect.prototype.setCanvasSize = function () {
        var width = this.config.width;
        var height = this.config.height;
        var listen = false;
        var isMobile = ('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent));
        if (!isFinite(width) && !isMobile) {
            width = window.innerWidth;
            listen = true;
        }
        if (!isFinite(height) && !isMobile) {
            height = window.innerHeight;
            listen = true;
        }
        if (listen) {
            window.addEventListener('resize', this.debounce.bind(this));
        }
        this.canvas.width = width;
        this.canvas.height = height;
    };
    return CanvasEffect;
}());
exports.default = CanvasEffect;
