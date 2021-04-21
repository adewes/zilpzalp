# Paper-based contact tracing

Many contact tracing systems, such as Luca or Recover, rely primarily on tech tools like smartphone apps to document visits.
This is problematic for a number of reasons. Paper-based or analogue protocols are also offered by other systems such as Luca (in the form of key fobs), but these present a number of data protection problems.

Zilp-Zalp, on the other hand, relies primarily on a paper-based protocol that uses technological tools such as web applications only in a supportive manner, essentially functioning completely without technological tools for the user during visits. Such a protocol has many advantages in practice:

* Users do not have to install smartphone applications from sources that may not be trusted.
* It is not necessary to carry a smartphone or have internet connectivity to document visits.
* The procedure can also be used by people who have no experience in using smartphone apps or cannot use them for other reasons.

## Basic ideas

To meet the contact tracing requirements outlined in the [overview]({{'protocols.index'|href}}), the following must be in place:

* A **site** operator must be able to document a **user** 's **visit in** a legally compliant manner.
* A **health department (GA)** (plural: **GÄ**) must be able to work with an infected user to identify and contact (with minimal effort) possible at-risk contacts of that **user** based on that **user** 's **visit history**.

Basically, for robust contact tracing we need to be able to identify possible intersections between visits of individual users. This generally requires a documentation of the visits of individual users, as well as a procedure to determine for a specific visit of a user all visits of other users that occurred in the same locality and in the same time period.

### Possible strategies

In principle, there are various strategies for implementing these requirements. Probably the most obvious but not necessarily the most privacy-friendly strategy is to manage visit data centrally and to determine relevant visits from this central data storage as needed. This approach is followed by Luca, among others. The problem here is that central data storage creates a multitude of possibilities for monitoring users that are difficult to solve technologically or organizationally.

Therefore, a more privacy-friendly solution is to store contact data in a decentralized manner. To evaluate this, we first divide the contact tracing problem into two sub-problems:

* GÄs must be able to reconstruct **visit histories of** individual users and to obtain relevant **visits of** other users to these histories.
* GPs must also be able to identify **contact details of** individuals belonging to the extracted **visits**.

Here we see that we * can consider the problem of documenting *visits independently of * the problem of storing **contact information**.

* First, we create a possibility to store contact data in such a way that they can only be processed by GÄ for contact tracing on an ad **hoc** basis and are not accessible to any other actors in the system, even in encrypted form.
* Furthermore, we create a way to document **visits** in a robust and data-efficient manner.

## Protocol (v0.3)

Zilp-Zalp's paper-based, decentralized protocol includes the following actors:

* **Users** who provide their **contact information** and **visit history to** GÄ for **contact tracing** purposes.
* **Operators of** **localities** that document **visits** by **users** to enable **contact tracing of** GEs.
* **Health departments (HAs)** using **visit histories** and **contact information to** do contact tracing.

To enable the exchange of this data between the actors, Zilp-Zalp implements an infrastructure with different services:

* **Web applications** for operators, GÄ and users (for the latter here only needed to create QR codes).
* An **API** for sharing visit histories and contact information.

The encryption of data for GÄs as well as the authentication of their public requests is done by public-key encryption. In the following, we assume that GÄs each have a pair of keys for signing and -  encrypting/decrypting data, and that other actors can verify the trustworthiness of the public keys of these pairs via a suitable mechanism (e.g., a root certificate that is delivered together with the web application).

### Initialization

Users in the system would like to make their contact data available to GÄ on an ad hoc basis. We assume here that users would like to store the data in such a way that GÄ can access the data without any further action on the part of the user (but in a way that is comprehensible to the user).

The contact data should only be processed by trustworthy actors and generally be available to as few actors as possible in the system (whether in encrypted or unencrypted form).

To enter contact data, users first open the web application and enter relevant data such as name, address, telephone number and e-mail address (a validation of this data is described below). The application then generates two randomly generated symmetric keys $K _ A$ and $K _ B$, which are combined using a suitable key derivation procedure to form a key $K _ C$. The application now encrypts the user's contact data symmetrically with key $K _ C$, adds key $K _ A$ to this encrypted data, encrypts this data asymmetrically with the public key of the GÄ and transmits this data to the API, which stores it in a backend and returns a random identifier $I_D$. The data stored there cannot be decrypted by any actor without knowing the key $K _ B$ as well as the private key of the GÄ. The latter is initially under the control of the user and can only reach a GÄ that can decrypt it via the user or via an operator.

Furthermore, the user's application generates a random value $H _ s$, from which a pseudo-random series of further values $H _ 1, H _ 2, \ldots H _ n$ is generated using a suitable procedure. The web application now stores $H _ s$, $I _ D$ and $ K _ B$ together in a data structure and encrypts them with the public GÄ key. This data remains with the user and is only passed on to a GA for contact tracing.

