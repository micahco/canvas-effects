import Constellations from './Constellations';

let starryNight = new Constellations('#test', {
	complexor: 8000,
	point: {
		color: '#000000',
		radius: [3,1],
		speed: [0.2,0.1]
	},
	line: {
		color: [0,0,0],
		fade: 0.1,
		max: 100,
		width: 1
	}
});
starryNight.init();
