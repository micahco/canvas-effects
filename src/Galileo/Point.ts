import * as validate from '../CanvasEffect/validate';
import { PointConfig, ColorRGBA } from '../types';

const VELOCITY_MOD = 0.01;

export default class Point {
	private ctx: CanvasRenderingContext2D;
	private pos: [number, number];
	private cw: number;
	private ch: number;
	private color: ColorRGBA;
	private radius: number;
	private velocity: number;
	private theta: number;
	constructor(ctx: CanvasRenderingContext2D, pos: [number, number]) {
		this.ctx = ctx;
		this.pos = pos;
		this.cw = this.ctx.canvas.width;
		this.ch = this.ctx.canvas.height;
		this.color = [0, 0, 0, 1];
		this.radius = this.getRandomArbitrary(2);
		this.velocity = this.getRandomArbitrary(10);
		this.theta = this.getRandomTheta();
	}
	init(config?: PointConfig): void {
		if (config) {
			if (config.color && validate.color(config.color)) {
				this.color = config.color;
			}
			if (config.radius && validate.number(config.radius)) {
				this.radius = this.getRandomArbitrary(config.radius);
			}
			if (config.velocity && validate.number(config.velocity)) {
				this.velocity = this.getRandomArbitrary(config.velocity)
			}
		}
	}
	update(): void {
		if (this.pos[0] <= 0 + this.radius || this.pos[0] >= this.cw - this.radius) {
			this.theta = Math.PI - this.theta;
		}
		if (this.pos[1] <= 0 + this.radius || this.pos[1] >= this.ch - this.radius) {
			this.theta = (2 * Math.PI) - this.theta;
		}
		this.pos[0] += Math.cos(this.theta) * this.velocity * VELOCITY_MOD;
		this.pos[1] += Math.sin(this.theta) * this.velocity * VELOCITY_MOD;
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
	private getRandomArbitrary(n: number): number {
		const margin = 0.2
		const max = n + (n * margin)
		const min = n - (n * margin)
		return Math.random() * (max - min) + min;
	}
	private getRandomTheta(): number {
		return Math.random() * 2 * Math.PI;
	}
}
