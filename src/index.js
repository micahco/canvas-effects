import Constellations from './Constellations';

let foo = new Constellations({
	container: '#foo',
	width: '100%',
	height: 400
});
foo.init();


let bar = new Constellations({
	container: '#bar',
	width: 600,
	height: 600
});
bar.init();
