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
import { A } from './a';
import './navbar.scss';

export const TopNavbar = ({ active, menu, settings, title, onToggle }) => (
    <header className="kip-navbar bulma-navbar">
        <div className="centered">
            <div className="bulma-navbar-brand">
                <div className="kip-logo-wrapper">
                    <A href="/#doNotRedirect=true">
                        <img
                            className="kip-logo"
                            alt={title}
                            src={settings.get('logo')}
                        />
                        <img
                            className="kip-small-logo"
                            alt={title}
                            src={settings.get('smallLogo')}
                        />
                    </A>
                </div>
            </div>
            <h1 className="bulma-navbar-item bulma-navbar-title">{title}</h1>

            <div
                aria-label="menu"
                aria-expanded={active}
                className={
                    'bulma-navbar-burger bulma-burger is-hidden-desktop' +
                    (active ? ' is-active' : '')
                }
                data-target="sidebar"
                role="button"
                onClick={onToggle}
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </div>
        </div>

        <div className="bulma-navbar-menu">
            <div className="bulma-navbar-end">
                <NavbarMenuItems menu={menu} onToggle={onToggle} />
            </div>
        </div>
    </header>
);

TopNavbar.propTypes = {
    active: PropTypes.bool,
    menu: PropTypes.instanceOf(Map).isRequired,
    settings: PropTypes.shape({
        get: PropTypes.func.isRequired,
    }).isRequired,
    title: PropTypes.string,
    onToggle: PropTypes.func,
};

export const NavbarItem = ({ children, href, onToggle }) => (
    <A className="bulma-navbar-link" href={href} onClick={onToggle}>
        {children}
    </A>
);

NavbarItem.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    onToggle: PropTypes.func,
};

export const NavbarMenuItems = ({ menu, onToggle }) => {
    const items = [];
    for (const [, item] of menu) {
        items.push(item);
    }
    return items.map((item, i) => {
        if (item.subMenu !== undefined) {
            return (
                <NavbarDropdownMenu
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
                <NavbarItem key={i} href={href} onToggle={onToggle}>
                    {item.title}
                </NavbarItem>
            );
        }
    });
};

NavbarMenuItems.propTypes = {
    menu: PropTypes.instanceOf(Map).isRequired,
    onToggle: PropTypes.func,
};

export const NavbarDropdownItem = ({ children, href, onToggle }) => (
    <A
        className="kip-navbar-dropdown__item bulma-dropdown-item"
        href={href}
        onClick={onToggle}
    >
        {children}
    </A>
);

NavbarDropdownItem.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    onToggle: PropTypes.func,
};

export class NavbarDropdownMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            active: false,
        };
        this.self = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleAnyClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleAnyClick);
    }

    /**
     * To deactivate an active navigation, the nav listens for any click event
     * on the page.
     */
    handleAnyClick = () => {
        if (!this.state.active) return;
        const item = this.self.current;
        // if the click was inside the active submenu, we process it normally
        if (item !== undefined && item.contains(event.target)) return;
        this.setState({ active: false });
    };

    isActive() {
        return this.state.active;
    }

    handleToggleItem = event => {
        this.toggleActive();
        if (this.props.onToggle) {
            this.props.onToggle(event);
        }
    };

    handleClickTitle = event => {
        event.preventDefault();
        this.toggleActive();
    };

    toggleActive = () => {
        this.setState({ active: !this.state.active });
    };

    renderItems = () =>
        this.props.items.map((item, i) => {
            let href;
            if (item.route !== undefined) href = `/${item.route}`;
            return (
                <NavbarDropdownItem
                    key={i}
                    href={href}
                    onToggle={this.handleToggleItem}
                >
                    {item.title}
                </NavbarDropdownItem>
            );
        });

    render() {
        return (
            <div
                ref={this.self}
                className={classnames(
                    'kip-navbar-dropdown-menu',
                    'bulma-navbar-item bulma-has-dropdown',
                    {
                        'bulma-is-active': this.isActive(),
                    }
                )}
            >
                <A
                    aria-haspopup="true"
                    aria-expanded={this.isActive()}
                    className="bulma-navbar-link"
                    role="button"
                    tabIndex={0}
                    onClick={this.handleClickTitle}
                >
                    {this.props.title}
                </A>
                <div className="kip-navbar-dropdown bulma-navbar-dropdown bulma-is-right">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

NavbarDropdownMenu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            route: PropTypes.string,
            title: PropTypes.any,
        })
    ).isRequired,
    title: PropTypes.node,
    onToggle: PropTypes.func,
};
