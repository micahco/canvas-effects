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

var Line = function (_Entity) {
	_inherits(Line, _Entity);

	function Line(ctx) {
		_classCallCheck(this, Line);

		var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, ctx));

		_this.alpha = 0;
		_this.color = [0, 0, 0, 1];
		_this.fade = true;
		_this.max = 100;
		_this.width = 1;
		return _this;
	}

	_createClass(Line, [{
		key: 'getDistance',
		value: function getDistance() {
			return Math.sqrt((this.a[0] - this.b[0]) * (this.a[0] - this.b[0]) + (this.a[1] - this.b[1]) * (this.a[1] - this.b[1]));
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
				this.fade = config.fade || this.fade;
				this.max = config.max || this.max;
				this.width = config.width || this.width;
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
	}]);

	return Line;
}(_Entity3.default);

exports.default = Line;