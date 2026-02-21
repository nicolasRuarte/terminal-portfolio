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
            - ls: imprime una lista con los proyectos en los que he trabajado
            - tech: imprime una lista con las tecnologías que manejo
            - whoami: imprime una lista con mis redes sociales de contacto
        `;

        const divContainer = document.createElement("div");
        divContainer.appendChild(helpMessage);

        const interactionContainer = document.querySelector("#interaction-container");
        interactionContainer.appendChild(divContainer);
    },

    ls: () => {
        const projectList = document.createElement("pre");
        projectList.classList.add("response");
        projectList.innerHTML = `Mis proyectos:
        -  <a href="https://github.com/nicolasRuarte/project-manager">Gestor de proyectos</a>`

        const divContainer = document.createElement("div");
        divContainer.appendChild(projectList);

        const interactionContainer = document.querySelector("#interaction-container");
        interactionContainer.appendChild(divContainer);
    },

    tech: () => {
        const technologies = document.createElement("pre");
        technologies.classList.add("response");
        technologies.textContent = `Mis tecnologías:
        -  TypeScript
        - ExpressJS
        - Go
        - Linux`

        const divContainer = document.createElement("div");
        divContainer.appendChild(technologies);

        const interactionContainer = document.querySelector("#interaction-container");
        interactionContainer.appendChild(divContainer);
    },

    whoami: () => {
        const socialNetworksList = document.createElement("pre");
        socialNetworksList.classList.add("response");
        socialNetworksList.innerHTML = `Mis redes:
        -  <a href="mailto:miqueasnruarte@protonmail.com">Email</a>
        - <a href="https://x.com/NPCyBoludo">Twitter</a>`

        const divContainer = document.createElement("div");
        divContainer.appendChild(socialNetworksList);

        const interactionContainer = document.querySelector("#interaction-container");
        interactionContainer.appendChild(divContainer);
    },

    notFound: (input) => {
        const notFoundMsg = document.createElement("pre");
        notFoundMsg.classList.add("response");
        notFoundMsg.textContent = `El comando "${input}" no fue encontrado`

        const divContainer = document.createElement("div");
        divContainer.appendChild(notFoundMsg);

        const interactionContainer = document.querySelector("#interaction-container");
        interactionContainer.appendChild(divContainer);
    },

    clear: () => {
        const interactionContainer = document.querySelector("#interaction-container");
        interactionContainer.innerHTML = "";
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

            case "ls":
                disableCurrentEditableArea(editableArea);
                responder.ls();
                createCmdLine();
                break;

            case "tech":
                disableCurrentEditableArea(editableArea);
                responder.tech();
                createCmdLine();
                break;

            case "whoami":
                disableCurrentEditableArea(editableArea);
                responder.whoami();
                createCmdLine();
                break;

            case "clear":
                responder.clear();
                createCmdLine();
                break;
        
            default:
                disableCurrentEditableArea(editableArea);
                responder.notFound(input);
                createCmdLine();
                break;
        }
    }
}

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

    editableArea.focus();
    cmdLine.addEventListener("keydown", processEditableAreaInput);

    return cmdLine
}

function main() {
    try {
        cmdLine = createCmdLine();
    } catch (error) {
        console.error(error);   
    }
}

main();
