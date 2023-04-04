import React, { useState, useEffect, useParams } from 'react';

import { useNavigate } from 'react-router-dom';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faPen, faSliders } from '@fortawesome/free-solid-svg-icons'
import WardrobeWidget from '../WardrobeWidget/WardrobeWidget';
import SelectedItemsWidget from './SelectedItems';

/**
 * React Component for Header displayed to a logged in user
 **/

const mock_data = {
    "casual": {
        "image": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "name": "My Outfit",
        "selectedItems": [
            {
                id: 1,
                name: 'Jean Shirt', category: 'Tops', img: "https://drive.google.com/uc?export=view&id=1rucpUNkAu8I1TUNzi9QI_aNsRgUWqfPL"
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
                name: 'Shoes', category: 'Shoes', img: "https://drive.google.com/uc?export=view&id=1TrwfPi3RVdab5ZfwXKKfAUupGRl3lSk9"
            }]
    }
}

function OutfitPage(props) {

    const navigate = useNavigate();
    const [isEditingName, setIsEditingName] = useState(false);
    const [outfitName, setOutfitName] = useState("");
    const [outfitImage, setOutfitImage] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);



    function handleTitleChange(event) {
        setOutfitName(event.target.value);
    }

    function handleTitleBlur() {
        setIsEditingName(false);
        // Add change to login
    }
    function handleTitleClick() {
        setIsEditingName(true);
    }

    useEffect(() => {
        setOutfitName(mock_data["casual"]["name"]);
        setOutfitImage(mock_data["casual"]["image"]);
        setSelectedItems(mock_data["casual"]["selectedItems"]);
    }, []);

    useEffect(() => {
        if (outfitImage === "https://drive.google.com/uc?id=1japJH5PYA0oXwZFKg3pHDU1pWlpyLS0n&export=download") {
            return setOutfitImage(mock_data["casual"]["image"]);
        }
        return setOutfitImage("https://drive.google.com/uc?id=1japJH5PYA0oXwZFKg3pHDU1pWlpyLS0n&export=download");
    }, [selectedItems])


    return (
        <div className='outfit-window'>

            <div className="outfit-page-window">
                <div className='header-container'>
                    <FontAwesomeIcon className="header-angle-left" icon={faAngleLeft} onClick={() => { navigate('/home') }} />

                    <span className="header-center-container">
                        {isEditingName ? (
                            <input
                                type="text"
                                value={outfitName}
                                onChange={handleTitleChange}
                                onBlur={handleTitleBlur}
                                autoFocus
                            />
                        ) : (
                            <>
                                <h5>{outfitName}</h5>
                                <FontAwesomeIcon icon={faPen} onClick={handleTitleClick} />
                            </>
                        )}

                    </span>
                    <FontAwesomeIcon icon={faSliders} className="header-menu-icon" />
                </div>
                <div className='outfit-image-wrapper'>
                    <img src={outfitImage} alt="Outfit Image"></img>
                </div>
            </div>
            <div className='items-selection-window'>
                <div className='selected-items-window'>
                    <SelectedItemsWidget selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                </div>
                <div className='wardrobe-window'>
                    <WardrobeWidget selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
                </div>
            </div>
        </div>
    );
}

export default OutfitPage