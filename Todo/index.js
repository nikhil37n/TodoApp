const todo = new Todo();
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const key = 'todoStorage';

function addTodo() {
    const value = todoInput.value;
    if(value === '') {
        alert('Enter valid Todo');
        return;
    }
    const duplicateTodo = todo.todos.filter(todo => todo.value === value).length;
    if(duplicateTodo) {
        alert('Please add unique todo');
        resetInput();
        return;
    }
    todo.addToDo(value);
    renderList();
    resetInput();
}

function resetInput() {
    todoInput.value = '';
}

function emptyNode(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function renderList() {
    emptyNode(todoList);
    todo.todos.map(todo => {
        const LI = document.createElement('li');
        const DIV = document.createElement('div');
        const INPUT = document.createElement('input');
        const SPAN = document.createElement('span');

        DIV.classList.add('input-container');
        INPUT.type = 'text';
        INPUT.value = todo.value;
        INPUT.setAttribute('disabled', '');
        INPUT.setAttribute('id', 'input'+todo.id);
        INPUT.setAttribute('onKeyup', 'handleInputEdit(event)');

        SPAN.classList.add('closeIcon');
        SPAN.innerText = 'X';
        SPAN.setAttribute('id', todo.id);

        DIV.appendChild(INPUT);
        DIV.appendChild(SPAN);
        LI.appendChild(DIV);
        todoList.appendChild(LI);
    })
    updateLocalStorage();
}

function handleClick(e) {
    if(e && e.target && e.target.id && e.target.nodeName === 'SPAN') {
        todo.deleteToDo(e.target.id);
        renderList();
    }
}

function makeInputEditable(e) {
    const id = e.target.id;
    if(!id) return;
    const input = document.querySelector('#' + id);
    input.removeAttribute('disabled');
}

function handleInputEdit(e) {
    if(e.key !== 'Enter') return;
    const id = (e.target.id).slice(5);
    if(!id) return;
    const value = e.target.value;
    todo.updateTodo(id, value);
    renderList();
}

function updateLocalStorage() {
    localStorage.setItem(key, JSON.stringify(todo.getTodos()));
}

(() => {
    const localTodos = localStorage.getItem(key);
    if(localTodos) {
        todo.setTodos(JSON.parse(localTodos));
        renderList();
    }
})()