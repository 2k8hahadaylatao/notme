class OverworldEvent {
    constructor({map,event,url,hp,damage }){
        this.map =map;
        this.event = event;
        this.url= url;
        this.hp = hp;
        this.damage = damage;
    }
    damaged(resolve)
    {
        let health= document.querySelector("#hp");
        let damage=Number(this.event.damage);
        console.log(damage);
        health.value-=damage;
        if(health.value <=0 ){
            window.location="http://127.0.0.1:5500/index.html";
        }
        resolve();
    }
    stand(resolve) {
      const who = this.map.gameObjects[ this.event.who ];
      who.startBehavior({
        map: this.map
      }, {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time
      })
      
      //Set up a handler to complete when correct person is done walking, then resolve the event
      const completeHandler = e => {
        if (e.detail.whoId === this.event.who) {
          document.removeEventListener("PersonStandComplete", completeHandler);
          resolve();
        }
      }
      document.addEventListener("PersonStandComplete", completeHandler)
    }
  
    walk(resolve) {
      const who = this.map.gameObjects[ this.event.who ];
      who.startBehavior({
        map: this.map
      }, {
        type: "walk",
        direction: this.event.direction,
        retry: true
      })
  
      //Set up a handler to complete when correct person is done walking, then resolve the event
      const completeHandler = e => {
        if (e.detail.whoId === this.event.who) {
          document.removeEventListener("PersonWalkingComplete", completeHandler);
          resolve();
        }
      }
      document.addEventListener("PersonWalkingComplete", completeHandler)
  
    }
    
      textMessage(resolve) {
    
        if (this.event.faceHero) {
          const obj = this.map.gameObjects[this.event.faceHero];
          obj.direction = utils.oppositeDirection(this.map.gameObjects["player"].direction);
        }
    
        const message = new TextMessage({
          text: this.event.text,
          onComplete: () => resolve()
        })
        message.init( document.querySelector(".game-container") )
      }
    
      changeMap(resolve) {
    
        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () => {
          this.map.overworld.startMap( window.OverworldMaps[this.event.map] );
          resolve();
    
          sceneTransition.fadeOut();
    
        })
      }
      canWalk(resolve){
        localStorage.setItem("done","false");
        resolve();
      }
      changeGame(resolve)
      {
        setTimeout(() => {
          localStorage.setItem("done","false")
        }, 10000);
          const diachi = this.event.url;
          window.open(diachi,'_blank');
          resolve();
      }
    init()
    {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }

}