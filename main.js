const SUPABASE_URL = 'https://spulxfwbnljpahuwpmze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwdWx4ZndibmxqcGFodXdwbXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxOTA4OTIsImV4cCI6MjA2NDc2Njg5Mn0.8_AeRUAZN8Z8JkXwR2m_63MeroPcHHwY7hLXp_5vXw8';

const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

supabaseClient.auth.onAuthStateChange((event, session) => {
  if (session) {
    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";
  } else {
    document.getElementById("auth").innerHTML = '<button onclick="login()">Zaloguj się</button>';
    document.getElementById("auth").style.display = "block";
    document.getElementById("app").style.display = "none";
  }
});

function login() {
  supabaseClient.auth.signInWithOAuth({ provider: 'github' });
}

function logout() {
  supabaseClient.auth.signOut();
}

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const list = document.getElementById("diskInfoList");
    list.innerHTML = "";

    const item = document.createElement("li");
    item.textContent = `Dodano plik: ${file.name}`;
    list.appendChild(item);
  });
});