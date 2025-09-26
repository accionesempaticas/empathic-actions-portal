'use client';

import { useState } from 'react';
import { FaEye, FaFile, FaImage, FaFilePdf } from 'react-icons/fa';

export default function FileViewer({ person, onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const files = [
        { name: 'CV', path: person.cv_path, type: 'document' },
        { name: 'DNI Escaneado', path: person.dni_scan_path, type: 'document' },
        { name: 'Certificado Unico Laboral', path: person.lab_cert_path, type: 'document' },
        { name: 'Carta de Compromiso Firmada', path: person.commitment_letter_path, type: 'document' },
        { name: 'Foto Informal', path: person.photo_informal_path, type: 'image' },
        { name: 'Foto Formal', path: person.photo_formal_path, type: 'image' }
    ].filter(file => file.path);

    const viewFile = async (filePath, fileName, fileType) => {
        try {
            const response = await fetch(`https://empatic-api-production.up.railway.app/api/documents/download?file_path=${encodeURIComponent(filePath)}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                
                setSelectedFile({
                    name: fileName,
                    url: url,
                    type: fileType,
                    blob: blob
                });
            } else {
                alert('Error al cargar el archivo');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar el archivo');
        }
    };

    const closeFileViewer = () => {
        if (selectedFile?.url) {
            window.URL.revokeObjectURL(selectedFile.url);
        }
        setSelectedFile(null);
    };

    const getFileIcon = (type) => {
        switch (type) {
            case 'image':
                return <FaImage className="text-green-500" />;
            case 'document':
                return <FaFilePdf className="text-red-500" />;
            default:
                return <FaFile className="text-gray-500" />;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full mx-auto overflow-hidden border border-primary-200 max-h-[90vh]">
                {/* Header */}
                <div className="bg-primary-500 p-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">
                            Archivos de {person.first_name} {person.last_name}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-primary-200 text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {files.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-gray-500 text-lg">
                            No hay archivos disponibles para este usuario.
                        </p>
                    </div>
                ) : (
                    <div className="flex h-[calc(90vh-120px)]">
                        {/* Panel izquierdo - Lista de documentos */}
                        <div className="w-1/3 border-r border-primary-100 p-6 overflow-y-auto">
                            <h3 className="text-lg font-semibold text-primary-700 mb-4">
                                Documentos Disponibles
                            </h3>
                            <div className="space-y-3">
                                {files.map((file, index) => (
                                    <div 
                                        key={index} 
                                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                                            selectedFile?.name === `${person.first_name}_${person.last_name}_${file.name}` 
                                            ? 'border-primary-500 bg-primary-50' 
                                            : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                                        }`}
                                        onClick={() => viewFile(file.path, `${person.first_name}_${person.last_name}_${file.name}`, file.type)}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                {getFileIcon(file.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-primary-700 truncate">
                                                    {file.name}
                                                </p>
                                                <p className="text-xs text-primary-500 truncate">
                                                    {file.type === 'image' ? 'Imagen' : 'Documento'}
                                                </p>
                                            </div>
                                            <FaEye className="text-primary-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Panel derecho - Visualizador */}
                        <div className="flex-1 p-6 overflow-y-auto">
                            {selectedFile ? (
                                <div className="h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-primary-700">
                                            {selectedFile.name}
                                        </h3>
                                        <button
                                            onClick={closeFileViewer}
                                            className="text-primary-400 hover:text-primary-600 font-semibold"
                                        >
                                            Cerrar vista
                                        </button>
                                    </div>
                                    
                                    <div className="bg-primary-50 rounded-xl p-4 h-[calc(100%-60px)] overflow-auto border border-primary-200">
                                        {selectedFile.type === 'image' ? (
                                            <img 
                                                src={selectedFile.url} 
                                                alt={selectedFile.name}
                                                className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                                            />
                                        ) : (
                                            <iframe
                                                src={selectedFile.url}
                                                className="w-full h-full border-0 rounded-lg"
                                                title={selectedFile.name}
                                            />
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center text-primary-400">
                                        <FaFile className="mx-auto text-6xl mb-4 opacity-50" />
                                        <p className="text-lg font-medium">
                                            Selecciona un documento de la lista
                                        </p>
                                        <p className="text-sm opacity-75">
                                            Haz clic en cualquier archivo para visualizarlo
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}