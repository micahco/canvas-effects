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

var _Triangle = require('./Triangle');

var _Triangle2 = _interopRequireDefault(_Triangle);

var _fasterDelaunay = require('faster-delaunay');

var _fasterDelaunay2 = _interopRequireDefault(_fasterDelaunay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mosaic = function (_CanvasEffect) {
	_inherits(Mosaic, _CanvasEffect);

	function Mosaic(config) {
		_classCallCheck(this, Mosaic);

		var _this = _possibleConstructorReturn(this, (Mosaic.__proto__ || Object.getPrototypeOf(Mosaic)).call(this, config));

		_this.complexity;
		_this.triangles;
		_this.verticies;
		_this.init();
		return _this;
	}

	_createClass(Mosaic, [{
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
		key: 'triangulation',
		value: function triangulation(v) {
			var d = new _fasterDelaunay2.default(v);
			var t = d.triangulate();
			var k = 0;
			for (var i = 0; i < t.length; i += 3) {
				var p = [];
				for (var j = i; j <= i + 2; j++) {
					var point = new _Point2.default(t[j]);
					point.init();
					p.push(point);
				}
				this.triangles[k] = new _Triangle2.default(this.ctx, p[0], p[1], p[2]);
				this.triangles[k].init(this.config.triangle);
				k++;
			}
		}
	}, {
		key: 'init',
		value: function init() {
			this.complexity = this.getComplexity(this.config.seed || 12000);
			this.triangles = [];
			this.verticies = [];
			var pad = 100;
			var cw = this.canvas.width + pad * 2;
			var ch = this.canvas.height + pad * 2;
			var iy = ch / Math.round(Math.sqrt(ch * this.complexity / cw));
			var ix = cw / Math.round(this.complexity / Math.sqrt(ch * this.complexity / cw));
			var k = 0;
			for (var y = -pad; y < this.canvas.height + pad; y += iy) {
				for (var x = -pad; x < this.canvas.width + pad; x += ix) {
					this.verticies[k] = [this.getRandomArbitrary(x, x + ix), this.getRandomArbitrary(y, y + iy)];
					k++;
				}
			}
			this.triangulation(this.verticies);
			_get(Mosaic.prototype.__proto__ || Object.getPrototypeOf(Mosaic.prototype), 'init', this).call(this);
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
			_get(Mosaic.prototype.__proto__ || Object.getPrototypeOf(Mosaic.prototype), 'render', this).call(this);
			for (var j = 0; j < this.triangles.length; j++) {
				this.triangles[j].render();
			}
		}
	}]);

	return Mosaic;
}(_CanvasEffect3.default);

exports.default = Mosaic;