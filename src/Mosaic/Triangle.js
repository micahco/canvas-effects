import Entity from '../CanvasEffect/Entity';

export default class Triangle extends Entity {
	constructor(ctx, a, b, c) {
		super(ctx);
		this.a = a;
		this.b = b;
		this.c = c;
		this.alpha = 0;
		this.color = [0,0,0,1];
		this.width = 1;
	}
	getArea() {
		return Math.abs(0.5*(this.x1*(this.y1-this.y2)+this.x2*(this.y3-this.y1)+this.x3*(this.y1-this.y2)));
	}
	getMidpoint(a, b) {
		return [(a[0]+b[0])/2,(a[1]+b[1])/2];
	}
	init() {}
	update() {
		this.a.update();
		this.b.update();
		this.c.update();
	}
	render() {
		this.ctx.beginPath();
		this.ctx.moveTo(this.a.pos[0], this.a.pos[1]);
		this.ctx.lineTo(this.b.pos[0], this.b.pos[1]);
		this.ctx.lineTo(this.c.pos[0], this.c.pos[1]);
		this.ctx.stroke();
	}
}
