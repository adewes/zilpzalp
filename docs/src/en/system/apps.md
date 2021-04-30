# Applications

Zilp-Zalp provides various applications for users, operators of localities and health authorities, which are described here.

## User application

Users only need to generate initial QR codes, for this they can use a web application. This application creates the key material for users and provides them with their secret data. The application does not store any long-lived data and is only used for initialization and possibly for one-time transmission of data to a health department, accordingly it can be implemented as a web application.

## Operator application

Operators must collect data about their locality(ies), scan QR codes from users, and add metadata if necessary. The application encrypts visit data using the mechanism described in the protocol and stores the encrypted data on one or more operator servers.

## Health Department Application

Health departments process highly sensitive data with Zilp-Zalp and must also manage security-critical key pairs.
Accordingly, the use of a pure web application is not recommended here, since data and keys would have to be stored there in the browser.
Therefore, a locally deployable server can optionally be used for this purpose, which stores private keys and handles the data processing.

Alternatively, Zilp-Zalp can be connected to health authorities via a provider-independent gateway.
