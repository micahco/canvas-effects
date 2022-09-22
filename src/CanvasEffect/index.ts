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
		const el: Element | null = document.querySelector(this.config.selector);
		if (el) {
			el.appendChild(this.canvas);
		} else {
			throw new TypeError(`Invalid selector: ${this.config.selector}.`);
		}
	}
	private setCanvasSize(): void {
		let width = this.config.width;
		let height = this.config.height;
		let listen = false;
		if (!isFinite(width)) {
			width = window.innerWidth;
			listen = true;
		}
		if (!isFinite(height)) {
			height = window.innerHeight;
			listen = true;
		}
		if (listen) {
			window.addEventListener('resize', this.debounce.bind(this));
		}
		this.canvas!.width = width;
		this.canvas!.height = height;
	}
}