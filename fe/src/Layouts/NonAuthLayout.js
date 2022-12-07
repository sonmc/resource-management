import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';
import { layoutSelector } from '../store/selector';

const NonAuthLayout = ({ children }) => {
    const layoutModeType = useSelector(layoutSelector.layoutModeType);

    useEffect(() => {
        document.body.setAttribute('data-layout-mode', 'light');
    }, [layoutModeType]);
    return <div>{children}</div>;
};

export default withRouter(NonAuthLayout);
