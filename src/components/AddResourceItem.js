// src/components/AddResource.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addResourceItem.css'
import logo from '../logo.png'
import resourceitem from '../resourceitem.png'

const AddResource = () => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const newResource = { name, link, description, tag_name: 'new', photo };
            // Replace the URL with your actual endpoint
            axios.get('https://media-content.ccbp.in/website/react-assignment/add_resource.json', newResource)
                .then(response => {
                    if (response.status === 200) {
                        toast.success('Resource added successfully');
                        setName('');
                        setLink('');
                        setDescription('');
                        setPhoto(null);
                    } else {
                        toast.error('Failed to add resource');
                    }
                })
                .catch(error => {
                    toast.error('API error: Failed to add resource');
                });
        }
    };

    const validateForm = () => {
        if (!name || !link || !description) {
            toast.error('All fields are required');
            return false;
        }
        if (name.length > 100) {
            toast.error('Name cannot exceed 100 characters');
            return false;
        }
        if (description.length > 500) {
            toast.error('Description cannot exceed 500 characters');
            return false;
        }
        return true;
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <div className="add-resource-container">
            <div className="add-resource-content">
            <div className="home-page">
            <header className="home-header">
                <div className="logo">
                <img src={logo} alt="NXTWAVE"/>
                </div>
                
            </header>
          </div>
                <button className="back-button" onClick={() => window.history.back()}>← Back</button>
                <h1>Add a Resource</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Link:</label>
                        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Photo:</label>
                        <input type="file" onChange={handlePhotoChange} />
                        {photo && <p>{photo.name}</p>}
                    </div>
                    <button type="submit" className="create-button">Create</button>
                </form>
            </div>
            <div>
            <img className="resourceimg" src={resourceitem} alt="NXTWAVE"/>
            </div>
            <ToastContainer position="bottom-center" autoClose={5000} />
        </div>
    );
};

export default AddResource;
