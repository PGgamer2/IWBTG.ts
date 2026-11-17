import PlayerObject from './PlayerObject';
import Response from '../../SAT/Response';
import BasicObject from '../BasicObject';
import Game from '../../Game';
import SpikeObject from '../SpikeObject';
import { ImageList } from '../../SpriteManager';
export default class BulletObject extends BasicObject {
    protected frameTime: number = 0;
    protected direction: number;

    constructor(x: number, y: number, direction: number, id: string) {
        super(id, x - 5, y - 1, 10, 2);
        this.direction = direction;
    }

    public update(delta: number): void {
        this.moveBy(this.direction * 750 * delta, 0);
    }

    public onCollision(info: Response, obj: BasicObject): boolean {
        if (obj instanceof SpikeObject) return false;
        if (obj instanceof PlayerObject) return false;
        Game.level.removeObject(this.id);
        return false;
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number): void {
        this.frameTime = (this.frameTime + delta) % 0.20;
        ctx.drawImage(ImageList.PLAYER, Math.floor(this.frameTime / 0.10) * 4, 160, 4, 4, (this.polygon.pos.x | 0) + 3, (this.polygon.pos.y | 0) - 1, 4, 4);
    }
}