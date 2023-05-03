import React, { useState, useEffect, useParams } from 'react';

import { useNavigate } from 'react-router-dom';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TbHanger } from 'react-icons/tb';

/**
 * React Component for Header displayed to a logged in user
 **/

function NavBar(props) {

    const [selectedItem, setSelectedItem] = useState("");

    function handleClick(item) {
        setSelectedItem(item);
    }

    return (
        <div className="navbar">
            <a href="/" className={`${selectedItem === 'Home' && 'selected'}`}
                onClick={() => handleClick('Home')} ><i className="fa fa-home"></i></a>
            <a href="/feed" className={`${selectedItem === 'Feed' && 'selected'}`}
                onClick={() => handleClick('Feed')}><i className="fa fa-compass"></i></a>
            <a href="/shop" className={`${selectedItem === 'Marketplace' && 'selected'}`}
                onClick={() => handleClick('Marketplace')}><i className="fa fa-shopping-bag"></i></a>
            <a href="/closet" className={`${selectedItem === 'Closet' && 'selected'}`}
                onClick={() => handleClick('Closet')}><i><TbHanger /></i> </a>
            <a href="/outfits" className={`${selectedItem === 'Outfits' && 'selected'}`}
                onClick={() => handleClick('Outfits')}><i className="fa fa-tshirt"></i></a>
            <a href="/" className={`${selectedItem === 'User' && 'selected'}`}
                onClick={() => handleClick('User')}><i className="fa fa-user"></i></a>
            <a href="/" className={`${selectedItem === 'Signout' && 'selected'}`}
                onClick={() => props.handleLogOut()}><i className="fa fa-sign-out"></i></a>
        </div >
    );
}

export default NavBar