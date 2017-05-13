"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = function () {
	function Point(pos) {
		_classCallCheck(this, Point);

		this.pos = pos;
		this.v;
	}

	_createClass(Point, [{
		key: "getRandomArbitrary",
		value: function getRandomArbitrary(max, min) {
			return Math.random() * (max - min) + min;
		}
	}, {
		key: "init",
		value: function init() {
			this.pos[2] = this.getRandomArbitrary(100, 0);
			this.v = this.getRandomArbitrary(0.1, -0.1);
		}
	}, {
		key: "update",
		value: function update() {
			if (this.pos[2] >= 100 || this.pos[2] <= 0) {
				this.v *= -1;
			}
			this.pos[2] += this.v;
		}
	}]);

	return Point;
}();

exports.default = Point;