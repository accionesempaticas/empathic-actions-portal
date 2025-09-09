'use client';

import { useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import DashboardNav from "@/components/layout/DashboardNav";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function RootWrapper({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return null; // Puedes poner un spinner si deseas
    }

    // ❌ Si no hay user, no aplicar DashboardLayout ni DashboardNav
    if (!user) {
        return <>{children}</>;
    }

    // ✅ Si hay sesión, aplicar el layout del dashboard
    return (
        <>
            <DashboardNav />
            <DashboardLayout>{children}</DashboardLayout>
        </>
    );
}
