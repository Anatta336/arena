import DroneInput from "./droneInput";
import DroneState from "./droneState";
import { applyThrust, applyTurning, applyVelocity, limitSpeed } from "./dronePhysics";
import { v4 as uuid } from 'uuid';
import { createSvg } from "./droneDisplay";
import { Vec2, vec2 } from "wgpu-matrix";

export default class Drone {
    id: string;
    currentState: DroneState;
    svg: SVGElement

    constructor(position: Vec2, facing: number) {
        this.id = uuid();
        this.currentState = new DroneState(this.id, position, facing);
        this.svg = createSvg();
    }

    /**
     * Apply input to this drone's current state, replacing the existing state.
     * @param dt Delta time in seconds.
     */
    updateFromInput(input: DroneInput, dt: number): Drone {

        let newFacing = applyTurning(this.currentState.facing, input.turn, dt);
        let newVelocity = applyThrust(this.currentState.velocity, newFacing, input.forward, dt);
        // newVelocity = limitSpeed(newVelocity);
        let newPosition = applyVelocity(this.currentState.position, newVelocity, dt);

        this.currentState = new DroneState(
            this.id,
            newPosition,
            newFacing,
            newVelocity,
        );

        return this;
    }
}