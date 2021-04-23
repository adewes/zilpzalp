# Analysis & comparison with Luca

In this document we analyze the [Luca](https://www.luca-app.de) system and compare the decisions made there with those we made when designing the Zilp-Zalp protocol.

## Comparison

In our view, Zilp-Zalp offers the following advantages over Luca:

* Unlike Luca, no single actor can decrypt a user's contact information or reveal a user's visit history through technical manipulation of system components alone.
* Contact and visit data of users can only be decrypted for epidemiologically relevant infection communities with the active participation of a user concerned. The purpose limitation of the data can therefore, in contrast to other systems, be fully guaranteed by technical and organisational measures.
* Since each user has a large number of QR codes and these can only be linked to each other with the help of a secret key in the possession of the user and the GÄ key, it is almost impossible for an attacker to correlate the visit data of individual users with each other, e.g. to create visit histories.
* Loss of visit data from one operator or even conspiratorial misuse of the system by different operators does not result in loss of personal data or disclosure of visit histories of individual users.
* Compromising the backend only makes a few, relatively uncritical meta data accessible to an attacker. The backend only stores encrypted contact data and IDs, but not complete visit histories like the Luca backend, for example.
* The data storage in the backend as well as the communication effort is very low, data is only exchanged between the backend and other actors in the case of contact follow-up and initialization. The documentation of visits takes place decentrally and without communication with the backend, so no meta data is generated for visits.
* Abusive querying of large amounts of data is easy to detect. Since all queries are made available via a public interface, it is externally visible how much data is queried by health authorities.
* Documenting a visit does not require a user to interact with a web app or smartphone. Operators can also capture visits asynchronously and tag them with additional metadata. The effort required to scan QR codes is low, and the retention of the codes by operators provides an additional backup to the digital data and can also serve them as proof of compliance with their documentation obligations.
* QR codes do not have to be obtained in the form of key tags but can be created and printed out decentrally by users themselves. Operators or other actors can theoretically also issue prefabricated QR code series to users, which they then link to their data themselves as part of the protocol extension below. In other constellations, pseudonymous QR codes can be issued to enable contact tracing with the participation of a neutral third party.
* Backends can be federated and operated cooperatively, and web applications can be deployed and customized regionally. Central data storage is not necessary.
* The documentation of visits is technically possible without any problems even for very large events without internet connectivity (e.g. concerts).
* Operators are not dependent on a permanent internet connection, they can collect visit data asynchronously and process it e.g. daily. This makes Zilp-Zalp also usable for localities and events that are located away from a functional internet infrastructure.
* Zilp-Zalp is the only system that can guarantee the creation of valid contact data through optional validation with the help of trusted third parties.
* Zilp-Zalp is licensed as open source software and can be easily operated.
* Zilp-Zalp is not profit-oriented and shall not be operated privately, a further use for commercial purposes is not planned.

## Vulnerability Analysis

In the following sections, we describe some weaknesses of the Luca system design and compare them to the Zilp-Zalp design. This is not a conclusive assessment of the security of the Luca system. Rather, a number of external analyses^1 already exist, and this list is only supplementary.

### Scenario: compromise of the system operator

If an attacker succeeds in compromising the Luca infrastructure (backend, apps), or if the operator of Luca modifies the system himself, he can easily extract all user data:

* The Luca app can access all of a user's **secret** keys at any time, in particular the **data secret** and the **tracing secret**. This information is combined in a so-called "Guest Data Transfer Object" when transferring user data for health authorities, among other things.
* By modifying the app code, the Luca operator or an attacker can cause it to transmit the **data secret** and the **tracing secret to** the backend without user interaction. With this, he can decrypt the user's contact data stored on the backend and reconstruct the user's visit history.

Thus, in our view, the design of the system does not conform to the common concept of end-to-end encryption, at least if one of the ends is seen as being with the user and the other with the health authorities. A true end-to-end encryption would view the Luca operator as an intermediary that is not particularly trusted in the system. Even if this intermediary is completely compromised, it should not be possible for it to decrypt sensitive user data.

The risk of compromising the system operator is not inevitable and can be mitigated by various measures:

* Secret keys should not be kept in the user app. Instead, the app should create the data to be derived from the secret keys once during initialization and then destroy them. However, the Luca protocol is not designed for this and would have to be significantly modified to support such a procedure.
* System components such as smartphone apps and web applications should not be under the control of a single actor.
* If the continuous use of secret keys is unavoidable in the context of an app, it should be examined whether platform-specific means such as secure enclaves can be used to protect these keys from extraction.
* Visit histories should not be stored centrally in a backend.
* User data should not only be protected with a symmetric key.

## External analyses

We are aware of the following external analyses of the Luca system:

[^1] : [Preliminary Analysis of Potential Harms in the Luca TracingSystem - Theresa Stadler et. al](https://arxiv.org/pdf/2103.11958.pdf).</md-list>

