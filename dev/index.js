import { Constellations, Polygonal } from '../src';

const foo = new Polygonal({
	container: '#foo',
	width: '100%',
	height: 400,
	seed: 6000,
	color: 'lightblue',
	triangle: {
		color: [0,0,255]
	}
});
