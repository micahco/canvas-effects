import Entity from '../Entity';

export default class Line extends Entity {
	constructor(ctx) {
		super(ctx);
		this.max = 100;
		this.alpha = 0;
		this.fade = 0.05;
	}
	inProximity() {
		return Math.abs(this.x1 - this.x2) <= this.max &&
			   Math.abs(this.y1 - this.y2) <= this.max;
	}
	update(x1, y1, x2, y2) {
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
	}
	render() {
		if (this.inProximity()) {
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
