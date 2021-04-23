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

import BaseApi from "apis/base";
import Settings from "helpers/settings";
import Store, { copy } from "helpers/store";

export enum ActionStates {
    undefined = "undefined",
    loading = "loading",
    loaded = "loaded",
    succeeded = "succeeded",
    failed = "failed",
    creating = "creating",
    updating = "updating",
    deleting = "deleting",
    confirming = "confirming"
}

/**
 * A class that all actions inherit from. It handles store and settings access.
 * Replacing it would allow for other storage options to be used.
 */
export default class Base {
    private store: Store;

    protected key: string;
    protected settings: Settings;
    protected requests: Record<string, any>;

    ActionStates = ActionStates;

    /**
     * The default key an action will access. If multiple actions use the same
     * key, they also share the data available to them. This method is expected
     * to be overwritten in classes that inherit from this class.
     */
    static get defaultKey(): string {
        throw new Error(
            "No defaultKey defined for this action. Add one to your class."
        );
    }

    /**
     * @param store {Store} The common place to get and set values. "Persistent"
     * functions will use localstorage instead.
     * @param key {string} Using the same key will result in the same storage
     * being accessed and written to.
     */
    constructor(store: Store, settings: Settings, key?: string) {
        if (!(store instanceof Store))
            throw new Error("store (1st parameter) must be a Store");
        if (!(settings instanceof Settings))
            throw new Error("settings (2nd parameter) must be a Setting");
        this.settings = settings;
        this.store = store;
        this.promises = {};
        this.key = key || this.defaultKey;
    }

    get persistentStore() {
        return localStorage;
    }

    /**
     * In contrast to `get` which reads from volatile memory of one browser tab,
     * this method reads from a persistent store that may survive multiple
     * sessions.
     */
    protected persistentGet() {
        try {
            const value = this.persistentStore.getItem(this.key);
            if (value === null) return {};
            return JSON.parse(value);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
            return {};
        }
    }

    /**
     * In contrast to `set` which reads from volatile memory of one browser tab,
     * this method writes from a persistent store that may survive multiple
     * sessions.
     */
    protected persistentSet(data: Record<string, any>) {
        try {
            this.persistentStore.setItem(this.key, JSON.stringify(data));
            return true;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(e);
            return false;
        }
    }

    /**
     * Like `persistentSet` but applied to the result of `persistentGet`.
     */
    protected persistentUpdate(data: Record<string, any>) {
        this.persistentSet({
            ...this.persistentGet(),
            ...data
        });
    }

    protected get() {
        return this.store.get(this.key);
    }

    protected set(data: any) {
        this.store.set(this.key, data, true);
    }

    protected update(data: any) {
        this.store.set(this.key, data);
    }

    protected updateStatus(
        unconditionalTarget: ActionStates,
        conditionalTargets: Record<ActionStates, ActionStates>,
        set?: boolean
    ) {
        const { status } = this.get();
        const cts = Object.entries(conditionalTargets || {});
        const setStatus = status => {
            if (set) this.set({ status: status });
            else this.update({ status: status });
        };
        // we are in the unconditional status already, so we do nothing
        if (status === unconditionalTarget) return;
        for (const [, v] of cts) {
            // we are in one of the conditional statuses already, so we do nothing
            if (status === v) return;
        }
        for (const [k, v] of cts) {
            // if a conditional target matches, we set the state accordingly
            if (status === k) {
                setStatus(v);
                return;
            }
        }
        // no conditional targets matched
        setStatus(unconditionalTarget);
    }

    protected doOnce(
        name: string,
        dependencies: Array<any>,
        fn: () => Promise<any>,
        forceRedo?: boolean
    ): Promise<any> {
        if (this.promises[name] !== undefined && !forceRedo) {
            const { dependencies: existingDependencies } = this.promises[name];
            // we check if all dependencies match
            if (existingDependencies.length === dependencies.length) {
                let allMatch = true;
                dependencies.forEach((v, i) => {
                    if (v !== existingDependencies[i]) {
                        allMatch = false;
                    }
                });
                // all dependencies matched, we return the cached promise
                if (allMatch) return this.promises[name].promise;
            }
        }
        const promise = fn();
        this.promises[name] = {
            promise: promise,
            dependencies: dependencies
        };
        // we delete the request after it completes
        promise.then(() => delete this.promises[name]);
        promise.catch(() => delete this.promises[name]);
        return promise;
    }

    /**
     * Handles a promise and returns the original promise, allowing others to
     * retrieve the original message or error.
     */
    protected handle(
        promise: Promise<any>,
        onSuccess: (response: Record<string, any>) => void,
        onError: (error: Error) => void
    ): Promise<any> {
        promise.then(onSuccess).catch(onError);
        return promise;
    }

    public copy(a){
        return copy(a)
    }
}

/**
 * A class for actions inherit from with an API loaded.
 * Sub-classes are expected to provide the name of the API to load via an
 * attribute called `objectType`.
 */
export class BaseWithApi extends Base {
    protected api: BaseApi;

    get objectType(): string {
        throw new Error(
            "No objectType defined for this action. Add one to your class."
        );
    }

    get ApiClass(): object | undefined {
        return undefined;
    }

    constructor(store: Store, settings: Settings, key: string) {
        super(store, settings, key);
        const ApiClass = this.ApiClass;
        if (!ApiClass)
            throw new Error(
                `Api "${this.objectType}" is not defined. Check the name for typos or import it at /src/apis/index.`
            );
        this.api = new ApiClass(settings);
        this.set({
            status: "undefined"
        });
    }

    public reset() {
        this.set({
            status: ActionStates.initialized
        });
    }
}
