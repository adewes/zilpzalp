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
