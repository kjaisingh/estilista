import { React, useState } from 'react';
import { FaUsers } from 'react-icons/fa';

function ActiveUsersDisplay({ activeUsers }) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const handleIconClick = () => {
        setIsPopupVisible(true);
    }

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    }

    return (
        <div className='active-users-container'>
            <FaUsers onClick={handleIconClick} />
            <span>{activeUsers.length}</span>
            {isPopupVisible && (
                <div className="active-users-pop-up-container">
                    <h3>Connected Users</h3>
                    <ul>
                        {activeUsers.map((user) => (
                            <li key={user.id}>{user}</li>
                        ))}
                    </ul>
                    <button onClick={handlePopupClose}>Close</button>
                </div>
            )}
        </div>
    );
}

export default ActiveUsersDisplay