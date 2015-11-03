import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router, Route}  from 'react-router';



/**
 * 第一个参数： 定义的组件
 * 第二个参数： dom
 */

var page =(
        <Router>
        <Route path="/" component={App}/>
        <Route path="app" component={App}/>
        </Router>

);

ReactDOM.render(<App/> ,   document.getElementById('app')    );

