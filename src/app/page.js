'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role === 'admin') {
        router.push('/admin/users');
      } else if (user.role === 'user') {
        router.push('/applicants/complete-profile');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return null; // Or a loading spinner, or a message
}
