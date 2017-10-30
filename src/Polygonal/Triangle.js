import * as validate from '../CanvasEffect/validate';

// math equations: Dan Avila <daniel.avila@yale.edu>
// light intesity: https://stackoverflow.com/a/31682068/4616986

export default class Triangle {
	constructor(ctx, light, a, b, c) {
		this.ctx = ctx;
		this.light = light;
		this.a = a;
		this.b = b;
		this.c = c;
		this.debug = false;
		this.color = [255,255,255,1];
		this.hue = this.color;
		this.dark = this.isDark(this.color);
	}
	init(config) {
		this.color = validate.color(config.color) ? config.color : this.color;
		this.debug = validate.boolean(config.debug) ? config.debug : this.debug;
		this.shader();
	}
	update(light) {
		this.light = light;
		this.shader();
	}
	render() {
		this.ctx.fillStyle = `rgba(${this.hue[0]},${this.hue[1]},${this.hue[2]},${this.hue[3]})`;
		this.ctx.strokeStyle = `rgba(${this.hue[0]},${this.hue[1]},${this.hue[2]},${this.hue[3]})`;
		this.ctx.beginPath();
		this.ctx.moveTo(this.a[0], this.a[1]);
		this.ctx.lineTo(this.b[0], this.b[1]);
		this.ctx.lineTo(this.c[0], this.c[1]);
		this.ctx.fill();
		this.ctx.stroke();
		if (this.debug) {
			this.ctx.font = '12px monospace';
			this.ctx.fillStyle = 'green';
			const c = this.getCenteroid();
			this.ctx.fillText(
				parseFloat(this.info).toFixed(2),
				c[0], c[1]
			);
		}
	}
	shader() {
		const v1 = this.vector(this.a, this.b);
		const v2 = this.vector(this.a, this.c);
		const n = this.cross(v1, v2);
		const un = this.normalize(n);
		const l = this.vector(this.a, this.light);
		const ul = this.normalize(l);
		const dp = this.dotProduct(un, ul);
		const intensity = (dp+1)/2;
		if (this.dark) {
			this.hue = this.tint(this.color, intensity);
		} else {
			this.hue = this.shade(this.color, intensity);
		}
		this.hue = this.shade(this.color, intensity);
		this.info = intensity;
	}
	vector(p1, p2) {
		return [
			p2[0]-p1[0],
			p2[1]-p1[1],
			p2[2]-p1[2]
		]
	}
	cross(v1, v2) {
		return [
			(v1[1]*v2[2])-(v1[2]*v2[1]),
			(v1[2]*v2[0])-(v1[0]*v2[2]),
			(v1[0]*v2[1])-(v1[1]*v2[0])
		]
	}
	normalize(v) {
		const m = Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
		return [v[0]/m, v[1]/m, v[2]/m];
	}
	shade(color, i) {
		return [
			parseInt(color[0]*i),
			parseInt(color[1]*i),
			parseInt(color[2]*i),
			color[3]
		];

	}
	tint(color, i) {
		return [
			parseInt((255-color[0])*i),
			parseInt((255-color[1])*i),
			parseInt((255-color[2])*i),
			color[3]
		];
	}
	dotProduct(v1, v2) {
		return v1[0]*v2[0]+v1[1]*v2[1]+v1[2]*v2[2];
	}
	getCenteroid() {
		return [
			(this.a[0]+this.b[0]+this.c[0])/3,
			(this.a[1]+this.b[1]+this.c[1])/3
		];
	}
	isDark(color) {
		return (color[0] + color[1] + color[2]) / 3 > 127;
	}
}