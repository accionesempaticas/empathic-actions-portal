const routes = [
    {
        path: '/commitment-letters',
        name: 'Cartas Compromiso',
        roles: ['user', 'admin'],
    },
    {
        path: '/sign-document',
        name: 'Firmar Documento',
        roles: ['user', 'admin'],
    },
    {
        path: '/admin',
        name: 'Administración',
        roles: ['admin'],
    },
    {
        path: '/documents',
        name: 'Documentos',
        roles: ['admin'],
    },
    // Add more routes as needed
];

export default routes;
