import DroneInput from "./droneInput";

export default class SandboxBrain {

    frame: HTMLIFrameElement;

    promise: Promise<DroneInput>;
    resolvePromise: (value: DroneInput) => void;
    rejectPromise: (reason?: any) => void;

    boundReceiveMessage: (event: MessageEvent) => void;

    constructor(frame: HTMLIFrameElement) {
        this.frame = frame;

        this.boundReceiveMessage = this.receiveMessage.bind(this);
        window.addEventListener("message", this.boundReceiveMessage);
    }

    dispose(): void {
        window.removeEventListener("message", this.boundReceiveMessage);
    }

    run(code: string): Promise<DroneInput> {

        this.promise = new Promise<DroneInput>((resolve, reject) => {
            this.resolvePromise = resolve;
            this.rejectPromise = reject;
        });

        if (!this.frame?.contentWindow) {
            this.rejectPromise("No sandboxed frame");

            return this.promise;
        }

        this.frame.contentWindow.postMessage(this.buildCode(code), "*");

        return this.promise;
    }

    receiveMessage(event: MessageEvent): void {

        if (event.source != this.frame?.contentWindow) {
            // Not our message, ignore.
            return;
        }

        if (!this.resolvePromise) {
            // No promise set up, so nothing to provide result to.
            return;
        }

        console.log('Got result from sandbox:', event.data?.response);

        const result = new DroneInput(
            event.data?.response?.turn ?? 0,
            event.data?.response?.forward ?? 0,
            event.data?.response?.shoot ?? false,
        );

        this.resolvePromise(result);
    }

    buildCode(userCode: string): string {
        // TODO: Use real 'input' information.
        return `
            const input = {
                identifiedItems: [
                    {
                        heading: 12,
                        distance: 48,
                        type: 'enemy-bullet'
                    },
                    {
                        heading: 23,
                        distance: 91,
                        type: 'enemy-drone'
                    },
                ],
                health: 100,
            };
            let output = {
                turn: 0,
                forward: 0,
                shoot: false
            };

            ${userCode}
            ;
            output;
        `;
    }
}
