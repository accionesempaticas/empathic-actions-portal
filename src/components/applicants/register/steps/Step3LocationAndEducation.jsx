'use client';

import React from 'react';

const Step3LocationAndEducation = ({ nextStep, prevStep, handleChange, formData }) => {
    const handleNestedChange = (e) => {
        const { name, value } = e.target;
        const [category, field] = name.split(/\.(.+)/); // Splits at the first dot
        handleChange({ 
            target: { 
                name: category, 
                value: { ...formData[category], [field]: value } 
            } 
        });
    };

    const isStepComplete = () => {
        const requiredFields = [
            'location.region', 'location.province', 'location.address',
            'formation.academic_degree', 'formation.career', 'formation.formation_center'
        ];
        return requiredFields.every(field => {
            const [category, subField] = field.split('.');
            return formData[category] && formData[category][subField] && formData[category][subField].trim() !== '';
        });
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Ubicación y Formación</h2>
            
            {/* Location Fields */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Ubicación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="location.region" className="block text-sm font-medium text-gray-700">Región *</label>
                        <input
                            type="text"
                            name="location.region"
                            id="location.region"
                            onChange={handleNestedChange}
                            value={formData.location?.region || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="location.province" className="block text-sm font-medium text-gray-700">Provincia / Distrito *</label>
                        <input
                            type="text"
                            name="location.province"
                            id="location.province"
                            onChange={handleNestedChange}
                            value={formData.location?.province || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="location.address" className="block text-sm font-medium text-gray-700">Dirección *</label>
                        <input
                            type="text"
                            name="location.address"
                            id="location.address"
                            onChange={handleNestedChange}
                            value={formData.location?.address || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Formation Fields */}
            <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Formación Académica</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="formation.academic_degree" className="block text-sm font-medium text-gray-700">Grado académico *</label>
                        <input
                            type="text"
                            name="formation.academic_degree"
                            id="formation.academic_degree"
                            onChange={handleNestedChange}
                            value={formData.formation?.academic_degree || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="formation.career" className="block text-sm font-medium text-gray-700">Carrera *</label>
                        <input
                            type="text"
                            name="formation.career"
                            id="formation.career"
                            onChange={handleNestedChange}
                            value={formData.formation?.career || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="formation.formation_center" className="block text-sm font-medium text-gray-700">Centro de formación *</label>
                        <input
                            type="text"
                            name="formation.formation_center"
                            id="formation.formation_center"
                            onChange={handleNestedChange}
                            value={formData.formation?.formation_center || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        />
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

export default Step3LocationAndEducation;