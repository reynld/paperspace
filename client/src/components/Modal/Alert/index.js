import React from 'react';
import { string, func, shape } from 'prop-types';
import { formatDaysPassed } from '../../Utils/helper'
import Tag from '../Tag';

const propTypes = {
    alert: shape({
        title: string,
        body: string,
        date: string,
        image: string,
    }),
    selectAlert: func,
};


const Alert = (props) => {
    const { alert, selectAlert } = props;
    const { title, body, date, tag } = alert;

    return (
        <div className="alert-container" onClick={() => selectAlert(alert)}>
            <div className="alert-date">{formatDaysPassed(date)}</div>
            <div className="alert-info">
                <h2>{title}</h2>
                <Tag tag={tag}/>
                <p>{body}</p>
            </div>
        </div>
    );
};


Alert.propTypes = propTypes;


export default Alert;
