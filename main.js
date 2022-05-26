//elements
const todolistContent = document.querySelector('.todolist_content');
const addtodoInput = document.querySelector('.add-todo_input');
const addtodoBtn = document.querySelector('.add-todo_btn');


//setevent
function addAddTodoEvent() {
    /*
    addtodoInput.addEventListener('keypress',
        (e)=>{
            console.log(e.target.value);
        }
    );
    */
    addtodoBtn.addEventListener(
        'click',
        () => {
            fetch(
                'https://jsonplaceholder.typicode.com/todos',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: 1,
                        title: addtodoInput.value,
                        completed: false,
                    }),
                    headers: {
                        'Content-type':
                            'application/json; charset=UTF-8',
                    },
                }
            )
                .then((response) => response.json())
                .then((newTodo) => {
                    console.log(newTodo);
                    todos = [newTodo, ...todos];
                    renderTodoList(todos);
                })

        }
    )
}   //End of addAddTodoEvent

function addTodoActionEvent(){
    todolistContent.addEventListener(
        'click',
        (e)=>{
            console.log("click", e.target.className, parseTodoIdFromBtn(e.target));
            if(e.target.className === 'btn-remove'){
                //remove the item
                alert('remove');
                const currentID = parseTodoIdFromBtn(e.target);
                console.log("Current id = " + currentID);
                fetch('https://jsonplaceholder.typicode.com/todos/${currentID)}', {
                    method: 'DELETE',
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    todos = todos.filter((todo)=>todo.id !== currentID)
                })
                
            }
        })
}


//data
let todos = [];

//init
addAddTodoEvent();
addTodoActionEvent();

fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((json) => {
        todos = json;
        renderTodoList(todos);

    });


//Single responsibility principle. Keep functions simple
function renderTodoList(todos) {
    const todolistTmp = generateTodoListTmp(todos);
    render(todolistTmp, todolistContent);
}

//Templates
function generateTodoListTmp(todos) {
    let res = todos.map(todo => {
        return generateTodoTmp(todo);
    }).join('');
    return res;
}

function generateTodoTmp(todo) {
    return `<li class="todolist_content-item">
    <span class="content-item_title">${todo.title}</span>
    <div class="content-item_actions">
        <button>Edit</button>
        <button class="btn-remove" id="${todo.id}">X</button>
    </div>
    </li>`;
}

//helper
function parseTodoIdFromBtn(btnElement){
    return 0+btnElement.id.substring(5)
}


//render
function render(template, element) {
    element.innerHTML = template;
}

