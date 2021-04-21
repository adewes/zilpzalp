import React from 'react';
import { displayName } from 'helpers/hoc';
import { RouterContext } from './contexts';

export function withRoute(Component) {
    class WithRoute extends React.Component {
        constructor(props, context) {
            super(props, context);
            const router = context;
            //we watch route changes
            this.state = {
                route: router.currentResult,
            };
            this.lastNotifyId = 0;
            this.mounted = false;
            this.watch();
        }

        static contextType = RouterContext;

        watch() {
            const router = this.context;
            this.watcherId = router.watch((...args) =>
                this.updateRoute(...args)
            );
        }

        componentDidMount() {
            this.mounted = true;
            if (this._state !== undefined) {
                this.setState(this._state);
                delete this._state;
            }
        }

        componentWillUnmount() {
            this.context.unwatch(this.watcherId);
            this.mounted = false;
        }

        updateRoute(router, type, route, notifyId) {
            if (type === 'route') {
                // we do not process route updates that have been obsoleted...
                if (notifyId < this.lastNotifyId) return;
                this.lastNotifyId = notifyId;
                if (this.mounted) this.setState({ route: route });
                else this._state = { route: route };
            }
        }

        render() {
            return (
                <Component
                    {...this.props}
                    _original={this.props}
                    route={(this._state || this.state).route}
                    router={this.context}
                />
            );
        }
    }

    WithRoute.displayName = `WithRoute(${displayName(Component)})`;

    return WithRoute;
}

export function withRouter(Component) {
    class WithRouter extends React.Component {
        static contextType = RouterContext;

        render() {
            return (
                <Component
                    {...this.props}
                    _original={this.props}
                    router={this.context}
                />
            );
        }
    }

    WithRouter.displayName = `WithRouter(${displayName(Component)})`;

    return WithRouter;
}

export const Router = ({ children, router }) => (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
);
