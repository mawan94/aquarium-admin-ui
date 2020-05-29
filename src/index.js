import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './login.js'
import './index.css';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/" component={App}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
