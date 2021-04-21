import Observer from './observer';

export class History extends Observer {}

export class BrowserHistory extends History {
    constructor() {
        super();
        this.lastUrl = this.currentUrl;
        this.lastState = null;
        this.lastTitle = document.title;
        window.onpopstate = event => {
            const result = this.notify(
                this.currentUrl,
                document.title,
                event.state,
                true
            );
            if (result !== undefined) {
                // a watcher does not want us to the pop the state, we revert the action
                history.pushState(this.lastState, this.lastTitle, this.lastUrl);
            }
        };
    }

    get currentUrl() {
        return location.pathname + location.search + location.hash;
    }

    replaceUrl(url, title, state) {
        this.lastUrl = url;
        this.lastState = state;
        this.lastTitle = title;
        history.replaceState(state, title, url);
        this.notify(this.currentUrl, title, state, false);
    }

    pushUrl(url, title, state) {
        if (
            url === this.currentUrl &&
            state === undefined &&
            this.lastState === undefined
        )
            return;
        history.pushState(state, title, url);
        this.lastUrl = url;
        this.lastState = state;
        this.lastTitle = title;
        this.notify(this.currentUrl, title, state, false);
    }
}

export class ElectronHistory extends History {
    constructor() {
        super();
        this.history = [];
        this._currentUrl = '/';
    }

    get currentUrl() {
        return this._currentUrl;
    }

    replaceUrl(url, title, state) {
        if (this.currentUrl === url) return;
        this.history.push({ url: url, title: title, state: state });
        this._currentUrl = url;
        this.notify(this.currentUrl, title, state);
    }

    pushUrl(url, title, state) {
        if (this.currentUrl === url) return;
        this._currentUrl = url;
        this.notify(this.currentUrl, title, state);
    }
}

export class Router extends Observer {
    constructor(history) {
        super();
        this.routesByName = {};
        this.history = history;
        this.lastNotifyId = 0;
    }

    /**
     * @param query {string}
     */
    static parseParameters(query) {
        const result = {};
        query.split('&').forEach(function(part) {
            const separatorIndex = part.indexOf('=');
            let key, value;
            if (separatorIndex === -1) {
                key = part;
            } else {
                key = part.substring(0, separatorIndex);
                value = decodeURIComponent(part.substring(separatorIndex + 1));
            }
            if (key || value) {
                result[key] = value;
            }
        });
        return result;
    }

    /**
     * @param url {string}
     */
    static extractPathAndParams(url) {
        let indexOfHash = url.indexOf('#');
        if (indexOfHash === -1) indexOfHash = url.length;
        const beforeHash = url.substring(0, indexOfHash);
        let indexOfQuery = beforeHash.indexOf('?') || beforeHash.length;
        if (indexOfQuery === -1) indexOfQuery = url.length;

        const path = beforeHash.substring(0, indexOfQuery);
        const query = beforeHash.substring(indexOfQuery + 1, indexOfHash);
        const params = Router.parseParameters(query);
        const hash = url.substring(indexOfHash + 1);
        const hashParams = Router.parseParameters(hash);
        return [path, query, params, hashParams];
    }

    /**
     * @param url {string}
     */
    handle = (url, state) => {
        const [path, query, params, hashParams] = Router.extractPathAndParams(
            url
        );
        let matchingRoute;
        let defaultRoute;
        let found = false;
        for (const [, route] of this.routes) {
            if (route.url === undefined) {
                //this is the default handler
                defaultRoute = route;
            }
            const regex = new RegExp(`^${route.url}$`);
            const result = regex.exec(path);
            if (result !== null) {
                matchingRoute = route.handler.bind(this)(
                    ...result.slice(1),
                    params,
                    path,
                    query
                );
                found = true;
                break;
            }
        }

        if (!found) {
            matchingRoute = defaultRoute.handler.bind(this)(params, path);
        }

        if (matchingRoute !== undefined) {
            this.currentResult = {
                handler: matchingRoute,
                params: params,
                hashParams: hashParams,
                path: path,
                state: state,
                url: url,
            };
            return Object.assign({}, this.currentResult);
        }

        return undefined;
    };

    /**
     * @param history {History}
     * @param url {string}
     */
    update = (history, url, title, state, pop, notifyId) => {
        if (notifyId < this.lastNotifyId) return;
        const watchResult = this.notify('update', url, title, state);
        if (watchResult !== undefined)
            // blocked
            return watchResult;
        this.lastNotifyId = notifyId;
        const result = this.handle(url, state);
        result.pop = pop;
        if (result !== undefined) this.notify('route', result);
    };

    init = routes => {
        this.routes = routes;
        this.history.watch(this.update);
        this.update(this.history, this.history.currentUrl);
    };

    /**
     * @param url {string}
     */
    replaceUrl = url => {
        const result = this.notify('replace', url);
        if (result !== undefined)
            // blocked
            return;
        this.history.replaceUrl(url, '', {});
    };

    /**
     * @param url {string}
     */
    navigateToUrl = (url, state) => {
        const result = this.notify('navigate', url, state);
        if (result !== undefined) {
            return;
        }
        this.history.pushUrl(url, '', state);
    };

    navigateToState = state => {
        const result = this.notify('navigate', this.history.currentUrl, state);
        if (result !== undefined) {
            return;
        }
        this.history.pushUrl(this.history.currentUrl, '', state);
    };
}
