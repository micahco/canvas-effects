import Entity from '../CanvasEffect/Entity';
import Color from 'color';

export default class Triangle extends Entity {
	constructor(ctx, light, a, b, c) {
		super(ctx);
		this.a = a;
		this.b = b;
		this.c = c;
		this.alpha;
		this.base = [255,255,255];
		this.color;
		this.light = light;
		this.maxShade = 0.5;
		this.normal;
	}
	getDistance(u, v) {
		let a = u[0]-v[0];
		let b = u[1]-v[1];
		return Math.sqrt(a*a+b*b);
	}
	isValidRGBA(array) {
		return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
	}
	colorize() {
		// credit: @danthecodingman
		this.normal = [
			(this.b[1]-this.a[1])*(this.c[2]-this.a[2])-(this.b[2]-this.a[2])*(this.c[1]-this.a[1]),
			(this.b[0]-this.a[0])*(this.c[2]-this.a[2])-(this.b[2]-this.a[2])*(this.c[0]-this.a[0])
		];
		let shade = this.maxShade*(this.getDistance(this.light, this.normal) / 200);
		if (this.base.light()) {
			this.color = this.base.darken(shade).string();
		} else {
			this.color = this.base.lighten(shade).string();
		}
	}
	init(config) {
		this.base = config.color ? Color(config.color) : Color(this.base);
		this.maxShade = config.maxShade ? config.maxShade : this.maxShade;
		this.colorize();
	}
	update(light) {
		this.light = light;
		this.colorize();
	}
	render() {
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = this.color;
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.moveTo(this.a[0], this.a[1]);
		this.ctx.lineTo(this.b[0], this.b[1]);
		this.ctx.lineTo(this.c[0], this.c[1]);
		this.ctx.fill();
		this.ctx.stroke();
	}
}
