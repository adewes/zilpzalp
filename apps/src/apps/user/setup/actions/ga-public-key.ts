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

export async function gaPublicKey(state, keyStore, settings){
    try {

        // just for testing, normally the GA key gets loaded from the backend
        const gaKey = await e(crypto.subtle.generateKey({
                name: 'ECDH',
                namedCurve: 'P-256',
            }, true, ['deriveKey']))


        const gaPublicKeyData = await e(crypto.subtle.exportKey('raw', gaKey.publicKey))


        return {data: buf2hex(gaPublicKeyData)}

    } catch (e) {
        return {error: e.toString()}
    }
   }
