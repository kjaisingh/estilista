import './Feed.css';

import { useNavigate } from 'react-router-dom';

import logo from './logo-white.png';
import outfit1 from './outfit1.png';
import outfit2 from './outfit2.png';

import { FaHome } from "react-icons/fa"
import { FaSearch } from "react-icons/fa"
import { FaTshirt } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaRegComment } from "react-icons/fa"


function Feed() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="navBar">
        <img src={logo} className="logo"/>
      </div>
      <div className="feedBody">
        <div className="feedItem">
          <p class="nameText" align="left">@DaDripLord</p>
          <p class="captionText" align="left">This new fit of mine is straight thurl.</p>
          <img src={outfit1} className="outfit"/>
          <div className="buttonRow">
            <FaHeart class="rowIcon"/> <FaRegComment class="rowIcon"/>
          </div>
        </div>

        <hr></hr>

        <div className="feedItem">
          <p class="nameText" align="left">@DripMeister141</p>
          <p class="captionText" align="left">How should I improve my new outfit?</p>
          <img src={outfit2} className="outfit"/>
          <div className="buttonRow">
            <FaHeart class="rowIcon"/> <FaRegComment class="rowIcon"/>
          </div>
        </div>

      </div>
      <div className="footer">
        <FaHome class="footerIcon" onClick={ ()=> navigate('/feed') }/> <FaSearch class="footerIcon unselectedIcon" onClick={ ()=> navigate('/outfits') }/> <FaTshirt class="footerIcon unselectedIcon" onClick={ ()=> navigate('/wardrobe') }/>
      </div>
    </div>
  );
}

export default Feed;
