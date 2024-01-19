export type Point3D= [number, number, number]; // [x,y,z]
export type ColorRGBA = [number, number, number, number]; // [R,G,B,A]

export interface Config {
	height: number;
	width: number;
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
	radius?: number;
	velocity?: number;
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
	shade?: number;
	stroke?: {
		color?: ColorRGBA;
		width?: number;
	}
}
