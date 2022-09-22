import CanvasEffect from '../CanvasEffect';
import { StarsConfig } from '../types';
import Point from './Point';
import Line from './Line';
import * as validate from '../CanvasEffect/validate';

export default class Stars extends CanvasEffect<StarsConfig> {
	private seed: number;
	private complexity: number;
	private lines: Array<Line>;
	private points: Array<Point>;
	constructor(config: StarsConfig) {
		super(config);
		this.seed = 8000;
		this.complexity = this.getComplexity(this.seed);
		if (config.seed && validate.number(config.seed)) {
			this.complexity = this.getComplexity(config.seed);
		}
		this.lines = [];
		this.points = [];
		this.generate();
		super.init();
	}
	protected update(): void {
		for (let p = 0; p < this.complexity; p++) {
			this.points[p].update();
		}
		let l = 0;
		for (let i = 0; i < this.complexity; i++) {
			for (let j = i+1; j < this.complexity; j++) {
				const a = this.points[i].getPosition();
				const b = this.points[j].getPosition();
				this.lines[l].update([a[0],a[1]], [b[0],b[1]]);
				l++;
			}
		}
	}
	protected render(): void {
		super.render();
		for (let j = 0; j < this.lines.length; j++) {
			this.lines[j].render();
		}
		for (let i = 0; i < this.points.length; i++) {
			this.points[i].render();
		}
	}
	private generate(): void {
		let k = 0;
		for (let i = 0; i < this.complexity; i++) {
			const x = Math.random() * this.canvas!.width;
			const y = Math.random() * this.canvas!.height;
			this.points[i] = new Point(this.ctx!, [x,y]);
			if (this.config.point) {
				this.points[i].init(this.config.point);
			} else {
				this.points[i].init();
			}
			for (let j = i+1; j < this.complexity; j++) {
				this.lines[k] = new Line(this.ctx!);
				this.lines[k].init(this.config.line);
				k++;
			}
		}
	}
	private getComplexity(seed: number): number {
		return Math.floor(this.canvas!.width*this.canvas!.height/seed);
	}	
}
