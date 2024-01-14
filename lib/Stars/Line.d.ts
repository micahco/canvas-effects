import { LineConfig } from '../types';
export default class Line {
    private ctx;
    private a;
    private b;
    private alpha;
    private color;
    private fade;
    private max;
    private width;
    constructor(ctx: CanvasRenderingContext2D);
    init(config?: LineConfig): void;
    update(a: [number, number], b: [number, number]): void;
    render(): void;
    private getDistance;
}
