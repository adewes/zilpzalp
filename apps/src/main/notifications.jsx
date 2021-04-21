import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'helpers/classnames';
import { withActions } from 'components';
import NotificationsAction, { NotificationType } from 'actions/notification';

import './notifications.scss';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        const { id, timeout, removeNotification } = this.props;

        this.timeout = setTimeout(() => {
            this.ref.current.classList.add('bulma-is-hidden');
            removeNotification(id);
        }, timeout);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    handleHide = () => {
        this.ref.current.classList.add('bulma-is-hidden');
    };

    getTypeClass(type) {
        switch (type) {
            case NotificationType.PRIMARY:
                return 'bulma-is-primary';
            case NotificationType.INFO:
                return 'bulma-is-info';
            case NotificationType.SUCCESS:
                return 'bulma-is-success';
            case NotificationType.WARNING:
                return 'bulma-is-warning';
            case NotificationType.DANGER:
                return 'bulma-is-danger';
            default:
                return undefined;
        }
    }

    render() {
        const { title, text, type } = this.props;

        return (
            <article
                ref={this.ref}
                className={classnames(
                    'bulma-notification',
                    this.getTypeClass(type)
                )}
            >
                <button
                    className="bulma-delete"
                    onClick={this.handleHide}
                ></button>
                <p>
                    <strong>{title}</strong>
                </p>
                <p>{text}</p>
            </article>
        );
    }
}

Notification.propTypes = {
    id: PropTypes.string.isRequired,
    removeNotification: PropTypes.func.isRequired,
    text: PropTypes.string,
    timeout: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
};

class Notifications extends React.Component {
    static propTypes = {
        notification: PropTypes.shape({
            list: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    title: PropTypes.string,
                    text: PropTypes.string,
                    timeout: PropTypes.number,
                    type: PropTypes.string,
                })
            ).isRequired,
        }).isRequired,
        notificationActions: PropTypes.shape({
            removeNotification: PropTypes.func.isRequired,
        }).isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { notification, notificationActions } = this.props;

        const notificationsList = notification.list
            .reverse()
            .map(notification => {
                return (
                    <Notification
                        key={notification.id}
                        id={notification.id}
                        title={notification.title}
                        text={notification.text}
                        timeout={notification.timeout}
                        type={notification.type}
                        removeNotification={
                            notificationActions.removeNotification
                        }
                    />
                );
            });

        return (
            <output className="kip-notifications">{notificationsList}</output>
        );
    }
}

export default withActions(Notifications, [NotificationsAction]);
