'use client';

import React from 'react';

const Step6FinalSubmission = ({ nextStep, prevStep, handleChange, formData, handleSubmit }) => {
    const isStepComplete = () => {
        // Check if 'howDidYouHear' is selected and 'declaration' is checked
        return formData.howDidYouHear && formData.declaration;
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Motivación y Envío Final</h2>

            {/* How did you hear about us? */}
            <div className="mb-6">
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
                        <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="ml-1 underline text-blue-800 font-medium">TikTok</a>,
                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="ml-1 underline text-blue-800 font-medium">LinkedIn</a> y
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="ml-1 underline text-blue-800 font-medium">Facebook</a>.
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

export default Step6FinalSubmission;
