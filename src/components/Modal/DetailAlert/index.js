import React from 'react';
import { string, shape } from 'prop-types';
import { formatDaysPassed } from '../../Utils/helper'
import Tag from '../Tag';

const propTypes = {
    alert: shape({
        title: string,
        body: string,
        date: string,
        image: string,
    }),
};

const DetailAlert = (props) => {
    const { alert } = props;
    const { title, body, date, image, tag } = alert;

    return (
        <div className="alert-container detailed-view">
            <div className="alert-info">
                <h2>{title}</h2>
                <div className="alert-date">{formatDaysPassed(date)}</div>
                <Tag tag={tag}/>
                <p>{body}</p>
                {
                    image !== "" && <img src={image} alt="preview" className="alert-image" />
                }
            </div>
        </div>
    );
};


DetailAlert.propTypes = propTypes;


export default DetailAlert;
