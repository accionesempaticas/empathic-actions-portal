'use client';

import React from 'react';
import { FaFilePdf, FaImage, FaUpload, FaTrash } from 'react-icons/fa';

// Componente Reutilizable para Carga de Archivos
const FileInput = ({ name, label, value, onChange, accept, required, helpText, referenceLink }) => {
    const handleFileChange = (e) => {
        onChange({ 
            target: { 
                name: name,
                files: e.target.files,
                type: 'file'
            } 
        });
    };

    const removeFile = () => {
        onChange({ 
            target: { 
                name: name,
                value: null,
                type: 'file'
            } 
        });
    };

    const isImage = value && value.type.startsWith('image/');

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <label htmlFor={name} className="block text-lg font-semibold text-gray-800 mb-3">
                {label}
                {referenceLink && (
                    <a href={referenceLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700 underline text-sm font-normal">
                        (Ver referencia)
                    </a>
                )}
            </label>
            
            {value ? (
                <div className="relative group">
                    {isImage ? (
                        <img src={URL.createObjectURL(value)} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-2" />
                    ) : (
                        <div className="flex items-center justify-center h-48 bg-gray-100 rounded-lg mb-2">
                            <FaFilePdf className="text-5xl text-red-500" />
                        </div>
                    )}
                    <p className="text-sm text-gray-600 truncate">{value.name}</p>
                    <button 
                        type="button"
                        onClick={removeFile}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <FaTrash />
                    </button>
                </div>
            ) : (
                <label htmlFor={name} className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-300">
                    <FaUpload className="text-4xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">{helpText}</p>
                    <input
                        type="file"
                        name={name}
                        id={name}
                        accept={accept}
                        onChange={handleFileChange}
                        className="hidden"
                        required={required}
                    />
                </label>
            )}
        </div>
    );
};

const Step5Documents = ({ nextStep, prevStep, handleChange, formData }) => {
    const isStepComplete = () => {
        const requiredFields = ['cv_file', 'pi_file', 'pf_file', 'dni_file', 'cul_file'];
        return requiredFields.every(field => formData[field]);
    };

    return (
        <div className="p-8 bg-gray-50 rounded-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Carga de Documentos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FileInput
                    name="cv_file"
                    label="Currículum Vitae (PDF)"
                    value={formData.cv_file}
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    required
                    helpText="Adjunta tu CV actualizado (PDF, DOC, DOCX)"
                />
                <FileInput
                    name="pi_file"
                    label="Foto Informal"
                    value={formData.pi_file}
                    onChange={handleChange}
                    accept=".jpg, .jpeg, .png"
                    required
                    helpText="Sube una foto tuya (JPG, JPEG, PNG)"
                />
                <FileInput
                    name="pf_file"
                    label="Foto Formal"
                    value={formData.pf_file}
                    onChange={handleChange}
                    accept=".jpg, .jpeg, .png"
                    required
                    helpText="Sube una foto formal (JPG, JPEG, PNG)"
                    referenceLink="https://www.canva.com/design/DAGg1L_x5HE/HGCnz8dCfluk3NtcF7cRcQ/edit"
                />
                <FileInput
                    name="dni_file"
                    label="Documento de Identidad"
                    value={formData.dni_file}
                    onChange={handleChange}
                    accept=".pdf, .jpg, .jpeg, .png"
                    required
                    helpText="Adjunta tu DNI/CE (PDF, JPG, JPEG, PNG)"
                />
                <FileInput
                    name="cul_file"
                    label="ANTECEDENTES"
                    value={formData.cul_file}
                    onChange={handleChange}
                    accept=".pdf"
                    required
                    helpText={<>Descarga <a href="https://www.empleosperu.gob.pe/portal-mtpe/#/login" target="_blank" rel="noopener noreferrer" className="underline">aquí</a> si eres peruano, ó firma <a href="https://drive.google.com/file/d/1GZXITGtIZ8Rj1Nz_X5MRvbDOsFRkMjk4/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="underline">declaración</a> si eres extranjero (PDF).</>}
                />
            </div>

            <div className="flex justify-between mt-12">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-transform duration-300 transform hover:scale-105"
                >
                    Anterior
                </button>
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepComplete()}
                    className={`font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${isStepComplete() ? 'bg-primary-500 hover:bg-primary-700 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Step5Documents;
