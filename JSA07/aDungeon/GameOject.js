class GameObject{
    constructor(config /*value1,value2*/) {
        this.x=config.x || 0;
        this.y=config.y || 0;
        this.sprite= new Sprite(
            {
                gameObject:this,
                src: config.src || "/images/characters/rouge.png",
            }
        );
    }
}