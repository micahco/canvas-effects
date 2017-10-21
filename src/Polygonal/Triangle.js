import Entity from '../CanvasEffect/Entity';
import Color from 'color';

//TODO: Get rid of 'color' dependency and write own color shader

export default class Triangle extends Entity {
	constructor(ctx, light, a, b, c) {
		super(ctx);
		this.a = a;
		this.b = b;
		this.c = c;
		this.base = [0,0,0,1];
		this.color = this.base;
		this.debug = false;
		this.light = light;
		this.normal = null;
	}
	init(config) {
		this.base = this.validate.color(config.color) ? config.color : this.base;
		this.debug = this.validate.boolean(config.debug) ? config.debug : this.debug;
		this.shader();
	}
	update(light) {
		this.light = light;
		this.shader();
	}
	render() {
		this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.color[3]})`;
		this.ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.color[3]})`;
		this.ctx.beginPath();
		this.ctx.moveTo(this.a[0], this.a[1]);
		this.ctx.lineTo(this.b[0], this.b[1]);
		this.ctx.lineTo(this.c[0], this.c[1]);
		this.ctx.stroke();
		if (this.debug) {
			this.ctx.font = "10px monospace";
			this.ctx.fillStyle = 'green';
			const c = this.getCenteroid();
			this.ctx.fillText(`${parseInt(this.normal[0])}`, c[0], c[1]);
			this.ctx.fillText(`${parseInt(this.normal[1])}`, c[0], c[1]-10);
		}
	}
	getCenteroid() {
		return [
			(this.a[0]+this.b[0]+this.c[0])/3,
			(this.a[1]+this.b[1]+this.c[1])/3
		];
	}
	getDistance(u, v) {
		let a = u[0]-v[0];
		let b = u[1]-v[1];
		return Math.sqrt(a*a+b*b);
	}
	getNormal(a, b, c) {
		// source: @danthecodingman
		return [
			(b[0]-a[0])*(c[2]-a[2])-(b[2]-a[2])*(c[0]-a[0]),
			(b[1]-a[1])*(c[2]-a[2])-(b[2]-a[2])*(c[1]-a[1])
		];
	}
	shader() {
		this.normal = this.getNormal(this.a, this.b, this.c);
		const d = this.getDistance(this.light, this.normal);
	}
}
