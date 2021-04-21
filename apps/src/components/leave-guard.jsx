import React from 'react';
import { withRouter } from './router';
import { Modal } from './modal';
import { T } from './t';

import t from './translations.yml';

class BaseLeaveGuard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ask: false,
        };
    }

    updateRoute = (router, type, ...rest) => {
        const { ask, confirmed } = this.state;
        const { saveToLeave } = this.props;
        let url, state;
        if (type === 'update') {
            // this was triggered by a 'back' navigation event
            [url, , state] = rest;
        } else if (type === 'navigate') {
            [url, state] = rest;
        } else {
            return;
        }
        if (confirmed) {
            return undefined;
        }
        if (ask) return true;
        if (!saveToLeave(url, state)) {
            this.setState({ ask: true, url: url, state: state });
            return true;
        }
    };

    onBeforeUnload = e => {
        const { saveToReload } = this.props;
        const { confirmed } = this.state;
        if (!saveToReload() && !confirmed) {
            e.preventDefault();
            e.returnValue = '';
        }
        return false;
    };

    componentDidUpdate() {
        const { router, onLeave } = this.props;
        const { confirmed, url, state } = this.state;
        if (confirmed) {
            router.navigateToUrl(url, state);
            if (onLeave !== undefined) onLeave();
            this.setState({
                ask: undefined,
                confirmed: undefined,
                url: undefined,
                state: undefined,
            });
        }
    }

    componentDidMount() {
        const { router } = this.props;
        this.watcherId = router.watch(this.updateRoute);
        window.addEventListener('beforeunload', this.onBeforeUnload);
    }

    componentWillUnmount() {
        const { router } = this.props;
        router.unwatch(this.watcherId);
        window.removeEventListener('beforeunload', this.onBeforeUnload);
    }

    render() {
        const { children, text } = this.props;
        const { ask } = this.state;
        const stayOnPage = () => this.setState({ ask: false });
        return (
            <React.Fragment>
                {ask && (
                    <Modal
                        onClose={stayOnPage}
                        onCancel={stayOnPage}
                        onSave={() =>
                            this.setState({ ask: false, confirmed: true })
                        }
                        saveType="danger"
                        save={<T t={t} k="leave.leave" />}
                        cancel={<T t={t} k="leave.cancel" />}
                        title={<T t={t} k="leave.title" />}
                    >
                        {text || <T t={t} k="leave.text" />}
                    </Modal>
                )}
                {children}
            </React.Fragment>
        );
    }
}

export const LeaveGuard = withRouter(BaseLeaveGuard);
