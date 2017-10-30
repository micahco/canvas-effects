export function requestAnimFrame(callback) {
	return requestAnimationFrame(callback) ||
	webkitRequestAnimationFrame(callback) ||
	function(callback){
		setTimeout(callback, 1000 / 60);
	};
}

export function cancelAnimFrame(callback) {
	return cancelAnimationFrame(callback)
}
