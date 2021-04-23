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

import React from "react";
import { Title, T } from "components";
import t from "./translations.yml";

const menu = new Map([
    [
        "hd",
        new Map([
            [
                "dashboard",
                {
                    title: (
                        <Title
                            title={<T t={t} k="drawingBoard" />}
                            icon="chalkboard"
                        />
                    ),
                    route: ""
                }
            ]
        ])
    ],
    ["nav", new Map([])]
]);

export default menu;
