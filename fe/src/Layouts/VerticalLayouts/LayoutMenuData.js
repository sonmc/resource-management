import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Navdata = () => {
    const history = useHistory();

    const [isTables, setIsTables] = useState(false);
    const [isHomes, setIsHomes] = useState(false);

    const [iscurrentState, setIscurrentState] = useState('Homes');

    useEffect(() => {
        document.body.classList.remove('twocolumn-panel');

        if (iscurrentState !== 'Tables') {
            setIsTables(false);
        }
        if (iscurrentState !== 'Homes') {
            setIsHomes(false);
        }
    }, [history, isTables, iscurrentState]);

    const menuItems = [
        {
            label: 'Menu',
            isHeader: true,
        },
        {
            id: 'projects',
            label: 'Projects',
            icon: 'ri-honour-line',
            link: '/projects',
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Projects');
            },
        },
        {
            id: 'employees',
            label: 'Employees',
            icon: 'ri-honour-line',
            link: '/employees',
            click: function (e) {
                e.preventDefault();
                setIscurrentState('Employees');
            },
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
