export interface Config {
    width: number;
    height: number;
}
export type Point3D = [number, number, number];
export type ColorRGBA = [number, number, number, number];
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
export interface DelaunayConfig extends Config {
    seed?: number;
    color?: ColorRGBA;
    mouse?: boolean;
    max?: number;
    stroke?: {
        color?: ColorRGBA;
        width?: number;
    };
}
