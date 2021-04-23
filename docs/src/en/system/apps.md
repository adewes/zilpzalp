# Applications

Zilp-Zalp provides various applications for users, operators of localities and health authorities, which are described here.

## User application

Users only need to generate initial QR codes, for this they can use a web application. This application creates the key material for users and provides them with their secret data. The application does not store any long-lived data and is only used for initialization and possibly for one-time transmission of data to a health department, accordingly it can be implemented as a web application.

## Operator application

Operators need to collect data about their locality(ies), scan QR codes from users and add metadata where appropriate. The application stores data over a longer period of time and is used more frequently, so it should not rely solely on web technologies as these cannot guarantee robust long-lived storage. On the other hand, this can make it difficult for operators to use the application easily or, in certain cases, make it impossible to use in general.

For this reason, the operator application is offered in two variants, each of which can store data in the browser or can fall back on an external API for storage, which is deployed locally and uses an SQLite database to store data. The latter variant can be particularly interesting for operators of larger localities, as it enables parallel and simultaneous use of the application. On the other hand, however, there is a higher operator effort.

## Health Department Application

Health departments process highly sensitive data with Zilp-Zalp and must also manage security-critical key pairs.
Accordingly, the use of a pure web application, which would have to store data and keys in the browser, is prohibited here.
Therefore, a locally deployable API with associated web application is also used here, which stores data in an SQLite database and has multi-user capability as well as local authentication.
The API also generates and manages cryptographic keys.
This prevents easy extraction of keys in case of compromise of the web application.

