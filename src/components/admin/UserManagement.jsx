'use client';

import { useState, useEffect } from 'react';
import api from '@/api/api';
import toast from 'react-hot-toast';

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get('/users');
            setUsers(response.data);
            // No error to set, toast handles it
        } catch (err) {
            console.error("Error fetching users:", err);
            toast.error("Failed to fetch users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users', formData);
            setFormData({ name: '', email: '', password: '', role: 'user' });
            setShowAddForm(false);
            fetchUsers();
        } catch (err) {
            console.error("Error adding user:", err);
            toast.error("Failed to add user. Please check your input.");
        }
    };

    const handleEditClick = (user) => {
        setCurrentUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role, password: '' }); // Password should not be pre-filled
        setShowEditForm(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateData = { name: formData.name, email: formData.email, role: formData.role };
            if (formData.password) {
                updateData.password = formData.password;
            }
            await api.put(`/users/${currentUser.id}`, updateData);
            setFormData({ name: '', email: '', password: '', role: 'user' });
            setShowEditForm(false);
            setCurrentUser(null);
            fetchUsers();
        } catch (err) {
            console.error("Error updating user:", err);
            toast.error("Failed to update user. Please check your input.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await api.delete(`/users/${id}`);
                fetchUsers();
            } catch (err) {
                console.error("Error deleting user:", err);
                toast.error("Failed to delete user.");
            }
        }
    };

    if (loading) return <div className="text-center py-4">Loading users...</div>;
    

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-custom-medium my-8">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-primary pb-2">User Management</h1>

            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out mb-6"
            >
                {showAddForm ? 'Cancel Add User' : 'Add New User'}
            </button>

            {showAddForm && (
                <div className="mb-6 p-6 border border-gray-200 rounded-lg shadow-custom-light bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New User</h2>
                    <form onSubmit={handleAddSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="role">
                                Role:
                            </label>
                            <select
                                name="role"
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                        >
                            Add User
                        </button>
                    </form>
                </div>
            )}

            {showEditForm && currentUser && (
                <div className="mb-6 p-6 border border-gray-200 rounded-lg shadow-custom-light bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit User: {currentUser.name}</h2>
                    <form onSubmit={handleEditSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-name">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="edit-name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-email">
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="edit-email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-password">
                                New Password (leave blank to keep current):
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="edit-password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="edit-role">
                                Role:
                            </label>
                            <select
                                name="role"
                                id="edit-role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                type="submit"
                                className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            >
                                Update User
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowEditForm(false);
                                    setCurrentUser(null);
                                    setFormData({ name: '', email: '', password: '', role: 'user' });
                                }}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto shadow-custom-medium rounded-lg">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-200">
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">ID</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-6 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                <td className="py-3 px-6 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                <td className="py-3 px-6 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                <td className="py-3 px-6 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                                <td className="py-3 px-6 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => handleEditClick(user)}
                                        className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-1 px-3 rounded-md text-xs mr-2 transition duration-300 ease-in-out"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md text-xs transition duration-300 ease-in-out"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
