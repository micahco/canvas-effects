import Entity from '../CanvasEffect/Entity';

export default class Line extends Entity {
	constructor(ctx) {
		super(ctx);
		this.max = 100;
		this.alpha = 0;
		this.fade = 0.05;
	}
	getDistance() {
		return Math.sqrt((this.x1-this.x2)*(this.x1-this.x2) + (this.y1-this.y2)*(this.y1-this.y2));
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
			this.ctx.strokeStyle = `rgba(102,102,102,${this.alpha})`;
			this.ctx.beginPath();
			this.ctx.moveTo(this.x1, this.y1);
			this.ctx.lineTo(this.x2, this.y2);
			this.ctx.stroke();
		}
	}
}
