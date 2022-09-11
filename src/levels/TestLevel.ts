import BasicLevel from './BasicLevel';
import PlayerObject from '../objects/player/PlayerObject';
import SpikeObject from '../objects/SpikeObject';
import AudioManager from '../AudioManager';
import TileObject from '../objects/TileObject';
export default class TestLevel extends BasicLevel {
    constructor() {
        super();
        AudioManager.playMusic("assets/music/begins.ogg");
        
        this.objects.push(new PlayerObject(32, 512));
        this.objects.push(new TileObject("ground0", 0, 18, 25, 1, ["assets/textures/objects/sprFallingBlock.png"]));
        this.objects.push(new TileObject("wall0", 8, 14, 1, 4, ["assets/textures/objects/sprFallingBlock.png"]));
        this.objects.push(new TileObject("wall1", 9, 12, 1, 6, ["assets/textures/objects/sprFallingBlock.png"]));

        this.objects.push(new SpikeObject("spike0", 320, 416, 1));
        this.objects.push(new SpikeObject("spike1", 320, 384, 1));
        this.objects.push(new SpikeObject("spike2", 288, 352, 0));
    }

    public instanceFabric(): BasicLevel {
        return new TestLevel();
    }
}