// Zilp-Zalp - Privacy-Friendly Contact Tracing
// Copyright (C) 2021-2021 The Zilp-Zalp Authors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
