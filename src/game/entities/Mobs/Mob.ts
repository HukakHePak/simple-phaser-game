import { Scene } from "phaser";

export interface MobConfig {
    x: number
    y: number
    type: string
    frames: { start: number, end: number }
    frameRate?: number
    scale?: number
    movementDelay?: number
    startDelay?: number
    maxDuration?: number
}

export class Mob {
    constructor(game: Scene, config: MobConfig) {
        this.game = game

        this.x = config.x
        this.y = config.y
        this.type = config.type
        this.frames = config.frames
        this.frameRate = config.frameRate || 8
        this.scale = config.scale || 1
        this.movementDelay = config.movementDelay || 1000
        this.startDelay = config.startDelay || 0
        this.maxDuration = config.maxDuration || 2000

        this.create()
    }

    protected game: Scene

    sprite: Phaser.GameObjects.Sprite

    x: number

    y: number

    type: string

    frames: { start: number, end: number }

    frameRate: number

    scale: number

    movementDelay: number

    startDelay: number

    maxDuration: number

    private timeout: number | undefined

    destroy() {
        this.sprite.destroy()
        clearTimeout(this.timeout)
    }

    create() {
        this.sprite = this.game.add.sprite(this.x, this.y, this.type)

        this.sprite.anims.create({
            key: 'move',
            frames: this.sprite.anims.generateFrameNumbers(this.type, this.frames),
            frameRate: this.frameRate,
            repeat: -1
        });

        this.sprite.anims.play('move', true)

        this.sprite.setScale(this.scale)

        const chain = this.movement()

        chain.pause()

        this.timeout = setTimeout(() => {
            chain.resume()
        }, this.startDelay)
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