export function randomBytes(n) {
    const array = new Uint8Array(n);
    window.crypto.getRandomValues(array);
    return Buffer.from(array).toString('hex');
}
