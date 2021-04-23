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
import classnames from 'helpers/classnames';

import './list.scss';

export const List = ({ children }) => (
    <div className="kip-list">{children}</div>
);

export const ListHeader = ({ children }) => (
    <div className="kip-item kip-is-header">{children}</div>
);

export const ListColumn = ({ children, size = 'md', wraps = false }) => (
    <div
        className={classnames(`kip-col kip-is-${size}`, { 'kip-wraps': wraps })}
    >
        {children}
    </div>
);

export const ListItem = ({ children, isCard = true, onClick }) => (
    <div
        // Make focusable with the keyboard, if a handler is available
        tabIndex={onClick ? 0 : -1}
        className={classnames('kip-item', {
            'kip-is-card': isCard,
            'kip-is-clickable': onClick,
        })}
        onClick={e => {
            e.preventDefault();
            if (onClick) onClick();
        }}
    >
        {children}
    </div>
);

ListItem.propTypes = {
    children: PropTypes.node,
    isCard: PropTypes.bool,
    onClick: PropTypes.func,
};
