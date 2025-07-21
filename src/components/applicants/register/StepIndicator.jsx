'use client';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const StepIndicator = ({ currentStep, steps, visibleCount = 4 }) => {
    const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        const targetIndex = currentStep - 1;
        if (targetIndex < startIndex || targetIndex >= startIndex + visibleCount) {
            setStartIndex(Math.max(0, targetIndex - 1));
        }
    }, [currentStep, steps, visibleCount]);

    const visibleSteps = steps.slice(startIndex, startIndex + visibleCount);

    const isCompleted = (index) => index < currentStep - 1;
    const isActive = (index) => index === currentStep - 1;

    return (
        <div className="w-full flex items-center justify-between px-4 py-4 bg-white ">
            <button
                disabled={startIndex === 0}
                onClick={() => setStartIndex(startIndex - 1)}
                className="text-primary-500 hover:text-primary-700 disabled:opacity-30 transition"
            >
                <FaChevronLeft size={20} />
            </button>

            <div className="flex items-center space-x-6 overflow-hidden transition-all">
                {visibleSteps.map((step, i) => {
                    const globalIndex = startIndex + i;
                    const completed = isCompleted(globalIndex);
                    const active = isActive(globalIndex);

                    const circleClasses = `
                        w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold
                        ${completed ? 'bg-secondary-500 text-white' :
                        active ? 'bg-primary-500 text-white' :
                            'bg-gray-200 text-gray-500'}
                    `;

                    const connectorClasses = `
                        h-1 w-8 sm:w-12 
                        ${completed ? 'bg-secondary-500' : 'bg-gray-300'}
                    `;

                    return (
                        <div key={globalIndex} className="flex items-center space-x-2">
                            <div className="flex flex-col items-center">
                                <div className={circleClasses}>
                                    {completed ? '✓' : step.icon || globalIndex + 1}
                                </div>
                                <span className="text-xs mt-1 text-center w-28 truncate text-gray-700">
                                    {step.label}
                                </span>
                            </div>

                            {globalIndex < steps.length - 1 && (
                                <div className={connectorClasses}></div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                disabled={startIndex + visibleCount >= steps.length}
                onClick={() => setStartIndex(startIndex + 1)}
                className="text-primary-500 hover:text-primary-700 disabled:opacity-30 transition"
            >
                <FaChevronRight size={20} />
            </button>
        </div>
    );
};

export default StepIndicator;
