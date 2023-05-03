import react, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login'
import Feed from './components/Feed/Feed';
import ClosetPage from './components/ClosetPage/ClosetPage';
import OutfitListing from './components/OutfitListing/OutfitListing';
import OutfitPage from './components/OutfitPage/OutfitPage';
import NavBar from './components/NavBar/NavBar';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  function handleAuth(token) {
    localStorage.setItem("authToken", token);
    setIsAuth(true);
  }

  function handleLogOut(token) {
    localStorage.clear();
    setIsAuth(false);
  }

  if (!localStorage.getItem('authToken') && !isAuth) return (<Login handleAuth={handleAuth} />);


  return (
    <>
      <NavBar handleLogOut={handleLogOut} />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<OutfitListing />} />
          <Route exact path="/feed" element={<Feed />} />
          <Route exact path="/outfits" element={<OutfitListing />} />
          <Route exact path="/closet" element={<ClosetPage />} />

          <Route exact path="/home" element={<OutfitListing />} />
          <Route exact path="/outfit" element={<OutfitPage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
