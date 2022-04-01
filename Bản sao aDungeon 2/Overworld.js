

class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }
  startGameLoop() {
    const steps  = () => {
      this.map.drawLowerImage(this.ctx);
      Object.values(this.map.gameObjects).forEach(object =>{
        object.sprite.draw(this.ctx);
      })
      this.map.drawUpperImage(this.ctx);
      requestAnimationFrame(()=>{
        steps();
      })
    }
    steps();
  }
 
  init() {
    this.map = new Map(window.maps.Mainson);
    this.startGameLoop();
  
 }
}