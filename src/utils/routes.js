import {MdDashboard, MdPeople} from "react-icons/md";

const routes = [
    {
        path: '/applicants/complete-profile',
        title: 'Datos Personales',
        roles: ['user'],
        icon: <MdDashboard size={22}/>
    },
    {
        path: '/admin/dashboard',
        title: 'Dashboard',
        roles: ['admin'],
        icon: <MdDashboard size={22}/>
    },
    {
        path: '/admin/users',
        title: 'Gestión de usuarios',
        roles: ['admin'],
        icon: <MdPeople size={22}/>
    }
];

export default routes;
