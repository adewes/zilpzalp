import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'helpers/classnames';
import { A } from './a';
import './dropdown.scss';

export const DropdownMenu = ({ children }) => (
    <Dropdown
        title={
            <span aria-label="More options" className="bulma-icon">
                <i className="fas fa-ellipsis-h" />
            </span>
        }
    >
        <ul className="kip-dropdownmenu">{children}</ul>
    </Dropdown>
);

DropdownMenu.propTypes = {
    children: PropTypes.node,
};

export const DropdownMenuItem = ({ icon, children, onClick }) => (
    <li>
        <A
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
        >
            <span className="bulma-icon">
                <i className={`fas fa-${icon}`}></i>
            </span>
            <span>{children}</span>
        </A>
    </li>
);

DropdownMenuItem.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            right: false,
        };
        this.ref = React.createRef();
        this.handler = e => this.handleClick(e);
    }

    hide() {
        this.setState({ expanded: false });
        document.removeEventListener('click', this.handler, false);
    }

    show() {
        this.setState({ expanded: true });
        document.addEventListener('click', this.handler, false);
    }

    handleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.hide();
    }

    componentWillUnmount() {
        this.hide();
    }

    componentDidMount() {
        // we check where the dropdown is positioned so that we can
        // display the content either left- or right-aligned
        const rect = this.ref.current.getBoundingClientRect();
        if (rect.left > window.innerWidth * 0.5) {
            this.setState({
                right: true,
            });
        }
    }

    handleToggle = event => {
        const { expanded } = this.state;
        event.preventDefault();
        event.stopPropagation();
        if (!expanded) {
            this.show();
        } else {
            this.hide();
        }
    };

    render() {
        const { expanded, right } = this.state;
        const { title, children } = this.props;

        return (
            <div
                ref={this.ref}
                className={classnames('kip-dropdown', { 'is-right': right })}
            >
                <button
                    aria-expanded={expanded}
                    type="button"
                    onClick={this.handleToggle}
                >
                    {title}
                </button>
                <div
                    className={classnames('kip-dropdowncontent', {
                        'kip-dropdownexpanded': expanded,
                    })}
                >
                    {children}
                </div>
            </div>
        );
    }
}

Dropdown.propTypes = {
    children: PropTypes.node,
    title: PropTypes.node.isRequired,
};
