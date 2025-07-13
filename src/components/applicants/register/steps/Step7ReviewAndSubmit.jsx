'use client';

import React from 'react';

const Step7ReviewAndSubmit = ({ prevStep, formData, handleSubmit }) => {
    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Revisión y envío</h2>
            <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">Resumen de tu postulación:</h3>
                {Object.entries(formData).map(([key, value]) => (
                    <p key={key} className="text-sm text-gray-700">
                        <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </p>
                ))}
            </div>
            <div className="mb-6">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="declaration"
                        className="form-checkbox"
                        required
                    />
                    <span className="ml-2 text-sm text-gray-700">
                        Declaro que la información proporcionada es verdadera y autorizo el uso de mis datos para futuras convocatorias. *
                    </span>
                </label>
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
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded"
                >
                    Enviar postulación
                </button>
            </div>
        </div>
    );
};

export default Step7ReviewAndSubmit;
