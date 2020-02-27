import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style4.css';
import './index.css';
import './styles/error.css';
import './styles/style.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducer';
import { GlobalStyle } from './styles/styles';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, applyMiddleware(thunk));


ReactDOM.render(
<Provider store={store}>
  <GlobalStyle />
  <App />
</Provider>, document.getElementById('root'));


serviceWorker.unregister();
