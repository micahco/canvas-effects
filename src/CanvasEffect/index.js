import requestAnimationFrame from './requestAnimationFrame';

export default class CanvasEffect {
	constructor(el) {
		this.canvas = document.querySelector(el);
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext('2d');
	}
	init() {
		this.main();
	}
	main() {
		requestAnimationFrame(this.main.bind(this));
		this.update();
		this.render();
	}
	update() {}
	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
