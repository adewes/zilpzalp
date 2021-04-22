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
