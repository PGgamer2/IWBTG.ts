/**
 * Generates a random UUID. The ID might not be unique.
 */
export function randomUnsecureUUID(): string {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, (c) => {  
        const r = Math.floor(Math.random() * 16);  
        return r.toString(16);  
    });
}

const bufferCanvas: HTMLCanvasElement = document.getElementById("buffer-canvas") as HTMLCanvasElement;
const bufferCtx: CanvasRenderingContext2D = (() => {
    let ctx = bufferCanvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    return ctx;
})();

/**
 * Draws an image to the (cleaned) buffer canvas and returns the canvas itself. Can be used to draw a part of an image to the main canvas without transform-caused artifacts.
 * @param image an element to draw into the context.
 * @param sx x-axis coordinate of the source image's top left corner
 * @param sy y-axis coordinate of the source image's top left corner
 * @param sw width of the source image region to draw
 * @param sh height of the source image region to draw
 * @returns 
 */
export function bufferDrawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number): HTMLCanvasElement {
    bufferCanvas.width = sw;
    bufferCanvas.height = sh;
    bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
    bufferCtx.drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);
    return bufferCanvas;
}