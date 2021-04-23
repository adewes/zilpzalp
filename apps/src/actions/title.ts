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

import Base from "./base";

export default class Title extends Base {
    static get defaultKey() {
        return "title";
    }

    setTitle(title: string) {
        const oldTitle = this.get();
        if (title instanceof Array)
            title = title.join(" ")
        if (!(typeof title === 'string') && !(title instanceof String)){
            return
        }
        if (oldTitle === title) return;
        this.set(title);
        document.title = `${title} · Zilp-Zalp`;
    }
}
