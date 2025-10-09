'use client';

import React, {useState} from 'react';
import {
    FaAddressBook,
    FaBriefcase,
    FaCheckCircle,
    FaFileAlt, FaFileUpload,
    FaHandshake, FaLightbulb,
    FaMapMarkerAlt,
    FaRegSmile,
    FaIdCard
} from "react-icons/fa";
import {useUsers} from "@/contexts/UsersContext";
import { translateFieldName } from "@/utils/translations";
import Step1Welcome from "@/components/applicants/register/steps/Step1Welcome";
import Step2PersonalData from "@/components/applicants/register/steps/Step2PersonalData";
import Step3LocationAndEducation from "@/components/applicants/register/steps/Step3LocationAndEducation";
import Step4Experience from "@/components/applicants/register/steps/Step4Experience";
import Step5Documents from "@/components/applicants/register/steps/Step5Documents";
import Step6AreaAndGroup from "@/components/applicants/register/steps/Step6AreaAndGroup";
import Step7FinalSubmission from "@/components/applicants/register/steps/Step7FinalSubmission";
import StepIndicator from "@/components/applicants/register/StepIndicator";


const MultiStepForm = () => {
    const { registerPostulant, loading, error } = useUsers();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [generalError, setGeneralError] = useState('');

    const totalSteps = 7; // Define el número total de pasos aquí

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            setFormData(prevData => ({
                ...prevData,
                [name]: files ? files[0] : value
            }));
        } else if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prevData => ({
                ...prevData,
                [parent]: {
                    ...prevData[parent],
                    [child]: value
                }
            }));
        } else if (name === 'desiredRoles') {
            // Handle checkbox array for desiredRoles
            let updatedRoles = formData.desiredRoles ? [...formData.desiredRoles] : [];
            if (checked) {
                updatedRoles.push(value);
            } else {
                updatedRoles = updatedRoles.filter((role) => role !== value);
            }
            setFormData(prevData => ({
                ...prevData,
                [name]: updatedRoles
            }));
        } else if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach(item => {
                        // Para compatibilidad con PHP/Laravel, a menudo se usa `key[]` para arrays
                        data.append(`${key}[]`, item);
                    });
                } else if (typeof formData[key] === 'object' && formData[key] !== null && !(formData[key] instanceof File)) {
                    for (const nestedKey in formData[key]) {
                        if (formData[key].hasOwnProperty(nestedKey)) {
                            data.append(`${key}[${nestedKey}]`, formData[key][nestedKey]);
                        }
                    }
                } else if (formData[key] instanceof File) {
                    data.append(key, formData[key]);
                } else if (formData[key] !== null && formData[key] !== undefined){
                    data.append(key, formData[key]);
                }
            }
        }

        try {
            const result = await registerPostulant(data);
            
            // Guardar datos del usuario para la página de firma
            const userData = {
                id: result.user_id || result.id || Date.now(),
                first_name: formData.first_name,
                last_name: formData.last_name,
                document_type: formData.document_type,
                document_number: formData.document_number,
                area: formData.area,
                group: formData.group,
                province: formData.location?.province || 'Lima'
            };
            
            // Marcar que viene del registro y guardar datos con timestamp
            localStorage.setItem('fromRegistration', 'true');
            localStorage.setItem('registrationUserData', JSON.stringify(userData));
            localStorage.setItem('registrationTimestamp', Date.now().toString());
            setShowSuccessModal(true);
        } catch (err) {
            // Verificar si es un error de límite de IP
            if (err.response && err.response.status === 429 && err.response.data.error === 'IP_REGISTRATION_LIMIT_EXCEEDED') {
                alert('⚠️ Límite de Registros Alcanzado\n\n' + err.response.data.message);
            } else if (err.response && err.response.status === 422 && err.response.data.errors) {
                // Errores de validación
                setValidationErrors(err.response.data.errors);
                setGeneralError('Por favor corrige los errores en el formulario.');
                setShowErrorModal(true);
            } else {
                // Error genérico
                setGeneralError(err.response?.data?.message || 'Ocurrió un error al procesar el formulario. Inténtalo de nuevo.');
                setValidationErrors({});
                setShowErrorModal(true);
            }
            console.error("Submission error:", err);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1Welcome nextStep={nextStep}/>;
            case 2:
                return <Step2PersonalData nextStep={nextStep} prevStep={prevStep} handleChange={handleChange}
                                          formData={formData}/>;
            case 3:
                return <Step3LocationAndEducation nextStep={nextStep} prevStep={prevStep} handleChange={handleChange}
                                                  formData={formData}/>;
            case 4:
                return <Step4Experience nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData}/>;
            case 5:
                return <Step5Documents nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData}/>;
            case 6:
                return <Step6AreaAndGroup nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData}/>;
            case 7:
                return <Step7FinalSubmission prevStep={prevStep} handleChange={handleChange} formData={formData} handleSubmit={handleSubmit}/>;
            default:
                return <Step1Welcome nextStep={nextStep}/>;
        }
    };

    return (
        <>
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-primary-50 to-secondary-50 px-4 py-10">
                <div className="max-w-5xl w-full bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl">
                    <StepIndicator
                        currentStep={currentStep}
                        steps={[
                            {label: 'Bienvenida', icon: <FaHandshake/>},
                            {label: 'Datos Personales', icon: <FaIdCard/>},
                            {label: 'Ubicación y Formación', icon: <FaMapMarkerAlt/>},
                            {label: 'Experiencia', icon: <FaBriefcase/>},
                            {label: 'Documentos', icon: <FaFileUpload/>},
                            {label: 'Área y Grupo', icon: <FaAddressBook/>},
                            {label: 'Envío Final', icon: <FaCheckCircle/>}
                        ]}
                    />
                    <div className="container mx-auto p-4">
                        <form onSubmit={handleSubmit}>
                            {renderStep()}
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal de Éxito */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-auto overflow-hidden border border-primary-200">
                        <div className="bg-primary-500 p-6">
                            <div className="flex justify-center">
                                <div className="bg-white p-3 rounded-full">
                                    <FaCheckCircle className="text-3xl text-primary-500" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white text-center mt-4">
                                ¡Registro Exitoso!
                            </h2>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-gray-600 mb-6">
                                Tu registro se ha completado correctamente. Ahora procederás a firmar tu carta de compromiso.
                            </p>
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    window.location.href = '/applicants/sign-document';
                                }}
                                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            >
                                Continuar a Firma
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Error */}
            {showErrorModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-auto overflow-hidden border border-red-200">
                        <div className="bg-red-500 p-6">
                            <div className="flex justify-center">
                                <div className="bg-white p-3 rounded-full">
                                    <FaRegSmile className="text-3xl text-red-500 transform rotate-180" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white text-center mt-4">
                                Error en el Registro
                            </h2>
                        </div>
                        <div className="p-6">
                            {generalError && (
                                <p className="text-gray-600 mb-4 text-center">
                                    {generalError}
                                </p>
                            )}

                            {Object.keys(validationErrors).length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Errores encontrados:</h3>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {Object.entries(validationErrors).map(([field, messages]) => (
                                            <div key={field} className="bg-red-50 border border-red-200 rounded-lg p-3">
                                                <h4 className="font-medium text-red-800 capitalize mb-1">
                                                    {translateFieldName(field)}:
                                                </h4>
                                                <ul className="text-sm text-red-700">
                                                    {Array.isArray(messages) ? messages.map((msg, idx) => (
                                                        <li key={idx}>• {msg}</li>
                                                    )) : <li>• {messages}</li>}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    setShowErrorModal(false);
                                    setValidationErrors({});
                                    setGeneralError('');
                                }}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                            >
                                Cerrar y Corregir
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>

    );
};

export default MultiStepForm;
