import CanvasEffect from '../CanvasEffect';
import Triangle from './Triangle';
import Delaunay from 'faster-delaunay';


export default class Polygonal extends CanvasEffect {
	constructor(config) {
		super(config);
		this.complexity;
		this.minProximity = 100;
		this.seed = 8000;
		this.triangles = [];
		this.verticies = [];
		this.init();
	}
	getComplexity(seed) {
		return this.canvas.width * this.canvas.height / seed;
	}
	triangulation(v) {
		let d = new Delaunay(v);
		let t = d.triangulate();
		let k = 0;
		for (let i = 0; i < t.length; i+=3) {
			this.triangles[k] = new Triangle(this.ctx, t[i], t[i+1], t[i+2]);
			this.triangles[k].init(this.config.triangle);
			k++;
		}
	}
	hasSpacing(x, y) {
		for (let i = 0; i < this.verticies.length; i++) {
			var a = x - this.verticies[i][0];
			var b = y - this.verticies[i][1];
			var c = Math.sqrt( a*a + b*b );
			if (c < this.minProximity) {
				console.log('too close');
				return false;
			}
		}
		return true;
	}
	init() {
		this.complexity = this.getComplexity(this.config.seed || this.seed);
		let i = 0;
		do {
			let x = Math.random() * this.canvas.width;
			let y = Math.random() * this.canvas.height;
			if (this.hasSpacing(x, y)) {
				let x = Math.random() * this.canvas.width;
				let y = Math.random() * this.canvas.height;
				this.verticies[i] = [x,y];
				i++;
			}
		} while (i < this.complexity);
		this.triangulation(this.verticies);
		super.init();
	}
	update() {

	}
	render() {
		super.render();
		for (let j = 0; j < this.triangles.length; j++) {
			this.triangles[j].render();
		}
	}
}
