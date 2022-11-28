import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useProfile } from '../Components/Hooks/UserHooks';

const AuthProtected = (props) => {
    const { userProfile, loading } = useProfile();

    /*
    redirect is un-auth access protected routes via url
    */

    if (!userProfile && loading) {
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
                        {' '}
                        <Component {...props} />{' '}
                    </>
                );
            }}
        />
    );
};

export { AuthProtected, AccessRoute };
