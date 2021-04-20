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
