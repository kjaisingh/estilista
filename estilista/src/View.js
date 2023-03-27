import logo from './logo-white.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Username</p>
		<input name="usernameInput" />
		<p>Password</p>
		<input name="usernameInput" />
		<button class="roundButton" onClick={ ()=> navigate('/feed') }>Start styling...</button>
      </header>
    </div>
  );
}

export default Login;
