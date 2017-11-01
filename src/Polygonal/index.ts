import CanvasEffect from '../CanvasEffect';
import Triangle from './Triangle';
import * as validate from '../CanvasEffect/validate';
import * as Delaunator from 'delaunator';
import OpenSimplexNoise from 'open-simplex-noise';

export interface Config {
	container: string;
	width: any;
	height: any;
	seed?: number;
	color?: [number, number, number, number];
	mouse?: boolean;
	max?: number;
	stroke?: {
		color?: [number, number, number, number];
		width?: number;
	}
}

export default class Polygonal extends CanvasEffect<Config> {
	complexity: number;
	light: [number, number, number];
	mouse: boolean;
	seed: number;
	triangles: Array<Triangle>;
	constructor(config: Config) {
		super(config);
		this.complexity;
		this.light = this.getLightSource();
		this.mouse = true;
		this.seed = 8000;
		this.triangles;
		this.init();
	}
	init(): void {
		if (validate.number(this.config.seed)) {
			this.complexity = this.getComplexity(this.config.seed);
		} else {
			this.complexity = this.getComplexity(this.seed);
		}
		this.mouse = validate.boolean(this.config.mouse) ? this.config.mouse : this.mouse;
		this.triangles = [];
		this.generate()
		if (this.mouse) {
			addEventListener('mousemove', this.onMouseMove.bind(this), false);
		}		
		super.init();
	}
	update(): void {
		for (let i = 0; i < this.triangles.length; i++) {
			this.triangles[i].update(this.light);
		}
	}
	render(): void {
		super.render();
		for (let i = 0; i < this.triangles.length; i++) {
			this.triangles[i].render();
		}
	}
	generate(): void {
		let points: number[][] = [];
		const pad = (this.canvas.width+this.canvas.height)/10;
		const cw = Math.floor(this.canvas.width+pad*2);
		const ch = Math.floor(this.canvas.height+pad*2);
		const iy = ch/Math.round(Math.sqrt((ch*this.complexity)/cw));
		const ix = cw/Math.round(this.complexity/Math.sqrt((ch*this.complexity)/cw));
		let i = 0;
		for (let y = -pad; y < this.canvas.height+pad; y+=iy) {
			for (let x = -pad; x < this.canvas.width+pad; x+=ix) {
				points[i] = [
					this.getRandomArbitrary(x,x+ix),
					this.getRandomArbitrary(y,y+iy),
				];
				i++;
			}
		}
		const height = (this.canvas.height+this.canvas.width)/2;
		points = this.triangulate(points);
		points = this.elevate(points, height);
		let j = 0;
		for (let k = 0; k < points.length; k+=3) {
			this.triangles[j] = new Triangle(this.ctx, this.light, points[k], points[k+1], points[k+2]);
			this.triangles[j].init(this.config);
			j++;
		}
	}
	triangulate(points: number[][]): Array<[number, number]> {
		const d = new Delaunator(points).triangles;
		const t = [];
		for (var i = 0; i < d.length; i ++) {
			t.push(points[d[i]]);
		}
		return t;
	}
	elevate(points: number[][], height: number): number[][] {
		const simplex = new OpenSimplexNoise(this.seed);
		for (let i = 0; i < points.length; i++) {
			points[i][2] = ((simplex.noise2D(points[i][0], points[i][1])+1)/2)*height;
		}
		return points;
	}
	getLightSource(): [number, number, number] {
		return [
			this.canvas.width/2,
			this.canvas.height/2,
			this.canvas.width
		];
	}
	getComplexity(seed: number): number {
		return Math.floor(this.canvas.width*this.canvas.height/seed);
	}
	getRandomArbitrary(max: number, min: number): number {
		return Math.random()*(max-min)+min;
	}
	getCenteroid(a, b, c): [number, number] {
		return [
			(a[0]+b[0]+c[0])/3,
			(a[1]+b[1]+c[1])/3
		];
	}
	getMousePosition(e: MouseEvent): [number, number] {
		const rect: ClientRect = this.canvas.getBoundingClientRect();
		return [e.clientX, e.clientY];
	}
	onMouseMove(e: MouseEvent): void {
		const pos: [number, number] = this.getMousePosition(e);
		this.light = [
			(pos[0]/this.canvas.width)*this.light[2],
			(pos[1]/this.canvas.height)*this.light[2],
			this.light[2]
		];
	}
}
