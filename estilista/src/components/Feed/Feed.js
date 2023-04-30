import './style.css';

import { useNavigate } from 'react-router-dom';


import { FaHeart } from "react-icons/fa"
import { FaRegComment } from "react-icons/fa"


const posts = [
    {
        "username": "@DaDripLord",
        "caption": "This new fit of mine is straight thurl.",
        "img": "https://drive.google.com/uc?export=view&id=1BbzDx4-mICYt83pglqnEcxd6OtsNE6yF"
    },
    {
        "username": "@DripMeister141",
        "caption": "How should I improve my new outfit?",
        "img": "https://drive.google.com/uc?export=view&id=1PEOkaWiybBTKa6q_Ywpxwt0fy4V2AkM8"
    },
    {
        "username": "@DaDripLord",
        "caption": "This new fit of mine is straight thurl.",
        "img": "https://drive.google.com/uc?export=view&id=1BbzDx4-mICYt83pglqnEcxd6OtsNE6yF"
    },
    {
        "username": "@DaDripLord",
        "caption": "This new fit of mine is straight thurl.",
        "img": "https://drive.google.com/uc?export=view&id=1BbzDx4-mICYt83pglqnEcxd6OtsNE6yF"
    },
    {
        "username": "@DaDripLord",
        "caption": "This new fit of mine is straight thurl.",
        "img": "https://drive.google.com/uc?export=view&id=1BbzDx4-mICYt83pglqnEcxd6OtsNE6yF"
    },
    {
        "username": "@DaDripLord",
        "caption": "This new fit of mine is straight thurl.",
        "img": "https://drive.google.com/uc?export=view&id=1BbzDx4-mICYt83pglqnEcxd6OtsNE6yF"
    }
];

function Feed(props) {
    const navigate = useNavigate();

    return (
        <div className='feed-window'>
            <div className="section-title-container">
                <h2 className='section-title'>Feed</h2>
            </div>

            <div className="feed-flex-container">
                {posts.map(post =>
                (<div>
                    <div className="feed-item">
                        <p className="name-text" align="left">{post.username}</p>
                        <p className="caption-text" align="left">{post.caption}</p>
                        <img src={post.img} className="outfit" />
                        <div className="button-row">
                            <FaHeart class="row-icon" /> <FaRegComment class="rowIcon" />
                        </div>
                    </div>

                    <hr></hr>
                </div>)
                )}

            </div>
        </div>
    );
}

export default Feed;
