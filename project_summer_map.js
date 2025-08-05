const player = document.getElementById("player");
    let x = 0, y = 1825; 
    const speed =10; 
    function updatePlayerPosition() {
      player.style.left = x + "px";
      player.style.top = y + "px";
      centerOnPlayer();
    }
    function centerOnPlayer() {
      const scrollX = x - window.innerWidth / 2 + 25;
      const scrollY = y - window.innerHeight / 2 + 25;
      window.scrollTo(scrollX, scrollY);
    }
    window.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowUp":
          y -= speed;
          break;
        case "ArrowDown":
          y += speed;
          break;
        case "ArrowLeft":
          x -= speed;
          break;
        case "ArrowRight":
          x += speed;
          break;
      }
      updatePlayerPosition();
    });
    updatePlayerPosition();