import Settings from 'helpers/settings';

import baseSettings from './base';
import fixtures from 'test/fixtures';
import apis from 'test/apis';

const settings = new Settings();

settings.update(baseSettings);

settings.update(
    new Settings([
        ['apiFixtures', fixtures],
        ['apis', apis],
    ])
);

export default settings;
