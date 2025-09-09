'use client';

import React from 'react';

const Step5Documents = ({ nextStep, prevStep, handleChange, formData }) => {
    const handleFileChange = (e) => {
        handleChange({ 
            target: { 
                name: e.target.name, // ← usa el name real del input (cv_file, pi_file o pf_file)
                value: e.target.files[0] 
            } 
        });
    };

    const isStepComplete = () => {
        const requiredFields = ['cv_file', 'pi_file', 'pf_file', 'dni_file', 'cul_file'];
        return requiredFields.every(field => {
            return formData[field];
        });
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Documentos</h2>

            {/* CV Upload */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Currículum Vitae</h3>
                <div>
                    <label htmlFor="cv_file" className="block text-sm font-medium text-gray-700">Adjunta tu CV actualizado en PDF *</label>
                    <input
                        type="file"
                        name="cv_file"
                        id="cv_file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        required
                    />
                    <p className="mt-1 text-sm text-gray-500">Solo archivos PDF (máx. 10MB)</p>
                    {formData.cv_file && <p className="mt-2 text-sm text-green-600">Archivo seleccionado: {formData.cv_file.name}</p>}
                </div>
            </div>

            {/* Photos Upload */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Fotos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pi_file" className="block text-sm font-medium text-gray-700">Adjunta una foto informal *</label>
                        <input
                            type="file"
                            name="pi_file"
                            id="pi_file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">Solo archivos JPG, JPEG o PNG (máx. 10MB)</p>
                        {formData.pi_file && <p className="mt-2 text-sm text-green-600">Imagen seleccionada: {formData.pi_file.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="pf_file" className="block text-sm font-medium text-gray-700">Adjunta una foto formal * <a 
                                    href="https://www.canva.com/design/DAGg1L_x5HE/HGCnz8dCfluk3NtcF7cRcQ/edit" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="ml-1 text-black-100 hover:text-black-300 underline font-low"
                                > 
                                <strong>(Referencia)</strong>
                                </a></label>
                        <input
                            type="file"
                            name="pf_file"
                            id="pf_file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">Solo archivos JPG, JPEG o PNG (máx. 10MB)</p>
                        </div>
                        {formData.pf_file && <p className="mt-2 text-sm text-green-600">Imagen seleccionada: {formData.pf_file.name}</p>}
                </div>
            </div>

            {/* DNI and CUL Upload */}
            <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Documentos de Identidad y Laborales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dni_file" className="block text-sm font-medium text-gray-700">Adjunta tu DNI *</label>
                        <input
                            type="file"
                            name="dni_file"
                            id="dni_file"
                            accept=".pdf, .jpg, .jpeg, .png"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">PDF o imagen (máx. 10MB)</p>
                        {formData.dni_file && <p className="mt-2 text-sm text-green-600">Archivo seleccionado: {formData.dni_file.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="cul_file" className="block text-sm font-medium text-gray-700">Adjunta tu Certificado Único Laboral (CUL) *</label>
                        <input
                            type="file"
                            name="cul_file"
                            id="cul_file"
                            accept=".pdf, .jpg, .jpeg, .png"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            required
                        />
                        <p className="mt-1 text-sm text-gray-500">PDF o imagen (máx. 10MB)</p>
                        {formData.cul_file && <p className="mt-2 text-sm text-green-600">Archivo seleccionado: {formData.cul_file.name}</p>}
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-secondary-300 hover:bg-secondary-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Anterior
                </button>
                <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepComplete()}
                    className={`font-bold py-2 px-4 rounded ${isStepComplete() ? 'bg-primary-500 hover:bg-primary-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Step5Documents;