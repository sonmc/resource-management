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
      id: 'roles',
      label: 'Roles',
      icon: 'ri-honour-line',
      link: '/roles',
    },
    {
      id: 'vacation-calendar',
      label: 'Vacation Calendar',
      icon: 'ri-honour-line',
      link: '/vacation-calendar',
    },
    {
      id: 'vacations',
      label: 'Vacations',
      icon: 'ri-honour-line',
      link: '/vacations',
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
