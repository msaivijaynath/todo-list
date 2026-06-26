let todos = JSON.parse(localStorage.getItem("todos")) || [];
let task = document.querySelector("#task");
let add = document.querySelector("#addbtn");
let list = document.querySelector(".ultasks");
let numtask = document.querySelector("#numtask");
let comtask = document.querySelector("#comtask");
let num = 0;
let com = 0;

function updateCounts() {
  num = todos.length;
  com = todos.filter((todo) => todo.completed).length;

  numtask.textContent = `tasks : ${num}`;
  comtask.textContent = `completed : ${com}`;
}

function addelement() {
  if (task.value !== "") {
    let tasks = {
      id: Date.now(),
      input: task.value,
      completed: false,
    };
    todos.push(tasks);
    localStorage.setItem("todos", JSON.stringify(todos));

    let li = document.createElement("li");
    li.innerHTML = `
    <span>${tasks.input}</span>
    <button class="completed">✓</button>
    <button class="remove">Remove</button>
`;
    li.id = tasks.id;

    list.appendChild(li);
    task.value = "";
    updateCounts();
  }
}
list.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove")) {
    let id = Number(event.target.parentElement.id);
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));

    event.target.parentElement.remove();
    updateCounts();
  }
});
list.addEventListener("click", function (event) {
  if (event.target.classList.contains("completed")) {
    let li = event.target.parentElement;
    let id = Number(li.id);
    let todo = todos.find((todo) => todo.id === id);
    if (!todo) return;
    todo.completed = !todo.completed;
    li.classList.toggle("completed-line-through");
    localStorage.setItem("todos", JSON.stringify(todos));
    updateCounts();
  }
});

add.addEventListener("click", addelement);

task.addEventListener("keydown", function (dets) {
  if (dets.key == "Enter") {
    addelement();
  }
});

function render() {
  list.innerHTML = "";

  todos.forEach((element) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span>${element.input}</span>
      <div>
        <button class="completed">✓</button>
        <button class="remove">✕</button>
      </div>
    `;
    li.id = element.id;
    if (element.completed) {
      li.classList.add("completed-line-through");
    }
    list.appendChild(li);
  });
  updateCounts();
}

window.addEventListener("DOMContentLoaded", function () {
  render();
});
