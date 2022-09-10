import { BasicLevel } from './levels/BasicLevel';
import { TestLevel } from './levels/TestLevel';
import { Camera } from './Camera';
export class Game {
    public static DEBUG: boolean = false;
    public static canvas: HTMLCanvasElement;
    public static lastTimestamp: DOMHighResTimeStamp = performance.now();

    public static level: BasicLevel = new TestLevel();
    public static camera: Camera = new Camera();

    public static keyMap: Map<string, boolean> = new Map<string, boolean>();
    public static isPushingReload: boolean = false;

    public static update(timestamp: DOMHighResTimeStamp) {
        Game.DEBUG = Game.isButtonDown("F2");
        Game.canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
        // Resize keeping aspect ratio
        let pageAspectRatio = document.body.offsetWidth / document.body.offsetHeight;
        let scale = 25 / 19 < pageAspectRatio ? document.body.offsetHeight / 19 : document.body.offsetWidth / 25;
        Game.canvas.width = scale * 25;
        Game.canvas.height = scale * 19;
        // Get context and clear
        let ctx = Game.canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);

        ctx.save();
        ctx.translate(Game.camera.x, Game.camera.y);
        ctx.rotate(Game.camera.angle);
        ctx.scale(Game.camera.sizeX * (Game.canvas.width / 800), Game.camera.sizeY * (Game.canvas.height / 608));
        Game.level.update(ctx, (timestamp - Game.lastTimestamp) / 1000);
        ctx.restore();

        // Reload level
        if (Game.isButtonDown('r')) {
            if (!Game.isPushingReload) this.level = this.level.instanceFabric();
            Game.isPushingReload = true;
        } else Game.isPushingReload = false;
        
        Game.lastTimestamp = timestamp;
    }

    public static isButtonDown(keyName: string): boolean {
        if (keyName.length == 1) {
            if (!Game.keyMap.has(keyName.toLowerCase()) || !Game.keyMap.get(keyName.toLowerCase())) {
                return Game.keyMap.has(keyName.toUpperCase()) && Game.keyMap.get(keyName.toUpperCase());
            }
            return true;
        }
        return Game.keyMap.has(keyName) && Game.keyMap.get(keyName);
    }
}
