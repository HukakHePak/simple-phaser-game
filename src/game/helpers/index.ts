import { Math, Scene } from "phaser"
import { MAP_SCALE } from "../constants/data/level"

export const getRandomMapCoordinates = (scene: Scene, gap?: number) => {
    const { width, height } = scene.scale

    if(gap) {
        const x = Math.RoundTo(Math.Between(0, width * MAP_SCALE) / gap, 0) * gap
        const y = Math.RoundTo(Math.Between(0, height * MAP_SCALE) / gap, 0) * gap
    
        return { x, y }
    }
    
    const x = Math.Between(0, width)
    const y = Math.Between(0, height)

    return { x, y }
}