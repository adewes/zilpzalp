import PropTypes from 'prop-types';
import React from 'react';
import './title.scss';

export const NoWrap = ({ children }) => (
    <div className="kip-nowrap">{children}</div>
);

export const OverflowEllipsis = ({ className, children }) => (
    <span
        className={
            'kip-overflow-ellipsis' +
            (className !== undefined ? ' ' + className : '')
        }
    >
        {children}
    </span>
);

export const Title = ({ title, icon }) => (
    <span>
        <span className="icon is-small">
            <i className={`fas fa-${icon}`} />
        </span>
        {title}
    </span>
);

Title.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};
