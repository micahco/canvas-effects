export interface Config {
    color?: [number, number, number, number];
    radius?: [number, number];
    velocity?: [number, number];
}
export default class Point {
    ctx: CanvasRenderingContext2D;
    pos: [number, number];
    cw: number;
    ch: number;
    color: [number, number, number, number];
    radius: number;
    velocity: number;
    theta: number;
    constructor(ctx: CanvasRenderingContext2D, pos: [number, number]);
    init(config: Config): void;
    update(): void;
    render(): void;
    getRandomArbitrary(max: any, min: any): number;
    getRandomTheta(): number;
}
