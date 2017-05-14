import Entity from '../CanvasEffect/Entity';


export default class Point extends Entity {
	constructor(ctx, pos) {
		super(ctx);
		this.pos = pos;
		this.radius = 1;
		this.velocity;
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
	}
	init() {
		this.pos[2] = this.getRandomArbitrary(100,0);
	}
	update() {}
	render() {
		this.ctx.beginPath();
		this.ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
		this.ctx.fill();
	}
}
