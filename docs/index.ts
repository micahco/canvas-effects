import { Stars, Delaunay } from '../src/index'

const stars = new Stars({
	width: Infinity,
	height: Infinity
});
const starsContainer = document.getElementById('stars');
if (starsContainer != null) {
	starsContainer.appendChild(stars.canvas);
}

const delaunay = new Delaunay({
	width: Infinity,
	height: Infinity
});
const delaunayContainer = document.getElementById('delaunay');
if (delaunayContainer != null) {
	delaunayContainer.appendChild(delaunay.canvas);
}