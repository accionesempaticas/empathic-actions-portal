import {MdDashboard, MdPeople} from "react-icons/md";
import { FaSignature } from "react-icons/fa";

const routes = [
    {
        path: '/applicants/complete-profile',
        title: 'Datos Personales',
        roles: ['user'],
        icon: <MdDashboard size={22}/>
    },
    {
        path: '/applicants/sign-document',
        title: 'Firmar Documentos',
        roles: ['user'],
        icon: <FaSignature size={22}/>
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
