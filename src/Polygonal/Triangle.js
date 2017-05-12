import Entity from '../CanvasEffect/Entity';

export default class Triangle extends Entity {
	constructor(ctx, a, b, c) {
		super(ctx);
		this.a = a;
		this.b = b;
		this.c = c;
		this.color = [0,0,0,1];
		this.width = 1;
	}
	getArea() {
		return Math.abs(0.5*(this.x1*(this.y1-this.y2)+this.x2*(this.y3-this.y1)+this.x3*(this.y1-this.y2)));
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
	}
	init(config) {
		this.a[2] = this.getRandomArbitrary(1,0);
		this.b[2] = this.getRandomArbitrary(1,0);
		this.c[2] = this.getRandomArbitrary(1,0);
	}
	update() {

	}
	render() {
		this.ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.color[3]})`;
		this.ctx.lineWidth = this.width;
		this.ctx.beginPath();
		this.ctx.moveTo(this.a[0], this.a[1]);
		this.ctx.lineTo(this.b[0], this.b[1]);
		this.ctx.lineTo(this.c[0], this.c[1]);
		this.ctx.stroke();
	}
}
