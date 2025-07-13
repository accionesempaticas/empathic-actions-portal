'use client';

import React from 'react';

const Step4ExperienceAndVolunteering = ({ nextStep, prevStep, handleChange, formData }) => {
    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Experiencia y voluntariado</h2>
            <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                    <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700">Años de experiencia al 2025 *</label>
                    <select
                        name="experienceYears"
                        id="experienceYears"
                        onChange={handleChange}
                        value={formData.experienceYears || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="Sin experiencia">Sin experiencia</option>
                        <option value="Menos de 1 año">Menos de 1 año</option>
                        <option value="Entre 1 y 2 años">Entre 1 y 2 años</option>
                        <option value="Más de 2 años">Más de 2 años</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">¿Actualmente participas en algún voluntariado? *</label>
                    <div className="mt-1">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="currentVolunteering"
                                value="Sí"
                                checked={formData.currentVolunteering === 'Sí'}
                                onChange={handleChange}
                                className="form-radio"
                                required
                            />
                            <span className="ml-2">Sí</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input
                                type="radio"
                                name="currentVolunteering"
                                value="No"
                                checked={formData.currentVolunteering === 'No'}
                                onChange={handleChange}
                                className="form-radio"
                                required
                            />
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="volunteeringExperienceDetails" className="block text-sm font-medium text-gray-700">Cuéntanos alguna experiencia de voluntariado y/o prácticas donde hayas potenciado conocimientos de tu carrera. *</label>
                    <textarea
                        name="volunteeringExperienceDetails"
                        id="volunteeringExperienceDetails"
                        rows="4"
                        onChange={handleChange}
                        value={formData.volunteeringExperienceDetails || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    ></textarea>
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

export default Step4ExperienceAndVolunteering;
