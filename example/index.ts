import { Stars, Delaunay } from '../src/index'

const foo = new Stars({
	selector: '#stars',
	width: Infinity,
	height: Infinity,
	point: {
		color: [184, 142, 141, 1]
	},
	line: {
		color: [216, 210, 225, 1],
		fade: false
	}
});

const bar = new Delaunay({
	selector: '#delaunay',
	width: Infinity,
	height: Infinity,
	color: [43, 45, 66, 1]
});