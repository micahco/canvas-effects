import * as validate from '../CanvasEffect/validate';

export interface Config {
	color?: [number, number, number, number];
	fade?: boolean;
	max?: number;
	width?: number;
}

export default class Line {
	private ctx: CanvasRenderingContext2D;
	private a: [number, number];
	private b: [number, number];
	private alpha: number;
	private color: [number, number, number, number];
	private fade: boolean;
	private max: number;
	private width: number;
	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.a;
		this.b;
		this.alpha = 0;
		this.color = [0,0,0,1];
		this.fade = true;
		this.max = 100;
		this.width = 1;
	}
	init(config: Config): void {
		if (config) {
			this.color = validate.color(config.color) ? config.color : this.color;
			this.fade = validate.boolean(config.fade) ? config.fade : this.fade;
			this.max = validate.number(config.max) ? config.max : this.max;
			this.width = validate.number(config.width) ? config.width : this.width;
		}
	}
	update(a, b): void {
		this.a = a;
		this.b = b;
	}
	render(): void {
		if (this.getDistance() < this.max) {
			if (this.fade) {
				this.alpha = 1 - (this.getDistance() / this.max);
			} else {
				this.alpha = this.color[3];
			}
		} else {
			this.alpha = 0;
		}
		if (this.alpha > 0) {
			this.ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
			this.ctx.lineWidth = this.width;
			this.ctx.beginPath();
			this.ctx.moveTo(this.a[0], this.a[1]);
			this.ctx.lineTo(this.b[0], this.b[1]);
			this.ctx.stroke();
		}
	}
	private getDistance(): number {
		return Math.sqrt((this.a[0]-this.b[0])*(this.a[0]-this.b[0]) + (this.a[1]-this.b[1])*(this.a[1]-this.b[1]));
	}
}
