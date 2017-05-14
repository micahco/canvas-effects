import CanvasEffect from '../CanvasEffect';
import Triangle from './Triangle';
import Delaunay from 'faster-delaunay';

export default class Polygonal extends CanvasEffect {
	constructor(config) {
		super(config);
		this.complexity;
		this.triangles;
		this.init();
	}
	getComplexity(seed) {
		return Math.round(this.canvas.width * this.canvas.height / seed);
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
	}
	elevate(v) {
		for (let i = 0; i < v.length; i++) {
			let z = this.getRandomArbitrary(1,0.25);
			if (!v[i][2]) {
				for (let j = i+1; j < v.length; j++) {
					if (v[i] == v[j]) {
						v[j][2] = z;
					}
				}
				v[i][2] = z;
			}
		}
		return v;
	}
	triangulate(p) {
		let d = new Delaunay(p);
		let t = d.triangulate();
		let v = this.elevate(t);
		let k = 0;
		for (let i = 0; i < t.length; i+=3) {
			this.triangles[k] = new Triangle(this.ctx, this.complexity, v[i], v[i+1], v[i+2]);
			this.triangles[k].init(this.config);
			k++;
		}
	}
	init() {
		this.complexity = this.getComplexity(this.config.seed || 4000);
		this.triangles = [];
		let points = [];
		let pad = 200;
		let cw = this.canvas.width+pad*2;
		let ch = this.canvas.height+pad*2;
		let iy = ch/Math.round(Math.sqrt((ch*this.complexity)/cw));
		let ix = cw/Math.round(this.complexity/Math.sqrt((ch*this.complexity)/cw));
		let k = 0;
		for (let y = -pad; y < this.canvas.height+pad; y+=iy) {
			for (let x = -pad; x < this.canvas.width+pad; x+=ix) {
				points[k] = [
					this.getRandomArbitrary(x,x+ix),
					this.getRandomArbitrary(y,y+iy),
				];
				k++;
			}
		}
		this.triangulate(points);
		super.init();
	}
	update() {
		for (let i = 0; i < this.triangles.length; i++) {
			this.triangles[i].update();
		}
	}
	render() {
		super.render();
		for (let i = 0; i < this.triangles.length; i++) {
			this.triangles[i].render();
		}
	}
}
