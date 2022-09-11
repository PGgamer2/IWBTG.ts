import Polygon from '../SAT/Polygon';
import Response from '../SAT/Response';
import Vector from '../SAT/Vector';
import BasicObject from './BasicObject';
import ImageObject from './ImageObject';
import PlayerObject from './player/PlayerObject';
export default class SpikeObject extends ImageObject {
    public readonly direction: number;

    constructor(id: string, x: number, y: number, direction: number) {
        super(id, x, y, 32, 32, "assets/textures/objects/sprSpike.png");
        this.direction = direction;
        switch(this.direction) {
        case 3:
            this.polygon = new Polygon(new Vector(x, y), [
                new Vector(1, 16), new Vector(31, 31), new Vector(31, 1)
            ]);
            break;
        case 2:
            this.polygon = new Polygon(new Vector(x, y), [
                new Vector(1, 1), new Vector(16, 31), new Vector(31, 1)
            ]);
            break;
        case 1:
            this.polygon = new Polygon(new Vector(x, y), [
                new Vector(1, 1), new Vector(1, 31), new Vector(31, 16)
            ]);
            break;
        default:
            this.polygon = new Polygon(new Vector(x, y), [
                new Vector(16, 1), new Vector(1, 31), new Vector(31, 31)
            ]);
        }
    }

    public onCollision(info: Response, obj: BasicObject): boolean {
        if (obj instanceof PlayerObject) {
            (obj as PlayerObject).die();
        }
        return false;
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.drawImage(this.image, this.direction * 32, 0, 32, 32, this.polygon.pos.x, this.polygon.pos.y, 32, 32);
    }
}