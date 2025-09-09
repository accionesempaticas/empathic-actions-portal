'use client';

import React from 'react';

const Step2PersonalData = ({ nextStep, prevStep, handleChange, formData }) => {
    const validateEmail = (email) => {
        if (!email) return true; // Don't validate if empty
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isStepComplete = () => {
        const requiredFields = ['document_type', 'document_number', 'first_name', 'last_name', 'nationality', 'date_of_birth', 'phone_number', 'email', 'gender'];
        const isComplete = requiredFields.every(field => formData[field] && String(formData[field]).trim() !== '');
        return isComplete && validateEmail(formData.email);
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Datos personales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Document Type */}
                <div>
                    <label htmlFor="document_type" className="block text-sm font-medium text-gray-700">Tipo de documento *</label>
                    <select
                        name="document_type"
                        id="document_type"
                        onChange={handleChange}
                        value={formData.document_type || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4"
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="DNI">DNI</option>
                        <option value="CE">Carné de Extranjería</option>
                    </select>
                </div>

                {/* Document Number */}
                <div>
                    <label htmlFor="document_number" className="block text-sm font-medium text-gray-700">Número de documento *</label>
                    <input
                        type="text"
                        name="document_number"
                        id="document_number"
                        onChange={handleChange}
                        value={formData.document_number || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                        required
                    />
                </div>

                {/* First Name */}
                <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nombres *</label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        onChange={handleChange}
                        value={formData.first_name || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                        required
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellidos *</label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        onChange={handleChange}
                        value={formData.last_name || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                        required
                    />
                </div>

                {/* Nationality */}
                <div>
                    <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nacionalidad *</label>
                    <input
                        type="text"
                        name="nationality"
                        id="nationality"
                        onChange={handleChange}
                        value={formData.nationality || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                        required
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">Fecha de nacimiento *</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        id="date_of_birth"
                        onChange={handleChange}
                        value={formData.date_of_birth || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                        required
                    />
                </div>

                {/* Gender */}
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género *</label>
                    <select
                        name="gender"
                        id="gender"
                        onChange={handleChange}
                        value={formData.gender || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Celular *</label>
                    <input
                        type="tel"
                        name="phone_number"
                        id="phone_number"
                        onChange={handleChange}
                        value={formData.phone_number || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                        required
                    />
                </div>

                {/* Family Phone Number */}
                <div>
                    <label htmlFor="family_phone_number" className="block text-sm font-medium text-gray-700">Celular de familiar o apoderado</label>
                    <input
                        type="tel"
                        name="family_phone_number"
                        id="family_phone_number"
                        onChange={handleChange}
                        value={formData.family_phone_number || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico *</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        value={formData.email || ''}
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4 ${formData.email && !validateEmail(formData.email) ? 'border-red-500' : ''}`}
                        required
                    />
                    {formData.email && !validateEmail(formData.email) && <p className="mt-2 text-sm text-red-600">Formato de correo inválido.</p>}
                </div>

                {/* LinkedIn */}
                <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">Perfil de LinkedIn</label>
                    <input
                        type="url"
                        name="linkedin"
                        id="linkedin"
                        onChange={handleChange}
                        value={formData.linkedin || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-3 px-4"
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
                    className={`font-bold py-2 px-4 rounded ${isStepComplete() ? 'bg-primary-500 hover:bg-primary-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Step2PersonalData;