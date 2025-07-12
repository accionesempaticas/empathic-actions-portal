const routes = [
    {
        path: '/applicants/complete-profile',
        name: 'Datos Personales',
        roles: ['user'],
    },
    {
        path: '/admin/users',
        name: 'Gestión de usuarios',
        roles: ['admin'],
    }
];

export default routes;
