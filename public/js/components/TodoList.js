import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class TodoList extends React.Component {

    filter(e) {
        this.props.store.filter = e.target.value;
    }

    createNew(e) {
        //Push to todos only if enter is pressed
        if(e.which === 13) {
            this.props.store.createTodo(e.target.value);
            e.target.value = '';
        }
    }

    toggleComplete(todo) {
        todo.complete = !todo.complete;
    }

    render() {

        const { clearComplete, filter, filteredTodos} = this.props.store;
        const todoList = filteredTodos.map(todo => {
            return (
                <li key={todo.id}>
                    <input type="checkbox" onChange={this.toggleComplete.bind(this, todo)} value={todo.complete} checked={todo.complete} />
                    {todo.value}
                </li>
            );
        });

        return (<div>
            <h1>Todolist!~</h1>
            {filter} <br />
            <div>
                <h3>Create new</h3>
                <input class="create" onKeyPress={this.createNew.bind(this)} />
            </div>
            <div>
                <h3>Filter todos</h3>
                <input class="filter" value={filter} onChange={this.filter.bind(this)} />
            </div>
            <ul>
                {todoList}
            </ul>

            <a href="#" onClick={clearComplete}>Clear complete</a>
        </div>);
    }

}