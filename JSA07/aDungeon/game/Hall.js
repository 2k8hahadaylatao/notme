
class Hall
{
    constructor(config) {
        this.element= config.element;
        this.canvas =this.element.querySelector(".game-canvas");
        this.cxt =this.canvas.getContext("2d");
    }

    init()  {
        const image = new Image();

        image.onload =() =>  {
            this.ctx.drawImage(image,0,0) 
        };
        image.src = "/assets/backfloor.png";
                            
    }

}