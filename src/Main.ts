/*!
* I Wanna Be The Guy: The Movie: The Game
* TypeScript remake made by PGgamer2 (aka SonoPG).
* You can find the source code here: https://github.com/PGgamer2/IWBTG.ts
* Original game made by Kayin: https://kayin.moe/iwbtg/
*/

import { AudioManager } from "./AudioManager";
import { Game } from "./Game";

function frame(timestamp: DOMHighResTimeStamp) {
    Game.update(timestamp);
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);

onkeydown = function(e) {
    Game.keyMap.set(e.key, true);
    AudioManager.autoPlayFix();
};
onkeyup = function(e) { Game.keyMap.set(e.key, false); };