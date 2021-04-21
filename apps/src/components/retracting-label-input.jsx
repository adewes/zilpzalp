import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './form';
import './retracting-label-input.scss';

/**
 * An input field with a label that looks like a placeholder but retracts
 * to the top when an input is made.
 */
export const RetractingLabelInput = ({
    name,
    label,
    description,
    children,
    className,
    ...props
}) => (
    <span
        className={
            'kip-retracting-label-input' + (className ? ' ' + className : '')
        }
    >
        <Input
            aria-labelledby={name + 'label'}
            {...props}
            className="kip-input"
            placeholder=" " // Used to determine if the input is empty; needs to be a space for Chrome
        />
        <span
            id={'kip-' + name + '-label'}
            aria-hidden="true"
            className="kip-label"
        >
            {label}
        </span>
        <p className="kip-description">{description}</p>
        {children}
    </span>
);

RetractingLabelInput.propTypes = {
    className: '',
    label: '',
};

RetractingLabelInput.propTypes = {
    /* Class name to apply on the input */
    className: PropTypes.string,
    /* A describing label for the input */
    label: PropTypes.node.isRequired,
};
