import { computed, observable } from 'mobx';

class Todo {
    @observable value;
    @observable id;
    @observable complete;
    
}

class TodoStore {
    @observable todos = ['buy milk', 'buy egg'];
    @observable filter = '';

    @computed get filteredTodos() {
        var matchesFilter = new RegExp(this.filter, 'i');
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo));
    }

    createTodo(value) {
        this.todos.push(value);
    }
}

export default new TodoStore;
