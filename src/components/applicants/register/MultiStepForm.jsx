'use client';

import React, {useState} from 'react';
import StepIndicator from './StepIndicator';
import Step1Welcome from './steps/Step1Welcome';
import Step2PersonalData from './steps/Step2PersonalData';
import Step3LocationAndEducation from './steps/Step3LocationAndEducation';
import Step4ExperienceAndVolunteering from './steps/Step4ExperienceAndVolunteering';
import Step5MotivationAndContribution from './steps/Step5MotivationAndContribution';
import Step6DocumentationAndSubmission from './steps/Step6DocumentationAndSubmission';
import Step7ReviewAndSubmit from './steps/Step7ReviewAndSubmit';
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

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});

    const totalSteps = 7; // Define el número total de pasos aquí

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle final form submission here
        console.log('Form submitted:', formData);
        alert('Formulario enviado!');
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
                return <Step4ExperienceAndVolunteering nextStep={nextStep} prevStep={prevStep}
                                                       handleChange={handleChange} formData={formData}/>;
            case 5:
                return <Step5MotivationAndContribution nextStep={nextStep} prevStep={prevStep}
                                                       handleChange={handleChange} formData={formData}/>;
            case 6:
                return <Step6DocumentationAndSubmission nextStep={nextStep} prevStep={prevStep}
                                                        handleChange={handleChange} formData={formData}/>;
            case 7:
                return <Step7ReviewAndSubmit prevStep={prevStep} formData={formData} handleSubmit={handleSubmit}/>;
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
                        currentStep={1}
                        steps={[
                            {label: 'Bienvenida e introducción', icon: <FaHandshake/>},
                            {label: 'Datos personales', icon: <FaUser/>},
                            {label: 'Ubicación y formación académica', icon: <FaMapMarkerAlt/>},
                            {label: 'Experiencia y voluntariado', icon: <FaBriefcase/>},
                            {label: 'Motivación y aporte', icon: <FaLightbulb/>},
                            {label: 'Documentación y envío', icon: <FaFileUpload/>},
                            {label: 'Revisión y envío', icon: <FaCheckCircle/>}
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
