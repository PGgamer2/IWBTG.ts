document.body.onload = function() {
	document.getElementById("loading").style.display = "none";
}

var levelPath = "../";

var objects = [];
var animations = [
	{'currentSprite': 0, 'spriteDir': [levelPath + 'assets/player/sprPlayerFall'], 'totalSprites': 2},
	{'currentSprite': 0, 'spriteDir': [levelPath + 'assets/player/sprPlayerIdle'], 'totalSprites': 4},
	{'currentSprite': 0, 'spriteDir': [levelPath + 'assets/player/sprPlayerRunning'], 'totalSprites': 4},
	{'currentSprite': 0, 'spriteDir': [levelPath + 'assets/player/sprPlayerJump'], 'totalSprites': 2},
	{'currentSprite': 0, 'spriteDir': [levelPath + 'assets/player/sprBullet'], 'totalSprites': 2}
];
var particles = [];

var musicElem = document.getElementById("music");
var gmMusicElem = document.getElementById('gameoverMusic');
document.body.addEventListener("click", playMusic);
document.body.addEventListener("keypress", playMusic);
function playMusic() {
	if (musicElem.paused && !player["dead"]) {
		musicElem.play();
	}
}

function levelUpdate() {
	if (!player["dead"] && musicElem.currentTime >= musicElem.getAttribute("data-loop-finish")) {
		musicElem.currentTime = parseInt(musicElem.getAttribute("data-loop-start"));
	}
}

function animUpdate() {
	for (i = 0; i < animations.length; i++) {
		animations[i]["currentSprite"]++;
		if (animations[i]["currentSprite"] == animations[i]["totalSprites"]) {
			animations[i]["currentSprite"] = 0;
		}
	}
}

var windowW = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var windowH = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var levelW = document.body.getAttribute("data-iwbtg-levelw");
var levelH = document.body.getAttribute("data-iwbtg-levelh");
var levelYoffset = Math.round((windowH / 32 - levelH) / 2);
var levelXoffset = Math.round((windowW / 32 - levelW) / 2);

// Background
bg = document.createElement("img");
bg.src = document.body.getAttribute("data-iwbtg-bg");
bg.style.top = levelYoffset * 32;
bg.style.left = levelXoffset * 32;
bg.style.width = levelW * 32;
bg.style.height = levelH * 32;
document.body.appendChild(bg);

for (i = 0; i < terrain.length; i++) {
	if (terrain[i] > 5) {
		// Decorations like trees (broccoli), fences and the moon
		Xoffset = 0, Yoffset = 0;
		if (terrain[i] == 8) {
			sprite = levelPath + "assets/graveyard/sprMoon.png";
		}
		if (terrain[i] == 7) {
			sprite = levelPath + "assets/graveyard/sprFence.png";
			Yoffset = 32;
		}
		if (terrain[i] == 6) {
			sprite = levelPath + "assets/sprBroccoli.png";
			Xoffset = -25;
		}
		addObject("ter" + i, levelXoffset * 32 + 32 * (i - levelW * Math.trunc(i / levelW)) + Xoffset, levelYoffset * 32 + 32 * Math.trunc(i / levelW) + Yoffset, sprite, false, false, false);
	}
}

for (i = 0; i < terrain.length; i++) {
	// Terrain and spikes
	sprite = levelPath + "assets/sprBlock.png";
	flipV = false;
	rotateMinus90 = false;
	dangerous = false;
	fw = 32;
	fh = 32;
	xOffset = 0;
	yOffset = 0;
	xSpriteOffset = 0;
	ySpriteOffset = 0;
	if (terrain[i] == 2) sprite = levelPath + "assets/sprGrass.png";
	if (terrain[i] == 3 || terrain[i] == 4 || terrain[i] == 5) {
		sprite = levelPath + "assets/sprSpike.png";
		dangerous = true;
		fw = 28;
		fh = 30;
		xOffset = 2;
		yOffset = 2;
		xSpriteOffset = -2;
		ySpriteOffset = -2;
	}
	if (terrain[i] == 4) {
		flipV = true;
		fw = 28;
		fh = 30;
		xOffset = 2;
		yOffset = 0;
		xSpriteOffset = -2;
		ySpriteOffset = 0;
	}
	if (terrain[i] == 5) {
		rotateMinus90 = true;
		fw = 30;
		fh = 28;
		xOffset = 2;
		yOffset = 2;
		xSpriteOffset = -2;
		ySpriteOffset = -2;
	}
	if (terrain[i] != 0 && terrain[i] < 6) addObject("ter" + i, levelXoffset * 32 + 32 * (i - levelW * Math.trunc(i / levelW)) + xOffset, levelYoffset * 32 + 32 * Math.trunc(i / levelW) + yOffset, sprite, flipV, rotateMinus90, true, dangerous, fw, fh, xSpriteOffset, ySpriteOffset);
}

function addObject(fid, fx, fy, fimg, flipV, rotateMinus90, collidable, dangerous, fw, fh, spriteXoffset, spriteYoffset) {
	if (typeof flipV === 'undefined') flipV = false;
	if (typeof rotateMinus90 === 'undefined') rotateMinus90 = false;
	if (typeof collidable === 'undefined') collidable = true;
	if (typeof dangerous === 'undefined') dangerous = false;
	if (typeof fw === 'undefined') fw = 32;
	if (typeof fh === 'undefined') fh = 32;
	if (typeof spriteXoffset === 'undefined') spriteXoffset = 0;
	if (typeof spriteYoffset === 'undefined') spriteYoffset = 0;
	elem = document.createElement("img");
	elem.id = fid;
	elem.src = fimg;
	elem.style.top = fy + spriteYoffset;
	elem.style.left = fx + spriteXoffset;
	if (flipV) addClass(elem, "flipV");
	if (rotateMinus90) addClass(elem, "rotateMinusNineteen");
	document.body.appendChild(elem);
	if (collidable) objects[objects.length] = { 'id': fid, 'x': fx, 'y': fy, 'w': fw, 'h': fh, 'dangerous': dangerous,
	                'img': fimg, 'spriteXoffset': spriteXoffset, 'spriteYoffset': spriteYoffset, 'flipV': flipV, 'rotateMinus90': rotateMinus90};
}

function getSpritePath(animIndex) {
	return animations[animIndex]['spriteDir'] + "/tile" +
	       padLeadingZeros(animations[animIndex]['currentSprite'], 3) + ".png";
}

function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

levLoop = setInterval(levelUpdate, 1000/30);
animLoop = setInterval(animUpdate, 1000/15);