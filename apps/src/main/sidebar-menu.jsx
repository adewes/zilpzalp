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
import { A } from 'components';
import classnames from 'helpers/classnames';
import './sidebar-menu.scss';

class NavItem extends React.Component {
    render() {
        const { href, onToggle } = this.props;
        return (
            <li className="kip-nav-item">
                <A href={href} onClick={onToggle}>
                    {this.props.children}
                </A>
            </li>
        );
    }
}

class DropdownItem extends React.Component {
    render() {
        const { href, onToggle } = this.props;
        return (
            <li className="kip-nav-item">
                <A href={href} onClick={onToggle}>
                    {this.props.children}
                </A>
            </li>
        );
    }
}

class DropdownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
        this.self = React.createRef();
    }

    isActive = () => {
        return this.state.active;
    };

    onToggle = event => {
        this.toggleActive();
        this.props.onToggle(event);
    };

    toggleActive = () => {
        this.setState({ active: !this.state.active });
    };

    render() {
        const { title, items, user } = this.props;
        const navItems = items
            .filter(item => {
                if (item.show !== undefined && item.show(user.user) === false)
                    return false;
                return true;
            })
            .map((item, i) => {
                let href;
                if (item.route !== undefined) href = '/' + item.route;
                return (
                    <DropdownItem
                        key={i}
                        href={href}
                        onToggle={e => this.props.onToggle(e)}
                    >
                        {item.title}
                    </DropdownItem>
                );
            });
        let subMenu;
        if (this.isActive()) {
            subMenu = <ul>{navItems}</ul>;
        }
        return (
            <li className="kip-nav-item" ref={this.self}>
                <A
                    className={this.isActive() ? 'is-active' : ''}
                    onClick={this.toggleActive}
                >
                    {title}
                </A>
                {subMenu}
            </li>
        );
    }
}

class MenuItems extends React.Component {
    render() {
        const { menu, onToggle, user } = this.props;
        const items = [];

        for (const [, item] of menu) {
            items.push(item);
        }

        return items
            .filter(item => {
                if (item.show !== undefined && item.show(user.user) === false)
                    return false;
                return true;
            })
            .map((item, i) => {
                if (item.subMenu !== undefined) {
                    return (
                        <DropdownMenu
                            key={i}
                            title={item.title}
                            items={item.subMenu}
                            onToggle={onToggle}
                        />
                    );
                } else {
                    let href;
                    if (item.route !== undefined) href = '/' + item.route;
                    return (
                        <NavItem key={i} href={href} onToggle={onToggle}>
                            {item.title}
                        </NavItem>
                    );
                }
            });
    }
}

const MenuItemsWithUser = MenuItems;

const Menu = ({ title, menu, onToggle, mobileOnly }) => (
    <aside
        className={classnames('kip-menu-aside', {
            'kip-mobile-only': mobileOnly,
        })}
    >
        {title && <p className="kip-menu-label">{title}</p>}
        <ul className="kip-menu-list">
            <MenuItemsWithUser menu={menu} onToggle={onToggle} />
        </ul>
    </aside>
);

Menu.propTypes = {
    title: PropTypes.node,
    onToggle: PropTypes.func,
};

export default Menu;
