export interface Config {
    color?: [number, number, number, number];
    fade?: boolean;
    max?: number;
    width?: number;
}
export default class Line {
    ctx: CanvasRenderingContext2D;
    a: [number, number];
    b: [number, number];
    alpha: number;
    color: [number, number, number, number];
    fade: boolean;
    max: number;
    width: number;
    constructor(ctx: CanvasRenderingContext2D);
    init(config: Config): void;
    update(a: any, b: any): void;
    render(): void;
    getDistance(): number;
}
