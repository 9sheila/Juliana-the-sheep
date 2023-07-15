class Complement {
    constructor(ctx) {
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = "./images/background/flecha.png";
        this.width = this.image.width / 8;
        this.height = this.image.height / 8;
        this.x = 190;
        this.y = 50;
        this.vy = 0;
        this.gravity = 0.5;

        this.isReady = false;
        this.image.onload = () => {
            this.isReady = true;
            this.draw();
        }
    }
    draw() {
        if (this.isReady) {
            this.ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height)
        }
    }
    move() {
        this.vy += this.gravity;
        this.y += this.vy;

        if (this.y >= 55) {
            this.y = 50;
            this.vy *= -1;

        }

    }
}