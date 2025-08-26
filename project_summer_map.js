
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const gravity = 0.5;

canvas.width = 1600;
canvas.height = 1600;

const backgroundIMG = new Image();
backgroundIMG.src = './images/Game_MAP.jpg';

backgroundIMG.onload = () => {
//  const pattern = c.createPattern(backgroundIMG, 'no-repeat');
//  c.fillStyle = pattern;
c.drawImage(backgroundIMG,0,0,canvas.width,canvas.height);
//  c.fillRect(0, 0, 3000, 3000);
};


function backgroundCanvas(){
// c.save();
// c.scale(2,2);
// c.translate(x,y)
c.drawImage(backgroundIMG,0,0,canvas.width,canvas.height);
// c.restore();

    
}




class Player{
  constructor(collisionsBlocks){
    this.position = {
      x: 10,
      y: 20
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 40;
    this.width = 40;
    this.collisionsBlocks = collisionsBlocks;

  }

  make(){
  c.fillStyle = 'blue';
  c.fillRect(this.position.x,this.position.y,this.width,this.height);

  }

  refresh(){
    this.make();

 
  this.position.x += this.velocity.x;
  this.checkForHorizontalPosition();
  this.applyGravity();
  this.checkForVerticalPosition();

  }

  applyGravity(){
 this.position.y += this.velocity.y;
 this.velocity.y += gravity; 
  }

  checkForVerticalPosition(){
    for(let i = 0; i < this.collisionsBlocks.length ; i++){
      const currentBlock = this.collisionsBlocks[i];

      if(
        collisionDetection({player:this,block:currentBlock})
      ){
        if(this.velocity.y > 0){
          this.velocity.y = 0;
          this.position.y = currentBlock.position.y - this.height - 0.01;
          break;
        }

        if(this.velocity.y < 0){
          this.velocity.y = 0;
          this.position.y = currentBlock.position.y + currentBlock.height + 0.01;
          break;
        }
        
      }
    }
  }


    checkForHorizontalPosition(){
    for(let i = 0; i < this.collisionsBlocks.length ; i++){
      const currentBlock = this.collisionsBlocks[i];

      if(
        collisionDetection({player:this,block:currentBlock})
      ){
        if(this.velocity.x > 0){
          this.velocity.x = 0;
          this.position.x = currentBlock.position.x - this.width - 0.01;
          break;
        }

        if(this.velocity.x < 0){
          this.velocity.x = 0;
          this.position.x = currentBlock.position.x + currentBlock.width + 0.01;
          break;
        }
        
      }
    }
  }
}

const player = new Player(collisionsBlocks);


const keys = {
  d:{
    preesed: false 
  },
  a:{
    preesed: false 
  }
}


function loop(){
  window.requestAnimationFrame(loop);
  c.clearRect(0, 0, canvas.width, canvas.height);
  // c.save();
  // c.scale(2,2);
  backgroundCanvas();
  
  // collisionsBlocks.forEach(block =>{
  //   block.update();
  // });
  // c.restore()


  player.refresh();

  
  
  player.velocity.x = 0;
  if(keys.d.preesed){
    player.velocity.x = 8;
  }else if(keys.a.preesed){
    player.velocity.x = -8;
  }
  

}
loop();

window.addEventListener("keydown",(event) => {
  switch(event.key){
    case 'd':
      keys.d.preesed = true;
      break;
      case 'a':
      keys.a.preesed = true;
      break;
      case 'w':
      player.velocity.y = -15
      break;
  }
  
})

window.addEventListener("keyup",(event) => {
  switch(event.key){
    case 'd':
      keys.d.preesed = false;
      break;
      case 'a':
      keys.a.preesed = false;
      break;
  }
  
})
