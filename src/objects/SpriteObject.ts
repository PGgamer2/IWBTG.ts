import { Sprite } from '../SpriteManager';
import BasicObject from './BasicObject';
export class SpriteObject extends BasicObject {
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
        ctx.drawImage(this.sprite.source, this.sprite.x, this.sprite.y, this.sprite.w, this.sprite.h, this.polygon.pos.x | 0, this.polygon.pos.y | 0, this.width, this.height);
    }
}

export class AnimatedSpriteObject extends BasicObject {
    public sprites: Sprite[];
    public width: number;
    public height: number;
    public animDuration: number;
    private frameTimer: number = 0;

    constructor(id: string, x: number, y: number, w: number, h: number, sprites: Sprite[], animDuration: number) {
        super(id, x, y, w, h);
        this.sprites = sprites;
        this.width = w;
        this.height = h;
        this.animDuration = animDuration;
    }

    public update(delta: number): void {}

    public draw(ctx: CanvasRenderingContext2D, delta: number) {
        this.frameTimer = (this.frameTimer + delta) % this.animDuration;
        let i: number = Math.floor(this.frameTimer * this.sprites.length / this.animDuration);
        ctx.drawImage(this.sprites[i].source, this.sprites[i].x, this.sprites[i].y, this.sprites[i].w, this.sprites[i].h, this.polygon.pos.x | 0, this.polygon.pos.y | 0, this.width, this.height);
    }
}