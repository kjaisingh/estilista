import React, { useState, useEffect, useParams } from 'react';
import { FaSpinner } from 'react-icons/fa';

function ContextInput({ onSubmit, isLoading }) {
    const [value, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(value);
        setValue('');
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} placeholder={isLoading ? 'Hang Tight. We are rendering your outfit...' : 'Add extra context for your render!'} disabled={isLoading} />
            <button className="context-input-window-button" type="submit">
                {isLoading ? <FaSpinner className="spin" /> : "Render"}
            </button>
        </form>
    );
}

export default ContextInput