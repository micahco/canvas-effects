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

	function Line(ctx, x, y, l, c) {
		_classCallCheck(this, Line);

		var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, ctx));

		_this.x1 = x;
		_this.y1 = y;
		_this.x2;
		_this.y2;
		_this.layer = l;
		_this.layerCount = c;
		_this.alpha = _this.getLayerAlpha();
		_this.color = [0, 0, 0, 1];
		_this.length = _this.getRandomArbitrary(50, 25);
		_this.speed = _this.getRandomArbitrary(2, 1);
		_this.theta = Math.PI / 6;
		_this.width = 5;
		return _this;
	}

	_createClass(Line, [{
		key: 'isValidRGBA',
		value: function isValidRGBA(array) {
			return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
		}
	}, {
		key: 'getLayerAlpha',
		value: function getLayerAlpha() {
			return this.layer / this.layerCount;
		}
	}, {
		key: 'getRandomArbitrary',
		value: function getRandomArbitrary(max, min) {
			return Math.random() * (max - min) + min;
		}
	}, {
		key: 'calculateEndPoint',
		value: function calculateEndPoint() {
			this.x2 = this.x1 + this.length * Math.cos(this.theta);
			this.y2 = this.y1 + this.length * Math.sin(this.theta);
		}
	}, {
		key: 'init',
		value: function init(config) {
			if (config) {
				if (config.color && config.color.length == 4 && this.isValidRGBA(config.color)) {
					this.color = config.color;
				}
				this.max = config.max || this.max;
				this.width = config.width || this.width;
			}
		}
	}, {
		key: 'update',
		value: function update() {
			if (this.x1 < this.cw || this.y1 < this.ch) {
				this.x1 += this.speed * Math.cos(this.theta);
				this.y1 += this.speed * Math.sin(this.theta);
			} else {
				if (Math.random() > 0.5) {
					this.x1 = Math.random() * this.cw;
					this.y1 = -this.length;
				} else {
					this.x1 = -this.length;
					this.y1 = Math.random() * this.ch;
				}
			}
			this.calculateEndPoint();
		}
	}, {
		key: 'render',
		value: function render() {
			this.ctx.strokeStyle = 'rgba(' + this.color[0] + ',' + this.color[1] + ',' + this.color[2] + ',' + this.alpha + ')';
			this.ctx.lineWidth = this.width;
			this.ctx.beginPath();
			this.ctx.moveTo(this.x1, this.y1);
			this.ctx.lineTo(this.x2, this.y2);
			this.ctx.stroke();
		}
	}]);

	return Line;
}(_Entity3.default);

exports.default = Line;