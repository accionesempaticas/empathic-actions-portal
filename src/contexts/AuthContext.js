'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import api from '@/api/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUserFromLocalStorage = async () => {
            const token = localStorage.getItem('access_token');
            const storedUser = localStorage.getItem('user');
            if (token && storedUser) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(JSON.parse(storedUser));
            } else if (token) {
                // If only token exists, try to fetch user data
                try {
                    const { data } = await api.get('/user');
                    setUser(data.user);
                    localStorage.setItem('user', JSON.stringify(data.user));
                } catch (error) {
                    console.error("Failed to fetch user data", error);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('user');
                    delete api.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false);
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
            if (data.user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/commitment-letters');
            }
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
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
