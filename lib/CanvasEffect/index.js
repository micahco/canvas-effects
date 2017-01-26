'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestAnimationFrame = require('./requestAnimationFrame');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasEffect = function () {
	function CanvasEffect(config) {
		_classCallCheck(this, CanvasEffect);

		if (this.constructor === CanvasEffect) {
			throw new TypeError('Abstract class "CanvasEffect" cannot be instantiated directly.');
		}
		this.config = config ? config : {};
		this.canvas;
		this.ctx;
		this.delay = 250;
		this.requestId;
		this.timer;
		this.createCanvas();
		this.setCanvasSize();
	}

	_createClass(CanvasEffect, [{
		key: 'createCanvas',
		value: function createCanvas() {
			this.canvas = document.createElement('canvas');
			this.ctx = this.canvas.getContext('2d');
			if (this.config.backgroundColor) {
				this.canvas.style.backgroundColor = this.config.backgroundColor;
			}
			var container = document.querySelector(this.config.container);
			if (container && container.nodeName == 'DIV') {
				container.appendChild(this.canvas);
			} else {
				throw new TypeError('Invalid container: ' + this.config.container + '.');
			}
		}
	}, {
		key: 'isValidDimensions',
		value: function isValidDimensions(w, h) {
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
		}
	}, {
		key: 'setCanvasSize',
		value: function setCanvasSize() {
			var width = this.config.width;
			var height = this.config.height;
			if (this.isValidDimensions(width, height)) {
				if (typeof width == 'string' || typeof height == 'string') {
					if (typeof width == 'string') {
						var per = width.slice(0, -1);
						width = per / 100 * window.innerWidth;
					}
					if (typeof height == 'string') {
						var _per = height.slice(0, -1);
						height = _per / 100 * window.innerHeight;
					}
					document.body.style.overflowX = 'hidden';
					window.addEventListener('resize', this.debounce.bind(this));
				}
				this.canvas.width = width;
				this.canvas.height = height;
			} else {
				throw new TypeError('Invalid dimensions: ' + width + ', ' + height + '.');
			}
		}
	}, {
		key: 'debounce',
		value: function debounce() {
			if (this.requestId) {
				cancelAnimationFrame(this.requestId);
				this.requestId = undefined;
			}
			clearTimeout(this.timer);
			this.timer = setTimeout(this.resize.bind(this), this.delay);
			this.clear();
		}
	}, {
		key: 'resize',
		value: function resize() {
			this.setCanvasSize();
			this.init();
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}, {
		key: 'init',
		value: function init() {
			if (!this.requestId) {
				this.main();
			}
		}
	}, {
		key: 'main',
		value: function main() {
			this.requestId = (0, _requestAnimationFrame.requestAnimFrame)(this.main.bind(this));
			this.update();
			this.render();
		}
	}, {
		key: 'update',
		value: function update() {}
	}, {
		key: 'render',
		value: function render() {
			this.clear();
		}
	}]);

	return CanvasEffect;
}();

exports.default = CanvasEffect;