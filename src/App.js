// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddResourceItem from './components/AddResourceItem';
import './styles.css';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" exact element={<HomePage/>} />
            <Route path="/add-resource" element={<AddResourceItem/>} />
        </Routes>
    </Router>
);

export default App;
