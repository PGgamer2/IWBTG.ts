import BasicObject from '../objects/BasicObject';
import Game from '../Game';
import Vector from '../SAT/Vector';
export default abstract class BasicLevel {
    public objects: Array<BasicObject> = [];
    protected removeQueue: Array<string> = [];

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
        return this.removeQueue.includes(id);
    }

    protected drawCollisionLines(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        for (let i = 0; i < this.objects.length; i++) {
            const points: Vector[] = this.objects[i].polygon.points;
            ctx.beginPath();
            ctx.moveTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
            for (let p = 0; p < points.length; p++) {
                if (p + 1 == points.length) {
                    ctx.lineTo(this.objects[i].polygon.pos.x + points[0].x, this.objects[i].polygon.pos.y + points[0].y);
                } else {
                    ctx.lineTo(this.objects[i].polygon.pos.x + points[p + 1].x, this.objects[i].polygon.pos.y + points[p + 1].y);
                }
            }
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

    public abstract instanceFabric(): BasicLevel;
}