import Entity from '../CanvasEffect/Entity';

export default class Triangle extends Entity {
	constructor(ctx, a, b, c) {
		super(ctx);
		this.a = a;
		this.b = b;
		this.c = c;
		this.normal;
	}
	getCrossProduct(u, v) {
		return [
			u[1]*v[2]-u[2]*v[1],
			u[2]*v[0]-u[0]*v[2],
			u[0]*v[1]-u[1]*v[0]
		];
	}
	init(config) {
		this.normal = this.getCrossProduct(
			[(this.b[0] - this.a[0]), (this.b[1] - this.a[1]), (this.b[2] - this.a[2])],
			[(this.c[0] - this.a[0]), (this.c[1] - this.a[1]), (this.c[2] - this.a[2])]
		);
		console.log(this.a);
		console.log(this.b);
		console.log(this.c);
	}
	update() {}
	render() {
		this.ctx.beginPath();
		this.ctx.moveTo(this.a[0], this.a[1]);
		this.ctx.lineTo(this.b[0], this.b[1]);
		this.ctx.lineTo(this.c[0], this.c[1]);
		this.ctx.stroke();
	}
}
