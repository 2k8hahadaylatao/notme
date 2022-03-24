class Sprite {
    constructor(config){

        //Set up image
        this.image = new Image();
        this.image.src= config.src;
        this.image.onload= () => {
            this.isLoaded = true;
        }
        //Configure Animation
        this.animations =config.animation || {
            idleDown: [
                [0,0]
            ],
            
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame =0;

        //Reference the game Object
        this.gameObject= config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x *60- 340;
        const y = this.gameObject.y *60- 165;

        this.isLoaded && ctx.drawImage(this.image,
            0,0,
            200,145,
            130,110
        )
    }
}