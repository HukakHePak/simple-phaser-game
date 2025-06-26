import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { LEVEL, MOB_TYPE } from '../constants/data/level';
import { MobConfig } from '../entities/Mobs/Mob';
import { MobFactory } from '../entities/Factory/MobFactory';
import { MapFactory } from '../entities/Factory/MapFactory.ts';
import { PlayerFactory } from '../entities/Player/index.ts';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    player: PlayerFactory

    preload() {
        this.load.setPath('assets');

        this.load.image('grassmap', 'map/grass blue.jpg');

        this.load.spritesheet('player',
            'robot/robot_blue.png',
            { frameWidth: 32, frameHeight: 32 }
        );

        this.load.spritesheet('mapobjects16', 'map/objects/obstacles-and-objects.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('mapobjects32', 'map/objects/obstacles-and-objects.png', { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet(MOB_TYPE.HORNET, 'map/Robots/Hornet.png', { frameWidth: 24, frameHeight: 24 })
        this.load.spritesheet(MOB_TYPE.SCARAB, 'map/Robots/Scarab.png', { frameWidth: 16, frameHeight: 16 })
        this.load.spritesheet(MOB_TYPE.SOLDIER, 'map/Soldiers/Assault-Class.png', { frameWidth: 16, frameHeight: 16 })
    }

    create() {
        /** create map */

        const map = new MapFactory(this)

        map.create()

        /** create mobs */

        const mobFactory = new MobFactory(this)

        mobFactory.createMobs(LEVEL.MOBS.HORNET as MobConfig, 10)
        mobFactory.createMobs(LEVEL.MOBS.SCARAB as MobConfig, 10)
        mobFactory.createMobs(LEVEL.MOBS.SOLDIER as MobConfig, 10)

        /** init player */

        this.player = new PlayerFactory(this, { name: 'player'})

        this.player.create()

        map.follow(this.player.sprite)        

        /** setup */

        EventBus.emit('current-scene-ready', this);

    }

    update(time: number, delta: number): void {
        this.player.update()
    }
}
