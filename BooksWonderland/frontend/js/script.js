// js/script.js
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("nav");
    fetch("../backend/logic/menuHandler.php")
      .then(res => res.text())
      .then(html => nav.innerHTML = html);
  });
  