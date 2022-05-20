const utils={
    withGrid(n)
    {
        return n*32;
    },
    asGridCoord(x,y){
        return `${x*32},${y*32}`
    },
    nextPosition(initialX, initialY, direction)
    {
        let x=  initialX;
        let y = initialY;
        const size=32;
        if (direction === "left") { 
            x -= size;
          } else if (direction === "right") {
            x += size;
          } else if (direction === "up") {
            y -= size;
          } else if (direction === "down") {
            y += size;
          }
          return {x,y};
    },

    oppositeDirection(direction){
        if(direction ==="left"){return "right"}
        if(direction ==="right"){return "left"}
        if(direction ==="up"){return "down"}
        return "up"
    },
    emitEvent(name,detail){
        const event = new CustomEvent( name,{
            detail
        });
        document.dispatchEvent(event);
    },
    perceptionDistance(initialX, initialY, heroX, heroY){
      let x=initialX;
      let y =initialY;
      let thisX = heroX;
      let thisY = heroY;
      const size =32;
     for(let i=-2*size; i<= 2*size; i+=size){
      for(let j=-2*size; j<= 2*size; j+=size){
       if(x + i == thisX && y+ j == thisY){
         return true;
       }
      } 
     } 
    },
    attackDirection(initialX, initialY, heroX, heroY )
  {
    let x=initialX;
    let y =initialY;
    let thisX = heroX;
    let thisY = heroY;
    const size =32;
   for(let i=-2*size; i<= 2*size; i+=size){
    for(let j=-2*size; j<= 2*size; j+=size){
     if(x + i == thisX && y+ j == thisY){
        if(i<0){
          return "left"
        }
        if(i>0){
          return "right"
        }
        if(i==0 && j>0){
        return "down"}
        if(i==0 && j<0){
          return "up"
        }
        if( i==0 && j==0){
          return "up"
        }
     }
    } 
   } 
  },
  checkForGrid(initialX){
    let x=initialX;
    let tamX =x;
    if(x%32<0){
      tamX/=32;
      x+=tamX;
      return x;
    }
    if(x%32>0){
      tamX/=32;
      x-=tamX;
      return x;
    }
    if(x%32==0){
      return x;
    }
  }
}