"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initialized(prop) {
    return typeof prop !== 'undefined';
}
exports.initialized = initialized;
function array(prop, length) {
    if (!initialized(prop)) {
        return false;
    }
    if (prop.constructor !== Array) {
        return false;
    }
    if (prop.length != length) {
        return false;
    }
    return true;
}
exports.array = array;
function boolean(prop) {
    if (!initialized(prop)) {
        return false;
    }
    if (prop.constructor !== Boolean) {
        return false;
    }
    return true;
}
exports.boolean = boolean;
function number(prop) {
    if (!initialized(prop)) {
        return false;
    }
    if (prop.constructor !== Number) {
        return false;
    }
    return true;
}
exports.number = number;
function color(prop) {
    if (!initialized(prop)) {
        return false;
    }
    if (prop.constructor !== Array) {
        return false;
    }
    if (prop.length != 4) {
        return false;
    }
    if (!((prop[0] >= 0 && prop[0] <= 255) &&
        (prop[1] >= 0 && prop[1] <= 255) &&
        (prop[2] >= 0 && prop[2] <= 255) &&
        (prop[3] >= 0 && prop[3] <= 1))) {
        return false;
    }
    return true;
}
exports.color = color;
