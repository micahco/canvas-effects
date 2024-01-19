import CanvasEffect from '../CanvasEffect';
import { DelaunayConfig, Point3D} from '../types';
import Triangle from './Triangle';
import * as validate from '../CanvasEffect/validate';
import { makeNoise2D } from "open-simplex-noise";
import type { Noise2D } from 'open-simplex-noise/lib/2d';
import Delaunator from 'delaunator';

export class Delaunay extends CanvasEffect<DelaunayConfig> {
	private seed: number;
	private apex: number;
	private complexity: number;
	private light: Point3D;
	private simplex: Noise2D;
	private triangles: Triangle[];

	constructor(item: HTMLCanvasElement, config: DelaunayConfig) {
		super(item, config);
		this.seed = 5000;
		if (config.seed && validate.number(config.seed)) {
			this.seed = config.seed;
		}
		this.apex = this.getApexHeight();
		this.complexity = this.getComplexity(this.seed);
		this.light = this.getCenterLight(this.apex);
		this.simplex = makeNoise2D(Date.now());
		this.triangles = [];
		this.init();
	}

	protected init(): void {
		this.generate()	
		this.canvas!.addEventListener('mousemove', this.onMouseMove.bind(this), false);
		super.init();
	}

	public updateConfig(config: DelaunayConfig): void {
		super.updateConfig(config)
		if (config.seed && validate.number(config.seed) && (config.seed != this.config.seed)) {
			this.config.seed = config.seed
			this.complexity = this.getComplexity(config.seed);
			this.triangles = []
			this.generate();
		}
		if (config.color && validate.color(config.color)) {
			this.config.color = config.color
		}
		if (validate.boolean(config.mouse)) {
			this.config.mouse = config.mouse
		}
		if (config.shade && validate.number(config.shade)) {
			this.config.shade = config.shade
		}
		if (config.stroke && config.stroke.color && validate.color(config.stroke.color)) {
			if (this.config.stroke) {
				this.config.stroke.color = config.stroke.color
			} else {
				this.config.stroke = {color: config.stroke.color}
			}
		}
		if (config.stroke && config.stroke.width && validate.number(config.stroke.width)) {
			if (this.config.stroke) {
				this.config.stroke.width = config.stroke.width
			} else {
				this.config.stroke = {width: config.stroke.width}
			}
		}
		if (config.color || config.stroke) {
			for (let t = 0; t < this.triangles.length; t++) {
				this.triangles[t].init(config)
			}
		}
	}

	protected render(): void {
		super.clear();
		for (let i = 0; i < this.triangles.length; i++) {
			this.triangles[i].update(this.light);
			this.triangles[i].render();
		}
	}

	private generate(): void {
		let points: Point3D[] = [];
		const pad = (this.canvas!.width+this.canvas!.height)/10;
		const cw = Math.floor(this.canvas!.width+pad*2);
		const ch = Math.floor(this.canvas!.height+pad*2);
		const iy = ch/Math.round(Math.sqrt((ch*this.complexity)/cw));
		const ix = cw/Math.round(this.complexity/Math.sqrt((ch*this.complexity)/cw));
		const h = this.apex;

		for (let y = -pad; y < this.canvas!.height+pad; y+=iy) {
			for (let x = -pad; x < this.canvas!.width+pad; x+=ix) {
				const px = this.getRandomArbitrary(x,x+ix);
				const py = this.getRandomArbitrary(y,y+iy);
				const pz = ((this.simplex(px, py)+1)/2)*h;
				points.push([px, py, pz]);
			}
		}

		points = this.triangulate(points);
		for (let i = 0, j = 0; j < points.length; i++, j+=3) {
			this.triangles[i] = new Triangle(this.ctx!, this.light, points[j], points[j+1], points[j+2]);
			this.triangles[i].init(this.config);
		}
	}

	private triangulate(points: Point3D[]): Point3D[] {
		let tp: number[] = [];
		points.forEach((p) => {
			tp.push(p[0])
			tp.push(p[1])
		})

		const d = new Delaunator(tp).triangles;
		const t: Point3D[] = [];
		for (var i = 0; i < d.length; i++) {
			t.push(points[d[i]]);
		}

		return t;
	}

	private getCenterLight(height: number): Point3D{
		return [
			this.canvas!.width/2,
			this.canvas!.height/2,
			height
		];
	}

	private getApexHeight(): number {
		return (this.canvas!.height+this.canvas!.width)/2;
	}

	private getComplexity(seed: number): number {
		return Math.floor((this.canvas!.width * this.canvas!.height * 5) / (seed));
	}

	private getRandomArbitrary(max: number, min: number): number {
		return Math.random()*(max-min)+min;
	}

	private getCenteroid(a: Point3D, b: Point3D, c: Point3D): [number, number] {
		return [
			(a[0]+b[0]+c[0])/3,
			(a[1]+b[1]+c[1])/3
		];
	}

	private getMousePosition(e: MouseEvent): [number, number] {
		const rect: DOMRect = this.canvas!.getBoundingClientRect();
		return [e.clientX-rect.left, e.clientY-rect.top];
	}
	
	private onMouseMove(e: MouseEvent): void {
		if (this.config.mouse) {
			const pos = this.getMousePosition(e);
			this.light = [pos[0], pos[1], this.light[2]];
		}
	}
}
