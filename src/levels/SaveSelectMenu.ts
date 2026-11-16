import AudioManager from "../AudioManager";
import FakePlayerObject from "../objects/player/FakePlayerObject";
import { SpriteObject, AnimatedSpriteObject } from "../objects/SpriteObject";
import TileObject from "../objects/TileObject";
import { Sprites } from "../SpriteManager";
import BasicLevel from "./BasicLevel";

export default class SaveSelectMenu extends BasicLevel {
    public static readonly scrollVel: number = 75;

    constructor() {
        super();
        AudioManager.playMusic("assets/music/saveselect.ogg");

        this.objects.push(new TileObject("grass", 0, 17, 26, 1, [Sprites.GrassFallingBlock]));
        this.objects.push(new TileObject("ground", 0, 18, 26, 1, [Sprites.FallingBlock]));

        // Trees
        for (let i = 0; i < 7; i++) {
            this.objects.push(new SpriteObject("tree" + i, Math.random() * 800, 369, 111, 175, Sprites.Broccoli));
        }

        // Clouds
        for (let i = 0; i < 6; i++) {
            this.objects.push(new AnimatedSpriteObject("cloud" + i, Math.random() * 800, 10 + Math.random() * 300, 112, 32, Sprites.Cloud, 0.5));
        }

        this.objects.push(new FakePlayerObject());
    }

    public update(ctx: CanvasRenderingContext2D, delta: number): void {
        for (let i = 0; i < 2; i++) {
            this.objects[i].polygon.pos.x -= SaveSelectMenu.scrollVel * delta;
            if (this.objects[i].polygon.pos.x < -64)
                this.objects[i].polygon.pos.x = 0;
            else if (this.objects[i].polygon.pos.x < -32)
                this.objects[i].polygon.pos.x += 32;
        }
        for (let i = 2; i < 9; i++) {
            this.objects[i].polygon.pos.x -= SaveSelectMenu.scrollVel * delta;
            if (this.objects[i].polygon.pos.x < -111)
                this.objects[i].polygon.pos.x = 850 + (Math.random() - 0.5) * 100;
        }
        for (let i = 9; i < 15; i++) {
            this.objects[i].polygon.pos.x -= SaveSelectMenu.scrollVel * delta;
            if (this.objects[i].polygon.pos.x < -112) {
                this.objects[i].polygon.pos.x = 850 + (Math.random() - 0.5) * 100;
                this.objects[i].polygon.pos.y = 10 + Math.random() * 300;
            }
        }

        ctx.fillStyle = "#C4D7F7";
        ctx.fillRect(0, 0, 800, 608);
        ctx.fillStyle = "#88391E";
        ctx.fillRect(0, 608 - 64, 800, 64);
        ctx.fillStyle = "#000000";
        super.update(ctx, delta);
    }

    public instantiate(): BasicLevel {
        return new SaveSelectMenu();
    }
}