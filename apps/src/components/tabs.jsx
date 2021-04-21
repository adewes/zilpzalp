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
