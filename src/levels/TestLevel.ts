import BasicLevel from './BasicLevel';
import PlayerObject from '../objects/player/PlayerObject';
import SpikeObject from '../objects/SpikeObject';
import AudioManager from '../AudioManager';
import TileObject from '../objects/TileObject';
import { Sprites } from '../SpriteManager';
export default class TestLevel extends BasicLevel {
    constructor() {
        super();
        this.backgroundStyle = "#C4D7F7";
        AudioManager.playMusic("assets/music/begins.ogg");
        
        this.objects.push(new PlayerObject(32, 512));
        this.objects.push(new TileObject("ground0", 0, 18, 25, 1, [Sprites.RedBlock]));
        this.objects.push(new TileObject("wall0", 8, 14, 1, 4, [Sprites.RedBlock]));
        this.objects.push(new TileObject("wall1", 9, 12, 1, 6, [Sprites.RedBlock]));
        this.objects.push(new TileObject("wall0", 10, 14, 1, 2, [Sprites.RedBlock]));

        this.objects.push(new SpikeObject("spike0", 320, 416, 1));
        this.objects.push(new SpikeObject("spike1", 320, 384, 1));
        this.objects.push(new SpikeObject("spike2", 288, 352, 0));
    }

    public instantiate(): BasicLevel {
        return new TestLevel();
    }
}