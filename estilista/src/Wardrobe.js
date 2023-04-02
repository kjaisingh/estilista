import logo from './logo-white.png';

import beanie from './beanie.png';
import boot from './boot.png';
import tracksuit from './tracksuit.png';
import tshirt from './tshirt.png';

import addIcon from './addIcon.png';

import shirt1 from './shirts/shirt1.png';
import shirt2 from './shirts/shirt2.png';
import shirt3 from './shirts/shirt3.png';
import shirt4 from './shirts/shirt4.png';
import shirt5 from './shirts/shirt5.png';
import shirt6 from './shirts/shirt6.png';
import shirt7 from './shirts/shirt7.png';
import shirt8 from './shirts/shirt8.png';

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

      <div className="titleBlock">
        <h3>
          Your Wardrobe <img src={addIcon} className="addIcon"/>
        </h3>
      </div>

      <div className="clothingType">
        <table>
          <tr>
            <td>
              <img src={tshirt} className="selectedIcon"/>
            </td>
            <td>
              <img src={tracksuit} className="unselectedIcon"/>
            </td>
            <td>
              <img src={boot} className="unselectedIcon"/>
            </td>
            <td>
              <img src={beanie} className="unselectedIcon"/>
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
              <img src={shirt8} className="shirt"/>
            </td>
            <td>
              {/* Blank cell */}
            </td>
          </tr>
        </table>
      </div>

      <div className="footer">
        <FaHome class="footerIcon unselectedIcon" onClick={ ()=> navigate('/feed') }/> <FaSearch class="footerIcon unselectedIcon" onClick={ ()=> navigate('/outfits') }/> <FaTshirt class="footerIcon" onClick={ ()=> navigate('/wardrobe') }/>
      </div>
    </div>
  );
}

export default Wardrobe;
