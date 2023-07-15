class Game {
    constructor(ctx, carSize, topRoadLimit, bottomRoadLimit) {
        this.ctx = ctx;
        this.complement = new Complement(this.ctx);
        this.background = new Background(this.ctx);
        this.player = new Player(ctx, this);
        this.obstacles = [];
        this.carSize = carSize;
        this.topRoadLimit = topRoadLimit;
        this.bottomRoadLimit = bottomRoadLimit;
        this.counter = 0;
        this.firstTime = true;
        this.intervalId = null;
        this.lives = [];
        this.setLives();
        this.freeze = false;

        this.music = new Audio();
        this.music.src = './music/zoubisou.mp3';
        this.music.loop = true;
        this.music.volume = 0.5;
        //  this.music.play();
    }

    start() {
        this.counter = 0;
        this.firstTime = true;
        this.obstacles = [];

        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.counter++;

            if (this.firstTime) {
                this.addObstacleTop(TOP1);
                this.addObstacleTop(TOP2);
                this.addObstacleBottom(BOTTOM1);
                this.addObstacleBottom(BOTTOM2);
                this.firstTime = false;
            }
            if (this.counter % 50 === 0) {
                const topHeight = TOP_HEIGHTS[Math.floor(Math.random() * TOP_HEIGHTS.length)]
                this.addObstacleTop(topHeight);
                const bottomHeight = BOTTOM_HEIGHTS[Math.floor(Math.random() * BOTTOM_HEIGHTS.length)]
                this.addObstacleBottom(bottomHeight);
            }

            this.checkCollisions();
            this.move();

        }, 1000 / 60)
    }

    setLives() {
        this.lives = [];
        for (let index = 0; index < livesHeartPositions.length; index++) {
            const live = new Lives(ctx, livesHeartPositions[index]);
            this.lives.push(live);
        }
    }

    draw() {
        this.background.draw();
        this.complement.draw();
        this.player.draw();
        this.obstacles.forEach((obs) => {
            obs.draw();

        });
        this.lives.forEach((live) => {
            live.draw();
        });

        // this.drawScore();
    }

    move() {

        this.player.move();
        this.complement.move();
        if (this.obstacles.length > 0) {
            this.obstacles.forEach((obs) => {

                obs.move();
            });
        }
    }

    clear() {
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x > -obstacle.width);
    }

    addObstacleTop(height) {
        const x = this.ctx.canvas.width;
        //const randomY = Math.random() * (this.topRoadLimit - this.carSize[1]) + this.carSize[1];
        const newObstacle = new Obstacle(this.ctx, x, height, this.carSize[0], this.carSize[1]);
        this.obstacles.push(newObstacle);
    }

    addObstacleBottom(height) {
        const x = -this.carSize[0];
        const newObstacle = new Obstacle(this.ctx, x, height, this.carSize[0], this.carSize[1], true);
        this.obstacles.push(newObstacle);

    }


    checkCollisions() {
        this.obstacles.forEach((obs) => {
            if (this.player.x + this.player.width >= obs.x &&
                this.player.x <= obs.x + obs.width &&
                this.player.y + this.player.height >= obs.y &&
                this.player.y <= obs.y + obs.height) {
                this.obstacles.pop(obs)

                const liveToDeleteIndex = this.lives.findIndex(live => !live.isLost)
                if (liveToDeleteIndex >= 0) {
                    const newLive = new Lives(this.ctx, this.lives[liveToDeleteIndex].x, true);
                    this.lives[liveToDeleteIndex] = newLive;
                }
                this.player.yFrame = 4;
                this.player.xFrame = 0;
                this.draw();
                if (this.lives.every(live => live.isLost)) {
                    setTimeout(() => {
                        this.gameOver();
                        this.transitioningLevel = false;
                    }, 1000 / 60);
                }
                else {
                    clearInterval(this.intervalId);
                    this.clear();
                    this.draw();
                    setTimeout(() => {
                        this.player.collideMusic.play();
                        this.start();
                        this.player.resetPosition();
                    }, 1000);
                }
            }
        });
    }

    gameOver() {
        clearInterval(this.intervalId);
        setTimeout(() => {
            this.clear();
            this.player.yFrame = 0;
            this.player.xFrame = 0;
            this.draw();
            this.ctx.font = "bolder 50px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(
                `GAME OVER`,
                this.ctx.canvas.width / 2 - 150,
                this.ctx.canvas.height / 2 - 50);

        }, 0);
    }

    onKeyEvent(event) {
        this.player.onKeyEvent(event);
    }

    youWin(){
        if(this.player.x === 190 && 
            this.player.y === 90)
            clearInterval(this.intervalId);
            setTimeout(() => {
                this.clear();
                this.draw();
                this.ctx.font = "bolder 50px Arial";
                this.ctx.fillStyle = "black";
                this.ctx.fillText(
                    `YOU WIN`,
                    this.ctx.canvas.width / 2 - 150,
                    this.ctx.canvas.height / 2 - 50);
    
            }, 0);
    }
    //     drawScore() {
    //         this.ctx.font = "22px Arial";
    //         this.ctx.fillStyle = "white";
    //         this.ctx.fillText(`Score: ${this.score}`, 10, 30);

    //     }
    // 
}