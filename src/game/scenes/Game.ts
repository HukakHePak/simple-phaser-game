import { Math, Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { CONFIG } from '../configs';
import { LEVEL } from '../constants/data/level';
import { lang } from '../lang/en';

let player = {} as Phaser.Physics.Matter.Sprite;
let cursors = {} as Phaser.Types.Input.Keyboard.CursorKeys;
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

        this.load.image('grassmap', 'map/grass blue.jpg');

        this.load.spritesheet('player',
            'robot/robot_blue.png',
            { frameWidth: 32, frameHeight: 32 }
        );

        this.load.spritesheet('mapobjects16', 'map/objects/obstacles-and-objects.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('mapobjects32', 'map/objects/obstacles-and-objects.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.matter.set60Hz()

        /** add background */

        map = this.make.tilemap({ data: LEVEL.MAP, tileWidth: 128, tileHeight: 128 })

        const tiles = map.addTilesetImage('grassmap')
        const layer = map.createLayer(0, tiles, 0, 0)

        /** add map objects */

        const width = this.scale.width * 1.2
        const height = this.scale.height * 1.2

        LEVEL.OBJECTS.forEach(object => {
            for (let i = 0; i < object.count; i++) {
                // const sprite = this.matter.add.sprite(Math.Between(0, width), Math.Between(0, height), object.source, Math.Between(0, 20))
                // const sprite = this.matter.add.sprite(Math.Between(0, width), Math.Between(0, height), object.source, 17)
                const sprite = this.matter.add.sprite(Math.Between(0, width), Math.Between(0, height), object.source, object.tiles[Math.Between(0, object.tiles.length - 1)])

                if(object.radius) {
                    sprite.setCircle(object.radius)
                }

                sprite.setScale(object.scale)
                sprite.setStatic(true)
                sprite.setSensor(object.isSensor)

                sprite.setData({ text: object.text })
            }

        })

        /** init player */

        player = this.matter.add.sprite(this.scale.width * 1.2 / 2, this.scale.height * 1.2 / 2, 'player', undefined, CONFIG.PLAYER)
        player.setFixedRotation()
        player.setCircle(12)
        player.setScale(1.4)

        /** player sensor */

        sensor = this.matter.add.circle(player.x, player.y, 60, { isSensor: true })

        /** sensor collision with text display */

        sensor.onCollideCallback = (pair) => {
            console.log(pair)

            text.setText(pair.bodyA.gameObject?.data?.values.text)
        }

        sensor.onCollideEndCallback = () => text.setText('')


        /** player text */

        text = this.make.text({
            text: '',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 16px Arial',
                wordWrap: { width: 300 }
            },
        });

        /** keyX text */

        textX = this.make.text({        // make sprite, center camera
            text: '',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 32px Arial',
                wordWrap: { width: 300 }
            },
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
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
            frameRate: FRAME_RATE,
            repeat: -1
        });

        /** init keyboard */

        cursors = this.input.keyboard.createCursorKeys()

        keyX = this.input.keyboard.addKey('x')

        /** follow camera */

        this.cameras.main.startFollow(player, true, 0.05, 0.05)

        /** world bounds */

        // const width = this.scale.width * 1.2
        // const height = this.scale.height * 1.2

        this.matter.world.setBounds(0, 0, width, height)

        /** camera bounds */

        this.cameras.main.setBounds(0, 0, width, height);

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

        textX.setX(player.x)
        textX.setY(player.y - 100)

        // cursors.

        if (keyX.isDown) {
            textX.setText(lang.scanEnd)
        }
    }


}
