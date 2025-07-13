'use client';

import React from 'react';

const Step5MotivationAndContribution = ({ nextStep, prevStep, handleChange, formData }) => {
    // You would typically fetch roles from an API or define them here
    const roles = [
        'Gestión de Proyectos',
        'Marketing y Comunicación',
        'Diseño Gráfico',
        'Desarrollo Web',
        'Recursos Humanos',
        'Finanzas',
        'Logística',
        'Contenido y Redacción',
        'Fotografía y Video',
        'Apoyo en Eventos',
    ];

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Motivación y aporte</h2>
            <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                    <label htmlFor="howToContribute" className="block text-sm font-medium text-gray-700">¿Cómo consideras que podrías aportar a ACCIONES EMPÁTICAS? *</label>
                    <textarea
                        name="howToContribute"
                        id="howToContribute"
                        rows="4"
                        onChange={handleChange}
                        value={formData.howToContribute || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Marca el rol que te gustaría desempeñar en la organización *</label>
                    <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {roles.map((role) => (
                            <label key={role} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="desiredRoles"
                                    value={role}
                                    checked={formData.desiredRoles?.includes(role) || false}
                                    onChange={(e) => {
                                        const { value, checked } = e.target;
                                        let updatedRoles = formData.desiredRoles ? [...formData.desiredRoles] : [];
                                        if (checked) {
                                            updatedRoles.push(value);
                                        } else {
                                            updatedRoles = updatedRoles.filter((r) => r !== value);
                                        }
                                        handleChange({ target: { name: 'desiredRoles', value: updatedRoles } });
                                    }}
                                    className="form-checkbox"
                                />
                                <span className="ml-2">{role}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700">¿Cuántas horas a la semana podrías brindar como voluntario? *</label>
                    <input
                        type="number"
                        name="weeklyHours"
                        id="weeklyHours"
                        onChange={handleChange}
                        value={formData.weeklyHours || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
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

export default Step5MotivationAndContribution;
