// בחירת אלמנט השחקן מה-HTML
const player = document.getElementById("player");

// מיקום נוכחי של השחקן
let posX = 0;       // המיקום האופקי הנוכחי (שמאל-ימין)
let posY = 1825;    // המיקום האנכי הנוכחי (למעלה-למטה)

// מיקום יעד של השחקן - לאן הוא אמור להגיע
let targetX = posX;
let targetY = posY;

// מהירות תנועה - כמה פיקסלים לזוז בכל פריים
const moveSpeed = 5;

/*
פונקציה שמעדכנת את מיקום השחקן בפועל על המסך
באמצעות שינוי left ו-top של ה-div
*/
function updatePlayerPosition() {
  player.style.left = posX + "px"; // קובע את המיקום האופקי של השחקן
  player.style.top = posY + "px";  // קובע את המיקום האנכי של השחקן
  centerOnPlayer();                // מזיז את המסך כך שהשחקן יהיה במרכז
}

/*
פונקציה שמגלגלת (scroll) את המסך כך שהשחקן יישאר במרכז המסך
*/
function centerOnPlayer() {
  const scrollX = posX - window.innerWidth / 2 + 25;   // חישוב מיקום אופקי של גלילה (25 = חצי גודל שחקן)
  const scrollY = posY - window.innerHeight / 2 + 25;  // חישוב מיקום אנכי של גלילה
  window.scrollTo(scrollX, scrollY);                   // מבצע גלילה של המסך לפי המיקום המחושב
}

/*
פונקציית האנימציה הראשית שרצה כל הזמן
ומעדכנת את המיקום של השחקן בכל פריים – תנועה חלקה לעבר היעד
*/
function animate() {
  // תזוזה אופקית חלקה לעבר היעד
  if (Math.abs(targetX - posX) > moveSpeed) {
    posX += (targetX > posX) ? moveSpeed : -moveSpeed;
  } else {
    posX = targetX; // ברגע שהגענו מספיק קרוב, עצור בדיוק ביעד
  }

  // תזוזה אנכית חלקה לעבר היעד
  if (Math.abs(targetY - posY) > moveSpeed) {
    posY += (targetY > posY) ? moveSpeed : -moveSpeed;
  } else {
    posY = targetY;
  }

  updatePlayerPosition();       // עדכון מיקום שחקן בפועל
  requestAnimationFrame(animate); // קריאה חוזרת לאנימציה לפריים הבא
}

/*
מאזין ללחיצות מקשים מהמשתמש – חצים במקלדת
כל לחיצה משנה את יעד המיקום של השחקן
*/
window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      targetY -= 10; // תזוזה כלפי מעלה
      break;
    case "ArrowDown":
      targetY += 10; // תזוזה כלפי מטה
      break;
    case "ArrowLeft":
      targetX -= 10; // תזוזה שמאלה
      break;
    case "ArrowRight":
      targetX += 10; // תזוזה ימינה
      break;
  }
});

// התחלת האנימציה (קריאה ראשונה)
animate();
