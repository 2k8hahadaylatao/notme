class RevealingText{
    constructor(config){
        this.element = config.element;
        this.text=config.text;
        this.speed=config.speed || 25;

        this.timeout = null;
        this.isDone= false;
    }

    revealOneCharacter(list){
        const next = list.splice(0,1)[0];
        next.span.classList.add("revealed");
        //Nhớ set time 
        if(list.length >0){
             this.timeout = setTimeout(()=>{
                this.revealOneCharacter(list)
             },next.delayAfter)
        }else{
            this.isDone = true;
        }
    }

    warpToDone(){
        clearTimeout(this.timeout);
        this.isDone = true;
        this.element.querySelectorAll("span").forEach( s =>{
            s.classList.add("revealed");
        })
    }

    init(){
        let characters =[];
        this.text.split("").forEach(character => {

            //Áp dụng DOM
            let span = document.createElement("span");
            span.textContent = character;
            this.element.appendChild(span);

            // Đưa span vào mảng của state React thực thụ và khá khó 
            characters.push({
                span,
                delayAfter: character === " " ? 0 : this.speed
            })
        })

        this.revealOneCharacter(characters);

    }
}