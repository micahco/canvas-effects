import CanvasEffect from '../CanvasEffect';
import Triangle from './Triangle';
export interface Config {
    container: string;
    width: any;
    height: any;
    seed?: number;
    color?: [number, number, number, number];
    mouse?: boolean;
    max?: number;
    stroke?: {
        color?: [number, number, number, number];
        width?: number;
    };
}
export default class Polygonal extends CanvasEffect<Config> {
    complexity: number;
    light: [number, number, number];
    mouse: boolean;
    seed: number;
    triangles: Array<Triangle>;
    constructor(config: Config);
    init(): void;
    update(): void;
    render(): void;
    generate(): void;
    triangulate(points: number[][]): Array<[number, number]>;
    elevate(points: number[][], height: number): number[][];
    getLightSource(): [number, number, number];
    getComplexity(seed: number): number;
    getRandomArbitrary(max: number, min: number): number;
    getCenteroid(a: any, b: any, c: any): [number, number];
    getMousePosition(e: MouseEvent): [number, number];
    onMouseMove(e: MouseEvent): void;
}
