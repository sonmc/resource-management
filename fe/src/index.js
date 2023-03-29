import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
    <React.Fragment>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </BrowserRouter>
    </React.Fragment>,
    document.getElementById('root')
);

reportWebVitals();
