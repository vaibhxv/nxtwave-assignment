// src/components/ResourceCard.js
import React from 'react';

const ResourceCard = ({ resource }) => (
    <div className="resource-card">
        <h2>{resource.name}</h2>
        <p>{resource.tag_name}</p>
        <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a>
        <p>{resource.description}</p>
    </div>
);

export default ResourceCard;
