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

import Settings from "helpers/settings";
import t from "./translations.yml";

function hash(str) {
    let hash = 0,
        i,
        chr;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

interface RequestOptions {
    data?: any;
    headers?: Record<string, string>;
    json?: Record<string, any>;
    auth: bool;
    method: string;
    params?: any;
    url: string;
}

function urlEncode(data: Record<string, string>): string;
function urlEncode(data: any): null;
function urlEncode(data: any) {
    if (data && typeof data === "object") {
        return Object.keys(data)
            .map(
                key =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(data[key])
            )
            .join("&");
    }
    return null;
}

export default class BaseApi {
    protected settings: Settings;

    constructor(settings: Settings) {
        this.settings = settings;
    }

    /**
     * The version part of API's Url.
     * Inheriting classes may override this.
     * @example "v1/" or "v2/"
     */
    protected get version() {
        return "v1/";
    }

    /**
     * The storage used for persisting keys, unsaved progress, cached
     * items, etc.
     * We only use session storage by default to avoid and data persistence!
     */
    protected get storage(): Storage {
        return sessionStorage;
    }

    public get keysName(): string {
        return this.settings.get("keys-name", "keys");
    }

    public get keys() {
        return this.storage.getItem(this.keysName);
    }

    public set keys(value) {
        if (value === null || value === undefined)
            this.storage.removeItem(this.keysName);
        else this.storage.setItem(this.keysName, value);
    }

    /**
     * The base part (everything until the version) of the API's Url.
     * Inheriting classes may override this.
     * @example "http://localhost:8000" or "https://api.zilpzalp.eu"
     */
    protected get baseUrl(): string {
        return this.settings.get(["apiUrl"]);
    }

    protected url(url: string): string {
        return `${this.baseUrl}/${this.version}${url}`;
    }

    protected authenticatedRequest(opts: RequestOptions): Promise<any> {
        opts.auth = true;
        return this.request(opts);
    }

    protected request(opts: RequestOptions): Promise<any> {
        const normalize = (data: any) => {
            if (data.errors === undefined) data.errors = {};
            return data;
        };

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const params = urlEncode(opts.params);
            const url = this.url(opts.url);
            xhr.open(opts.method, url + (params !== null ? "?" + params : ""));

            xhr.onload = () => {
                const contentType = (
                    xhr.getResponseHeader("content-type") || ""
                ).trim();
                if (/^application\/json(;.*)?$/i.exec(contentType) === null)
                    reject({
                        status: xhr.status,
                        message: "not a JSON response",
                        errors: {}
                    });
                const data = normalize(JSON.parse(xhr.response));
                data.status = xhr.status;
                // this is a non-cryptogaphic hash, just used to e.g. decide whether we should
                // rerender a given graph...
                data.hash = hash(xhr.response);
                if (xhr.status >= 200 && xhr.status < 300) {
                    // setTimeout( () => resolve(data), 1000); // uncomment to add a delay for debugging
                    resolve(data);
                } else {
                    reject(data);
                }
            };
            xhr.onerror = () => {
                reject({
                    status: xhr.status,
                    message:
                        xhr.statusText || this.settings.t(t, "requestFailed"),
                    errors: {}
                });
            };
            if (opts.headers) {
                Object.entries(opts.headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }
            const data = opts.data;
            const json = opts.json;

            if (data !== undefined) {
                xhr.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded"
                );
                xhr.send(urlEncode(data));
            } else if (json !== undefined) {
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(json));
            } else {
                xhr.send();
            }
        });
    }
}
