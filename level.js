var objects = [];
var animations = [
	{'currentSprite': 0, 'spriteDir': ['player/sprPlayerFall'], 'totalSprites': 2},
	{'currentSprite': 0, 'spriteDir': ['player/sprPlayerIdle'], 'totalSprites': 4},
	{'currentSprite': 0, 'spriteDir': ['player/sprPlayerRunning'], 'totalSprites': 4},
	{'currentSprite': 0, 'spriteDir': ['player/sprPlayerJump'], 'totalSprites': 2},
	{'currentSprite': 0, 'spriteDir': ['player/sprBullet'], 'totalSprites': 2}
];
var particles = [];

if (!Math.trunc) {
	Math.trunc = function (v) {
		return v < 0 ? Math.ceil(v) : Math.floor(v);
	};
}

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

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
	if (!player["dead"] && musicElem.currentTime >= 98.7) {
		musicElem.currentTime = 32.520;
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

const terrain = [
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,1,1,
	1,0,0,0,0,0,0,0,0,0,0,0,7,7,0,0,0,0,0,0,0,0,0,0,1,1,
	1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,8,0,0,2,1,1,
	1,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,1,1,
	1,0,0,0,0,0,0,0,0,0,0,0,4,1,1,4,0,0,0,0,0,0,0,0,1,1,
	1,0,0,0,0,0,0,3,0,0,0,0,0,0,4,0,0,0,0,0,0,2,2,2,1,1,
	1,6,0,0,0,0,3,2,2,3,0,0,0,0,0,6,0,0,0,0,0,0,1,1,1,1,
	1,0,0,0,0,0,2,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
	1,0,0,0,0,0,4,4,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,5,1,1,
	1,7,7,0,0,0,0,0,0,0,0,0,1,2,0,0,0,7,7,0,0,0,0,5,1,1,
	1,0,0,0,0,0,0,0,3,3,3,3,1,1,3,0,0,3,0,3,0,0,0,5,1,1,
	1,2,2,0,0,0,3,3,2,2,2,2,1,1,2,2,2,2,2,2,0,0,0,5,1,1,
	1,1,1,0,0,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,2,1,1,
	1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,
	1,1,1,2,0,7,7,7,7,0,0,0,0,7,0,7,0,0,0,7,7,0,2,1,1,1,
	1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,
	1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

var windowW = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var windowH = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var levelYoffset = Math.round((windowH / 32 - 20) / 2);
var levelXoffset = Math.round((windowW / 32 - 26) / 2);

// Background
bg = document.createElement("img");
bg.src = "bg.jpg";
bg.style.top = levelYoffset * 32;
bg.style.left = levelXoffset * 32;
bg.style.width = 26 * 32;
bg.style.height = 20 * 32;
document.body.appendChild(bg);

for (i = 0; i < terrain.length; i++) {
	if (terrain[i] > 5) {
		// Decorations like trees (broccoli), fences and the moon
		Xoffset = 0, Yoffset = 0;
		if (terrain[i] == 8) {
			sprite = "sprMoon.png";
		}
		if (terrain[i] == 7) {
			sprite = "sprFence.png";
			Yoffset = 32;
		}
		if (terrain[i] == 6) {
			sprite = "sprBroccoli.png";
			Xoffset = -25;
		}
		addObject("ter" + i, levelXoffset * 32 + 32 * (i - 26 * Math.trunc(i / 26)) + Xoffset, levelYoffset * 32 + 32 * Math.trunc(i / 26) + Yoffset, sprite, false, false, false);
	}
}
	
for (i = 0; i < terrain.length; i++) {
	// Terrain and spikes
	sprite = "sprBlock.png";
	flipV = false;
	rotateMinus90 = false;
	dangerous = false;
	fw = 32;
	fh = 32;
	xOffset = 0;
	yOffset = 0;
	xSpriteOffset = 0;
	ySpriteOffset = 0;
	if (terrain[i] == 2) sprite = "sprGrass.png";
	if (terrain[i] == 3 || terrain[i] == 4 || terrain[i] == 5) {
		sprite = "sprSpike.png";
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
	if (terrain[i] != 0 && terrain[i] < 6) addObject("ter" + i, levelXoffset * 32 + 32 * (i - 26 * Math.trunc(i / 26)) + xOffset, levelYoffset * 32 + 32 * Math.trunc(i / 26) + yOffset, sprite, flipV, rotateMinus90, true, dangerous, fw, fh, xSpriteOffset, ySpriteOffset);
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
	if (flipV) elem.classList.add("flipV");
	if (rotateMinus90) elem.classList.add("rotateMinusNineteen");
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

setInterval(levelUpdate, 1000/30);
setInterval(animUpdate, 1000/15);