//elements
const todolistContent = document.querySelector(`.todolist_content`);
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



//data
let todos = [];

//init

addAddTodoEvent();  //giving me problems

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
        <button>X</button>
    </div>
    </li>`;
}


//render
function render(template, element) {
    element.innerHTML = template;
}

