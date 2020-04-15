import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { reducer } from './containers/reducer';

const store = createStore(reducer)


ReactDOM.render(<Provider store={store}><Router><Route path="/" component={App} /></Router></Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


