"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAnimFrame = exports.requestAnimFrame = void 0;
function requestAnimFrame(callback, fps) {
    return requestAnimationFrame(callback) ||
        function (callback) {
            setTimeout(callback, 1000 / fps);
        };
}
exports.requestAnimFrame = requestAnimFrame;
function cancelAnimFrame(callback) {
    return cancelAnimationFrame(callback);
}
exports.cancelAnimFrame = cancelAnimFrame;
