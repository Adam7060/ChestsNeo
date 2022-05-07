import { addText, addSprite } from '../utils.js';

export default class Bonus {
    constructor(game) {
        this.game = game;

        this.sceneContainer = new PIXI.Container();
        this.sceneContainer.visible = false;
        this.game.stage.addChild(this.sceneContainer);

        this.firework = null;
        this.scoreText = null;

        this.create();
    }
    //#####################################################################################################################################
    create() {
        const title = addText(this.game.renderer.width / 2, 50, 'Bonus Screen');
        this.sceneContainer.addChild(title);

        const winImage = addSprite(this.game.renderer.width / 2, 400, 'bonus-win');

        const scoreText = addText(this.game.renderer.width / 2, 800, 'Win Amount: 0$');

        const firework = new PIXI.AnimatedSprite(this.game.loader.resources['firework-yellow'].spritesheet.animations['firework-yellow']);
        firework.animationSpeed = 0.167;
        let repeat = 0;
        firework.position.set(500, 200);

        firework.onLoop = () => {
            let x = 300 + Math.random() * (this.game.renderer.width - 600);
            let y = 200 + Math.random() * (this.game.renderer.height - 400);
            firework.position.set(x, y);
            if (repeat++ == 3) {
                firework.stop();
                firework.visible = false;
                this.game.transitionToScene(this.sceneContainer, this.game.showMain);
            }
        };

        this.firework = firework;
        this.scoreText = scoreText;
        this.sceneContainer.addChild(winImage, scoreText, firework);
    }

    show() {
        this.sceneContainer.alpha = 1;
        this.sceneContainer.visible = true;
        this.firework.play();
        this.showScore();
    }

    showScore() {
        const obj = {
            score: 0,
        };
        gsap.to(obj, {
            score: 1000,
            duration: 2,
            onUpdate: () => {
                this.scoreText.text = `Win Amount ${obj.score.toFixed(0)}$`;
            },
        });
    }
}
