import { Config } from '../types';
export default abstract class CanvasEffect<TConfig extends Config> {
    protected readonly config: TConfig;
    canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    private requestId;
    private delay;
    private fps;
    private timer?;
    constructor(config: TConfig);
    protected init(): void;
    protected abstract update(): void;
    protected render(): void;
    private main;
    private debounce;
    private resize;
    private clear;
    private createCanvas;
    private setCanvasSize;
}
