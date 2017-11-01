export interface Config {
    container: string;
    width: any;
    height: any;
}
export default abstract class CanvasEffect<T extends Config> {
    readonly config: T;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    requestId: any;
    delay: number;
    timer: number;
    constructor(config: T);
    init(): void;
    main(): void;
    abstract update(): void;
    render(): void;
    debounce(): void;
    resize(): void;
    clear(): void;
    createCanvas(): void;
    hasValidDimensions(w: any, h: any): boolean;
    setCanvasSize(): void;
}
