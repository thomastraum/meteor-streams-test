class mouseSprite {
  constructor(id) {
    this.id = id;
    this.createSprite();
  }

  createSprite(){
    this.sprite = document.createElement("div");
    this.sprite.setAttribute("id", this.id);
    this.sprite.setAttribute("class", "sprite");
    document.body.appendChild(this.sprite);
    console.log(this.sprite);
  }

  moveSprite(x,y) {
    this.sprite.style.transform = `translate(${x}px,${y}px)`;
  }

  deleteMe(){
    console.log('delete',  this.id);
    const element = document.getElementById(this.id);
    document.body.removeChild(element);
  }

}

export { mouseSprite };
