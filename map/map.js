
collisionsMap=[]
for(let i =0;i<collisions.length;i +=160){
collisionsMap.push(collisions.slice(i,i+160))
};

const collisionsBlocks = [];
collisionsMap.forEach((row,y) => {
   row.forEach((Symbol,x) =>{
      if(Symbol != 0){
         console.log('draw a block here')
         collisionsBlocks.push(new collisionsBlock({
            position:{
               x: x * 10,
               y: y * 10,
            }
         }))
      }
   })
   
});
console.log(collisionsBlocks)

console.log(collisionsMap)


//עד 1:23:44
//מפה צריך לייצר גם בשאר הקוד כמו ANIMETION




/*for(let i = 0; i < collisions.length;i+=135){
   collisionsMap.push(collisions.slice(i,135+i));
}
class Boundary{
   static width = 48
   static height = 48 

   constructor({position}){
      this.position = position
      this.width = 48
      this.height = 48
   }
   
   draw() {
          c.fillStyle='red';
          c.fillRect(this.position.x,this.position.y,this.width,this.height)
   }
};

const boundaries = [];
collisionsMap.ForEach((row,i)=> {
   row.ForEach((Symbol,j) => {
      if(Symbol===1025 )
      boundaries.push(
         new Boundary({
            position:{
               x: j * Boundary.width,
               y: i * Boundary.height
            }
         })
      )
   })
})*/

const image = new Image()
image.src='Map.jpg'

/*const PlayerImage = new Image();
PlayerImage.src='Wallforblock.png';*/

image.onload = () => {
   c.drawImage(image,0,-1100) 
 /*  c.drawImage(
      PlayerImage,
      //0,
      //0,
      //0,
      //0,
      0,140
   );*/ 
}
