import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from './store/auth/actions';
import { useHistory } from 'react-router-dom';
//import Scss
import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';

function App() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { token } = useSelector((state) => ({
        token: state.Auth.token,
    }));
    useEffect(() => {
        console.log(token);
        if (token) dispatch(getCurrentUser(history));
    }, [token]);

    return (
        <React.Fragment>
            <Route />
        </React.Fragment>
    );
}

export default App;
