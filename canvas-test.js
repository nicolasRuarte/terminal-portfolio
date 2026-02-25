const canvas = document.querySelector("#my-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let particles = [];
const numberOfParticles = 300;

class Alien {
    constructor(xPos, yPos) {
        this.size = 125;
        this.xPos = xPos;
        this.initialXPos = xPos;
        this.initialYPos = yPos;
        this.yPos = yPos;
        this.velocity = 5;
        this.maxDistance = 200;
        this.directionX = 1;

        this.spriteIdle = new Image();
        this.spriteIdle.src = "./alien-idle.png";
        this.spriteMoving = new Image();
        this.spriteMoving.src = "./alien-moving.png";
        this.currentSprite = this.spriteIdle;

        this.states = Object.freeze({
            GOING_DOWN: 1,
            GOING_RIGHT: 2,
            GOING_DOWN2: 3,
            GOING_RIGHT: 4
        });
        this.currentState = this.states.GOING_DOWN;
    }


    update() {
        switch (this.currentState) {
            case this.states.GOING_DOWN:
                this.yPos += this.velocity;

                if (this.yPos > this.initialYPos + this.maxDistance) {
                    this.initialYPos = this.yPos;
                    this.currentState = this.states.GOING_RIGHT;
                }
                break;

            case this.states.GOING_RIGHT:
                this.xPos += this.velocity;

                if (this.xPos > this.initialXPos + this.maxDistance) {
                    this.initialXPos = this.xPos;
                    this.currentState = this.states.GOING_DOWN2;
                }
                break;
                
            case this.states.GOING_DOWN2:
                this.yPos += this.velocity;

                if (this.yPos > this.initialYPos + this.maxDistance) {
                    this.initialYPos = this.yPos;
                    this.currentState = this.states.GOING_LEFT;
                }
                break;

            case this.states.GOING_LEFT:
                this.xPos -= this.velocity;

                if (this.xPos < this.initialXPos - this.maxDistance) {
                    this.initialXPos = this.xPos;
                    this.currentState = this.states.GOING_DOWN;
                }
                break;
        }

        if (this.yPos > canvas.height) {
            this.yPos = 0 - 20;
            this.initialYPos = this.yPos;
            this.xPos = Math.random() * (canvas.width - 100) + 100;
            this.initialXPos = this.xPos;
        }
    }

    draw() {
        if (this.currentSprite === this.spriteIdle) {
            ctx.drawImage(this.spriteIdle, this.xPos, this.yPos, this.size, this.size);
            this.currentSprite = this.spriteMoving;
            return;
        }

        ctx.drawImage(this.spriteMoving, this.xPos, this.yPos, this.size, this.size);
        this.currentSprite = this.spriteIdle;
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



//function init() {
//    particles = [];
//    for ( let i = 0; i < numberOfParticles; i++ ) {
//        const randomX = Math.random() * canvas.width;
//        const randomY = Math.random() * canvas.height;
//
//        particles.push(new Particle(randomX, randomY));
//    }
//}

const alien = new Alien(100, 100);
function animate() {
    //ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //alien.update();
    //alien.draw();

    requestAnimationFrame(animate);
}

//init();
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
    //init();
})
