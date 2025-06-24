import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { CONFIG } from '../configs';

let player = {} as Phaser.Physics.Matter.Sprite;
let cursors = {} as Phaser.Types.Input.Keyboard.CursorKeys;

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

        this.add.image(400, 300, 'sky');
        
        player = this.matter.add.sprite(100, 450, 'dude', undefined, CONFIG.PLAYER)
        player.setFixedRotation()
        
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
        
        cursors = this.input.keyboard.createCursorKeys()
        
        this.cameras.main.startFollow(player, true, 0.05, 0.05)

        EventBus.emit('current-scene-ready', this);

    }

    update(time: number, delta: number): void {
        if (cursors.left.isDown) {
            player.setX(player.x - VELOCITY);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setX(player.x + VELOCITY);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown) {
            player.setY(player.y - VELOCITY);
        }

        if (cursors.down.isDown) {
            player.setY(player.y + VELOCITY);
        }
    }
}
