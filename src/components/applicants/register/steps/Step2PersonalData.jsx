'use client';

import React from 'react';

const Step2PersonalData = ({ nextStep, prevStep, handleChange, formData }) => {
    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Datos personales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="dni" className="block text-sm font-medium text-gray-700">DNI o Carné de Extranjería *</label>
                    <input
                        type="text"
                        name="dni"
                        id="dni"
                        onChange={handleChange}
                        value={formData.dni || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">Nombres *</label>
                    <input
                        type="text"
                        name="nombres"
                        id="nombres"
                        onChange={handleChange}
                        value={formData.nombres || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos *</label>
                    <input
                        type="text"
                        name="apellidos"
                        id="apellidos"
                        onChange={handleChange}
                        value={formData.apellidos || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="nacionalidad" className="block text-sm font-medium text-gray-700">Nacionalidad *</label>
                    <input
                        type="text"
                        name="nacionalidad"
                        id="nacionalidad"
                        onChange={handleChange}
                        value={formData.nacionalidad || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">Fecha de nacimiento *</label>
                    <input
                        type="date"
                        name="fechaNacimiento"
                        id="fechaNacimiento"
                        onChange={handleChange}
                        value={formData.fechaNacimiento || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="celular" className="block text-sm font-medium text-gray-700">Celular *</label>
                    <input
                        type="tel"
                        name="celular"
                        id="celular"
                        onChange={handleChange}
                        value={formData.celular || ''}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="correo" className="block text-sm font-medium text-gray-700">Correo electrónico *</label>
                    <input
                        type="email"
                        name="correo"
                        id="correo"
                        onChange={handleChange}
                        value={formData.correo || ''}
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

export default Step2PersonalData;
