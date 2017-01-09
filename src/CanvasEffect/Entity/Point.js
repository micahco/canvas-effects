import Entity from '../Entity';

export default class Point extends Entity {
	constructor(ctx, x, y) {
		super(ctx);
		this.x = x;
		this.y = y;
		this.speed = this.getRandomArbitrary(0.2, 0.1); 	// slow
		//this.speed = this.getRandomArbitrary(5, 2.5);		// fast
		this.radius = this.getRandomArbitrary(3, 1);
		this.theta = this.getRandomTheta();
		this.color = '#666666';
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
	}
	getRandomTheta() {
		let angles = [1/6, 1/4, 1/3, 2/3, 3/4, 5/6, 7/6, 6/5, 4/3, 5/3, 7/4, 11/6];
		return Math.PI + angles[Math.floor(Math.random() * angles.length)];
	}
	update() {
		if (this.x <= 0 || this.x >= this.cw) {
			this.theta = Math.PI - this.theta;
		}
		if (this.y <= 0 || this.y >= this.ch) {
			this.theta = 2*Math.PI - this.theta;
		}
		this.x += Math.cos(this.theta) * this.speed;
		this.y += Math.sin(this.theta) * this.speed;
	}
	render() {
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		this.ctx.fill();
	}
}
