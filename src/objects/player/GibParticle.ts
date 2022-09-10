import Response from '../../SAT/Response';
import SAT from '../../SAT/SAT';
import { ImageObject } from '../ImageObject';
import { PlayerObject } from './PlayerObject';
import { Game } from '../../Game';
import { BasicObject } from '../BasicObject';
import { SpikeObject } from '../SpikeObject';
import Polygon from '../../SAT/Polygon';
export class GibParticle extends ImageObject {
    public dx: number = 0;
    public dy: number = 0;
    public type: number = 0;
    public bodyType: number = 0;
    
    /**
     * Type 0: body,
     * type 1: body stoned,
     * type 2: head,
     * type 3: head stoned,
     * type 4: arm,
     * type 5: arm stoned,
     * type 6: feet,
     * type 7: feet stoned
     */
    constructor(x: number, y: number, dx: number, dy: number, type: number, id: string) {
        super(id, x, y, 8, 8, "assets/textures/objects/player/sprGibs.png");
        this.dx = dx;
        this.dy = dy;
        this.type = type;
        this.collision = false;
        if (this.type == 0 || this.type == 1) {
            this.bodyType = Math.round(Math.random() * 32);
        }
    }

    public update(delta: number): void {
        this.dy += PlayerObject.gravity * Math.min(delta, 0.3);
        if (this.dx > 0) {
            this.dx -= delta;
            if (this.dx < 0) this.dx = 0;
        } else if (this.dx < 0) {
            this.dx += delta;
            if (this.dx > 0) this.dx = 0;
        }
        this.moveBy(this.dx, this.dy);
    }

    public moveBy(x: number, y: number): boolean {
        let collided: boolean = false;
        let thisAABB: Polygon = this.polygon.getAABB();
        this.polygon.pos.add(new SAT.Vector(x, y));
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
                    let objtAABB: Polygon = Game.level.objects[i].polygon.getAABB();
                    if (thisAABB.pos.y + thisAABB.points[2].y <= objtAABB.pos.y
                        || thisAABB.pos.y >= objtAABB.pos.y + objtAABB.points[2].y) {
                        this.dy *= -0.75;
                    } else {
                        this.dx *= -0.75;
                    }
                }
            }
        }
        return collided;
    }

    public onCollision(info: Response, obj: BasicObject): boolean {
        if (obj instanceof PlayerObject || obj instanceof SpikeObject) return false;
        return true;
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number): void {
        switch(this.type) {
        case 0:
            ctx.drawImage(this.image, this.bodyType * 2, 0, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
            break;
        case 1:
            ctx.drawImage(this.image, this.bodyType * 2, 9, 2, 9, this.polygon.pos.x + 4, this.polygon.pos.y, 2, 9);
            break;
        case 2:
            ctx.drawImage(this.image, 0, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
            break;
        case 3:
            ctx.drawImage(this.image, 10, 18, 10, 16, this.polygon.pos.x, this.polygon.pos.y, 10, 16);
            break;
        case 4:
            ctx.drawImage(this.image, 20, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
            break;
        case 5:
            ctx.drawImage(this.image, 28, 18, 8, 8, this.polygon.pos.x, this.polygon.pos.y, 8, 8);
            break;
        case 6:
            ctx.drawImage(this.image, 36, 18, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
            break;
        case 7:
            ctx.drawImage(this.image, 36, 22, 4, 4, this.polygon.pos.x + 2, this.polygon.pos.y + 4, 4, 4);
        }
    }
}