import React from 'react';
import { withActions } from './store';
import { displayName } from 'helpers/hoc';
import SettingsAction from 'actions/settings';
import { SettingsContext } from './contexts';

export function withSettings(Component) {
    class Settings extends React.Component {
        static contextType = SettingsContext;

        render() {
            return <Component {...this.props} settings={this.context} />;
        }
    }

    Settings.displayName = `WithSettings(${displayName(Component)})`;

    return Settings;
}

export const Settings = ({ children, settings }) => (
    <SettingsContext.Provider value={settings}>
        {children}
    </SettingsContext.Provider>
);

class ExtSettings extends React.Component {
    constructor(props) {
        super(props);
        const { settings } = props;
        props.externalSettingsActions.loadSettings(settings);
    }

    componentDidUpdate() {
        const { externalSettings, settings } = this.props;
        if (externalSettings.status !== 'failed') {
            this.props.externalSettingsActions.updateSettings(settings);
        }
    }

    render() {
        const { externalSettings } = this.props;
        if (externalSettings.status !== 'loaded') return <div />;
        return this.props.children;
    }
}

export const ExternalSettings = withActions(
    withSettings(ExtSettings),
    [SettingsAction],
    ['externalSettings']
);
