# Digital contact tracing

This page describes the protocol for digital contact tracing with **Zilp-Zalp**. Basically, the protocol is based on the [paper-based protocol]({{'protocols.paper-based'|href}}) and implements it with various enhancements (which cannot be implemented in the paper-based protocol).

## Procedure

In general, the initialization takes place in the same way as in the paper-based protocol. In contrast to this, however, the generated QR code data is not deleted, but stored in the browser (or a smartphone app). The user can open the (browser/smartphone) app for visit documentation, which then displays one of the previously generated QR codes, which in turn is scanned by the operator. The scanning must be done synchronously. When leaving the location, the same code can be scanned again to document the attendance time.

## Differences to the paper-based protocol

To prevent the unauthorized reuse of QR codes, many more codes can be generated during initialization in the case of digital tracking as well as the use of time-limited QR codes (e.g. one for every hour of the next twelve months). In this case, however, the initialization must also be carried out by a validating third party. Self-certification of the QR codes by the user's web application is also possible, but in this case the detection of possible multiple use can only take place when the data is analysed by health authorities.

### Optional contact diary

The web application can theoretically also be used as a contact diary. For this purpose, a static QR code can be scanned in the locality of the operator. However, existing applications such as the Corona warning app may be preferable for this purpose, since by performing an anonymous check-in it can also simultaneously send anonymous warnings to users in the event of an infection.
