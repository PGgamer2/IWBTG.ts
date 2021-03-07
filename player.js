var player = {'dx': 0, 'dy': 0, 'x': levelXoffset * 32 + 32, 'y': levelYoffset * 32 + 320, 'speed': 6,
              'w': 14, 'h': 21, 'dead': false, 'shootTimer': 0, 'bullets': [],
              'spriteH': 1, 'grounded': false, 'jump': 1, 'jumpTimer': 0, 'jumpTime': 8.5, 'maxJumps': 2};
var gravity = 3;
var termVel = 10;
var plElem = document.createElement("img");
plElem.id = 'player';
plElem.src = getSpritePath(0);
plElem.style.top = player['y'];
plElem.style.left = player['x'];
document.body.appendChild(plElem); // Add player

var gameOverSprite = document.createElement("img");
gameOverSprite.src = "assets/sprGameOver.png"; // Game over sprite
gameOverSprite.style.zIndex = "3";
gameOverSprite.style.top = windowH / 2 - 94;
gameOverSprite.style.left = windowW / 2 - 400;
gameOverSprite.style.display = "none";
document.body.appendChild(gameOverSprite);

var mousePosition = {x: 0, y: 0};
var mouseClicking = false;
var keymap = {};
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    keymap[e.keyCode] = e.type == 'keydown';
}

function playerUpdate() {
	if (keymap[82] || (mouseClicking && player["dead"])) {
		// Reset
		player["x"] = levelXoffset * 32 + 32;
		player["y"] = levelYoffset * 32 + 320;
		if (player["dead"]) {
			player["dead"] = false;
			try { musicElem.currentTime = 0; } catch (e) {}
			musicElem.play();
			gmMusicElem.pause();
		}
		for (part = 0; part < particles.length; part++) {
			try {
				particles[part]['elem'].remove();
			} catch (e) { }
		}
		particles = [];
	}
	if (!player["dead"]) {
		player["dx"] = 0;
		if (player["dy"] < termVel) player["dy"] += gravity; // Gravity force
		if (keymap[68] || keymap[39] || (mouseClicking && mousePosition["x"] > player["x"] + player["w"] / 4 * 3)) {
			// Slide to the right
			player["dx"] = player["speed"];
			player["spriteH"] = 1;
		}
		if (keymap[65] || keymap[37] || (mouseClicking && mousePosition["x"] < player["x"] + player["w"] / 4)) {
			// Slide to the left
			player["dx"] = -player["speed"];
			player["spriteH"] = -1;
		}
		
		if (keymap[90] || keymap[69]) {
			// Criss cro-
			// Shoot
			player['shootTimer']++;
			if (player['shootTimer'] == 1) {
				var bullet = document.createElement("img");
				bullet.src = getSpritePath(4);

				var by = player['y'] + (player['h'] / 2);
				bullet.style.top = by;
				var bx = player['x'];
				if (player["spriteH"] == 1) bx = player['x'] + player['w'];
				bullet.style.left = bx;
				
				player['bullets'][player['bullets'].length] = {'elem': bullet, 'x': bx, 'y': by, 'dir': player["spriteH"]};
				document.body.appendChild(bullet);
			}
		}
		else player['shootTimer'] = 0;
		
		if (keymap[87] || keymap[32] || keymap[38] || keymap[16] ||
		   (mouseClicking && mousePosition["x"] + 2 >= player["x"] && mousePosition["x"] - 2 <= player["x"] + player["w"])) {
			// Jump
			if (player["jumpTimer"] == 0 && player["jump"] <= player["maxJumps"]) {
				player["jump"]++;
			}
			player["jumpTimer"]++;
			if (player["jump"] <= player["maxJumps"] && player["jumpTimer"] < player["jumpTime"]) {
				player["dy"] = -player["jumpTime"];
			}
		}
		else player["jumpTimer"] = 0;
		player["grounded"] = false;
	}
	
	for (i = 0; i < player['bullets'].length; i++) {
		// Move bullets
		player['bullets'][i]['x'] += player['bullets'][i]['dir'] * 15;
		player['bullets'][i]['elem'].style.left = player['bullets'][i]['x'];
	}
	
	for (obji = 0; obji < objects.length; obji++) {
		var obj = objects[obji];
		if (!player["dead"]) {
			var futurex = player["x"] + player["dx"];
			var futurey = player["y"] + player["dy"];
			if (overlap(futurex, futurey, player["w"], player["h"], obj["x"], obj["y"], obj["w"], obj["h"])) {
				if (obj["dangerous"]) {
					player["dead"] = true;
					try { gmMusicElem.currentTime = 0; } catch (e) {}
					musicElem.pause();
					gmMusicElem.play();
					var partAmount = 12;
					var circles = 10;
					var radius = player["w"] / 2;
					for (icircle = 0; icircle < circles; icircle++) {
						for (iangle = 0; iangle < partAmount; iangle++) {
							// Particle explosion
							var angle = iangle * (360 / partAmount);
							var currentParticle = document.createElement("span");
							currentParticle.style.backgroundColor = 'red';
							currentParticle.style.width = "2px";
							currentParticle.style.height = "2px";
							var partSin = Math.sin(Math.PI * 2 * angle / 360);
							var partCos = Math.cos(Math.PI * 2 * angle / 360);
							var partx = player["x"] + (player["w"] / 2) + radius * partSin;
							var party = player["y"] + (player["h"] / 2) + radius * partCos;
							currentParticle.style.top = party;
							currentParticle.style.left = partx;
							particles[particles.length] = {'elem': currentParticle, 'x': partx, 'y': party, 'xdir': partSin,
							                               'dy': -0.5 * (radius * partCos), 'timesBounced': 0, 'stopMovingH': false};
							document.body.appendChild(currentParticle);
						}
						radius += 4;
					}
					break;
				}
				
				if ((futurex + player["w"] >= obj["x"] && futurex + player["w"] <= obj["x"] + player["dx"] * 1.5) ||
					(futurex <= obj["x"] + obj["w"] && futurex >= obj["x"] - player["dx"] * 1.5)) {
					if (obj["y"] < player["y"] + player["h"] && obj["y"] + obj["h"] > player["y"]) {
						player["dx"] = 0;
					}
				}
				
				if (futurey + player["h"] >= obj["y"] && futurey + player["h"] <= obj["y"] + player["dy"] * 1.5 &&
					obj["x"] + obj["w"] > player["x"] && obj["x"] < player["x"] + player["w"]) {
					player["dy"] = 0;
					player["y"] = obj["y"] - player["h"];
					player["grounded"] = true;
					player["jump"] = 0;
				}
				if (futurey <= obj["y"] + obj["h"] && futurey >= obj["y"] - player["dy"] * 1.5 &&
					obj["x"] + obj["w"] > player["x"] && obj["x"] < player["x"] + player["w"]) {
					player["dy"] = 0;
				}
			}
		}
		
		for (i = 0; i < player['bullets'].length; i++) {
			// Bullet collision
			if (overlap(player['bullets'][i]['x'], player['bullets'][i]['y'], 4, 4, obj["x"], obj["y"], obj["w"], obj["h"])) {
				if (obj["img"] != "assets/sprSpike.png") {
					player['bullets'][i]['elem'].remove();
					player['bullets'].splice(i, 1);
				}
			}
		}
		
		for (i = 0; i < particles.length; i++) {
			// Particle collision
			if (obj['img'] != 'assets/sprSpike.png') {
				if (overlap(particles[i]['x'], particles[i]['y'] + 2, 2, 0, obj['x'], obj['y'], obj['w'], obj['h'])) {
					if (particles[i]['timesBounced'] < 5) {
						particles[i]['timesBounced']++;
						particles[i]['xdir'] = Math.random() * 2 - 1;
						particles[i]['dy'] = -5 / particles[i]['timesBounced'];
					} else {
						particles[i]['stopMovingV'] = true;
					}
				}
				if (!particles[i]['stopMovingH']) {
					if (overlap(particles[i]['x'] + 2, particles[i]['y'], 0, 2, obj['x'], obj['y'], obj['w'], obj['h'])) {
						particles[i]['stopMovingH'] = true;
					}
					if (overlap(particles[i]['x'], particles[i]['y'], 0, 2, obj['x'] + obj['w'], obj['y'], obj['w'], obj['h'])) {
						particles[i]['stopMovingH'] = true;
					}
				}
			}
		}
	}
		
	if (!player["grounded"] && player["jump"] == 0) player["jump"] = 1;
		
	if (!player["dead"]) {
		player["x"] += player["dx"];
		player["y"] += player["dy"];
	}
	
	drawPlayerSprite();
}

