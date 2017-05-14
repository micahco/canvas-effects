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

	function Triangle(ctx, a, b, c) {
		_classCallCheck(this, Triangle);

		var _this = _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, ctx));

		_this.a = a;
		_this.b = b;
		_this.c = c;
		_this.colors = ['#A5A3A4', '#B9B9B9', '#CECCCD', '#FFFFFF'];
		_this.fill;

		return _this;
	}

	_createClass(Triangle, [{
		key: 'getCrossProduct',
		value: function getCrossProduct(u, v) {
			return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
		}
	}, {
		key: 'setColor',
		value: function setColor() {
			var i = (this.b[1] - this.a[1]) * (this.c[2] - this.a[2]) - (this.b[2] - this.a[2]) * (this.c[1] - this.a[1]);
			var j = -((this.b[0] - this.a[0]) * (this.c[2] - this.a[2]) - (this.b[2] - this.a[2]) * (this.c[0] - this.a[0]));
			if (i > 0 && j > 0) {
				this.fill = this.colors[0];
			} else if (i < 0 && j > 0) {
				this.fill = this.colors[1];
			} else if (i < 0 && j < 0) {
				this.fill = this.colors[2];
			} else if (i > 0 && j < 0) {
				this.fill = this.colors[3];
			}
		}
	}, {
		key: 'init',
		value: function init(config) {}
	}, {
		key: 'update',
		value: function update() {}
	}, {
		key: 'render',
		value: function render() {
			this.ctx.fillStyle = this.fill;
			this.ctx.strokeStyle = this.fill;
			this.ctx.lineWidth = 1;
			this.ctx.beginPath();
			this.ctx.moveTo(this.a[0], this.a[1]);
			this.ctx.lineTo(this.b[0], this.b[1]);
			this.ctx.lineTo(this.c[0], this.c[1]);
			this.ctx.fill();
			this.ctx.stroke();
		}
	}]);

	return Triangle;
}(_Entity3.default);

exports.default = Triangle;