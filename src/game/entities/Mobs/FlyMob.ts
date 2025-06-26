import { Scene } from "phaser";
import { Mob, MobConfig } from "./Mob";


export class FlyMob extends Mob {
    constructor(game: Scene, config: MobConfig) {
        super(game, config)

        console.log(this.maxDuration)
    }

    movement() {
        return this.game.tweens.chain({
            tweens: [
                {
                    targets: this.sprite,
                    x: this.x + 50,
                    y: this.y + 25,
                    ease: 'Linear',
                    duration: this.maxDuration,
                    delay: this.movementDelay,
                    onStart: () => {
                        this.sprite.setFlipX(false)
                    }
                },
                {
                    targets: this.sprite,
                    x: this.x - 50,
                    ease: 'Linear',
                    duration: this.maxDuration * 0.8,
                    delay: this.movementDelay,
                    onStart: () => {
                        this.sprite.setFlipX(true)
                    }
                },
                {
                    targets: this.sprite,
                    x: this.x + 50,
                    y: this.y - 25,
                    ease: 'Linear',
                    duration: this.maxDuration,
                    delay: this.movementDelay,
                    onStart: () => {
                        this.sprite.setFlipX(false)
                    }
                },
                {
                    targets: this.sprite,
                    x: this.x - 50,
                    ease: 'Linear',
                    duration: this.maxDuration * 0.8,
                    delay: this.movementDelay,
                    onStart: () => {
                        this.sprite.setFlipX(true)
                    }
                },
            ],
            loop: -1
        })
    }
}