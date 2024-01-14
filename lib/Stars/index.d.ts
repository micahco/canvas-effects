import CanvasEffect from '../CanvasEffect';
import { StarsConfig } from '../types';
export default class Stars extends CanvasEffect<StarsConfig> {
    private seed;
    private complexity;
    private lines;
    private points;
    constructor(config: StarsConfig);
    protected update(): void;
    protected render(): void;
    private generate;
    private getComplexity;
}
