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
import { withRouter } from './router';

class ABase extends React.Component {
    get href() {
        const { href, params } = this.props;
        return params !== undefined && Object.keys(params).length > 0
            ? `${href}?${this._encode(params)}`
            : href;
    }

    handleClick = event => {
        const { external } = this.props;
        if (this.props._original.onClick !== undefined) {
            this.props._original.onClick(event);
        }
        if (event.defaultPrevented) return;
        if (external) return;
        event.preventDefault();
        if (this.href !== undefined && this.props.router !== undefined)
            this.props.router.navigateToUrl(this.href);
    };

    _encode(params) {
        const mappedParams = [];
        for (const [key, value] of Object.entries(params)) {
            mappedParams.push(
                encodeURIComponent(key) + '=' + encodeURIComponent(value)
            );
        }
        return mappedParams.join('&');
    }

    render() {
        // we just extract variables that we don't want to pass on
        const {
            onClick: _onClick,
            href: _href,
            external: _external,
            params: _params,
            hashParams: _hashParams,
            router: _router,
            _original,
            ...rest
        } = this.props;
        return <a {...rest} onClick={this.handleClick} href={this.href} />;
    }
}

ABase.propTypes = {
    _original: PropTypes.shape({
        onClick: PropTypes.func,
    }).isRequired,
    children: PropTypes.node.isRequired,
    href: PropTypes.string,
    external: PropTypes.bool,
    params: PropTypes.object,
    router: PropTypes.shape({
        navigateToUrl: PropTypes.func.isRequired,
    }),
};

export const A = withRouter(ABase);
