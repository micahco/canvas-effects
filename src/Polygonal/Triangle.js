import Entity from '../CanvasEffect/Entity';

export default class Triangle extends Entity {
	constructor(ctx, light, a, b, c) {
		super(ctx);
		this.a = a;
		this.b = b;
		this.c = c;
		this.alpha;
		this.color = [0,0,0];
		this.light = light;
		this.maxAlpha = 1;
		this.normal;
	}
	getCrossProduct(u, v) {
		return [
			u[1]*v[2]-u[2]*v[1],
			u[2]*v[0]-u[0]*v[2],
			u[0]*v[1]-u[1]*v[0]
		];
	}
	getDistance(u, v) {
		let a = u[0]-v[0];
		let b = u[1]-v[1];
		return Math.sqrt(a*a+b*b);
	}
	getCenteroid() {
		return [
			(this.a[0]+this.b[0]+this.c[0])/3,
			(this.a[1]+this.b[1]+this.c[1])/3
		];
	}
	isValidRGBA(array) {
		return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
	}
	setAlpha() {
		// credit: @danthecodingman
		this.normal = [
			(this.b[1]-this.a[1])*(this.c[2]-this.a[2])-(this.b[2]-this.a[2])*(this.c[1]-this.a[1]),
			(this.b[0]-this.a[0])*(this.c[2]-this.a[2])-(this.b[2]-this.a[2])*(this.c[0]-this.a[0])
		];
		this.alpha = this.getDistance(this.light, this.normal) / 200 * this.maxAlpha;
	}
	init(config) {
		if (config.color && this.isValidRGBA(config.color)) {
			this.color = config.color.slice(0,3);
			this.maxAlpha = config.color[3];
		}
		this.setAlpha();
	}
	update(light) {
		this.light = light;
		this.setAlpha();
	}
	render() {
		this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
		this.ctx.beginPath();
		this.ctx.moveTo(this.a[0], this.a[1]);
		this.ctx.lineTo(this.b[0], this.b[1]);
		this.ctx.lineTo(this.c[0], this.c[1]);
		this.ctx.fill();
	}
}
