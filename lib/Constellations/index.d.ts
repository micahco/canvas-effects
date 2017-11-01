import CanvasEffect from '../CanvasEffect';
import { default as Point, Config as PointConfig } from './Point';
import { default as Line, Config as LineConfig } from './Line';
export interface Config {
    container: string;
    width: any;
    height: any;
    seed?: number;
    point?: PointConfig;
    line?: LineConfig;
}
export default class Constellations extends CanvasEffect<Config> {
    complexity: number;
    lines: Array<Line>;
    points: Array<Point>;
    seed: number;
    constructor(config: Config);
    init(): void;
    update(): void;
    render(): void;
    generate(): void;
    getComplexity(seed: number): number;
}
