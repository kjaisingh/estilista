import React, { useState } from 'react';
import logo from './logo-white.png';
import './style.css';

function Login(props) {

    const [username, setUsername] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    return (
        <div className='login-window'>
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Username</p>
                <input name="usernameInput" value={username} onChange={handleUsernameChange} />
                <p>Password</p>
                <input name="usernameInput" />
                <button class="roundButton" onClick={() => props.handleAuth(username)}>Start styling...</button>
            </div>
        </div>
    );
}

export default Login;