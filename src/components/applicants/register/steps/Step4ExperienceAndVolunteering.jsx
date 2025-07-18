'use client';

import React from 'react';

const Step4ExperienceAndVolunteering = ({ nextStep, prevStep, handleChange, formData }) => {
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
                name: 'cv_file', 
                value: e.target.files[0] 
            } 
        });
    };

    const isStepComplete = () => {
        const requiredFields = ['experience.experience_time', 'experience.other_volunteer_work', 'cv_file'];
        return requiredFields.every(field => {
            if (field === 'cv_file') {
                return formData.cv_file;
            }
            const [category, subField] = field.split('.');
            return formData[category] && formData[category][subField] && String(formData[category][subField]).trim() !== '';
        });
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Experiencia y CV</h2>

            {/* Experience Fields */}
            <div className="mb-6">
                <h3 class="text-lg font-medium text-gray-800 mb-2">Experiencia</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="experience.experience_time" className="block text-sm font-medium text-gray-700">Años de experiencia *</label>
                        <select
                            name="experience.experience_time"
                            id="experience.experience_time"
                            onChange={handleNestedChange}
                            value={formData.experience?.experience_time || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="0">Sin experiencia</option>
                            <option value="1">Menos de 1 año</option>
                            <option value="2">Entre 1 y 2 años</option>
                            <option value="3">Más de 2 años</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="experience.other_volunteer_work" className="block text-sm font-medium text-gray-700">¿Has participado en otros voluntariados? *</label>
                        <select
                            name="experience.other_volunteer_work"
                            id="experience.other_volunteer_work"
                            onChange={handleNestedChange}
                            value={formData.experience?.other_volunteer_work || ''}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            required
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* CV Upload */}
            <div>
                <h3 class="text-lg font-medium text-gray-800 mb-2">Currículum Vitae</h3>
                <div>
                    <label htmlFor="cv_file" className="block text-sm font-medium text-gray-700">Adjunta tu CV actualizado en PDF *</label>
                    <input
                        type="file"
                        name="cv_file"
                        id="cv_file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        required
                    />
                    <p className="mt-1 text-sm text-gray-500">Solo archivos PDF (máx. 5MB)</p>
                    {formData.cv_file && <p className="mt-2 text-sm text-green-600">Archivo seleccionado: {formData.cv_file.name}</p>}
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

export default Step4ExperienceAndVolunteering;
