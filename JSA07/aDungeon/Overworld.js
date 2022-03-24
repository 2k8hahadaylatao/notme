class Overworld {
    constructor(config) {
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
    }
   
    init() {
      
      const image = new Image();
      image.onload = () => {
        this.ctx.drawImage(image,0,0)
      };
      image.src = "/images/maps/backfloor.png";
      const light = new Image({}
        );
        light.onload = () => { 
          this.ctx.drawImage(
            light,
            0, //left cut 
            -3, //top cut
            61,//width of cut
            61,//height of cutcutcutt
            6 * 60 - 366,
            5* 60-230,
          390,
          390
          )
        }
        light.src="/images/clight.png";
        
        const torch1r_b = new Image();
        torch1r_b.onload = () => { 
      this.ctx.drawImage(
        torch1r_b,
        10, //left cut 
        10, //top cut
        250,//width of cut
        250,//height of cutcutcutt
        6 * 60 - 40,
        5* 60+80,
      190,
      190
  
      )
    }
    torch1r_b.src="/images/torch1.png";
  
    const torch1l_b = new Image();
    torch1l_b .onload = () => { 
      this.ctx.drawImage(
        torch1l_b ,
        10, //left cut 
        10, //top cut
        250,//width of cut
        250,//height of cutcutcutt
        6 * 60 - 378,
        5* 60+80,
      190,
      190
  
      )
    }
    torch1l_b .src="/images/torch1.png";
  
    const torch1l_t = new Image();
    torch1l_t .onload = () => { 
      this.ctx.drawImage(
        torch1l_t,
        10, //left cut 
        10, //top cut
        250,//width of cut
        250,//height of cutcutcutt
        6 * 60 - 378,
        5* 60-310,
      190,
      190
      )
    }
    torch1l_t .src="/images/torch1.png";
  
    const torch1r_t = new Image();
    torch1r_t .onload = () => { 
      this.ctx.drawImage(
        torch1r_t,
        10, //left cut 
        10, //top cut
        250,//width of cut
        250,//height of cutcutcutt
        6 * 60 - 40,
        5* 60-310,
      190,
      190
      )
    }
    torch1r_t .src="/images/torch1.png";

    //Place some game Object
    const hero = new GameObject(
      {
        x:6,
        y:5,
        src: "/images/characters/rouge.png"
      }
    )
    const shaman = new GameObject(
      {
        x:9,
        y:5,
        src: "/images/characters/druid.png"
      }
    )
    const fireplace = new GameObject(
      {
          x:11,
          y:5,
          src: "/images/characters/bonefire.gif"
    }
    )
    const botanist = new GameObject(
      {
        x:11,
        y:3,
        src:"/images/characters/botanist.png"
      }
    )
    const teller = new GameObject(
      {
        x:9,
        y:3,
        src:"/images/characters/teller1.png"
      }
    )
      setTimeout(()=>{
      hero.sprite.draw(this.ctx);
      botanist.sprite.draw(this.ctx);
      shaman.sprite.draw(this.ctx);
      fireplace.sprite.draw(this.ctx);
      teller.sprite.draw(this.ctx);
      console.log( typeof  hero.sprite.draw(this.ctx), botanist.sprite.draw(this.ctx),shaman.sprite.draw(this.ctx), teller.sprite.draw(this.ctx));


      
  }, 200);
    
   }
  }