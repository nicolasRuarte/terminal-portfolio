const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;


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
        this.velocity = 5;
        this.maxDistance = 200;
        this.directionX = 1;


        this.states = Object.freeze({
            GOING_DOWN: 1,
            GOING_RIGHT: 2,
            GOING_DOWN2: 3,
            GOING_RIGHT: 4
        });
        this.currentState = this.states.GOING_DOWN;

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
        ctx.drawImage(this.spreadsheet, this.frameX * this.spriteWidth, frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.xPos, this.yPos, 200, 200);

        if (gameFrame % STAGGER_FRAMES === 0) {
            if (this.frameX < 1) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    }
}

const alien = new Alien(200, 100);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.fillRect(50, 50, 100, 100);
    //ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    alien.update();
    alien.draw();
    
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

animate();
