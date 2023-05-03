import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login'
import Feed from './components/Feed/Feed';
import ClosetPage from './components/ClosetPage/ClosetPage';
import OutfitListing from './components/OutfitListing/OutfitListing';
import OutfitPage from './components/OutfitPage/OutfitPage';
import MarketPlace from './components/MarketPlace/MarketPlace';
import NavBar from './components/NavBar/NavBar';


// USERS with supported profile pictures
const users_with_profile_pictures = {
  "johnwick": "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
  "johndoe": "https://drive.google.com/uc?id=13OVXxHvpAsPS5WmZgRzxu7j2lfH7kV3z&export=download",
  "jonjones": "https://drive.google.com/uc?export=view&id=1bL48Yx608hc6QK41dVx-7O95XwMPOc25"
};

function App() {
  const [isAuth, setIsAuth] = useState(false);

  function handleAuth(username) {
    localStorage.setItem("username", username);
    if (users_with_profile_pictures[username])
      localStorage.setItem("profile_img", users_with_profile_pictures[username]);
    setIsAuth(true);
  }

  function handleLogOut(token) {
    localStorage.clear();
    setIsAuth(false);
  }

  if (!localStorage.getItem('username') && !isAuth) return (<Login handleAuth={handleAuth} />);

  const user_information = { "username": localStorage.getItem("username"), "profile_img": localStorage.getItem("profile_img") };
  return (
    <>
      <NavBar handleLogOut={handleLogOut} />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<OutfitListing {...user_information} />} />
          <Route exact path="/feed" element={<Feed />} />
          <Route exact path="/outfits" element={<OutfitListing />} />
          <Route exact path="/closet" element={<ClosetPage />} />
          <Route exact path="/shop" element={<MarketPlace />} />
          <Route exact path="/home" element={<OutfitListing />} />
          <Route exact path="/outfit" element={<OutfitPage  {...user_information} />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
