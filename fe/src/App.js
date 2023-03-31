import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import './assets/scss/themes.scss';
import './App.scss';
import Route from './Routes';
import Spinner from './Components/Common/Spinner';
import { GetCurrentUser } from './Services/auth.service';
import { usersState } from './Recoil/states/users';
import { spinnerAtom } from './Recoil/states/spinner';
function App() {
    const setCurrentUser = useRecoilState(usersState);
    const [_, setSpinner] = useRecoilState(spinnerAtom);
    const spinner = useRecoilValue(spinnerAtom);

    useEffect(() => {
        if (document.documentElement) document.documentElement.setAttribute('data-layout', 'horizontal');
        const getUsers = async () => {
            try {
                const user = await GetCurrentUser();
                setCurrentUser(user);
            } catch (error) {
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
