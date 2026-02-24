const canvas = document.querySelector("#my-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let particles = [];

class Particle {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = 10;
        this.weight = 2;
        this.directionX = 1;
    }

    update() {
        if (this.yPos < 0) {
        }

        this.yPos -= this.weight;

    }

    draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.size, 0, Math.PI * 2, 0);
        ctx.closePath();
        ctx.fill();
    }
}

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

    }

    draw() {
        for (const char of this.alienAscii) {
            if (char === " ") {
                this.xPos += this.pixelWidthAndHeight;
            }

            if (char === "\n") {
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

const particle = new Particle(100, 1100);
const alien = new Alien(100, 100);

function animate() {
    particle.update();
    particle.draw();
    alien.draw();
    requestAnimationFrame(animate);
}

animate();
