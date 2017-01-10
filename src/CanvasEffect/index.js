import requestAnimationFrame from './requestAnimationFrame';

export default class CanvasEffect {
	constructor(el) {
		this.canvas = document.querySelector(el);
		this.ctx = this.canvas.getContext('2d');
		this.debounce;
		window.addEventListener('resize', this.resize.bind(this));
	}
	resize() {
		clearTimeout(this.debounce);
  		this.debounce = setTimeout(this.init.bind(this), 100);
	}
	init() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
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
