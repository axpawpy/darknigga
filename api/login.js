const BIN_ID = "686253b98a456b7966b89878";
const API_KEY = "$2a$10$nGcA/jmTjVr1ZWe7ZvnsxOpDpX6PG15SmepqlVOqcSAOGDwU62x8G";
const headers = {
  "Content-Type": "application/json",
  "X-Master-Key": API_KEY
};

async function getUsers() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, { headers });
  const data = await res.json();
  return data.record;
}

function saveSession(user) {
  sessionStorage.setItem("currentUser", JSON.stringify(user));
}

function getSession() {
  return JSON.parse(sessionStorage.getItem("currentUser"));
}

function logout() {
  sessionStorage.removeItem("currentUser");
  location.reload();
}

async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const result = document.getElementById("login-result");
  const users = await getUsers();
  const found = users.find(u => u.username === user && u.password === pass);

  if (found) {
    saveSession(found);
    showDashboard(found);
  } else {
    result.innerText = "❌ Username atau Password salah!";
    result.style.color = "crimson";
  }
}

function showDashboard(user) {
  document.getElementById("login-box").style.display = "none";
  document.getElementById("main-box").style.display = "block";
  document.getElementById("userLabel").innerText = user.username;
}

window.onload = () => {
  const user = getSession();
  if (user) showDashboard(user);
};
