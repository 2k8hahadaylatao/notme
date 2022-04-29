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

        if( direction ==="left "){
            x=x-32;
        }else if(direction ==="right"){
            x=x+32;
        }else if(direction ==="up"){
            y=y-32;
        }else if(direction ==="down"){
            y=y+32;
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
    }
}