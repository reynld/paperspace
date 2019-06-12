import React from 'react';
import { string } from 'prop-types';


const propTypes = {
    tag: string
};


const Tag = ({ tag }) => {
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

Tag.propTypes = propTypes;


export default Tag;
