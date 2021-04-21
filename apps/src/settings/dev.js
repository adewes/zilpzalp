import Settings from 'helpers/settings';
import baseSettings from './base';

const settings = new Settings();
settings.update(baseSettings);

export default settings;
