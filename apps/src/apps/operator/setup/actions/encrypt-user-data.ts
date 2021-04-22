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
