import { PointConfig } from '../types';
export default class Point {
    private ctx;
    private pos;
    private cw;
    private ch;
    private color;
    private radius;
    private velocity;
    private theta;
    constructor(ctx: CanvasRenderingContext2D, pos: [number, number]);
    init(config?: PointConfig): void;
    update(): void;
    render(): void;
    getPosition(): [number, number];
    private getRandomArbitrary;
    private getRandomTheta;
}
