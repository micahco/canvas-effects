import Entity from '../CanvasEffect/Entity';

export default class Point extends Entity {
	constructor(ctx, x, y) {
		super(ctx);
		this.x = x;
		this.y = y;
		this.color = [0,0,0,1];
		this.radius = this.getRandomArbitrary(4, 2);
		this.speed = this.getRandomArbitrary(0.2, 0.1);
		this.theta = this.getRandomTheta();
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
	}
	getRandomTheta() {
		return Math.random() * 2 * Math.PI;
	}
	isValidRGBA(array) {
		return array[0] <= 255 && array[1] <= 255 && array[2] <= 255 && array[3] <= 1;
	}
	init(config) {
		if (config) {
			if (config.color && config.color.length == 4 && this.isValidRGBA(config.color)) {
				this.color = config.color;
			}
			if (config.radius && config.radius.length == 2 && config.radius[0] > config.radius[1]) {
				this.radius = this.getRandomArbitrary(config.radius[0], config.radius[1]);
			}
			if (config.speed && config.speed.length == 2 && config.speed[0] > config.speed[1]) {
				this.speed = this.getRandomArbitrary(config.speed[0], config.speed[1]);
			}
		}
	}
	update() {
		if (this.x <= 0 + this.radius || this.x >= this.cw - this.radius) {
			this.theta = Math.PI - this.theta;
		}
		if (this.y <= 0 + this.radius || this.y >= this.ch - this.radius) {
			this.theta = 2*Math.PI - this.theta;
		}
		this.x += Math.cos(this.theta) * this.speed;
		this.y += Math.sin(this.theta) * this.speed;
	}
	render() {
		this.ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.color[3]})`;
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		this.ctx.fill();
	}
}
