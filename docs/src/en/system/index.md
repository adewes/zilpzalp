# Overview

The Zilp-Zalp system consists of several components that can be used independently of each other and without central coordination. Together they form a federated, decentralized contact tracking system.

The system has two types of servers:

* **Backend servers** store encrypted user contact information and optionally encrypted user preferences. Furthermore, they communicate with health authorities to write out hash values for contact tracking, cache visit data returned by operator servers to these hashes, and make them available to the requesting health authorities.
* **Operator servers** store encrypted visit data from operators of localities and optionally encrypted operator settings. They retrieve advertised hash values from backend servers and respond to these requests.

In addition, the system has several client applications:

* The **user application** allows initialization of contact tracking for users.
* The **operator application** allows the collection of visit data by operators and the transmission of the data to one or more **operator servers**.
* The **health department application** allows the request of contact data by health departments, the retrieval of returned data as well as the decryption and further processing of this data.

## System concept

The design of the components aims to obtain a system that * is **redundant**, **decentralized**, **federated**, **resilient**, *secure, and *  **privacy-friendly**. This is achieved through several aspects:

### Decentralisation

There is no central office in the Zilp-Zalp system that controls the operation of the entire system. Operator server and backend server can be operated independently. The functional integration takes place via a trust approach within the framework of a "Web of Trust".

### Federated

Providers of operator servers can determine themselves with which backend servers they communicate; this can thus be designed differently, e.g. regionally. Providers of backend servers can also define with which operator servers and, if applicable, with which health authorities they allow communication. In this way, a federal state-specific, federated infrastructure can easily be set up.

### Resilience

Both backend servers and operator servers can be designed redundantly, so data can be stored on multiple servers. If a single server fails, data can still be accessed.

### Security

Backend and - operator servers only store encrypted data with very little metadata. Even a complete compromise and a complete loss of all data of a server only leads to a very low risk, because attackers need a lot of additional information to be able to make sense of the data. Also, tampering with a server provides attackers with few opportunities to collect relevant metadata or extract sensitive information. Servers also do not store private key

### Privacy Friendliness

Backend nor - operator servers have only very limited access to metadata that can provide conclusions about personal or sensitive information. Since there is no direct communication with users, IP-based profiling is not possible. In addition, visit data is stored strictly encrypted and cannot be assigned to a specific operator; a targeted retrieval of data from individual locations is therefore not possible.

