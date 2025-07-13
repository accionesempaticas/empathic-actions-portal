'use client';

import React from 'react';

const Step3LocationAndEducation = ({ nextStep, prevStep, handleChange, formData }) => {
    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Ubicación y formación académica</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">Región donde resides *</label>
                    <input
                        type="text"
                        name="region"
                        id="region"
                        onChange={handleChange}
                        value={formData.region || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700">Distrito / Provincia *</label>
                    <input
                        type="text"
                        name="district"
                        id="district"
                        onChange={handleChange}
                        value={formData.district || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="academicDegree" className="block text-sm font-medium text-gray-700">Mayor grado académico alcanzado *</label>
                    <input
                        type="text"
                        name="academicDegree"
                        id="academicDegree"
                        onChange={handleChange}
                        value={formData.academicDegree || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="career" className="block text-sm font-medium text-gray-700">Carrera que estudias(te) *</label>
                    <input
                        type="text"
                        name="career"
                        id="career"
                        onChange={handleChange}
                        value={formData.career || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="university" className="block text-sm font-medium text-gray-700">Universidad / Centro de Formación *</label>
                    <input
                        type="text"
                        name="university"
                        id="university"
                        onChange={handleChange}
                        value={formData.university || ''}
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

export default Step3LocationAndEducation;
