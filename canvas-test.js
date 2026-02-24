const canvas = document.querySelector("#my-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let particles = [];
const numberOfParticles = 300;

class Alien {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.initialXPos = xPos;
        this.yPos = yPos;
        this.weight = 2;
        this.pixelWidthAndHeight = 20;
        this.alienAscii = `
xxxxxyxxxxxyxxxxx
xxxxxxyxxxyxxxxxx
xxxxxyyyyyyyxxxxx
xxxxyyxyyyxyyxxxx
xxxyyyyyyyyyyyxxx
xxxyxyyyyyyyxyxxx
xxxyxyyyyyyyxyxxx
xxxyxyxxxxxyxyxxx
xxxxxxyyxyyxxxxxx
`;
    }

    update() {
        if (this.yPos > canvas.height) {
            this.initialXPos = Math.random() * canvas.width;
            this.yPos = 0;
        }
    }

    draw() {
        const space = " ";
        const newLine = "\n";
        for (const char of this.alienAscii) {
            if (char === space) {
                this.xPos += this.pixelWidthAndHeight;
            }

            if (char === newLine) {
                this.xPos = this.initialXPos;
                this.yPos += this.pixelWidthAndHeight;
            }

            if (char === "x") {
                this.xPos += this.pixelWidthAndHeight;
            }

            if (char === "y") {
                this.xPos += this.pixelWidthAndHeight;
                ctx.fillStyle = "green";
                ctx.beginPath();
                ctx.fillRect(this.xPos, this.yPos, this.pixelWidthAndHeight, this.pixelWidthAndHeight);
                ctx.closePath();
            }
        }
    }
}

// Funcionalidad de rebotar en título
const titleElement = document.querySelector("#title");
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 20
}



class Particle {
    constructor(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.size = Math.random() * 15 + 1; // Supongo que el + 1 es para evitar size = 0
        this.weight = Math.random() * 1 + 1;
        this.directionX = -2;
    }

    update() {
        if (this.yPos > canvas.height) {
            this.yPos = 0 - this.size;
            this.xPos = Math.random() * canvas.width * 1.4;
            this.weight = Math.random() * 1 + 1;
        }

        this.yPos += this.weight;
        this.weight += 0.05;
        this.xPos += this.directionX;

        // Check colissions with title
        if (
            this.xPos < title.x + title.width &&
            this.xPos + this.size > title.x &&
            this.yPos < title.y + title.height &&
            this.yPos + this.size > title.y 
        ) {
            this.yPos -= 3;
            this.weight *= -0.5;
        }
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.size, 0, Math.PI * 2, 0);
        ctx.closePath();
        ctx.fill();
    }
}



function init() {
    particles = [];
    for ( let i = 0; i < numberOfParticles; i++ ) {
        const randomX = Math.random() * canvas.width;
        const randomY = Math.random() * canvas.height;

        particles.push(new Particle(randomX, randomY));
    }
}

const alien = new Alien(100, 100);
function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
        particle.update();
        particle.draw();
    }

    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 20
    }
    init();
})
