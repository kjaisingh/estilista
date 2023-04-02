import logo from './logo-white.png';
import beanie from './beanie.png';
import boot from './boot.png';
import tracksuit from './tracksuit.png';
import tshirt from './tshirt.png';

import shirt1 from './shirt1.jpeg';
import shirt2 from './shirt2.jpeg';
import shirt3 from './shirt3.jpeg';
import shirt4 from './shirt4.jpeg';
import shirt5 from './shirt5.webp';
import shirt6 from './shirt6.avif';
import shirt7 from './shirt7.jpeg';

import './Wardrobe.css';
import { useNavigate } from 'react-router-dom';

import { FaHome } from "react-icons/fa"
import { FaSearch } from "react-icons/fa"
import { FaTshirt } from "react-icons/fa"

function Wardrobe() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="navBar">
        <img src={logo} className="logo"/>
      </div>

      <div className="clothingType">
        <table>
          <tr>
            <td>
              <img src={tshirt} className="tshirt"/>
            </td>
            <td>
              <img src={tracksuit} className="tracksuit"/>
            </td>
            <td>
              <img src={boot} className="boot"/>
            </td>
            <td>
              <img src={beanie} className="beanie"/>
            </td>
          </tr>
        </table>
      </div>

      <div className="clothesList">
        <table>
          <tr>
            <td>
              <img src={shirt1} className="shirt"/>
            </td>
            <td>
              <img src={shirt2} className="shirt"/>
            </td>
            <td>
              <img src={shirt3} className="shirt"/>
            </td>
          </tr>
          <tr>
            <td>
              <img src={shirt4} className="shirt"/>
            </td>
            <td>
              <img src={shirt5} className="shirt"/>
            </td>
            <td>
              <img src={shirt6} className="shirt"/>
            </td>
          </tr>
          <tr>
            <td>
              <img src={shirt7} className="shirt"/>
            </td>
            <td>
              <img src={shirt1} className="shirt"/>
            </td>
            <td>
              <img src={shirt1} className="shirt"/>
            </td>
          </tr>
        </table>
      </div>

      <div className="footer">
        <FaHome class="footerIcon" onClick={ ()=> navigate('/feed') }/> <FaSearch class="footerIcon unselectedIcon" onClick={ ()=> navigate('/outfits') }/> <FaTshirt class="footerIcon unselectedIcon" onClick={ ()=> navigate('/wardrobe') }/>
      </div>
    </div>
  );
}

export default Wardrobe;
