'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validate = require('../CanvasEffect/validate');

var validate = _interopRequireWildcard(_validate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
	function Line(ctx) {
		_classCallCheck(this, Line);

		this.ctx = ctx;
		this.alpha = 0;
		this.color = [0, 0, 0, 1];
		this.fade = true;
		this.max = 100;
		this.width = 1;
	}

	_createClass(Line, [{
		key: 'init',
		value: function init(config) {
			if (config) {
				this.color = validate.color(config.color) ? config.color : this.color;
				this.fade = validate.boolean(config.fade) ? config.fade : this.fade;
				this.max = validate.number(config.max) ? config.max : this.max;
				this.width = validate.number(config.width) ? config.width : this.width;
			}
		}
	}, {
		key: 'update',
		value: function update(a, b) {
			this.a = a;
			this.b = b;
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.getDistance() < this.max) {
				if (this.fade) {
					this.alpha = 1 - this.getDistance() / this.max;
				} else {
					this.alpha = 1;
				}
			} else {
				this.alpha = 0;
			}
			if (this.alpha > 0) {
				this.ctx.strokeStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.alpha + ')';
				this.ctx.lineWidth = this.width;
				this.ctx.beginPath();
				this.ctx.moveTo(this.a[0], this.a[1]);
				this.ctx.lineTo(this.b[0], this.b[1]);
				this.ctx.stroke();
			}
		}
	}, {
		key: 'getDistance',
		value: function getDistance() {
			return Math.sqrt((this.a[0] - this.b[0]) * (this.a[0] - this.b[0]) + (this.a[1] - this.b[1]) * (this.a[1] - this.b[1]));
		}
	}, {
		key: 'isValidRGBA',
		value: function isValidRGBA(array) {
			return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
		}
	}]);

	return Line;
}();

exports.default = Line;