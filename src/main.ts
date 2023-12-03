import SandboxBrain from "./sandboxBrain";

var brain = new SandboxBrain(document.getElementById("sandboxed") as HTMLIFrameElement);

var runButton = document.getElementById("run") as HTMLButtonElement;

runButton.addEventListener("click", function () {
    var code = (document.getElementById("code") as HTMLTextAreaElement).value;

    brain.run(code)
        .then(result => {
            var outputElement = document.getElementById("output");

            outputElement.textContent = JSON.stringify(result);

            console.log("Result:", result);
        })
        .catch(error => {
            console.error("Eror:", error);
        });
});
