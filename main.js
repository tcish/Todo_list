const input = document.querySelector(".todo-input")
const error = document.querySelector(".error")
const add = document.querySelector(".todo-button")
const list = document.querySelector(".todo-list")
const filter = document.querySelector(".filter-todo")

add.addEventListener("click", addTodo)
list.addEventListener("click", doneTodo)
filter.addEventListener("click", filterTodo)

function addTodo(e) {
  e.preventDefault()

  if (input.value != "") {
    // create todo div
    const div = document.createElement("div")
    div.classList.add("todo")
    // create todo list
    const li = document.createElement("li")
    li.classList.add("todo-item")
    li.innerText = input.value
  
    // save in local storage
    memory(input.value)
    
    div.appendChild(li)
    input.value = ""
  
    // create todo check
    const checkBtn = document.createElement("button")
    checkBtn.classList.add("complete-btn")
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`
    div.appendChild(checkBtn)
  
    // create todo delete
    const delBtn = document.createElement("button")
    delBtn.classList.add("trash-btn")
    delBtn.innerHTML = `<i class="fas fa-trash"></i>`
    div.appendChild(delBtn)
  
    list.appendChild(div)
  }else {
    error.style.transform = "translateX(0)"
    error.style.display = "block"
    setTimeout(() => {
      error.style.transform = "translateX(280px)"
      // error.style.display = "none"
    }, 2500);
  }
}

function doneTodo(e) {
  const item = e.target

  if (item.classList[0] == "complete-btn") {
    const todoDiv = item.parentElement
    todoDiv.classList.toggle("completed")
  }else {
    const todoDiv = item.parentElement
    todoDiv.classList.add("fall")
    todoDiv.addEventListener("transitionend", () => {
      todoDiv.remove()
    })

    removeLocalTodos(todoDiv)
  }
}

function memory(createTodoData) {
  let dataArr
  if (localStorage.getItem("todoData") == null) {
    dataArr = []
  }else {
    dataArr = JSON.parse(localStorage.getItem("todoData"))
  }
  dataArr.push(createTodoData)
  localStorage.setItem("todoData", JSON.stringify(dataArr))
}

function getLocalTodo() {
  const getTodo = JSON.parse(localStorage.getItem("todoData"))

  if(!getTodo) return
  
  getTodo.forEach((todos) => {
    // create todo div
  const div = document.createElement("div")
  div.classList.add("todo")
  // create todo list
  const li = document.createElement("li")
  li.classList.add("todo-item")
  li.innerText = todos
  
  div.appendChild(li)
  input.value = ""

  // create todo check
  const checkBtn = document.createElement("button")
  checkBtn.classList.add("complete-btn")
  checkBtn.innerHTML = `<i class="fas fa-check"></i>`
  div.appendChild(checkBtn)

  // create todo delete
  const delBtn = document.createElement("button")
  delBtn.classList.add("trash-btn")
  delBtn.innerHTML = `<i class="fas fa-trash"></i>`
  div.appendChild(delBtn)

  list.appendChild(div)
  });
}

document.addEventListener("DOMContentLoaded", getLocalTodo)

function removeLocalTodos(localTodoData) {
  let dataArr
  if (localStorage.getItem("todoData") == null) {
    dataArr = []
  }else {
    dataArr = JSON.parse(localStorage.getItem("todoData"))
  }
  const index = localTodoData.innerText
  dataArr.splice(dataArr.indexOf(index), 1)
  localStorage.setItem("todoData", JSON.stringify(dataArr))
}

function filterTodo(e) {
  const todos = list.childNodes

  todos.forEach((data) => {
    if (e.target.value == "all") {
      data.style.display = "flex"
    }else if(data.classList.contains("completed") && e.target.value == "completed") {
      data.style.display = "flex"
    }else if(e.target.value == "uncompleted" && !data.classList.contains("completed")) {
      data.style.display = "flex"
    }else {
      data.style.display = "none"
    }
  })
}