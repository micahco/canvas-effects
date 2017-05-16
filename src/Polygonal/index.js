import CanvasEffect from '../CanvasEffect';
import Triangle from './Triangle';
import Delaunay from 'faster-delaunay';

export default class Polygonal extends CanvasEffect {
	constructor(config) {
		super(config);
		this.complexity;
		this.debug = false;
		this.light = [-10,10];
		this.lightOG;
		this.mouse = true;
		this.seed = 6000;
		this.triangles;
		this.init();
	}
	getComplexity(seed) {
		return Math.round(this.canvas.width * this.canvas.height / seed);
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
	}
	getMousePosition(e) {
		let rect = this.canvas.getBoundingClientRect();
	    return [
	    	e.clientX - rect.left,
	    	e.clientY - rect.top
	    ];
	}
	onMouseMove(e) {
		var pos = this.getMousePosition(e);
		this.light = [
			(pos[0] - this.canvas.width/2)/this.canvas.width*10*Math.abs(this.lightOG[0]),
			(-(pos[1] - this.canvas.height/2))/this.canvas.height*10*Math.abs(this.lightOG[1])
		];
	}
	elevate(v) {
		for (let i = 0; i < v.length; i++) {
			let z = this.getRandomArbitrary(1,0);
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
		this.vertices = v;
		let k = 0;
		for (let i = 0; i < v.length; i+=3) {
			this.triangles[k] = new Triangle(this.ctx, this.light, v[i], v[i+1], v[i+2]);
			this.triangles[k].init(this.config);
			k++;
		}
	}
	generate() {
		let p = [];
		let pad = 200;
		let cw = this.canvas.width+pad*2;
		let ch = this.canvas.height+pad*2;
		let iy = ch/Math.round(Math.sqrt((ch*this.complexity)/cw));
		let ix = cw/Math.round(this.complexity/Math.sqrt((ch*this.complexity)/cw));
		let k = 0;
		for (let y = -pad; y < this.canvas.height+pad; y+=iy) {
			for (let x = -pad; x < this.canvas.width+pad; x+=ix) {
				p[k] = [
					this.getRandomArbitrary(x,x+ix),
					this.getRandomArbitrary(y,y+iy),
				];
				k++;
			}
		}
		this.triangulate(p);
	}
	init() {
		this.color = this.config.color ? this.config.color : this.color;
		this.complexity = this.getComplexity(this.config.seed || this.seed);
		this.debug = this.config.debug ? this.config.debug : this.debug;
		if (this.config.light && this.config.light.length == 2) {
			this.light = this.config.light;
		}
		this.lightOG = this.light;
		this.mouse = this.config.mouse ? this.config.mouse : this.mouse;
		this.triangles = [];
		this.generate()
		this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
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
				this.ctx.font = "10px monospace";
				this.ctx.fillStyle = 'red';
				this.ctx.fillText(`${parseFloat(this.vertices[j][2]).toFixed(2)}`, this.vertices[j][0], this.vertices[j][1]);
			}
		}
	}
}
