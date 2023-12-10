import { Vec2, vec2 } from "wgpu-matrix";

/**
 * Immutable state for a drone.
 */
export default class DroneState {
    constructor(
        readonly droneId: string,
        readonly position: Vec2,
        readonly facing: number,
        readonly velocity: Vec2 = vec2.create()
    ) {}
}