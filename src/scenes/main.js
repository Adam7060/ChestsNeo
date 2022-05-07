import { addText, addSprite } from '../utils.js';
import Bonus from './bonus.js';

export default class Main {
    constructor(game) {
        this.game = game;

        this.sceneContainer = new PIXI.Container();
        this.game.stage.addChild(this.sceneContainer);

        this.anims = new PIXI.Container();
        this.chests = new PIXI.Container();
        this.playBtn = null;

        this.isBonus = false;

        this.create();
    }
    //#####################################################################################################################################
    create() {
        this.createTitle();
        this.createChests();
        this.createPlayButton();
        this.createAnims();
    }

    createAnims() {
        this.purpleAnim = new PIXI.AnimatedSprite(this.game.loader.resources['firework-purple'].spritesheet.animations['firework-purple']);
        this.purpleAnim.animationSpeed = 0.167;
        this.purpleAnim.offset = {
            x: -230,
            y: -180,
        };

        this.greenAnim = new PIXI.AnimatedSprite(this.game.loader.resources['firework-green'].spritesheet.animations['firework-green']);
        this.greenAnim.animationSpeed = 0.167;
        this.greenAnim.offset = {
            x: -230,
            y: -180,
        };

        this.smokeAnim = new PIXI.AnimatedSprite(this.game.loader.resources['smoke-effect'].spritesheet.animations['smoke-effect']);
        this.smokeAnim.animationSpeed = 0.08;
        this.smokeAnim.offset = {
            x: 0,
            y: 0,
        };

        this.anims.addChild(this.purpleAnim, this.greenAnim, this.smokeAnim);
        this.anims.children.map((anim) => {
            anim.visible = false;
            anim.loop = false;
            anim.onComplete = () => {
                anim.visible = false;
                if (this.isBonus) {
                    this.isBonus = false;
                    this.game.transitionToScene(this.sceneContainer, this.game.showBonus);
                } else {
                    this.checkChests();
                }
            };
        });
        this.sceneContainer.addChild(this.anims);
    }

    createTitle() {
        const title = addText(this.game.renderer.width / 2, 50, 'Main Game Screen');
        this.sceneContainer.addChild(title);
    }

    createChests() {
        for (let i = 0; i < 6; i++) {
            let x = 480 + 500 * (i % 3);
            let y = i > 2 ? 675 : 350;

            const chest = addSprite(x, y, 'chest-closed');
            chest.closed = true;
            chest.tween = null;
            chest.interactive = false;
            chest.on('pointerdown', this.onChestClick.bind(this, chest));

            this.chests.addChild(chest);
        }
        this.sceneContainer.addChild(this.chests);
    }

    createPlayButton() {
        this.playBtn = addSprite(this.game.renderer.width / 2, 950, 'play-button-enabled');
        this.playBtn.interactive = true;
        this.playBtn.on('pointerdown', this.startGame.bind(this));
        this.sceneContainer.addChild(this.playBtn);
    }

    startGame() {
        this.playBtn.texture = PIXI.Texture.from('play-button-disabled');
        this.playBtn.interactive = false;
        this.chests.children.map((chest) => {
            if (chest.closed) {
                chest.interactive = true;

                // hover to indicate they are active
                chest.tween = gsap.to(chest, {
                    y: chest.y + 5,
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'linear',
                });
            }
        });
    }

    onChestClick(targetObj) {
        this.chests.children.map((chest) => {
            chest.interactive = false;
            if (chest.tween) chest.tween.kill();
            chest.tween = null;
        });
        targetObj.closed = false;
        const isWin = Math.random() * 100 > 50;
        if (isWin) {
            const isBonus = Math.random() > 0.5;
            if (isBonus) {
                this.isBonus = true;
                targetObj.texture = PIXI.Texture.from('chest-gem');
                this.playAnim(this.purpleAnim, targetObj);
            } else {
                targetObj.texture = PIXI.Texture.from('chest-coin');
                this.playAnim(this.greenAnim, targetObj);
            }
        } else {
            targetObj.texture = PIXI.Texture.from('chest-open');
            this.playAnim(this.smokeAnim, targetObj);
        }
    }

    playAnim(anim, targetObj) {
        anim.position.set(targetObj.x - targetObj.width / 2 + anim.offset.x, targetObj.y - targetObj.height / 2 + anim.offset.y);
        anim.visible = true;
        anim.gotoAndPlay(0);
    }

    checkChests() {
        const isAvailableChest = this.chests.children.some((chest) => chest.closed);

        if (isAvailableChest) {
            this.startGame();
        } else {
            this.chests.children.map((chest) => {
                chest.texture = PIXI.Texture.from('chest-closed');
                chest.closed = true;
                chest.tween = null;
                chest.interactive = false;
            });
            this.playBtn.texture = PIXI.Texture.from('play-button-enabled');
            this.playBtn.interactive = true;
        }
    }

    show() {
        this.sceneContainer.alpha = 1;
        this.sceneContainer.visible = true;
        this.checkChests();
    }
}
