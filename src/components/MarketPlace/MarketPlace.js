import React from 'react';

import './style.css';


/**
 * React Component for Header displayed to a logged in user
 **/

function Marketplace(props) {



    return (
        <div className="marketplace-window">
            <div className="section-title-container">
                <h2 className='section-title'>Marketplace</h2>
                <p style={{ marginLeft: '20%', color: "#E86252" }}>Coming soon..</p>
            </div>
        </div >
    );
}

export default Marketplace