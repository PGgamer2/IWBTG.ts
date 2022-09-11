import ImageObject from "./ImageObject";
export default class TileObject extends ImageObject {
    public otherImages: HTMLImageElement[];
    public totalW: number;
    public totalH: number;
    public order: number[] = new Array(0);

    constructor(id: string, x: number, y: number, w: number, h: number, sources: string[], order?: number[]) {
        super(id, x * 32, y * 32, w * 32, h * 32, sources.shift());
        this.image.width = 32;
        this.image.height = 32;
        this.totalW = w;
        this.totalH = h;
        this.otherImages = sources.map(src => {
            let img: HTMLImageElement = new Image(32, 32);
            img.src = src;
            return img;
        });
        if (typeof order !== 'undefined') this.order = order;
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.drawImage(this.image, this.polygon.pos.x, this.polygon.pos.y, 32, 32);
        for (let i = 1; i < this.totalW * this.totalH; i++) {
            ctx.drawImage(i < this.order.length ? this.otherImages[this.order[i]] : this.image,
                this.polygon.pos.x + (i % this.totalW) * 32, this.polygon.pos.y + Math.floor(i / this.totalW) * 32, 32, 32);
        }
    }

    public dispose(): void {
        super.dispose();
        while(this.otherImages.length != 0) {
            this.otherImages.shift().remove();
        }
    }
}