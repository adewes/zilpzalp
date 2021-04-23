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

import { NotFound } from "components";
import t from "./translations.yml";

// Routes are matched in order, so be sure to put a specific route like
// /actions/new before /actions/(${id}) which would match "new" as well.
const routes = new Map([
/*    [
        "appSelector",
        {
            url: "/?",
            handler: () => ({
                t: t,
                title: "appSelector",
                component: AppSelector,
                isSimple: true
            })
        }
    ],*/
    [
        "notFound",
        {
            handler: () => ({
                t: t,
                title: "notFound",
                component: NotFound,
                isSimple: true
            })
        }
    ]
]);

export default routes;
