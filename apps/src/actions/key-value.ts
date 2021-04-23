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

import Store from "helpers/store";
import Settings from "helpers/settings";

import Base from "./base";

export default class KeyValue extends Base {
    static get defaultKey(): string {
        return "kv";
    }

    setData(key: string, value: any) {
        const data = this.get();
        data[key] = value;
        this.set(data);
    }

    reset() {
        this.set({});
    }

    constructor(store: Store, settings: Settings, key?: string) {
        super(store, settings, key);
        this.reset();
    }
}
