import WardrobeWidget from "../WardrobeWidget/WardrobeWidget";
import './style.css';


function ClosetPage(props) {
    return (<div className="closet-page-window">
        <div className="wardrobe-container">
            <WardrobeWidget />
        </div>

    </div>)
}

export default ClosetPage;