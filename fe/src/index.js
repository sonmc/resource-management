import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configStore from './store';

ReactDOM.render(
    <Provider store={configStore({})}>
        <React.Fragment>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <App />
            </BrowserRouter>
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
