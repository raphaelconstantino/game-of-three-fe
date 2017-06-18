import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Redux
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

let store = configureStore();

ReactDOM.render(
    (
        <Provider store={store}> 
            <App />    
        </Provider>
    ),
    document.getElementById('root')
);
