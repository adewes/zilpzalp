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
import { buf2hex, str2ab } from "./utils";

export async function ks(state, keyStore, settings){
    try {
        const kabBytes = new Uint8Array(64)
        crypto.getRandomValues(kabBytes)

        // we generate the base key
        const kcBase = await crypto.subtle.importKey('raw', kabBytes, 'HKDF', false, ['deriveKey']).catch(e => {throw e})

        const kc = await crypto.subtle.deriveKey(
        {
            name: 'HKDF',
            hash: 'SHA-256',
            salt: str2ab('0v7vJAwqAbFAeK7VwfMRV9so5kZlK6QF62q6b4fG'), // this is public information
            info: str2ab(`1`), // we use a number string here for simplicity
        }, kcBase, {
            name: 'AES-GCM',
            length: 256,
        }, true, ['encrypt', 'decrypt']).catch(e => {throw e})

        const kcBytes = await crypto.subtle.exportKey('raw', kc).catch(e => {throw e})

        return {ka: buf2hex(kabBytes.slice(0,32)), kb: buf2hex(kabBytes.slice(32,64)), kc: buf2hex(kcBytes)}        

    } catch (e) {
        return {error: e.toString()}
    }
   }
