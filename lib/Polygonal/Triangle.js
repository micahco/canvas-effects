'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validate = require('../CanvasEffect/validate');

var validate = _interopRequireWildcard(_validate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// math equations: Dan Avila <daniel.avila@yale.edu>
// light intesity: https://stackoverflow.com/a/31682068/4616986

var Triangle = function () {
	function Triangle(ctx, light, a, b, c) {
		_classCallCheck(this, Triangle);

		this.ctx = ctx;
		this.light = light;
		this.a = a;
		this.b = b;
		this.c = c;
		this.debug = false;
		this.color = [255, 255, 255, 1];
		this.shade = this.color;
	}

	_createClass(Triangle, [{
		key: 'init',
		value: function init(config) {
			this.color = validate.color(config.color) ? config.color : this.color;
			this.debug = validate.boolean(config.debug) ? config.debug : this.debug;
			this.shader();
		}
	}, {
		key: 'update',
		value: function update(light) {
			this.light = light;
			this.shader();
		}
	}, {
		key: 'render',
		value: function render() {
			this.ctx.fillStyle = 'rgba(' + this.shade[0] + ',' + this.shade[1] + ',' + this.shade[2] + ',' + this.shade[3] + ')';
			this.ctx.strokeStyle = 'rgba(' + this.shade[0] + ',' + this.shade[1] + ',' + this.shade[2] + ',' + this.shade[3] + ')';
			this.ctx.strokeStyle = 'black';
			this.ctx.beginPath();
			this.ctx.moveTo(this.a[0], this.a[1]);
			this.ctx.lineTo(this.b[0], this.b[1]);
			this.ctx.lineTo(this.c[0], this.c[1]);
			this.ctx.fill();
			this.ctx.stroke();
			if (this.debug) {
				this.ctx.font = '12px monospace';
				this.ctx.fillStyle = 'green';
				var c = this.getCenteroid();
				this.ctx.fillText(parseFloat(this.test).toFixed(2), c[0], c[1]);
			}
		}
	}, {
		key: 'shader',
		value: function shader() {
			var v1 = this.vector(this.a, this.b);
			var v2 = this.vector(this.a, this.c);
			var n = this.cross(v1, v2);
			var un = this.normalize(n);
			var l = this.vector(this.a, this.light);
			var ul = this.normalize(l);
			var dp = this.dotProduct(un, ul);
			var intensity = (dp + 1) / 2;
			this.shade = [parseInt(this.color[0] * intensity), parseInt(this.color[1] * intensity), parseInt(this.color[2] * intensity), this.color[3]];
			this.test = intensity;
		}
	}, {
		key: 'vector',
		value: function vector(p1, p2) {
			return [p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2]];
		}
	}, {
		key: 'cross',
		value: function cross(v1, v2) {
			return [v1[1] * v2[2] - v1[2] * v2[1], v1[2] * v2[0] - v1[0] * v2[2], v1[0] * v2[1] - v1[1] * v2[0]];
		}
	}, {
		key: 'normalize',
		value: function normalize(v) {
			var m = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
			return [v[0] / m, v[1] / m, v[2] / m];
		}
	}, {
		key: 'dotProduct',
		value: function dotProduct(v1, v2) {
			return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
		}
	}, {
		key: 'getCenteroid',
		value: function getCenteroid() {
			return [(this.a[0] + this.b[0] + this.c[0]) / 3, (this.a[1] + this.b[1] + this.c[1]) / 3];
		}
	}]);

	return Triangle;
}();

exports.default = Triangle;