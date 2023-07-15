class Player {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;
        this.x = SHEEP_INICIAL_POSITION[0];
        this.y = SHEEP_INICIAL_POSITION[1];
        this.width = 50;
        this.xFrame = 0;
        this.yFrame = 0;
        this.xFramesCount = 4;
        this.yFramesCount = 5;
        this.collideMusic = new Audio();
        this.collideMusic.src = './music/fart.mp3';
        this.collideMusic.volume = 0.5;

        this.image = new Image();
        this.image.src = './images/player/sheep_walk-2.png'
        this.isReady = false;
        this.image.onload = () => {
            this.height = this.width *
                this.image.height / this.image.width;
            this.isReady = true;
        }

        this.movements = {
            up: false,
            down: false,
            left: false,
            right: false
        }

        this.speedX = 5;
        this.speedY = 5;
    }

    draw() {
        if (this.isReady) {
            this.ctx.drawImage(
                this.image,
                this.xFrame * this.image.width / this.xFramesCount,
                this.yFrame * this.image.height / this.yFramesCount,
                this.image.width / this.xFramesCount,
                this.image.height / this.yFramesCount,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

    }

    move() {
        if (this.movements.left) {
            this.yFrame = 1;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;
                }
            }
            this.x -= this.speedX;
        } else if (this.movements.right) {
            this.yFrame = 3;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;
                }
            }
            this.x += this.speedX;
        }
        
        if (this.movements.up) {
            this.yFrame = 0;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;
                }
            }
            this.y -= this.speedY;
        } else if (this.movements.down) {
            this.yFrame = 2;
            if (this.game.counter % 10 === 0) {
                this.xFrame++;
                if (this.xFrame >= this.xFramesCount) {
                    this.xFrame = 0;

                }
            }
            this.y += this.speedY;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x > this.ctx.canvas.width - this.width) {
            this.x = this.ctx.canvas.width - this.width;
        }

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y > this.ctx.canvas.height - this.height) {
            this.y = this.ctx.canvas.height - this.height;
        }
    }

    onKeyEvent(event) {
        const status = event.type === 'keydown';
        if (!event.repeat) {
            switch (event.keyCode) {
                case KEY_UP:
                    this.movements.up = status;
                  break;
                case KEY_DOWN:
                    this.movements.down = status;
                  break;
                case KEY_LEFT:
                    this.movements.left = status;
                    break;
                case KEY_RIGHT:
                    this.movements.right = status;
                    break;
            }
        }
    }
    resetPosition(){
        this.x =SHEEP_INICIAL_POSITION[0]; 
        this.y =SHEEP_INICIAL_POSITION[1]; 
        this.xFrame = 0;
        this.yFrame = 0;
    }

}
