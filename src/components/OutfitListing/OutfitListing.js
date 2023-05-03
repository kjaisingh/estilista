import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faUserGroup, faPlus } from '@fortawesome/free-solid-svg-icons'


import Header from '../Header/Header';

const templates = [
    {
        "title": "Casual",
        "img": "https://drive.google.com/uc?id=1RtWgBvAab9OouICuRBS0UcfUF0SpOjZg&export=download"
    },
    {
        "title": "Night Out",

        "img": "https://drive.google.com/uc?export=view&id=1igp2WbxJT2XaxJZJD9jriTZGi7eMylOB"
    },

    {
        "title": "Business Casual",
        "img": "https://drive.google.com/uc?id=1japJH5PYA0oXwZFKg3pHDU1pWlpyLS0n&export=download"

    },
    {
        "title": "Summer Vibes",
        "img": "https://drive.google.com/uc?export=view&id=1WV5n5c-Ug2HJ8fnxRe2RLT-c9Cp0mNm7"
    },
    {
        "title": "Athletic Fit",
        "img": "https://drive.google.com/uc?export=view&id=1BARQdu1-2-PNcNLTyozKYtgmxBmmmXb-"
    },
    {
        "title": "Business Casual",
        "img": "https://drive.google.com/uc?export=view&id=1igp2WbxJT2XaxJZJD9jriTZGi7eMylOB"

    },
    {
        "title": "Business Casual",
        "img": "https://drive.google.com/uc?export=view&id=1igp2WbxJT2XaxJZJD9jriTZGi7eMylOB"

    }
];

const mock_outfits = [
    {
        "title": "My Outfit",
        "img": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "is_shared": false
    },
    {
        "title": "My Outfit",
        "img": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "is_shared": false
    },
    {
        "title": "My Outfit",
        "img": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "is_shared": true
    },
    {
        "title": "My Outfit",
        "img": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "is_shared": true
    },
    {
        "title": "My Outfit",
        "img": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "is_shared": false
    },
    {
        "title": "My Outfit",
        "img": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "is_shared": false
    },
    {
        "title": "My Outfit",
        "img": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "is_shared": false
    },
    {
        "title": "My Outfit",
        "img": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "is_shared": false
    }
];

function OutfitListing(props) {

    const [outfits, setOutfits] = useState(mock_outfits);
    const navigate = useNavigate();
    return (
        <>
            <div className='window'>
                <h2 className='section-title'>My Outfits</h2>
                <div className='templates-container'>
                    <div className='templates-wrapper'>
                        <span className="templates-title">
                            Start a new Outfit
                        </span>
                        <span className='templates-block'>
                            <div className='template-item'>
                                <div className='template-item-img-wrapper  blank-template-item'>
                                    <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                                </div>
                                <p >Blank</p>
                            </div>
                            {templates.map(template => (
                                <div className="template-item">
                                    <span className='template-item-img-wrapper'>
                                        <img src={template.img}></img>
                                    </span>
                                    <p >{template.title}</p>
                                </div>
                            ))}
                        </span>
                    </div>
                </div >
                <div className='outfits'>
                    <span className='outfits-header'>
                        <p>My Outfits</p>
                        <span className='icon-wrapper'><FontAwesomeIcon icon={faSliders} /></span>

                    </span>
                    <div className='outfits-container'>
                        {outfits.map(outfit => (
                            <div className='outfit-item' onClick={() => { navigate('/outfit') }}>
                                <a href='/outfit'>
                                    <span className='outfit-item-img-wrapper'>
                                        <img src={outfit.img} alt="Outfit"></img>
                                    </span>
                                    <span className='outfit-title-footer'>
                                        <p className="outfit-title">{outfit.title}</p>
                                        {outfit.is_shared && <FontAwesomeIcon icon={faUserGroup} className="outfit-title-footer-shared-icon" />}
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    );
}

export default OutfitListing