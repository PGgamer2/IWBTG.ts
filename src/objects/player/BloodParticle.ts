import Response from '../../SAT/Response';
import SAT from '../../SAT/SAT';
import { ImageObject } from '../ImageObject';
import { PlayerObject } from './PlayerObject';
import { Game } from '../../Game';
import { BasicObject } from '../BasicObject';
import { SpikeObject } from '../SpikeObject';
import Vector from '../../SAT/Vector';
export class BloodParticle extends ImageObject {
    public dx: number = 0;
    public dy: number = 0;
    public stuck: boolean = false;
    public type: number = 0;
    
    constructor(x: number, y: number, dx: number, dy: number, id: string) {
        super(id, x, y, 2, 2, "assets/textures/objects/player/sprBlood.png");
        this.dx = dx;
        this.dy = dy;
        this.type = Math.round(Math.random() * 3);
        this.collision = false;
    }

    public update(delta: number): void {
        if (this.stuck) return;
        
        this.dy += PlayerObject.gravity * delta;
        if (this.dx > 0) {
            this.dx -= delta;
            if (this.dx < 0) this.dx = 0;
        } else if (this.dx < 0) {
            this.dx += delta;
            if (this.dx > 0) this.dx = 0;
        }
        if (this.moveBy(this.dx, this.dy)) {
            this.dx = 0;
            this.dy = 0;
            this.stuck = true;
        }
    }

    public moveBy(x: number, y: number): boolean {
        let collided: boolean = false;
        this.polygon.pos.add(new Vector(x, y));
        let response: Response = new Response();
        for (let i = 0; i < Game.level.objects.length; i++) {
            if (!Game.level.objects[i].collision || Game.level.objects[i].id == this.id) continue;
            response.clear();
            if (SAT.testPolygonPolygon(this.polygon, Game.level.objects[i].polygon, response)) {
                let aColl: boolean = this.onCollision(response, Game.level.objects[i]);
                Game.level.objects[i].onCollision(response, this);
                if (aColl) {
                    this.polygon.pos.sub(response.overlapV);
                    collided = true;
                }
            }
        }
        return collided;
    }

    public onCollision(info: Response, obj: BasicObject): boolean {
        if (obj instanceof PlayerObject) return false;
        if (obj instanceof SpikeObject) return Math.random() < 0.5;
        return true;
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.drawImage(this.image, this.type * 3, 0, 3, 4, this.polygon.pos.x - 1, this.polygon.pos.y - 1, 3, 4);
    }
}