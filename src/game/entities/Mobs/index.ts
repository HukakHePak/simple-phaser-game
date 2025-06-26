import { Scene } from "phaser";

export class Mob {
    constructor(game: Scene) {
        this.game = game

        this.scale = 1.4
        this.movementDelay = 2000
        this.startDelay = 500
        this.position = { x: 600, y: 600 }
        this.maxDuration = 2500
    }

    private game: Scene

    sprite: Phaser.GameObjects.Sprite

    position: {
        x: number,
        y: number
    }

    name: string

    scale: number

    movementDelay: number

    startDelay: number

    maxDuration: number

    preload() {
        this.game.load.spritesheet('wasp', 'map/Robots/Hornet.png', { frameWidth: 24, frameHeight: 24 })
    }

    create() {
        this.sprite = this.game.add.sprite(this.position.x, this.position.y, 'wasp')

        this.game.anims.create({
            key: 'move',
            frames: this.game.anims.generateFrameNumbers('wasp', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1
        });


        this.sprite.anims.play('move', true)
        
        this.sprite.setScale(this.scale) 

        this.movement()
    }

    update() {
    }

    movement() {
        const chain = this.game.tweens.chain({
            tweens: [
                {
                    targets: this.sprite,
                    x: this.position.x + 50,
                    y: this.position.y + 25,
                    ease: 'Linear',
                    duration: this.maxDuration,
                    delay: this.movementDelay,
                    onStart: () => {
                        this.sprite.setFlipX(false)
                    }
                },
                {
                    targets: this.sprite,
                    x: this.position.x - 50,
                    ease: 'Linear',
                    duration: this.maxDuration * 0.8,
                    delay: this.movementDelay,
                    onStart: () => {
                        this.sprite.setFlipX(true)
                    }
                },
                {
                    targets: this.sprite,
                    x: this.position.x + 50,
                    y: this.position.y - 25,
                    ease: 'Linear',
                    duration: this.maxDuration,
                    delay: this.movementDelay,
                    onStart: () => {
                        this.sprite.setFlipX(false)
                    }
                },
                {
                    targets: this.sprite,
                    x: this.position.x - 50,
                    ease: 'Linear',
                    duration: this.maxDuration * 0.8,
                    delay: this.movementDelay,
                    onStart: () => {
                        this.sprite.setFlipX(true)
                    } 
                },
            ],
            loop: -1
        }).pause()

        const timeout = setTimeout(() => {
            chain.resume()
        }, this.startDelay)
    }
}