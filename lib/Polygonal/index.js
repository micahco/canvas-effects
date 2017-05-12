'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _CanvasEffect2 = require('../CanvasEffect');

var _CanvasEffect3 = _interopRequireDefault(_CanvasEffect2);

var _Triangle = require('./Triangle');

var _Triangle2 = _interopRequireDefault(_Triangle);

var _fasterDelaunay = require('faster-delaunay');

var _fasterDelaunay2 = _interopRequireDefault(_fasterDelaunay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Polygonal = function (_CanvasEffect) {
	_inherits(Polygonal, _CanvasEffect);

	function Polygonal(config) {
		_classCallCheck(this, Polygonal);

		var _this = _possibleConstructorReturn(this, (Polygonal.__proto__ || Object.getPrototypeOf(Polygonal)).call(this, config));

		_this.complexity;
		_this.minProximity = 100;
		_this.seed = 8000;
		_this.triangles = [];
		_this.verticies = [];
		_this.init();
		return _this;
	}

	_createClass(Polygonal, [{
		key: 'getComplexity',
		value: function getComplexity(seed) {
			return this.canvas.width * this.canvas.height / seed;
		}
	}, {
		key: 'triangulation',
		value: function triangulation(v) {
			var d = new _fasterDelaunay2.default(v);
			var t = d.triangulate();
			var k = 0;
			for (var i = 0; i < t.length; i += 3) {
				this.triangles[k] = new _Triangle2.default(this.ctx, t[i], t[i + 1], t[i + 2]);
				this.triangles[k].init(this.config.triangle);
				k++;
			}
		}
	}, {
		key: 'hasSpacing',
		value: function hasSpacing(x, y) {
			for (var i = 0; i < this.verticies.length; i++) {
				var a = x - this.verticies[i][0];
				var b = y - this.verticies[i][1];
				var c = Math.sqrt(a * a + b * b);
				if (c < this.minProximity) {
					console.log('too close');
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'init',
		value: function init() {
			this.complexity = this.getComplexity(this.config.seed || this.seed);
			var i = 0;
			do {
				var x = Math.random() * this.canvas.width;
				var y = Math.random() * this.canvas.height;
				if (this.hasSpacing(x, y)) {
					var _x = Math.random() * this.canvas.width;
					var _y = Math.random() * this.canvas.height;
					this.verticies[i] = [_x, _y];
					i++;
				}
			} while (i < this.complexity);
			this.triangulation(this.verticies);
			_get(Polygonal.prototype.__proto__ || Object.getPrototypeOf(Polygonal.prototype), 'init', this).call(this);
		}
	}, {
		key: 'update',
		value: function update() {}
	}, {
		key: 'render',
		value: function render() {
			_get(Polygonal.prototype.__proto__ || Object.getPrototypeOf(Polygonal.prototype), 'render', this).call(this);
			for (var j = 0; j < this.triangles.length; j++) {
				this.triangles[j].render();
			}
		}
	}]);

	return Polygonal;
}(_CanvasEffect3.default);

exports.default = Polygonal;