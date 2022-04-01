class Map {
    constructor(config){
        this.gameObject = config.gameObject;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;



        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

    }

    drawLowerImage(ctx){
        ctx.drawImage(this.lowerImage, 0,0);
    }


    drawUpperImage(ctx){
        ctx.drawImage(this.upperImage, 0,0);
    }
}

window.maps=  {
    Mainson: {
        lowerSrc: "/images/maps/backfloor.png",
        upperSrc: "/images/maps/backfloor.png",
        gameObjects: {
            player: new GameObject({
                x:6.02,
                 y:5,
            }),

            }
    },
    BlessRoom: {
        lowerSrc: "/images/maps/backfloor.png",
        upperSrc: "/images/maps/backfloor.png",
        gameObjects: {
            player: new GameObject({
                x:6.02,
                y:12,
            }),
            bless : new Firepl(
                {
                  x:1.7,
                  y:0,
                  src: "/images/maps/bless.png"
                }),
                bless2 : new Firepl(
                    {
                      x:10.34,
                      y:0,
                      src: "/images/maps/bless.png"
                    }),
            }
    },
    MonsterRoom:{

    },
    BossRoom: {

    }
}