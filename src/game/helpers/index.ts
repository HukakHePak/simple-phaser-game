import { Math, Scene } from "phaser"

export const getRandomMapCoordinates = (scene: Scene, gap?: number) => {
    const { width, height } = scene.scale

    console.log(width, height)

    if(gap) {
        const x = Math.RoundTo(Math.Between(0, width) / gap, 0) * gap
        const y = Math.RoundTo(Math.Between(0, height) / gap, 0) * gap
    
        return { x, y }
    }
    
    const x = Math.Between(0, width)
    const y = Math.Between(0, height)

    return { x, y }
}