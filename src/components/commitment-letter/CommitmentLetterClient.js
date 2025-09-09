'use client';

import { useState, useEffect } from 'react';
import api from '@/api/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function CommitmentLetterClient() {
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSignModal, setShowSignModal] = useState(false);
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    // PDF Viewer states
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // Responsive states
    const [isMobileView, setIsMobileView] = useState(false);
    const [showViewerOnMobile, setShowViewerOnMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
        };

        // Set initial state
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    // Redirect if not authenticated and auth check is complete
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    const fetchData = async () => {
        try {
            if (user) {
                const [pendingRes, signedRes] = await Promise.all([
                    api.get('/documents/pending'),
                    api.get('/documents/signed')
                ]);

                const combinedDocs = [
                    ...pendingRes.data.map(doc => ({ ...doc, status: 'pending' })),
                    ...signedRes.data.map(doc => ({ ...doc, status: 'signed' }))
                ];
                setDocuments(combinedDocs);
                setError('');
                return combinedDocs; // Return the updated documents
            }
            return [];
        } catch (err) {
            setError('Error al cargar los documentos. Por favor, inicia sesión e inténtalo de nuevo.');
            console.error(err);
            return [];
        }
    };

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const handleSignDocument = async (e) => {
        e.preventDefault();
        if (!selectedDoc) return;

        try {
            await api.post(`/documents/sign/${selectedDoc.id}`, { password });
            alert('Documento firmado exitosamente');
            setPassword('');
            setShowSignModal(false);
            setShowViewerOnMobile(false); // Hide viewer on mobile after signing

            // Re-fetch data and get the updated list
            const updatedDocuments = await fetchData();

            // Find the just-signed document in the updated list
            const newlySignedDoc = updatedDocuments.find(doc => doc.id === selectedDoc.id);

            // If found, set it as the selected document to update the viewer
            if (newlySignedDoc) {
                setSelectedDoc(newlySignedDoc);
            } else {
                // If for some reason it's not found (e.g., deleted), clear selection
                setSelectedDoc(null);
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Error al firmar el documento.');
            console.error(err);
        }
    };

    const handleDownloadPrint = (doc) => {
        const urlToOpen = doc.signed_pdf_url || doc.file_path;
        if (urlToOpen) {
            window.open(urlToOpen, '_blank');
        } else {
            alert('URL del documento no disponible.');
        }
    };

    const handleSelectDoc = (doc) => {
        setSelectedDoc(doc);
        if (isMobileView) {
            setShowViewerOnMobile(true);
        }
    };

    const handleBackToList = () => {
        setSelectedDoc(null);
        setShowViewerOnMobile(false);
    };

    if (authLoading || !user) {
        return <p>Cargando autenticación...</p>;
    }

    if (error) {
        return <p className="text-red-600 text-center font-medium">{error}</p>;
    }

    return (
        <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Columna de la izquierda: Lista de documentos */}
                {(!isMobileView || !showViewerOnMobile) && (
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-bold mb-5 text-primary-700">Mis Documentos</h2>
                        {documents.length > 0 ? (
                            <ul className="space-y-4">
                                {documents.map(doc => (
                                    <li
                                        key={doc.id}
                                        onClick={() => handleSelectDoc(doc)}
                                        className={`p-5 bg-white rounded-lg shadow-md cursor-pointer hover:bg-primary-50 transition duration-200 ease-in-out border ${selectedDoc?.id === doc.id ? 'border-primary-500' : 'border-gray-200'}`}
                                    >
                                        <p className="font-semibold text-lg text-gray-800">{doc.name || doc.document_template.name}</p>
                                        {doc.description && <p className="text-sm text-gray-600 mt-1">{doc.description}</p>}
                                        {doc.status === 'signed' && <p className="text-sm text-gray-600 mt-1">Firmado el: {new Date(doc.signed_at).toLocaleString()}</p>}
                                        {doc.status === 'pending' && <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 mt-2">Pendiente</span>}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No tienes documentos.</p>
                        )}
                    </div>
                )}

                {/* Columna de la derecha: Visualización del documento y acciones */}
                {(!isMobileView || showViewerOnMobile) && (
                    <div className="md:col-span-3">
                        {selectedDoc ? (
                            <div className="border p-4 bg-white rounded-lg shadow-lg overflow-hidden">
                                {isMobileView && (
                                    <button
                                        onClick={handleBackToList}
                                        className="mb-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out"
                                    >
                                        ← Volver a la lista
                                    </button>
                                )}
                                <h2 className="text-2xl font-bold mb-4 text-primary-700">{selectedDoc.name || selectedDoc.document_template.name}</h2>

                                {selectedDoc.status === 'pending' && (
                                    <button
                                        onClick={() => setShowSignModal(true)}
                                        className="mb-4 bg-primary-600 text-white py-2 px-5 rounded-lg hover:bg-primary-700 transition duration-200 ease-in-out shadow-md w-full"
                                    >
                                        Firmar Documento
                                    </button>
                                )}

                                {(selectedDoc.file_path || selectedDoc.signed_pdf_url) && (selectedDoc.file_path?.endsWith('.pdf') || selectedDoc.signed_pdf_url?.endsWith('.pdf')) ? (
                                    <div className="pdf-viewer-container border border-gray-300 rounded-lg overflow-hidden">
                                        <Document
                                            file={selectedDoc.signed_pdf_url || (selectedDoc.file_path ? `${process.env.NEXT_PUBLIC_API_URL}/documents/${selectedDoc.id}/view` : '')}
                                            onLoadSuccess={onDocumentLoadSuccess}
                                            options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
                                        >
                                            <Page pageNumber={pageNumber} width={Math.min(window.innerWidth * 0.4, 600)} />
                                        </Document>
                                        <p className="text-center mt-2">
                                            Página {pageNumber} de {numPages}
                                        </p>
                                        <div className="flex justify-center gap-2 mt-2">
                                            <button
                                                disabled={pageNumber <= 1}
                                                onClick={() => setPageNumber(prevPageNumber => prevPageNumber - 1)}
                                                className="bg-gray-200 text-gray-700 py-1 px-3 rounded-md disabled:opacity-50"
                                            >
                                                Anterior
                                            </button>
                                            <button
                                                disabled={pageNumber >= numPages}
                                                onClick={() => setPageNumber(prevPageNumber => prevPageNumber + 1)}
                                                className="bg-gray-200 text-gray-700 py-1 px-3 rounded-md disabled:opacity-50"
                                            >
                                                Siguiente
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg font-mono text-sm border border-gray-200 overflow-auto max-h-96">
                                        {selectedDoc.content || 'No hay contenido para mostrar.'}
                                    </pre>
                                )}

                                {selectedDoc.status === 'signed' && (
                                    <button
                                        onClick={() => handleDownloadPrint(selectedDoc)}
                                        className="mt-6 bg-primary-600 text-white py-3 px-8 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-200 ease-in-out shadow-md w-full"
                                    >
                                        Descargar / Imprimir
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-lg shadow-inner flex items-center justify-center text-gray-500 h-full">
                                <p>Selecciona un documento para ver su contenido.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showSignModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
                    <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Firmar Documento</h3>
                        <p className="mb-5 text-gray-600">Ingresa tu contraseña para confirmar tu identidad y firmar este documento.</p>
                        <form onSubmit={handleSignDocument}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Tu contraseña"
                                required
                                className="border border-primary-200 focus:ring-primary-500 focus:border-primary-500 block w-full p-3 rounded-lg transition duration-200 ease-in-out mb-4"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowSignModal(false)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200 ease-in-out"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                                >
                                    Firmar
                                </button>
                            </div>
                        </form>
                        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}