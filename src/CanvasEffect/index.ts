import { requestAnimFrame, cancelAnimFrame } from './requestAnimationFrame';

export interface Config {
	container: string;
	width: any;
	height: any;
}

export default abstract class CanvasEffect<T extends Config> {
	readonly config: T;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	requestId: any;
	delay: number;
	timer: number;
	constructor(config: T) {
		this.config = config;
		this.canvas;
		this.ctx;
		this.delay = 200;
		this.requestId;
		this.timer;
		this.createCanvas();
		this.setCanvasSize();
	}
	init(): void {
		if (!this.requestId) {
			this.main();
		}
	}
	main(): void {
		this.requestId = requestAnimFrame(this.main.bind(this));
		this.update();
		this.render();
	}
	abstract update(): void;
	render(): void {
		this.clear();
	}
	debounce(): void {
		if (this.requestId) {
		   cancelAnimationFrame(this.requestId);
		   this.requestId = undefined;
		}
		clearTimeout(this.timer);
		this.timer = setTimeout(this.resize.bind(this), this.delay);
		this.clear();
	}
	resize(): void {
		this.setCanvasSize();
		this.init();
	}
	clear(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	createCanvas(): void {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		const container: Element = document.querySelector(this.config.container);
		if (container && container.nodeName == 'DIV') {
			container.appendChild(this.canvas);
		} else {
			throw new TypeError(`Invalid container: ${this.config.container}.`);
		}
	}
	hasValidDimensions(w: any, h: any): boolean {
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
	setCanvasSize(): void {
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
			this.canvas.width = width;
			this.canvas.height = height;
		} else {
			throw new TypeError(`Invalid dimensions: ${width}, ${height}.`);
		}
	}
}
