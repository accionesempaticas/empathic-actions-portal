'use client';

import { FaCheck, FaDownload, FaHome } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function RegistrationCompletePage() {
    const [signedDocumentUrl, setSignedDocumentUrl] = useState(null);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        // Verificar si tiene acceso válido a esta página
        const documentCompleted = sessionStorage.getItem('documentCompleted');
        const completionTimestamp = sessionStorage.getItem('completionTimestamp');
        
        if (!documentCompleted || !completionTimestamp) {
            // Redirigir si no tiene acceso válido
            window.location.href = '/applicants/register';
            return;
        }
        
        // Verificar que no hayan pasado más de 5 minutos
        const now = Date.now();
        const timestamp = parseInt(completionTimestamp);
        const fiveMinutes = 5 * 60 * 1000; // 5 minutos en milisegundos
        
        if (now - timestamp > fiveMinutes) {
            // Limpiar datos y redirigir si ha expirado
            sessionStorage.removeItem('documentCompleted');
            sessionStorage.removeItem('completionTimestamp');
            sessionStorage.removeItem('signedDocumentUrl');
            window.location.href = '/applicants/register';
            return;
        }
        
        // Obtener URL del documento firmado
        const url = sessionStorage.getItem('signedDocumentUrl');
        setSignedDocumentUrl(url);
        setHasAccess(true);
        
        // Limpiar la URL después de obtenerla
        sessionStorage.removeItem('signedDocumentUrl');
        sessionStorage.removeItem('documentCompleted');
        sessionStorage.removeItem('completionTimestamp');
        // Prevenir navegación hacia atrás con múltiples métodos
        const handlePopState = () => {
            window.history.pushState(null, null, window.location.href);
        };

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
            return '';
        };

        // Múltiples métodos para prevenir navegación
        // Método 1: Agregar múltiples entradas al historial
        window.history.pushState(null, null, window.location.href);
        window.history.pushState(null, null, window.location.href);
        window.history.pushState(null, null, window.location.href);
        
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        // Método 2: Interceptar el historial cada segundo
        const historyInterval = setInterval(() => {
            window.history.pushState(null, null, window.location.href);
        }, 1000);
        
        // También prevenir gestos de navegación en móvil
        const preventSwipe = (e) => {
            if (e.touches && e.touches.length > 1) {
                e.preventDefault();
            }
        };
        
        document.addEventListener('touchstart', preventSwipe, { passive: false });

        // Cleanup al desmontar el componente
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('touchstart', preventSwipe);
            clearInterval(historyInterval);
        };
    }, []);

    // Mostrar loading mientras verifica acceso
    if (!hasAccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verificando acceso...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Contenedor principal */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-white rounded-full p-6 shadow-lg">
                                <FaCheck className="text-primary-500 text-6xl" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                            Registro Completado
                        </h1>
                        <p className="text-primary-100 text-xl">
                            Gracias por completar tu proceso de registro
                        </p>
                    </div>
                    
                    {/* Contenido */}
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
                                
                                <h2 className="text-2xl font-bold text-green-800 mb-3">
                                    Felicitaciones
                                </h2>
                                <p className="text-green-700 text-lg leading-relaxed">
                                    Has completado exitosamente tu registro como voluntario en 
                                    <span className="font-semibold"> Acciones Empáticas</span>. 
                                    Tu documento ha sido firmado y guardado correctamente.
                                </p>
                            </div>
                        </div>

                        {/* Información adicional */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                                    
                                    Documento firmado
                                </h3>
                                <p className="text-blue-700">
                                    Tu carta de compromiso ha sido firmada digitalmente y está disponible 
                                    para futuras referencias en tu perfil.
                                </p>
                            </div>
                            
                            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                                    Próximos pasos
                                </h3>
                                <p className="text-purple-700">
                                    Recibirás un correo con información adicional sobre tu participación 
                                    en el programa de voluntariado.
                                </p>
                            </div>
                        </div>

                        {/* Mensaje de agradecimiento */}
                        <div className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-2xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-primary-700 mb-4">
                                Gracias por ser parte del cambio
                            </h3>
                            <p className="text-primary-600 text-lg leading-relaxed mb-6">
                                Tu compromiso y dedicación como voluntario contribuirán significativamente 
                                a crear un impacto positivo en nuestra comunidad. Juntos podemos hacer la diferencia.
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}