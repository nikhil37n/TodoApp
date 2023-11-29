class Todo {
    constructor() {
        this.todos = [];
    }

    addToDo(value) {
        this.todos.push({id: parseInt(Math.random() * 1000).toString(), value})
    }
    deleteToDo(id) {
        this.todos = this.todos.filter(item => item.id !== id)
    }
    updateTodo(idToUpdate, valueToUpdate) {
        this.todos = this.todos.map(item => {
            if(item.id === idToUpdate) {
                return {id: idToUpdate, value: valueToUpdate};
            } else {
                return item;
            }
        })
    }
    getTodos() {
        return this.todos;
    }
    setTodos(todo) {
        this.todos = todo;
    }
    isEmpty() {
        return this.todos.length === 0;
    }
}