import CanvasEffect from '../CanvasEffect';
import Point from './Point';
import Line from './Line';
import * as validate from '../CanvasEffect/validate';

export default class Constellations extends CanvasEffect {
	constructor(config) {
		super(config);
		this.complexity;
		this.lines;
		this.points;
		this.seed = 8000;
		this.init();
	}
	init() {
		if (validate.number(this.config.seed)) {
			this.complexity = this.getComplexity(this.config.seed);
		} else {
			this.complexity = this.getComplexity(this.seed);
		}
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
				const x1 = this.points[i].pos[0];
				const y1 = this.points[i].pos[1];
				const x2 = this.points[j].pos[0];
				const y2 = this.points[j].pos[1];
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
	getComplexity(seed) {
		return Math.round(this.canvas.width * this.canvas.height / seed);
	}
	generate() {
		let k = 0;
		for (let i = 0; i < this.complexity; i++) {
			const x = Math.random() * this.canvas.width;
			const y = Math.random() * this.canvas.height;
			this.points[i] = new Point(this.ctx, [x,y]);
			this.points[i].init(this.config.point);
			for (let j = i+1; j < this.complexity; j++) {
				this.lines[k] = new Line(this.ctx);
				this.lines[k].init(this.config.line);
				k++;
			}
		}
	}
}
