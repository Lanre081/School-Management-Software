import React from 'react';

const Placeholder = ({ title }) => {
    return (
        <div className="p-8 text-center bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
            <h2 className="text-2xl font-bold text-gray-400 mb-2">{title || 'Coming Soon'}</h2>
            <p className="text-gray-500">This feature is under development.</p>
        </div>
    );
};

export default Placeholder;
