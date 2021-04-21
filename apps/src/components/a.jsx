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
