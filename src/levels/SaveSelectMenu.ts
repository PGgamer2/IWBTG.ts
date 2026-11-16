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

        this.objects.push(new TileObject("grass", 0, 17, 26, 1, [Sprites.GrassRedBlock]));
        this.objects.push(new TileObject("ground", 0, 18, 26, 1, [Sprites.RedBlock]));

        // Trees
        for (let i = 0; i < 7; i++) {
            let obj: SpriteObject = new SpriteObject("tree" + i, (Math.random() * 800) | 0, 369, 111, 175, Sprites.Broccoli);
            obj.collision = false;
            this.objects.push(obj);
        }

        // Clouds
        for (let i = 0; i < 6; i++) {
            let obj: AnimatedSpriteObject = new AnimatedSpriteObject("cloud" + i, (Math.random() * 800) | 0, (96 + Math.random() * 210) | 0, 112, 32, Sprites.Cloud, 0.5);
            obj.collision = false;
            this.objects.push(obj);
        }

        // UI
        this.objects.push(new TileObject("top0", 0, 0, 1, 3, [Sprites.SimpleBlock, Sprites.SimpleVBeam], [0, 1, 0]));
        this.objects.push(new TileObject("top1", 24, 0, 1, 3, [Sprites.SimpleBlock, Sprites.SimpleVBeam], [0, 1, 0]));
        this.objects.push(new SpriteObject("top2", 32, 0, 736, 32, Sprites.SimpleHBeam));
        this.objects.push(new SpriteObject("top2", 32, 64, 736, 32, Sprites.SimpleHBeam));
        
        this.objects.push(new TileObject("save0_0", 1, 4, 6, 1, [Sprites.SimpleBlock, Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
        this.objects.push(new TileObject("save0_1", 1, 14, 6, 1, [Sprites.SimpleBlock, Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
        this.objects.push(new SpriteObject("save0_2", 32, 160, 32, 288, Sprites.SimpleVBeam));
        this.objects.push(new SpriteObject("save0_3", 192, 160, 32, 288, Sprites.SimpleVBeam));
        
        this.objects.push(new TileObject("save1_0", 9, 4, 6, 1, [Sprites.SimpleBlock, Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
        this.objects.push(new TileObject("save1_1", 9, 14, 6, 1, [Sprites.SimpleBlock, Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
        this.objects.push(new SpriteObject("save1_2", 288, 160, 32, 288, Sprites.SimpleVBeam));
        this.objects.push(new SpriteObject("save1_3", 448, 160, 32, 288, Sprites.SimpleVBeam));
        
        this.objects.push(new TileObject("save2_0", 17, 4, 6, 1, [Sprites.SimpleBlock, Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
        this.objects.push(new TileObject("save2_1", 17, 14, 6, 1, [Sprites.SimpleBlock, Sprites.SimpleHBeam], [0, 1, 1, 1, 1, 0]));
        this.objects.push(new SpriteObject("save2_2", 544, 160, 32, 288, Sprites.SimpleVBeam));
        this.objects.push(new SpriteObject("save2_3", 704, 160, 32, 288, Sprites.SimpleVBeam));

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
                this.objects[i].polygon.pos.x = (850 + (Math.random() - 0.5) * 100) | 0;
        }
        for (let i = 9; i < 15; i++) {
            this.objects[i].polygon.pos.x -= SaveSelectMenu.scrollVel * delta;
            if (this.objects[i].polygon.pos.x < -112) {
                this.objects[i].polygon.pos.x = (850 + (Math.random() - 0.5) * 100) | 0;
                this.objects[i].polygon.pos.y = (96 + Math.random() * 210) | 0;
            }
        }

        ctx.fillStyle = "#C4D7F7";
        ctx.fillRect(0, 0, 800, 608);
        ctx.fillStyle = "#88391E";
        ctx.fillRect(0, 544, 800, 64);
        ctx.fillStyle = "#000000";
        super.update(ctx, delta);
        this.drawUI(ctx, delta);
    }

    public drawUI(ctx: CanvasRenderingContext2D, delta: number): void {
        ctx.fillStyle = "#000000";
        ctx.fillRect(32, 32, 736, 32);      // top
        ctx.fillRect(64, 160, 128, 288);    // save0
        ctx.fillRect(320, 160, 128, 288);   // save1
        ctx.fillRect(576, 160, 128, 288);   // save2
    }

    public instantiate(): BasicLevel {
        return new SaveSelectMenu();
    }
}