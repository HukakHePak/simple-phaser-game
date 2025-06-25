import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { CONFIG } from '../configs';
import { StarsData } from '../constants/data/stars';

let player = {} as Phaser.Physics.Matter.Sprite;
let cursors = {} as Phaser.Types.Input.Keyboard.CursorKeys;
let stars = new Array<Phaser.Physics.Matter.Image>();
let sensor = {} as MatterJS.BodyType;
let keyX = {} as Phaser.Input.Keyboard.Key
let text = {} as Phaser.GameObjects.Text
let textX = {} as Phaser.GameObjects.Text

const VELOCITY = 2

const FRAME_RATE = 10

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.setPath('assets');

        // this.load.image('player', 'Robot Warfare/Robots/Scarab.png')

        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude',
            'dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.matter.set60Hz()

        /** add background */

        this.add.image(400, 300, 'sky');

        /** init player */

        player = this.matter.add.sprite(100, 450, 'dude', undefined, CONFIG.PLAYER)
        player.setFixedRotation()
        player.setCircle(25)

        /** player sensor */

        sensor = this.matter.add.circle(100, 450, 100, { isSensor: true })

        /** sensor collision with text display */

        sensor.onCollideCallback = (pair) => {
            console.log(pair)

            text.setText(pair.bodyB.gameObject?.data.values.text)
        }

        sensor.onCollideEndCallback = () => text.setText('')


        /** player text */

        text = this.make.text({
            x: 400,
            y: 100,
            text: '',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 25px Arial',
                // fill: 'white',
                wordWrap: { width: 300 }
            },
            // origin: {x: 0.5, y: 0.5},
        });

        /** keyX text */

        textX = this.make.text({
            x: 400,
            y: 100,
            text: '',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 25px Arial',
                // fill: 'white',
                wordWrap: { width: 300 }
            },
            // origin: {x: 0.5, y: 0.5},
        });

        /** player sprite animation */

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: FRAME_RATE
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        /** init keyboard */

        cursors = this.input.keyboard.createCursorKeys()

        keyX = this.input.keyboard.addKey('x')

        /** follow camera */

        this.cameras.main.startFollow(player, true, 0.05, 0.05)

        /** camera bounds */

        this.cameras.main.setBounds(0, 0, 800, 600);

        /** add static objects (stars) */

        StarsData.forEach(star => {
            const sprite = this.matter.add.sprite(star.x, star.y, 'star')

            sprite.setCircle(14)
            sprite.setStatic(true)

            sprite.setData({ text: star.text })

            stars.push(sprite)
        })

        /** setup */

        EventBus.emit('current-scene-ready', this);

    }

    update(time: number, delta: number): void {
        /** player movement */

        if (cursors.left.isDown) {
            player.setX(player.x - VELOCITY);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setX(player.x + VELOCITY);

            player.anims.play('right', true);
        }
        else {
            player.anims.play('turn');
        }

        if (cursors.up.isDown) {
            player.setY(player.y - VELOCITY);
        }

        if (cursors.down.isDown) {
            player.setY(player.y + VELOCITY);
        }

        /** move player sensor */

        sensor.position.x = player.x
        sensor.position.y = player.y

        /** move text position */

        text.setX(player.x)
        text.setY(player.y - 30)

        // cursors.

        if (keyX.isDown) {
            textX.setText('Победа!')
        }
    }
}
