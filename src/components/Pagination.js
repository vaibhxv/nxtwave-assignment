// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalResources, resourcesPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalResources / resourcesPerPage);

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination">
            <button onClick={() => handleClick(currentPage - 1)}>Previous</button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => handleClick(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={() => handleClick(currentPage + 1)}>Next</button>
        </div>
    );
};

export default Pagination;
