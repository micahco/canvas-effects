import { requestAnimFrame, cancelAnimFrame } from './requestAnimationFrame';
import { Config } from '../types';

export default abstract class CanvasEffect<T extends Config> {
	protected readonly config: T;
	protected canvas: HTMLCanvasElement | null;
	protected ctx: CanvasRenderingContext2D | null;
	private requestId: any;
	private delay: number;
	private fps: number;
	private timer?: number;
	constructor(config: T) {
		this.config = config;
		this.canvas = null;
		this.ctx = null
		this.delay = 200;
		this.fps = 60;
		this.createCanvas();
		this.setCanvasSize();
	}
	protected init(): void {
		if (!this.requestId) {
			this.main();
		}
	}
	protected abstract update(): void;
	protected render(): void {
		this.clear();
	}
	private main(): void {
		this.requestId = requestAnimFrame(this.main.bind(this), this.fps);
		this.update();
		this.render();
	}
	private debounce(): void {
		if (this.requestId) {
		   cancelAnimationFrame(this.requestId);
		   this.requestId = undefined;
		}
		if (this.timer != null) {
			window.clearTimeout(this.timer);
		}
		this.timer = window.setTimeout(this.resize.bind(this), this.delay);
		this.clear();
	}
	private resize(): void {
		this.setCanvasSize();
		this.init();
	}
	private clear(): void {
		if (this.ctx != null) {
			this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
		}
	}
	private createCanvas(): void {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		const container: Element | null = document.querySelector(this.config.container);
		if (container && container.nodeName == 'DIV') {
			container.appendChild(this.canvas);
		} else {
			throw new TypeError(`Invalid container: ${this.config.container}.`);
		}
	}
	private hasValidDimensions(w: any, h: any): boolean {
		if (typeof w == 'number' || typeof w == 'string') {
			if (typeof w == 'string' && w.slice(-1) != '%') {
				return false;
			}
			return true;
		}
		if (typeof h == 'number' || typeof h == 'string') {
			if (typeof h == 'string' && h.slice(-1) != '%') {
				return false;
			}
			return true;
		}
		return false;
	}
	private setCanvasSize(): void {
		let width: any = this.config.width;
		let height: any = this.config.height;
		if (this.hasValidDimensions(width, height)) {
			if (typeof width == 'string' || typeof height == 'string') {
				let per: number = width.slice(0, -1);
				if (typeof width == 'string') {
					width = (per/100) * window.innerWidth;
				}
				if (typeof height == 'string') {
					height = (per/100) * window.innerHeight;
				}
				window.addEventListener('resize', this.debounce.bind(this));
			}
			this.canvas!.width = width;
			this.canvas!.height = height;
		} else {
			throw new TypeError(`Invalid dimensions: ${width}, ${height}.`);
		}
	}
}
