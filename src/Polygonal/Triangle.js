import Entity from '../CanvasEffect/Entity';

export default class Triangle extends Entity {
	constructor(ctx, complexity, a, b, c) {
		super(ctx);
		this.a = a;
		this.b = b;
		this.c = c;
		this.alpha;
		this.color = [0,0,0];
		this.light = [-1, 1];
	}
	getDistance(u, v) {
		let a = u[0]-v[0];
		let b = u[1]-v[1];
		return Math.sqrt(a*a+b*b);
	}
	setColor() {
		// credit: @danthecodingman
		let normal = [
			(this.b[1]-this.a[1])*(this.c[2]-this.a[2])-(this.b[2]-this.a[2])*(this.c[1]-this.a[1]),
			-((this.b[0]-this.a[0])*(this.c[2]-this.a[2])-((this.b[2]-this.a[2])*(this.c[0]-this.a[0])))
		];
		this.alpha = this.getDistance(normal, this.light) / 300;
	}
	init(config) {
		this.setColor();
	}
	update() {}
	render() {
		this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
		this.ctx.lineWidth = 1;
		this.ctx.beginPath();
		this.ctx.moveTo(this.a[0], this.a[1]);
		this.ctx.lineTo(this.b[0], this.b[1]);
		this.ctx.lineTo(this.c[0], this.c[1]);
		this.ctx.fill();
	}
}
