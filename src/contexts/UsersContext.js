'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import api from '@/api/api';

const UsersContext = createContext(null);

export function UsersProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/people');
            setUsers(response.data);
        } catch (err) {
            setError(err);
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const getUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/people/${id}`);
            return response.data;
        } catch (err) {
            setError(err);
            console.error(`Failed to fetch user with ID ${id}:`, err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/people', userData);
            setUsers((prevUsers) => [...prevUsers, response.data]); // Update state
            return response.data;
        } catch (err) {
            setError(err);
            console.error("Failed to create user:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (id, userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/people/${id}`, userData);
            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id === id ? response.data : user))
            ); // Update state
            return response.data;
        } catch (err) {
            setError(err);
            console.error(`Failed to update user with ID ${id}:`, err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await api.delete(`/people/${id}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Update state
        } catch (err) {
            setError(err);
            console.error(`Failed to delete user with ID ${id}:`, err);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    const registerPostulant = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/postulant', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (err) {
            setError(err);
            console.error("Failed to register postulant:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <UsersContext.Provider value={{
            users,
            loading,
            error,
            fetchUsers, // Renamed getUsers to fetchUsers for clarity
            getUser,
            createUser,
            updateUser,
            deleteUser,
            registerPostulant
        }}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsers = () => useContext(UsersContext);