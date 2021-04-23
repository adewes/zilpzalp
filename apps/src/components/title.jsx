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
