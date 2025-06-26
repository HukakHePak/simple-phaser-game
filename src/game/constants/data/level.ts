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

const OBJECT_COUNT = 10

const objects = [
    {
        type: OBJECT_TYPE.CAR,
        source: 'mapobjects32',
        radius: 16,
        scale: 1,
        tiles: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 50, 51, 54, 55],
        count: OBJECT_COUNT,
        text: 'Hmm, the car'
    },
    {
        type: OBJECT_TYPE.ROCK,
        source: 'mapobjects16',
        radius: 16,
        scale: 1,
        tiles: [64, 65, 66],
        count: OBJECT_COUNT,
        text: 'Hmm, the rock'
    },
    {
        type: OBJECT_TYPE.GLASS,
        source: 'mapobjects16',
        radius: 16,
        scale: 1,
        tiles: [86, 87, 88],
        count: OBJECT_COUNT,
        text: 'Hmm, the glass'
    },
    {
        type: OBJECT_TYPE.OTHER,
        source: 'mapobjects16',
        radius: 16,
        scale: 1,
        tiles: [80, 81, 82, 83, 84, 85],
        count: OBJECT_COUNT,
        text: 'Awesome...'
    },
    {
        type: OBJECT_TYPE.LAMP,
        source: 'mapobjects16',
        radius: 16,
        scale: 1,
        tiles: [16, 17],
        count: OBJECT_COUNT,
        text: 'Hmm, the lamp'
    },
]

export const LEVEL = {
    MAP: map,
    OBJECTS: objects
}