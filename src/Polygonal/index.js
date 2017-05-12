import CanvasEffect from '../CanvasEffect';
import Triangle from './Triangle';
import Delaunay from 'faster-delaunay';


export default class Polygonal extends CanvasEffect {
	constructor(config) {
		super(config);
		this.complexity;
		this.triangles;
		this.verticies;
		this.init();
	}
	getComplexity(seed) {
		return Math.round(this.canvas.width * this.canvas.height / seed);
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
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
	init() {
		this.complexity = this.getComplexity(this.config.seed || 8000);
		this.triangles = [];
		this.verticies = [];
		let pad = 50;
		let cw = this.canvas.width+pad*2;
		let ch = this.canvas.height+pad*2;
		let iy = ch/Math.round(Math.sqrt((ch*this.complexity)/cw));
		let ix = cw/Math.round(this.complexity/Math.sqrt((ch*this.complexity)/cw));
		let k = 0;
		for (let y = -pad; y < this.canvas.height+pad; y+=iy) {
			for (let x = -pad; x < this.canvas.width+pad; x+=ix) {
				this.verticies[k] = [
					this.getRandomArbitrary(x,x+ix),
					this.getRandomArbitrary(y,y+iy),
				];
				k++;
			}
		}
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
