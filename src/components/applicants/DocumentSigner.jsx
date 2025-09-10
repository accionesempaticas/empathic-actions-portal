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
        <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-lg mb-2 text-gray-800">INSTRUCCIONES:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Lee cuidadosamente todo el documento.</li>
                    <li>Usa tu mouse o trackpad para crear tu firma digital.</li>
                    <li>Una vez revisado, procede a firmarlo.</li>
                    <li>Al finalizar, serás redirigido a la página de confirmación.</li>
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="font-bold text-lg mb-2 text-gray-800">DOCUMENTO DE COMPROMISO</h3>
                {documentUrl ? (
                    <iframe src={documentUrl} className="w-full h-[600px] border rounded-lg" title="Documento de Compromiso"></iframe>
                ) : (
                    <div className="w-full h-[600px] border rounded-lg flex flex-col items-center justify-center bg-gray-100 text-gray-500">
                        {documentUrl === undefined && !loading && (
                            <p>Cargando documento...</p>
                        )}
                        {loading && (
                            <>
                                <svg className="animate-spin h-8 w-8 text-gray-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="font-bold">Generando tu carta de compromiso personalizada...</p>
                            </>
                        )}
                        {documentUrl === null && (
                            <div className="text-center">
                                <p className="font-bold text-red-500">Error al cargar el documento.</p>
                                <p>Verifica tu conexión a internet y que el servidor esté disponible.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <h3 className="font-bold text-lg mb-2 text-gray-800">ÁREA DE FIRMA</h3>
                <p className="mb-2 text-sm text-gray-600">Firma aquí usando tu mouse o trackpad.</p>
                <div className="bg-white border border-gray-300 rounded-lg touch-none">
                    <SignatureCanvas
                        ref={signatureRef}
                        penColor='black'
                        canvasProps={{ className: 'w-full h-48 rounded-lg' }}
                        onEnd={handleSignatureEnd}
                    />
                </div>
                <button
                    type="button"
                    onClick={clearSignature}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                    <FaEraser className="inline mr-1" />
                    Limpiar
                </button>
                {signature && (
                    <div className="mt-4">
                        <h4 className="font-bold text-sm text-gray-800">VISTA PREVIA DE TU FIRMA:</h4>
                        <img src={signature} alt="Vista previa de la firma" className="border rounded-lg mt-2 bg-white" />
                    </div>
                )}
            </div>

            <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                    Importante: Al firmar confirmas que has leído y aceptas los términos y condiciones del programa.
                </p>
                <button
                    type="button"
                    onClick={handleSignDocument}
                    disabled={isSignatureEmpty || loading || !documentUrl}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Procesando...
                        </>
                    ) : (
                        <>
                            <FaCheck className="inline mr-2" />
                            Firmar Documento
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
