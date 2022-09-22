export function requestAnimFrame(callback: any, fps: number) {
	return requestAnimationFrame(callback) ||
	function(callback: () => void) {
		setTimeout(callback, 1000 / fps);
	};
}

export function cancelAnimFrame(callback: number) {
	return cancelAnimationFrame(callback)
}
