import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import {createStore, applyMiddleware, combineReducers} from "redux";
import logger from 'redux-logger';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk)
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(
  <React.StrictMode>
      {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
