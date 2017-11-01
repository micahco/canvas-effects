import { Config } from '../Polygonal';
export default class Triangle {
    ctx: CanvasRenderingContext2D;
    light: [number, number, number];
    a: [number, number, number];
    b: [number, number, number];
    c: [number, number, number];
    color: [number, number, number, number];
    hue: [number, number, number, number];
    max: number;
    stroke: {
        color?: [number, number, number, number];
        width?: number;
    };
    constructor(ctx: any, light: any, a: any, b: any, c: any);
    init(config: Config): void;
    update(light: [number, number, number]): void;
    render(): void;
    shader(): void;
    vector(p1: any, p2: any): [number, number, number];
    cross(v1: any, v2: any): [number, number, number];
    normalize(v: any): [number, number, number];
    shade(color: any, i: any): [number, number, number, number];
    getIntensity(power: any, max: any): number;
    dotProduct(v1: any, v2: any): number;
    getCenteroid(): [number, number];
}
