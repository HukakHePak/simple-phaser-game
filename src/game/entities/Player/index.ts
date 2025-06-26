import { Scene } from "phaser";
import { CONFIG } from "../../configs";
import { MatterCollideEvent } from "../../types.ts";
import { lang } from "../../lang/en.ts";
import { getRandomMapCoordinates } from "../../helpers/index.ts";
import { LEVEL, MAP_SCALE } from "../../constants/data/level.ts";
import { BodyType } from "matter";

const VELOCITY = 2

const FRAME_RATE = 32

interface PlayerConfig {
    name: string
}

export class PlayerFactory {
    constructor(scene: Scene, config: PlayerConfig) {
        this.game = scene

        this.name = config.name
        this.type = config.name
    }

    game: Scene

    sprite: Phaser.Physics.Matter.Sprite

    sensor: MatterJS.BodyType

    radar: Phaser.GameObjects.Arc

    name: string

    type: string

    headText: Phaser.GameObjects.Text

    finalText: Phaser.GameObjects.Text

    keyX?: Phaser.Input.Keyboard.Key

    cursors?: Phaser.Types.Input.Keyboard.CursorKeys

    collisedValues = new Map<string, { [key: string]: any }>()

    create() {
        this.sprite = this.game.matter.add.sprite(this.game.scale.width * MAP_SCALE / 2, this.game.scale.height * MAP_SCALE / 2, this.name, undefined, CONFIG.PLAYER)
        this.sprite.setFixedRotation()
        this.sprite.setCircle(12)
        this.sprite.setScale(1.4)

        this.sprite.setData(this)

        this.initSensor()


        /** player text */

        this.headText = this.game.make.text({
            text: '',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 16px Arial',
                wordWrap: { width: 300 }
            },
        });

        /** keyX text */

        this.finalText = this.game.make.text({
            text: lang.hi,
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 32px Arial',
                wordWrap: { width: 300 }
            },
        });

        /** player sprite animation */

        this.sprite.anims.create({
            key: 'turn down',
            frames: [{ key: this.name, frame: 12 }],
            frameRate: FRAME_RATE
        });

        this.sprite.anims.create({
            key: 'turn up',
            frames: [{ key: this.name, frame: 0 }],
            frameRate: FRAME_RATE
        });

        this.sprite.anims.create({
            key: 'left',
            frames: this.sprite.anims.generateFrameNumbers(this.name, { start: 18, end: 23 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        this.sprite.anims.create({
            key: 'right',
            frames: this.sprite.anims.generateFrameNumbers(this.name, { start: 6, end: 11 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        this.sprite.anims.create({
            key: 'down',
            frames: this.sprite.anims.generateFrameNumbers(this.name, { start: 0, end: 5 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        this.sprite.anims.create({
            key: 'up',
            frames: this.sprite.anims.generateFrameNumbers(this.name, { start: 12, end: 17 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        this.initRadar()

        this.initKeyboard()

        return this.sprite
    }

    initSensor() {
        /** player sensor */

        this.sensor = this.game.matter.add.circle(this.sprite.x, this.sprite.y, 60, { isSensor: true })

        /** sensor collision with text display */

        this.sensor.onCollideCallback = (event: MatterCollideEvent) => {
            const values = event.bodyA.gameObject?.data?.values

            if (values) {
                this.collisedValues.set(event.id, values)
                this.updateText()
            }
        }

        this.sensor.onCollideEndCallback = (event: MatterCollideEvent) => {
            this.collisedValues.delete(event.id)
            this.updateText()
        }
    }

    initRadar() {
        const { x, y } = this.sprite

        this.radar = this.game.add.circle(x, y, 10)
        this.radar.setStrokeStyle(2, 0xFFFFFF, 0.1)

        this.game.tweens.add({
            targets: this.radar,
            radius: 60,
            ease: 'Linear',
            duration: 1000,
            repeat: -1,
            alpha: 0
        })
    }

    updateText() {
        const values = Array.from(this.collisedValues.values())

        const types = values.map(item => lang[item.type])

        const uniqTypes = [...new Set(types).values()].join(', ')

        if (types.length) {
            this.headText.setText(`${lang.scanning} ${uniqTypes}`)
        } else {
            this.headText.setText('')
        }
    }

    initKeyboard() {
        /** init keyboard */

        this.cursors = this.game.input.keyboard?.createCursorKeys()

        this.keyX = this.game.input.keyboard?.addKey('x')
    }

    update() {
        /** player movement */

        this.movePlayer()

        /** move player sensor */

        const { x, y } = this.sprite

        this.sensor.position.x = x
        this.sensor.position.y = y
        this.radar.x = x
        this.radar.y = y

        /** move text position */

        this.headText.setX(x)
        this.headText.setY(y - 30)

        this.finalText.setX(x)
        this.finalText.setY(y - 100)

        if (this.keyX?.isDown) {
            this.finalText.setText(lang.scanEnd)
        }
    }

    hideInitText() {
        this.finalText.setText('')
    }

    movePlayer() {
        if (!this.cursors) {
            return
        }

        const { x, y } = this.sprite

        if (this.cursors.left.isDown) {
            this.sprite.setX(x - VELOCITY);
            this.sprite.anims.play('left', true);
            this.hideInitText()

            return
        }

        if (this.cursors.right.isDown) {
            this.sprite.setX(x + VELOCITY);
            this.sprite.anims.play('right', true);
            this.hideInitText()

            return
        }

        if (this.cursors.up.isDown) {
            this.sprite.setY(y - VELOCITY);
            this.sprite.anims.play('up', true);
            this.hideInitText()

            return
        }

        if (this.cursors.down.isDown) {
            this.sprite.setY(y + VELOCITY);
            this.sprite.anims.play('down', true);
            this.hideInitText()

            return
        }

        this.sprite.anims.stop()
    }
}