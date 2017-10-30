import CanvasEffect from '../CanvasEffect';
import Triangle from './Triangle';
import * as validate from '../CanvasEffect/validate';

// TODO: write own algorithm to remove dependency
import Delaunay from 'faster-delaunay';

export default class Polygonal extends CanvasEffect {
	constructor(config) {
		super(config);
		this.complexity;
		this.debug = false;
		this.light = this.getLightSource();
		this.mouse = true;
		this.seed = 12000;
		this.triangles;
		this.vertices;
		this.init();
	}
	init() {
		if (validate.number(this.config.seed)) {
			this.complexity = this.getComplexity(this.config.seed);
		} else {
			this.complexity = this.getComplexity(this.seed);
		}
		this.debug = validate.boolean(this.config.debug) ? this.config.debug : this.debug;
		this.mouse = validate.boolean(this.config.mouse) ? this.config.mouse : this.mouse;
		this.triangles = [];
		this.generate()
		if (this.mouse) {
			addEventListener('mousemove', this.onMouseMove.bind(this), false);
		}		
		super.init();
	}
	update() {
		for (let i = 0; i < this.triangles.length; i++) {
			this.triangles[i].update(this.light);
		}
	}
	render() {
		super.render();
		for (let i = 0; i < this.triangles.length; i++) {
			this.triangles[i].render();
		}
		if (this.debug) {
			for (let j = 0; j < this.vertices.length; j++) {
				this.ctx.font = "12px monospace";
				this.ctx.fillStyle = 'red';
				this.ctx.fillText(parseInt(this.vertices[j][2]), this.vertices[j][0], this.vertices[j][1]);
			}
		}
	}
	elevate(v) {
		for (let i = 0; i < v.length; i++) {
			const h = this.getRandomArbitrary(this.canvas.width, 0);
			if (!v[i][2]) {
				for (let j = i+1; j < v.length; j++) {
					if (v[i] == v[j]) {
						v[j][2] = h;
					}
				}
				v[i][2] = h;
			}
		}
		return v;
	}
	generate() {
		const p = [];
		const pad = (this.canvas.width+this.canvas.height)/10;
		const cw = this.canvas.width+pad*2;
		const ch = this.canvas.height+pad*2;
		const iy = ch/Math.round(Math.sqrt((ch*this.complexity)/cw));
		const ix = cw/Math.round(this.complexity/Math.sqrt((ch*this.complexity)/cw));
		let i = 0;
		for (let y = -pad; y < this.canvas.height+pad; y+=iy) {
			for (let x = -pad; x < this.canvas.width+pad; x+=ix) {
				p[i] = [
					this.getRandomArbitrary(x,x+ix),
					this.getRandomArbitrary(y,y+iy),
				];
				i++;
			}
		}
		const t = new Delaunay(p).triangulate();
		this.vertices = this.elevate(t);
		let j = 0;
		for (let k = 0; k < this.vertices.length; k+=3) {
			this.triangles[j] = new Triangle(this.ctx, this.light, this.vertices[k], this.vertices[k+1], this.vertices[k+2]);
			this.triangles[j].init(this.config);
			j++;
		}
	}
	getLightSource() {
		return [
			this.canvas.width/2,
			this.canvas.height/2,
			(this.canvas.width+this.canvas.height)/2
		];
	}
	getComplexity(seed) {
		return Math.round(this.canvas.width*this.canvas.height/seed);
	}
	getRandomArbitrary(max, min) {
		return Math.random()*(max-min)+min;
	}
	getMousePosition(e) {
		const rect = this.canvas.getBoundingClientRect();
	    return [e.clientX, e.clientY];
	}
	onMouseMove(e) {
		const pos = this.getMousePosition(e);
		this.light = [
			(pos[0]/this.canvas.width)*this.light[2],
			(pos[1]/this.canvas.height)*this.light[2],
			this.light[2]
		];
	}
}
