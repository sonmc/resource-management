import React, { useEffect, useCallback } from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import './assets/scss/themes.scss';
import Route from './Routes';
import Spinner from './Components/Common/Spinner';
import { GetCurrentUser } from './Services/auth.service';
import { currentUserAtom } from './Recoil/states/users';
import { spinnerAtom } from './Recoil/states/spinner';
function App() {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
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
        getUsers(); // run it, run it
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
