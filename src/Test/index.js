import CanvasEffect from '../CanvasEffect';
import Line from './Line';

export default class Test extends CanvasEffect {
	constructor(config) {
		super(config);
		this.complexity;
		this.layers;
		this.lines;
		this.init();
	}
	getComplexity(seed) {
		return this.canvas.width * this.canvas.height / seed;
	}
	init() {
		this.complexity = this.getComplexity(this.config.seed || 10000);
		this.layers = this.config.layers || 2;
		this.lines = [];
		let k = 0;
		for (let i = 1; i <= this.layers; i++) {
			for (let j = 0; j < (this.complexity / i); j++) {
				let x = Math.random() * this.canvas.width;
				let y = Math.random() * this.canvas.height;
				this.lines[k] = new Line(this.ctx, x, y, i, this.layers);
				k++;
			}
		}
		super.init();
	}
	update() {
		for (let i = 0; i < this.lines.length; i++) {
			this.lines[i].update();
		}
	}
	render() {
		super.render();
		for (let i = 0; i < this.lines.length; i++) {
			this.lines[i].render();
		}
	}
}
