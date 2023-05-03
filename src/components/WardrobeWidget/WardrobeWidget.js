import React, { useState, useEffect, useParams } from 'react';

import { useNavigate } from 'react-router-dom';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { GiArmoredPants } from 'react-icons/gi';


/**
 * React Component for Header displayed to a logged in user
 **/

const closet_items = [
    {
        id: 1,
        name: 'Jean Shirt', category: 'Tops', img: "https://drive.google.com/uc?export=view&id=1rucpUNkAu8I1TUNzi9QI_aNsRgUWqfPL"
    },
    {
        id: 2,
        name: 'Shirt', category: 'Tops', img: "https://drive.google.com/uc?export=view&id=1aAZcg24Oc76XVQnFh2rVHui46ItuqXJ1"
    },
    {
        id: 3,
        name: 'White T-Shirt', category: 'Tops', img: "https://drive.google.com/uc?export=view&id=1TVbVmF8-oKcrs6-0pDpk3h1AxqPKx97_"
    },
    {
        id: 4,
        name: 'Black Fedora', category: 'Bottoms', img: "https://drive.google.com/uc?export=view&id=1usYj2EL_7Bx5iK8TUh25HL0Zxh0pupeD"
    },
    {
        id: 6,
        name: 'Floral Skirt', category: 'Hats', img: "https://drive.google.com/uc?export=view&id=1qnHCU001Lh9-df0kQHJXY2zeKMoJkaJW"
    },
    {
        id: 7,
        name: 'Shoes',
        category: 'Shoes',
        img: "https://drive.google.com/uc?export=view&id=1TrwfPi3RVdab5ZfwXKKfAUupGRl3lSk9"
    }
];


function WardrobeWidget(props) {

    const navigate = useNavigate();

    const [closetItems, setClosetItems] = useState(closet_items);
    const [activeTab, setActiveTab] = useState('All');

    const handleTabClick = (category) => {
        if (category != activeTab) return setActiveTab(category);
        return setActiveTab("All");
    };

    const handleItemClick = (item) => {
        if (!props.selectedItems) return;
        // Check against duplicates
        for (let i = 0; i < props.selectedItems.length; i++) {
            if (props.selectedItems[i].name === item.name) {
                return;
            }
        }
        props.setSelectedItems([...props.selectedItems, item]);
    }

    const filteredItems = activeTab === "All" ? closetItems : closetItems.filter(item => item.category === activeTab);

    return (
        <div className="wardrobe-widget-window">
            <h2>My Closet</h2>
            <div className="tab-bar">
                <div
                    key="Shoes"
                    className={`tab ${"Shoes" === activeTab ? "active" : ""}`}
                    onClick={() => handleTabClick("Shoes")}
                >
                    <i className="fa fa-shoe-prints"></i>
                </div>
                <div
                    key="Bottoms"
                    className={`tab ${"Bottoms" === activeTab ? "active" : ""}`}
                    onClick={() => handleTabClick("Bottoms")}
                >
                    <i> <GiArmoredPants /></i>
                </div>
                <div
                    key={"Tops"}
                    className={`tab ${"Tops" === activeTab ? "active" : ""}`}
                    onClick={() => handleTabClick("Tops")}
                >
                    <i className="fa fa-tshirt"></i>
                </div>
                <div
                    key={"Hats"}
                    className={`tab ${"Hats" === activeTab ? "active" : ""}`}
                    onClick={() => handleTabClick("Hats")}
                >
                    <i className="fa fa-hat-cowboy-side"></i>
                </div>
            </div>

            <div className="items-container">
                <div className="clothing-item" >
                    <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                    Add item
                </div>
                {filteredItems.map(item => (
                    <div className="clothing-item" onClick={() => handleItemClick(item)}>
                        <span className='clothing-item-img-wrapper'>
                            <img src={item.img} alt="clothing item"></img>
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default WardrobeWidget