# APIs

Zilp-Zalp offers basically two APIs to manage data in the system:

* A **backend API** that stores contact information and (optionally) encrypted user preferences, publishes hashes, and accepts visit data.
* An **operator API** that stores visit data and (optionally) encrypted operator settings.

Both APIs provide a JSON-RPC interface.

## Backend API

### Unauthenticated endpoints

These endpoints are intended for users and operator servers.

* `getOpenHashes() -> (enum <OK, ERR>, {OK: {hashes: list<bytes<16>>, salt: bytes<16>}, ERR: Error})` : Allows the retrieval of all currently written out hashes.
* `getAllHashes() -> (enum <OK, ERR>, {OK: {hashes: list<bytes<16>>, salt: bytes<16>}, ERR: Error})` : Allows retrieval of all hashes ever written out.
* `storeTraces(traces list <RelatedTraces>) -> enum <OK, ERR>` : Allows the submission of visit data relevant to advertised hashes by an operator.
* `storeEncryptedContactData(id bytes<16>, data EncryptedContactData) -> enum <OK, ERR>` : Allows encrypted contact data to be stored as part of the initialization process.
* `storeEncryptedSettings(id bytes<16>, data bytes<1,8192>) -> enum <OK, ERR>` : Allows encrypted user settings to be saved as part of the initialization process.
* `getEncryptedSettings(id bytes<16>) -> (enum <OK, ERR>, {OK: bytes<1,8192>, ERR: Error})` : Allows retrieval of encrypted user settings.

### Authenticated endpoints

These endpoints are intended for health departments that authenticate by signing requests.

* `publishHashes(hashes list <bytes<16>>, signature Signature) -> enum <OK, ERR>` : Allows hashes to be written out by health departments.
* `getTraces(hashes list <string>, signature Signature) -> (enum <OK, ERR>, {OK: list<Trace>, ERR: Error})` : Allows the requesting health department to query returned visit data.
* `getEncryptedContactData(id bytes<16>, signature Signature) -> (enum <OK, ERR>, {OK: EncryptedContactData, ERR: Error})` : Allows health departments to retrieve encrypted contact information.

#### Safety aspects

Hashes to be written out are first hashed with a salt value before publication. This is also supplied with the publication; operator servers must also hash existing hash values with this salt for comparison. They have to answer queries with unhashed hashes, which prevents masses of invalid visit data from being submitted by operator servers via the "preimage resistance" property of the hash.

## Operator API

In the default configuration, the operator API does not authenticate requests and is publicly accessible (however, this can be customized by the operator).

* `storeTraces(traces list <Trace>) -> enum <OK, ERR>` : Allows the storage of visit data by an operator.
* `storeEncryptedSettings(id bytes<16>, data bytes<1,8192>) -> enum <OK, ERR>` : Allows encrypted user settings to be saved as part of the initialization process.
* `getEncryptedSettings(id bytes<16>) -> (enum <OK, ERR>, {OK: bytes<1,8192>, ERR: Error})` : Allows retrieval of encrypted operator settings.

#### Safety aspects

The operator API has no authentication in the default configuration and also cannot assign stored data to a specific operator. It must therefore be robust against the mass submission of invalid visit data (since there is no way to verify the authenticity of this visit data). This can be achieved, if necessary, by rate limiting, data length restrictions and efficient storage.

If, despite these countermeasures, misuse of the API cannot be controlled, an optional authentication of requests via a second factor, for example a token or an HMAC signature formed from it, can be used (but these must then be distributed to operators).

#### Fulfilment of obligations to provide evidence

 $G _ j$ Optionally, the operator API can also provide an
endpoint that returns $M _ j$ metadata for a given group identifier. Operator applications can use this endpoint to prove that they have documented visits correctly. Other mechanisms can be envisioned for this, such as returning signed confirmations through the operator API. However, as in any contact tracking system, no final guarantee can be given for the correct and complete use of the system.
