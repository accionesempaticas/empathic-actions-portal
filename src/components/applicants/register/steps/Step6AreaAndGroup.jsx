'use client';

import React, { useState, useEffect } from 'react';
import { getAreas, getGroupsByArea } from '@/utils/areasAndGroups';

const Step6AreaAndGroup = ({ nextStep, prevStep, handleChange, formData }) => {
    const [selectedArea, setSelectedArea] = useState(formData.area || '');
    const [availableGroups, setAvailableGroups] = useState([]);

    const areas = getAreas();

    useEffect(() => {
        if (selectedArea) {
            const groups = getGroupsByArea(selectedArea);
            setAvailableGroups(groups);
            
            // Si el grupo actual no está en la nueva lista, limpiarlo
            if (formData.group && !groups.includes(formData.group)) {
                handleChange({ 
                    target: { 
                        name: 'group', 
                        value: '' 
                    } 
                });
            }
        } else {
            setAvailableGroups([]);
        }
    }, [selectedArea, formData.group, handleChange]);

    const handleAreaChange = (e) => {
        const newArea = e.target.value;
        setSelectedArea(newArea);
        
        // Actualizar el área en el formulario
        handleChange({ 
            target: { 
                name: 'area', 
                value: newArea 
            } 
        });

        // Limpiar el grupo cuando cambie el área
        handleChange({ 
            target: { 
                name: 'group', 
                value: '' 
            } 
        });
    };

    const handleGroupChange = (e) => {
        handleChange(e);
    };

    const isStepComplete = () => {
        return formData.area && formData.group && 
               formData.area.trim() !== '' && formData.group.trim() !== '';
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Área y Grupo de Participación</h2>
            
            <div className="space-y-6">
                {/* Selección de Área */}
                <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                        Área de Participación *
                    </label>
                    <select
                        name="area"
                        id="area"
                        value={selectedArea}
                        onChange={handleAreaChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquesa-500 focus:border-turquesa-500"
                        required
                    >
                        <option value="">Selecciona un área</option>
                        {areas.map((area, index) => (
                            <option key={index} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selección de Grupo */}
                <div>
                    <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-2">
                        Grupo específico *
                    </label>
                    <select
                        name="group"
                        id="group"
                        value={formData.group || ''}
                        onChange={handleGroupChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquesa-500 focus:border-turquesa-500"
                        disabled={!selectedArea}
                        required
                    >
                        <option value="">
                            {selectedArea ? 'Selecciona un grupo' : 'Primero selecciona un área'}
                        </option>
                        {availableGroups.map((group, index) => (
                            <option key={index} value={group}>
                                {group}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Información adicional */}
                {selectedArea && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Información del Área:</h4>
                        <p className="text-sm text-blue-700">
                            Has seleccionado <strong>{selectedArea}</strong>. 
                            {availableGroups.length > 0 && (
                                <> Ahora selecciona el grupo específico donde deseas participar.</>
                            )}
                        </p>
                        {formData.group && (
                            <p className="text-sm text-green-700 mt-2">
                                ✓ Grupo seleccionado: <strong>{formData.group}</strong>
                            </p>
                        )}
                    </div>
                )}
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

export default Step6AreaAndGroup;