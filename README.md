# Pixi Chest Game

This is basic demo to demonstrate how to load assets, interact with game objects and show animations.

# 1. Preparing to run

Unzip the project then go to the root folder and run this command:

    http-server

If you don't have Node installed - please download and install it [NodeJS](https://nodejs.org/)

**http-server**.

More detailed about this package [http-server](https://www.npmjs.com/package/http-server)

# 2. Basic project structure

## Assets

All assets are located in _"assets"_ folder in project's root. It contain all types of assets - images, spritesheet, json..etc.

## Code

All the code is located in **./src** folder of project.

-   Assets are loaded inside preloader.js
-   Game starts at entry.js --> game.js which is game manager, manages scenes and game in general. game.js also decides the starting screen, in this game starting scene is main.js

**./scenes/** - folder contains code for different game scenes used by different game stages - main scene and bonus scene

## Responsiveness

The game should work fine on 1920x1080 resolution. I didn't add responsive features. We can discuss it in call, also I will list some general steps to aproach it:

-   Inside utils we create function called getScale, we send it 4 params: current client width and height, original resolution width and height which are 1920x1080. We make 2 variables, first divide new height over height and secondly divide new width over width. Return the variable which gives a smaller value.
-   Add resize event inside game.js. It will trigger a function and call the resize method in each of the existing scenes, so each existing scene has a resize method which is called when resize event trigger in game.js
-   Inside the scenes' resize method, use the getScale method to get newscale. Set the scale of all current objects to the newscale.
-   Now for positioning, there are more than one method, but I prefer to make one fixed object in the canvas with respect to client width and height by using percentage of width or height, and all other objects are positioned with respect to this fixed object. all the existing x and y values should be a product of newscale for example: new pos x = original pos x * newscale
