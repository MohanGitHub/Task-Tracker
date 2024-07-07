// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LogoBanner from './LogoBanner';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [newTaskId, setNewTaskId] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    useEffect(() => {
        // Load Tasks from localStorage or a JSON file
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    const createNewTask = () => {
        if (newTaskId.trim() === '') {
            setError('Please enter a valid task ID.');
            return;
        }

        const newTask = {
            id: newTaskId,
            title: title,
            steps: [
                { name: 'Create Git Branch', completed: false },
                { name: 'Fix Issue', completed: false },
                { name: 'Update Task', completed: false },
            ],
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        history.push(`/task/${newTaskId}`);
    };

    const openTask = (id) => {
        history.push(`/task/${id}`);
    };

    return (
        <div>
            <LogoBanner></LogoBanner>
            <div>
                <br />
            </div>
            <h3>Create New Task Workflow</h3>
            <div className='inputWithButton'>
                <input
                    type="text"
                    value={newTaskId}
                    onChange={(e) => setNewTaskId(e.target.value)}
                    placeholder="Task ID" />
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='task-desc'
                    placeholder="Title" />
                <button onClick={() => createNewTask()} className="btn btn-success">Create</button>
                {error && (
                    <span className="text-danger create-error-text">
                        {error}
                    </span>
                )}
            </div>
            <div>
                <br />
            </div>
            <h3>Tracked Tasks</h3>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} onClick={() => openTask(task.id)}>
                        <span className="text-primary hand-cursor">{task.id} - {task.title}</span>
                        <span className={task.steps.filter(step => step.completed).length === task.steps.length ? "text-success" : "text-secondary"}>
                            (Progress: {task.steps.filter(step => step.completed).length}/{task.steps.length})
                            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
