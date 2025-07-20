'use client';

import { UsersProvider } from '@/contexts/UsersContext';
import MainLayout from "@/components/layout/MainLayout";

export default function AdminLayout({ children }) {
  return (
    <UsersProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </UsersProvider>
  );
}