export function requestAnimFrame(callback) {
	return requestAnimationFrame(callback) ||
	webkitRequestAnimationFrame(callback) ||
	mozRequestAnimationFrame(callback) ||
	oRequestAnimationFrame(callback) ||
	msRequestAnimationFrame(callback) ||
	function(callback){
		setTimeout(callback, 1000 / 60);
	};
}

export function cancelAnimFrame(callback) {
	return cancelAnimationFrame(callback) ||
	cancelTimeout(callback)
}
