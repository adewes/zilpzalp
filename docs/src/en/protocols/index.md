# Protocols

Here we describe the protocols that Zilp-Zalp supports for exchanging contact information for infection tracing. We first formulate the requirements for a general protocol for exchanging contact data and discuss possible protocol variants based on this.

## Requirements

We use the following functional requirements as a basis:

* **Users** should be able to document a **visit to** their **localities** vis-à-vis **operators**. The documentation should indirectly enable **health authorities** to trace possible chains of infection by evaluating contact data and to contact affected persons.
* The documentation of a **visit** should be as accurate as possible and include, as far as possible and reasonable, information on the exact location, contact persons and visiting times.

In addition, we apply the following security & -  privacy requirements :

* The collection, storage and processing of **contact data** and **visit histories of** individual **users** should be as data-saving and privacy-friendly as possible.
* Only **health authorities** should be able to view contact data on an ad **hoc basis**, and only with the cooperation of an affected **user** and an **operator**.

## Protocols

Based on these requirements, protocols were developed that implement them. First, a [paper-based protocol]({{'protocols.paper-based'|href}}) was developed that is accessible to the user without technological aids such as apps and smartphones. Based on this, a [digital protocol]({{'protocols.digital'|href}}) was formulated that enables the documentation of visit histories using a web application.

## Considerations

In general, privacy must be weighed against other interests when tracking contacts. Since this balancing can vary locally, Zilp-Zalp offers different implementation options.

### Central vs. decentralized storage of visit data

In general, the storage of visit data in the Zilp-Zalp system is decentralized to the operators of localities.
However, in order to guarantee secure storage and processing of data, it is necessary that operators install and run a local application and have reliable Internet connectivity (not necessarily permanent and directly at the site of the visit).
Since from Zilp-Zalp protocol version `0.4` onwards, visit data is encrypted with the group keys of infection communities, the associated data cannot be decrypted without the involvement of at least one user from the relevant community, in contrast to other systems, even in the case of conspiratorial cooperation between the backend operator and health authorities.
Accordingly, central storage of this encrypted data can in principle also be considered to increase data availability and reliability of processing.
Operators may still be informed of data use in this case, but the control of data processing remains with the user concerned.
Central storage also lowers the technical requirements for public operators, as data only needs to be stored locally for a short period of time.

### Downstream vs. direct contact data deposit

In principle, the initialization of Zilp-Zalp for users can take place without the involvement of the backend.
Users can generate QR codes and generate the corresponding ID locally.
Contact details can then be provided via an additional mechanism if required.
This creates the best possible privacy protection for users, but may make contact tracing by health departments more difficult.
Users may also be able to provide only pseudonymous contact information (e.g., an email address) and be prompted to complete their information in the event of a contact information request.
This may lead to a higher acceptance of the system, as the risk of loss of personal data is lower.
Again, however, this involves more effort and a possible delay in contact tracing.
