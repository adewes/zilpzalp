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
import './button.scss';

import { A } from './a';

export const ButtonIcon = ({ icon, brand }) => (
    <span className="bulma-icon bulma-is-small">
        <i className={(brand ? 'fab' : 'fas') + ` fa-${icon}`} />
    </span>
);

export const ButtonLogo = ({ logo }) => (
    <span className="bulma-icon bulma-is-small kip-logo">
        <img src={logo} />
    </span>
);

export const Button = ({
    children,
    flex,
    href,
    hashParams,
    params,
    icon,
    logo,
    light,
    brand,
    large,
    type,
    external,
    noText,
    htmlType,
    onClick,
    target,
    waiting,
    className,
    disabled,
    ...props
}) => (
    <A
        external={external}
        target={target}
        onClick={e => (!disabled && onClick !== undefined ? onClick(e) : false)}
        href={href}
        params={params}
        hashParams={hashParams}
    >
        <button
            disabled={disabled}
            className={classnames(
                'bulma-button',
                `bulma-is-${type}`,
                className,
                {
                    'kip-no-text': noText,
                    'bulma-is-flex': flex,
                    'bulma-is-large': large,
                    'bulma-is-light': light,
                }
            )}
            {...props}
            type={htmlType}
        >
            {icon && !waiting && <ButtonIcon icon={icon} brand={brand} />}
            {logo && !waiting && <ButtonLogo logo={logo} />}
            {waiting && <ButtonIcon icon="circle-notch fa-spin" />}
            <span>{children}</span>
        </button>
    </A>
);

Button.defaultProps = {
    children: undefined,
    brand: false,
    flex: false,
    waiting: false,
    href: undefined,
    light: false,
    htmlType: 'button',
    icon: undefined,
    large: false,
    type: 'primary',
    onClick: undefined,
};

Button.propTypes = {
    brand: PropTypes.bool,
    children: PropTypes.node,
    flex: PropTypes.bool,
    href: PropTypes.string,
    icon: PropTypes.node,
    large: PropTypes.bool,
    light: PropTypes.bool,
    type: PropTypes.string,
    htmlType: PropTypes.string,
    waiting: PropTypes.bool,
    primary: PropTypes.bool,
    onClick: PropTypes.func,
};
