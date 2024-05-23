// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResourceCard from './ResourceCard';
import Tabs from './Tabs';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import logo from '../logo.png'
import '../styles.css';

const HomePage = () => {
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('https://media-content.ccbp.in/website/react-assignment/resources.json')
            .then(response => {
                setResources(response.data);
                setFilteredResources(response.data);
            })
            .catch(error => {
                console.error('Error fetching resources:', error);
            });
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        filterResources(tab, searchTerm);
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        filterResources(activeTab, term);
    };

    const filterResources = (tab, term) => {
        let filtered = resources;

        if (tab !== 'all') {
            filtered = filtered.filter(resource => resource.tag_name === tab);
        }

        if (term) {
            filtered = filtered.filter(resource => resource.name.includes(term));
        }

        setFilteredResources(filtered);
        setCurrentPage(1);
    };

    const resourcesPerPage = 6;
    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);

    return (
        <div className="home-page">
            <header className="home-header">
                <div className="logo">
                <img src={logo} alt="NXTWAVE"/>
                </div>
                <Link to="/add-resource" className="add-button">+ ADD</Link>
            </header>
            <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <div className="resource-list">
                {currentResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalResources={filteredResources.length}
                resourcesPerPage={resourcesPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default HomePage;
