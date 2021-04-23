// Zilp-Zalp - Privacy-Friendly Contact Tracing
// Copyright (C) 2021-2021 The Zilp-Zalp Authors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
