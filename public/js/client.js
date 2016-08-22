import React from 'react';
import ReactDOM from 'react-dom';

import TodoStore from './stores/TodoStore';
import TodoList from './components/TodoList';



const app = document.getElementById('app');

ReactDOM.render(<TodoList store={TodoStore} />, app);