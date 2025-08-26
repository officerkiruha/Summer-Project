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




collisionsMap=[]
for(let i =0;i<collisions.length;i +=160){
collisionsMap.push(collisions.slice(i,i+160))
};

const collisionsBlocks = [];
collisionsMap.forEach((row,y) => {
   row.forEach((Symbol,x) =>{
      if(Symbol != 0){
         collisionsBlocks.push(new collisionsBlock({
            position:{
               x: x * 10,
               y: y * 10,
            }
         }))
      }
   })
   
});

function collisionDetection({player,block}){
return (
        player.position.y + player.height >= block.position.y &&
        player.position.y <= block.position.y + block.height &&
        player.position.x <= block.position.x + block.width &&
        player.position.x + player.width >= block.position.x
)
}

