import BasicObject from '../objects/BasicObject';
import Game from '../Game';
import { IDisposable, InstanceFabric } from '../utils/Interfaces';
import Vector from '../SAT/Vector';
export default abstract class BasicLevel implements IDisposable, InstanceFabric<BasicLevel> {
    public backgroundStyle: string | CanvasGradient | CanvasPattern = "#000000";
    public objects: BasicObject[] = [];
    protected removeQueue: string[] = [];

    public update(ctx: CanvasRenderingContext2D, delta: number): void {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].update(delta);
        }

        while(this.removeQueue.length != 0) {
            for (let o = 0; o < this.objects.length; o++) {
                if (this.objects[o].id == this.removeQueue[0]) {
                    this.objects[o].dispose();
                    this.objects.splice(o, 1);
                    break;
                }
            }
            this.removeQueue.splice(0, 1);
        }

        // Rendering
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].draw(ctx, delta);
        }
        if (Game.DEBUG) {
            this.drawCollisionLines(ctx);
        }
    }

    public removeObject(id: string): void {
        this.removeQueue.push(id);
    }

    public isRemoved(id: string): boolean {
        return this.removeQueue.indexOf(id) !== -1;
    }

    protected drawCollisionLines(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        for (let i = 0; i < this.objects.length; i++) {
            const points: Vector[] = this.objects[i].polygon.points;
            ctx.beginPath();
            ctx.moveTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
            for (let p = 1; p < points.length; p++) {
                ctx.lineTo(this.objects[i].polygon.pos.x + points[p].x, this.objects[i].polygon.pos.y + points[p].y);
            }
            ctx.lineTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.objects[i].collision ? '#ff0000' : '#0000ff';
            ctx.stroke();
        }
        ctx.restore();
    }

    public dispose(): void {
        while(this.objects.length != 0) {
            this.objects[0].dispose();
            this.objects.splice(0, 1);
        }
    }

    public abstract instantiate(): BasicLevel;
}