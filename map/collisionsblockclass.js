class collisionsBlock{
   constructor({position}){
      this.position = position;
      this.width=10;
      this.height=10;
   }
   draw(){
      c.fillStyle = 'rgba(255,0,0,0.5)';
      c.fillRect(this.position.x,this.position.y,this.width,this.height)
   }
   update(){
      this.draw()
   }
}