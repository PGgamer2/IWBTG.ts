import Polygon from '../SAT/Polygon';
import Response from '../SAT/Response';
import Vector from '../SAT/Vector';
import BasicObject from './BasicObject';
import { SpriteObject } from './SpriteObject';
import PlayerObject from './player/PlayerObject';
import { Sprite, Sprites } from '../SpriteManager';

export const enum SpikeDirection {
    Up, Right, Down, Left
}

export default class SpikeObject extends SpriteObject {
    public readonly direction: SpikeDirection;

    constructor(id: string, x: number, y: number, direction: SpikeDirection = 0) {
        super(id, x, y, 32, 32, SpikeObject.getDirSprite(direction));
        this.direction = direction;
        switch(this.direction) {
        case SpikeDirection.Left:
            this.polygon = new Polygon(new Vector(x, y), [
                new Vector(1, 16), new Vector(31, 31), new Vector(31, 1)
            ]);
            break;
        case SpikeDirection.Down:
            this.polygon = new Polygon(new Vector(x, y), [
                new Vector(1, 1), new Vector(16, 31), new Vector(31, 1)
            ]);
            break;
        case SpikeDirection.Right:
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

    public static getDirSprite(dir: SpikeDirection): Sprite {
        const spikeDirSprites: Sprite[] = [Sprites.SpikeUp, Sprites.SpikeRight, Sprites.SpikeDown, Sprites.SpikeLeft];
        return spikeDirSprites[dir];
    }
}