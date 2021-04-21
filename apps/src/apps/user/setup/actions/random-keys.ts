import Base from "actions/base";
import { buf2hex, str2ab } from "./utils";

export async function randomKeys(state, keyStore, settings, n){

    const hsBytes = new Uint8Array(32)

    crypto.getRandomValues(hsBytes)

    const hs = await crypto.subtle.importKey('raw', hsBytes, 'HKDF', false, ['deriveBits']).catch(e => console.log(e))
    const his = []

    for(let i=0;i<n;i++){
        const hi = await crypto.subtle.deriveBits(
        {
            name: 'HKDF',
            hash: 'SHA-256',
            salt: str2ab('0v7vJAwqAbFAeK7VwfMRV9so5kZlK6QF62q6b4fG'), // this is public information
            info: str2ab(`${i}`), // we use a number string here for simplicity
        }, hs, 256).catch(e => console.log(e))
        his.push(buf2hex(hi))
    }

    try {
    return {hs: buf2hex(hsBytes), his: his}        
    } catch(e){
        console.log(e)
    }
}
