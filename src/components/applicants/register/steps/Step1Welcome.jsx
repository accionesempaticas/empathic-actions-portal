'use client';

import React from 'react';

const Step1Welcome = ({ nextStep }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="">
                {/*<div className="flex justify-center mb-6">
                    <img src="/logo.png" alt="Acciones Empáticas" className="h-16"/>
                </div>*/}

                <h1 className="text-4xl font-bold text-center text-primary-700 mb-4 flex items-center justify-center gap-2">
                    Bienvenid@ 
                </h1>

                <p className="text-lg text-center text-gray-700 mb-6 leading-relaxed">
                    Bienvenid@ a <span className="font-semibold text-primary-600">Acciones Empáticas - Voluntariado</span> 
                </p>

                <p className="text-gray-700 mb-4 text-justify">
                    Estamos muy felices de que formes parte de esta comunidad de voluntarios empáticos. Por ello, te
                    pedimos que completes el presente formulario a modo de formalizar tu ingreso a la organización y que
                    sea una grata experiencia de voluntariado.
                </p>

                <p className="text-gray-700 mb-4 text-justify">
                    <strong>Tiempo aproximado de llenado:</strong> 10 minutos
                </p>

                <p className="text-gray-700 mb-6 text-justify">
                    Al llenar la presente ficha, declaras bajo juramento que la información proporcionada es verdadera y
                    autorizas a que pueda ser utilizada por Acciones Empáticas e instituciones aliadas para fines
                    organizacionales y comunicacionales.
                </p>

                <p className="text-right font-medium text-gray-600 italic">
                    — Equipo de Gestión de Talento
                </p>
            </div>
            <button
                type="button"
                onClick={nextStep}
                className="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded end"
            >
                Iniciar postulación
            </button>

        </div>
    );
};

export default Step1Welcome;
