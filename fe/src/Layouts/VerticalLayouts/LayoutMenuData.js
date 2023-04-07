import React from 'react';

const Navdata = () => {
    const menuItems = [
        {
            label: 'Menu',
            isHeader: true,
        },
        {
            id: 'home',
            label: 'Dashboard',
            icon: 'ri-honour-line',
            link: '/home',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'projects',
            label: 'Project management',
            icon: 'ri-honour-line',
            link: '/projects',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'employees',
            label: 'Employee management',
            icon: 'ri-honour-line',
            link: '/employees',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'vacations',
            label: 'Work schedule',
            icon: 'ri-honour-line',
            link: '/vacations',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'lunch-order',
            label: 'Lunch order',
            icon: 'ri-honour-line',
            link: '/lunch-order',
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
