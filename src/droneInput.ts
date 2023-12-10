import { clamp } from "./mathsHelpers";

/**
 * Immutable state of input to a drone.
 */
export default class DroneInput {
    readonly turn: number;
    readonly forward: number;
    readonly shoot: boolean;

    constructor(turn: number, forward: number, shoot: boolean) {
        this.turn = clamp(turn, -1, +1);
        this.forward = clamp(forward, -1, +1);
        this.shoot = shoot;
    }
}