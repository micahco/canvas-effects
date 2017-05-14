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
	triangleHasPeak(v, i) {
		let a;
		let b;
		switch (i%3) {
			case 1:
				a = i - 1;
				b = i + 1;
				break;
			case 2:
				a = i - 2;
				b = i - 1;
				break;
			default:
				a = i + 1;
				b = i + 2;
		}
		if (v[a][2] || v[b][2]) {
			return true;
		}
		return false;
	}
	elevate(v) {
		for (let i = 0; i < v.length; i++) {
			if (!v[i][2]) {
				let hasAdjacentPeak = false;
				let j = i;
				do {
					if (v[j] == v[i] && this.triangleHasPeak(v, j)) {
						hasAdjacentPeak = true;
					}
					j++;
				} while (j < v.length && !hasAdjacentPeak);
				for (let k = i; k < v.length; k++) {
					if (v[k] == v[i]) {
						if (!hasAdjacentPeak) {
							v[k][2] = 1;
						} else {
							v[k][2] = 0;
						}
					}
				}
				if (!hasAdjacentPeak) {
					v[i][2] = 1;
				} else {
					v[i][2] = 0;
				}
			}
			console.log(v[i][2]);
		}
		return v;
	}
	triangulate(p) {
		let d = new Delaunay(p);
		let t = d.triangulate();
		let v = this.elevate(t);
		let k = 0;
		for (let i = 0; i < t.length; i+=3) {
			this.triangles[k] = new Triangle(this.ctx, v[i], v[i+1], v[i+2]);
			this.triangles[k].init(this.config.triangle);
			k++;
		}
	}
	init() {
		this.complexity = this.getComplexity(this.config.seed || 12000);
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
