import { Math, Scene } from "phaser";
import { LEVEL, MAP_SCALE, OBJECT_GTID_GAP } from "../../constants/data/level";
import { getRandomMapCoordinates } from "../../helpers";

export class MapFactory {
    constructor(scene: Scene) {
        this.game = scene
    }

    game: Scene

    map: Phaser.Tilemaps.Tilemap

    create() {
        this.game.matter.set60Hz()

        /** add background */

        this.map = this.game.make.tilemap({ data: LEVEL.MAP, tileWidth: 128, tileHeight: 128 })

        const tiles = this.map.addTilesetImage('grassmap')
        const layer = this.map.createLayer(0, tiles, 0, 0)

        /** add map objects */

        const width = this.game.scale.width * MAP_SCALE
        const height = this.game.scale.height * MAP_SCALE

        /** world bounds */

        this.game.matter.world.setBounds(0, 0, width, height)

        /** camera bounds */

        this.game.cameras.main.setBounds(0, 0, width, height);

        LEVEL.OBJECTS.forEach(object => {
            for (let i = 0; i < object.count; i++) {
                const { x, y } = getRandomMapCoordinates(this.game, OBJECT_GTID_GAP)

                const sprite = this.game.matter.add.sprite(x, y, object.source, object.tiles[Math.Between(0, object.tiles.length - 1)])

                if (object.radius) {
                    sprite.setCircle(object.radius)
                }

                sprite.setScale(object.scale)
                sprite.setStatic(true)
                sprite.setSensor(object.isSensor)

                sprite.setData({ text: object.text })
            }

        })

        return this.map
    }

    follow(entity: Phaser.GameObjects.GameObject) {
        /** follow camera */

        this.game.cameras.main.startFollow(entity, true, 0.05, 0.05)
    }
}