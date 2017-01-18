import Entity from '../CanvasEffect/Entity';

export default class Line extends Entity {
	constructor(ctx, x, y, l, c) {
		super(ctx);
		this.x1 = x;
		this.y1 = y;
		this.x2;
		this.y2;
		this.layer = l;
		this.layerCount = c;
		this.alpha = this.getLayerAlpha();
		this.color = [0,0,0,1];
		this.length = this.getRandomArbitrary(50, 25);
		this.speed = this.getRandomArbitrary(2, 1);
		this.theta = Math.PI / 6;
		this.width = 5;
	}
	isValidRGBA(array) {
		return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
	}
	getLayerAlpha() {
		return this.layer / this.layerCount;
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
	}
	calculateEndPoint() {
		this.x2 = this.x1 + (this.length * Math.cos(this.theta));
		this.y2 = this.y1 + (this.length * Math.sin(this.theta));
	}
	init(config) {
		if (config) {
			if (config.color && config.color.length == 4 && this.isValidRGBA(config.color)) {
				this.color = config.color;
			}
			this.max = config.max || this.max;
			this.width = config.width || this.width;
		}
	}
	update() {
		if (this.x1 < this.cw || this.y1 < this.ch) {
			this.x1 += this.speed * Math.cos(this.theta);
			this.y1 += this.speed * Math.sin(this.theta);
		} else {
			if (Math.random() > 0.5) {
				this.x1 = Math.random() * this.cw;
				this.y1 = -this.length;
			} else {
				this.x1 = -this.length;
				this.y1 = Math.random() * this.ch;
			}
		}
		this.calculateEndPoint();
	}
	render() {
		this.ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
		this.ctx.lineWidth = this.width;
		this.ctx.beginPath();
		this.ctx.moveTo(this.x1, this.y1);
		this.ctx.lineTo(this.x2, this.y2);
		this.ctx.stroke();
	}
}
