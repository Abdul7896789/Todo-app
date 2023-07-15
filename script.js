let taskInput = document.querySelector('.task_input input');
let  clear = document.querySelector('.clear_all_btn .clear-btn');
let filters = document.querySelectorAll('.filters a')
let taskbox = document.querySelector('.taskbox');


let editId ,isEditTask =false;
todos = JSON.parse(localStorage.getItem('todo-list'));
filters.forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelector('a.active').classList.remove('active');
        btn.classList.add('active')
        showTodo (btn.id)
    })
})
function showTodo(filter){
    let li = '';
    if(todos){
        todos.forEach((todo,id)=>{
let completed = todo.status == "completed" ? "checked" : "";
if(filter == todo.status||filter =="all"){
    li += `
    <li class="task"><label for="${id}">
    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
    <p class="${completed}">${todo.name}</p>
    </label>
    <div class="li_menu task-menu">
        <a  onclick='deleteTask(${id},"${filter}")' href="#" class="delete">delete</a>
        <a onclick='editTask(${id},"${todo.name}")' href="#" class="edit">Edit</a>
    </div>
    </li>
    `
}
        });
    }
    taskbox.innerHTML = li || `<span>You don't have any task here</span>`;
    let checkTask = taskbox.querySelectorAll('.task')
!checkTask.length ? clear.classList.remove('active'): clear.classList.add("active"); 

}

showTodo('all')



function updateStatus(selectedTask) {

    let taskName = selectedTask.parentElement.lastElementChild;
    console.log(taskName)
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");

}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(filter);
}

clear.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("a.active").id);
    }
});












