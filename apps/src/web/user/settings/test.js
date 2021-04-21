import baseSettings from "./base";
import genericSettings from "settings/test";
import hdSettings from "apps/user/settings/test";
import Settings from "helpers/settings";

const settings = new Settings();

settings.update(genericSettings);
settings.update(baseSettings);
settings.update(hdSettings);

export default settings;
