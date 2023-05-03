import React, { useState, useEffect, useParams } from 'react';

import { useNavigate } from 'react-router-dom';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'



/**
 * React Component for Header displayed to a logged in user
 **/




function SelectedItemsWidget({ selectedItems, setSelectedItems }) {

    const handleItemClick = (item) => {
        console.log("runs");
        setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
    };


    return (
        <div className="selected-items-container">
            <h2>Selected Items</h2>
            <div className='selected-items-flex-container'>
                {selectedItems.map(item => (
                    <div className='selected-clothing-item' onClick={() => handleItemClick(item)}>
                        <span className='clothing-item-img-wrapper'>
                            <i className="fa-solid fa-circle-xmark unselect-button"></i>
                            <img src={item.img} alt="clothing item"></img>
                        </span>
                    </div>
                ))
                }
            </div>
        </div >
    );
}

export default SelectedItemsWidget