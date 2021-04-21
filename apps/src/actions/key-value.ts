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
