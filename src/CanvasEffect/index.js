import { requestAnimFrame, cancelAnimFrame } from './requestAnimationFrame';

export default class CanvasEffect {
	constructor(config) {
		if (this.constructor === CanvasEffect) {
            throw new TypeError('Abstract class "CanvasEffect" cannot be instantiated directly.');
        }
		this.config = config ? config : {};
		this.canvas;
		this.ctx;
		this.delay = 250;
		this.requestId;
		this.timer;
		this.createCanvas();
		this.setCanvasSize();
	}
	createCanvas() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		if (this.config.backgroundColor) {
			this.canvas.style.backgroundColor = this.config.backgroundColor;
		}
		let container = document.querySelector(this.config.container);
		if (container && container.nodeName == 'DIV') {
			container.appendChild(this.canvas);
		} else {
			throw new TypeError(`Invalid container: ${this.config.container}.`);
		}
	}
	isValidDimensions(w, h) {
		if (typeof w == 'number' || typeof w == 'string') {
			if (typeof w == 'string' && w.slice(-1) != '%') {
				return false;
			}
			return true;
		}
		if (typeof h == 'number' || typeof h == 'string') {
			if (typeof h == 'string' && h.slice(-1) != '%') {
				return false;
			}
			return true;
		}
		return false;
	}
	setCanvasSize() {
		let width = this.config.width;
		let height = this.config.height;
		if (this.isValidDimensions(width, height)) {
			if (typeof width == 'string' || typeof height == 'string') {
				if (typeof width == 'string') {
					let per = width.slice(0, -1);
					width = (per/100) * window.innerWidth;
				}
				if (typeof height == 'string') {
					let per = height.slice(0, -1);
					height = (per/100) * window.innerHeight;
				}
				document.body.style.overflowX = 'hidden';
				window.addEventListener('resize', this.debounce.bind(this));
			}
			this.canvas.width = width;
			this.canvas.height = height;
        } else {
			throw new TypeError(`Invalid dimensions: ${width}, ${height}.`);
		}
	}
	debounce() {
		if (this.requestId) {
	       cancelAnimationFrame(this.requestId);
	       this.requestId = undefined;
	    }
		clearTimeout(this.timer);
  		this.timer = setTimeout(this.resize.bind(this), this.delay);
		this.clear();
	}
	resize() {
		this.setCanvasSize();
		this.init();
	}
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	init() {
		if (!this.requestId) {
			this.main();
		}
	}
	main() {
		this.requestId = requestAnimFrame(this.main.bind(this));
		this.update();
		this.render();
	}
	update() {}
	render() {
		this.clear();
	}
}
