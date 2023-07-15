class Lives {
    constructor(ctx, x, isLost = false){
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = isLost?
             "./images/background/heart-lives-lost.png":
             "./images/background/heart-lives.png";
        this.x = x;
        this.y = 10;
        this.width = this.image.width / 2;
        this.height = this.image.height / 2;
        this.isLost = isLost;

        this.isReady = false;
        this.image.onload = () => {
            this.isReady = true;
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

}