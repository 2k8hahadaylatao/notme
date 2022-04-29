class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls=config.walls ||{};
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;

  }

  drawLowerImage(ctx , cameraPerson)  {
    ctx.drawImage(
      this.lowerImage, 
      utils.withGrid(3.5) -cameraPerson.x, 
      utils.withGrid(6.5) -cameraPerson.y
      )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage, 
      utils.withGrid(3.5) - cameraPerson.x, 
      utils.withGrid(6.5) - cameraPerson.y
      )
  } 
  isSpaceTaken(currentX,currentY,direction){
    const {x,y}= utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }
  mountObjects(){
    Object.keys(this.gameObjects).forEach(key => {
      //key=> action

      let object = this.gameObjects[key];
      object.id = key;

      object.mount(this);

    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i=0; i<events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    //Reset Npcs to do their behavior ???? 
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["player"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events)
    }
  }
  checkForFootStepCutscene(){
    const hero = this.gameObjects["player"];
    const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene( match[0].events )
    }
  }
  addWall(x,y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x,y) {
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX, wasY, direction) {
    // this.removeWall(wasX, wasY);
    // const {x,y} = utils.nextPosition(wasX, wasY, direction);
    // this.addWall(x,y);
  }
}



window.OverworldMaps = {
  
  Cave: {
    lowerSrc: "/images/maps/cave.png",
    upperSrc: "",
    gameObjects: {
      player: new Person({
      
        isPlayerControlled: true,
        x:   utils.withGrid(3),
        y:   utils.withGrid(11),
        src:"/images/characters/girl.png"

      }),
      police: new Person({
        x:   utils.withGrid(2),
        y:   utils.withGrid(6),
       behaviorLoop: [
        {type:"stand", direction:"down", time:10000},
        {type:"walk",direction:"right"},
        {type:"stand", direction:"up", time:1000},
        {type:"stand", direction:"left", time:200},
        {type:"walk",direction:"left"}


       ],
       talking: [
         {
            events: [
                {type:"textMessage", text:"Tên cảnh sát: CHƯA ĐI À!!!!",faceHero:"police"},
                {who:"player", type:"walk", direction:"down"}
            ]
         }
       ],
       src: "images/characters/boy.png"
      }),
     rock1: new GameObject({
      x:   utils.withGrid(1),
      y:   utils.withGrid(7),
      src: "images/maps/rock3.png"
     }),
     rock2: new GameObject({
      x:   utils.withGrid(0),
      y:   utils.withGrid(7),
      src: "images/maps/rock3.png"
     }),
     rock3: new GameObject({
      x:   utils.withGrid(2),
      y:   utils.withGrid(7),
      src: "images/maps/rock3.png"
     }),
     rock4: new GameObject({
      x:   utils.withGrid(6),
      y:   utils.withGrid(7),
      src: "images/maps/rock3.png"
     }),
     rock5: new GameObject({
      x:   utils.withGrid(5),
      y:   utils.withGrid(7),
      src: "images/maps/rock3.png"
     }),
     rock6: new GameObject({
      x:   utils.withGrid(4),
      y:   utils.withGrid(7),
      src: "images/maps/rock3.png"
     }),
     rock7: new GameObject({
      x:   utils.withGrid(7),
      y:   utils.withGrid(7),
      src: "images/maps/rock3.png"
     }),
      
    },
    walls:{
     
      [utils.asGridCoord(0,0)] : true,
      [utils.asGridCoord(0,1)] : true,
      [utils.asGridCoord(0,2)] : true,
      [utils.asGridCoord(0,3)] : true,
      [utils.asGridCoord(1,0)] : true,
      [utils.asGridCoord(1,1)] : true,
      [utils.asGridCoord(1,2)] : true,
      [utils.asGridCoord(1,3)] : true,
      [utils.asGridCoord(2,0)] : true,
      [utils.asGridCoord(2,1)] : true,
      [utils.asGridCoord(2,2)] : true,
      [utils.asGridCoord(2,3)] : true,
      [utils.asGridCoord(3,0)] : true,
      [utils.asGridCoord(3,1)] : true,
      [utils.asGridCoord(3,2)] : true,
      [utils.asGridCoord(4,0)] : true,
      [utils.asGridCoord(4,1)] : true,
      [utils.asGridCoord(4,2)] : true,
      [utils.asGridCoord(5,0)] : true,
      [utils.asGridCoord(5,1)] : true,
      [utils.asGridCoord(5,2)] : true,
      [utils.asGridCoord(5,3)] : true,
      [utils.asGridCoord(6,0)] : true,
      [utils.asGridCoord(6,1)] : true,
      [utils.asGridCoord(6,2)] : true,
      [utils.asGridCoord(6,3)] : true,
      [utils.asGridCoord(7,0)] : true,
      [utils.asGridCoord(7,1)] : true,
      [utils.asGridCoord(7,2)] : true,
      [utils.asGridCoord(7,3)] : true,
      [utils.asGridCoord(-1,4)] : true,
      [utils.asGridCoord(-1,5)] : true,
      [utils.asGridCoord(-1,6)] : true,
      [utils.asGridCoord(-1,7)] : true,
      [utils.asGridCoord(-1,8)] : true,
      [utils.asGridCoord(-1,9)] : true,
      [utils.asGridCoord(-1,10)] : true,
      [utils.asGridCoord(-1,11)] : true,
      [utils.asGridCoord(0,12)] : true,
      [utils.asGridCoord(1,12)] : true,
      [utils.asGridCoord(2,12)] : true,
      [utils.asGridCoord(3,12)] : true,
      [utils.asGridCoord(4,12)] : true,
      [utils.asGridCoord(5,12)] : true,
      [utils.asGridCoord(6,12)] : true,
      [utils.asGridCoord(7,12)] : true,
      [utils.asGridCoord(8,11)] : true,
      [utils.asGridCoord(8,10)] : true,
      [utils.asGridCoord(8,9)] : true,
      [utils.asGridCoord(8,8)] : true,
      [utils.asGridCoord(8,7)] : true,
      [utils.asGridCoord(8,6)] : true,
      [utils.asGridCoord(8,5)] : true,
      [utils.asGridCoord(8,4)] : true,
    },
    cutsceneSpaces: {
      [utils.asGridCoord(3,3)] :[ {
        events:[
          {who:"police", type:"stand",direction:"up"},
          {who:"police", type:"textMessage",text:"Tên cảnh sát: \n \
          Ey ey cô kia. Quay lại"},
          {who:"police", type:"walk",direction:"right"},
          {who:"police", type:"stand",direction:"left"},
          {who:"player", type:"walk", direction:"down"},
          {who:"player", type:"walk", direction:"down"},
          {who:"player", type:"walk", direction:"down"},
          {who:"player", type:"walk", direction:"down"},
          {who:"player", type:"walk", direction:"down"},
          {who:"police", type:"walk", direction:"left"},

        ]
      }],
      [utils.asGridCoord(4,3)] :[{
        events:[
          { type:"changeMap",map:"Start"},
        ]
      }],
      [utils.asGridCoord(3,11)]: [{
        events:[
          { who: "police", type: "walk",  direction: "right" },
      { who: "player", type: "walk",  direction: "up" },
      { who: "police", type: "walk",  direction: "down" },
      { who: "player", type: "walk",  direction: "up" },
      { who: "police", type: "walk",  direction: "down" },
      {type:"textMessage", text:'Tên cảnh sát:\n \
      Hừm cô lại tới nữa à ở đây nguy hiểm lắm tôi nói nhiêu lần rồi'},
      { who: "police", type: "walk",  direction: "up" },
      { who: "police", type: "walk",  direction: "up" },
      {type:"textMessage", text:"Tên cảnh sát: \n \
        Nếu nghe rồi thi chim cút mau"},
      {type:"textMessage", text:"Tên cảnh sát:  \n \
       Đừng để tôi cáu"},
        ]
      }],
      
    }
  },
  Start: {
    lowerSrc: "/images/maps/start.png",
    upperSrc: "",
    gameObjects:
    {
     gate: new Person({
      x:   utils.withGrid(11),
      y:   utils.withGrid(4),
      src:"/images/maps/gate.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ],
     }),
     object: new Person({
      x:   utils.withGrid(10),
      y:   utils.withGrid(5),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ],
     }),
      level: new Person({
        x:   utils.withGrid(2),
        y:   utils.withGrid(3),
        src:"/images/maps/level.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ],
      }),
      rock: new GameObject({
        x:   utils.withGrid(2),
        y:   utils.withGrid(4),
        src:"/images/maps/rock3.png",
      }),
    player: new Person({
      
      isPlayerControlled: true,
      x:   utils.withGrid(9),
      y:   utils.withGrid(11),
      src:"/images/characters/girl.png",

    }),
  },
      walls:{
    [utils.asGridCoord(4,6)] : true,
    [utils.asGridCoord(10,11)] : true,
    [utils.asGridCoord(9,6)] : true,
    [utils.asGridCoord(9,5)] : true,
    [utils.asGridCoord(9,4)] : true,
    [utils.asGridCoord(6,4)] : true,
    [utils.asGridCoord(6,3)] : true,
    [utils.asGridCoord(5,3)] : true,
    [utils.asGridCoord(8,11)] : true,
    [utils.asGridCoord(11,4)] : true,
    [utils.asGridCoord(2,3)] : false,
    

  },
  cutsceneSpaces: {
    [utils.asGridCoord(3,3)] :[ {
      events:[
        {who:"level",type: "stand",  direction:"left",time:1},
        {who:"player",type:"walk",direction:"down"},
        {who:"player",type:"walk",direction:"down"},
        {who:"player",type:"walk",direction:"down"},
        {who:"player",type:"walk",direction:"down"},
        {who:"player",type:"walk",direction:"right"},
        {who:"player",type:"walk",direction:"right"},
        {who:"player",type:"walk",direction:"right"},
        {who:"player",type:"walk",direction:"right"},
        {who:"player",type:"walk",direction:"right"},
        {who:"gate",type:"walk",direction:"up"},
        {who:"gate",type:"walk",direction:"up"},
        {who:"object",type:"walk",direction:"right"},
        ]
    }],
    [utils.asGridCoord(11,4)] :[ {
      events:[
        {type:"changeGame", url:"http://127.0.0.1:5500/cube.html"}
      ]
    }],
    [utils.asGridCoord(11,5)] :[ {
      events:[
        {type:"damaged",damge:"1"},
        {who:"player", type:"walk",direction:"down"}
      ]
    }],
  }
},

}