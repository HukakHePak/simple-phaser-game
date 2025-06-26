import { Math, Scene } from "phaser";
import { Mob, MobConfig } from "../Mobs/Mob";
import { getRandomMapCoordinates } from "../../helpers";
import { MOB_TYPE } from "../../constants/data/level";
import { FlyMob } from "../Mobs";

const Mobs = {
    [MOB_TYPE.HORNET]: FlyMob
}

export class MobFactory {
    constructor(scene: Scene) {
        this.game = scene
    }

    private game: Scene

    createMobs(config: MobConfig, count: number) {
        const mobs = [] as Mob[]

        for (let i = 0; i < count; i++) {
            const mob = new (Mobs[config.type])(this.game, { ...config, ...getRandomMapCoordinates(this.game), startDelay: Math.Between(0, 3000) })

            mob.create()

            mobs.push(mob)
        }

        return mobs
    }
}