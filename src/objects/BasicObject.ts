import { Game } from '../Game';
import SAT from '../SAT/SAT';
import Response from '../SAT/Response';
import Polygon from '../SAT/Polygon';
import Vector from '../SAT/Vector';
export abstract class BasicObject {
    public polygon: Polygon;
    public collision: boolean = true;
    public readonly id: string;

    constructor(id: string, x: number, y: number, w: number, h: number) {
        this.id = id;
        if (w == 0 && h == 0) this.collision = false;
        this.polygon = new Polygon(new Vector(x, y), [
            new Vector(), new Vector(0, h),
            new Vector(w, h), new Vector(w, 0)
        ]);
    }

    public moveBy(x: number, y: number): boolean {
        let collided: boolean = false;
        this.polygon.pos.add(new Vector(x, y));
        let response: Response = new Response();
        for (let i = 0; i < Game.level.objects.length; i++) {
            if (!Game.level.objects[i].collision || Game.level.objects[i].id == this.id) continue;
            response.clear();
            if (SAT.testPolygonPolygon(this.polygon, Game.level.objects[i].polygon, response)) {
                collided = true;
                let aColl: boolean = this.onCollision(response, Game.level.objects[i]);
                let bColl: boolean = Game.level.objects[i].onCollision(response, this);
                if (aColl && bColl && this.collision) this.polygon.pos.sub(response.overlapV);
            }
        }
        return collided;
    }

    public onCollision(info: Response, obj: BasicObject): boolean { return true; }

    public abstract update(delta: number): void;

    public abstract draw(ctx: CanvasRenderingContext2D, delta: number): void;

    public dispose(): void {}
}