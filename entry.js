import Preloader from './src/preloader.js';

window.onload = function () {
    const app = new PIXI.Application({
        width: 1920,
        height: 1080,
        backgroundColor: 0xffffff,
    });
    document.body.appendChild(app.view);
    new Preloader(app);
};
