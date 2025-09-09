'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import api from '@/api/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadUserFromLocalStorage = () => {
            try {
                const token = localStorage.getItem('access_token');
                const storedUser = localStorage.getItem('user');

                if (token && storedUser) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error loading user from localStorage:', error);
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        loadUserFromLocalStorage();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/login', { email, password });
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
            setUser(data.user);
            return data.user; // Return user for component to handle redirect
        } catch (error) {
            console.error("Login failed", error);
            throw error; // Re-throw for UI to handle
        }
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            delete api.defaults.headers.common['Authorization'];
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
