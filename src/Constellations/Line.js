import Entity from '../CanvasEffect/Entity';

export default class Line extends Entity {
	constructor(ctx) {
		super(ctx);
		this.alpha = 0;
		this.color = [0,0,0];
		this.fade = 0.1;
		this.max = 100;
		this.width = 1;
	}
	getDistance() {
		return Math.sqrt((this.x1-this.x2)*(this.x1-this.x2) + (this.y1-this.y2)*(this.y1-this.y2));
	}
	isValidRGB(array) {
		return array[0] <= 255 && array[1] <= 255 && array[2] <= 255;
	}
	init(config) {
		if (config.color.length == 3 && this.isValidRGB(config.color)) {
			this.color = config.color;
		}
		this.fade = config.fade || this.fade;
		this.max = config.max || this.max;
		this.width = config.width || this.width;
	}
	update(x1, y1, x2, y2) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
	}
	render() {
		if (this.getDistance() < this.max) {
			if (this.alpha <= 1) {
				this.alpha +=  this.fade;
			}
		} else {
			if (this.alpha > 0) {
				this.alpha -=  this.fade;
			}
		}
		if (this.alpha > 0) {
			this.ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
			this.ctx.lineWidth = this.width;
			this.ctx.beginPath();
			this.ctx.moveTo(this.x1, this.y1);
			this.ctx.lineTo(this.x2, this.y2);
			this.ctx.stroke();
		}
	}
}
