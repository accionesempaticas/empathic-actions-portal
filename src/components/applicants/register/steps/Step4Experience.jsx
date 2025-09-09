'use client';

import React from 'react';

const Step4Experience = ({ nextStep, prevStep, handleChange, formData }) => {
    const handleNestedChange = (e) => {
        const { name, value } = e.target;
        const [category, field] = name.split(/\.(.+)/);
        handleChange({ 
            target: { 
                name: category, 
                value: { ...formData[category], [field]: value } 
            } 
        });
    };

    const handleFileChange = (e) => {
        handleChange({ 
            target: { 
                name: e.target.name, // ← usa el name real del input (cv_file, pi_file o pf_file)
                value: e.target.files[0] 
            } 
        });
    };

    const isStepComplete = () => {
        const requiredFields = ['experience.experience_time', 'experience.other_volunteer_work'];
        return requiredFields.every(field => {
            const [category, subField] = field.split('.');
            return formData[category] && formData[category][subField] && String(formData[category][subField]).trim() !== '';
        });
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Experiencia</h2>

            {/* Experience Fields */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Experiencia</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="experience.experience_time" className="block text-sm font-medium text-gray-700">Años de experiencia *</label>
                        <select
                            name="experience.experience_time"
                            id="experience.experience_time"
                            onChange={handleNestedChange}
                            value={formData.experience?.experience_time || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                            required
                        >
                            <option value="">Seleccione años de experiencia</option>
                            <option value="0-1 años">0-1 años</option>
                            <option value="2-3 años">2-3 años</option>
                            <option value="4-5 años">4-5 años</option>
                            <option value="Más de 5 años">Más de 5 años</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="experience.other_volunteer_work" className="block text-sm font-medium text-gray-700">¿Actualmente formas parte de algun voluntariado? *</label>
                        <select
                            name="experience.other_volunteer_work"
                            id="experience.other_volunteer_work"
                            onChange={handleNestedChange}
                            value={formData.experience?.other_volunteer_work || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                            required
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </select>
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

export default Step4Experience;
