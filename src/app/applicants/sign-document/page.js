'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DocumentSigner from '@/components/applicants/DocumentSigner';
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaTimes } from 'react-icons/fa';

export default function SignDocumentPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [registrationUser, setRegistrationUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const checkIfUserAlreadySigned = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8002/api/check-document-status/${userId}`);
            const result = await response.json();
            
            if (result.has_signed_document) {
                // El usuario ya firmó el documento
                setModalTitle('Documento Ya Firmado');
                setModalMessage('Ya has completado tu documento de compromiso anteriormente. Te redirigiremos a la página principal.');
                setShowModal(true);
                
                // Redirigir después de 3 segundos
                setTimeout(() => {
                    router.push('/applicants/register');
                }, 3000);
                return;
            } else {
                // Si no ha firmado, también redirigir (solo se permite acceso desde el registro)
                setModalTitle('Acceso Restringido');
                setModalMessage('Para firmar tu documento, primero debes completar el proceso de registro. Te redirigiremos ahora.');
                setShowModal(true);
                
                // Redirigir después de 3 segundos
                setTimeout(() => {
                    router.push('/applicants/register');
                }, 3000);
                return;
            }
        } catch (error) {
            console.error('Error verificando estado del documento:', error);
            // En caso de error, redirigir por seguridad
            setModalTitle('Error de Verificación');
            setModalMessage('No pudimos verificar el estado de tu documento. Te redirigiremos a la página de registro.');
            setShowModal(true);
            
            // Redirigir después de 3 segundos
            setTimeout(() => {
                router.push('/applicants/register');
            }, 3000);
        }
    };

    useEffect(() => {
        if (!loading) {
            // Verificar si viene del registro
            const fromRegistration = localStorage.getItem('fromRegistration');
            const userData = localStorage.getItem('registrationUserData');
            const registrationTimestamp = localStorage.getItem('registrationTimestamp');
            
            if (!user && !fromRegistration) {
                // Si no hay usuario Y no viene del registro, redirigir al login
                router.push('/login');
            } else {
                // Si viene del registro, verificar que no hayan pasado más de 30 minutos
                if (fromRegistration && registrationTimestamp) {
                    const now = Date.now();
                    const timestamp = parseInt(registrationTimestamp);
                    const thirtyMinutes = 30 * 60 * 1000; // 30 minutos en milisegundos
                    
                    if (now - timestamp > thirtyMinutes) {
                        // Limpiar datos expirados y redirigir
                        localStorage.removeItem('fromRegistration');
                        localStorage.removeItem('registrationUserData');
                        localStorage.removeItem('registrationTimestamp');
                        
                        setModalTitle('Sesión Expirada');
                        setModalMessage('El tiempo para completar la firma ha expirado (30 minutos). Te redirigiremos al login para continuar.');
                        setShowModal(true);
                        
                        // Redirigir después de 3 segundos
                        setTimeout(() => {
                            router.push('/login');
                        }, 3000);
                        return;
                    }
                }
                
                // Permitir acceso si hay usuario O viene del registro válido
                let currentUser = user;
                
                // Si viene del registro, usar datos guardados
                if (fromRegistration && userData) {
                    try {
                        const parsedUser = JSON.parse(userData);
                        setRegistrationUser(parsedUser);
                        currentUser = parsedUser;
                    } catch (error) {
                        console.error('Error parsing registration data:', error);
                    }
                    
                    // Limpiar datos después de usarlos
                    localStorage.removeItem('fromRegistration');
                    localStorage.removeItem('registrationUserData');
                    localStorage.removeItem('registrationTimestamp');
                }
                
                // Solo verificar documentos firmados si NO viene del registro
                if (currentUser && currentUser.id && !fromRegistration) {
                    // Usuario autenticado accediendo directamente - verificar si ya firmó
                    checkIfUserAlreadySigned(currentUser.id);
                } else {
                    // Viene del registro o no hay usuario - permitir acceso
                    setIsLoading(false);
                }
            }
        }

        // Prevenir navegación hacia atrás con múltiples métodos
        const preventBack = (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.history.pushState(null, null, window.location.href);
            return false;
        };

        const handlePopState = () => {
            setShowConfirmationModal(true);
            window.history.pushState(null, null, window.location.href);
        };

        const handleBeforeUnload = (e) => {
            // Para el cierre de ventana/pestaña, mostrar el diálogo nativo 
            // ya que no podemos interceptar completamente este evento
            e.preventDefault();
            e.returnValue = '¿Estás seguro de que quieres abandonar? Se perderá todo el progreso.';
            return '¿Estás seguro de que quieres abandonar? Se perderá todo el progreso.';
        };

        // Múltiples métodos para prevenir navegación
        // Método 1: Agregar múltiples entradas al historial
        window.history.pushState(null, null, window.location.href);
        window.history.pushState(null, null, window.location.href);
        window.history.pushState(null, null, window.location.href);
        
        window.addEventListener('popstate', handlePopState);
        // window.addEventListener('beforeunload', handleBeforeUnload);
        
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
    }, [user, loading, router]);

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-turquesa-50 to-dorado-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquesa-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-turquesa-50 to-dorado-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                    Firma de Documento
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    Por favor, revisa y firma el documento de compromiso para continuar con tu proceso de registro como voluntario.
                                </p>
                            </div>
                            
                            <DocumentSigner user={user || registrationUser || { id: Date.now(), first_name: 'Usuario', last_name: 'Temporal' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de información */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-auto overflow-hidden border border-primary-200 transform animate-pulse">
                        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white p-3 rounded-full">
                                    {modalTitle.includes('Error') ? (
                                        <FaExclamationTriangle className="text-3xl text-red-500" />
                                    ) : modalTitle.includes('Restringido') ? (
                                        <FaTimes className="text-3xl text-orange-500" />
                                    ) : modalTitle.includes('Expirada') ? (
                                        <FaExclamationTriangle className="text-3xl text-yellow-500" />
                                    ) : (
                                        <FaCheckCircle className="text-3xl text-green-500" />
                                    )}
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white text-center">
                                {modalTitle}
                            </h2>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {modalMessage}
                            </p>
                            <div className="flex items-center justify-center space-x-2 text-primary-500">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-500 border-t-transparent"></div>
                                <span className="text-sm">Redirigiendo en unos segundos...</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmación de abandono */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-auto overflow-hidden border border-primary-200">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
                            <div className="flex justify-center mb-4">
                                <div className="bg-white p-3 rounded-full">
                                    <FaExclamationTriangle className="text-3xl text-orange-500" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white text-center">
                                ¿Confirmar Abandono?
                            </h2>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                ¿Estás seguro de que deseas abandonar el proceso de firma? 
                                Si abandonas ahora, tendrás que volver a completar todo el proceso desde el inicio.
                            </p>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        setShowConfirmationModal(false);
                                        // Reagregar entradas al historial para mantener la protección
                                        window.history.pushState(null, null, window.location.href);
                                    }}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    Continuar Firmando
                                </button>
                                <button
                                    onClick={() => {
                                        setShowConfirmationModal(false);
                                        // Limpiar protecciones y navegar
                                        window.removeEventListener('popstate', () => {});
                                        window.location.href = '/applicants/register';
                                    }}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                                >
                                    Sí, Abandonar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}