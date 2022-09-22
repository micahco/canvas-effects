export interface Config {
	container: string;
	width: any;
	height: any;
}


/*
 * GENERIC
 */
export type Coord = [number, number]; // [x,y]
export type Point = [number, number, number]; // [x,y,z]
export type Color = [number, number, number, number]; // [R,G,B,A]


/*
 * STARS
 */

export interface StarsConfig extends Config {
	container: string;
	width: any;
	height: any;
	seed?: number;
	point?: PointConfig;
	line?: LineConfig;
}

export interface PointConfig {
	color?: [number, number, number, number];
	radius?: [number, number];
	velocity?: [number, number];
}

export interface LineConfig {
	color?: [number, number, number, number];
	fade?: boolean;
	max?: number;
	width?: number;
}


/*
 * DELAUNAY
 */

export interface DelaunayConfig extends Config {
	seed?: number;
	color?: [number, number, number, number];
	mouse?: boolean;
	max?: number;
	stroke?: {
		color?: [number, number, number, number];
		width?: number;
	}
}