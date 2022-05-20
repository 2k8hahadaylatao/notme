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
    this.isDamged = false;
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
    console.log(hero.x/32+"|| "+hero.y/32);
  }
  checkForMonsterAtack(){
    const hero = this.gameObjects["player"];
    const monster = this.gameObjects["monster"];
    const nextCoords = utils.nextPosition(monster.x, monster.y, monster.direction);
    let health = document.querySelector("#hp");
    let damage = 1;
    if(`${nextCoords.x},${nextCoords.y}`==`${hero.x},${hero.y}`){
      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if( utils.perceptionDistance(monster.x, monster.y, hero.x, hero.y)){
      // console.log("Đã phát hiện người chơi"); 
      this.removeWall(monster.x,monster.y);
      monster.direction= utils.attackDirection(monster.x, monster.y, hero.x, hero.y);
      monster.x=utils.checkForGrid(monster.x);
      monster.time = 100;
    }
    const monster1 = this.gameObjects["monster1"];
    const nextCoords1 = utils.nextPosition(monster1.x, monster1.y, monster1.direction);
    if(`${nextCoords1.x},${nextCoords1.y}`==`${hero.x},${hero.y}`){
      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if( utils.perceptionDistance(monster1.x, monster1.y, hero.x, hero.y)){
      // console.log("Đã phát hiện người chơi"); 
      this.removeWall(monster1.x,monster1.y);
      monster1.direction= utils.attackDirection(monster1.x, monster1.y, hero.x, hero.y);
      monster1.x=utils.checkForGrid(monster1.x);

    }
    const monster2 = this.gameObjects["monster2"];
    const nextCoords2 = utils.nextPosition(monster2.x, monster2.y, monster2.direction);
    if(`${nextCoords2.x},${nextCoords2.y}`==`${hero.x},${hero.y}`){

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if( utils.perceptionDistance(monster2.x, monster2.y, hero.x, hero.y)){
      // console.log("Đã phát hiện người chơi"); 
      this.removeWall(monster2.x,monster2.y);
      monster2.direction= utils.attackDirection(monster2.x, monster2.y, hero.x, hero.y);
      monster2.x=utils.checkForGrid(monster2.x);

    }
    const monster3 = this.gameObjects["monster3"];
    const nextCoords3 = utils.nextPosition(monster3.x, monster3.y, monster3.direction);
    if(`${nextCoords3.x},${nextCoords3.y}`==`${hero.x},${hero.y}`){

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if( utils.perceptionDistance(monster3.x, monster3.y, hero.x, hero.y)){
      // console.log("Đã phát hiện người chơi"); 
      this.removeWall(monster3.x,monster3.y);
      monster3.direction= utils.attackDirection(monster3.x, monster3.y, hero.x, hero.y);
      monster3.x=utils.checkForGrid(monster3.x);

    }
    const monster4 = this.gameObjects["monster4"];
    const nextCoords4 = utils.nextPosition(monster4.x, monster4.y, monster4.direction);
    if(`${nextCoords4.x},${nextCoords4.y}`==`${hero.x},${hero.y}`){

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if( utils.perceptionDistance(monster4.x, monster4.y, hero.x, hero.y)){
      // console.log("Đã phát hiện người chơi"); 
      this.removeWall(monster4.x,monster4.y);
      monster4.direction= utils.attackDirection(monster4.x, monster4.y, hero.x, hero.y);
      monster4.x=utils.checkForGrid(monster4.x);

    }
    const monster5 = this.gameObjects["monster5"];
    const nextCoords5 = utils.nextPosition(monster5.x, monster5.y, monster5.direction);
    if(`${nextCoords5.x},${nextCoords5.y}`==`${hero.x},${hero.y}`){

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if( utils.perceptionDistance(monster5.x, monster5.y, hero.x, hero.y)){
      // console.log("Đã phát hiện người chơi"); 
      this.removeWall(monster5.x,monster5.y);
      monster5.direction= utils.attackDirection(monster5.x, monster5.y, hero.x, hero.y);
      monster5.x=utils.checkForGrid(monster5.x);

    }
    const monster6 = this.gameObjects["monster6"];
    const nextCoords6 = utils.nextPosition(monster6.x, monster6.y, monster6.direction);
    if(`${nextCoords6.x},${nextCoords6.y}`==`${hero.x},${hero.y}`){

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if( utils.perceptionDistance(monster6.x, monster6.y, hero.x, hero.y)){
      // console.log("Đã phát hiện người chơi"); 
      this.removeWall(monster6.x,monster6.y);
      monster6.direction= utils.attackDirection(monster6.x, monster6.y, hero.x, hero.y);
      monster6.x=utils.checkForGrid(monster6.x);

    }
    const monster7 = this.gameObjects["monster7"];
    const nextCoords7 = utils.nextPosition(monster7.x, monster7.y, monster7.direction);
    if(`${nextCoords7.x},${nextCoords7.y}`==`${hero.x},${hero.y}`){
      let health= document.querySelector("#hp");
      let damage=7;
      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if( utils.perceptionDistance(monster7.x, monster7.y, hero.x, hero.y)){
      // console.log("Đã phát hiện người chơi"); 
      this.removeWall(monster7.x,monster7.y);
      monster7.direction= utils.attackDirection(monster7.x, monster7.y, hero.x, hero.y);
      monster7.x=utils.checkForGrid(monster7.x);

    }
    if(`${monster.x},${monster.y}`==`${monster1.x},${monster1.y}`||
    `${monster.x},${monster.y}`==`${monster2.x},${monster2.y}`||
    `${monster.x},${monster.y}`==`${monster3.x},${monster3.y}`||
    `${monster.x},${monster.y}`==`${monster4.x},${monster4.y}`||
    `${monster.x},${monster.y}`==`${monster5.x},${monster5.y}`||
    `${monster.x},${monster.y}`==`${monster6.x},${monster6.y}`||
    `${monster.x},${monster.y}`==`${monster7.x},${monster7.y}`||
    `${monster1.x},${monster1.y}`==`${monster2.x},${monster2.y}`||
    `${monster1.x},${monster1.y}`==`${monster3.x},${monster3.y}`||
    `${monster1.x},${monster1.y}`==`${monster4.x},${monster4.y}`||
    `${monster1.x},${monster1.y}`==`${monster5.x},${monster5.y}`||
    `${monster1.x},${monster1.y}`==`${monster6.x},${monster6.y}`||
    `${monster1.x},${monster1.y}`==`${monster7.x},${monster7.y}`||
    `${monster2.x},${monster2.y}`==`${monster3.x},${monster3.y}`||
    `${monster2.x},${monster2.y}`==`${monster4.x},${monster4.y}`||
    `${monster2.x},${monster2.y}`==`${monster5.x},${monster5.y}`||
    `${monster2.x},${monster2.y}`==`${monster6.x},${monster6.y}`||
    `${monster2.x},${monster2.y}`==`${monster7.x},${monster7.y}`||
    `${monster3.x},${monster3.y}`==`${monster4.x},${monster4.y}`||
    `${monster3.x},${monster3.y}`==`${monster5.x},${monster5.y}`||
    `${monster3.x},${monster3.y}`==`${monster6.x},${monster6.y}`||
    `${monster3.x},${monster3.y}`==`${monster7.x},${monster7.y}`||
    `${monster4.x},${monster3.y}`==`${monster5.x},${monster5.y}`||
    `${monster4.x},${monster3.y}`==`${monster6.x},${monster6.y}`||
    `${monster4.x},${monster3.y}`==`${monster7.x},${monster7.y}`||
    `${monster5.x},${monster5.y}`==`${monster6.x},${monster6.y}`||
    `${monster5.x},${monster5.y}`==`${monster7.x},${monster7.y}`||
    `${monster6.x},${monster6.y}`==`${monster7.x},${monster7.y}`){
        monster.behaviorLoop=[];
        monster1.behaviorLoop=[];
    }
  }
  checkForFootStepCutscene(){
    const hero = this.gameObjects["player"];
    const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene( match[0].events )
    }
    const trap = this.gameObjects["object"];
    const trap1 = this.gameObjects["object1"];
    const trap2 = this.gameObjects["object2"];
    const trap3 = this.gameObjects["object3"];
    const trap4 = this.gameObjects["object4"];
    const trap5= this.gameObjects["object5"];
    const trap6 = this.gameObjects["object6"];
    const trap7 = this.gameObjects["object7"];
    const trap8 = this.gameObjects["object8"];
    const trap9 = this.gameObjects["object9"];
    const trap10 = this.gameObjects["object10"];
    const arrow = this.gameObjects["arrow"];
    const arrow1 = this.gameObjects["arrow1"];
    const arrow2 = this.gameObjects["arrow2"];
    const arrow3 = this.gameObjects["arrow3"];
    const monster = this.gameObjects["monster"];
    const monster1 = this.gameObjects["monster1"];
    let health = document.querySelector("#hp");
    let damage = 1;
    if(`${hero.x},${hero.y}`== `${trap.x},${trap.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
      
    }
    if(`${hero.x},${hero.y}`== `${arrow.x},${arrow.y}`)
    {


      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${trap1.x},${trap1.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${trap2.x},${trap2.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${trap3.x},${trap3.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${trap4.x},${trap4.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${trap5.x},${trap5.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${trap6.x},${trap6.y}`)
    {
      // let health= document.querySelector("#hp");
      // let damage=1;
      // health.value-=damage;
      // if(health.value <=0 ){
      //     window.location="http://127.0.0.1:5500/index.html";
      // }
    }
    if(`${hero.x},${hero.y}`== `${trap7.x},${trap7.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${trap8.x},${trap8.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${trap9.x},${trap9.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${trap10.x},${trap10.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    //arrow
   
    if(`${hero.x},${hero.y}`== `${arrow1.x},${arrow1.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${arrow2.x},${arrow2.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
    if(`${hero.x},${hero.y}`== `${arrow3.x},${arrow3.y}`)
    {

      health.value-=damage;
      if(health.value <=0 ){
          window.location="http://127.0.0.1:5500/index.html";
      }
    }
  }
  addWall(x,y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x,y) {
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const {x,y} = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x,y);

  }
  addTrap(x,y) {
    this.trap[`${x},${y}`] = true;
  }
  removeTrap(x,y) {
    delete this.trap[`${x},${y}`]
  }
  moveTrap(wasX, wasY, direction) {
    this.removeTrap(wasX, wasY);
    const {x,y} = utils.nextPosition(wasX, wasY, direction);
    this.addTrap(x,y);
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
     object: new Trap({
      x:   utils.withGrid(10),
      y:   utils.withGrid(5),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ],
     }),
     object1: new Trap({
      x:   utils.withGrid(7),
      y:   utils.withGrid(6),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object2: new Trap({
      x:   utils.withGrid(7),
      y:   utils.withGrid(5),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object3: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object4: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object5: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object6: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object7: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object8: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object9: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object10: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
      level: new Person({
        x:   utils.withGrid(2),
        y:   utils.withGrid(3),
        src:"/images/maps/level.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ],
      }),
      dispenserout1: new Person({
        x:   utils.withGrid(6),
        y:   utils.withGrid(6),
        src:"/images/maps/dispenser.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ],
      }),
      dispenserout2: new Person({
        x:   utils.withGrid(6),
        y:   utils.withGrid(10),
        src:"/images/maps/dispenser.png",
        behaviorLoop:[
          {type:"stand",direction:"up",time:100000000}
        ],
      }),
      arrow:new Trap({
        x:   utils.withGrid(6),
        y:   utils.withGrid(7),
        src:"/images/maps/arrow.png",
        behaviorLoop:[
          {type:"walk",direction:"down"},
          {type:"stand",direction:"down",time:100},
          {type:"walk",direction:"down"},
          {type:"stand",direction:"down",time:100},
          {type:"walk",direction:"up"},
          {type:"stand",direction:"up",time:100},
          {type:"walk",direction:"up"},
          {type:"stand",direction:"up",time:100},
        ],
      }),
      rock: new GameObject({
        x:   utils.withGrid(2),
        y:   utils.withGrid(4),
        src:"/images/maps/rock3.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ],
      }),
      rock2: new GameObject({
        x:   utils.withGrid(4),
        y:   utils.withGrid(3),
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
    [utils.asGridCoord(9,12)] : true,
    [utils.asGridCoord(7,11)] : true,
    [utils.asGridCoord(6,11)] : true,
    [utils.asGridCoord(5,9)] : true,
    [utils.asGridCoord(4,9)] : true,
    [utils.asGridCoord(3,9)] : true,
    [utils.asGridCoord(2,7)] : true,
    [utils.asGridCoord(1,6)] : true,
    [utils.asGridCoord(1,5)] : true,
    [utils.asGridCoord(2,8)] : true,
    [utils.asGridCoord(2,2)] : true,
    [utils.asGridCoord(3,1)] : true,
    [utils.asGridCoord(4,1)] : true,
    [utils.asGridCoord(5,1)] : true,
    [utils.asGridCoord(6,1)] : true,
    [utils.asGridCoord(13,4)] : true,
    [utils.asGridCoord(13,5)] : true,
    [utils.asGridCoord(13,6)] : true,
    [utils.asGridCoord(4,6)] : true,
    [utils.asGridCoord(10,11)] : true,
    [utils.asGridCoord(9,6)] : true,
    [utils.asGridCoord(9,5)] : true,
    [utils.asGridCoord(9,4)] : true,
    [utils.asGridCoord(6,4)] : true,
    [utils.asGridCoord(6,5)] : true,
    [utils.asGridCoord(8,11)] : true,
    [utils.asGridCoord(11,4)] : true,
    [utils.asGridCoord(11,7)] : true,
    [utils.asGridCoord(11,8)] : true,
    [utils.asGridCoord(11,9)] : true,
    [utils.asGridCoord(11,11)] : true,
    [utils.asGridCoord(10,4)] : true,
    [utils.asGridCoord(12,4)] : true,
    [utils.asGridCoord(12,7)] : true,
    [utils.asGridCoord(12,10)] : true,
  },
  cutsceneSpaces: {

    [utils.asGridCoord(3,4)] :[ {
      events:[
        {type:"textMessage",text:"Bạn bị tấn công bất ngờ"},
        {who:"player",type:"walk",direction:"up"},
        {who:"player",type:"walk",direction:"up"},
        {type:"changeGame", url:"http://127.0.0.1:5500/cube.html"},
      ]
    }],
    [utils.asGridCoord(3,3)] :[ {
      events:[
        {who:"level",type: "stand",  direction:"left",time:1},
        {who:"gate",type:"walk",direction:"up"},
        {who:"gate",type:"walk",direction:"up"},
        {who:"player",type:"walk",direction:"down"},
        {who:"player",type:"walk",direction:"down"},
        {who:"player",type:"walk",direction:"down"},
        {who:"object",type:"walk",direction:"right"},
        ]
    }],
    [utils.asGridCoord(11,4)] :[ {
      events:[
       {type:"changeMap", map:"Ready"}
      ]
    }],
  }
},
Ready:
{
  lowerSrc: "/images/maps/ready.png",
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
       gate1: new Person({
        x:   utils.withGrid(4),
        y:   utils.withGrid(1),
        src:"/images/maps/gate.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ],
       }),
       object: new Trap({
        x:   utils.withGrid(10),
        y:   utils.withGrid(5),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ],
       }),
       object1: new Trap({
        x:   utils.withGrid(11),
        y:   utils.withGrid(8),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object2: new Trap({
        x:   utils.withGrid(11),
        y:   utils.withGrid(9),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object3: new Trap({
        x:   utils.withGrid(11),
        y:   utils.withGrid(7),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object4: new Trap({
        x:   utils.withGrid(5),
        y:   utils.withGrid(9),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object5: new Trap({
        x:   utils.withGrid(5),
        y:   utils.withGrid(10),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object6: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(5),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object7: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(1),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object8: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(1),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object9: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(1),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object10: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(1),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
        level: new Person({
          x:   utils.withGrid(2),
          y:   utils.withGrid(3),
          src:"/images/maps/level.png",
          behaviorLoop:[
            {type:"stand",direction:"down",time:100000000}
          ],
        }),
        level2: new Person({
          x:   utils.withGrid(3),
          y:   utils.withGrid(8),
          src:"/images/maps/level.png",
          behaviorLoop:[
            {type:"disable"}
          ],
        }),
        dispenserout1: new Person({
          x:   utils.withGrid(6),
          y:   utils.withGrid(6),
          src:"/images/maps/dispenser.png",
          behaviorLoop:[
            {type:"stand",direction:"down",time:100000000}
          ],
        }),
        dispenserout2: new Person({
          x:   utils.withGrid(6),
          y:   utils.withGrid(10),
          src:"/images/maps/dispenser.png",
          behaviorLoop:[
            {type:"stand",direction:"up",time:100000000}
          ],
        }),
        arrow:new Trap({
          x:   utils.withGrid(6),
          y:   utils.withGrid(7),
          src:"/images/maps/arrow.png",
          behaviorLoop:[
            {type:"walk",direction:"down"},
            {type:"stand",direction:"down",time:100},
            {type:"walk",direction:"down"},
            {type:"stand",direction:"down",time:100},
            {type:"walk",direction:"up"},
            {type:"stand",direction:"up",time:100},
            {type:"walk",direction:"up"},
            {type:"stand",direction:"up",time:100},
          ],
        }),
        arrow1:new Trap({
          x:   utils.withGrid(-11),
          y:   utils.withGrid(-11),
          src:"/images/maps/arrow.png",

        }),
        arrow2:new Trap({
          x:   utils.withGrid(-11),
          y:   utils.withGrid(-11),
          src:"/images/maps/arrow.png",
        
        }),
        arrow3:new Trap({
          x:   utils.withGrid(-10),
          y:   utils.withGrid(-10),
          src:"/images/maps/arrow.png",
        
        }),
        rock: new GameObject({
          x:   utils.withGrid(9),
          y:   utils.withGrid(7),
          src:"/images/maps/rock3.png",
          behaviorLoop:[
            {type:"stand",direction:"down",time:100000000}
          ],
        }),
        rock2: new GameObject({
          x:   utils.withGrid(4),
          y:   utils.withGrid(3),
          src:"/images/maps/rock3.png",
        }),
        monster: new Trap({
          x:   utils.withGrid(11),
          y:   utils.withGrid(7),
          src:"/images/maps/bat.png",
          behaviorLoop:[
            {type:"walk",direction:"down"},
            {type:"stand",direction:"down",time:2000},
            {type:"walk",direction:"up"},
            {type:"stand",direction:"up",time:2000},
]
        }),
        monster1: new Trap({
          x:   utils.withGrid(7),
          y:   utils.withGrid(7),
          src:"/images/maps/slime.png",
          behaviorLoop:[
            {type:"walk",direction:"down"},
            {type:"stand",direction:"down",time:2000},
            {type:"walk",direction:"up"},
            {type:"stand",direction:"up",time:2000},
]
        }),
      player: new Person({
        
        isPlayerControlled: true,
        x:   utils.withGrid(9),
        y:   utils.withGrid(11),
        src:"/images/characters/girl.png",
      }),
    },
    walls: {
      [utils.asGridCoord(7,6)] : true,
      [utils.asGridCoord(9,12)] : true,
      [utils.asGridCoord(7,11)] : true,
      [utils.asGridCoord(6,11)] : true,
      [utils.asGridCoord(5,9)] : true,
      [utils.asGridCoord(4,9)] : true,
      [utils.asGridCoord(3,9)] : true,
      [utils.asGridCoord(2,7)] : true,
      [utils.asGridCoord(1,6)] : true,
      [utils.asGridCoord(1,5)] : true,
      [utils.asGridCoord(2,8)] : true,
      [utils.asGridCoord(2,2)] : true,
      [utils.asGridCoord(3,1)] : true,
      [utils.asGridCoord(5,1)] : true,
      [utils.asGridCoord(6,1)] : true,
      [utils.asGridCoord(6,2)] : true,
      [utils.asGridCoord(7,2)] : true,
      [utils.asGridCoord(8,3)] : true,
      [utils.asGridCoord(8,4)] : true,
      [utils.asGridCoord(7,4)] : true,
      [utils.asGridCoord(7,5)] : true,
      [utils.asGridCoord(7,6)] : true,
      [utils.asGridCoord(13,4)] : true,
      [utils.asGridCoord(13,5)] : true,
      [utils.asGridCoord(13,6)] : true,
      [utils.asGridCoord(4,6)] : true,
      [utils.asGridCoord(10,11)] : true,
      [utils.asGridCoord(9,6)] : true,
      [utils.asGridCoord(9,5)] : true,
      [utils.asGridCoord(9,4)] : true,
      [utils.asGridCoord(8,11)] : true,
      [utils.asGridCoord(11,4)] : true,
      [utils.asGridCoord(11,7)] : true,
      [utils.asGridCoord(11,8)] : true,
      [utils.asGridCoord(11,9)] : true,
      [utils.asGridCoord(11,11)] : true,
      [utils.asGridCoord(10,4)] : true,
      [utils.asGridCoord(12,4)] : true,
      [utils.asGridCoord(12,7)] : true,
      [utils.asGridCoord(12,10)] : true,
    },
    cutsceneSpaces: {

      [utils.asGridCoord(3,5)] :[ {
        events:[
          {who:"object6", type:"walk",direction:"right"},
          {who:"object6", type:"walk",direction:"right"},
          {type:"textMessage",text:"Rớt hố rồi bạn hiền"},
          {who:"player",type:"walk",direction:"down"},
          {who:"object6", type:"walk",direction:"left"},
          {who:"object6", type:"walk",direction:"left"},
          {type:"changeGame", url:"http://127.0.0.1:5500/snake.html"},
        ]
      }],
      [utils.asGridCoord(3,3)] :[ {
        events:[
          {who:"level",type: "stand",  direction:"left",time:1},
          {who:"gate",type:"walk",direction:"up"},
          {who:"gate",type:"walk",direction:"up"},
          {who:"player",type:"walk",direction:"down"},
          {who:"player",type:"walk",direction:"down"},
          {who:"player",type:"walk",direction:"down"},
          {who:"object",type:"walk",direction:"right"},
          ]
      }],
      [utils.asGridCoord(11,4)] :[ {
        events:[
         {type:"changeMap", map:"Readynext"},
         {who:"player",type:"walk",direction:"down"},
         {type:"textMessage", text:"Nó dẫn bạn đi ngược lại"}
        ]
      }],
      [utils.asGridCoord(3,7)] :[ {
        events:[
          {who:"level2",type: "stand",  direction:"left",time:1},
          {who:"gate1",type:"walk",direction:"up"},
          {who:"gate1",type:"walk",direction:"up"},
          {who:"player",type:"walk",direction:"up"},
          {who:"player",type:"walk",direction:"up"},
          ]
      }],
      [utils.asGridCoord(4,1)]:[{
        events:[
        {type:"changeMap", map:"illusion"},
        {who:"player",type:"walk",direction:"down"},]
      }] ,
    }

},
Readynext:
{
  lowerSrc: "/images/maps/ready.png",
  upperSrc: "",
    gameObjects:
    {
       gate1: new Person({
        x:   utils.withGrid(4),
        y:   utils.withGrid(1),
        src:"/images/maps/gate.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ],
       }),
       object: new Trap({
        x:   utils.withGrid(10),
        y:   utils.withGrid(5),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ],
       }),
       object1: new Trap({
        x:   utils.withGrid(11),
        y:   utils.withGrid(8),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object2: new Trap({
        x:   utils.withGrid(11),
        y:   utils.withGrid(9),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object3: new Trap({
        x:   utils.withGrid(11),
        y:   utils.withGrid(7),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object4: new Trap({
        x:   utils.withGrid(5),
        y:   utils.withGrid(9),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object5: new Trap({
        x:   utils.withGrid(5),
        y:   utils.withGrid(10),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object6: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(5),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object7: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(1),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object8: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(1),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object9: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(1),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
      object10: new Trap({
        x:   utils.withGrid(1),
        y:   utils.withGrid(1),
        src:"/images/maps/object.png",
        behaviorLoop:[
          {type:"stand",direction:"down",time:100000000}
        ]
      }),
        level: new Person({
          x:   utils.withGrid(2),
          y:   utils.withGrid(3),
          src:"/images/maps/level.png",
          behaviorLoop:[
            {type:"stand",direction:"down",time:100000000}
          ],
        }),
        level2: new Person({
          x:   utils.withGrid(9),
          y:   utils.withGrid(11),
          src:"/images/maps/level.png",
          behaviorLoop:[
            {type:"disable"}
          ],
        }),
        dispenserout1: new Person({
          x:   utils.withGrid(6),
          y:   utils.withGrid(6),
          src:"/images/maps/dispenser.png",
          behaviorLoop:[
            {type:"stand",direction:"down",time:100000000}
          ],
        }),
        dispenserout2: new Person({
          x:   utils.withGrid(6),
          y:   utils.withGrid(10),
          src:"/images/maps/dispenser.png",
          behaviorLoop:[
            {type:"stand",direction:"up",time:100000000}
          ],
        }),
        arrow:new Trap({
          x:   utils.withGrid(6),
          y:   utils.withGrid(7),
          src:"/images/maps/arrow.png",
          behaviorLoop:[
            {type:"walk",direction:"down"},
            {type:"stand",direction:"down",time:100},
            {type:"walk",direction:"down"},
            {type:"stand",direction:"down",time:100},
            {type:"walk",direction:"up"},
            {type:"stand",direction:"up",time:100},
            {type:"walk",direction:"up"},
            {type:"stand",direction:"up",time:100},
          ],
        }),
        arrow1:new Trap({
          x:   utils.withGrid(-11),
          y:   utils.withGrid(-11),
          src:"/images/maps/arrow.png",

        }),
        arrow2:new Trap({
          x:   utils.withGrid(-11),
          y:   utils.withGrid(-11),
          src:"/images/maps/arrow.png",
        
        }),
        arrow3:new Trap({
          x:   utils.withGrid(-10),
          y:   utils.withGrid(-10),
          src:"/images/maps/arrow.png",
        
        }),
        rock: new GameObject({
          x:   utils.withGrid(9),
          y:   utils.withGrid(7),
          src:"/images/maps/rock3.png",
          behaviorLoop:[
            {type:"stand",direction:"down",time:100000000}
          ],
        }),
        rock2: new GameObject({
          x:   utils.withGrid(4),
          y:   utils.withGrid(3),
          src:"/images/maps/rock3.png",
        }),
        monster: new Trap({
          x:   utils.withGrid(11),
          y:   utils.withGrid(7),
          src:"/images/maps/bat.png",
          behaviorLoop:[
            {type:"walk",direction:"down"},
            {type:"stand",direction:"down",time:2000},
            {type:"walk",direction:"up"},
            {type:"stand",direction:"up",time:2000},
]
        }),
        monster1: new Trap({
          x:   utils.withGrid(7),
          y:   utils.withGrid(7),
          src:"/images/maps/slime.png",
          behaviorLoop:[
            {type:"walk",direction:"down"},
            {type:"stand",direction:"down",time:2000},
            {type:"walk",direction:"up"},
            {type:"stand",direction:"up",time:2000},
]
        }),
      player: new Person({
        
        isPlayerControlled: true,
        x:   utils.withGrid(11),
        y:   utils.withGrid(4),
        src:"/images/characters/girl.png",
  
      }),
    },
    walls: {
      [utils.asGridCoord(7,6)] : true,
      [utils.asGridCoord(7,6)] : true,
      [utils.asGridCoord(9,12)] : true,
      [utils.asGridCoord(7,11)] : true,
      [utils.asGridCoord(6,11)] : true,
      [utils.asGridCoord(5,9)] : true,
      [utils.asGridCoord(4,9)] : true,
      [utils.asGridCoord(3,9)] : true,
      [utils.asGridCoord(2,7)] : true,
      [utils.asGridCoord(1,6)] : true,
      [utils.asGridCoord(1,5)] : true,
      [utils.asGridCoord(2,8)] : true,
      [utils.asGridCoord(2,2)] : true,
      [utils.asGridCoord(2,4)] : false,
      [utils.asGridCoord(3,1)] : true,
      [utils.asGridCoord(5,1)] : true,
      [utils.asGridCoord(6,1)] : true,
      [utils.asGridCoord(6,2)] : true,
      [utils.asGridCoord(7,2)] : true,
      [utils.asGridCoord(8,3)] : true,
      [utils.asGridCoord(8,4)] : true,
      [utils.asGridCoord(7,4)] : true,
      [utils.asGridCoord(7,5)] : true,
      [utils.asGridCoord(7,6)] : true,
      [utils.asGridCoord(13,4)] : true,
      [utils.asGridCoord(13,5)] : true,
      [utils.asGridCoord(13,6)] : true,
      [utils.asGridCoord(4,6)] : true,
      [utils.asGridCoord(10,11)] : true,
      [utils.asGridCoord(9,6)] : true,
      [utils.asGridCoord(9,5)] : true,
      [utils.asGridCoord(9,4)] : true,
      [utils.asGridCoord(8,11)] : true,
      [utils.asGridCoord(11,4)] : true,
      [utils.asGridCoord(11,7)] : true,
      [utils.asGridCoord(11,8)] : true,
      [utils.asGridCoord(11,9)] : true,
      [utils.asGridCoord(11,11)] : true,
      [utils.asGridCoord(10,4)] : true,
      [utils.asGridCoord(12,4)] : true,
      [utils.asGridCoord(12,7)] : true,
      [utils.asGridCoord(12,10)] : true,
    },
    cutsceneSpaces: {

      [utils.asGridCoord(3,5)] :[ {
        events:[
          {who:"object6", type:"walk",direction:"right"},
          {who:"object6", type:"walk",direction:"right"},
          {type:"textMessage",text:"Rớt hố rồi bạn hiền"},
          {who:"player",type:"walk",direction:"down"},
          {who:"object6", type:"walk",direction:"left"},
          {who:"object6", type:"walk",direction:"left"},
          {type:"changeGame", url:"http://127.0.0.1:5500/snake.html"},
        ]
      }],
      [utils.asGridCoord(3,3)] :[ {
        events:[
          {who:"level",type: "stand",  direction:"left",time:1},
          {who:"gate",type:"walk",direction:"up"},
          {who:"gate",type:"walk",direction:"up"},
          {who:"player",type:"walk",direction:"down"},
          {who:"player",type:"walk",direction:"down"},
          {who:"player",type:"walk",direction:"down"},
          {who:"object",type:"walk",direction:"right"},
          ]
      }],
      [utils.asGridCoord(11,4)] :[ {
        events:[
         {type:"changeMap", map:"Readynext"},
         {who:"player",type:"walk",direction:"down"},
         {type:"textMessage", text:"Nó dẫn bạn đi ngược lại"}
        ]
      }],
      [utils.asGridCoord(9,10)] :[ {
        events:[
          {who:"level2",type: "stand",  direction:"left",time:1},
          {who:"gate1",type:"walk",direction:"up"},
          {who:"gate1",type:"walk",direction:"up"},
          {who:"player",type:"walk",direction:"up"},
          {who:"player",type:"walk",direction:"up"},
          ]
      }],
      [utils.asGridCoord(4,1)]:[{
        events:[
        {type:"changeMap", map:"illusion"},
        {who:"player",type:"walk",direction:"down"},
      ]
      }] ,
    },
  },
    illusion:
{
  lowerSrc: "/images/maps/illusion.png",
  upperSrc: "",
    gameObjects:
    {
      player: new Person({
        isPlayerControlled: true,
        x:   utils.withGrid(12),
        y:   utils.withGrid(0),
        src:"/images/characters/girl.png",
  
      }),
      //21 /10
      monster: new Trap({
        x:   utils.withGrid(6),
        y:   utils.withGrid(16),
        src:"/images/maps/slime.png",
        behaviorLoop:[ 
          {type:"walk", direction:"up"},
          {type:"stand", direction:"down",time:100},
          {type:"walk", direction:"down"},
        ]
      }),
      monster1: new Trap({
        x:   utils.withGrid(17),
        y:   utils.withGrid(0),
        src:"/images/maps/bat.png",
        behaviorLoop:[ 
          {type:"walk", direction:"down"},
          {type:"stand", direction:"down",time:2000},
          {type:"walk", direction:"down"},
          {type:"walk", direction:"up"},
          {type:"walk", direction:"up"},
        ]
      }),
      monster2: new Trap({
        x:   utils.withGrid(17),
        y:   utils.withGrid(2),
        src:"/images/maps/bat.png",
        behaviorLoop:[ 
          {type:"walk", direction:"down"},
          {type:"stand", direction:"down",time:1500},
          {type:"walk", direction:"down"},
          {type:"walk", direction:"up"},
          {type:"walk", direction:"up"},
        ]
  
      }),
      monster3: new Trap({
        x:   utils.withGrid(18),
        y:   utils.withGrid(3),
        src:"/images/maps/slime.png",
        behaviorLoop:[ 
          {type:"walk", direction:"down"},
          {type:"stand", direction:"down",time:3000},
          {type:"walk", direction:"left"},
          {type:"walk", direction:"right"},
          {type:"walk", direction:"up"},
        ]
      }),
      monster4: new Trap({
        x:   utils.withGrid(18),
        y:   utils.withGrid(4),
        src:"/images/maps/bat.png",
        behaviorLoop:[ 
          {type:"walk", direction:"right"},
          {type:"stand", direction:"down",time:1000},
          {type:"walk", direction:"left"},
        ]
  
      }),
      monster5: new Trap({
        x:   utils.withGrid(17),
        y:   utils.withGrid(5),
        src:"/images/maps/slime.png",
        behaviorLoop:[ 
          {type:"walk", direction:"right"},
          {type:"walk", direction:"right"},
          {type:"stand", direction:"down",time:2500},
          {type:"walk", direction:"left"},
          {type:"walk", direction:"left"},
        ]
      }),
    
    monster6: new Trap({
      x:   utils.withGrid(16),
      y:   utils.withGrid(23),
      src:"/images/maps/slime.png",
      behaviorLoop:[ 
        {type:"walk", direction:"right"},
        {type:"walk", direction:"right"},
        {type:"stand", direction:"down",time:2500},
        {type:"walk", direction:"left"},
        {type:"walk", direction:"left"},
      ]
    }),
    monster7: new Trap({
      x:   utils.withGrid(16),
      y:   utils.withGrid(22),
      src:"/images/maps/slime.png",
      behaviorLoop:[ 
        {type:"walk", direction:"up"},
        {type:"stand", direction:"down",time:500},
        {type:"walk", direction:"down"},
      ]
    }),
    object: new Trap({
      x:   utils.withGrid(17),
      y:   utils.withGrid(-1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ],
     }),
     object1: new Trap({
      x:   utils.withGrid(12),
      y:   utils.withGrid(24),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object2: new Trap({
      x:   utils.withGrid(11),
      y:   utils.withGrid(24),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object3: new Trap({
      x:   utils.withGrid(10),
      y:   utils.withGrid(24),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object4: new Trap({
      x:   utils.withGrid(9),
      y:   utils.withGrid(24),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object5: new Trap({
      x:   utils.withGrid(13),
      y:   utils.withGrid(24),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object6: new Trap({
      x:   utils.withGrid(14),
      y:   utils.withGrid(24),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object7: new Trap({
      x:   utils.withGrid(-1),
      y:   utils.withGrid(-1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object8: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object9: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
    object10: new Trap({
      x:   utils.withGrid(1),
      y:   utils.withGrid(1),
      src:"/images/maps/object.png",
      behaviorLoop:[
        {type:"stand",direction:"down",time:100000000}
      ]
    }),
  },
    walls: {
      //5
      [utils.asGridCoord(12,-1)] : true,
      [utils.asGridCoord(11,0)] : true,
      [utils.asGridCoord(13,0)] : true,
      [utils.asGridCoord(14,1)] : true,
      [utils.asGridCoord(15,1)] : true,
      [utils.asGridCoord(16,0)] : true,
      [utils.asGridCoord(27,8)] : true,
      [utils.asGridCoord(28,8)] : true,
      [utils.asGridCoord(16,1)] : true,
      [utils.asGridCoord(16,2)] : true,
      [utils.asGridCoord(16,3)] : true,
      [utils.asGridCoord(16,4)] : true,
      [utils.asGridCoord(16,5)] : true,
      [utils.asGridCoord(16,6)] : true,
      [utils.asGridCoord(16,7)] : true,
      [utils.asGridCoord(16,8)] : true,
      [utils.asGridCoord(13,8)] : true,
      [utils.asGridCoord(13,7)] : true,
      [utils.asGridCoord(13,9)] : true,
      [utils.asGridCoord(13,14)] : true,
      [utils.asGridCoord(17,20)] : true,
      [utils.asGridCoord(17,19)] : true,
      [utils.asGridCoord(17,18)] : true,
      [utils.asGridCoord(17,17)] : true,
      [utils.asGridCoord(17,16)] : true,
      [utils.asGridCoord(17,15)] : true,
      [utils.asGridCoord(18,15)] : true,
      [utils.asGridCoord(19,14)] : true,
      [utils.asGridCoord(20,14)] : true,
      [utils.asGridCoord(21,14)] : true,
      [utils.asGridCoord(22,15)] : true,
      [utils.asGridCoord(23,16)] : true,
      [utils.asGridCoord(23,17)] : true,
      [utils.asGridCoord(23,18)] : true,
      [utils.asGridCoord(23,19)] : true,
      [utils.asGridCoord(23,14)] : true,
      [utils.asGridCoord(22,19)] : true,
      [utils.asGridCoord(21,19)] : true,
      [utils.asGridCoord(20,19)] : true,
      [utils.asGridCoord(19,19)] : true,
      [utils.asGridCoord(18,19)] : true,
      [utils.asGridCoord(14,14)] : true,
      [utils.asGridCoord(15,14)] : true,
      [utils.asGridCoord(15,15)] : true,
      [utils.asGridCoord(15,16)] : true,
      [utils.asGridCoord(15,17)] : true,
      [utils.asGridCoord(15,18)] : true,
      [utils.asGridCoord(15,19)] : true,
      [utils.asGridCoord(15,20)] : true,
      [utils.asGridCoord(15,21)] : true,
      [utils.asGridCoord(22,21)] : true,
      [utils.asGridCoord(15,22)] : true,
      [utils.asGridCoord(15,23)] : true,
      [utils.asGridCoord(22,23)] : true,
      [utils.asGridCoord(22,24)] : true,
      [utils.asGridCoord(22,22)] : true,
      [utils.asGridCoord(26,22)] : true,
      [utils.asGridCoord(26,23)] : true,
      [utils.asGridCoord(26,21)] : true,
      [utils.asGridCoord(27,21)] : true,
      [utils.asGridCoord(28,21)] : true,
      [utils.asGridCoord(29,21)] : true,
      [utils.asGridCoord(30,21)] : true,
      [utils.asGridCoord(31,21)] : true,
      [utils.asGridCoord(31,19)] : true,
      [utils.asGridCoord(30,19)] : true,
      [utils.asGridCoord(29,19)] : true,
      [utils.asGridCoord(28,19)] : true,
      [utils.asGridCoord(27,19)] : true,
      [utils.asGridCoord(27,18)] : true,
      [utils.asGridCoord(27,17)] : true,
      [utils.asGridCoord(27,16)] : true,
      [utils.asGridCoord(27,15)] : true,
      [utils.asGridCoord(27,14)] : true,
      [utils.asGridCoord(27,13)] : true,
      [utils.asGridCoord(26,12)] : true,
      [utils.asGridCoord(26,11)] : true,
      [utils.asGridCoord(26,10)] : true,
      [utils.asGridCoord(26,9)] : true,
      [utils.asGridCoord(26,8)] : true,
      [utils.asGridCoord(26,6)] : true,
      [utils.asGridCoord(27,6)] : true,
      [utils.asGridCoord(28,6)] : true,
      [utils.asGridCoord(29,6)] : true,
      [utils.asGridCoord(29,5)] : true,
      [utils.asGridCoord(29,4)] : true,
      [utils.asGridCoord(29,3)] : true,
      [utils.asGridCoord(30,3)] : true,
      [utils.asGridCoord(31,3)] : true,
      [utils.asGridCoord(31,9)] : true,
      [utils.asGridCoord(30,9)] : true,
      [utils.asGridCoord(29,9)] : true,
      [utils.asGridCoord(29,8)] : true,
      [utils.asGridCoord(30,1)] : true,
      [utils.asGridCoord(29,1)] : true,
      [utils.asGridCoord(24,2)] : true,
      [utils.asGridCoord(24,3)] : true,
      [utils.asGridCoord(24,4)] : true,
      [utils.asGridCoord(24,5)] : true,
      [utils.asGridCoord(22,0)] : true,
      [utils.asGridCoord(22,2)] : true,
      [utils.asGridCoord(21,2)] : true,
      [utils.asGridCoord(20,2)] : true,
      [utils.asGridCoord(19,2)] : true,
      [utils.asGridCoord(18,2)] : true,
      [utils.asGridCoord(18,1)] : true,
      [utils.asGridCoord(18,0)] : true,
      [utils.asGridCoord(20,8)] : true,
      [utils.asGridCoord(20,9)] : true,
      [utils.asGridCoord(20,10)] : true,
      [utils.asGridCoord(20,11)] : true,
      [utils.asGridCoord(20,12)] : true,
      [utils.asGridCoord(19,12)] : true,
      [utils.asGridCoord(19,11)] : true,
      [utils.asGridCoord(31,1)] : true,
      [utils.asGridCoord(28,1)] : true,
      [utils.asGridCoord(27,1)] : true,
      [utils.asGridCoord(26,1)] : true,
      [utils.asGridCoord(25,1)] : true,
      [utils.asGridCoord(24,1)] : true,
      [utils.asGridCoord(22,1)] : true,
      [utils.asGridCoord(28,1)] : true,
      [utils.asGridCoord(25,6)] : true,
      [utils.asGridCoord(24,6)] : true,
      [utils.asGridCoord(17,22)] : true,
      [utils.asGridCoord(14,7)] : true,
      [utils.asGridCoord(14,8)] : true,
      [utils.asGridCoord(14,9)] : true,
      [utils.asGridCoord(13,1)] : true,
      [utils.asGridCoord(11,1)] : true,
      [utils.asGridCoord(11,2)] : true,
      [utils.asGridCoord(10,2)] : true,
      [utils.asGridCoord(9,2)] : true,
      [utils.asGridCoord(9,3)] : true,
      [utils.asGridCoord(9,4)] : true,
      [utils.asGridCoord(9,5)] : true,
      [utils.asGridCoord(9,6)] : true,
      [utils.asGridCoord(11,7)] : true,
      [utils.asGridCoord(10,7)] : true,
      [utils.asGridCoord(11,8)] : true,
      [utils.asGridCoord(11,9)] : true,
      [utils.asGridCoord(11,10)] : true,
      [utils.asGridCoord(11,11)] : true,
      [utils.asGridCoord(11,12)] : true,
      [utils.asGridCoord(11,13)] : true,
      [utils.asGridCoord(11,14)] : true,
      [utils.asGridCoord(11,15)] : true,
      [utils.asGridCoord(10,15)] : true,
      [utils.asGridCoord(10,15)] : true,
      [utils.asGridCoord(10,16)] : true,
      [utils.asGridCoord(10,17)] : true,
      [utils.asGridCoord(10,18)] : true,
      [utils.asGridCoord(10,19)] : true,
      [utils.asGridCoord(10,20)] : true,
      [utils.asGridCoord(10,21)] : true,
      [utils.asGridCoord(2,14)] : true,
      [utils.asGridCoord(2,15)] : true,
      [utils.asGridCoord(2,16)] : true,
      [utils.asGridCoord(2,17)] : true,
      [utils.asGridCoord(2,18)] : true,
      [utils.asGridCoord(2,19)] : true,
      [utils.asGridCoord(5,13)] : true,
      [utils.asGridCoord(4,13)] : true,
      [utils.asGridCoord(3,13)] : true,
      [utils.asGridCoord(3,20)] : true,
      [utils.asGridCoord(4,20)] : true,
      [utils.asGridCoord(8,12)] : true,
      [utils.asGridCoord(9,12)] : true,
      [utils.asGridCoord(10,13)] : true,
      [utils.asGridCoord(10,14)] : true,
      [utils.asGridCoord(10,13)] : true,
      [utils.asGridCoord(5,20)] : true,
      [utils.asGridCoord(6,20)] : true,
      [utils.asGridCoord(7,20)] : true,
      [utils.asGridCoord(8,20)] : true,
      [utils.asGridCoord(8,21)] : true,
      [utils.asGridCoord(8,22)] : true,
      [utils.asGridCoord(8,23)] : true,
      [utils.asGridCoord(1,7)] : true,
      [utils.asGridCoord(2,6)] : true,
      [utils.asGridCoord(3,6)] : true,
      [utils.asGridCoord(4,6)] : true,
      [utils.asGridCoord(6,6)] : true,
      [utils.asGridCoord(3,6)] : true,
      [utils.asGridCoord(7,6)] : true,
      [utils.asGridCoord(7,7)] : true,
      [utils.asGridCoord(7,8)] : true,
      [utils.asGridCoord(7,2)] : true,
      [utils.asGridCoord(7,9)] : true,
      [utils.asGridCoord(9,2)] : true,
      [utils.asGridCoord(8,2)] : true,
      [utils.asGridCoord(4,6)] : true,
      [utils.asGridCoord(4,5)] : true,
      [utils.asGridCoord(4,3)] : true,
      [utils.asGridCoord(4,2)] : true,
      [utils.asGridCoord(3,1)] : true,
      [utils.asGridCoord(3,0)] : true,
      [utils.asGridCoord(7,10)] : true,
      [utils.asGridCoord(7,11)] : true,
      [utils.asGridCoord(7,12)] : true,
      [utils.asGridCoord(6,4)] : true,
      [utils.asGridCoord(0,8)] : true,
      [utils.asGridCoord(0,9)] : true,
      [utils.asGridCoord(0,10)] : true,
      [utils.asGridCoord(0,11)] : true,
      [utils.asGridCoord(0,12)] : true,
      [utils.asGridCoord(0,13)] : true,
      [utils.asGridCoord(1,13)] : true,
      [utils.asGridCoord(2,13)] : true,
      [utils.asGridCoord(6,2)] : true,
      [utils.asGridCoord(6,3)] : true,
      [utils.asGridCoord(6,4)] : true,
    },
    cutsceneSpaces: {

      [utils.asGridCoord(31,0)] :[ {
        events:[
          {type:"textMessage",text:"Ủa hết lối đi rồi"},
          {type:"changeGame", url:"http://127.0.0.1:5500/Almost.html"},
        ]
      }],
      [utils.asGridCoord(12,0)] :[ {
        events:[
          {type:"textMessage",text:"Bạn:Lối đi bị chặn mất rồi haizz..."},
          {who:"player",type:"walk",direction:"down"},
        ]
      }],
      [utils.asGridCoord(4,-1)] :[ {
        events:[
          {type:"textMessage",text:"Bạn:Lối đi bị chặn mất rồi haizz..."},
          {who:"player",type:"walk",direction:"down"},
        ]
      }],
      [utils.asGridCoord(5,-1)] :[ {
        events:[
          {type:"textMessage",text:"Bạn:Lối đi bị chặn mất rồi haizz..."},
          {who:"player",type:"walk",direction:"down"},
        ]
      }],
      [utils.asGridCoord(6,-1)] :[ {
        events:[
          {type:"textMessage",text:"Bạn:Lối đi bị chặn mất rồi haizz..."},
          {who:"player",type:"walk",direction:"down"},
        ]
      }],
      [utils.asGridCoord(7,-1)] :[ {
        events:[
          {type:"textMessage",text:"Bạn:Lối đi bị chặn mất rồi haizz..."},
          {who:"player",type:"walk",direction:"down"},
        ]
      }],
      [utils.asGridCoord(8,-1)] :[ {
        events:[
          {type:"textMessage",text:"Bạn:Lối đi bị chặn mất rồi haizz..."},
          {who:"player",type:"walk",direction:"down"},
        ]
      }],
      [utils.asGridCoord(9,-1)] :[ {
        events:[
          {type:"textMessage",text:"Bạn:Lối đi bị chặn mất rồi haizz..."},
          {who:"player",type:"walk",direction:"down"},
        ]
      }],
      [utils.asGridCoord(10,-1)] :[ {
        events:[
          {type:"textMessage",text:"Bạn:Lối đi bị chặn mất rồi haizz..."},
          {who:"player",type:"walk",direction:"down"},
        ]
      }],
 
    }

}
}