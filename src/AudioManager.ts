export default class AudioManager {
    public static audioMap: Map<string, HTMLAudioElement> = new Map();

    public static play(key: string, src: string = undefined, loop: boolean = false, volume: number = 1.0): HTMLAudioElement {
        let audio: HTMLAudioElement = AudioManager.audioMap.get(key);
        if (audio === undefined) {
            if (src === undefined) audio = new Audio();
            else audio = new Audio(src);
            audio.loop = loop;
            audio.volume = volume;
            AudioManager.audioMap.set(key, audio);
        }
        audio.play().catch(err => {
            console.warn(err);
            audio.setAttribute('muted', '');
            audio.muted = true;
        });
        return audio;
    }

    public static playMusic(src: string, loop: boolean = true): HTMLAudioElement {
        let audio: HTMLAudioElement = AudioManager.audioMap.get("_music");
        if (audio !== undefined && !audio.src.endsWith(src)) {
            AudioManager.release("_music");
        }
        return AudioManager.play("_music", src, loop, 0.75);
    }

    public static pause(key: string): boolean {
        let audio: HTMLAudioElement = AudioManager.audioMap.get(key);
        if (audio !== undefined) {
            audio.pause();
            return true;
        }
        return false;
    }

    public static release(key: string): boolean {
        if (AudioManager.pause(key)) {
            AudioManager.audioMap.get(key).remove();
            return AudioManager.audioMap.delete(key);
        }
        return false;
    }

    private static autoPlayFixed: boolean = false;
    public static autoPlayFix(): void {
        if (!AudioManager.autoPlayFixed) {
            console.info("Trying to fix autoplay...");
            AudioManager.autoPlayFixed = true;
            AudioManager.audioMap.forEach((val, key) => {
                if (val.muted) {
                    val.removeAttribute('muted');
                    val.muted = false;
                    if (key == "_music") {
                        val.play().catch(err => {
                            if (AudioManager.autoPlayFixed) console.warn(err);
                            AudioManager.autoPlayFixed = false;
                            val.setAttribute('muted', '');
                            val.muted = true;
                        });
                    }
                }
            });
        }
    }
}