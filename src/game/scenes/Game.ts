import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { CONFIG } from '../configs';
import { StarsData } from '../constants/data/stars';
import { LEVEL } from '../constants/data/level';

let player = {} as Phaser.Physics.Matter.Sprite;
let cursors = {} as Phaser.Types.Input.Keyboard.CursorKeys;
let stars = new Array<Phaser.Physics.Matter.Image>();
let sensor = {} as MatterJS.BodyType;
let keyX = {} as Phaser.Input.Keyboard.Key
let text = {} as Phaser.GameObjects.Text
let textX = {} as Phaser.GameObjects.Text
let map = {} as Phaser.Tilemaps.Tilemap

const VELOCITY = 2

const FRAME_RATE = 32

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.setPath('assets');

        // this.load.image('player', 'Robot Warfare/Robots/Scarab.png')

        this.load.image('grassmap', 'map/grass blue.jpg');
        this.load.image('star', 'star.png');

        this.load.spritesheet('player',
            'robot/robot_blue.png',
            { frameWidth: 32, frameHeight: 32 }
        );
    }

    create() {
        this.matter.set60Hz()

        /** add background */

        map = this.make.tilemap({ data: LEVEL.MAP, tileWidth: 128, tileHeight: 128 })

        const tiles = map.addTilesetImage('grassmap')
        const layer = map.createLayer(0, tiles, 0, 0)

        /** init player */

        player = this.matter.add.sprite(this.scale.width * 1.2 / 2, this.scale.height * 1.2 / 2, 'player', undefined, CONFIG.PLAYER)
        player.setFixedRotation()
        player.setCircle(14)
        player.setScale(1.4)
        // player.setScale(5)

        /** player sensor */

        sensor = this.matter.add.circle(player.x, player.y, 100, { isSensor: true })

        /** sensor collision with text display */

        sensor.onCollideCallback = (pair) => {
            console.log(pair)

            text.setText(pair.bodyB.gameObject?.data.values.text)
        }

        sensor.onCollideEndCallback = () => text.setText('')


        /** player text */

        text = this.make.text({
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
            x: this.scale.width / 2,
            y: this.scale.height / 2,
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
            key: 'turn down',
            frames: [{ key: 'player', frame: 12 }],
            frameRate: FRAME_RATE
        });

        this.anims.create({
            key: 'turn up',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: FRAME_RATE
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        /** init keyboard */

        cursors = this.input.keyboard.createCursorKeys()

        keyX = this.input.keyboard.addKey('x')

        /** follow camera */

        this.cameras.main.startFollow(player, true, 0.05, 0.05)
        // this.cameras.main.width = 1280
        // this.cameras.main.height = 720
        // this.cameras.main

        /** world bounds */

        const width = this.scale.width * 1.2
        const height = this.scale.height * 1.2

        // this.scale.setZoom(2)

        this.matter.world.setBounds(0, 0, width, height)

        /** camera bounds */

        this.cameras.main.setBounds(0, 0, width, height);

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

    movePlayer() {
        if (cursors.left.isDown) {
            player.setX(player.x - VELOCITY);

            player.anims.play('left', true);
            
            return
        }

        if (cursors.right.isDown) {
            player.setX(player.x + VELOCITY);

            player.anims.play('right', true);

            return
        }

        if (cursors.up.isDown) {
            player.setY(player.y - VELOCITY);

            player.anims.play('up', true);

            return
        }

        if (cursors.down.isDown) {
            player.setY(player.y + VELOCITY);

            player.anims.play('down', true);

            return
        }

        player.anims.stop()
    }

    update(time: number, delta: number): void {
        /** player movement */

        this.movePlayer()

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
