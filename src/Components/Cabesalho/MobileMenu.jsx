import React, { useState } from 'react';

const MobileMenu = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div 
            className={`mobile_menu ${isActive ? 'active' : ''}`} 
            onClick={handleClick}
        >
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
        </div>
    );
};

export default MobileMenu;