import { BasicLevel } from './BasicLevel';
import { PlayerObject } from '../objects/player/PlayerObject';
import { ImageObject } from '../objects/ImageObject';
import { SpikeObject } from '../objects/SpikeObject';
import { AudioManager } from '../AudioManager';
export class TestLevel extends BasicLevel {
    constructor() {
        super();
        AudioManager.playMusic("assets/music/begins.ogg");
        
        this.objects.push(new PlayerObject(32, 512));
        for (let i = 0; i < 25; i++) {
            this.objects.push(new ImageObject("ground" + i, i * 32, 576, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        }
        this.objects.push(new ImageObject("ground25", 256, 544, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        this.objects.push(new ImageObject("ground26", 256, 512, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        this.objects.push(new ImageObject("ground27", 256, 480, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        this.objects.push(new ImageObject("ground28", 256, 448, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        this.objects.push(new ImageObject("ground29", 288, 416, 32, 32, "assets/textures/objects/sprFallingBlock.png"));
        this.objects.push(new ImageObject("ground30", 288, 384, 32, 32, "assets/textures/objects/sprFallingBlock.png"));

        this.objects.push(new SpikeObject("spike0", 320, 416, 1));
        this.objects.push(new SpikeObject("spike1", 320, 384, 1));
        this.objects.push(new SpikeObject("spike2", 288, 352, 0));
    }

    public instanceFabric(): BasicLevel {
        return new TestLevel();
    }
}