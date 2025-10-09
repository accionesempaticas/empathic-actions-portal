'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import api from '@/api/api';

const StatsContext = createContext(null);

export function StatsProvider({ children }) {
    const [stats, setStats] = useState({
        totalVolunteers: 0,
        activeVolunteers: 0,
        inactiveVolunteers: 0,
        pendingVolunteers: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/people');
            const usersData = response.data.data || response.data || [];

            const totalVolunteers = usersData.length;
            const activeVolunteers = usersData.filter(user => user.status === 'active' || user.status === 'Activo').length;
            const inactiveVolunteers = usersData.filter(user => user.status === 'inactive' || user.status === 'Inactivo').length;
            const pendingVolunteers = usersData.filter(user => user.status === 'pending' || user.status === 'Pendiente' || !user.status).length;

            setStats({
                totalVolunteers,
                activeVolunteers,
                inactiveVolunteers,
                pendingVolunteers
            });
        } catch (err) {
            setError(err);
            console.error("Failed to fetch stats:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <StatsContext.Provider value={{
            stats,
            loading,
            error,
            fetchStats
        }}>
            {children}
        </StatsContext.Provider>
    );
}

export const useStats = () => useContext(StatsContext);