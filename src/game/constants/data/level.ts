const map = [] as number[][]

const width = 32
const height = 18

for(let i = 0; i < height; i++) {
    const line = []

    for (let j = 0; j < width; j++) {
        line.push(0)
    }
    map.push(line)
}

const objects = {
    
}

export const LEVEL = {
    MAP: map,
    OBJECTS: objects
}