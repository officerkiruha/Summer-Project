// אלמנטים מהדף
const playBtn = document.getElementById("button-play");
const playerSelectModal = document.getElementById("playerSelectModal");
const nameModal = document.getElementById("nameModal");
const loadingScreen = document.getElementById("loadingScreen");
const confirmPlayerBtn = document.getElementById("confirmPlayer");
const submitNameBtn = document.getElementById("submitName");
const input = document.getElementById("usernameInput");
const tableBody = document.getElementById("playersBody");

let selectedPlayer = null;

// ----- פתיחת חלון בחירת שחקן -----
playBtn.addEventListener("click", () => {
  playerSelectModal.style.display = "flex";
});

// ----- בחירת שחקן -----
document.querySelectorAll(".player-grid img").forEach(img => {
  img.addEventListener("click", () => {
    document.querySelectorAll(".player-grid img").forEach(i => i.classList.remove("selected"));
    img.classList.add("selected");
    selectedPlayer = img.dataset.player;
  });
});

// ----- המשך אחרי בחירת שחקן -----
confirmPlayerBtn.addEventListener("click", () => {
  if (!selectedPlayer) {
    alert("בחר שחקן!");
    return;
  }
localStorage.setItem("selectedPlayer", selectedPlayer);

  playerSelectModal.style.display = "none";
  nameModal.style.display = "flex";
});

// ----- הכנסת שם והצגת טבלה -----
submitNameBtn.addEventListener("click", () => {
  const username = input.value.trim();
  if (!username) {
    alert("נא להזין שם");
    return;
  }

  // שמור את השם ב-localStorage
  localStorage.setItem("playerName", username);

  // הצג בטבלה במסך טעינה
  const row = document.createElement("tr");
  row.innerHTML = `<td>${username}</td><td>${new Date().toLocaleTimeString()}</td>`;
  tableBody.innerHTML = ""; // נקה קודם
  tableBody.appendChild(row);

  nameModal.style.display = "none";
  loadingScreen.style.display = "flex";

  // מעבר לדף הבא אחרי 5 שניות
  setTimeout(() => {
    window.location.href = "../project_summer.html"; // לשנות לכתובת הדף שלך
  }, 5000);
});
