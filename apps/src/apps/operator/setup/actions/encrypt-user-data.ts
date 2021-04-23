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

import Base from "actions/base";
import { hex2buf, buf2hex, str2ab } from "./utils";

export async function encryptUserData(state, keyStore, settings, key, data){
    try {
        const kcBytes = hex2buf(key)

        const iv = window.crypto.getRandomValues(new Uint8Array(12));

        // we generate the base key
        const kc = await crypto.subtle.importKey('raw', kcBytes, 'AES-GCM', false, ['encrypt', 'decrypt']).catch(e => {throw e})

        const ed = await crypto.subtle.encrypt({
            name: 'AES-GCM',
            iv: iv,
        }, kc, str2ab(data));

        return {ed: buf2hex(ed), iv: buf2hex(iv)}

    } catch (e) {
        return {error: e.toString()}
    }
   }
