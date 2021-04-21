import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'helpers/classnames';

import './card.scss';

export const Card = ({
    withSidebar,
    children,
    centered,
    size,
    flex,
    className,
    ...props
}) => (
    <div
        {...props}
        className={classnames(
            'kip-card',
            {
                'kip-is-centered': centered,
                [`kip-is-${size}`]: size,
                'kip-is-flex': flex,
                'kip-card-with-sidebar': withSidebar,
            },
            className
        )}
    >
        {children}
    </div>
);
Card.propTypes = {
    centered: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    flex: PropTypes.bool,
    size: PropTypes.string,
};

export const CardSidebar = ({ children }) => (
    <div className="kip-card-sidebar">{children}</div>
);

export const CardMainContent = ({ children }) => (
    <div className="kip-card-main-content">{children}</div>
);

export const CardContent = ({ className, children, noPadding, centered }) => (
    <div
        className={classnames('kip-card-content', className, {
            'kip-card-no-padding': noPadding,
            'kip-card-centered': centered,
        })}
    >
        {children}
    </div>
);
CardContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    noPadding: PropTypes.bool,
};

export const CardNav = ({ children, disabled, active, ...props }) => (
    <div
        {...props}
        className={classnames('kip-card-nav', {
            'kip-card-nav-active': active,
            'kip-card-nav-disabled': disabled,
        })}
    >
        {children}
    </div>
);

export const CardHeader = ({ children, ...props }) => (
    <div {...props} className="kip-card-header">
        <div className="kip-card-title">{children}</div>
    </div>
);

export const CardFooter = ({ children }) => (
    <div className="kip-card-footer">{children}</div>
);
CardFooter.propTypes = {
    children: PropTypes.node,
};

export const CardIcon = ({ icon }) => (
    <div className="kip-card-icon">
        <i className={`icon fas fa-${icon}`} />
    </div>
);
CardIcon.propTypes = {
    icon: PropTypes.string.isRequired,
};

export const CenteredCard = ({ embedded, children, ...props }) => (
    <section
        className={classnames(
            'kip-centered-card',
            'kip-is-info',
            'kip-is-fullheight',
            { 'kip-is-embedded': embedded }
        )}
    >
        <Card centered {...props}>
            {children}
        </Card>
    </section>
);

CenteredCard.propTypes = {
    /* React elements to put in the CardContent */
    children: PropTypes.node,
};
