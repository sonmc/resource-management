import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Route from './Routes';
import Spinner from './Components/Common/Spinner'; 
import { spinnerAtom } from './Recoil/states/spinner';
import { currentUserAtom } from './Recoil/states/users';
import './assets/scss/themes.scss';
import './App.scss';
import { GetAll } from './Services/notification.service';
import { notificationAtom } from './Recoil/states/notification';
import 'react-toastify/dist/ReactToastify.css';
import { GetCurrentUser } from './Services/user.service';
function App() {
    const [_, setSpinner] = useRecoilState(spinnerAtom);
    const [user, setCurrentUser] = useRecoilState(currentUserAtom);
    const [notifications, setNotifications] = useRecoilState(notificationAtom);
    const spinner = useRecoilValue(spinnerAtom);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const user = await GetCurrentUser();
                GetAll({ user_id: user.id })
                    .then((res) => {
                        setNotifications(res);
                    })
                    .catch(() => {});
                setCurrentUser(user);
            } catch (error) {
                console.log(error);
            }
            setSpinner(false);
        };
        getUsers();
        return () => {};
    }, [setCurrentUser, setSpinner, setNotifications]);

    return (
        <React.Fragment>
            <Spinner />
            {!spinner && <Route />}
        </React.Fragment>
    );
}

export default App;
