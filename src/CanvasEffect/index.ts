import { requestAnimFrame } from './requestAnimationFrame'
import { Config } from '../types'
import * as validate from './validate'

export default abstract class CanvasEffect<TConfig extends Config> {
	protected config: TConfig
	protected canvas: HTMLCanvasElement
	protected ctx: CanvasRenderingContext2D | null
	private requestId: any
	private delay: number
	private fps: number
	private timer?: number

	constructor(item: HTMLCanvasElement, config: TConfig) {
		this.config = config
		this.canvas = item
		this.ctx = item.getContext('2d')
		this.delay = 200
		this.fps = 60
		this.setCanvasSize()
	}

	protected init(): void {
		if (!this.requestId) {
			this.main()
		}
	}

	public updateConfig(config: TConfig): void {
		if (config.width && (config.width === Infinity || validate.number(config.width))) {
			this.config.width = config.width
		}
		if (config.height && (config.height === Infinity || validate.number(config.height))) {
			this.config.height = config.height
		}
	}
	protected abstract render(): void

	protected clear(): void {
		if (this.ctx != null) {
			this.ctx.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
		}
	}

	private main(): void {
		this.requestId = requestAnimFrame(this.main.bind(this), this.fps)
		this.render()
	}

	private resize(): void {
		this.setCanvasSize()
		this.init()
	}

	private setCanvasSize(): void {
		let height = this.config.height
		let width = this.config.width
		let listen = false
		var isMobile = ('ontouchstart' in document.documentElement && /mobi/i.test(navigator.userAgent))
		if (!isMobile && this.canvas.parentElement) {
			if (!isFinite(height)) {
				height = this.canvas.parentElement.clientWidth
				listen = true
			}
			if (!isFinite(width)) {
				width = this.canvas.parentElement.clientWidth
				listen = true
			}
		}
		if (listen) {
			window.addEventListener('resize', this.debounce.bind(this))
		}
		this.canvas!.height = height
		this.canvas!.width = width
	}

	private debounce(): void {
		if (this.requestId) {
		   cancelAnimationFrame(this.requestId)
		   this.requestId = undefined
		}
		if (this.timer != null) {
			window.clearTimeout(this.timer)
		}
		this.timer = window.setTimeout(this.resize.bind(this), this.delay)
		this.clear()
	}
}
