// src/components/Step.js
import React from 'react';
import CodeBlock from './CodeBlock';

function Step({ step, stepIndex, totalSteps, onStepChange }) {
    const someCode = `npm install react-tooltip
git checkout -b new-branch origin/prod
some third command`;
    return (
        <div>
            {stepIndex === 0 && (
                <div>
                    <p>Create a new git branch from prod branch:</p>
                    <CodeBlock codeToDisplay={someCode}></CodeBlock>
                </div>
            )}
            {stepIndex === 1 && (
                <div>
                    <p>Fix the issue, deploy, and verify.</p>
                </div>
            )}
            {stepIndex === 2 && (
                <div>
                    <p>Update the bug task with status changes.</p>
                </div>
            )}
            <div className="button-group">
                <button onClick={() => onStepChange(stepIndex, true)} className="btn btn-success">Done</button>
            </div>
        </div>
    );
}

export default Step;
