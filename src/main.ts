import Arena from "./arena";
import Drone from "./drone";
import DroneInput from "./droneInput";
import SandboxBrain from "./sandboxBrain";

var brain = new SandboxBrain(document.getElementById("sandboxed") as HTMLIFrameElement);
var arena = new Arena(document.getElementById("arena") as HTMLElement);

var isRunning = false;
var previousTime = Date.now();

var droneA = new Drone([ 100, 100 ], 0);
var droneB = new Drone([ arena.width - 100, arena.height - 100 ], Math.PI);

arena.addDrone(droneA);
arena.addDrone(droneB);

var startButton = document.getElementById("start") as HTMLButtonElement;
startButton.addEventListener("click", function () {
    isRunning = true;
});

// Start loop.
requestAnimationFrame(update);

function update() {
    const now = Date.now();
    const dt = (now - previousTime) / 1000;
    previousTime = now;

    if (isRunning) {
        brain.run((document.getElementById("code") as HTMLTextAreaElement).value)
            .then(result => {
                droneA.updateFromInput(result, dt);
            })
            .catch(error => {
                console.error(error);
            });

        const turnLeftInput = new DroneInput(-1, 0, false);
        droneB.updateFromInput(turnLeftInput, dt);
    }

    arena.updateDisplay();

    requestAnimationFrame(update);
}
