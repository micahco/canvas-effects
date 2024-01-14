import CanvasEffect from '../CanvasEffect';
import { DelaunayConfig } from '../types';
export default class Delaunay extends CanvasEffect<DelaunayConfig> {
    private seed;
    private apex;
    private complexity;
    private light;
    private simplex;
    private triangles;
    constructor(config: DelaunayConfig);
    protected init(): void;
    protected update(): void;
    protected render(): void;
    private generate;
    private triangulate;
    private getLightSource;
    private getApexHeight;
    private getComplexity;
    private getRandomArbitrary;
    private getCenteroid;
    private getMousePosition;
    private onMouseMove;
}
