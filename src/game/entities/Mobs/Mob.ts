import { Scene } from "phaser";
import { MatterCollideEvent } from "../../types.ts";

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
    radius?: number
    killFrame?: number
    isSensor?: boolean
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
        this.movementDelay = config.movementDelay ?? 1000
        this.startDelay = config.startDelay || 0
        this.maxDuration = config.maxDuration || 2000
        this.radius = config.radius || 8
        this.killFrame = config.killFrame ?? -1
        this.isSensor = config.isSensor || false
    }

    protected game: Scene

    sprite: Phaser.Physics.Matter.Sprite

    x: number

    y: number

    radius: number

    type: string

    frames: { start: number, end: number }

    frameRate: number

    scale: number

    movementDelay: number

    startDelay: number

    maxDuration: number

    private timeout: number | undefined

    killFrame: number

    isSensor: boolean

    protected chain: Phaser.Tweens.TweenChain 

    destroy() {
        this.sprite.destroy()
        clearTimeout(this.timeout)
    }

    create() {
        this.sprite = this.game.matter.add.sprite(this.x, this.y, this.type)

        this.sprite.anims.create({
            key: 'move',
            frames: this.sprite.anims.generateFrameNumbers(this.type, this.frames),
            frameRate: this.frameRate,
            repeat: -1
        });

        this.sprite.anims.play('move', true)

        this.sprite.anims.create({
            key: 'kill',
            frames: [{ key: this.type, frame: this.killFrame }],
            frameRate: this.frameRate,
        })

        this.sprite.setScale(this.scale)

        this.sprite.setSensor(this.isSensor)

        if (this.killFrame > -1) {
            this.sprite.setOnCollide(this.onCollide.bind(this))
        }

        this.sprite.setData(this)

        this.chain = this.movement()

        this.chain.pause()

        this.timeout = setTimeout(() => {
            this.chain.resume()
        }, this.startDelay)
    }

    kill() {
        this.sprite.anims.play('kill', true)

        this.chain.stop()

        this.game.tweens.add({
            targets: this.sprite,
            alpha: 0,
            ease: 'Linear',
            duration: 1000,
            delay: 5000,
            onComplete: () => {
                this.destroy()
            }
        })
    }

    onCollide(event: MatterCollideEvent) {
        if (event.bodyB.gameObject?.data?.values.type === 'player') {
            this.kill()
        }
    }

    movement() {
        return this.game.tweens.chain({
            tweens: [
                {
                    targets: this.sprite,
                    x: this.x + 50,
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