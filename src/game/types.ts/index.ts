import { BodyType } from "matter";

export interface MatterCollideEvent {
    bodyA: BodyType
    bodyB: BodyType
    id: string
}