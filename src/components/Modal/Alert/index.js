import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
};


const Alert = (props) => {
    const { title, body, date, image} = props;
    return (
        <div className="alert-container">
            <div className="date">{date}</div>
            <div className="alert-info">
                <h2>{title}</h2>
                <p>{body}</p>
                {
                    image !== "" && <img src={image} alt="preview" />
                }
            </div>
        </div>
    );
};


Alert.propTypes = propTypes;


export default Alert;
