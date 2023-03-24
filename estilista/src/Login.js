import logo from './logo-white.png';
import './Login.css';

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Username</p>
		<input name="usernameInput" />
		<p>Password</p>
		<input name="usernameInput" />
		<button class="roundButton">Start styling...</button>
      </header>
    </div>
  );
}

export default Login;
