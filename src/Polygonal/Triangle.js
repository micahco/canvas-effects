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
	hasSpacing() {
		return Math.abs(this.x1-this.x2)
	}
	isValidRGBA(array) {
		return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
	}
	init(config) {
		if (config) {
			if (config.color && config.color.length == 4 && this.isValidRGBA(config.color)) {
				this.color = config.color;
			}
			this.width = config.width || this.width;
		}
	}
	update(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
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
