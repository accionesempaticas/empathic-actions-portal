'use client';

import React from 'react';

const PersonaForm = ({ initialData, onSubmit, onCancel }) => {
    return (
        <div className="p-6">
            <div className="text-center py-8">
                <p className="text-gray-500">Formulario de persona - Funcionalidad en desarrollo</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSubmit({})}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonaForm;