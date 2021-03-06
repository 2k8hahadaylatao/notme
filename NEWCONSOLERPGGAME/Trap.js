class Trap extends GameObject{
    constructor(config)
    {
          //startBehavior
        super(config);
        this.movingProgressRemaining = 0;
        this.isStanding= false;
        
        this.isPlayerControlled= config.isPlayerControlled || false;
        this.directionUpdate = {
            "up" :["y",-2],
            "down" :["y",2],
            "left" :["x",-2],
            "right" :["x",2],
        }

    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
          this.updatePosition();
        } else {

            //More cases for starting to walk will come here
            //
            //
      
            //Case: We're keyboard ready and have an arrow pressed
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
              this.startBehavior(state, {
                type: "walk",
                direction: state.arrow
              })
            }
            this.updateSprite(state);
          }
        }
    
    startBehavior(state, behavior)
    {
      state.map.removeWall(this.x, this.y, this.direction);
        this.direction = behavior.direction;
        if(behavior.type === "walk"){
        //Ready walk 
         this.movingProgressRemaining=32;
         this.updateSprite(state);
        }
        if(behavior.type === "stand"){
          this.isStanding= true;
            setTimeout(()=> {
                utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                })
                this.isStanding= false;
            }, behavior.time)

        }
    }

    updatePosition()
    {
            const[property, change]= this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining-=2;
            if(this.movingProgressRemaining === 0)
            {
                utils.emitEvent("PersonWalkingComplete",{
                    whoId: this.id
                })
            }        
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
          this.sprite.setAnimation("walk-"+this.direction);
          return;
        }
        this.sprite.setAnimation("idle-"+this.direction);    
      }
      
}