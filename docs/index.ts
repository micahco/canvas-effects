import { Stars, Delaunay } from '../src/index'

const stars = new Stars({
	width: Infinity,
	height: Infinity,
	point: {
		color: [100, 100, 100, 1]
	},
	line: {
		color: [100, 100, 100, 1]
	}
});
const starsContainer = document.getElementById('stars');
if (starsContainer != null) {
	starsContainer.appendChild(stars.canvas);
}

const delaunay = new Delaunay({
	width: Infinity,
	height: Infinity,
	color: [50, 50, 50, 1]
});
const delaunayContainer = document.getElementById('delaunay');
if (delaunayContainer != null) {
	delaunayContainer.appendChild(delaunay.canvas);
}