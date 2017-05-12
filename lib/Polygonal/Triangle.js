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
		_this.color = [0, 0, 0, 1];
		_this.width = 1;
		return _this;
	}

	_createClass(Triangle, [{
		key: 'getArea',
		value: function getArea() {
			return Math.abs(0.5 * (this.x1 * (this.y1 - this.y2) + this.x2 * (this.y3 - this.y1) + this.x3 * (this.y1 - this.y2)));
		}
	}, {
		key: 'hasSpacing',
		value: function hasSpacing() {
			return Math.abs(this.x1 - this.x2);
		}
	}, {
		key: 'isValidRGBA',
		value: function isValidRGBA(array) {
			return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
		}
	}, {
		key: 'init',
		value: function init(config) {
			if (config) {
				if (config.color && config.color.length == 4 && this.isValidRGBA(config.color)) {
					this.color = config.color;
				}
				this.width = config.width || this.width;
			}
		}
	}, {
		key: 'update',
		value: function update(a, b, c) {
			this.a = a;
			this.b = b;
			this.c = c;
		}
	}, {
		key: 'render',
		value: function render() {
			this.ctx.strokeStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.color[3] + ')';
			this.ctx.lineWidth = this.width;
			this.ctx.beginPath();
			this.ctx.moveTo(this.a[0], this.a[1]);
			this.ctx.lineTo(this.b[0], this.b[1]);
			this.ctx.lineTo(this.c[0], this.c[1]);
			this.ctx.stroke();
		}
	}]);

	return Triangle;
}(_Entity3.default);

exports.default = Triangle;