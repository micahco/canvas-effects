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
		_this.debug = false;
		_this.light = [-10, 10];
		_this.lightOG;
		_this.mouse = true;
		_this.seed = 6000;
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
		key: 'getMousePosition',
		value: function getMousePosition(e) {
			var rect = this.canvas.getBoundingClientRect();
			return [e.clientX - rect.right / 2, e.clientY - rect.bottom / 2];
		}
	}, {
		key: 'onMouseMove',
		value: function onMouseMove(e) {
			var pos = this.getMousePosition(e);
			this.light = [(pos[0] - this.canvas.width / 2) / this.canvas.width * 10 * Math.abs(this.lightOG[0]), -(pos[1] - this.canvas.height / 2) / this.canvas.height * 10 * Math.abs(this.lightOG[1])];
		}
	}, {
		key: 'elevate',
		value: function elevate(v) {
			for (var i = 0; i < v.length; i++) {
				var z = this.getRandomArbitrary(1, 0);
				if (!v[i][2]) {
					for (var j = i + 1; j < v.length; j++) {
						if (v[i] == v[j]) {
							v[j][2] = z;
						}
					}
					v[i][2] = z;
				}
			}
			return v;
		}
	}, {
		key: 'triangulate',
		value: function triangulate(p) {
			var d = new _fasterDelaunay2.default(p);
			var t = d.triangulate();
			var v = this.elevate(t);
			this.vertices = v;
			var k = 0;
			for (var i = 0; i < v.length; i += 3) {
				this.triangles[k] = new _Triangle2.default(this.ctx, this.light, v[i], v[i + 1], v[i + 2]);
				this.triangles[k].init(this.config);
				k++;
			}
		}
	}, {
		key: 'generate',
		value: function generate() {
			var p = [];
			var pad = 200;
			var cw = this.canvas.width + pad * 2;
			var ch = this.canvas.height + pad * 2;
			var iy = ch / Math.round(Math.sqrt(ch * this.complexity / cw));
			var ix = cw / Math.round(this.complexity / Math.sqrt(ch * this.complexity / cw));
			var k = 0;
			for (var y = -pad; y < this.canvas.height + pad; y += iy) {
				for (var x = -pad; x < this.canvas.width + pad; x += ix) {
					p[k] = [this.getRandomArbitrary(x, x + ix), this.getRandomArbitrary(y, y + iy)];
					k++;
				}
			}
			this.triangulate(p);
		}
	}, {
		key: 'init',
		value: function init() {
			this.color = this.config.color ? this.config.color : this.color;
			this.complexity = this.getComplexity(this.config.seed || this.seed);
			this.debug = this.config.debug ? this.config.debug : this.debug;
			if (this.config.light && this.config.light.length == 2) {
				this.light = this.config.light;
			}
			this.lightOG = this.light;
			this.mouse = this.config.mouse ? this.config.mouse : this.mouse;
			this.triangles = [];
			this.generate();
			addEventListener('mousemove', this.onMouseMove.bind(this), false);
			_get(Polygonal.prototype.__proto__ || Object.getPrototypeOf(Polygonal.prototype), 'init', this).call(this);
		}
	}, {
		key: 'update',
		value: function update() {
			for (var i = 0; i < this.triangles.length; i++) {
				this.triangles[i].update(this.light);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			_get(Polygonal.prototype.__proto__ || Object.getPrototypeOf(Polygonal.prototype), 'render', this).call(this);
			for (var i = 0; i < this.triangles.length; i++) {
				this.triangles[i].render();
			}
			if (this.debug) {
				for (var j = 0; j < this.vertices.length; j++) {
					this.ctx.font = "10px monospace";
					this.ctx.fillStyle = 'red';
					this.ctx.fillText('' + parseFloat(this.vertices[j][2]).toFixed(2), this.vertices[j][0], this.vertices[j][1]);
				}
			}
		}
	}]);

	return Polygonal;
}(_CanvasEffect3.default);

exports.default = Polygonal;