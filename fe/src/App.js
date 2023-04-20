import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Route from './Routes';
import Spinner from './Components/Common/Spinner';
import { GetCurrentUser } from './Services/auth.service';
import { spinnerAtom } from './Recoil/states/spinner';
import { currentUserAtom } from './Recoil/states/users';
import './assets/scss/themes.scss';
import './App.scss';

function App() {
    const [_, setSpinner] = useRecoilState(spinnerAtom);
    const [user, setCurrentUser] = useRecoilState(currentUserAtom);

    const spinner = useRecoilValue(spinnerAtom);

    useEffect(() => {
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
