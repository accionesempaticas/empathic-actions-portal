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
    FaUser
} from "react-icons/fa";
import {useUsers} from "@/contexts/UsersContext";
import Step1Welcome from "@/components/applicants/register/steps/Step1Welcome";
import Step2PersonalData from "@/components/applicants/register/steps/Step2PersonalData";
import Step3LocationAndEducation from "@/components/applicants/register/steps/Step3LocationAndEducation";
import Step4ExperienceAndVolunteering from "@/components/applicants/register/steps/Step4ExperienceAndVolunteering";
import Step5MotivationAndContribution from "@/components/applicants/register/steps/Step5MotivationAndContribution";
import Step6FinalSubmission from "@/components/applicants/register/steps/Step6FinalSubmission";
import StepIndicator from "@/components/applicants/register/StepIndicator";


const MultiStepForm = () => {
    const { registerPostulant, loading, error } = useUsers();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});

    const totalSteps = 6; // Define el número total de pasos aquí

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
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
        } else if (type === 'file') {
            setFormData(prevData => ({
                ...prevData,
                [name]: e.target.files[0]
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
                        data.append(key, item);
                    });
                } else if (typeof formData[key] === 'object' && formData[key] !== null && !(formData[key] instanceof File)) {
                    for (const nestedKey in formData[key]) {
                        if (formData[key].hasOwnProperty(nestedKey)) {
                            data.append(`${key}[${nestedKey}]`, formData[key][nestedKey]);
                        }
                    }
                } else if (formData[key] instanceof File) {
                    data.append(key, formData[key]);
                } else {
                    data.append(key, formData[key]);
                }
            }
        }

        try {
            await registerPostulant(data);
            alert('Formulario enviado con éxito!');
        } catch (err) {
            alert('Error al enviar el formulario. Por favor, inténtalo de nuevo.');
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
                return <Step4ExperienceAndVolunteering nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData}/>;
            case 5:
                return <Step5MotivationAndContribution nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData}/>;
            case 6:
                return <Step6FinalSubmission prevStep={prevStep} handleChange={handleChange} formData={formData} handleSubmit={handleSubmit}/>;
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
                            {label: 'Datos Personales', icon: <FaUser/>},
                            {label: 'Ubicación y Formación', icon: <FaMapMarkerAlt/>},
                            {label: 'Experiencia y CV', icon: <FaBriefcase/>},
                            {label: 'Motivación y Aporte', icon: <FaLightbulb/>},
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

        </>

    );
};

export default MultiStepForm;