Now the application generates value pairs consisting of $H _ i$ ($ \ge 1$) on the one hand and $K _ B$ and $I _ D$ on the other hand, where $H _ i$ is unencrypted and $(K _ B, I _ D)$ is encrypted individually with the GÄ key for each value pair. These pairs are used for contact tracing and passed on to public operators.

The application then generates QR codes from all data structures, transfers them to the user (e.g. for printing) and then deletes all data.

**Note** : Currently, the security of the system is *not enhanced by deriving $K _ C$ from $(K _ A, K _ B)$, * as $K _ B $ is kept permanently with the user's contact details.
In an extension of the Proktoll, however, it is planned to separate the key $K _ B$ from the contact data in an additional step of by a GA, to store it separately from the beginning or to encrypt it asymmetrically and to give another party control over the decryption.
It was therefore left in the minutes for the time being.

#### Sequence diagram

The following sequence diagram summarizes the initialization process.

<div>
    {% include "common/protocols/_initialization.html" %}
</div>

#### Optional: Initialization with data validation

As part of the normal initialization, no validation of the contact data provided by the user takes place. If validation of this data is desired, the initialization must be performed with the help of a trusted third party. For this purpose, this third party operates a special version of the web application via which users initially initialize their data in exactly the same way as above. In contrast to the normal initialization, however, the third party checks the data before encryption (e.g. by comparing it with an identification document) and confirms its correctness. The web application then signs each value pair of the user with a signature that certifies the presence of correct user data for the value pair. These signatures $ S _ i $ are applied to the user's QR codes in addition to the value pairs. An operator's web application can read and confirm this signature when scanning a QR code. The operator can hereby confirm that validated user data belongs to the QR code. In addition, the third party can restrict the validity of the QR codes. This is useful to prevent reuse in the system.

Trusted third parties could be, for example, state institutions but also, if necessary, private sector actors (e.g. post offices) that already have experience with the validation of data. However, implementing such a system is likely to require a great deal of effort and create an additional risk, as another third party will have access to a user's data during initialisation. The benefits should therefore be weighed against the effort involved.

Validation via third party APIs as done in other centralized systems can theoretically be done as well, e.g. the web application can only allow the creation of QR codes after certain data like a phone number or an email address has been validated via an external service. Since the web application (or generally any client application) is under the control of the user they can easily manipulate it to bypass validation. That this is feasible has already been demonstrated. Client-side validation of data therefore only discourages non-technical, cooperative users from providing false data (this is not to say that such additional validation is completely useless, but it should by no means be considered secure or reliable).

### Visit documentation

To document the visit of a location to operators, users simply give them a random QR code. In addition to the QR code, it is possible to enter additional meta data such as the exact time of arrival and the length of stay in order to increase the accuracy of the documentation. The operator then records the QR codes received over a given period (e.g. one day) using the web application. Initially, they are only stored locally. Operators can also capture additional meta-data to improve accuracy for contact tracing.

<div>
    {% include "common/protocols/_check_in.html" %}
</div>

### Contact Tracking

In order to determine possible risk contacts of an infected user, the user first hands over the QR code (either digital or analogue) to the GA. The GA can decrypt it with the private GÄ key, whereby it receives the values $H _ s ^ l$, $I _ D ^ l$ and $K _ B ^ l$ ($l$ denotes the data of the $l$-th user). With the value $I _ D$ the GA can get the encrypted user data from the backend, which can be decrypted with the help of the private key as well as $K _ B$. Furthermore, the GA can create all hash values $H _ i$ of the user with the help of $H _ s$. It publishes these values via the backend. It publishes these values via the backend (together with other hash values to protect the anonymity of the user). The operators' web applications regularly download the list of these values and match them with the locally stored hash values. If there is a match, after confirmation by the operator, all visit data related to these hash values $H _ i$ (e.g. determined by comparing the visit times) are transferred to the backend via the public API (if necessary, the data can be encrypted again with the GA key). From there they can be retrieved by the GA. The GA then uses the private GÄ key to decrypt the values $ I _ D ^ k$, and $K _ B ^ k$, which in turn allows the backend to retrieve and decrypt the user's contact data. However, since the GA does not have the user's key $ H _ s ^ k$, it cannot reconstruct the user's visit history without consent. For this, the active cooperation of this user is again necessary.

#### Sequence diagram

The following sequence diagrams show the contact follow-up process. For reasons of clarity, the process was divided into three steps.

##### Transfer of user data to the GA

First, the GA must receive the GA data from the user in order to initiate further contact follow-up.

<div>
    {% include "common/protocols/_contact_tracing_1.html" %}
</div>

##### Tendering of hashes

The GA then writes out relevant hashes for contact tracing and waits for feedback from operators.
Important: In order to prevent the submission of manipulated data, operators must always also submit the data available for the hash tendered.
These data cannot be falsified by an operator without knowledge of the key $K _ B$, GÄ can thus exclude manipulated or incorrect data.
An operator may still return irrelevant data, but such behaviour can be traced back to the operator in a number of ways and penalised accordingly.

