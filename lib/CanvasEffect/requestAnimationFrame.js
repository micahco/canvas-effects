"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.requestAnimFrame = requestAnimFrame;
exports.cancelAnimFrame = cancelAnimFrame;
function requestAnimFrame(callback) {
	return requestAnimationFrame(callback) || webkitRequestAnimationFrame(callback) || mozRequestAnimationFrame(callback) || oRequestAnimationFrame(callback) || msRequestAnimationFrame(callback) || function (callback) {
		setTimeout(callback, 1000 / 60);
	};
}

function cancelAnimFrame(callback) {
	return cancelAnimationFrame(callback) || cancelTimeout(callback);
}