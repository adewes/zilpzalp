# Paper-based contact tracing

Many contact tracing systems, such as Luca or Recover, rely primarily on tech tools like smartphone apps to document visits.
This is problematic for a number of reasons. Paper-based or analogue protocols are also offered by other systems such as Luca (e.g. in the form of "key tags"), but static QR codes have a number of data protection problems.

Zilp-Zalp, on the other hand, relies primarily on a paper-based protocol that uses technological tools such as web applications only in a supportive manner, and essentially works completely without technological tools for the user during visits. Such a protocol has many advantages in practice:

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

## Protocol (v0.5)

### Change history

* `v0.5`
  * Location data can each be encrypted with a group key and
added to visit data. This allows the data to be stored anonymously in a backend, which increases the availability of the data and reduces the risk of loss in contrast to fully decentralized storage. Data cannot be assigned to a specific location by the backend.
  * An ombudsman process is described that governs data access
in cases where a health department requests data without being able to produce a user's secret key.
  * An extension has been added to describe the manual collection
of contact details by the operator of a locality, and a process for health boards to access this data collected on behalf of the user for a specific purpose.

Zilp-Zalp's paper-based, decentralized protocol includes the following actors:

* **Users** who provide their **contact information** and **visit history to** GÄ for **contact tracing** purposes.
* **Operators of** **localities** that document **visits** by **users** to enable **contact tracing of** GEs.
* **Health departments (HAs)** using **visit histories** and **contact information to** do contact tracing.

To enable the exchange of this data between the actors, Zilp-Zalp implements an infrastructure with different services:

* **Web applications** for operators, GÄ and users (for the latter here only needed to create QR codes).
* An **API** for sharing visit histories and contact information.

The encryption of data for GÄs as well as the authentication of their public requests is done by public-key encryption. In the following, we assume that GÄs each have a pair of keys for signing and -  encrypting/decrypting data, and that other actors can verify the trustworthiness of the public keys of these pairs via a suitable mechanism (e.g., a root certificate that is delivered together with the web application).

<aside>
<div style="max-width: 300px">
    {{'diagrams/Folie8.PNG'|picture(class="img")}}
</div>
<p>

Explanations of the digrams that follow in the text. a) Public aymmetric key. b) Private asymmetric key. c) Symmetric key. d) Encryption with a symmetric or asymmetric key. e) Signing with a private asymmetric key. 
</p>
</aside>



### Initialization

Users in the system would like to make their contact data available to GÄ on an ad hoc basis. We assume here that users would like to store the data in such a way that GÄ can access the data without any further action on the part of the user (but in a way that is comprehensible to the user).

The contact data should only be processed by trustworthy actors and generally be available to as few actors as possible in the system (whether in encrypted or unencrypted form).

To enter contact data, users first open the web application and enter relevant data such as name, address, telephone number and e-mail address (a validation of this data is described below). The application then generates two randomly generated symmetric keys $K _ a$ and $K _ b$, which are combined using a suitable key derivation procedure to form a key $K _ c$. The application now encrypts the user's contact data symmetrically with key $K _ c$, adds key $K _ a$ to this encrypted data, encrypts this data asymmetrically with the public GÄ data key, and transmits this data to the API, which stores it in a backend and returns a random identifier $I_D$. The data stored there cannot be decrypted by any actor without knowledge of the key $K _ b$ as well as the private key of the GÄ. The latter is initially under the control of the user and can only reach a GÄ that can decrypt it via the user or via an operator.

<aside>
<div style="max-width: 300px">
    {{'diagrams/Folie6.PNG'|picture(class="img img-responsive")}}
</div>
<p>

Contact details $ U _ d $, which a user stores encrypted with the key $ K _ a + K _ b $ in a backend linked to his $ I _ D $ (unencrypted). Initially purely local storage is also possible (but only recommended when using digital contact tracking).
</p>
</aside>



Furthermore, the user's application generates a random value $H _ s$, from which a pseudo-random series of further values $H _ 1, H _ 2, \ldots H _ n$ is generated using a suitable method. The web application now stores $H _ s$, $I _ D$ and $ K _ b$ together in a data structure and encrypts them with the public GÄ data key. This data remains with the user and is only passed on to a GA for contact tracing.

