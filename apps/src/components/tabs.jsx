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
import { A } from './a';

import './tabs.scss';

export class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    render() {
        const { active } = this.state;

        const toggle = () => this.setState({ active: !active });

        return (
            <div
                className={'bulma-tabs' + (this.state.active ? ' active' : '')}
                onClick={toggle}
            >
                <span className="bulma-more">
                    <span className="cm-tabs-more">&or;</span>
                </span>
                <ul>{this.props.children}</ul>
            </div>
        );
    }
}

export const Tab = ({ active, children, href, icon, params, onClick }) => (
    <li className={active ? 'bulma-is-active' : ''}>
        <A href={href} params={params} onClick={onClick}>
            {icon && <span className="icon is-small">{icon}</span>}
            {children}
        </A>
    </li>
);

Tab.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    icon: PropTypes.node,
    params: PropTypes.object,
    onClick: PropTypes.func,
};
