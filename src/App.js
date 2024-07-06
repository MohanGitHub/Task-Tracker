// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import BugWorkflow from './components/BugWorkFlow';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/bug/:id" component={BugWorkflow} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
