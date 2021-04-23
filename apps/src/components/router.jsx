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
