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
        health.value-=damage;
        resolve();
    }
    stand(resolve){
        const who = this.map.gameObjects[ this.event.who];
        who.startBehavior({
            map: this.map
        },{
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })
  
        const completeHandle = e => {
            if(e.detail.whoId === this.event.who){
                document.removeEventListener("PersonStandComplete", completeHandle);
                resolve();
            }
        }
        document.addEventListener("PersonStandComplete", completeHandle)
    }

    walk(resolve){
        const who = this.map.gameObjects[ this.event.who];
        who.startBehavior({
            map: this.map
        },{
            type: "walk",
            direction: this.event.direction,
            retry: true
        })
  
        const completeHandle = e => {
            if(e.detail.whoId === this.event.who){
                document.removeEventListener("PersonWalkingComplete", completeHandle);
                resolve();
            }
            
        }
        document.addEventListener("PersonWalkingComplete", completeHandle)
    }


    textMessage(resolve){
        if(this.event.faceHero){
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["player"].direction);

        }
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () =>resolve()
        })
        message.init(  document.querySelector(".game-container") )
    }
    
    changeMap(resolve) {

        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () => {
          this.map.overworld.startMap( window.OverworldMaps[this.event.map] );
          resolve();
    
          sceneTransition.fadeOut();
    
        })
      }
      changeGame(resolve)
      {
          const diachi = this.event.url;
            window.location=diachi;
          resolve();
      }
    init()
    {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }

}