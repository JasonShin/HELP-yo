import { computed, observable } from 'mobx';
import TodoModel from '../models/TodoModel';


class TodoStore {
    @observable todos = [];
    @observable filter = '';

    @computed get filteredTodos() {
        var matchesFilter = new RegExp(this.filter, 'i');
        return this.todos.filter(todo => !this.filter || matchesFilter.test(todo));
    }

    createTodo(value) {
        this.todos.push(new TodoModel(value));
    }

    clearComplete = () => {
        const incompleteTodos = this.todos.filter(todo => !todo.complete);
        this.todos.replace(incompleteTodos);
    }
}

export default new TodoStore;