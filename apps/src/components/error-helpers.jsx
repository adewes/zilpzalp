import React from 'react';
import PropTypes from 'prop-types';
import { Message } from './message';

export const mergeErrors = (errors, newErrors) => {
    for (const key of Object.keys(newErrors)) {
        if (errors[key] === undefined) errors[key] = newErrors[key];
        else errors[key] = errors[key].concat(newErrors[key]);
    }
};

export const ErrorMessage = ({ error }) => {
    if (error === undefined || error.message === undefined) return null;
    return <Message type="danger">{error.message}</Message>;
};
ErrorMessage.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.node,
    }),
};

export const ErrorFor = ({ error, field }) => {
    let message;
    if (
        error === undefined ||
        error.errors === undefined ||
        !error.errors[field]
    )
        message = <React.Fragment>&nbsp;</React.Fragment>;
    else message = error.errors[field];
    return <p className="bulma-help bulma-is-info">{message}</p>;
};
ErrorFor.propTypes = {
    error: PropTypes.shape({
        errors: PropTypes.object,
    }),
    field: PropTypes.string.isRequired,
};
