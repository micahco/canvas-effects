import * as validate from '../CanvasEffect/validate';
import { DelaunayConfig, Point, Color } from '../types';

/*
 * SOURCES
 * math equations: Dan Avila (https://github.com/danthecodingman)
 * light intesity: https://stackoverflow.com/a/31682068/4616986
 */

export default class Triangle {
	ctx: CanvasRenderingContext2D;
	light: Point; 
	a: Point; 
	b: Point;
	c: Point;
	color: Color;
	hue: Color;
	max: number; // 0-1; 0 = lightest, 1 = darkest
	stroke: {
		color?: Color;
		width?: number;
	}
	constructor(ctx: CanvasRenderingContext2D, light: Point, a: Point, b: Point, c: Point) {
		this.ctx = ctx;
		this.light = light;
		this.a = a;
		this.b = b;
		this.c = c;
		this.color = [255,255,255,1];
		this.hue = this.color;
		this.max = 0.5;
		this.stroke = {};
	}
	init(config: DelaunayConfig): void {
		if (config.color && validate.color(config.color)) {
			this.color = config.color;
		}
		if (config.max && validate.number(config.max)) {
			if (config.max >= 0 && config.max <= 1) {
				this.max = config.max;
			}
		}
		if (config.stroke) {
			if (validate.color(config.stroke.color)) {
				this.stroke.color = config.stroke.color;
			}
			if (validate.number(config.stroke.width)) {
				this.stroke.width = config.stroke.width;
			}
		}
	}
	update(light: Point): void {
		this.light = light;
		this.shader();
	}
	render(): void {
		this.ctx.fillStyle = `rgba(${this.hue[0]},${this.hue[1]},${this.hue[2]},${this.hue[3]})`;
		if (this.stroke.color) {
			this.ctx.strokeStyle = `rgba(${this.stroke.color[0]},${this.stroke.color[1]},${this.stroke.color[2]},${this.stroke.color[3]})`;
			if (this.stroke.width) {
				this.ctx.lineWidth = this.stroke.width;
			}
		} else {
			this.ctx.strokeStyle = `rgba(${this.hue[0]},${this.hue[1]},${this.hue[2]},${this.hue[3]})`;
		}
		this.ctx.beginPath();
		this.ctx.moveTo(this.a[0], this.a[1]);
		this.ctx.lineTo(this.b[0], this.b[1]);
		this.ctx.lineTo(this.c[0], this.c[1]);
		this.ctx.fill();
		this.ctx.stroke();
	}
	shader(): void {
		const v1 = this.vector(this.a, this.b);
		const v2 = this.vector(this.a, this.c);
		const n = this.cross(v1, v2);
		const un = this.normalize(n);
		const l = this.vector(this.a, this.light);
		const ul = this.normalize(l);
		const dp = this.dotProduct(un, ul);
		const power = 1-(dp+1)/2;
		this.hue = this.shade(this.color, this.getIntensity(power, this.max));
	}
	vector(p1: number[], p2: number[]): Point {
		return [
			p2[0]-p1[0],
			p2[1]-p1[1],
			p2[2]-p1[2]
		]
	}
	cross(v1: number[], v2: number[]): Point {
		return [
			(v1[1]*v2[2])-(v1[2]*v2[1]),
			(v1[2]*v2[0])-(v1[0]*v2[2]),
			(v1[0]*v2[1])-(v1[1]*v2[0])
		]
	}
	normalize(v: Point): Point {
		const m = Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
		return [v[0]/m, v[1]/m, v[2]/m];
	}
	shade(color: number[], i: number): Color {
		return [
			Math.floor(color[0]*i),
			Math.floor(color[1]*i),
			Math.floor(color[2]*i),
			color[3]
		];

	}
	getIntensity(power: number, max: number): number {
		return 1-max+max*power;
	}
	dotProduct(v1: number[], v2: number[]): number {
		return v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2];
	}
	getCenteroid(): [number, number] {
		return [
			(this.a[0]+this.b[0]+this.c[0])/3,
			(this.a[1]+this.b[1]+this.c[1])/3
		];
	}
}