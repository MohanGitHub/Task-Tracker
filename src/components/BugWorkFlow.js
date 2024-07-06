// src/components/BugWorkflow.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Step from './Step';

function BugWorkflow() {
    const { id } = useParams();
    const [bug, setBug] = useState(null);
    const [activeStep, setActiveStep] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const savedBugs = JSON.parse(localStorage.getItem('bugs')) || [];
        const currentBug = savedBugs.find(bug => bug.id === id);
        setBug(currentBug);
        setActiveStep(0); // Set the first step as active initially
    }, [id]);

    const saveBug = (updatedBug) => {
        const savedBugs = JSON.parse(localStorage.getItem('bugs')) || [];
        const updatedBugs = savedBugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug);
        localStorage.setItem('bugs', JSON.stringify(updatedBugs));
        setBug(updatedBug);
    };

    const handleStepChange = (stepIndex, completed) => {
        const updatedSteps = bug.steps.map((step, index) => 
            index === stepIndex ? { ...step, completed } : step
        );
        saveBug({ ...bug, steps: updatedSteps });
        if (stepIndex < (bug.steps.length - 1)) {
            toggleStep(stepIndex + 1);
        }
    };

    const toggleStep = (index) => {
        setActiveStep(activeStep === index ? null : index);
    };

    if (!bug) return <div>Loading...</div>;

    return (
        <div>
            <h1>Bug {bug.id} - {bug.title}</h1>
            <div className="accordion">
                {bug.steps.map((step, index) => (
                    <div key={index} className="accordion-item">
                        <div className="accordion-header" onClick={() => toggleStep(index)}>
                            <h2>{step.name}</h2>
                            <span className={step.completed ? 'text-success' : 'text-warning'}>
                                {step.completed ? 'Completed' : 'Pending'}
                            </span>
                        </div>
                        {activeStep === index && (
                            <div className="accordion-body">
                                <Step
                                    step={step}
                                    stepIndex={index}
                                    totalSteps={bug.steps.length}
                                    onStepChange={handleStepChange}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={() => history.push('/')}>Back to Home</button>
        </div>
    );
}

export default BugWorkflow;
