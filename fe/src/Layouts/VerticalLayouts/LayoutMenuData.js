import React from 'react';

const Navdata = () => {
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
            },
        },
        {
            id: 'employees',
            label: 'Employees',
            icon: 'ri-honour-line',
            link: '/employees',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'vacation-calendar',
            label: 'Vacation Calendar',
            icon: 'ri-honour-line',
            link: '/vacation-calendar',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'vacations',
            label: 'Vacations',
            icon: 'ri-honour-line',
            link: '/vacations',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'roles',
            label: 'Roles',
            icon: 'ri-honour-line',
            link: '/roles',
            click: function (e) {
                e.preventDefault();
            },
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
