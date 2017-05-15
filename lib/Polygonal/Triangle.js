'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = require('../CanvasEffect/Entity');

var _Entity3 = _interopRequireDefault(_Entity2);

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
		_this.color = [0, 0, 0];
		_this.light = light;
		_this.maxAlpha = 1;
		_this.normal;
		return _this;
	}

	_createClass(Triangle, [{
		key: 'getCrossProduct',
		value: function getCrossProduct(u, v) {
			return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
		}
	}, {
		key: 'getDistance',
		value: function getDistance(u, v) {
			var a = u[0] - v[0];
			var b = u[1] - v[1];
			return Math.sqrt(a * a + b * b);
		}
	}, {
		key: 'getCenteroid',
		value: function getCenteroid() {
			return [(this.a[0] + this.b[0] + this.c[0]) / 3, (this.a[1] + this.b[1] + this.c[1]) / 3];
		}
	}, {
		key: 'isValidRGBA',
		value: function isValidRGBA(array) {
			return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
		}
	}, {
		key: 'setAlpha',
		value: function setAlpha() {
			// credit: @danthecodingman
			this.normal = [(this.b[1] - this.a[1]) * (this.c[2] - this.a[2]) - (this.b[2] - this.a[2]) * (this.c[1] - this.a[1]), (this.b[0] - this.a[0]) * (this.c[2] - this.a[2]) - (this.b[2] - this.a[2]) * (this.c[0] - this.a[0])];
			this.alpha = this.getDistance(this.light, this.normal) / 200 * this.maxAlpha;
		}
	}, {
		key: 'init',
		value: function init(config) {
			if (config.color && this.isValidRGBA(config.color)) {
				this.color = config.color.slice(0, 3);
				this.maxAlpha = config.color[3];
			}
			this.setAlpha();
		}
	}, {
		key: 'update',
		value: function update(light) {
			this.light = light;
			this.setAlpha();
		}
	}, {
		key: 'render',
		value: function render() {
			this.ctx.fillStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.alpha + ')';
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