document.body.onmousemove = handleMouseMove;
document.body.addEventListener("click", handleMouseMove);
document.body.addEventListener("mousedown", function() { mouseClicking = true });
document.body.addEventListener("mouseup", function() { mouseClicking = false });
function handleMouseMove(event) {
	var eventDoc, doc, body;

	event = event || window.event; // IE-ism
	if (event.pageX == null && event.clientX != null) {
		eventDoc = (event.target && event.target.ownerDocument) || document;
		doc = eventDoc.documentElement;
		body = eventDoc.body;

		event.pageX = event.clientX +
		             (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
		             (doc && doc.clientLeft || body && body.clientLeft || 0);
		event.pageY = event.clientY +
		             (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
		             (doc && doc.clientTop  || body && body.clientTop  || 0 );
	}
	
	mousePosition["x"] = event.pageX;
	mousePosition["y"] = event.pageY;
}

function drawPlayerSprite() {
	if (player["dead"]) {
		plElem.src = '';
		gameOverSprite.style.display = 'block';
	} else {
		plElem.style.left = player["x"] - ((32 - player["w"]) / 2);
		plElem.style.top = player["y"] - (32 - player["h"]);
		
		var sprType = 0;
		
		if (player["dx"] != 0 && player["grounded"]) sprType = 2;
		if (player["dx"] == 0 && player["grounded"]) sprType = 1;
		if (player["dy"] < 0 && !player["grounded"]) sprType = 3;
		
		if (player["spriteH"] == -1) plElem.classList.add("flipH");
		else plElem.classList.remove("flipH");
		
		plElem.src = getSpritePath(sprType);
		gameOverSprite.style.display = 'none';
	}
	
	// Move particles
	for (i = 0; i < particles.length; i++) {
		if (!particles[i]['stopMovingH']) particles[i]['x'] += (particles[i]['xdir'] + ((Math.random() * 2) - 1) / 10) * (Math.random() * 9);
		if (!particles[i]['stopMovingV'] && particles[i]['dy'] < termVel) particles[i]['dy'] += gravity / 2;
		if (particles[i]['stopMovingV']) particles[i]['dy'] = 0;
		particles[i]['y'] += particles[i]['dy'];
		particles[i]['elem'].style.top = particles[i]['y'];
		particles[i]['elem'].style.left = particles[i]['x'];
		
		if (particles[i]['y'] > windowH) {
			try {
				particles[i]['elem'].remove();
				particles.splice(i, 1);
			} catch (e) { }
		}
	}
}

function overlap(x1, y1, w1, h1, x2, y2, w2, h2) {
	return (x1 < x2 + w2 &&
		    x1 + w1 > x2 &&
		    y1 < y2 + h2 &&
		    y1 + h1 > y2);
}

setInterval(playerUpdate, 1000/30);