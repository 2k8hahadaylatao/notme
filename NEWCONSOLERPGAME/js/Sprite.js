class Sprite {
  constructor(config) {

    //Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    //Shadow
    this.shadow = new Image();
    this.useShadow = true; //config.useShadow || false
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    //Configure Animation & Initial State
    this.animations = config.animations || {
      "none": [[0,0]]     ,
      "idle-down": [ [1,0]  ],
      "idle-left": [ [1,1]  ],
      "idle-right": [ [1,2]  ],
      "idle-up": [ [1,3]  ],
      "walk-down":[[0,0],[1,0],[0,0],[2,0]],
      "walk-left":[[0,1],[1,1],[0,1],[2,1]],
      "walk-right":[[0,2],[1,2],[0,2],[2,2]],
      "walk-up":[[0,3],[1,3],[0,3],[2,3]]
        }
    this.currentAnimation = "none";//config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit= config.animationFrameLimit || 16;
    this.animationFrameProgress =this.animationFrameLimit;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }
  setAnimation(key){
    if(this.currentAnimation !== key){
      this.currentAnimation = key;
      this.currentAnimationFrame=0;
      this.animationFrameProgress=this.animationFrameLimit;
    }
  }
  updateAnimationProgress(){
      if(this.animationFrameProgress >0){
        this.animationFrameProgress -=1;
        return;
      }

      this.animationFrameProgress=this.animationFrameLimit;
      this.currentAnimationFrame+=1;

      if(this.frame == undefined){
        this.currentAnimationFrame= 0
      }

  }
 
  draw(ctx, cameraPerson) {
    const x = this.gameObject.x +utils.withGrid(3.5) -cameraPerson.x;
    const y = this.gameObject.y+utils.withGrid(6.5) -cameraPerson.y ;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    const [ frameX, frameY]=this.frame;

    this.isLoaded && ctx.drawImage(this.image,
      frameX*32,frameY*32,
      32,33,
      x,y,
      32,32
    )

    this.updateAnimationProgress();
  }
  
}





