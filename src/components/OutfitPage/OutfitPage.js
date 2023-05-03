import React, { useState, useEffect, useParams } from 'react';

import { useNavigate } from 'react-router-dom';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faPen, faSliders } from '@fortawesome/free-solid-svg-icons'
import WardrobeWidget from '../WardrobeWidget/WardrobeWidget';
import SelectedItemsWidget from './SelectedItems';
import ContextInput from './ContextInput';
import ActiveUsersDisplay from './ActiveUsersDisplay';

const { socketPort, socketURL } = require('../../utils/utils');
/**
 * React Component for Header displayed to a logged in user
 **/

const mock_data = {
    "casual": {
        "image": "https://drive.google.com/uc?export=view&id=1DGv2BRKvW9LJtk0EtsLky45R71_0sUKS",
        "name": "My Outfit",
        "selected_items": [
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

// Set props username to random guest
const username = "GUEST-" + Math.floor(Math.random() * 1000).toString();

function OutfitPage(props) {

    const navigate = useNavigate();
    const [isEditingName, setIsEditingName] = useState(false);
    const [outfitName, setOutfitName] = useState("");
    const [outfitImage, setOutfitImage] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [lock, setLock] = useState(false);

    const [activeUsers, setActiveUsers] = useState([username]);

    const [isLoadingRender, setIsLoadingRender] = useState(false);

    useEffect(() => {
        setOutfitName(mock_data["casual"]["name"]);
        setOutfitImage(mock_data["casual"]["image"]);
        setSelectedItems(mock_data["casual"]["selected_items"]);
    }, []);



    /**
     * Socket Handlers
    */

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // If the outfit name is not set, return
        if (!outfitName) return;
        const newSocket = new WebSocket(`${socketURL}:${socketPort}`);

        newSocket.onopen = () => {
            console.log('WebSocket connection opened');
            setSocket(newSocket);
            const join_message = { "is_join": true, "outfit_id": outfitName, "username": username }
            newSocket.send(JSON.stringify(join_message));
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        newSocket.onmessage = async function (event) {

            const messageString = await event.data;
            console.log(messageString);
            const messageObject = JSON.parse(messageString);

            // Update list of connected users
            if (messageObject.active_users) {
                return setActiveUsers(messageObject.active_users);
            }

            // Handle image render
            if (messageObject.render_img) {
                setIsLoadingRender(false);
                return setOutfitImage(messageObject.render_img);
            }

            // Update locally selected items
            if (messageObject.selected_items) {
                setSelectedItems(messageObject.selected_items);
                console.log("Updated selected items");
                setLock(true);
            }
        };

        return () => {
            newSocket.close();
            setSocket(null);
        };
    }, [outfitName]);

    useEffect(() => {

        if (outfitImage === "https://drive.google.com/uc?id=1japJH5PYA0oXwZFKg3pHDU1pWlpyLS0n&export=download") {
            setOutfitImage(mock_data["casual"]["image"]);
        } else {
            setOutfitImage("https://drive.google.com/uc?id=1japJH5PYA0oXwZFKg3pHDU1pWlpyLS0n&export=download");
        }
        // Lock avoids Re-echoing of messages
        if (lock) {
            setLock(false);
            return;
        }
        // Send message to socket
        const message = { "outfit_id": outfitName, "selected_items": selectedItems }
        if (socket) {
            socket.send(JSON.stringify(message));
        }
        // Re render the page
    }, [selectedItems]);





    function handleRenderSubmit(prompt_context) {
        const message = { "outfit_id": outfitName, "is_render": true }
        if (prompt_context) message.prompt_context = prompt_context;
        if (socket) socket.send(JSON.stringify(message));
        setIsLoadingRender(true);
        console.log(`Sent ${JSON.stringify(message)} to server`);
    }

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
                    {/* <FontAwesomeIcon icon={faSliders} className="header-menu-icon" /> */}
                    <ActiveUsersDisplay activeUsers={activeUsers} />
                </div>
                <div className='outfit-image-wrapper'>
                    <img src={outfitImage} alt="Outfit Image"></img>
                </div>
            </div>
            <div className='items-selection-window'>
                <div className='context-input-window'>
                    <ContextInput onSubmit={handleRenderSubmit} isLoading={isLoadingRender} />
                </div>
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