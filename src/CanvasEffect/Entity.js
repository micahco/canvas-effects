import * as validate from './validate';

export default class Entity {
	constructor(ctx) {
		this.ctx = ctx;
		this.cw = this.ctx.canvas.width;
		this.ch = this.ctx.canvas.height;
		this.validate = validate;
	}
	init() {}
	update() {}
	render() {}
}
