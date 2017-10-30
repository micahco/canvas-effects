'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validate = require('../CanvasEffect/validate');

var validate = _interopRequireWildcard(_validate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
	function Point(ctx, pos) {
		_classCallCheck(this, Point);

		this.ctx = ctx;
		this.pos = pos;
		this.cw = this.ctx.canvas.width;
		this.ch = this.ctx.canvas.height;
		this.color = [0, 0, 0, 1];
		this.radius = this.getRandomArbitrary(4, 2);
		this.velocity = this.getRandomArbitrary(0.2, 0.1);
		this.theta = this.getRandomTheta();
	}

	_createClass(Point, [{
		key: 'init',
		value: function init(config) {
			if (config) {
				this.color = validate.color(config.color) ? config.color : this.color;
				if (validate.array(config.radius, 2)) {
					if (config.radius[0] > config.radius[1]) {
						this.radius = this.getRandomArbitrary(config.radius[0], config.radius[1]);
					}
				}
				if (validate.array(config.velocity, 2)) {
					if (config.velocity[0] > config.velocity[1]) {
						this.velocity = this.getRandomArbitrary(config.velocity[0], config.velocity[1]);
					}
				}
			}
		}
	}, {
		key: 'update',
		value: function update() {
			if (this.pos[0] <= 0 + this.radius || this.pos[0] >= this.cw - this.radius) {
				this.theta = Math.PI - this.theta;
			}
			if (this.pos[1] <= 0 + this.radius || this.pos[1] >= this.ch - this.radius) {
				this.theta = 2 * Math.PI - this.theta;
			}
			this.pos[0] += Math.cos(this.theta) * this.velocity;
			this.pos[1] += Math.sin(this.theta) * this.velocity;
		}
	}, {
		key: 'render',
		value: function render() {
			this.ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.color[3] + ')';
			this.ctx.beginPath();
			this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
			this.ctx.fill();
		}
	}, {
		key: 'getRandomArbitrary',
		value: function getRandomArbitrary(max, min) {
			return Math.random() * (max - min) + min;
		}
	}, {
		key: 'getRandomTheta',
		value: function getRandomTheta() {
			return Math.random() * 2 * Math.PI;
		}
	}]);

	return Point;
}();

exports.default = Point;