import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    openModal: PropTypes.func,
    notifications: PropTypes.number,
};


const Avatar = ({openModal, notifications = 0}) => {
    return (
        <div onClick={() => openModal()} className="avatar-container">
            <img src="https://i.imgur.com/n55ZsQO.png" className="avatar" alt="user avatar"/>
            {
                notifications > 0 &&
                    <span className="notification-number">{notifications}</span>
            }
        </div>
    );
};


Avatar.propTypes = propTypes;


export default Avatar;
