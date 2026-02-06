/* SIDEBAR */
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const overlay = document.getElementById("overlay");

toggleBtn.onclick = () => {
  window.innerWidth <= 768
    ? (sidebar.classList.toggle("show"), overlay.classList.toggle("show"))
    : sidebar.classList.toggle("collapsed");
};
overlay.onclick = () => {
  sidebar.classList.remove("show");
  overlay.classList.remove("show");
};

/* LOGIN CHECK */
if(localStorage.getItem("isLoggedIn") !== "true"){
  window.location.href = "index.html";
}

/* LOGOUT */
document.getElementById("logoutLink").onclick =
document.getElementById("logoutLinks").onclick = () => {
  localStorage.setItem("isLoggedIn", "false");
localStorage.removeItem("userEmail");
  window.location.href = "index.html";
};

/* PROFILE */
const profileIcon = document.getElementById("profileIcon");
const dropdownMenu = document.getElementById("dropdownMenu");
profileIcon.onclick = e => {
  e.stopPropagation();
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
};
window.onclick = () => dropdownMenu.style.display = "none";

/* VIEW SWITCH */
dashboardBtn.onclick = () => {
  dashboardView.style.display = "block";
  accountsView.style.display = "none";
};
accountsBtn.onclick = () => {
  dashboardView.style.display = "none";
  accountsView.style.display = "block";
};




function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2,'0');
  const seconds = now.getSeconds().toString().padStart(2,'0');
  const clock = document.getElementById("clock");
  const date = document.getElementById("date");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
  date.innerText = now.toDateString();

  // Greeting based on time
  const greeting = document.getElementById("greeting");
  if(hours < 12) greeting.innerText = "Good Morning!";
  else if(hours < 18) greeting.innerText = "Good Afternoon!";
  else greeting.innerText = "Good Evening!";
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock();

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleTodo(${index})">${todo.text}</span>
      <div class="todo-actions">
        <i class="fa fa-trash" onclick="deleteTodo(${index})"></i>
      </div>
    `;

    list.appendChild(li);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById("todoInput");
  if (input.value.trim() === "") return;

  todos.push({ text: input.value, completed: false });
  input.value = "";
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Load todos on page load
renderTodos();
