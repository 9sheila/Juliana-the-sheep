const images = [
    ["./images/cars/car2.png", "./images/cars/car2bw.png"],
    ["./images/cars/car3.png", "./images/cars/car3bw.png"],
    ["./images/cars/car4.png", "./images/cars/car4bw.png"],
    ["./images/cars/car5.png", "./images/cars/car5bw.png"],
]

class Obstacle {
    constructor(ctx, x, y, width, height, backwards){
        this.ctx = ctx;
        this.image = new Image();
        this.image.onload = this.move();
        this.image.src = images[Math.floor(Math.random() * images.length)][backwards ? 0 : 1]
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.randomSpeed = Math.floor(Math.random() * 5) + 10;
        this.speed = backwards ? this.randomSpeed * -1 : this.randomSpeed;
        
        this.isReady = false;
        this.image.onload = () => {
            this.isReady = true;
        }}        
    

     draw() {
        if (this.isReady) {
            this.ctx.drawImage(
                this.image,
                this.x,
                this.y,
                this.width,
                this.height
            )
        }
    }


    move() {
        this.x -= this.speed;

      }


       collidesWith(player) {
         return player.x + player.width >= this.x &&
           player.x <= this.x + this.width &&
           player.y + player.height >= this.y &&
           player.y <= this.y + this.height;
       }
}