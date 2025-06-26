import { MobConfig } from "../../entities/Mobs/Mob"

const map = [] as number[][]

const width = 32
const height = 18

for (let i = 0; i < height; i++) {
    const line = []

    for (let j = 0; j < width; j++) {
        line.push(0)
    }
    map.push(line)
}

export const OBJECT_TYPE = {
    CAR: 'car',
    ROCK: 'rock',
    LAMP: 'lamp',
    GLASS: 'glass',
    OTHER: 'other'
}

export const MAP_SCALE = 1.2

export const OBJECT_GTID_GAP = 32

const objects = [
    {
        type: OBJECT_TYPE.GLASS,
        source: 'mapobjects16',
        radius: 8,
        scale: 1,
        tiles: [86, 87, 88],
        count: 100,
        text: 'Hmm, the glass',
        isSensor: true,
    },
    {
        type: OBJECT_TYPE.OTHER,
        source: 'mapobjects16',
        radius: 8,
        scale: 1,
        tiles: [80, 81, 82, 83, 84, 85],
        count: 60,
        text: 'Awesome...',
        isSensor: true,
    },
    {
        type: OBJECT_TYPE.ROCK,
        source: 'mapobjects16',
        radius: 8,
        scale: 1,
        tiles: [64, 65, 66],
        count: 60,
        text: 'Hmm, the rock',
        isSensor: false,
    },
    {
        type: OBJECT_TYPE.LAMP,
        source: 'mapobjects16',
        radius: 8,
        scale: 1,
        tiles: [16, 17],
        count: 20,
        text: 'Hmm, the lamp',
        isSensor: true,
    },
    {
        type: OBJECT_TYPE.CAR,
        source: 'mapobjects32',
        radius: 12,
        scale: 1,
        tiles: [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 50, 51, 54, 55],
        count: 20,
        text: 'Scanning the car...',
        isSensor: false,
    },
]

export const MOB_TYPE = {
    HORNET: 'hornet',
    SCARAB: 'scarab',
    SOLDIER: 'soldier'
}
const mobs = {
    HORNET: {
        type: MOB_TYPE.HORNET,
        frames: { start: 0, end: 7 },
        maxDuration: 2500,
        // radius: 8,
        // scale: 1.4
    },
    SCARAB: {
        type: MOB_TYPE.SCARAB,
        frames: { start: 0, end: 1 },
        maxDuration: 2500,
        // radius: 8,
        // scale: 1.4
    },
    SOLDIER: {
        type: MOB_TYPE.SOLDIER,
        frames: { start: 0, end: 1 },
        maxDuration: 2500,
        scale: 1.2,
        // radius: 8,
    }
}

export const LEVEL = {
    MAP: map,
    OBJECTS: objects,
    MOBS: mobs
}