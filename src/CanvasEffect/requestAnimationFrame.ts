export function requestAnimFrame(callback: any, fps: number) {
	return requestAnimationFrame(callback) ||
	webkitRequestAnimationFrame(callback) ||
	function(callback){
		setTimeout(callback, 1000 / fps);
	};
}

export function cancelAnimFrame(callback) {
	return cancelAnimationFrame(callback)
}
