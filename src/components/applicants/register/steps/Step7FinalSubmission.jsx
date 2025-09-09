'use client';

import React from 'react';

const Step7FinalSubmission = ({ nextStep, prevStep, handleChange, formData, handleSubmit }) => {
    const isStepComplete = () => {
        // Check if 'declaration' is checked
        return formData.declaration;
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Envío Final</h2>

            {/* Declaration Checkbox */}
            <div className="mb-6">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="declaration"
                        checked={formData.declaration || false}
                        onChange={(e) => handleChange({ target: { name: 'declaration', value: e.target.checked } })}
                        className="form-checkbox"
                        required
                    />
                    <span className="ml-2 text-sm text-gray-700">Declaro que la información proporcionada es veraz y completa. *</span>
                </label>
            </div>

            {/* Thank You Message */}
            <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 mb-6" role="alert">
                <p className="font-bold">¡Gracias por tu interés!</p>
                <p>
                    Apreciamos tu interés en formar parte de <strong>Acciones Empáticas</strong>. Revisaremos tu perfil y nos pondremos en contacto contigo.
                    Para consultas escríbenos al <a href="tel:+51957028995" className="font-bold underline">957028995</a> o al correo <a href="mailto:acciones.empaticas@grupoempatic.com" className="font-bold underline">acciones.empaticas@grupoempatic.com</a>.
                </p>
                <p className="mt-2">Puedes seguirnos en nuestras redes:</p>
                <ul className="list-disc list-inside">
                    <li><strong>Acciones Empáticas:</strong>
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="ml-1 underline text-blue-800 font-medium">LinkedIn</a> y
                    </li>
                </ul>
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
                    onClick={handleSubmit}
                    disabled={!isStepComplete()}
                    className={`font-bold py-2 px-4 rounded ${isStepComplete() ? 'bg-primary-500 hover:bg-primary-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Enviar Formulario
                </button>
            </div>
        </div>
    );
};

export default Step7FinalSubmission;
