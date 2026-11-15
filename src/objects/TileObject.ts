import { Sprite } from "../SpriteManager";
import BasicObject from "./BasicObject";
export default class TileObject extends BasicObject {
    public spriteList: Sprite[];
    public xRepeat: number;
    public yRepeat: number;
    public tileWidth: number;
    public tileHeight: number;
    public order: number[] = new Array(0);

    constructor(id: string, x: number, y: number, xRepeat: number, yRepeat: number, sprites: Sprite[], order?: number[]) {
        super(id, x * sprites[0].w, y * sprites[0].h, xRepeat * sprites[0].w, yRepeat * sprites[0].h);
        this.xRepeat = xRepeat;
        this.yRepeat = yRepeat;
        this.tileWidth = sprites[0].w;
        this.tileHeight = sprites[0].h;
        this.spriteList = sprites;
        if (order !== undefined) this.order = order;
    }

    public update(delta: number): void {}

    public draw(ctx: CanvasRenderingContext2D, delta: number): void {
        for (let i = 0; i < this.xRepeat * this.yRepeat; i++) {
            let sprite: Sprite = this.spriteList[i < this.order.length ? this.order[i] : 0];
            ctx.drawImage(sprite.source, sprite.x, sprite.y, sprite.w, sprite.h,
                this.polygon.pos.x + (i % this.xRepeat) * this.tileWidth, this.polygon.pos.y + Math.floor(i / this.xRepeat) * this.tileHeight, this.tileWidth, this.tileHeight);
        }
    }
}