import { Sprite } from '../SpriteManager';
import BasicObject from './BasicObject';
export default class SpriteObject extends BasicObject {
    public sprite: Sprite;
    public width: number;
    public height: number;

    constructor(id: string, x: number, y: number, w: number, h: number, sprite: Sprite) {
        super(id, x, y, w, h);
        this.sprite = sprite;
        this.width = w;
        this.height = h;
    }

    public update(delta: number): void {}

    public draw(ctx: CanvasRenderingContext2D, delta: number) {
        ctx.drawImage(this.sprite.source, this.sprite.x, this.sprite.y, this.sprite.w, this.sprite.h, this.polygon.pos.x, this.polygon.pos.y, this.width, this.height);
    }
}