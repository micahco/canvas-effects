export default class Point {
	constructor(pos) {
		this.pos = pos;
		this.v;
	}
	getRandomArbitrary(max, min) {
		return Math.random() * (max - min) + min;
	}
	init() {
		this.pos[2] = this.getRandomArbitrary(100,0);
		this.v = this.getRandomArbitrary(0.1,-0.1);
	}
	update() {
		if (this.pos[2] >= 100 || this.pos[2] <= 0) {
			this.v *= -1;
		}
		this.pos[2] += this.v;
	}
}
