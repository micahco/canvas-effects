import CanvasEffect from '../CanvasEffect';
import Point from './Point';
import Line from './Line';

export default class Constellations extends CanvasEffect {
	constructor(el) {
		super(el);
		this.complexity;
		this.points = [];
		this.lines = [];
	}
	getComplexity() {
		return this.canvas.width * this.canvas.height / 8000;
	}
	init() {
		super.init();
		this.complexity = this.getComplexity();
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
		super.main();
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
		super.render();
		for (let j = 0; j < this.lines.length; j++) {
			this.lines[j].render();
		}
		for (let i = 0; i < this.points.length; i++) {
			this.points[i].render();
		}
	}
}
