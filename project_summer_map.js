
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const gravity = 0.5;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const backgroundIMG = new Image();
backgroundIMG.src = './Hell.jpg';

backgroundIMG.onload = () => {
//  const pattern = c.createPattern(backgroundIMG, 'no-repeat');
//  c.fillStyle = pattern;
c.drawImage(backgroundIMG,0,0,canvas.width,canvas.height);
//  c.fillRect(0, 0, 3000, 3000);
};


function backgroundCanvas(){
// c.save();
// c.scale(2,2);
c.drawImage(backgroundIMG,0,0,canvas.width,canvas.height);
// c.restore();

    
}




class Player{
  constructor(){
    this.position = {
      x: 10,
      y: 20
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;

  }

  make(){
  c.fillStyle = 'blue';
  c.fillRect(this.position.x,this.position.y,400,this.height);

  }

  refresh(){
    this.make();

  this.position.y += this.velocity.y;
  this.position.x += this.velocity.x;
  
  if(this.position.y + this.height + this.velocity.y < canvas.height ){
   this.velocity.y += gravity; 
  }else{
    this.velocity.y = 0;
  };


  }
}

const player = new Player();

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
  backgroundCanvas();
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




















































































// const player = document.getElementById("player");
//     let x = 0, y = 1825; 
//     const speed =10; 
//     function updatePlayerPosition() {
//       player.style.left = x + "px";
//       player.style.top = y + "px";
//       centerOnPlayer();
//     }
//     function centerOnPlayer() {
//       const scrollX = x - window.innerWidth / 2 + 25;
//       const scrollY = y - window.innerHeight / 2 + 25;
//       window.scrollTo(scrollX, scrollY);
//     }
//     window.addEventListener("keydown", function (e) {
//       switch (e.key) {
//         case "ArrowUp":
//           y -= speed;
//           break;
//         case "ArrowDown":
//           y += speed;
//           break;
//         case "ArrowLeft":
//           x -= speed;
//           break;
//         case "ArrowRight":
//           x += speed;
//           break;
//       }
//       updatePlayerPosition();
//     });
//     updatePlayerPosition();