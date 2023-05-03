import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

function ContextInput({ onSubmit, userRender }) {
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
            <input type="text" value={value} onChange={handleChange} placeholder={userRender ? `${userRender} started a new job. Hang tight...` : 'Add extra context for your render!'} disabled={userRender} />
            <button className="context-input-window-button" type="submit">
                {userRender ? <FaSpinner className="spin" /> : "Render"}
            </button>
        </form>
    );
}

export default ContextInput