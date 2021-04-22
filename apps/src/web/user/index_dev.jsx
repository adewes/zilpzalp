/* eslint-env node */
import { render } from "./index_common";
import settings from "web/user/settings/dev";

render(settings);

if (module.hot) {
    module.hot.accept(() => {
        render(settings);
    });
}
