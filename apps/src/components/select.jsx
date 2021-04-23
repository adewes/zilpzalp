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

import React, { useState } from 'react';
import classnames from 'helpers/classnames';
import './select.scss';

export const RichSelectItem = ({ onClick, option, selected }) => {
    return (
        <div
            className={classnames('kip-select-item', {
                'kip-is-selected': selected,
            })}
            onClick={onClick}
        >
            <h3>{option.title}</h3>
            <p>{option.description}</p>
        </div>
    );
};

export const RichSelect = ({ options, onChange, value }) => {
    const [active, setActive] = useState(false);
    const items = options.map(option => (
        <RichSelectItem
            key={option.value}
            selected={option.value === value}
            option={option}
            onClick={() => onChange(option)}
        />
    ));
    return (
        <div
            className={classnames('kip-select', { 'kip-is-active': active })}
            onClick={() => setActive(!active)}
        >
            <span className="bulma-more">
                <span className="kip-select-more">&or;</span>
            </span>
            {items}
        </div>
    );
};
