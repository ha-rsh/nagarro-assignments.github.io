let input = document.querySelector('.todo-box input')
let button = document.querySelector('.todo-box button')
let todolist = document.querySelector('.todolist')
let btn2 = document.querySelector('#btn2')

input.onkeyup = ()=>{
    let data=input.value;
    if(data.trim() != 0) button.classList.add('active')
    else button.classList.remove("active")
}

showTodoList()

button.onclick = ()=>{
    let data = input.value
    let storage = localStorage.getItem('Todo item');
    if(storage == null) arr = [];
    else arr = JSON.parse(storage);
    arr.push(data)
    localStorage.setItem("Todo item", JSON.stringify(arr));
    showTodoList()
    button.classList.remove("active")
}

function showTodoList(){
    let storage = localStorage.getItem('Todo item');
    lefttask = document.querySelector('.lefttask')
    if(storage == null) arr = [];
    else  arr = JSON.parse(storage)

    if(arr.length > 0) btn2.classList.add('active')
    else btn2.classList.remove('active')

    lefttask.textContent = arr.length;
    new_tag = "";
    arr.forEach((element, index) => {
        new_tag += `<li class="list-data">${element} <span onclick="DeleteTodo(${index})";><i class="fas fa-trash icon-img"></i></span></li>`
        
    });
    todolist.innerHTML = new_tag;
    input.value = ""
}

function DeleteTodo(index){
    let storage = localStorage.getItem('Todo item');
    arr = JSON.parse(storage)
    arr.splice(index, 1)
    localStorage.setItem("Todo item", JSON.stringify(arr));
    showTodoList()

}

btn2.onclick = ()=>{
    arr = [];
    localStorage.setItem("Todo item", JSON.stringify(arr));
    showTodoList();
}