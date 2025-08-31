const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const gravity = 0.5;

canvas.width = 1620;
canvas.height = 1620;

const startx = canvas.width /2;
const starty = canvas.height /2;
const playerSpeed = canvas.width * 0.003;

const backgroundIMG = new Image();
backgroundIMG.src = './images/Game_MAP.jpg';
const selectedPlayerIndex = parseInt(localStorage.getItem("selectedPlayer"));


const images_spirt= ["images/eli_spirt_end.png","images/elishive_spirt_end1.png","images/spirt_hazout.png","images/kirl_spirt_end.png","images/shay_spirt_end.png"]



backgroundIMG.onload = () => {
  //  const pattern = c.createPattern(backgroundIMG, 'no-repeat');
  //  c.fillStyle = pattern;
  c.drawImage(backgroundIMG,0,0,canvas.width,canvas.height);
  //  c.fillRect(0, 0, 3000, 3000);
};


function backgroundCanvas(){
  c.drawImage(backgroundIMG,0,0,canvas.width,canvas.height); 
}




class Player{
  constructor(collisionsBlocks){
    this.height = 30;
    this.width = 30;
    this.position = {
      x: 30,
      y: starty - this.height/2 + 200
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.collisionsBlocks = collisionsBlocks;
    this.cameraBox = {
      position: {
        x:this.position.x,
        y:this.position.y
      },
      width: 256,
      height: 80
    }

    this.image = new Image();
    const selectedPlayer = localStorage.getItem("selectedPlayer") ;
    this.image.src = images_spirt[parseInt(selectedPlayer) - 1];
    this.frameX = 0;
    this.frameY = 0;
    this.onGround = false;
    this.direction = "left";
    this.frameCounter = 0;
    
  }

make() {
//   c.fillStyle = 'blue';
//  c.fillRect(this.position.x, this.position.y, this.width, this.height);
      if (!this.onGround) {
    // קפיצה
    this.frameX = 1;   // עמודת JUMP
    this.frameY = 0;   // שורה ראשונה
  } else if (this.velocity.x !== 0) {
    // הליכה
    this.frameY = 0;   // שורה ראשונה
    this.frameCounter++;
    if (this.frameCounter % 15 === 0) { // קצת יותר איטי
      this.frameX = (this.frameX + 1) % 2; // יש 2 פריימים להליכה
    }
  } else {
    // עומד (idle)
    this.frameX = 0;
    this.frameY = 0;
  }

    c.save();


    const spriteWidth = 64;   // הגודל של כל פריים בתמונה
    const spriteHeight = 64;  // הגובה של כל פריים בתמונה

    if (this.direction === "right") {
            c.scale(-1, 1);
      c.drawImage(
        this.image,
        this.frameX * spriteWidth,
        this.frameY * spriteHeight,
        spriteWidth,
        spriteHeight,
        -this.position.x - this.width,
        this.position.y,
        this.width,
        this.height
      );


      // הפיכת הדמות לצד שמאל

    } else {
      c.drawImage(
        this.image,
        this.frameX * spriteWidth,
        this.frameY * spriteHeight,
        spriteWidth,
        spriteHeight,
        this.position.x,
        this.position.y,
        this.width,
        this.height

     
      );
    }

    c.restore();
}
  
  cameraToLeft({canvas, camera}){
    this.refreshCameraBox();
    const cameraBoxRight = this.cameraBox.position.x + this.cameraBox.width;
    const scaledCanvas = camera.position.x + (canvas.width / 2) - 100;
    if(camera.position.x + scaledCanvas >= backgroundIMG.width + 900) return
    if(cameraBoxRight >= scaledCanvas){
      console.log('right');
      camera.position.x += this.velocity.x;
    }
    
  }
cameraToRight({ canvas, camera }) {
  this.refreshCameraBox();
  const cameraBoxLeft = this.cameraBox.position.x;
  const leftBoundary = camera.position.x + canvas.width * 0.2;
  
  // Only move camera if player is pushing past the left boundary
  if (cameraBoxLeft < leftBoundary) {
    camera.position.x += this.velocity.x;
    
    // Clamp to left edge
    if (camera.position.x < 0) {
      camera.position.x = 0;
    }
  }
}

cameraPanUp({ canvas, camera }) {
  this.refreshCameraBox();

  const cameraBoxTop = this.cameraBox.position.y;
  const topBoundary = camera.position.y + canvas.height * 0.25;

  if (camera.position.y <= 0) return;

  if (cameraBoxTop < topBoundary) {
    const moveY = this.velocity.y !== 0 ? this.velocity.y : -2;
    camera.position.y += moveY;

    if (camera.position.y < 0) {
      camera.position.y = 0;
    }
  }
}

cameraPanDown({ canvas, camera }) {
  this.refreshCameraBox();

  const cameraBoxBottom = this.cameraBox.position.y + this.cameraBox.height;
  const bottomBoundary = camera.position.y + (canvas.height / 2) * 0.75;

  const worldHeight = canvas.height * 2;

  // Clamp at bottom of map
  if (camera.position.y + canvas.height >= worldHeight) return;

  if (cameraBoxBottom > bottomBoundary) {
    // Always move camera down (positive direction)
    const moveY = Math.abs(this.velocity.y) || 2;
    camera.position.y += moveY;

    // Clamp to bottom edge
    if (camera.position.y + canvas.height > worldHeight) {
      camera.position.y = worldHeight - canvas.height;
    }
  }
}

  
  refreshCameraBox(){
    this.cameraBox = {
      position: {
        x:this.position.x - 115,
        y:this.position.y - 20
      },
      width: 256,
      height: 80
    }
    // c.fillStyle = 'rgba(0,0,255,0.2)';
    // c.fillRect(this.cameraBox.position.x,this.cameraBox.position.y,this.cameraBox.width,this.cameraBox.height);
  }
  
  refresh(){
    this.make();
    this.refreshCameraBox();
    
    
    
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

const camera = {
  position: {
    x:0,
    y:360
  }
};

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
  player.velocity.x = 0;
  if(keys.d.preesed){
    player.velocity.x = playerSpeed;
    player.cameraToLeft({canvas,camera});
  }else if(keys.a.preesed){
    player.velocity.x = -playerSpeed;
    player.cameraToRight({canvas,camera});
    // player.moveLeft();
  }

if (player.velocity.y < 0) {
  player.cameraPanUp({ canvas, camera });
} if (player.velocity.y > 0) {
  player.cameraPanDown({ canvas, camera });
}


  c.clearRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.scale(2,2);
  c.translate(-camera.position.x,-camera.position.y)
  backgroundCanvas();
  player.refresh();
  // collisionsBlocks.forEach(block =>{
  //   block.update();
  // });
  c.restore()


}
loop();

window.addEventListener("keydown",(event) => {
  switch(event.key){
    case 'd':
      keys.d.preesed = true;
      player.direction = "left";
      break;
      case 'a':
      keys.a.preesed = true;
      player.direction = "right";
      break;
      case 'w':
      player.velocity.y = -12;
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
