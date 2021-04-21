import Settings from "helpers/settings";
import baseSettings from "./base";
import genericSettings from "settings/prod";
import hdSettings from "apps/user/settings/prod";

const settings = new Settings();

settings.update(genericSettings);
settings.update(baseSettings);
settings.update(hdSettings);

export default settings;
