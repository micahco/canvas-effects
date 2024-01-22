import * as validate from '../CanvasEffect/validate'
import { LineConfig, ColorRGBA } from '../types'

export default class Line {
	private ctx: CanvasRenderingContext2D
	private a: [number, number]
	private b: [number, number]
	private alpha: number
	private color: ColorRGBA
	private fade: boolean
	private max: number
	private width: number
	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx
		this.a = [0,0]
		this.b = [0,0]
		this.alpha = 0
		this.color = [0,0,0,1]
		this.fade = true
		this.max = 100
		this.width = 1
	}
	init(config?: LineConfig): void {
		if (config) {
			if (config.color && validate.color(config.color)) {
				this.color = config.color
			}
			if (validate.boolean(config.fade)) {
				this.fade = config.fade!
			}
			if (config.max && validate.number(config.max)) {
				this.max = config.max
			}
			if (config.width && validate.number(config.width)) {
				this.width = config.width
			}
		}
	}
	update(a: [number, number], b: [number, number]): void {
		this.a = a
		this.b = b
	}
	render(): void {
		if (this.getDistance() < this.max) {
			if (this.fade) {
				this.alpha = 1 - (this.getDistance() / this.max)
			} else {
				this.alpha = this.color[3]
			}
		} else {
			this.alpha = 0
		}
		if (this.alpha > 0) {
			this.ctx.strokeStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`
			this.ctx.lineWidth = this.width
			this.ctx.beginPath()
			this.ctx.moveTo(this.a[0], this.a[1])
			this.ctx.lineTo(this.b[0], this.b[1])
			this.ctx.stroke()
		}
	}
	private getDistance(): number {
		return Math.sqrt((this.a[0]-this.b[0])*(this.a[0]-this.b[0]) + (this.a[1]-this.b[1])*(this.a[1]-this.b[1]))
	}
}
