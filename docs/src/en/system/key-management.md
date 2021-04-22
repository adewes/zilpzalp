# Key Management

Zilp-Zalp uses a public key infrastructure (PKI) to encrypt data, authenticate actors to the backend, and sign requests that are published.

As with all systems, the security of the overall system depends crucially on the security of this PKI. Zilp-Zalp is designed to work with existing PKI systems. For demonstration purposes, the system also has its own PKI, but this should be replaced if possible in a real deployment of the system.

## Basic ideas

Health authorities, backend operators and, where applicable, operators of localities each have individual asymmetric key pairs for encrypting/decrypting and signing data. In addition, one or more root key pairs exist with which other keys in the system are certified and which serve as trust anchors in the backend and the web applications.
In order to make the overall system as robust as possible against the loss of keys, the following measures should be observed:

* The applicability and power of individual keys should be limited in space and time.
* Private keys should only be generated on site and not "moved".

## Necessary keys

Zilp-Zalp requires the following key pairs during operation:

* For each backend instance, one or more root signature key pairs that certify other keys in the system and serve as trust anchors.
* For each health department, one or more key pairs, each for encrypting/decrypting data and for signing data.
* Optional for operators one or more key pairs for signing data.

Root keys are 

## Risk analysis

The following sections describe risks that arise from the loss of private keys in the system.

### Loss of a private GÄ data key

If an attacker gains access to a private GÄ data key, he can use it to decrypt the visit data encrypted with the corresponding public key as well as to remove the external decryption of a user's contact data encrypted with the public key.
If he gains access to visit data of operators, he can use it to reconstruct the visit history of users.
If he also gains access to the contact data stored in the backend for this visit data, he can also decrypt it completely (since the key $K _ B$ is in the visit data).

### Loss of a private GÄ signing key

If an attacker gains access to a private GÄ signing key, he can use it to authenticate himself to the backend, retrieve data from there and make abusive requests. However, he cannot retrieve contact data from the backend without knowledge of $I _ D$ values. To obtain such $I _ D$ values, he can make requests for visit data. However, this also requires the presence of a GA data packet (under user control). To decrypt this, the attacker must also possess the associated private GA data key.

### Loss of a private root signing key

If an attacker gains access to a private root signing key, he can register his own key pairs in the system and make them appear trustworthy to all actors. He can thus, for example, cause actors to encrypt data with these keys and store it in the system.

### Compromise of system components

In both of the above scenarios, it is assumed that the attacker has only gained access to key material, but has not compromised any system components apart from this. These scenarios are described in more detail in the [risk analysis]({{'analyses.risks'|href}}) and are therefore left out here.
