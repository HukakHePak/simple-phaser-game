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

export enum OBJECT_TYPE {
    CAR,
    ROCK,
    LAMP,
    GLASS,
    OTHER
}


const objects = [
    {
        type: OBJECT_TYPE.CAR,
        source: 'mapobjects32',
        radius: 12,
        scale: 1,
        tiles: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 50, 51, 54, 55],
        count: 40,
        text: 'Scanning the car...',
        isSensor: false,
    },
    {
        type: OBJECT_TYPE.ROCK,
        source: 'mapobjects16',
        radius: 8,
        scale: 1,
        tiles: [64, 65, 66],
        count: 100,
        text: 'Hmm, the rock',
        isSensor: false,
    },
    {
        type: OBJECT_TYPE.GLASS,
        source: 'mapobjects16',
        radius: 8,
        scale: 1,
        tiles: [86, 87, 88],
        count: 200,
        text: 'Hmm, the glass',
        isSensor: true,
    },
    {
        type: OBJECT_TYPE.OTHER,
        source: 'mapobjects16',
        radius: 8,
        scale: 1,
        tiles: [80, 81, 82, 83, 84, 85],
        count: 100,
        text: 'Awesome...',
        isSensor: true,
    },
    {
        type: OBJECT_TYPE.LAMP,
        source: 'mapobjects16',
        radius: 8,
        scale: 1,
        tiles: [16, 17],
        count: 50,
        text: 'Hmm, the lamp',
        isSensor: true,
    },
]

export const LEVEL = {
    MAP: map,
    OBJECTS: objects
}