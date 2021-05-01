# Simplicity vs. security

One of the challenges in designing a secure and privacy-friendly contact tracking system is the simplicity or "usability" of the solution for locality users and operators.
The goal in designing Zilp-Zalp was to make it as easy to use as possible while -  maintaining very high security & -  privacy standards.
In order to avoid misuse scenarios through fake check-ins, it was deliberately decided not to offer a self-registration process.
Accordingly, guests, customers or visitors must be registered by the operator of a locality.
To do this, a QR code must be scanned, which can be shown by the user in paper form or digitally via a smartphone.
The operator must also collect relevant meta-data (e.g. table number, visiting times etc.) to ensure that the collected data can be used in a meaningful way.

First tests with a web-based QR code scanner based on [jsQR](https://github.com/cozmo/jsQR) have shown that the scanning of QR codes is possible, but the accuracy leaves much to be desired, the scanning of codes can therefore be very tedious.

Therefore, in order to simplify the process, the following proposal has emerged:

* Instead of requiring QR codes to be scanned in a special web application, as is currently the case, they could be designed to be scanned using an integrated smartphone scanner.
Here, the QR code can contain a URL that leads to a simple scanner web application.
Via this web application, the operator or an employee can enter the relevant meta data.
Since QR code scanners from smartphones work much better than Javascript-based scanners, it is much easier to document visits this way.

However, the data available on the smartphone still has to reach the operator's web application, where it is finally additionally encrypted and secured for possible retrieval by health authorities.
For the realization of this transfer I evaluated different possibilities.
A peer-to-peer data exchange via WebRTC, for example, would be technically possible, but would be associated with high hurdles and probably not reliable to implement (no one wants to debug faulty WebRTC connections during restaurant operation, for example).
A simpler option is the encrypted exchange of data via an external service that mediates the communication between the operator application and the smartphone with the visit data.
Here, the smartphone must first be "paired" locally with the web application.
This can be done by scanning a QR code provided by the web application, which contains a secret ID and a secret key.
The smartphone web application can then encrypt visit data with the secret key (using key rotation via a cryptographic ratchet if necessary - ), associate it with the random ID, and store it on the external service.
The web application of the operator can request the data from there via the secret ID and decrypt it with the secret key.

This creates the possibility of having visit data recorded in an uncomplicated manner by individual employees and still being able to process the data in a common, local application.
However, using an external service also opens up risks, since the service can analyze metadata, among other things, and the exchange of messages always poses a security risk.

It is also problematic that visit data is processed on additional devices.
Especially if private smartphones are used for this purpose (which will certainly often be the case in practice), there is a risk of data leakage.
However, since Zilp-Zalp QR codes do not contain any particularly sensitive data and only pose privacy risks for data subjects when systematically collected and analyzed, this risk may be acceptable.
A direct, smartphone-based capture of QR codes has the advantage, especially in the case of paper-based codes, that these do not have to remain with the operator and thus the - risk of loss or - theft of these codes is also minimized.

Technically experienced operators can also operate such a service for data transmission themselves in a local network and secure it using additional authentication mechanisms.
This would ensure that data is only processed locally.
However, not all operators can be expected to operate such a service.
Therefore, e.g. public bodies or trustworthy civil society organisations could also offer such services.
As with all components, it is important here to prevent centralization and the associated possibility of metadata analysis as far as possible.
