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
