# [IWBTG.js](https://pggamer2.github.io/IWBTG.js/)
A remake of the popular game [I Wanna Be The Guy](https://iwbtg.kayin.moe/) in pure JavaScript.

It is incomplete. At the moment there's only:
- A save file selector scene (you can't save the game at the moment, I'll add this feature later).
- Some levels of the game.
- The Kid. He can move, double jump and shoot.
- Spikes. Ouch...

# Project Structure
	IWBTG.js
	├───assets: images, fonts, sprites, etc.
	├───levels: all of the available levels.
	├───sounds: all of the sounds and music.
	│   └───mp3: an MP3 version of the audio for browser support.
	├───404.html: 404 page. It instantly redirects the user to index.html
	├───homeScreen.js: index.html .JS file.
	├───index.html: save file selection screen.
	├───level.js: main .JS file for level managing.
	├───player.js: main .JS file to control the player.
	├───polyfill.js: polyfills for old browsers support.
	└───style.css: main .CSS file. It is important because it mainly changes elements' position property to 'fixed'.

# FAQ

## Why did you do this?
I thought it would be cool.

## Why are trees named Broccoli?
Ask this question to the original creator of the game. This is the official name for trees.

## You are using HTML elements for every single object instead of a canvas?
Yes because when the project will be finished I'll try to make the game compatible with every single browser, even the oldest ones.
Sadly, in old browsers canvases aren't supported so I'm using HTML elements instead.
