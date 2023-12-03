import { clamp } from "./mathsHelpers";

export default class BrainOutput {
    turn: number;
    forward: number;
    shoot: boolean;

    constructor(turn: number, forward: number, shoot: boolean) {
        this.turn = clamp(turn, -1, +1);
        this.forward = clamp(forward, -1, +1);
        this.shoot = shoot;
    }
}