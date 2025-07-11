'use client';

import { useState } from 'react';
import api from '@/api/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DocumentManagementPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [templateName, setTemplateName] = useState('');
    const [templateContent, setTemplateContent] = useState('');
    const [uploadedFilePath, setUploadedFilePath] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    // Redirect if not authenticated
    if (!authLoading && !user) {
        router.push('/login');
        return null;
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadedFilePath(''); // Clear previous path
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!selectedFile) {
            setError('Por favor, selecciona un archivo PDF para subir.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf_file', selectedFile);

        try {
            const response = await api.post('/documents/upload-pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            setUploadedFilePath(response.data.file_path);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al subir el archivo.');
            console.error(err);
        }
    };

    const handleCreateTemplate = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!templateName || !uploadedFilePath) {
            setError('Por favor, ingresa un nombre para la plantilla y sube un archivo PDF primero.');
            return;
        }

        try {
            const response = await api.post('/documents/create-template', {
                name: templateName,
                file_path: uploadedFilePath,
                content: templateContent,
            });
            setMessage(response.data.message);
            setTemplateName('');
            setTemplateContent('');
            setSelectedFile(null);
            setUploadedFilePath('');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al crear la plantilla.');
            console.error(err);
        }
    };

    if (authLoading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-primary-700">Gestión de Documentos</h1>

            {message && <p className="text-green-600 mb-4">{message}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            {/* Sección de Subida de PDF */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-primary-600">Subir Archivo PDF</h2>
                <form onSubmit={handleUpload} className="space-y-4">
                    <div>
                        <label htmlFor="pdf_file" className="block text-gray-700 text-sm font-bold mb-2">Seleccionar PDF:</label>
                        <input
                            type="file"
                            id="pdf_file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-primary-50 file:text-primary-700
                            hover:file:bg-primary-100"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                    >
                        Subir PDF
                    </button>
                </form>
                {uploadedFilePath && (
                    <p className="mt-4 text-sm text-gray-600">Archivo subido: <span className="font-mono text-primary-700">{uploadedFilePath}</span></p>
                )}
            </div>

            {/* Sección de Creación de Plantilla */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-primary-600">Crear Plantilla de Documento</h2>
                <form onSubmit={handleCreateTemplate} className="space-y-4">
                    <div>
                        <label htmlFor="template_name" className="block text-gray-700 text-sm font-bold mb-2">Nombre de la Plantilla:</label>
                        <input
                            type="text"
                            id="template_name"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="template_file_path" className="block text-gray-700 text-sm font-bold mb-2">Ruta del Archivo PDF (automático después de subir):</label>
                        <input
                            type="text"
                            id="template_file_path"
                            value={uploadedFilePath}
                            readOnly
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label htmlFor="template_content" className="block text-gray-700 text-sm font-bold mb-2">Contenido (Opcional, para templates de texto):</label>
                        <textarea
                            id="template_content"
                            value={templateContent}
                            onChange={(e) => setTemplateContent(e.target.value)}
                            rows="5"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                    >
                        Crear Plantilla
                    </button>
                </form>
            </div>
        </div>
    );
}
