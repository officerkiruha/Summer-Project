
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const gravity = 0.5;

canvas.width = 3024;
canvas.height = 1720;

const backgroundIMG = new Image();
backgroundIMG.src = './Hell.jpg';

backgroundIMG.onload = () => {
 const pattern = c.createPattern(backgroundIMG, 'no-repeat');
 c.fillStyle = pattern;
 c.fillRect(0, 0, 3000, 3000);
};


function backgroundCanvas(){
  const pattern = c.createPattern(backgroundIMG, 'no-repeat');
    c.fillStyle = pattern;
    c.fillRect(0, 0, 3000, 3000);
    
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
  c.fillStyle = 'red';
  c.fillRect(this.position.x,this.position.y,400,this.height);

  }

  refresh(){
    this.make();

  this.position.y += this.velocity.y;
  this.position.x += this.velocity.x;
  
  if(this.position.y + this.height + this.velocity.y < canvas.height){
   this.velocity.y += gravity; 
  }else{
    this.velocity.y = 0;
  };


  }
}

const player = new Player();


function loop(){
  window.requestAnimationFrame(loop);
  backgroundCanvas();
  player.refresh();

}
loop();

window.addEventListener("keydown",(event) => {
  switch(event.key){
    case 'd':
      player.velocity.x = 1;
      break;
      case 'a':
      player.velocity.x = -1;
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