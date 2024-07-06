// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
    const [bugs, setBugs] = useState([]);
    const [newBugId, setNewBugId] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    useEffect(() => {
        // Load bugs from localStorage or a JSON file
        const savedBugs = JSON.parse(localStorage.getItem('bugs')) || [];
        setBugs(savedBugs);
    }, []);

    const createNewBug = () => {
        if (newBugId.trim() === '') {
            setError('Please enter a valid bug ID.');
            return;
        }

        const newBug = {
            id: newBugId,
            title: title,
            steps: [
                { name: 'Create Git Branch', completed: false },
                { name: 'Fix Issue', completed: false },
                { name: 'Update Task', completed: false },
            ],
        };
        const updatedBugs = [...bugs, newBug];
        setBugs(updatedBugs);
        localStorage.setItem('bugs', JSON.stringify(updatedBugs));
        history.push(`/bug/${newBugId}`);
    };

    const openBug = (id) => {
        history.push(`/bug/${id}`);
    };

    return (
        <div>
            <h1>Bug Tracker</h1>
            <div>
                <br />
            </div>
            <h3>Create New Bug Workflow</h3>
            <div className='inputWithButton'>
                <input
                    type="text"
                    value={newBugId}
                    onChange={(e) => setNewBugId(e.target.value)}
                    placeholder="Bug ID" />
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='bug-desc'
                    placeholder="Title" />
                <button onClick={() => createNewBug()} className="btn btn-success">Create</button>
                {error && (
                    <span className="text-danger create-error-text">
                        {error}
                    </span>
                )}
            </div>
            {/* <input className="bugIdTextBox"></input><button onClick={() => createNewBug()} className="btn btn-success">Create</button> */}
            <div>
                <br />
            </div>
            <h3>Existing Bugs</h3>
            <ul>
                {bugs.map((bug) => (
                    <li key={bug.id} onClick={() => openBug(bug.id)}>
                        {bug.id} - {bug.title} (Progress: {bug.steps.filter(step => step.completed).length}/{bug.steps.length})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
