import BasicLevel from './levels/BasicLevel';
import Camera from './Camera';
import SaveSelectMenu from './levels/SaveSelectMenu';
import TestLevel from './levels/TestLevel';
export default class Game {
    public static DEBUG: boolean = false;
    public static canvas: HTMLCanvasElement = document.getElementById("main-canvas") as HTMLCanvasElement;
    public static lastTimestamp: DOMHighResTimeStamp = performance.now();

    public static level: BasicLevel = new SaveSelectMenu();
    public static camera: Camera = new Camera();

    public static keyMap: Map<string, boolean> = new Map<string, boolean>();
    public static isPushingReload: boolean = false;

    public static update(timestamp: DOMHighResTimeStamp) {
        Game.DEBUG = Game.isButtonDown("F2");
        // Resize keeping aspect ratio
        let pageAspectRatio = document.body.offsetWidth / document.body.offsetHeight;
        let scale = Math.floor(25 / 19 < pageAspectRatio ? document.body.offsetHeight / 19 : document.body.offsetWidth / 25);
		if ((document.getElementById("discrete-scale-checkbox") as HTMLInputElement).checked)
			scale = Math.max(1 << (31 - Math.clz32(scale)), 1);	// Set scale to a power of two
        Game.canvas.width = scale * 25;
        Game.canvas.height = scale * 19;
        // Get context and clear
        let ctx = Game.canvas.getContext("2d", {desynchronized: true, alpha: false})!;
        ctx.imageSmoothingEnabled = false;
        ctx.fillStyle = Game.level.backgroundStyle || "#000000";
        ctx.fillRect(0, 0, Game.canvas.width, Game.canvas.height);

        ctx.save();
        ctx.translate(Game.camera.x, Game.camera.y);
        ctx.scale(Game.camera.sizeX * (Game.canvas.width / 800), Game.camera.sizeY * (Game.canvas.height / 608));
        try {
            Game.level.update(ctx, (timestamp - Game.lastTimestamp) / 1000);
        } catch(e: unknown) {
            console.error(e);
        }
        ctx.restore();

        // Reload level
        if (Game.isButtonDown('r')) {
            if (!Game.isPushingReload) {
                this.loadSave();
            }
            Game.isPushingReload = true;
        } else Game.isPushingReload = false;
        
        Game.lastTimestamp = timestamp;
    }

    public static loadSave(save?: number): void {
        this.level.dispose();
        this.level = new TestLevel(); //TODO
    }

    public static isButtonDown(keyName: string): boolean {
        if (keyName.length == 1) keyName = keyName.toLowerCase();
        return Game.keyMap.get(keyName) ?? false;
    }
}
