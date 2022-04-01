class Firepl {
    constructor(config) {
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.sprite = new Spritefirepl({
        gameObject: this,
        src: config.src ,
      });
    }
  }