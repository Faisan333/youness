// ---------------- ELEMENTS ----------------
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.querySelector(".toggle-password");
const error = document.getElementById("error");
const spinner = document.getElementById("spinner");
const remember = document.getElementById("remember");
const strengthBar = document.getElementById("strength");
const strengthText = document.getElementById("strengthText");
const themeIcon = document.getElementById("themeIcon");

// Forgot password modal
const forgotLink = document.getElementById("forgotPasswordLink");
const modal = document.getElementById("forgotModal");
const closeModal = document.querySelector(".modal .close");
const sendReset = document.getElementById("sendReset");
const resetMessage = document.getElementById("resetMessage");
const resetPasswordInput = document.getElementById("resetPassword");
const resetStrength = document.getElementById("resetStrength");
const resetStrengthText = document.getElementById("resetStrengthText");

// ---------------- INITIAL PASSWORD SETUP ----------------
if(!localStorage.getItem("userPassword")){
  localStorage.setItem("userPassword","1234");
}

// Remembered username
if(localStorage.getItem("rememberedUser")){
  emailInput.value = localStorage.getItem("rememberedUser");
  remember.checked = true;
}

// ---------------- DARK/LIGHT MODE ----------------
document.body.classList.add("dark"); // default
themeIcon.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  themeIcon.name = document.body.classList.contains("dark") ? "moon-outline" : "sunny-outline";
});

// ---------------- PASSWORD TOGGLE ----------------
togglePassword.addEventListener("click", ()=>{
  if(passwordInput.type === "password"){
    passwordInput.type = "text";
    togglePassword.name = "eye-off-outline";
  } else {
    passwordInput.type = "password";
    togglePassword.name = "eye-outline";
  }
});

// ---------------- PASSWORD STRENGTH ----------------
function updateStrength(val, bar, textEl){
  let width = 0, strength = "";
  if(val.length >= 1) { width=20; strength="Very Weak"; }
  if(val.length >= 4) { width=40; strength="Weak"; }
  if(val.length >= 7) { width=70; strength="Medium"; }
  if(val.length >= 10) { width=100; strength="Strong"; }
  bar.innerHTML = `<div style="width:${width}%;background:${width<70?'red':'yellowgreen'};"></div>`;
  textEl.innerText = strength;
}
passwordInput.addEventListener("input", ()=>updateStrength(passwordInput.value, strengthBar, strengthText));
resetPasswordInput.addEventListener("input", ()=>updateStrength(resetPasswordInput.value, resetStrength, resetStrengthText));

// ---------------- LOGIN LOGIC ----------------
loginForm.addEventListener("submit", function(e){
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const savedPassword = localStorage.getItem("userPassword"); // get stored password

  spinner.style.display = "block";
  error.style.opacity = 0;

  setTimeout(()=>{
    spinner.style.display = "none";

    // LOGIN CHECK
    if(email === "younes123" && password === "1234" || password === savedPassword){
      // Remember username if checked
      if(remember.checked) localStorage.setItem("rememberedUser", email);
      else localStorage.removeItem("rememberedUser");

      localStorage.setItem("isLoggedIn","true");
      localStorage.setItem("userEmail", email);

      // Login success
      loginForm.innerHTML = "<h2 style='color:lime;text-align:center;'>Login Successful! 🎉</h2>";
      setTimeout(()=> window.location.href="accounts.html", 800);
    } else {
      error.innerText = "Invalid username or password!";
      error.style.opacity = 1;
    }

  },1000);
});

// ---------------- FORGOT PASSWORD MODAL ----------------
forgotLink.addEventListener("click", (e)=>{
  e.preventDefault();
  modal.style.display = "block";
  resetMessage.innerText = "";
  resetPasswordInput.value = "";
  resetStrength.innerHTML = "";
  resetStrengthText.innerText = "";
});

closeModal.addEventListener("click", ()=>{ modal.style.display="none"; });
window.addEventListener("click", (e)=>{ if(e.target==modal) modal.style.display="none"; });

// Save new password
sendReset.addEventListener("click", ()=>{
  const newPass = resetPasswordInput.value.trim();
  if(newPass.length < 4){
    resetMessage.innerText = "Password must be at least 4 characters!";
    resetMessage.style.color = "red";
    return;
  }
  localStorage.setItem("userPassword", newPass);
  resetMessage.innerText = "Password updated successfully!";
  resetMessage.style.color = "green";
  setTimeout(()=> modal.style.display="none",1500);
});
