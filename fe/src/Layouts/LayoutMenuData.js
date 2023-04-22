import React from 'react';

const Navdata = () => {
    const menuItems = [
        {
            id: 'home',
            public: true,
            label: 'Home',
            icon: 'ri-home-heart-line',
            link: '/home',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'introduction',
            public: true,
            label: 'Introduction',
            icon: 'ri-building-4-line',
            link: '/introduction',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'project_get',
            public: false,
            label: 'Projects',
            icon: 'ri-projector-line',
            link: '/projects',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'employee_get',
            public: false,
            label: 'Employees',
            icon: 'ri-user-line',
            link: '/employees',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'candidate_get',
            public: false,
            label: 'Candidates',
            icon: 'ri-file-list-3-line',
            link: '/candidates',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'work_schedule',
            public: true,
            label: 'Work schedule',
            icon: 'ri-calendar-2-line',
            link: '/work-schedule',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'lunch-order',
            public: true,
            label: 'Lunch order',
            icon: 'ri-timer-line',
            link: '/lunch-order',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            id: 'role_get',
            public: false,
            label: 'Roles',
            icon: 'ri-user-settings-line',
            link: '/roles',
            click: function (e) {
                e.preventDefault();
            },
        },
        {
            public: false,
            id: 'news',
            label: 'News Management',
            icon: 'ri-newspaper-line',
            link: '/new-management',
            click: function (e) {
                e.preventDefault();
            },
        },
        // {
        //     id: 'library-management',
        //     label: 'Libraries',
        //     public: true,
        //     icon: 'ri-book-open-line',
        //     link: '/libraries',
        //     click: function (e) {
        //         e.preventDefault();
        //     },
        // },
        {
            id: 'vacation_get',
            public: false,
            label: 'Absence Management',
            icon: 'ri-honour-line',
            link: '/vacations',
            click: function (e) {
                e.preventDefault();
            },
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
