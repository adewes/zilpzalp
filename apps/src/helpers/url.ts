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

export function parseQuery(qstr: string) {
    const query: Record<string, any> = {};
    const a = (qstr[0] === "?" ? qstr.substr(1) : qstr).split("&");
    for (let i = 0; i < a.length; i++) {
        const b = a[i].split("=");
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || "");
    }
    return query;
}

export function encodeQueryData(data: Record<string, any>) {
    const ret = [];
    for (const d in data)
        ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
    return ret.join("&");
}
