import { Stars, Delaunay } from '../src/index'
import { StarsConfig, DelaunayConfig } from '../src/types';

const sc: StarsConfig = {
	container: '#stars',
	width: 1000,
	height: 1000
}
const sta = new Stars(sc);

const dc: DelaunayConfig = {
	container: '#delaunay',
	width: 1000,
	height: 1000
}
const del = new Delaunay(dc);