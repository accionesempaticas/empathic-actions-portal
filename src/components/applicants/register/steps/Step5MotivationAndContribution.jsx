'use client';

import React from 'react';

const Step5MotivationAndContribution = ({ nextStep, prevStep, handleChange, formData }) => {
    const isStepComplete = () => {
        const requiredFields = ['contribution_motivation', 'preferred_roles', 'available_hours_per_week'];
        return (
            formData.contribution_motivation?.trim().length > 0 &&
            Array.isArray(formData.preferred_roles) && formData.preferred_roles.length > 0 &&
            formData.available_hours_per_week?.toString().trim().length > 0
        );
    };

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
                    <label htmlFor="contribution_motivation" className="block text-sm font-medium text-gray-700">
                        ¿Cómo consideras que podrías aportar a ACCIONES EMPÁTICAS? *
                    </label>
                    <textarea
                        name="contribution_motivation"
                        id="contribution_motivation"
                        rows="4"
                        onChange={handleChange}
                        value={formData.contribution_motivation || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Marca el rol que te gustaría desempeñar en la organización *
                    </label>
                    <div className="mt-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {roles.map((role) => (
                            <label key={role} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="preferred_roles"
                                    value={role}
                                    checked={formData.preferred_roles?.includes(role) || false}
                                    onChange={(e) => {
                                        const { value, checked } = e.target;
                                        let updatedRoles = formData.preferred_roles ? [...formData.preferred_roles] : [];
                                        if (checked) {
                                            updatedRoles.push(value);
                                        } else {
                                            updatedRoles = updatedRoles.filter((r) => r !== value);
                                        }
                                        handleChange({ target: { name: 'preferred_roles', value: updatedRoles } });
                                    }}
                                    className="form-checkbox"
                                />
                                <span className="ml-2">{role}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="available_hours_per_week" className="block text-sm font-medium text-gray-700">
                        ¿Cuántas horas a la semana podrías brindar como voluntario? *
                    </label>
                    <input
                        type="number"
                        name="available_hours_per_week"
                        id="available_hours_per_week"
                        onChange={handleChange}
                        value={formData.available_hours_per_week || ''}
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
                    disabled={!isStepComplete()}
                    className={`font-bold py-2 px-4 rounded ${
                        isStepComplete()
                            ? 'bg-primary-500 hover:bg-primary-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Step5MotivationAndContribution;
