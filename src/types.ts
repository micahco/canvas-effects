export type Point3D= [number, number, number]; // [x,y,z]
export type ColorRGBA = [number, number, number, number]; // [R,G,B,A]

export interface Config {
	width: number;
	height: number;
}

/*
 * Galileo
 */
export interface GalileoConfig extends Config {
	seed?: number;
	point?: PointConfig;
	line?: LineConfig;
}
export interface PointConfig {
	color?: ColorRGBA;
	radius?: [number, number];
	velocity?: [number, number];
}
export interface LineConfig {
	color?: ColorRGBA;
	fade?: boolean;
	max?: number;
	width?: number;
}

/*
 * DELAUNAY
 */
export interface DelaunayConfig extends Config {
	seed?: number;
	color?: ColorRGBA;
	mouse?: boolean;
	max?: number;
	stroke?: {
		color?: ColorRGBA;
		width?: number;
	}
}
