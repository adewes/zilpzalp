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
