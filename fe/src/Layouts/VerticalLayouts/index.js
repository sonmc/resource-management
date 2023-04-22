import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

//import Components
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
//import actions
import { changeLayout, changeSidebarTheme, changeLayoutMode, changeLayoutWidth, changeLayoutPosition, changeTopbarTheme, changeLeftsidebarSizeType, changeLeftsidebarViewType } from '../../store/actions';
import { notificationAtom } from 'src/Recoil/states/notification';
//redux
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserAtom } from 'src/Recoil/states/users';
import { GetAll } from 'src/Services/notification.service';
const baseUrl = process.env.REACT_APP_API_URL;
const Layout = (props) => {
    const currentUser = useRecoilValue(currentUserAtom);
    const [notifications, setNotifications] = useRecoilState(notificationAtom);

    const [headerClass, setHeaderClass] = useState('');
    const dispatch = useDispatch();
    const { layoutType, leftSidebarType, layoutModeType, layoutWidthType, layoutPositionType, topbarThemeType, leftsidbarSizeType, leftSidebarViewType } = useSelector((state) => ({
        layoutType: state.Layout.layoutType,
        leftSidebarType: state.Layout.leftSidebarType,
        layoutModeType: state.Layout.layoutModeType,
        layoutWidthType: state.Layout.layoutWidthType,
        layoutPositionType: state.Layout.layoutPositionType,
        topbarThemeType: state.Layout.topbarThemeType,
        leftsidbarSizeType: state.Layout.leftsidbarSizeType,
        leftSidebarViewType: state.Layout.leftSidebarViewType,
    }));

    /*
    layout settings
    */
    useEffect(() => {
        if (layoutType || leftSidebarType || layoutModeType || layoutWidthType || layoutPositionType || topbarThemeType || leftsidbarSizeType || leftSidebarViewType) {
            dispatch(changeLeftsidebarViewType(leftSidebarViewType));
            dispatch(changeLeftsidebarSizeType(leftsidbarSizeType));
            dispatch(changeSidebarTheme(leftSidebarType));
            dispatch(changeLayoutMode(layoutModeType));
            dispatch(changeLayoutWidth(layoutWidthType));
            dispatch(changeLayoutPosition(layoutPositionType));
            dispatch(changeTopbarTheme(topbarThemeType));
            dispatch(changeLayout(layoutType));
        }
    }, [layoutType, leftSidebarType, layoutModeType, layoutWidthType, layoutPositionType, topbarThemeType, leftsidbarSizeType, leftSidebarViewType, dispatch]);
    /*
    call dark/light mode
    */
    const onChangeLayoutMode = (value) => {
        if (changeLayoutMode) {
            dispatch(changeLayoutMode(value));
        }
    };

    // class add remove in header
    useEffect(() => {
        window.addEventListener('scroll', scrollNavigation, true);
    });

    function scrollNavigation() {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setHeaderClass('topbar-shadow');
        } else {
            setHeaderClass('');
        }
    }

    useEffect(() => {
        const socket = io(baseUrl, {
            query: { user_id: currentUser.id },
        });
        socket.on('notification', (notification) => {
            GetAll({ user_id: currentUser.id })
                .then((res) => {
                    setNotifications(res);
                })
                .catch(() => {});
        });
        socket.on('connect', function () {
            console.log('Connected');
        });
        socket.on('exception', function (data) {
            console.log('event', data);
        });
        socket.on('disconnect', function () {
            console.log('Disconnected');
        });
        return () => {
            if (socket.connected) socket.disconnect();
        };
    }, []);
    return (
        <React.Fragment>
            <div id="layout-wrapper">
                <Header headerClass={headerClass} layoutModeType={layoutModeType} onChangeLayoutMode={onChangeLayoutMode} />
                <Sidebar layoutType={layoutType} />
                <div className="main-content">
                    {props.children}
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

Layout.propTypes = {
    children: PropTypes.object,
};

export default withRouter(Layout);
