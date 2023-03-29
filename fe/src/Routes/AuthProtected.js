import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { currentUserAtom } from '../Recoil/states/users';
import { useRecoilValue } from 'recoil';
const AuthProtected = (props) => {
    let currentUser = useRecoilValue(currentUserAtom);
    if (!currentUser) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }
    return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return (
                    <>
                        <Component {...props} />
                    </>
                );
            }}
        />
    );
};

export { AuthProtected, AccessRoute };
