import React from 'react';

const Navdata = () => {
    const menuItems = [
        {
            id: 'home',
            label: 'Home',
            icon: 'ri-honour-line',
            link: '/home',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'introduction',
            label: 'Introduction',
            icon: 'ri-honour-line',
            link: '/introduction',
            click: function (e) {
                e.preventDefault();
            },
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
            id: 'candidates',
            label: 'Candidates',
            icon: 'ri-honour-line',
            link: '/candidates',
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
        {
            id: 'new-management',
            label: 'News',
            icon: 'ri-honour-line',
            link: '/new-management',
            click: function (e) {
                e.preventDefault();
            },
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
