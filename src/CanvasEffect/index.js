import requestAnimationFrame from './State/requestAnimationFrame';
import Point from './Entity/Point';
import Line from './Entity/Line';

export default class CanvasEffect {
	constructor(el) {
		this.canvas = document.querySelector(el);
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.ctx = this.canvas.getContext('2d');
		this.complexity = this.getComplexity();
		this.points = [];
		this.lines = [];
		this.fill = '#666666';
	}
	getComplexity() {
		return this.canvas.width * this.canvas.height / 10000;
	}
	init() {
		let l = 0;
		for (let i = 0; i < this.complexity; i++) {
			let x = Math.random() * this.canvas.width;
			let y = Math.random() * this.canvas.height;
			this.points[i] = new Point(this.ctx, x, y);
			for (let j = i+1; j < this.complexity; j++) {
				this.lines[l] = new Line(this.ctx);
				l++;
			}
		}
		this.main();
	}
	main() {
		requestAnimationFrame(this.main.bind(this));
		this.update();
		this.render();
	}
	update() {
		for (let p = 0; p < this.complexity; p++) {
			this.points[p].update();
		}
		let l = 0;
		for (let i = 0; i < this.complexity; i++) {
			for (let j = i+1; j < this.complexity; j++) {
				let x1 = this.points[i].x;
				let y1 = this.points[i].y;
				let x2 = this.points[j].x;
				let y2 = this.points[j].y;
				this.lines[l].update(x1, y1, x2, y2);
				l++;
			}
		}
	}
	render() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (let j = 0; j < this.lines.length; j++) {
			this.lines[j].render();
		}
		for (let i = 0; i < this.points.length; i++) {
			this.points[i].render();
		}
	}
}
