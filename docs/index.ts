import { Stars, Delaunay } from '../src/index'

const el = document.getElementById('stars');

const foo = new Stars({
	element: el,
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
	element: '#delaunay',
	width: Infinity,
	height: Infinity,
	color: [43, 45, 66, 1]
});