import React from "react";
import ReactDOM from "react-dom";
import App from "main/app";
import {
    Store,
    Router,
    MainErrorBoundary,
    Settings,
    ExternalSettings
} from "components";

import "scss/main.scss";

const appElement = document.getElementById("app");

export const render = settings => {
    // Set the lang attribute on <html> for accessibility
    document.documentElement.setAttribute("lang", settings.lang());
    settings.get("router").init(settings.get("routes"));
    ReactDOM.render(
        <Settings settings={settings}>
            <Router router={settings.get("router")}>
                <MainErrorBoundary>
                    <Store store={settings.get("store")}>
                        <ExternalSettings>
                            <App menu={settings.get("menu")} />
                        </ExternalSettings>
                    </Store>
                </MainErrorBoundary>
            </Router>
        </Settings>,
        appElement
    );
};
