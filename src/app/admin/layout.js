'use client';

import { UsersProvider } from '@/contexts/UsersContext';

export default function AdminLayout({ children }) {
  return (
    <UsersProvider>
      {children}
    </UsersProvider>
  );
}