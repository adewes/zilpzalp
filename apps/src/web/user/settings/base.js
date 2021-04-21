import { BrowserHistory, Router } from "helpers/routing";
import Store from "helpers/store";
import Settings from "helpers/settings";

const history = new BrowserHistory();
const settings = new Settings([
    ["history", history],
    ["router", new Router(history)],
    ["store", new Store()]
]);

export default settings;
