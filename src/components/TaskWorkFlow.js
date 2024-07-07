// src/components/TaskWorkflow.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Step from './Step';
import LogoBanner from './LogoBanner';

function TaskWorkflow() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [activeStep, setActiveStep] = useState(null);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const currentTask = savedTasks.find(task => task.id === id);
        setTask(currentTask);
        setActiveStep(0); // Set the first step as active initially
    }, [id]);

    const saveTask = (updatedTask) => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = savedTasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTask(updatedTask);
    };

    const handleStepChange = (stepIndex, completed) => {
        const updatedSteps = task.steps.map((step, index) => 
            index === stepIndex ? { ...step, completed } : step
        );
        saveTask({ ...task, steps: updatedSteps });
        if (stepIndex < (task.steps.length - 1)) {
            toggleStep(stepIndex + 1);
        }
    };

    const toggleStep = (index) => {
        setActiveStep(activeStep === index ? null : index);
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div>
            <LogoBanner></LogoBanner>
            <h3>Task {task.id} - {task.title}</h3>
            <div className="accordion">
                {task.steps.map((step, index) => (
                    <div key={index} className="accordion-item">
                        <div className="accordion-header" onClick={() => toggleStep(index)}>
                            <h4>{step.name}</h4>
                            <span className={step.completed ? 'text-success' : 'text-warning'}>
                                {step.completed ? 'Completed' : 'Pending'}
                            </span>
                        </div>
                        {activeStep === index && (
                            <div className="accordion-body">
                                <Step
                                    stepIndex={index}
                                    onStepChange={handleStepChange}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskWorkflow;
