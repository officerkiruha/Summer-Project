const playBtn = document.getElementById("button-play");
const modal = document.getElementById("nameModal");
const submitBtn = document.getElementById("submitName");
const input = document.getElementById("usernameInput");
const tableBody = document.getElementById("playersBody");
const loadingScreen = document.getElementById("loadingScreen");

playBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

submitBtn.addEventListener("click", () => {
  const name = input.value.trim();
  if (name !== "") {
    // שמור את השם ב-localStorage
    localStorage.setItem("playerName", name);

    // הצג בטבלה במסך טעינה
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.textContent = name;
    row.appendChild(cell);
    tableBody.innerHTML = ""; // נקה קודם
    tableBody.appendChild(row);

    // מעבר בין חלונות
    modal.style.display = "none";
    loadingScreen.style.display = "block";

    // המתן 5 שניות ואז עבור למשחק
    setTimeout(() => {
      window.location.href = "project_summer.html";
    }, 5000);
  } else {
    alert("נא להזין שם");
  }
});
