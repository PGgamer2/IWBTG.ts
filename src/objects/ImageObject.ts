import { BasicObject } from './BasicObject';
export class ImageObject extends BasicObject {
    public image: HTMLImageElement = new Image();

    constructor(id: string, x: number, y: number, w: number, h: number, src: string) {
        super(id, x, y, w, h);
        this.image.src = src;
        this.image.width = w;
        this.image.height = h;
    }

    public update(delta: number): void {}

    public draw(ctx: CanvasRenderingContext2D, delta: number) {
        ctx.drawImage(this.image, this.polygon.pos.x, this.polygon.pos.y, this.image.width, this.image.height);
    }
}