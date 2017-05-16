import CanvasEffect from '../CanvasEffect';
import Point from './Point';
import Line from './Line';

export default class Constellations extends CanvasEffect {
	constructor(config) {
		super(config);
		this.complexity;
		this.lines;
		this.points;
		this.seed = 8000;
		this.init();
	}
	getComplexity(seed) {
		return Math.round(this.canvas.width * this.canvas.height / seed);
	}
	generate() {
		let k = 0;
		for (let i = 0; i < this.complexity; i++) {
			let x = Math.random() * this.canvas.width;
			let y = Math.random() * this.canvas.height;
			this.points[i] = new Point(this.ctx, [x,y]);
			this.points[i].init(this.config.point);
			for (let j = i+1; j < this.complexity; j++) {
				this.lines[k] = new Line(this.ctx);
				this.lines[k].init(this.config.line);
				k++;
			}
		}
	}
	init() {
		this.complexity = this.getComplexity(this.config.seed || this.seed);
		this.lines = [];
		this.points = [];
		this.generate();
		super.init();
	}
	update() {
		for (let p = 0; p < this.complexity; p++) {
			this.points[p].update();
		}
		let l = 0;
		for (let i = 0; i < this.complexity; i++) {
			for (let j = i+1; j < this.complexity; j++) {
				let x1 = this.points[i].pos[0];
				let y1 = this.points[i].pos[1];
				let x2 = this.points[j].pos[0];
				let y2 = this.points[j].pos[1];
				this.lines[l].update([x1,y1], [x2,y2]);
				l++;
			}
		}
	}
	render() {
		super.render();
		for (let i = 0; i < this.points.length; i++) {
			this.points[i].render();
		}
		for (let j = 0; j < this.lines.length; j++) {
			this.lines[j].render();
		}
	}
}
