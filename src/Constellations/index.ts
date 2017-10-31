import CanvasEffect from '../CanvasEffect';
import Point from './Point';
import Line from './Line';
import * as validate from '../CanvasEffect/validate';

interface PointConfig {
	color?: [number, number, number, number];
	radius?: [number, number];
	speed?: [number, number];
}
interface LineConfig {
	color?: [number, number, number, number];
	fade?: number;
	max?: number;
	width?: number;
}
export interface Config {
	container: string;
	width: any;
	height: any;
	seed?: number;
	point?: Point;
	line?: Line;
}

export default class Constellations extends CanvasEffect<Config> {
	complexity: number;
	lines: Array<Line>;
	points: Array<Point>;
	seed: number;
	constructor(config: any) {
		super(config);
		this.complexity;
		this.lines;
		this.points;
		this.seed = 8000;
		this.init();
	}
	init(): void {
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
	update(): void {
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
	render(): void {
		super.render();
		for (let i = 0; i < this.points.length; i++) {
			this.points[i].render();
		}
		for (let j = 0; j < this.lines.length; j++) {
			this.lines[j].render();
		}
	}
	generate(): void {
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
	getComplexity(seed: number): number {
		return Math.round(this.canvas.width*this.canvas.height/seed);
	}	
}
