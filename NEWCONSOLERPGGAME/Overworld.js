class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }
 
  startGameLoop() {
    const step = ( ) => {
 
     //Clear off the canvas
     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

     //the camera
     const cameraPerson = this.map.gameObjects.player;
    
     //Update all
     Object.values(this.map.gameObjects).forEach(object => {
      object.update({
        arrow: this.directionInput.direction,
        map: this.map,
      })
    })
      
     //Draw Lower layer
     this.map.drawLowerImage(this.ctx, cameraPerson);
 
     //Draw Game Objects
     Object.values(this.map.gameObjects).sort((a,b) => {
      return a.y - b.y;
    }).forEach(object => {
      object.sprite.draw(this.ctx, cameraPerson);
    })
 
     //Draw Upper layer
   this.map.drawUpperImage(this.ctx, cameraPerson);
 
   requestAnimationFrame(() => {
    step();   
  })
}
step();
}
 
  bindActionInput(){
    setInterval(()=> {
      this.map.checkForFootStepCutscene()
        }, 100)
        setInterval(()=> {
          this.map.checkForMonsterAtack()
        },100)
    new KeyPressListener("KeyW", ()=>{

      this.map.checkForFootStepCutscene()
    })
    new KeyPressListener("KeyA", ()=>{

      this.map.checkForFootStepCutscene()
    })
    new KeyPressListener("KeyS", ()=>{

      this.map.checkForFootStepCutscene()
    })
    new KeyPressListener("KeyD", ()=>{

      this.map.checkForFootStepCutscene()
    })
    new KeyPressListener("Enter", () => {
      this.map.checkForActionCutscene()
    })
  }
  bindHeroPositionCheck(){
    document.addEventListener("PersonWalkingComplete", e=>{
      if(e.detail.whoId==="player"){
        this.map.checkForActionCutscene();
      }
    } )
  }
  startMap(mapConfig){
    this.map = new OverworldMap(mapConfig);
    this.map.overworld= this;
    this.map.mountObjects();
  }

  init() {
    this.startMap(window.OverworldMaps.Cave);

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();
  
    this.startGameLoop();
  }
 
 }