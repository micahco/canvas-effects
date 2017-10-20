import Entity from '../CanvasEffect/Entity';

export default class Line extends Entity {
	constructor(ctx) {
		super(ctx);
		this.alpha = 0;
		this.color = [0,0,0,1];
		this.fade = true;
		this.max = 100;
		this.width = 1;
	}
	init(config) {
		if (config) {
			if (config.color && config.color.length == 4 && this.isValidRGBA(config.color)) {
				this.color = config.color;
			}
			this.fade = config.fade || this.fade;
			this.max = config.max || this.max;
			this.width = config.width || this.width;
		}
	}
	update(a, b) {
		this.a = a;
		this.b = b;
	}
	render() {
		if (this.getDistance() < this.max) {
			if (this.fade) {
				this.alpha = 1 - (this.getDistance() / this.max);
			} else {
				this.alpha = 1;
			}
		} else {
			this.alpha = 0;
		}
		if (this.alpha > 0) {
			this.ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
			this.ctx.lineWidth = this.width;
			this.ctx.beginPath();
			this.ctx.moveTo(this.a[0], this.a[1]);
			this.ctx.lineTo(this.b[0], this.b[1]);
			this.ctx.stroke();
		}
	}
	getDistance() {
		return Math.sqrt((this.a[0]-this.b[0])*(this.a[0]-this.b[0]) + (this.a[1]-this.b[1])*(this.a[1]-this.b[1]));
	}
	isValidRGBA(array) {
		return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
	}
}
