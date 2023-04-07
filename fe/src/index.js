import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import { configureStore } from './store';

ReactDOM.render(
    <Provider store={configureStore({})}>
        <React.Fragment>
            <BrowserRouter>
                <RecoilRoot>
                    <App />
                </RecoilRoot>
            </BrowserRouter>
        </React.Fragment>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
