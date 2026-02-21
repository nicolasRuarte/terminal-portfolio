const canvas = document.querySelector("#my-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let particles = [];

class Alien {
    constructor(instanceXPos, yPos) {
        this.instanceXPosition = instanceXPos;
        this.xPos = instanceXPos;
        this.yPos = yPos;
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
            this.yPos = 0;
            this.xPos = Math.random() * canvas.width;
            this.instanceXPosition = this.xPos;
        }
    }

    draw() {
        for (const char of this.alienAscii) {
            if (char === "\n") {
                this.xPos = this.instanceXPosition;
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

const particle = new Particle(100, 1100);
const alien = new Alien(200, -220)

function animate() {
    alien.update();
    alien.draw();
    //particle.update();
    //particle.draw();
    requestAnimationFrame(animate);
}

animate();
