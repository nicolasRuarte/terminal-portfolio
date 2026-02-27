const interactionContainer = document.querySelector("#interaction-container")

const canvas = document.querySelector("#my-canvas");
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext("2d");



const playerImage = new Image();
playerImage.src = "./shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;

let frameX = 0;
let frameY = 0;
let gameFrame =  0;
const STAGGER_FRAMES = 20;

class Alien {
    constructor(xPos, yPos) {
        this.size = 125;
        this.xPos = xPos;
        this.initialXPos = xPos;
        this.initialYPos = yPos;
        this.yPos = yPos;
        this.velocity = 1;
        this.maxDistance = 100;
        this.directionX = 1;


        this.states = Object.freeze({
            GOING_DOWN: 0,
            GOING_RIGHT: 1,
            GOING_DOWN2: 2,
            GOING_RIGHT: 3
        });
        this.currentState = Math.floor(Math.random() * 4);

        this.spreadsheet = new Image();
        this.spreadsheet.src = "./alien-spreadsheet.png";
        this.spriteWidth = 704 / 2;
        this.spriteHeight = 256;
        this.frameX = 0;
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

            default:
                this.currentState = this.states.GOING_DOWN;
        }

        if (this.yPos > canvas.height) {
            this.yPos = 0 - 20;
            this.initialYPos = this.yPos;
            this.xPos = Math.random() * (canvas.width - 100) + 100;
            this.initialXPos = this.xPos;
        }
    }

    draw() {
        const frameY = 0;
        ctx.drawImage(this.spreadsheet, this.frameX * this.spriteWidth, frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.xPos, this.yPos, 35, 50);

        if (gameFrame % STAGGER_FRAMES === 0) {
            if (this.frameX < 1) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    }
}

let aliens = [];
function initAliens() {
    const maxSize = 5;

    for (let i = 0; i < maxSize; i++) {
        const randomXPos = Math.random() * canvas.width + 50;
        aliens.push(new Alien(randomXPos, 0));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(50, 50, 100, 100);
    //ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    for (const alien of aliens) {
        alien.update();
        alien.draw();
    }

    
    // This controls animation speed
    // Check https://www.youtube.com/watch?v=CY0HE277IBM on minute 20:40 to see how it works
    if (gameFrame % STAGGER_FRAMES === 0) {
        if (frameX < 6) {
            frameX++;
        } else {
            frameX = 0;
        }
    }

    gameFrame++;
    requestAnimationFrame(animate);
}

initAliens();
animate();

interactionContainer.addEventListener("change", () => {
    console.log("hola")
    canvas.width = interactionContainer.width;
    canvas.height = interactionContainer.height;
    //init();
})

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

