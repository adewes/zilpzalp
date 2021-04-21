/* global COMMIT_SHA */
//our own styles

import Settings from 'helpers/settings';
import logo from 'assets/images/zilpzalp-1.png';
import smallLogo from 'assets/images/zilpzalp-1.png';
import whiteLogo from 'assets/images/zilpzalp-1.png';
import smallWhiteLogo from 'assets/images/zilpzalp-1.png';
import routes from 'routes';

const settings = new Settings([
    ['title', 'Zilp-Zalp'],
    ['logo', logo],
    ['smallLogo', smallLogo],
    ['whiteLogo', whiteLogo],
    ['smallWhiteLogo', smallWhiteLogo],
    ['apps', new Map([])],
    ['menu', new Map([])],
    ['routes', routes],
    ['lang', 'en'],
    ['showTitles', true],
    ['commitSHA', COMMIT_SHA],
]);

export default settings;
