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

type Watcher = (store: Observer, ...rest: any) => void;

export default class Observer {
    watchers: Map<number, Watcher>;
    watcherId: number;
    notifyId: number;

    constructor() {
        this.watchers = new Map([]);
        this.watcherId = 0;
        this.notifyId = 0;
    }

    watch(watcher: Watcher) {
        const id = this.watcherId++;
        this.watchers.set(id, watcher);
        return id;
    }

    unwatch(watcherId: number) {
        if (!this.watchers.has(watcherId))
            throw new Error("watcher does not exist");
        this.watchers.delete(watcherId);
    }

    notify(...args: any[]) {
        const notifyId = this.notifyId++;
        for (const [watcherId, watcher] of this.watchers) {
            // the values might change during iteration, so we check them again...
            if (this.watchers.has(watcherId)) {
                const result = watcher(this, ...args, notifyId);
                if (result !== undefined) return result;
            }
        }
    }
}
