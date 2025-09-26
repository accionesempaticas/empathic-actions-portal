'use client';

import { FaCheck, FaDownload, FaHome } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function RegistrationCompletePage() {
    const [signedDocumentUrl, setSignedDocumentUrl] = useState(null);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        // Obtener URL del documento firmado
        const url = sessionStorage.getItem('signedDocumentUrl');
        setSignedDocumentUrl(url);
        setHasAccess(true);
        
        // No limpiar la URL después de obtenerla para que el botón de descarga funcione
        // sessionStorage.removeItem('signedDocumentUrl');
        // sessionStorage.removeItem('documentCompleted');
        // sessionStorage.removeItem('completionTimestamp');
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
                                {signedDocumentUrl && (
                                    <a
                                        href={signedDocumentUrl}
                                        download={`Carta_Compromiso_Firmada.pdf`}
                                        className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                                    >
                                        <FaDownload className="inline-block mr-2" />
                                        Descargar Documento
                                    </a>
                                )}
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