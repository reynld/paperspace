import React from 'react';
import PropTypes from 'prop-types';


const propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
};


const Alert = (props) => {

    const formatDate = (date) => {
        const today = new Date();
        const newDay = new Date(date)
        return Math.ceil((today - newDay) / 8.64e7) - 1
    }

    const renderTag = (tag) => {
        if (tag === "new") {
            return (
                <div className="alert-tag tag-new">
                    {tag}
                </div>
            );
        }

        if (tag === "improvements") {
            return (
                <div className="alert-tag tag-im">
                    {tag}
                </div>
            );
        }

        return (
            <div className="alert-tag">
                {tag}
            </div>
        );
    }

    const { title, body, date, image, tag} = props;

    const daysPast = formatDate(date);
    const dateDisplayString = daysPast > 0 ? `${daysPast} days ago`: 'today'

    return (
        <div className="alert-container">
            <div className="alert-date">{dateDisplayString}</div>
            <div className="alert-info">
                <h2>{title}</h2>
                {renderTag(tag)}
                <p>{body}</p>
                {
                    image !== "" && <img src={image} alt="preview" className="alert-image" />
                }
            </div>
        </div>
    );
};


Alert.propTypes = propTypes;


export default Alert;
