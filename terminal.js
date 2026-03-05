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
        -  <a href="https://github.com/nicolasRuarte/project-manager">Gestor de proyectos</a>
            Pequeño proyecto de hobby que permite realizar
            operaciones CRUD a una lista de proyectos locales`;

        const divContainer = document.createElement("div");
        divContainer.appendChild(projectList);

        const interactionContainer = document.querySelector("#interaction-container");
        interactionContainer.appendChild(divContainer);
    },

    tech: () => {
        const technologies = document.createElement("pre");
        technologies.classList.add("response");
        technologies.innerHTML = `Mis tecnologías:
        <div class="tech-response">
            <img src="javascript-logo.svg">
            <img src="typescript-logo.svg">
            <img src="expressjs-logo.png">
            <img src="go-logo.svg">
        </div>
        `

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

class CommandHistory {
    constructor() {
        this.commandHistory = [];
        this.index = 0;
    }

    saveCommand(command) {
        console.log("Comando guardado: ", command);
        this.index = 0;
        this.commandHistory.push(command);
    }

    getCommandAtIndex(index) {
        if (this.commandHistory.length === 0) {
            this.index = 0;
            throw new Error("There are no commands in history");
        }

        return this.commandHistory.at(index);
    }

    listenForIndexUpdate() {
        window.addEventListener("keydown", (event) => {
            console.log(this.commandHistory);
            if (event.key === "ArrowUp") {
                this.index++;

                const lastIndexOfArray = this.commandHistory.length;
                if (this.index > lastIndexOfArray) {
                    this.index--;
                    throw new Error("Exceeded command history length");
                }

                // Pasamos el index como negativo así vamos del último al primero cuando luego utilizemos Array.at()
                // 1 pasa a -1, 2 a -2 y así recorriendo el array de atrás para adelante
                const backwardsIndex = -this.index;
                const command = this.getCommandAtIndex(backwardsIndex);
                const editableArea = document.querySelector(".active");
                editableArea.textContent = command;
            }

            if (event.key === "ArrowDown") {
                const editableArea = document.querySelector(".active");

                this.index--;
                if (this.index <= 0) {
                    this.index = 0;
                    editableArea.textContent = "";
                    return;
                }

                //Llega como 3 y necesito que sea 2
                // 4 - 3 = 1; 4 - 2 
                const command = this.getCommandAtIndex(this.commandHistory.length - this.index);
                editableArea.textContent = command;
            }

            console.log(this.index);
        })
    }
}



function processEditableAreaInput(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const editableArea = event.target
        const input = editableArea.textContent;

        commandHistory.saveCommand(input);

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

const commandHistory = new CommandHistory();
function main() {
    try {
        cmdLine = createCmdLine();
        commandHistory.listenForIndexUpdate();
        
    } catch (error) {
        console.error(error);   
    }
}

main();
