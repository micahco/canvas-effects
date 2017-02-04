import CanvasEffect from '../CanvasEffect';
import Fish from './Fish';

export default class Test extends CanvasEffect {
	constructor(config) {
		super(config);
		this.fish;
		this.init();
	}
	init() {
		this.fish = new Fish(this.ctx, 200, 200);
		super.init();
	}
	update() {
		this.fish.update();
	}
	render() {
		super.render();
		this.fish.render();
	}
}
