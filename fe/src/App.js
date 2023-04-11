import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Route from './Routes';
import Spinner from './Components/Common/Spinner';
import { GetCurrentUser } from './Services/auth.service';
import { spinnerAtom } from './Recoil/states/spinner';
import './assets/scss/themes.scss';
import './App.scss';

function App() {
    const [_, setSpinner] = useRecoilState(spinnerAtom);
    const spinner = useRecoilValue(spinnerAtom);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const user = await GetCurrentUser();
                localStorage.setItem('currentUser', JSON.stringify(user));
            } catch (error) {
                localStorage.removeItem('currentUser');
                console.log(error);
            }
            setSpinner(false);
        };
        getUsers();
        return () => {};
    }, []);

    return (
        <React.Fragment>
            <Spinner />
            {!spinner && <Route />}
        </React.Fragment>
    );
}

export default App;
