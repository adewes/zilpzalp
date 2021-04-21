import React, { ReactChild } from 'react';
import PropTypes from 'prop-types';
import { ButtonIcon } from './button';
import classnames from 'helpers/classnames';
import './message.scss';

type MessageProps = {
    children: ReactChild;
    type: string;
};

export const Message = ({
    children,
    className,
    waiting,
    type,
}: MessageProps) => (
    <div className={classnames(className, 'bulma-message', `bulma-is-${type}`)}>
        <div className="bulma-message-body">
            {waiting && (
                <React.Fragment>
                    <ButtonIcon icon="circle-notch fa-spin" />
                    &nbsp;
                </React.Fragment>
            )}
            {children}
        </div>
    </div>
);

Message.propTypes = {
    children: PropTypes.node.isRequired,
    waiting: PropTypes.bool,
    type: PropTypes.oneOf(['info', 'success', 'danger', 'primary', 'warning']),
};
