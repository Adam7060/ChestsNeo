import Main from './scenes/main.js';
import Bonus from './scenes/bonus.js';

export default class Game {
    constructor(app) {
        this.stage = app.stage;
        this.loader = app.loader;
        this.renderer = app.renderer;

        this.main = null;
        this.bonus = null;

        this.create();
    }
    //#####################################################################################################################################
    create() {
        this.main = new Main(this);
        this.bonus = new Bonus(this);
    }

    showBonus() {
        this.bonus.show();
    }

    showMain() {
        this.main.show();
    }

    transitionToScene(current, target) {
        gsap.to(current, {
            alpha: 0,
            duration: 2,
            onComplete: () => {
                current.visible = false;
                target.call(this);
            },
        });
    }
}
