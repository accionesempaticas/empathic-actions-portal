'use client';

import { useState, useEffect } from 'react';
import api from '@/api/api';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const { user, loading: authLoading } = useAuth(); // Get user and authLoading from AuthContext

    useEffect(() => {
        if (!authLoading && user && user.role === 'admin') {
            fetchUsers();
        } else if (!authLoading && (!user || user.role !== 'admin')) {
            // Optionally handle unauthorized access within the component if needed
            // For now, the parent AdminPage handles redirection
            setLoading(false); // Stop loading if not authorized
        }
    }, [user, authLoading]); // Depend on user and authLoading

    const   fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users');
            setUsers(response.data);
            setError('');
        } catch (err) {
            setError('Error al cargar usuarios.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users', formData);
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'user',
            });
            fetchUsers();
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear usuario.');
            console.error(err);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: '', // Password should not be pre-filled for security
            role: user.role,
        });
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/users/${editingUser.id}`, formData);
            setEditingUser(null);
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'user',
            });
            fetchUsers();
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al actualizar usuario.');
            console.error(err);
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await api.delete(`/users/${id}`);
                fetchUsers();
                setError('');
            } catch (err) {
                setError(err.response?.data?.message || 'Error al eliminar usuario.');
                console.error(err);
            }
        }
    };

    if (authLoading || (user && user.role !== 'admin')) {
        return <p>Cargando o no autorizado...</p>;
    }

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Formulario de Creación/Edición */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4">{editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
                <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña {editingUser && '(dejar en blanco para no cambiar)'}</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            {...(!editingUser && { required: true })} // Required only for new user
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        >
                            <option value="user">Usuario</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700"
                        >
                            {editingUser ? 'Actualizar Usuario' : 'Crear Usuario'}
                        </button>
                        {editingUser && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingUser(null);
                                    setFormData({
                                        name: '',
                                        email: '',
                                        password: '',
                                        role: 'user',
                                    });
                                }}
                                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Lista de Usuarios */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Usuarios Existentes</h2>
                {users.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <li key={user.id} className="py-4 flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{user.name} ({user.role})</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No hay usuarios registrados.</p>
                )}
            </div>
        </div>
    );
}