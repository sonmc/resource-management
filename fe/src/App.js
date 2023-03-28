import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import './assets/scss/themes.scss';
import './App.scss';
import Route from './Routes';

function App() {
    useEffect(() => {
        if (document.documentElement) document.documentElement.setAttribute('data-layout', 'horizontal');
    }, []);

    return (
        <React.Fragment>
            <RecoilRoot>
                <Route />
            </RecoilRoot>
        </React.Fragment>
    );
}

export default App;
