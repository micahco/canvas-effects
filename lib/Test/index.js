'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _CanvasEffect2 = require('../CanvasEffect');

var _CanvasEffect3 = _interopRequireDefault(_CanvasEffect2);

var _Line = require('./Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_CanvasEffect) {
	_inherits(Test, _CanvasEffect);

	function Test(config) {
		_classCallCheck(this, Test);

		var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, config));

		_this.complexity;
		_this.layers;
		_this.lines;
		_this.init();
		return _this;
	}

	_createClass(Test, [{
		key: 'getComplexity',
		value: function getComplexity(seed) {
			return this.canvas.width * this.canvas.height / seed;
		}
	}, {
		key: 'init',
		value: function init() {
			this.complexity = this.getComplexity(this.config.seed || 10000);
			this.layers = this.config.layers || 2;
			this.lines = [];
			var k = 0;
			for (var i = 1; i <= this.layers; i++) {
				for (var j = 0; j < this.complexity / i; j++) {
					var x = Math.random() * this.canvas.width;
					var y = Math.random() * this.canvas.height;
					this.lines[k] = new _Line2.default(this.ctx, x, y, i, this.layers);
					k++;
				}
			}
			_get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), 'init', this).call(this);
		}
	}, {
		key: 'update',
		value: function update() {
			for (var i = 0; i < this.lines.length; i++) {
				this.lines[i].update();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			_get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), 'render', this).call(this);
			for (var i = 0; i < this.lines.length; i++) {
				this.lines[i].render();
			}
		}
	}]);

	return Test;
}(_CanvasEffect3.default);

exports.default = Test;