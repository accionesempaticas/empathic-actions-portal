'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useStats } from '@/contexts/StatsContext';
import UserManagement from '@/components/admin/UserManagement';

export default function DashboardPage() {
  const { stats, loading, fetchStats } = useStats();

  useEffect(() => {
    fetchStats();
  }, []);

  return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Encabezado principal */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100 mb-8">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8">
              <h1 className="text-4xl font-extrabold text-white tracking-tight text-center">
                Dashboard
              </h1>
              <p className="text-primary-100 text-center mt-2 text-lg">
                Panel de control - Portal de Voluntariado Empathic Actions
              </p>
            </div>
            
            {/* Contenido principal */}
            <div className="p-8">

              {/* Tarjetas de estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-white to-primary-50 p-6 rounded-2xl shadow-lg border border-primary-100 hover:shadow-xl transform hover:scale-105 transition duration-300">
                  <div className="flex items-center">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-bold text-neutral-600 uppercase tracking-wider">Total Voluntarios</p>
                      <p className="text-3xl font-extrabold text-primary-700">{loading ? '...' : stats.totalVolunteers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-secondary-50 p-6 rounded-2xl shadow-lg border border-secondary-100 hover:shadow-xl transform hover:scale-105 transition duration-300">
                  <div className="flex items-center">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-bold text-neutral-600 uppercase tracking-wider">Voluntarios Activos</p>
                      <p className="text-3xl font-extrabold text-secondary-700">{loading ? '...' : stats.activeVolunteers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-success-50 p-6 rounded-2xl shadow-lg border border-success-100 hover:shadow-xl transform hover:scale-105 transition duration-300">
                  <div className="flex items-center">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-success-500 to-success-600 text-white shadow-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-bold text-neutral-600 uppercase tracking-wider">Voluntarios Inactivos</p>
                      <p className="text-3xl font-extrabold text-success-700">{loading ? '...' : stats.inactiveVolunteers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-info-50 p-6 rounded-2xl shadow-lg border border-info-100 hover:shadow-xl transform hover:scale-105 transition duration-300">
                  <div className="flex items-center">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-info-500 to-info-600 text-white shadow-lg">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-bold text-neutral-600 uppercase tracking-wider">Voluntarios Pendientes</p>
                      <p className="text-3xl font-extrabold text-info-700">{loading ? '...' : stats.pendingVolunteers}</p>
                    </div>
                  </div>
                </div>
        </div>

              {/* Actividad Reciente */}
              <div className="bg-white rounded-2xl shadow-xl border border-primary-100 p-8">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-extrabold text-primary-700">Actividad Reciente</h2>
                  <div className="ml-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-success-100 to-success-200 text-success-800">
                      En vivo
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-neutral-50 to-primary-50 rounded-xl border border-primary-100 hover:shadow-md transition duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">M</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-neutral-900">María García se unió al proyecto "Ayuda Comunitaria"</p>
                      <p className="text-xs text-neutral-500 font-medium">Hace 2 horas</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-neutral-50 to-success-50 rounded-xl border border-success-100 hover:shadow-md transition duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">J</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-neutral-900">Juan Pérez completó 5 horas de voluntariado</p>
                      <p className="text-xs text-neutral-500 font-medium">Hace 4 horas</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-neutral-50 to-secondary-50 rounded-xl border border-secondary-100 hover:shadow-md transition duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-neutral-900">Ana López creó un nuevo proyecto "Educación Digital"</p>
                      <p className="text-xs text-neutral-500 font-medium">Hace 6 horas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}