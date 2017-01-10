import Constellations from './Constellations';
import CanvasEffect from './CanvasEffect';

let test = new Constellations('#test', {
	complexor: 8000,
	point: {
		color: '#000000',
		radius: [3,1],
		speed: [2,1]
	},
	line: {
		color: [0,0,0],
		fade: 0.05,
		max: 100,
		transparency: 1,
		width: 1
	}
});
test.init();

let test2 = new Constellations('#test2', {
	complexor: 8000,
	point: {
		color: '#ff0000',
		radius: [3,1],
		speed: [2,1]
	},
	line: {
		color: [255,0,0],
		fade: 0.05,
		max: 100,
		transparency: 1,
		width: 1
	}
});
test2.init();
