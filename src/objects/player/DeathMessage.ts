import { Sprites } from "../../SpriteManager";
import SpriteObject from "../SpriteObject";
export default class DeathMessage extends SpriteObject {
    constructor() {
        super("death_message", 400 - 350, 304 - 82, 700, 164, Sprites.DeathMessage);
        this.collision = false;
    }
}