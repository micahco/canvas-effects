import * as validate from '../CanvasEffect/validate';
import { PointConfig } from '../types';

export default class Point {
	private ctx: CanvasRenderingContext2D;
	private pos: [number, number];
	private cw: number;
	private ch: number;
	private color: [number, number, number, number];
	private radius: number;
	private velocity: number;
	private theta: number;
	constructor(ctx: CanvasRenderingContext2D, pos: [number, number]) {
		this.ctx = ctx;
		this.pos = pos;
		this.cw = this.ctx.canvas.width;
		this.ch = this.ctx.canvas.height;
		this.color = [0,0,0,1];
		this.radius = this.getRandomArbitrary(4, 2);
		this.velocity = this.getRandomArbitrary(0.2, 0.1);
		this.theta = this.getRandomTheta();
	}
	init(config: PointConfig): void {
		if (config) {
			this.color = validate.color(config.color) ? config.color : this.color;
			if (validate.array(config.radius, 2)) {
				if (config.radius[0] > config.radius[1]) {
					this.radius = this.getRandomArbitrary(config.radius[0], config.radius[1]);
				}
			}
			if (validate.array(config.velocity, 2)) {
				if (config.velocity[0] > config.velocity[1]) {
					this.velocity = this.getRandomArbitrary(config.velocity[0], config.velocity[1]);					
				}
			}
		}
	}
	update(): void {
		if (this.pos[0] <= 0 + this.radius || this.pos[0] >= this.cw - this.radius) {
			this.theta = Math.PI - this.theta;
		}
		if (this.pos[1] <= 0 + this.radius || this.pos[1] >= this.ch - this.radius) {
			this.theta = 2*Math.PI - this.theta;
		}
		this.pos[0] += Math.cos(this.theta) * this.velocity;
		this.pos[1] += Math.sin(this.theta) * this.velocity;
	}
	render(): void {
		this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.color[3]})`;
		this.ctx.beginPath();
		this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
		this.ctx.fill();
	}
	public getPosition() {
		return this.pos;
	}
	private getRandomArbitrary(max, min): number {
		return Math.random() * (max - min) + min;
	}
	private getRandomTheta(): number {
		return Math.random() * 2 * Math.PI;
	}
}