<div>
    {% include "common/protocols/_contact_tracing_2.html" %}
</div>

##### Processing of relevant contact data

Finally, the GA processes the operators' data.

<div>
    {% include "common/protocols/_contact_tracing_3.html" %}
</div>


### Risk analysis

The following sections describe risks we have identified to date.

#### Reuse of QR codes

Since QR codes are only recorded decentrally, they can initially be used several times without being detected. For example, an operator or a third party who has access to a QR code already used by a user could use it to document visits in other locations.

However, this attack is easy to detect during contact tracing, and the data generated by multiple use of a QR code can presumably be easily removed. Possible sources of misuse can also be easily reconstructed on the basis of existing and missing data by questioning the affected user, and missing QR codes can subsequently be identified when checking an operator. Misuse is therefore not excluded (as with other methods), but in contrast to these can be effectively tracked and punished if necessary. This creates effective incentives for operators and users to keep QR codes safe and not to misuse them.

The risk of reuse can also be limited via a validity mechanism (e.g. certain QR codes can only be used on certain days). On the one hand, however, this would make the use of the codes by the user somewhat more complicated. On the other hand, a tamper-proof limitation of the validity of QR codes can only be achieved with the help of a validating third party, as described above. Whether this makes sense must be weighed up. A "simple" restriction of the validity of QR codes can be achieved by adding a timestamp, but this is easy to circumvent for a technically skilled attacker. Nevertheless, such a timestamp can be useful to prevent "casual abuse" of QR codes. Furthermore, the user's web application can create an HMAC-based checksum for this timestamp during initialization, this cannot be processed by the operator's application, but makes it easier to detect the misuse during analysis by the GA (which, however, is easily possible anyway).


#### Deposit of false data

The validation process described above can guarantee the presence and authenticity of certain user data in the system. However, it requires the involvement of a trusted party in the initialization process.

#### Reconstruction of visit histories

To reconstruct a visit history, an actor must know which values $H _ i$ belong to a given user. Since these values are generated using a secret key $ H _ s $, the attacker must therefore be in possession of this key in order to reconstruct the $H _ 1 \ldots H _ n$ series. The key $ H _ s $ is under control of the user and can only be decrypted by GÄ. An attacker must therefore possess both the GÄ private key and the user's QR code with the value $ H _ s$. In addition, the attacker must extract the visit data individually from the operators, e.g., by manipulating the web applications.

Assuming that at least one of these three attacks fails, the reconstruction of visit histories can be ruled out.

### Opportunities for improvement

In our view, the following aspects of the protocol can still be improved:

* **Data storage in the backend** : In the current draft, a user's contact data is stored in encrypted form in a backend so that it can be retrieved by a GA if necessary. In principle, decryption is only possible if the GA also has one half of the user's key, which the user has either transmitted directly to the GA or which was transmitted by an operator as part of a visit data query. Nevertheless, any centralized data storage poses a threat to user privacy. A variant of this protocol can therefore delay the centralization of this data. However, this in turn has disadvantages, since in this case, GÄs can only obtain users' contact data with their active assistance. If users are difficult to reach, this can delay and hinder effective contact tracing. In this sense, the privacy of users must be weighed against the interest of the GA.

### Variants

To further enhance user privacy, different variants of the protocol can be created, which are discussed in the following sections.

#### Event-related data release

Visit data collection using QR data also works without storing contact data in a central backend. Accordingly, the collection and storage of this data can be delayed as follows:

* Instead of providing encrypted contact data directly to the backend when creating QR codes, the user's web application can initially only request a $ I _ D$ value and a token $ Z $ from the backend and simultaneously store the public part of an asymmetric key pair generated by the application for it there. The backend stores this together with $ Z $ and $I _ D$. The associated private key, $ I _ D$ and $ Z $ can be made available by the application to the user for storage.
* If the corresponding visit data is found during contact tracing, the backend determines that no contact data exists for them yet. It then writes out the token $ Z $ via a public list for completion.
* The user can periodically submit the data $ Z $ and $ I _ D $ to the web application, which then recognizes from the published token $ Z $ that the user's data has been requested for contact tracing. It then prompts the user to provide the data, encrypts it with the public GÄ key, signs the data with the private key of the generated key pair, and communicates it via the API to the backend, which stores it.
* The GA can now retrieve the data regularly from the backend via the API.

This procedure is more privacy-friendly, but may not be practical for a paper-based procedure as it relies on the active cooperation of the user. Users who do not regularly open the web application will not know that their data has been requested. However, the process is very well suited for digital contact tracing via app. In this case, it delays the storage of personal information until it is really needed.

The delayed provision of contact details associated with the procedure must again be balanced against the protection of the privacy of individual users.
