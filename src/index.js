import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import * as serviceWorker from './components/serviceWorker';
import 'tachyons';
import { searchRobots } from './reducer';
//import {robots} from './components/robots';

//
const logger = createLogger();
const store = createStore(searchRobots , applyMiddleware(logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
