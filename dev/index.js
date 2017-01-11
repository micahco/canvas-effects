import Constellations from '../src/Constellations';

const foo = new Constellations({
	container: '#foo',
	width: '100%',
	height: 400,
	seed: 4000,
	point: {
		color: 'rgba(0,0,255,0.5)',
		radius: [8,4],
		speed: [0.8,0.4]
	},
	line: {
		color: [255,0,0,0.1],
		fade: 1,
		max: 150,
		width: 4
	}
});
