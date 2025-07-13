'use client';

import React from 'react';

const Step6DocumentationAndSubmission = ({ nextStep, prevStep, handleChange, formData }) => {
    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Documentación y envío</h2>
            <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                    <label htmlFor="cvUpload" className="block text-sm font-medium text-gray-700">Adjunta tu CV actualizado en PDF *</label>
                    <input
                        type="file"
                        name="cvUpload"
                        id="cvUpload"
                        accept=".pdf"
                        onChange={(e) => handleChange({ target: { name: 'cvUpload', value: e.target.files[0] } })}
                        className="mt-1 block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        required
                    />
                    <p className="mt-1 text-sm text-gray-500">Solo archivos PDF (máx. 5MB)</p>
                </div>
                <div>
                    <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-700">¿Cómo te enteraste de esta convocatoria? *</label>
                    <select
                        name="howDidYouHear"
                        id="howDidYouHear"
                        onChange={handleChange}
                        value={formData.howDidYouHear || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="TikTok">TikTok</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Amigos o conocidos">Amigos o conocidos</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-between">
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
                    className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Step6DocumentationAndSubmission;
