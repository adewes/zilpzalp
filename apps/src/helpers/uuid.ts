/**
 * Creates a v4 UUIDs. Variant 4 generates a random UUID without a seed.
 */
export const uuidv4 = (): string => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
};
