import logo from './logo-white.png';
import './style.css';

function Login(props) {

    return (
        <div className='login-window'>
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Username</p>
                <input name="usernameInput" />
                <p>Password</p>
                <input name="usernameInput" />
                <button class="roundButton" onClick={() => props.handleAuth(true)}>Start styling...</button>
            </div>
        </div>
    );
}

export default Login;