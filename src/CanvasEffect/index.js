import { requestAnimFrame, cancelAnimFrame } from './requestAnimationFrame';

export default class CanvasEffect {
	constructor(el) {
		this.canvas = document.querySelector(el);
		this.ctx = this.canvas.getContext('2d');
		this.requestId;
		this.timer;
		window.addEventListener('resize', this.resize.bind(this));
	}
	resize() {
		if (this.requestId) {
	       cancelAnimationFrame(this.requestId);
	       this.requestId = undefined;
	    }
		clearTimeout(this.timer);
  		this.timer = setTimeout(this.init.bind(this), 250);
	}
	init() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}
	run() {
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
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
