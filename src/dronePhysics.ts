import { Vec2, vec2 } from "wgpu-matrix";

/**
 * @param facing Current facing in radians.
 * @param turn Turn in radians per second.
 * @param dt Delta time in seconds.
 * @returns Updated facing in radians.
 */
export function applyTurning(facing: number, turn: number, dt: number): number {
    if (turn == 0) {
        // Nothing to do.
        return facing;
    }

    return facing + turn * dt;
}

/**
 * @param velocity Current velocity.
 * @param facing Current facing in radians.
 * @param forwardThrust Forward thrust in pixels per second per second.
 * @param dt Delta time in seconds.
 * @returns Updated velocity.
 */
export function applyThrust(velocity: Vec2, facing:number,
    forwardThrust: number, dt: number
): Vec2 {
    if (forwardThrust == 0) {
        // Nothing to do.
        return velocity;
    }

    // Calculate thrust vector.
    const thrustVector = vec2.scale(forwardVector(facing), forwardThrust * dt);

    // Apply thrust.
    return vec2.add(velocity, thrustVector);
}

/**
 * @param facing Current facing in radians.
 * @returns Unit vector in the direction of the drone's facing.
 */
export function forwardVector(facing: number): Vec2 {
    return vec2.create(
        Math.cos(facing),
        Math.sin(facing) * -1,
    );
}

/**
 * @param facing Current facing in radians.
 * @returns Unit vector to the right of the drone's facing.
 */
export function rightVector(facing: number): Vec2 {
    return vec2.create(
        Math.cos(facing + Math.PI / 2),
        Math.sin(facing + Math.PI / 2) * -1,
    );
}

/**
 * @param velocity Current velocity.
 * @param maxSpeed Max speed in pixels per second.
 * @returns Updated velocity.
 */
export function limitSpeed(velocity: Vec2, maxSpeed = 120): Vec2 {
    const speed = vec2.length(velocity);
    if (speed <= maxSpeed) {
        return velocity;
    }

    return vec2.scale(velocity, maxSpeed / speed);
}

/**
 * @param position Current position.
 * @param velocity Velocity to use.
 * @param dt Delta time in seconds.
 * @returns Updated position.
 */
export function applyVelocity(position: Vec2, velocity: Vec2, dt: number): Vec2 {
    const movement = vec2.scale(velocity, dt);

    return vec2.add(position, movement);
}