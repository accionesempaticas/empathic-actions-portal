'use client';

import { UsersProvider } from '@/contexts/UsersContext';
import MainLayout from "@/components/layout/MainLayout";
import { useAdminAuth } from '@/hooks/useAdminAuth';

function AdminLayoutContent({ children }) {
  const { isAdmin, loading } = useAdminAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  // Si no es admin, no renderizar nada (useAdminAuth ya maneja la redirección)
  if (!isAdmin) {
    return null;
  }

  // Si es admin, renderizar el layout normal
  return (
    <UsersProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </UsersProvider>
  );
}

export default function AdminLayout({ children }) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}