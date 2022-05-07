import Game from './game.js';

export default class Preloader {
    constructor(app) {
        this.app = app;
        this.loadAssets();
    }
    //#####################################################################################################################################
    loadAssets() {
        const loader = this.app.loader;
        loader.baseUrl = 'assets';
        loader.add('chest-open', 'chests/chest-open.png');
        loader.add('chest-closed', 'chests/chest-closed.png');
        loader.add('chest-coin', 'chests/chest-coin.png');
        loader.add('chest-gem', 'chests/chest-gem.png');
        loader.add('bonus-win', 'bonus-win.png');
        loader.add('play-button-disabled', 'play-button-disabled.png');
        loader.add('play-button-enabled', 'play-button-enabled.png');
        loader.add('firework-purple', 'anims/firework-purple.json');
        loader.add('firework-green', 'anims/firework-green.json');
        loader.add('firework-yellow', 'anims/firework-yellow.json');
        loader.add('smoke-effect', 'anims/smoke-effect.json');
        loader.onComplete.add(this.loadComplete.bind(this)); // could also use arrow function instead of bind
        loader.load();
    }
    //#####################################################################################################################################
    loadComplete() {
        new Game(this.app);
    }
}
