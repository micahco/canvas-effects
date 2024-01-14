import CanvasEffect from '../CanvasEffect';
import { GalileoConfig } from '../types';
export default class Galileo extends CanvasEffect<GalileoConfig> {
    private seed;
    private complexity;
    private lines;
    private points;
    constructor(config: GalileoConfig);
    protected update(): void;
    protected render(): void;
    private generate;
    private getComplexity;
}
