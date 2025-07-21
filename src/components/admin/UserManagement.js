'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useUsers } from '@/contexts/UsersContext';

export default function UserManagement() {
    const { users, loading, error, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
    const { user: authUser, loading: authLoading } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [userToDeleteId, setUserToDeleteId] = useState(null);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        role: 'user',
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddEditSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const updateData = { full_name: formData.full_name, email: formData.email, role: formData.role };
                if (formData.password) {
                    updateData.password = formData.password;
                }
                await updateUser(currentUser.id, updateData);
                toast.success("User updated successfully!");
            } else {
                await createUser(formData);
                toast.success("User added successfully!");
            }
            resetFormAndCloseModal();
        } catch (err) {
            console.error("Error saving user:", err);
            toast.error(err.response?.data?.message || "Failed to save user. Please check your input.");
        }
    };

    const handleEditClick = (user) => {
        setCurrentUser(user);
        setFormData({
            full_name: user.full_name,
            email: user.email,
            role: user.role,
            password: '',
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDeleteClick = (id) => {
        setUserToDeleteId(id);
        setShowDeleteConfirmModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteUser(userToDeleteId);
            toast.success("User deleted successfully!");
        } catch (err) {
            console.error("Error deleting user:", err);
            toast.error(err.response?.data?.message || "Failed to delete user.");
        } finally {
            setShowDeleteConfirmModal(false);
            setUserToDeleteId(null);
        }
    };

    const resetFormAndCloseModal = () => {
        setFormData({
            full_name: '',
            email: '',
            password: '',
            role: 'user',
        });
        setCurrentUser(null);
        setIsEditing(false);
        setShowModal(false);
    };

    if (authLoading || (authUser && authUser.role !== 'admin')) {
        return <div className="text-center py-4">Cargando o no autorizado...</div>;
    }

    if (loading) return <div className="text-center py-4">Cargando usuarios...</div>;

    return (
        <div className="container max-w-6xl mx-auto p-8 bg-white rounded-2xl shadow-xl my-10">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-primary-500 pb-4 tracking-tight">
                Gestión de Personas
            </h1>

            {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}

            <button
                onClick={() => { setShowModal(true); setIsEditing(false); setFormData({ full_name: '', email: '', password: '', role: 'user' }); }}
                className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out mb-6"
            >
                ➕ Añadir Nueva Persona
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800/90 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full mx-auto">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{isEditing ? 'Editar Persona' : 'Crear Nueva Persona'}</h3>
                        <form onSubmit={handleAddEditSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Nombre Completo:</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    id="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña {isEditing && '(dejar en blanco para no cambiar)'}</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500"
                                    {...(!isEditing && { required: true })} // Required only for new user
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol:</label>
                                <select
                                    name="role"
                                    id="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-primary-500 focus:border-primary-500"
                                    required
                                >
                                    <option value="user">Usuario</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={resetFormAndCloseModal}
                                    className="px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm hover:bg-gray-400 transition duration-300 ease-in-out"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow-sm hover:bg-primary-700 transition duration-300 ease-in-out"
                                >
                                    {isEditing ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto shadow-lg ring-1 ring-gray-100 rounded-xl">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                        <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">ID</th>
                        <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Nombre Completo</th>
                        <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Email</th>
                        <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Role</th>
                        <th className="py-4 px-6 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                            <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{user.full_name}</td>
                            <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                            <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                            <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() => handleEditClick(user)}
                                    className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-1.5 px-4 rounded-md text-xs mr-2 transition duration-300 ease-in-out"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(user.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded-md text-xs transition duration-300 ease-in-out"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirmModal && (
                <div className="fixed inset-0 bg-gray-800/90 bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full mx-auto text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirmar Eliminación</h3>
                        <p className="text-gray-600 mb-6">¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.</p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => setShowDeleteConfirmModal(false)}
                                className="px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm hover:bg-gray-400 transition duration-300 ease-in-out"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-6 py-3 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 transition duration-300 ease-in-out"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
