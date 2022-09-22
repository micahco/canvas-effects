import { Stars, Delaunay } from '../src/index'
import { StarsConfig, DelaunayConfig } from '../src/types';

const sc: StarsConfig = {
	container: '#stars',
	width: Infinity,
	height: Infinity
}
const sta = new Stars(sc);

const dc: DelaunayConfig = {
	container: '#delaunay',
	width: Infinity,
	height: Infinity
}
const del = new Delaunay(dc);