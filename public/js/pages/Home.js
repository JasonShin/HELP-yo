import React from 'react';
import TodoList from '../components/TodoList';
import TodoStore from '../stores/TodoStore';
import config from '../../config/config';

export default class Home extends React.Component {
    componentWillMount(){
        document.title = `Home${config.titleEnding}`;
    }

    render() {
        return (
            <div id="PageContent">
                <h1>Homepage !! yotest firebase! HEY WEBMASTER YO!!</h1>
                <TodoList store={TodoStore} />
            </div>
        );
    }
}


