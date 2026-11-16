export class ImageList {
    private static IMAGES: HTMLImageElement[] | undefined = [];

    public static register(src: string): HTMLImageElement {
        let img: HTMLImageElement = new Image();
        img.src = src;
        ImageList.IMAGES!.push(img);
        return img;
    }

    public static TILEMAP_MASTER: HTMLImageElement = ImageList.register("assets/textures/objects/tileMaster.png");
    public static SPIKE: HTMLImageElement = ImageList.register("assets/textures/objects/sprSpike.png");

    public static PLAYER: HTMLImageElement = ImageList.register("assets/textures/objects/player/sprPlayer.png");
    public static GIBS: HTMLImageElement = ImageList.register("assets/textures/objects/player/sprGibs.png");
    public static BLOOD: HTMLImageElement = ImageList.register("assets/textures/objects/player/sprBlood.png");
    public static BULLET: HTMLImageElement = ImageList.register("assets/textures/objects/player/sprBullet.png");

    public static GAMEOVER: HTMLImageElement = ImageList.register("assets/textures/ui/sprGameOver.png");
}

export class Sprite {
    public source: HTMLImageElement;
    public x: number;
    public y: number;
    public w: number;
    public h: number;

    constructor(source: HTMLImageElement, x: number = 0, y: number = 0, w: number, h: number) {
        this.source = source;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

export namespace Sprites {
    export const FallingBlock: Sprite = new Sprite(ImageList.TILEMAP_MASTER, 32, 32, 32, 32);
    export const SpikeUp: Sprite = new Sprite(ImageList.SPIKE, 0, 0, 32, 32);
    export const SpikeRight: Sprite = new Sprite(ImageList.SPIKE, 32, 0, 32, 32);
    export const SpikeDown: Sprite = new Sprite(ImageList.SPIKE, 64, 0, 32, 32);
    export const SpikeLeft: Sprite = new Sprite(ImageList.SPIKE, 96, 0, 32, 32);
    
    export const DeathMessage: Sprite = new Sprite(ImageList.GAMEOVER, 0, 0, 800, 188);
}