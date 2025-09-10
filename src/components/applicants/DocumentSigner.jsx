'use client';

import { useState, useRef, useEffect } from 'react';
import { FaSignature, FaEraser, FaCheck } from 'react-icons/fa';
import SignatureCanvas from 'react-signature-canvas';
import api from '@/api/api';

export default function DocumentSigner({ user }) {
    const [documentUrl, setDocumentUrl] = useState(undefined); // Use undefined to distinguish from null on error
    const [signature, setSignature] = useState(null);
    const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
    const [loading, setLoading] = useState(false);
    const signatureRef = useRef(null);

    // Cargar documento de compromiso personalizado
    useEffect(() => {
        if (user) {
            setLoading(true);
            const params = new URLSearchParams({
                area: user.area || 'A1',
                first_name: user.first_name || 'Usuario',
                last_name: user.last_name || 'Ejemplo',
                document_type: user.document_type || 'DNI',
                document_number: user.document_number || '00000000',
                group: user.group || 'General',
                province: user.location?.province || user.province || 'Lima'
            });
            
            // Usar la instancia de api que ya tiene la baseURL configurada
            api.get(`/documents/commitment-letter/${user.id}?${params}`)
                .then(response => {
                    if (response.status === 200) {
                        // Construir la URL completa para el iframe usando la baseURL de api
                        const documentEndpoint = `${api.defaults.baseURL}/documents/commitment-letter/${user.id}?${params}`;
                        setDocumentUrl(documentEndpoint);
                    } else {
                        console.error('Error al cargar el documento:', response.status);
                        setDocumentUrl(null); // null indicates an error
                    }
                })
                .catch(error => {
                    console.error('Error de conexión al cargar el documento:', error);
                    setDocumentUrl(null); // null indicates an error
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    const clearSignature = () => {
        if (signatureRef.current) {
            signatureRef.current.clear();
            setIsSignatureEmpty(true);
            setSignature(null);
        }
    };

    const handleSignatureEnd = () => {
        if (signatureRef.current) {
            const isEmpty = signatureRef.current.isEmpty();
            setIsSignatureEmpty(isEmpty);
            if (!isEmpty) {
                const signatureData = signatureRef.current.toDataURL();
                setSignature(signatureData);
            }
        }
    };

    const handleSignDocument = async (event) => {
        if (event) {
            event.preventDefault();
        }

        if (!signature) {
            alert('Por favor, primero firma el documento.');
            return;
        }

        setLoading(true);

        const originalBeforeUnload = window.onbeforeunload;
        window.onbeforeunload = null;

        try {
            const formData = new FormData();
            formData.append('signature', signature);
            formData.append('user_id', user.id);
            formData.append('document_type', 'commitment_letter');

            const response = await api.post('/sign-document', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                const result = response.data;

                if (result.signed_document_url) {
                    sessionStorage.setItem('signedDocumentUrl', result.signed_document_url);
                }

                sessionStorage.setItem('documentCompleted', 'true');
                sessionStorage.setItem('completionTimestamp', Date.now().toString());

                window.location.href = '/applicants/registration-complete';
            } else {
                const errorText = response.data?.message || `Error ${response.status}: ${response.statusText}`;
                throw new Error(errorText);
            }
        } catch (error) {
            console.error('Error al procesar la firma:', error);
            alert(`Error al procesar la firma: ${error.message}`);
            window.onbeforeunload = originalBeforeUnload; // Restore only on error
        } finally {
            // Don't set loading to false if redirecting, but do it on error
            if (window.onbeforeunload) {
                setLoading(false);
            }
        }
    };

    return (
        <div className="space-y-8">
            {/* Instrucciones en la parte superior */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Instrucciones:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                    <div>
                        <p>• Lee cuidadosamente todo el documento</p>
                        <p>• Usa tu mouse o trackpad para crear tu firma digital</p>
                    </div>
                    <div>
                        <p>• Una vez revisado, procede a firmarlo</p>
                        <p>• Al finalizar, serás redirigido a la página de confirmación</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                {/* Visor de PDF - Más grande */}
                <div className="xl:col-span-3 bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Documento de Compromiso
                    </h3>
                    
                    <div className="border rounded-lg overflow-hidden bg-white">
                        {documentUrl ? (
                            <iframe
                                src={documentUrl}
                                className="w-full h-[600px]"
                                title="Documento de Compromiso"
                                style={{ border: 'none' }}
                            />
                        ) : (
                            <div className="h-[600px] flex items-center justify-center">
                                <div className="text-center">
                                    {loading && (
                                        <>
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquesa-500 mx-auto mb-4"></div>
                                            <p className="text-gray-600 font-bold">Generando tu carta de compromiso personalizada...</p>
                                        </>
                                    )}
                                    {documentUrl === undefined && !loading && (
                                        <>
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquesa-500 mx-auto mb-4"></div>
                                            <p className="text-gray-600">Cargando documento...</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Generando tu carta de compromiso personalizada
                                            </p>
                                        </>
                                    )}
                                    {documentUrl === null && (
                                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-red-700 font-bold">Error al cargar el documento.</p>
                                            <p className="text-red-600 text-sm">
                                                Verifica tu conexión a internet y que el servidor esté disponible.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Panel de Firma - Más ancho */}
                <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        <FaSignature className="inline-block mr-2" />
                        Área de Firma
                    </h3>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Firma aquí usando tu mouse o trackpad
                        </p>
                        
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                            <SignatureCanvas
                                ref={signatureRef}
                                penColor="black"
                                backgroundColor="rgba(255,255,255,1)"
                                canvasProps={{
                                    className: 'w-full h-48'
                                }}
                                onEnd={handleSignatureEnd}
                            />
                        </div>
                    </div>

                    <div className="flex space-x-3 mb-6">
                        <button
                            onClick={clearSignature}
                            className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                            type="button"
                        >
                            <FaEraser className="inline-block mr-2" />
                            Limpiar
                        </button>
                    </div>

                    {signature && (
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Vista previa de tu firma:</h4>
                            <div className="border rounded-lg p-4 bg-gray-50">
                                <img src={signature} alt="Firma" className="max-w-full h-auto" />
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                            <p className="text-sm text-yellow-800">
                                <strong>Importante:</strong> Al firmar confirmas que has leído y aceptas los términos y condiciones del programa.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignDocument}
                            disabled={isSignatureEmpty || loading || !documentUrl}
                            className={`w-full font-bold py-3 px-6 rounded-lg transition duration-300 ${
                                isSignatureEmpty || loading || !documentUrl
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                            }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Procesando...
                                </div>
                            ) : (
                                <>
                                    <FaCheck className="inline-block mr-2" />
                                    Firmar Documento
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
