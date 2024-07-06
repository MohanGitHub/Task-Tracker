// src/components/Step.js
import React from 'react';

function CodeBlock({ codeToDisplay }) {
    return (

        <div className="code-container">
            <textarea className="code-block" readOnly value={codeToDisplay} />
            <button
                onClick={() => navigator.clipboard.writeText(codeToDisplay)}
                className="btn btn-dark code-copy-btn">
                Copy
            </button>
        </div>
    );
}

export default CodeBlock;
