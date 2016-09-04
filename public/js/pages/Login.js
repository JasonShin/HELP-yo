import React from 'react';
import TodoList from '../components/TodoList';
import TodoStore from '../stores/TodoStore';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>You must login to goto any other pages!</h1>
                <input type="text" placeholder="enter your email!" />
                <input type="password" placeholder="enter your password!" />
                <button>login</button>
            </div>
        );
    }
}