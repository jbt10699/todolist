//elements
const todolistContent = document.querySelector(`.todolist_content`);
const addtodoInput = document.querySelector(`add-todo_input`);
const addtodoBtn = document.querySelector(`add-todo_btn`);

//setevent
function addAddTodoEvent(){
    /*
    addtodoInput.addEventListener('keypress',
        (e)=>{
            console.log(e.target.value);
        }
    );
    */

    addtodoBtn.addEventListener(
        'click',
        ()=>{
            console.log('clc');
        }
    )

}



//data
let todos = [];

//init
//addAddTodoEvent();
fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((json) => {
        todos = json;
        renderTodoList(todos);

    });


//Single responsibility principle. Keep functions simple
function renderTodoList(todos){
    const todolistTmp = generateTodoListTmp(todos);
    render(todolistTmp, todolistContent);
}

//Templates
function generateTodoListTmp(todos){
    let res = todos.map(todo=>{
        return generateTodoTmp(todo);
    }).join('');
    return res;
}

function generateTodoTmp(todo){
    return `<li class="todolist_content-item">
    <span class="content-item_title">${todo.title}</span>
    <div class="content-item_actions">
        <button>Edit</button>
        <button>X</button>
    </div>
    </li>`;
}


//render
function render(template, element){
    element.innerHTML = template;
}