Now the application generates value pairs consisting of $H _ i$ ($ \ge 1$) on the one hand and $K _ b$ and $I _ D$ on the other hand, whereby $H _ i$ is unencrypted and $(K _ b, I _ D)$ is encrypted individually for each value pair with the GÄ data key. The public key $U _ i ^ \mathrm{pub} $ generated for this data set is appended to the data set, and the application stores the associated private key $U _ i ^ \mathrm{priv} $ for possible later transfer to the health authority.
These pairs are used for contact tracking and shared with public operators.

<aside>
<div style="max-width: 600px">
    {{'diagrams/Folie3.PNG'|picture(class="img img-responsive")}}
</div>
<p>

a) Data that the user keeps for possible handover to the health authority. $ K _ b $ , $ I _ D $ and $ H _ s $ are user data as described in the text, $ U _ 1 \ldots U _ n $ private data keys of the user. b) Data that the user keeps for himself for control. $ U $ refers to a user key with which the user encrypts his or her data.
</p>
</aside>


The application then generates QR codes from the data, hands them to the user for printing, and then deletes all data.
The data that is transferred to the health department in the case of contact tracing $ ( K _ b, I _ D, H _ s, U _ 1 ^ \mathrm{priv} \ldots U _ n ^ \mathrm{priv} ) $, as well as the data that the user himself uses to check and adjust his data can either be stored in files, or locally encrypted and then stored in the backend.
In the latter case, the application generates a random password and ID that the user must write down in order to recover the data later.
Local storage as a file is preferable from a data protection point of view.

Note: Currently, deriving $K _ c$ from $(K _ a, K _ b)$ does not increase the security of the system, as $K _ b $ is kept permanently with the user's contact information.
In an extension of the Proktoll, however, it is planned to separate the key $K _ b$ from the contact data in an additional step of by a GA, to store it separately from the beginning or to encrypt it asymmetrically and to give another party control over the decryption.
It was therefore left in the minutes for the time being.


<aside>
<div style="max-width: 800px">
    {{'diagrams/Folie4.PNG'|picture(class="img img-responsive")}}
</div>
<p>

Data that the user transfers to an operator for visit documentation. Only one data package is transferred per visit and is not reused afterwards.
</p>
</aside>


#### Sequence diagram

The following sequence diagram summarizes the initialization process.

<div>
    {% include "common/protocols/_initialization.html" %}
</div>

#### Optional: Initialization with data validation

As part of the normal initialization, no validation of the contact data provided by the user takes place. If validation of this data is desired, the initialization must be performed with the help of a trusted third party. For this purpose, this third party operates a special version of the web application via which users initially initialize their data in exactly the same way as above. In contrast to the normal initialization, however, the third party checks the data before encryption (e.g. by comparing it with an identification document) and confirms its correctness. The web application then signs each value pair of the user with a signature that certifies the presence of correct user data for the value pair. These signatures $ S _ i $ are applied to the user's QR codes in addition to the value pairs. An operator's web application can read and confirm this signature when scanning a QR code. The operator can hereby confirm that validated user data belongs to the QR code. In addition, the third party can restrict the validity of the QR codes. This is useful to prevent reuse in the system.

Trusted third parties could be, for example, state institutions but also, if necessary, private sector actors (e.g. post offices) that already have experience with the validation of data. However, implementing such a system is likely to require a great deal of effort and create an additional risk, as another third party will have access to a user's data during initialisation. The benefits should therefore be weighed against the effort involved.

<aside>
<div style="max-width: 350px">
    {{'diagrams/Folie5.PNG'|picture(class="img img-responsive")}}
</div>
<p>

Validated data that the user hands over to an operator of a locality for visit documentation. The latter can check the validity of the data with the public key of the signing body ($ TC $).
</p>
</aside>



Validation via third party APIs as done in other centralized systems can theoretically be done as well, e.g. the web application can only allow the creation of QR codes after certain data like a phone number or an email address has been validated via an external service. Since the web application (or generally any client application) is under the control of the user they can easily manipulate it to bypass validation. That this is feasible has already been demonstrated. Client-side validation of data therefore only discourages non-technical, cooperative users from providing false data (this is not to say that such additional validation is completely useless, but it should by no means be considered secure or reliable).

