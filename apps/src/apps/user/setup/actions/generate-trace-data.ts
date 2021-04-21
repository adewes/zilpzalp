import Base from "actions/base";
import { e, hex2buf, buf2hex, str2ab } from "./utils";

export async function generateTraceData(state, keyStore, settings, traces){
    try {

        const encryptedTraces = []

        for(let trace of traces){
            const gaKey = await e(crypto.subtle.generateKey({
                    name: 'ECDH',
                    namedCurve: 'P-384',
                }, false, ['deriveKey']))

            const userKey = await e(crypto.subtle.generateKey({
                    name: 'ECDH',
                    namedCurve: 'P-384',
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
                    iv: iv,
                }, key, str2ab(trace)));

            const publicUserKey = await e(crypto.subtle.exportKey('raw', userKey.publicKey))

            const importedUserKey = await e(crypto.subtle.importKey('raw', publicUserKey, {name: 'ECDH', namedCurve: 'P-384'}, true, []))

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
            })
        }

        return {encryptedTraces: encryptedTraces}

    } catch (e) {
        return {error: e.toString()}
    }
   }
