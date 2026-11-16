import Game from "../../Game";
import PlayerObject from "./PlayerObject";

export default class FakePlayerObject extends PlayerObject {
    public selectedSave: number = 0;

    constructor(x: number = 112, y: number = 512, id: string = "fake_player") {
        super(x, y, id);
        this.collision = false;
        this.onGround = true;
        this.dx = Number.EPSILON;
    }

    public update(delta: number): void {
        if (Game.isButtonDown('ArrowRight')) {
            if (this.rightKeyTime++ == 0) {
                this.selectedSave = (this.selectedSave + 1) % 3;
            }
        } else this.rightKeyTime = 0;
        if (Game.isButtonDown('ArrowLeft')) {
            if (this.leftKeyTime++ == 0) {
                this.selectedSave = (this.selectedSave - 1 + 3) % 3;
            }
        } else this.leftKeyTime = 0;
        
        if (Game.isButtonDown('x')) {
            if (this.shootKeyTime++ == 0)
                this.shoot();
        } else this.shootKeyTime = 0;

        if (Game.isButtonDown('Shift') || Game.isButtonDown('z')) {
            if (this.jumpKeyTime++ == 0)
                Game.loadSave(this.selectedSave);
        } else this.jumpKeyTime = 0;

        let targetPos = 112 + this.selectedSave * 32 * 8;
        let dx = Math.min(Math.abs(this.polygon.pos.x - targetPos), PlayerObject.velocity * 4 * delta);
        
        this.moveBy(this.polygon.pos.x > targetPos ? -dx : dx, 0);
    }

    public die(): void {}
}