### Visit documentation

<aside>
<div style="max-width: 600px">
    {{'diagrams/Folie1.PNG'|picture(class="img img-responsive")}}
</div>
<p>

Visit data that an operator generates on the basis of user data passed to it and stores locally or in a backend. $ H _ i $ denotes the i-th public hash value of a user, $ G _ j $ denotes the identification value of a group/infection community formed by the operator application, $ M _ j $ denotes public meta data of this group (not assignable to an operator) $ K _ b $ and $ I _ D $ are user data as described above, $ L _ D $ contains the contact data of the operator and $ N _ j $ contains non-public meta data for the health department (e.g. table, room information etc.). $ U _ i ^a $ denotes a data key of a user from the formed group. $ G _ j $ color-coded denotes the private or public group key. $ Ob $ denotes the ombuds key, $ Op $ denotes the operator key.
</p>
</aside>



To document the visit of a location to operators, users simply give them a random QR code. In addition to the QR code, it is possible to enter additional meta data such as the exact time of arrival and the length of stay in order to increase the accuracy of the documentation. The operator then records the QR codes received over a given period (e.g. one day) using the web application. Initially, they are only stored locally. Operators can also capture additional meta-data to improve accuracy for contact tracing.

The operator's web application groups visit data as close to real time as possible (within a few hours).
Individual visit data can exist in several groups (overlapping).
For each group, the web application generates an asymmetric key pair.
All visit records of the group are encrypted with the public key of this pair. The corresponding private key is encrypted with the public key of each visit record and stored with the record. In addition, the operator encrypts the locality data in each case with the respective group keys of a visit data record and appends them there.

As soon as it is clear that no further visit records will be assigned to a group, the web application deletes the private key belonging to the group. 
The public key is stored together with the group data.
Similarly, the web application deletes a user's original visit data as soon as it is clear that they will not be added to another group.

The data encrypted in this way can only be accessed with the help of the GA data key and a matching private key of a visit record belonging to the group. These private keys are under the control of the user and are only transmitted to the GA by the user in the event of an infection. Accordingly, even if the GA could access all operator data, it can only decrypt epidemiologically relevant data for which a user has provided the matching private key.

<aside>
<div style="max-width: 400px">
    {{'diagrams/Folie2.PNG'|picture(class="img img-responsive")}}
</div>
<p>

Data that an operator stores locally or in a backend in encrypted form in order to fulfil its obligation to provide evidence to the health authority and for the possible decryption of visit data as part of the ombudsman process. $ G _ i $ denotes the identifier of a group/infection community, $ M _ k $ denotes relevant meta-data about the group (including time of collection). $ Op $ (red) denotes the private data key of the operator (which is required for the Ombuds process), $ Op $ (yellow) denotes the secret data key with which the operator encrypts the data. The operator can store this encrypted data locally or in a backend.
</p>
</aside>




<div>
    {% include "common/protocols/_check_in.html" %}
</div>

#### Manual visit recording

The operator must also be able to record contact data for people who do not use Zilp-Zalp and store it in encrypted form. However, this raises the question of how a purpose limitation can be achieved for this data, since in this case the person has not gone through any initialization in the Zilp-Zalp system. There are several possibilities for this:

* A one-time initialisation can be carried out with the support of the operator. In this case, the person must be given the corresponding secret keys, for example in the form of a QR code printout or by noting two numbers (in the case of encrypted storage).
* Key derivation can be performed using the person's contact details and locality data (for example, by merging and hashing the person's name and address and locality).
  If the person contacts the health department for contact
tracing, the health department can reconstruct the user's secret keys based on the given data (name of the person and details of the locality visited) and then perform contact tracing regularly.
  However, this weakens the security and - privacy guarantees
for that person and all other users in their infection community.
* It is possible to completely dispense with the storage of the person's secret key; the person's visit data can then only be decrypted for a specific purpose via a group key of the corresponding infection community or with the help of the ombuds process.

