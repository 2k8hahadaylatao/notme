class TextMessage{
    constructor({text, onComplete}){
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    creatElement(){
        // DOM again -_-  tạo phần tử mới cái nào 
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = ( `
        <p class="TextMessage_p"></p>
        <button class="TextMessage_button">Next    ▶▶   </buttton>
        `)

        //chạy chữ (init chữ )
        this.revealingText = new RevealingText({
            element:this.element.querySelector(".TextMessage_p"),
            text : this.text
        })

        this.element.querySelector("button").addEventListener( "click", () =>{
            //chạy xong và đóng cmn text
            this.done();
        });
        this.actionListener = new KeyPressListener("Enter", () => {

            this.done();
        })
    }
    done(){
        if(this.revealingText.isDone==true)
        {
            this.element.remove();
            this.actionListener.unbind();
            this.onComplete();
        } else {
            this.revealingText.warpToDone();
        }
    }
    init(container){
        this.creatElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }
}