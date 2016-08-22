import { autorun, observable } from 'mobx';

class TodoStore {
    @observable todos = ['buy milk', 'buy egg'];
    @observable filter = 'asfsaf';
}

var store = new TodoStore();

export default store;

autorun(() => {
    console.log(store.filter);
    console.log(store.todos[0]);
});