In principle, operators can also hand out prefabricated QR code blocks to people, which they assign to a person with the help of initialization. However, this involves the risk that operators can view the entire QR codes of a block. However, this risk can be limited by technical means. 

#### Storage of visit data

Visit data can either be stored locally, or stored in a (federated) backend.
Local storage is privacy-friendly, but also poses availability risks, as the operator of a locality must ensure that the data is stored in a fail-safe manner.
In addition, local storage may slow down contact tracking.
Since Zilp-Zalp already integrates a mechanism that protects user visit data with the help of an assignment to infection communities, the purpose limitation is already given here.
Accordingly, visit data can also be stored in a backend, which can then automatically respond to hashes written out.
Here, the operator's web application can add the locality data to all encrypted visit data and encrypt it with the appropriate group key as well.
The backend cannot assign individual visit data to specific locations. Only via metadata (IP address of the uploading location) would it be possible for a backend to establish an assignment if necessary.

The backend should again be federated to reduce the risk of metadata analysis. The storage of data can also take place asynchronously.

### Contact Tracking


<aside>
<div style="max-width: 300px">
    {{'diagrams/Folie7.PNG'|picture(class="img img-responsive")}}
</div>
<p>

Hash values published by a health department for contact tracing purposes.
</p>
</aside>



In order to identify possible risk contacts of an infected user, the user first hands over the QR code (either digital or analogue) to the GA.
This can decrypt it with the private GÄ data key, whereby it receives the values $H _ s ^ l$, $I _ D ^ l$ and $K _ b ^ l$ ($l$ denotes here the data of the $l$-th user).
With the value $I _ D$ the GA can receive the encrypted user data from the backend, which can be decrypted with the help of the private data key as well as $K _ b$.
Furthermore, the GA can use $H _ s$ to create all hash values $H _ i$ of the user. It publishes these values via the backend (together with other hash values to protect the anonymity of the user).
The operators' web applications regularly download the list of these values and match them with the locally stored hash values.
If there is a match, all visit data related to these hash values $H _ i$ (e.g. determined by comparing the visit times) are transferred to the backend via the public API after confirmation by the operator (if necessary, the data can be encrypted again with the GÄ data key).
From there they can be recalled by the GA.
This can decrypt data from users who have formed an infection community with it and have accordingly been encrypted with the same group key.
To do this, the GA first decrypts the group key with the matching private key $U _ i ^ {pub}$ that belongs to the original visit data.
With this and the private GÄ data key, it can in turn decrypt the values $ I _ D ^ k$, and $K _ b ^ k$ of relevant users, which in turn can be used to query and decrypt the user's contact data from the backend.
However, since the GA does not have the key $ H _ s ^ k$ from this user, it cannot reconstruct the user's visit history without consent.
On the contrary, the active cooperation of this user is necessary.
Nor can the GA - decrypt visits or - contact data of users who have not formed an infection community with the original user.

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
These data cannot be falsified by an operator without knowledge of the key $K _ b$, GÄ can thus exclude manipulated or incorrect data.
An operator may still return irrelevant data, but such behaviour can be traced back to the operator in a number of ways and penalised accordingly.
An operator always returns complete group data, which contains visit data encrypted with a private group key. The private key in turn was encrypted with the public keys of the visit data of all group members.

<div>
    {% include "common/protocols/_contact_tracing_2.html" %}
</div>

##### Processing of relevant contact data

Finally, the GA processes the data of the operators. However, epidemiological group data can only be decrypted if the GA receives from the user a matching private key to visit data containing the encrypted private key of the respective group data. Without the presence of such a key, the GA cannot decrypt the data even if all data and all other keys are present.

<div>
    {% include "common/protocols/_contact_tracing_3.html" %}
</div>

#### Ombuds process

Scenarios are conceivable in which contact tracing must be performed by a health department without the health department knowing a user's secret keys. For example, it is conceivable that a user loses his secret keys, but can provide the health department with a list of visited locations. The health department should then be able to use the visit data collected from these locations using Zilp-Zalp for contact tracing. At the same time, it must be ensured that health authorities or other actors cannot use this possibility to decode visit data for any purpose.

