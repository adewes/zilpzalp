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
import { e, hex2buf, buf2hex, str2ab } from "./utils";

export async function generateTraceData(state, keyStore, settings, data){
    try {

        const encryptedTraces = []

        console.log(data)

        for(let hi of data.his){

            // just for testing, normally the GA key gets loaded from the backend
            const gaKey = await e(crypto.subtle.generateKey({
                    name: 'ECDH',
                    namedCurve: 'P-256',
                }, false, ['deriveKey']))

            const userKey = await e(crypto.subtle.generateKey({
                    name: 'ECDH',
                    namedCurve: 'P-256',
                }, true, ['deriveKey']))

            const key = await e(crypto.subtle.deriveKey({
                    name: 'ECDH',
                    public: gaKey.publicKey,
                }, userKey.privateKey, {
                    name: 'AES-GCM',
                    length: 256,
                }, true, ['encrypt', 'decrypt']))

            const iv = window.crypto.getRandomValues(new Uint8Array(12));

            const ed = await e(crypto.subtle.encrypt({
                    name: 'AES-GCM',
                    tagLength: 32, // to do: validate that 32 is acceptable
                    iv: iv,
                }, key, data.traceData));

            const publicUserKey = await e(crypto.subtle.exportKey('raw', userKey.publicKey))

            const importedUserKey = await e(crypto.subtle.importKey('raw', publicUserKey, {name: 'ECDH', namedCurve: 'P-256'}, true, []))

            const reconstructedKey = await e(crypto.subtle.deriveKey({
                    name: 'ECDH',
                    public: importedUserKey,
                }, gaKey.privateKey, {
                    name: 'AES-GCM',
                    length: 256,
                }, true, ['encrypt', 'decrypt']))

            encryptedTraces.push({
                publicKey: buf2hex(publicUserKey),
                data: buf2hex(ed),
                iv: buf2hex(iv),
                hi: hi,
            })
        }

        return {encryptedTraces: encryptedTraces}

    } catch (e) {
        return {error: e.toString()}
    }
   }
