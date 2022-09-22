export function initialized(prop: any): boolean {
	return typeof prop !== 'undefined'
}

export function array(prop: any, length: number): boolean {
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

export function boolean(prop: any): boolean {
	if (!initialized(prop)) {
		return false;
	}
	if (prop.constructor !== Boolean) {
		return false;
	}
	return true;
}

export function number(prop: any): boolean {
	if (!initialized(prop)) {
		return false;
	}
	if (prop.constructor !== Number) {
		return false;
	}
	return true;
}

export function color(prop: any): boolean {
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
		(prop[3] >= 0 && prop[3] <= 1)))
	{
		return false;
	}
	return true;
}