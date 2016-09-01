import React from 'react';
import TodoList from '../components/TodoList';
import TodoStore from '../stores/TodoStore';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Homepage !! yotest</h1>
                <TodoList store={TodoStore} />
                
            </div>
        );
    }
}


