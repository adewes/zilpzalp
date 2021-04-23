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
