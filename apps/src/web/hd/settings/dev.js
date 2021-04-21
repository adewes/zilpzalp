import Settings from "helpers/settings";

import baseSettings from "./base";
import genericSettings from "settings/dev";
import hdSettings from "apps/hd/settings/dev";

const settings = new Settings();

settings.update(genericSettings);
settings.update(baseSettings);
settings.update(hdSettings);

export default settings;
