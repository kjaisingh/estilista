import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './Login';
import Feed from './Feed';
import Outfits from './Outfits';
import View from './View';
import Wardrobe from './Wardrobe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/feed" element={<Feed/>}/>
        <Route exact path="/outfits" element={<Outfits/>}/>
        <Route exact path="/view" element={<View/>}/>
        <Route exact path="/wardrobe" element={<Wardrobe/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
