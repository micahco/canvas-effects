'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require('../CanvasEffect/Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Triangle = function (_Entity) {
	_inherits(Triangle, _Entity);

	function Triangle(ctx, light, a, b, c) {
		_classCallCheck(this, Triangle);

		var _this = _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, ctx));

		_this.a = a;
		_this.b = b;
		_this.c = c;
		_this.alpha;
		_this.base = [255, 255, 255];
		_this.color;
		_this.light = light;
		_this.maxShade = 0.5;
		_this.normal;
		return _this;
	}

	_createClass(Triangle, [{
		key: 'getCenteroid',
		value: function getCenteroid() {
			return [(this.a[0] + this.b[0] + this.c[0]) / 3, (this.a[1] + this.b[1] + this.c[1]) / 3];
		}
	}, {
		key: 'getDistance',
		value: function getDistance(u, v) {
			var a = u[0] - v[0];
			var b = u[1] - v[1];
			return Math.sqrt(a * a + b * b);
		}
	}, {
		key: 'colorize',
		value: function colorize() {
			// credit: @danthecodingman
			this.normal = [(this.b[1] - this.a[1]) * (this.c[2] - this.a[2]) - (this.b[2] - this.a[2]) * (this.c[1] - this.a[1]), (this.b[0] - this.a[0]) * (this.c[2] - this.a[2]) - (this.b[2] - this.a[2]) * (this.c[0] - this.a[0])];
			var shade = this.maxShade * (this.getDistance(this.light, this.normal) / 200);
			if (this.base.light()) {
				this.color = this.base.darken(shade).string();
			} else {
				this.color = this.base.lighten(shade).string();
			}
		}
	}, {
		key: 'init',
		value: function init(config) {
			this.base = config.color ? (0, _color2.default)(config.color) : (0, _color2.default)(this.base);
			this.maxShade = config.maxShade ? config.maxShade : this.maxShade;
			this.colorize();
		}
	}, {
		key: 'update',
		value: function update(light) {
			this.light = light;
			this.colorize();
		}
	}, {
		key: 'render',
		value: function render() {
			this.ctx.fillStyle = this.color;
			this.ctx.strokeStyle = this.color;
			this.ctx.beginPath();
			this.ctx.moveTo(this.a[0], this.a[1]);
			this.ctx.lineTo(this.b[0], this.b[1]);
			this.ctx.lineTo(this.c[0], this.c[1]);
			this.ctx.fill();
		}
	}]);

	return Triangle;
}(_Entity3.default);

exports.default = Triangle;