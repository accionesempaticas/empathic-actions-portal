'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { FaSignature, FaEraser, FaCheck } from 'react-icons/fa';
import SignatureCanvas from 'react-signature-canvas';
import { useRouter } from 'next/navigation';

export default function DocumentSigner({ user }) {
    const [documentUrl, setDocumentUrl] = useState(null);
    const [signature, setSignature] = useState(null);
    const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
    const [loading, setLoading] = useState(false);
    const [documentSigned, setDocumentSigned] = useState(false);
    const [isProcessingSignature, setIsProcessingSignature] = useState(false);
    const allowNavigation = useRef(false); // Bandera para permitir navegación
    const signatureRef = useRef(null);
    const router = useRouter();

    // Función para prevenir la navegación accidental (usando useCallback)
    const handleBeforeUnload = useCallback((e) => {
        // Si se permite la navegación, no hacer nada
        if (allowNavigation.current) {
            return undefined;
        }
        
        // Solo prevenir si no estamos procesando la firma y el documento no está firmado
        if (!isProcessingSignature && !documentSigned) {
            e.preventDefault();
            e.returnValue = 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?';
            return 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?';
        }
        // Si estamos procesando o ya terminamos, no hacer nada (retornar undefined)
        return undefined;
    }, [isProcessingSignature, documentSigned]);

    // Cargar documento de compromiso personalizado
    useEffect(() => {
        if (user) {
            // Construir la URL con los datos del usuario (simplificado)
            const params = new URLSearchParams({
                area: user.area || 'A1',
                first_name: user.first_name || 'Usuario',
                last_name: user.last_name || 'Ejemplo',
                document_type: user.document_type || 'DNI',
                document_number: user.document_number || '00000000',
                group: user.group || 'General',
                province: user.location?.province || user.province || 'Lima'
            });
            
            const documentEndpoint = `http://127.0.0.1:8000/api/documents/commitment-letter/${user.id}?${params}`;
            
            // Verificar si el endpoint está disponible
            fetch(documentEndpoint, {
                method: 'GET',
                mode: 'cors',
                credentials: 'same-origin'
            })
                .then(response => {
                    if (response.ok) {
                        setDocumentUrl(documentEndpoint);
                        console.log('✅ Documento cargado correctamente');
                    } else {
                        console.error('Error al cargar el documento:', response.status);
                        setDocumentUrl(null);
                    }
                })
                .catch(error => {
                    console.error('Error de conexión:', error);
                    console.log('🔄 Intentando con modo fallback...');
                    setDocumentUrl(null);
                });
        }

        // Lógica para prevenir la navegación accidental
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [user, documentSigned]);

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
            } else {
                setSignature(null);
            }
        }
    };

    const handleSignDocument = async (event) => {
        // Prevenir cualquier comportamiento por defecto
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        console.log('🔵 Iniciando proceso de firma...');
        
        // Verificar si ya está en proceso
        if (loading) {
            console.log('⏸️ Ya hay un proceso en curso, ignorando click');
            return;
        }

        // Verificar firma nuevamente al momento del click
        const currentSignatureEmpty = signatureRef.current ? signatureRef.current.isEmpty() : true;
        const currentSignature = currentSignatureEmpty ? null : signatureRef.current.toDataURL();
        
        console.log('Current signature empty:', currentSignatureEmpty);
        console.log('Current signature data:', currentSignature ? 'Presente' : 'Ausente');

        if (currentSignatureEmpty || !currentSignature) {
            console.log('❌ No hay firma válida');
            alert('Por favor, primero firma el documento.');
            return;
        }

        // Actualizar estados con los valores actuales
        setSignature(currentSignature);
        setIsSignatureEmpty(false);
        
        console.log('✅ Firma válida, iniciando proceso...');
        setLoading(true);
        setIsProcessingSignature(true); // Marcar que estamos procesando
        
        try {
            console.log('🔵 Preparando FormData...');
            const formData = new FormData();
            formData.append('signature', currentSignature);
            formData.append('user_id', user.id);
            formData.append('document_type', 'commitment_letter');
            
            console.log('📤 Enviando request a:', 'http://127.0.0.1:8000/api/sign-document');
            console.log('📤 FormData keys:', Array.from(formData.keys()));
            console.log('📤 User ID:', user.id);
            console.log('📤 Token:', localStorage.getItem('access_token') ? 'Presente' : 'Ausente');

            const response = await fetch('http://127.0.0.1:8000/api/sign-document', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: formData
            });

            console.log('📥 Response status:', response.status);
            console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));
            
            if (response.ok) {
                console.log('✅ Response OK, parseando JSON...');
                const result = await response.json();
                console.log('✅ Result:', result);
                
                // Documento firmado exitosamente - guardar URL y redirigir
                console.log('✅ Documento firmado exitosamente');
                
                // Guardar la URL del documento firmado para descarga posterior
                if (result.signed_document_url) {
                    sessionStorage.setItem('signedDocumentUrl', result.signed_document_url);
                }
                
                // Marcar documento como completado con timestamp
                sessionStorage.setItem('documentCompleted', 'true');
                sessionStorage.setItem('completionTimestamp', Date.now().toString());
                
                // PERMITIR navegación antes de redirigir
                allowNavigation.current = true;
                
                // Redirigir INMEDIATAMENTE sin actualizar estados que causen re-render
                window.location.href = '/applicants/registration-complete';
                
            } else {
                console.log('❌ Response NOT OK');
                let errorText;
                try {
                    const errorData = await response.json();
                    console.log('❌ Error data:', errorData);
                    errorText = errorData.message || `Error ${response.status}: ${response.statusText}`;
                } catch (parseError) {
                    console.log('❌ Error parsing error response:', parseError);
                    const textResponse = await response.text();
                    console.log('❌ Raw error response:', textResponse);
                    errorText = `Error ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorText);
            }
        } catch (error) {
            console.error('❌ Catch error:', error);
            console.error('❌ Error stack:', error.stack);
            alert(`Error al procesar la firma: ${error.message}`);
        } finally {
            setLoading(false);
            setIsProcessingSignature(false);
            console.log('🔵 Proceso terminado');
        }
    };

    // Función auxiliar para verificar si puede firmar
    const canSign = () => {
        if (loading) return false;
        if (signatureRef.current && !signatureRef.current.isEmpty()) return true;
        return !isSignatureEmpty && signature;
    };

    if (documentSigned) {
        return (
            <div className="text-center py-16">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 inline-block">
                    <FaCheck className="inline-block mr-2" />
                    ¡Documento firmado exitosamente!
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Proceso Completado
                </h2>
                <p className="text-gray-600 mb-6">
                    Tu documento firmado ha sido guardado y está disponible para descarga.
                    El documento también aparecerá en tu perfil para futuras referencias.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => window.location.href = '/applicants/complete-profile'}
                        className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                    >
                        Ir a Mi Perfil
                    </button>
                </div>
            </div>
        );
    }

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
                        <p>• Al finalizar, se descargará automáticamente</p>
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
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquesa-500 mx-auto mb-4"></div>
                                    <p className="text-gray-600">Cargando documento...</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Generando tu carta de compromiso personalizada
                                    </p>
                                    {documentUrl === null && (
                                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-red-700 text-sm">
                                                Error al cargar el documento. Verifica que el servidor esté funcionando en http://127.0.0.1:8000
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
                        <FaSignature className="inline-block mr-4" />
                        Área de Firma
                    </h3>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-10">
                        <p className="text-sm text-gray-600 mb-6 text-center">
                            Firma aquí usando tu mouse o trackpad
                        </p>
                        
                        <div className="border-2 border-gray-200 rounded-lg overflow-hidden flex justify-center items-center p-4">
                            <SignatureCanvas
                                ref={signatureRef}
                                penColor="black"
                                backgroundColor="rgba(255,255,255,1)"
                                canvasProps={{
                                    width: 820,
                                    height: 200,
                                    style: {
                                        border: 'none',
                                        display: 'block',
                                        width: '820px',
                                        height: '200px',
                                        maxWidth: 'none',
                                        maxHeight: 'none'
                                    }
                                }}
                                onEnd={handleSignatureEnd}
                                clearOnResize={false}
                                throttle={16}
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
                            disabled={!canSign()}
                            className={`w-full font-bold py-3 px-6 rounded-lg transition duration-300 ${
                                !canSign()
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