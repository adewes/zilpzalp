// ignore-translations
import React from 'react';
import PropTypes from 'prop-types';
import { withSettings } from './settings';

// eslint-disable-next-line no-unused-vars
const TBase = ({ t, k, safe, settings, ...args }) => {
    const tv = settings.t(t, k, args);
    if (safe)
        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: tv instanceof Array ? tv.join('') : tv,
                }}
            />
        );
    return <React.Fragment>{tv}</React.Fragment>;
};

TBase.propTypes = {
    k: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    safe: PropTypes.bool,
    settings: PropTypes.shape({
        t: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export const T = withSettings(TBase);
