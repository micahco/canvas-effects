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
		_this.triangles;
		_this.init();
		return _this;
	}

	_createClass(Polygonal, [{
		key: 'getComplexity',
		value: function getComplexity(seed) {
			return Math.round(this.canvas.width * this.canvas.height / seed);
		}
	}, {
		key: 'getRandomArbitrary',
		value: function getRandomArbitrary(max, min) {
			return Math.random() * (max - min) + min;
		}
	}, {
		key: 'triangleHasPeak',
		value: function triangleHasPeak(v, i) {
			var a = void 0;
			var b = void 0;
			switch (i % 3) {
				case 1:
					a = i - 1;
					b = i + 1;
					break;
				case 2:
					a = i - 2;
					b = i - 1;
					break;
				default:
					a = i + 1;
					b = i + 2;
			}
			if (v[a][2] || v[b][2]) {
				return true;
			}
			return false;
		}
	}, {
		key: 'elevate',
		value: function elevate(v) {
			for (var i = 0; i < v.length; i++) {
				if (!v[i][2]) {
					var hasAdjacentPeak = false;
					var j = i;
					do {
						if (v[j] == v[i] && this.triangleHasPeak(v, j)) {
							hasAdjacentPeak = true;
						}
						j++;
					} while (j < v.length && !hasAdjacentPeak);
					for (var k = i; k < v.length; k++) {
						if (v[k] == v[i]) {
							if (!hasAdjacentPeak) {
								v[k][2] = 1;
							} else {
								v[k][2] = 0;
							}
						}
					}
					if (!hasAdjacentPeak) {
						v[i][2] = 1;
					} else {
						v[i][2] = 0;
					}
				}
				console.log(v[i][2]);
			}
			return v;
		}
	}, {
		key: 'triangulate',
		value: function triangulate(p) {
			var d = new _fasterDelaunay2.default(p);
			var t = d.triangulate();
			var v = this.elevate(t);
			var k = 0;
			for (var i = 0; i < t.length; i += 3) {
				this.triangles[k] = new _Triangle2.default(this.ctx, v[i], v[i + 1], v[i + 2]);
				this.triangles[k].init(this.config.triangle);
				k++;
			}
		}
	}, {
		key: 'init',
		value: function init() {
			this.complexity = this.getComplexity(this.config.seed || 12000);
			this.triangles = [];
			var points = [];
			var pad = 200;
			var cw = this.canvas.width + pad * 2;
			var ch = this.canvas.height + pad * 2;
			var iy = ch / Math.round(Math.sqrt(ch * this.complexity / cw));
			var ix = cw / Math.round(this.complexity / Math.sqrt(ch * this.complexity / cw));
			var k = 0;
			for (var y = -pad; y < this.canvas.height + pad; y += iy) {
				for (var x = -pad; x < this.canvas.width + pad; x += ix) {
					points[k] = [this.getRandomArbitrary(x, x + ix), this.getRandomArbitrary(y, y + iy)];
					k++;
				}
			}
			this.triangulate(points);
			_get(Polygonal.prototype.__proto__ || Object.getPrototypeOf(Polygonal.prototype), 'init', this).call(this);
		}
	}, {
		key: 'update',
		value: function update() {
			for (var i = 0; i < this.triangles.length; i++) {
				this.triangles[i].update();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			_get(Polygonal.prototype.__proto__ || Object.getPrototypeOf(Polygonal.prototype), 'render', this).call(this);
			for (var i = 0; i < this.triangles.length; i++) {
				this.triangles[i].render();
			}
		}
	}]);

	return Polygonal;
}(_CanvasEffect3.default);

exports.default = Polygonal;