One possibility to design such a process is the use of an ombudsman office, which monitors and controls the data request as a neutral third party. For this purpose, a key pair can be generated for this body, the public key being made available to operators. Group keys are then additionally encrypted with this key. If a health authority requests visit data from an operator, it must request decryption of the corresponding group key from the ombudsman service in order to make the data usable. The ombudsman checks the request and decrypts the group key if necessary. This process is then publicly documented if necessary.

The disadvantage of this procedure is that ombud keys in turn enable the global decryption of visit data. The operator of a locality can therefore be used as a further trust authority. However, sole control of decryption by operators should be avoided as well, since they cannot exercise an effective control function vis-à-vis public authorities, as the [accessibility of guest lists to police authorities](https://www.sueddeutsche.de/bayern/bayern-polizei-corona-gaestelisten-ermittlungen-1.5018271) has already shown.

In general, requesting visit data through this mechanism should be an absolute exception; accordingly, the process can be equipped with a strong additional control mechanism in the form of an ombuds process without greatly reducing its effectiveness.
### Risk analysis

A detailed risk analysis can be found in a [separate document]({{'analyses.risks'|href}}).

### Opportunities for improvement

In our view, the following aspects of the protocol can still be improved:

* **Data storage in the backend** : In the current draft, a user's contact data is stored in encrypted form in a backend so that it can be retrieved by a GA if necessary. In principle, decryption is only possible if the GA also has one half of the user's key, which the user has either transmitted directly to the GA or which was transmitted by an operator as part of a visit data query. Nevertheless, any centralized data storage poses a threat to user privacy. A variant of this protocol can therefore delay the centralization of this data. However, this in turn has disadvantages, since in this case, GÄs can only obtain users' contact data with their active assistance. If users are difficult to reach, this can delay and hinder effective contact tracing. In this sense, the privacy of users must be weighed against the interest of the GA.

### Variants

To further enhance user privacy, different variants of the protocol can be created, which are discussed in the following sections.

#### Event-related data release

Visit data collection using QR data also works without storing contact data in a central backend. Accordingly, the collection and storage of this data can be delayed as follows:

* Instead of providing encrypted contact data directly to the backend when creating QR codes, the user's web application can initially only request a $ I _ D$ value and a token $ Z $ from the backend and simultaneously store the public part of an asymmetric key pair generated by the application for it there. The backend stores this together with $ Z $ and $I _ D$. The associated private key, $ I _ D$ and $ Z $ can be made available by the application to the user for storage.
* If the corresponding visit data is found during contact tracing, the backend determines that no contact data exists for them yet. It then writes out the token $ Z $ via a public list for completion.
* The user can periodically submit the data $ Z $ and $ I _ D $ to the web application, which then recognizes from the published token $ Z $ that the user's data has been requested for contact tracking. It then prompts the user to provide the data, encrypts it with the GÄ public data key, signs the data with the private key of the generated key pair, and communicates it via the API to the backend, which stores it.
* The GA can now retrieve the data regularly from the backend via the API.

This procedure is more privacy-friendly, but may not be practical for a paper-based procedure as it relies on the active cooperation of the user. Users who do not regularly open the web application will not know that their data has been requested. However, the process is very well suited for digital contact tracing via app. In this case, it delays the storage of personal information until it is really needed.

The delayed provision of contact details associated with the procedure must again be balanced against the protection of the privacy of individual users.

### Extensions

The following sections describe possible extensions to the protocol that go beyond the basic functionality.

#### Review by the user

During initialization, in addition to the GA data, a data package can also be generated for the user, which can contain, among other things, the secret $ H _ s $ (this data package can also be protected with a password of your choice).

The user can make this data package, which can also be provided as a QR code, available to the web application. The web application can use the data to reconstruct the user's hashes $ H _ i $ and, with the help of the backend, check whether and by whom these hashes were written out. The user thus receives information as to whether his visit data has been requested by a GA and, in the event of non-notification, can request further data on the use from this office using his GA data.

The data package can also be used as described above to have hashes declared invalid, e.g. in the event of loss or theft.
