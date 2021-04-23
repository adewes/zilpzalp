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

import Settings from "./settings";

export function isEmpty(value: string): bool {
    return value === undefined || value === null || value === "";
}

export default class Form {
    data: Record<string, any>;
    settings: Settings;
    _errors: Record<string, any>;

    constructor(
        data: Record<string, any>,
        settings: Settings,
        error: Record<string, any>
    ) {
        this.data = data || {};
        this.settings = settings;
        this._errors = this.validate();
        this._valid = Object.keys(this._errors).length === 0;
        if (error !== undefined) {
            this._errorMessage = error.message;
            for (const [k, v] of Object.entries(error.errors || {})) {
                this._errors[k] = v;
            }
        }
    }

    get errors() {
        return this._errors;
    }

    get valid() {
        return this._valid;
    }

    get errorMessage() {
        return this._errorMessage;
    }

    get error() {
        return {
            message: this.errorMessage,
            errors: this.errors
        };
    }

    validate(): Record<string, string> {
        return {};
    }
}
