document.body.onload = function() {
	document.getElementById("loading").style.display = "none";
}

var musicElem = document.getElementById("music");
document.body.onclick = document.body.onkeypress = function() {
	if (musicElem.paused) {
		musicElem.play();
	}
}

var keymap = {};
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keymap[e.keyCode] = e.type == 'keydown';
}

var objects = [];
function addObject(fid, fx, fy, fimg) {
	elem = document.createElement("img");
	elem.id = fid;
	elem.src = fimg;
	elem.style.top = fy;
	elem.style.left = fx;
	document.body.appendChild(elem);
	objects[objects.length] = { "element": elem };
}

var plCenter = document.createElement("img");
plCenter.src = "assets/player/sprPlayerRunning/tile000.png";
var plCurrentSprite = 0;

var windowW = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
var windowH = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

plCenter.style.top = windowH - 96;
plCenter.style.left = 96;
var plFinalLocation = 96;
var plLocNumber = 1;
var plDir = 1;

for (i = 0; i < Math.trunc(windowW / 64) + 1; i++) {
	if (Math.random() > 0.45) addObject("tr" + i, i * 64, windowH - 225, "assets/sprBroccoli.png");
}
for (i = 0; i < Math.trunc(windowW / 32) + 2; i++) {
	addObject("tt" + i, i * 32, windowH - 32, "assets/sprBlock.png");
}
for (i = 0; i < Math.trunc(windowW / 32) + 2; i++) {
	addObject("tg" + i, i * 32, windowH - 64, "assets/sprGrass.png");
}

var ribbon = document.createElement("a");
ribbon.href = "https://github.com/PGgamer2/IWBTG.js";
addClass(ribbon, "github-fork-ribbon");
ribbon.title = "Fork me on GitHub";
ribbon.innerHTML = "Fork me on GitHub";
ribbon.setAttribute("data-ribbon", "Fork me on GitHub");

document.body.appendChild(plCenter);
document.body.appendChild(ribbon);
var plMoving;

for (i = 1; i <= 3; i++) {
	var selBox = document.createElement("div");
	selBox.id = "selBox" + i;
	addClass(selBox, "fileSelectionBox");
	var selBoxLeft = (windowW - 192 * 3) / 4 * i + 192 * (i - 1);
	selBox.style.left = selBoxLeft;
	
	var boxTitle = document.createElement("p");
	var boxImage = document.createElement("img");
	boxImage.id = "saveFileThumbnail" + i;
	boxImage.src = "assets/ui/sprNewFile.png";
	addClass(boxTitle, "savetitle");
	boxTitle.innerHTML = "SAVE FILE " + i;
	selBox.appendChild(boxTitle);
	selBox.appendChild(boxImage);
	selBox.setAttribute("data-selbox-number", i);
	selBox.onclick = function() {
		var selBoxNumber = this.getAttribute("data-selbox-number");
		if (selBoxNumber != plLocNumber) {
			plDir = plLocNumber < selBoxNumber ? 1 : -1;
			plLocNumber = selBoxNumber;
			plFinalLocation = parseInt(document.getElementById("saveFileThumbnail" + plLocNumber).parentElement.style.left) + 192 / 2 - 16;
			plMoving = true;
		} else {
			startGame(selBoxNumber);
		}
	}
	document.body.appendChild(selBox);
	
	if (i == 1) plCenter.style.left = selBoxLeft + 192 / 2 - 16;
	
	for (a = 0; a < 4; a++) {
		var angle = document.createElement("img");
		var side = document.createElement("img");
		angle.src = "assets/megaman/sprBlock.png";
		side.src = "assets/megaman/sprFallingCeilingWall.png"
		angle.style.left = a == 1 || a == 3 ? selBoxLeft + 192 : selBoxLeft - 32;
		angle.style.top = a > 1 ? windowH / 4 + selBox.offsetHeight : windowH / 4 - 32;
		switch (a) {
			case 0:
			case 3:
				side.style.left = selBoxLeft + 80;
				side.style.top = a == 3 ? windowH / 4 + 192 - 62 : windowH / 4 - 32 - 80;
				side.style.width = "32px";
				side.style.height = "192px";
				addClass(side, "rotateMinusNineteen");
				break;
			case 1:
			case 2:
				side.style.left = a == 2 ? selBoxLeft + 192 : selBoxLeft - 32;
				side.style.top = windowH / 4;
				side.style.width = "32px";
				side.style.height = selBox.offsetHeight;
				break;
		}
		document.body.appendChild(angle);
		document.body.appendChild(side);
	}
}

function startGame(saveFileNumber) {
	location.href = "levels/graveyard.html";
}

setInterval(function() {
	plCurrentSprite++;
	if (plCurrentSprite > 3) plCurrentSprite = 0;
	plCenter.src = "assets/player/sprPlayerRunning/tile00" + plCurrentSprite + ".png";
}, 1000/15);

setInterval(function() {
	for (i = 0; i < objects.length; i++) {
		objects[i]["element"].style.left = parseInt(objects[i]["element"].style.left) - 2;
		if (objects[i]["element"].src.contains("sprBroccoli.png")) {
			if (parseInt(objects[i]["element"].style.left) <= -111) objects[i]["element"].style.left = windowW + (Math.random() * 2 + 1) * 64;
			continue;
		}
		if (parseInt(objects[i]["element"].style.left) <= -32) objects[i]["element"].style.left = 32 * (Math.trunc(windowW / 32) + 2) - 32;
	}
	
	if ((keymap[68] || keymap[39]) && !plMoving) {
		if (plLocNumber <= 3) {
			plLocNumber += 1;
			plFinalLocation = parseInt(document.getElementById("saveFileThumbnail" + plLocNumber).parentElement.style.left) + 192 / 2 - 16;
			plDir = 1;
			plMoving = true;
		}
	}
	if ((keymap[65] || keymap[37]) && !plMoving) {
		if (plLocNumber >= 1) {
			plLocNumber -= 1;
			plFinalLocation = parseInt(document.getElementById("saveFileThumbnail" + plLocNumber).parentElement.style.left) + 192 / 2 - 16;
			plDir = -1;
			plMoving = true;
		}
	}
	if (keymap[13] || keymap[32]) {
		startGame(plLocNumber);
	}
	if (plMoving) {
		plCenter.style.left = parseInt(plCenter.style.left) + plDir * 20;
		if ((parseInt(plCenter.style.left) <= plFinalLocation && plDir == -1) || (parseInt(plCenter.style.left) >= plFinalLocation && plDir == 1)) {
			plMoving = false;
			plCenter.style.left = plFinalLocation;
		}
	}
}, 1000/30);