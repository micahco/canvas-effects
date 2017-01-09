export default function(callback) {
	return requestAnimationFrame(callback) ||
	webkitRequestAnimationFrame(callback) ||
	mozRequestAnimationFrame(callback) ||
	oRequestAnimationFrame(callback) ||
	msRequestAnimationFrame(callback) ||
	function(callback){
		setTimeout(callback, 1000 / this.fps);
	};
}
