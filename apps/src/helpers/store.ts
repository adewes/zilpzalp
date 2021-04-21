type Watcher = (store: Store, key: string, value: any) => void;

/*
This function deep-copies objects and ensures only valid object types are store
in our store (maps, array, objects, numbers, strings). It can handle self-referencing,
circular data structures as well.
*/
export function copy(value, memo) {
    memo = memo || new Map()
    if (memo.has(value))
        return memo.get(value)
    let newValue = value;
    if (value instanceof Array){
        newValue = []
        memo.set(value, newValue)
        for(const v of value){
            newValue.push(copy(v, memo))
        }
    } else if (value instanceof Map){
        newValue = new Map()
        memo.set(value, newValue)
        for(const [k, v] of value.entries()){
            newValue.set(copy(k, memo), copy(v, memo))
        }
    } else if (value instanceof Set){
        newValue = new Set()
        memo.set(value, newValue)
        for(const [_, v] of value.entries())
            newValue.add(copy(v, memo))
    } else if (value instanceof Object){
        newValue = {}
        memo.set(value, newValue)
        for(const [k, v] of Object.entries(value)){
            newValue[k] = copy(v, memo)
        }
    } else if (
        typeof value !== "string" &&
        typeof value !== "number" &&
        typeof value !== "boolean" &&
        !isNaN(value) &&
        value !== undefined &&
        value !== null &&
        !(value instanceof String)
    )
        throw new Error("unserializable object type: " + typeof value);
    return newValue;
}

export default class Store {
    private watchers: Map<string, Map<number, Watcher>>;
    private watcherId: number;
    private state: Record<string, any>;

    constructor() {
        this.watchers = new Map([]);
        this.watcherId = 0;
        this.notifyId = 0;
        this.state = {};
    }

    public set(key: string, value: any, overwrite?: boolean) {
        value = copy(value);
        if (key === "") {
            Object.keys(value).forEach(key => {
                this.state[key] = value[key];
            });
        } else if (overwrite === true) {
            this.state[key] = value;
        } else {
            if (this.state[key] === undefined) this.state[key] = {};
            Object.keys(value).forEach(valueKey => {
                this.state[key][valueKey] = value[valueKey];
            });
        }
        this.notify(key, copy(this.state[key]));
        this.notify("", copy(this.state));
    }

    public get(key?: string) {
        if (key === "" || key === null)
            //we return the whole store
            return copy(this.state);
        return copy(this.state[key]);
    }

    public watch(key: string, watcher: Watcher) {
        if (!this.watchers.has(key)) this.watchers.set(key, new Map([]));
        this.watchers.get(key).set(this.watcherId, watcher);
        return this.watcherId++;
    }

    public unwatch(key: string, watcherId: number) {
        if (!this.watchers.has(key) || !this.watchers.get(key).has(watcherId))
            throw new Error("unknown key");
        this.watchers.get(key).delete(watcherId);
    }

    private notify(key: string, value: any) {
        const notifyId = this.notifyId++;
        const watchers = this.watchers.get(key);
        if (watchers === undefined) return;
        watchers.forEach(watcher => {
            watcher(this, key, value, notifyId);
        });
    }
}

export class LocalStorageStore extends Store {
    constructor() {
        super();
    }
}
