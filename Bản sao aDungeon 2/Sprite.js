class Sprite {
    constructor(config) {
  
      //Set up the image
      this.image = new Image();
      this.image.src = config.src;
      this.image.onload = () => {
        this.isLoaded = true;
      }
  

  
      //Configure Animation & Initial State
      this.animations = config.animations || {
        idleDown: [
          [0,0]
        ]
      }
      this.currentAnimation = config.currentAnimation || "idleDown";
      this.currentAnimationFrame = 0;
  
      //Reference the game object
      this.gameObject = config.gameObject;
    }
  
    draw(ctx) {
      const x = this.gameObject.x * 26 - 8;
      const y = this.gameObject.y * 30 - 18;
  
      this.isLoaded && ctx.drawImage(this.image,
        0,0,
        35,70,
        x,y,
        90,130
      )
    }
  }