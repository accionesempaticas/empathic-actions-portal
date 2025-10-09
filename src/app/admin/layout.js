'use client';

import { UsersProvider } from '@/contexts/UsersContext';
import { StatsProvider } from '@/contexts/StatsContext';
import MainLayout from "@/components/layout/MainLayout";

export default function AdminLayout({ children }) {
  return (
    <UsersProvider>
      <StatsProvider>
        <MainLayout>
          {children}
        </MainLayout>
      </StatsProvider>
    </UsersProvider>
  );
}