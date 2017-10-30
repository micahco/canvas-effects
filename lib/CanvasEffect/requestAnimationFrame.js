"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requestAnimFrame(callback) {
    return requestAnimationFrame(callback) ||
        webkitRequestAnimationFrame(callback) ||
        function (callback) {
            setTimeout(callback, 1000 / 60);
        };
}
exports.requestAnimFrame = requestAnimFrame;
function cancelAnimFrame(callback) {
    return cancelAnimationFrame(callback);
}
exports.cancelAnimFrame = cancelAnimFrame;
