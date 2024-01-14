import { DelaunayConfig, Point3D, ColorRGBA } from '../types';
export default class Triangle {
    ctx: CanvasRenderingContext2D;
    light: Point3D;
    a: Point3D;
    b: Point3D;
    c: Point3D;
    color: ColorRGBA;
    hue: ColorRGBA;
    max: number;
    stroke: {
        color?: ColorRGBA;
        width?: number;
    };
    constructor(ctx: CanvasRenderingContext2D, light: Point3D, a: Point3D, b: Point3D, c: Point3D);
    init(config: DelaunayConfig): void;
    update(light: Point3D): void;
    render(): void;
    shader(): void;
    vector(p1: number[], p2: number[]): Point3D;
    cross(v1: number[], v2: number[]): Point3D;
    normalize(v: Point3D): Point3D;
    shade(color: number[], i: number): ColorRGBA;
    getIntensity(power: number, max: number): number;
    dotProduct(v1: number[], v2: number[]): number;
    getCenteroid(): [number, number];
}
