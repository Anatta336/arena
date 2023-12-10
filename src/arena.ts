import Drone from "./drone";
import { setTransform } from "./droneDisplay";

export default class Arena {
    width: number = 512;
    height: number = 512;

    drones: Map<string, Drone> = new Map<string, Drone>();

    constructor(readonly displayElement: HTMLElement) {
    }

    addDrone(drone: Drone): Arena {
        this.removeDrone(drone);

        this.drones.set(drone.id, drone);

        this.displayElement.appendChild(drone.svg);

        return this;
    }

    removeDrone(drone: Drone): Arena;
    removeDrone(droneId: string): Arena;
    removeDrone(droneOrId: Drone | string): Arena {
        let droneId = typeof droneOrId === "string" ? droneOrId : droneOrId.id;
        let drone = this.drones.get(droneId);

        if (!drone) {
            // Already not here.
            return this;
        }

        this.drones.delete(droneId);
        this.displayElement.removeChild(drone.svg);

        return this;
    }

    updateDisplay(): Arena {
        this.drones.forEach(drone => {
            setTransform(drone.svg, drone.currentState);
        });

        return this;
    }
}
