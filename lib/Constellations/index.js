'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _CanvasEffect2 = require('../CanvasEffect');

var _CanvasEffect3 = _interopRequireDefault(_CanvasEffect2);

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

var _Line = require('./Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Constellations = function (_CanvasEffect) {
	_inherits(Constellations, _CanvasEffect);

	function Constellations(el, config) {
		_classCallCheck(this, Constellations);

		var _this = _possibleConstructorReturn(this, (Constellations.__proto__ || Object.getPrototypeOf(Constellations)).call(this, el, config));

		_this.complexity;
		_this.points = [];
		_this.lines = [];
		_this.init();
		return _this;
	}

	_createClass(Constellations, [{
		key: 'getComplexity',
		value: function getComplexity(seed) {
			return this.canvas.width * this.canvas.height / seed;
		}
	}, {
		key: 'init',
		value: function init() {
			this.complexity = this.getComplexity(this.config.seed || 8000);
			this.points.length = 0;
			this.lines.length = 0;
			var k = 0;
			for (var i = 0; i < this.complexity; i++) {
				var x = Math.random() * this.canvas.width;
				var y = Math.random() * this.canvas.height;
				this.points[i] = new _Point2.default(this.ctx, x, y);
				this.points[i].init(this.config.point);
				for (var j = i + 1; j < this.complexity; j++) {
					this.lines[k] = new _Line2.default(this.ctx);
					this.lines[k].init(this.config.line);
					k++;
				}
			}
			_get(Constellations.prototype.__proto__ || Object.getPrototypeOf(Constellations.prototype), 'init', this).call(this);
		}
	}, {
		key: 'update',
		value: function update() {
			for (var p = 0; p < this.complexity; p++) {
				this.points[p].update();
			}
			var l = 0;
			for (var i = 0; i < this.complexity; i++) {
				for (var j = i + 1; j < this.complexity; j++) {
					var x1 = this.points[i].x;
					var y1 = this.points[i].y;
					var x2 = this.points[j].x;
					var y2 = this.points[j].y;
					this.lines[l].update(x1, y1, x2, y2);
					l++;
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			_get(Constellations.prototype.__proto__ || Object.getPrototypeOf(Constellations.prototype), 'render', this).call(this);
			for (var j = 0; j < this.lines.length; j++) {
				this.lines[j].render();
			}
			for (var i = 0; i < this.points.length; i++) {
				this.points[i].render();
			}
		}
	}]);

	return Constellations;
}(_CanvasEffect3.default);

exports.default = Constellations;