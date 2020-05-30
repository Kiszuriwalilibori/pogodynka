import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducer';
import * as serviceWorker from './serviceWorker';


const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));


serviceWorker.unregister();
