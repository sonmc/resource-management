import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './store/actions';
import { useHistory } from 'react-router-dom';
import './assets/scss/themes.scss';
import { authSelector } from './store/selector';
//imoprt Route
import Route from './Routes';

function App() {
    const dispatch = useDispatch();
    const history = useHistory();

    const token = useSelector(authSelector.token);
    useEffect(() => {
        if (token) dispatch(authActions.getCurrentUser(history));
    }, [token]);

    return (
        <React.Fragment>
            <Route />
        </React.Fragment>
    );
}

export default App;
