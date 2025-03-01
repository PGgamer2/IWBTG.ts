import Game from '../../Game';
import ImageObject from '../ImageObject';
import BulletObject from './BulletObject';
import { randomUnsecureUUID } from '../../Utils';
import Vector from '../../SAT/Vector';
import BloodParticle from './BloodParticle';
import GibParticle from './GibParticle';
import DeathMessage from './DeathMessage';
import AudioManager from '../../AudioManager';
import Polygon from '../../SAT/Polygon';
export default class PlayerObject extends ImageObject {
    public static readonly velocity: number = 175;
    public static readonly gravity: number = 24;

    public frameTime: number = 0;
    public lookingDirection: number = 1;

    public rightKeyTime: number = 0;
    public leftKeyTime: number = 0;
    public jumpKeyTime: number = 0;
    public shootKeyTime: number = 0;

    public dx: number = 0;
    public dy: number = 1;
    public onGround: boolean = false;
    public availableJumps: number = 0;

    constructor(x: number, y: number, id: string = "player") {
        super(id, x, y, 32, 32, "assets/textures/objects/player/sprPlayer.png");
        this.polygon = new Polygon(new Vector(x, y), [
            new Vector(9, 11), new Vector(9, 32),
            new Vector(23, 32), new Vector(23, 11)
        ]);
    }

    public update(delta: number): void {
        this.dy += PlayerObject.gravity * delta;
        this.dx = 0;

        if (Game.isButtonDown('ArrowRight')) {
            this.rightKeyTime++;
            if (this.leftKeyTime == 0 || this.rightKeyTime < this.leftKeyTime) {
                this.dx = PlayerObject.velocity * delta;
            }
        } else this.rightKeyTime = 0;
        if (Game.isButtonDown('ArrowLeft')) {
            this.leftKeyTime++;
            if (this.rightKeyTime == 0 || this.leftKeyTime < this.rightKeyTime) {
                this.dx = -PlayerObject.velocity * delta;
            }
        } else this.leftKeyTime = 0;

        if (Game.isButtonDown('x')) {
            if (this.shootKeyTime == 0) {
                let bulletId: string = "bullet" + randomUnsecureUUID();
                AudioManager.play(bulletId, "assets/sounds/fire.wav").onended = e => { AudioManager.release(bulletId); };
                Game.level.objects.push(
                    new BulletObject(this.polygon.pos.x + 16 + 10 * this.lookingDirection, this.polygon.pos.y + 21,
                        this.lookingDirection, bulletId
                    )
                );
            }
            this.shootKeyTime++;
        } else this.shootKeyTime = 0;

        if ((Game.isButtonDown('Shift') || Game.isButtonDown('z')) && (this.availableJumps != 0 || this.jumpKeyTime != 0)) {
            if (this.jumpKeyTime == 0) {
                this.availableJumps--;
                if (this.availableJumps == 1) AudioManager.play("jump1", "assets/sounds/jump1.wav");
                else AudioManager.play("jump2", "assets/sounds/jump2.wav");
            }
            this.jumpKeyTime += delta;
            if (this.jumpKeyTime < 0.3) {
                if (this.availableJumps == 1) this.dy = -220 * delta;
                else this.dy = -180 * delta;
            }
        } else this.jumpKeyTime = 0;

        if (this.dx != 0) this.lookingDirection = Math.sign(this.dx);
        this.dy = Math.max(Math.min(this.dy, 10.666), -10.666);
        let previousPos: Vector = (new Vector()).copy(this.polygon.pos);
        this.onGround = false;
        if (this.moveBy(this.dx, this.dy)) {
            if (this.dy > 0 && this.polygon.pos.y == previousPos.y) {
                // On ground
                this.dy = 1;
                this.onGround = true;
                this.availableJumps = 2;
            }
        }
        if (!this.onGround && this.availableJumps > 1) this.availableJumps = 1; 
    }

    public die(): void {
        if (Game.level.isRemoved(this.id)) return;
        Game.level.removeObject(this.id);
        let center: Vector = this.polygon.getCentroid().add(this.polygon.pos);
        for (let i = 0; i < 128; i++) {
            Game.level.objects.push(new BloodParticle(center.x, center.y,
                    Math.cos(Math.PI * 2 / 48 * i) * Math.random() * 6, Math.sin(Math.PI * 2 / 48 * i) * Math.random() * 10,
                    "blood" + randomUnsecureUUID()
                )
            );
        }
        for (let i = 0; i < 8; i += 2) {
            for (let o = 0; o < (i > 3 ? 2 : 1); o++) {
                Game.level.objects.push(new GibParticle(center.x, center.y,
                        Math.cos(Math.random() * Math.PI * 2) * Math.random() * 4, Math.sin(Math.random() * Math.PI * 2) * Math.random() * 4,
                        i, "gib" + randomUnsecureUUID()
                    )
                );
            }
        }
        AudioManager.playMusic("assets/music/gameover.ogg", false);
        Game.level.objects.push(new DeathMessage());
    }

    public draw(ctx: CanvasRenderingContext2D, delta: number): void {
        this.frameTime += delta;
        while (this.frameTime >= 0.40) this.frameTime -= 0.40;
        let frame: number = Math.floor(this.frameTime / 0.10);

        ctx.save();
        if (this.lookingDirection == -1) {
            ctx.translate(Game.canvas.width - this.polygon.pos.x, this.polygon.pos.y);
            ctx.scale(-1, 1);
            ctx.translate(Game.canvas.width - this.polygon.pos.x * 2 - 32, 0);
        } else {
            ctx.translate(this.polygon.pos.x, this.polygon.pos.y);
        }

        if (this.dy < 0) {
            // Jumping
            if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.02) {
                ctx.drawImage(this.image, 0, 64, 32, 32, 0, 0, 32, 32);
            } else if (this.jumpKeyTime != 0 && this.jumpKeyTime < 0.04) {
                ctx.drawImage(this.image, 32, 64, 32, 32, 0, 0, 32, 32);
            } else {
                ctx.drawImage(this.image, (frame % 2) * 32 + 64, 64, 32, 32, 0, 0, 32, 32);
            }
        } else if (!this.onGround) {
            // Falling
            ctx.drawImage(this.image, (frame % 2) * 32, 96, 32, 32, 0, 0, 32, 32);
        } else if (this.dx != 0) {
            // Running
            ctx.drawImage(this.image, frame * 32, 32, 32, 32, 0, 0, 32, 32);
        } else {
            // Idle
            ctx.drawImage(this.image, frame * 32, 0, 32, 32, 0, 0, 32, 32);
        }
        ctx.restore();
    }
}