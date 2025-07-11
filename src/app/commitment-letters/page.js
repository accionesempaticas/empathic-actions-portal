'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import CommitmentLetterClient from '@/components/commitment-letter/CommitmentLetterClient';

export default function CommitmentLettersPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || (user.role !== 'user' && user.role !== 'admin'))) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user || (user.role !== 'user' && user.role !== 'admin')) {
        return null; // Or a message indicating unauthorized access
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Cartas de Compromiso</h1>
            <CommitmentLetterClient />
        </div>
    );
}