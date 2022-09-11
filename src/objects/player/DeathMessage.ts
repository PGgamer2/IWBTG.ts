import ImageObject from "../ImageObject";
export default class DeathMessage extends ImageObject {
    constructor() {
        super("death_message", 400 - 350, 304 - 82, 700, 164, "assets/textures/ui/sprGameOver.png");
        this.collision = false;
    }
}