// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import TaskWorkflow from './components/TaskWorkFlow';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/task/:id" component={TaskWorkflow} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
