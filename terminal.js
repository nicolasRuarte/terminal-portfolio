function createCmdLine() {
    const cmdLine = document.createElement("div");
    cmdLine.classList.add("cmd-line")
    const dollarSign = document.createElement("div");
    dollarSign.textContent = "$";
    dollarSign.classList.add("dollar-sign");
    const editableArea = document.createElement("div");
    editableArea.contentEditable = true;
    editableArea.classList.add("editable-area");
    editableArea.classList.add("active");

    cmdLine.appendChild(dollarSign);
    cmdLine.appendChild(editableArea);

    const interactionContainer = document.querySelector("#interaction-container");
    interactionContainer.appendChild(cmdLine);

    return cmdLine
}

function disableCurrentEditableArea(editableArea) {
    if (!editableArea) {
        throw new Error("Function swapActiveInactiveCssClass() received no arguments");
    }

    const classes = editableArea.classList;

    if (classes.contains("active")) {
        editableArea.classList.replace("active", "inactive");
        editableArea.contentEditable = false;
    }
}

const responder = {
    help: () => {
        const helpMessage = document.createElement("pre");
        helpMessage.classList.add("response");
        helpMessage.textContent = `Lista de comandos disponibles:
            - help: imprime la lista de comandos disponibles
            - projects: imprime la lista de mis proyectos
            - tech: imprime una lista con las tecnologías que manejo
        `;
        helpMessage.style.fontSize = "2rem";
        helpMessage.style.padding = "3rem 0";

        const divContainer = document.createElement("div");
        divContainer.appendChild(helpMessage);

        const interactionContainer = document.querySelector("#interaction-container");
        interactionContainer.appendChild(divContainer);
    }
}

function processEditableAreaInput(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const editableArea = event.target
        const input = editableArea.textContent;
        console.log(input);

        switch (input) {
            case "help":
                disableCurrentEditableArea(editableArea);
                responder.help();
                createCmdLine();
                break;
        
            default:
                console.log("Ese comando no existe");
                break;
        }
    }
}

function main() {
    try {
        cmdLine = createCmdLine();
        cmdLine.addEventListener("keydown", processEditableAreaInput);
    } catch (error) {
        console.error(error);   
    }
}

main();
