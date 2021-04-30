# APIs

Zilp-Zalp bietet prinzipiell zwei APIs um Daten im System zu verwalten:

* Eine **Backend-API**, die Kontaktdaten und (optional) verschlüsselte Nutzer-Einstellungen speichert, Hashes publiziert und Besuchsdaten entgegennimmt.
* Eine **Betreiber-API**, die Besuchsdaten und (optional) verschlüsselte Betreiber-Einstellungen speichert.

Beide APIs stellen eine JSON-RPC Schnittstelle bereit.

## Backend-API

### Unauthentifizierte Endpunkte

Diese Endpunkte sind für Nutzer und Betreiber-Server vorgesehen.

* `getOpenHashes() -> (enum<OK, ERR>, {OK: {hashes: list<bytes<16>>, salt: bytes<16>}, ERR: Error})`: Erlaubt das Abfrufen aller aktuell ausgeschriebenen Hashes.
* `getAllHashes() -> (enum<OK, ERR>, {OK: {hashes: list<bytes<16>>, salt: bytes<16>}, ERR: Error})`: Erlaubt das Abfrufen aller jemals ausgeschriebenen Hashes.
* `storeTraces(traces list<RelatedTraces>) -> enum<OK, ERR>`: Erlaubt die Einreichung von zu ausgeschriebenen Hashes relevanten Besuchsdaten durch einen Betreiber.
* `storeEncryptedContactData(id bytes<16>, data EncryptedContactData) -> enum<OK, ERR>`: Erlaubt das Speichern von verschlüsselten Kontaktdaten im Rahmen der Initialisierung.
* `storeEncryptedSettings(id bytes<16>, data bytes<1,8192>) -> enum<OK, ERR>`: Erlaubt das Speichern von verschlüsselten Nutzer-Einstellungen im Rahmen der Initialisierung.
* `getEncryptedSettings(id bytes<16>) -> (enum<OK, ERR>, {OK: bytes<1,8192>, ERR: Error})`: Erlaubt das Abrufen von verschlüsselten Nutzer-Einstellungen.

### Authentifizierte Endpunkte

Diese Endpunkte sind für Gesundheitsämter vorgesehen, welche sich durch Signieren von Anfragen authentifizieren.

* `publishHashes(hashes list<bytes<16>>, signature Signature) -> enum<OK, ERR>`: Erlaubt das Ausschreiben von Hashes durch Gesundheitsämter.
* `getTraces(hashes list<string>, signature Signature) -> (enum<OK, ERR>, {OK: list<Trace>, ERR: Error})`: Erlaubt die Abfrage von zurückgelieferten Besuchsdaten durch das anfragende Gesundheitsamt.
* `getEncryptedContactData(id bytes<16>, signature Signature) -> (enum<OK, ERR>, {OK: EncryptedContactData, ERR: Error})`: Erlaubt das Abrufen von verschlüsselten Kontaktdaten durch Gesundheitsämter.

#### Sicherheitsaspekte

Auszuschreibende Hashes werden vor der Publikation zunächst mit einem Salt-Wert gehasht. Dieser wird bei der Publikation ebenfalls mitgeliefert, Betreiber-Server müssen ihrerseits vorhandene Hashwerte zum Vergleich ebenfalls mit diesem Salt hashen. Sie müssen Anfragen mit ungehashten Hashes beantworten, was über die "preimage resistance" Eigenschaft des Hashes verhindert, dass massenhaft ungültige Besuchsdaten von Betreiber-Servern eingereicht werden können.

## Betreiber-API

Die Betreiber-API führt in der Standardkonfiguration keine Authentifizierung von Anfragen durch und ist öffentlich erreichbar (dies kann jedoch vom Betreiber angepasst werden).

* `storeTraces(traces list<Trace>) -> enum<OK, ERR>`: Erlaubt die Speicherung von Besuchsdaten durch einen Betreiber.
* `storeEncryptedSettings(id bytes<16>, data bytes<1,8192>) -> enum<OK, ERR>`: Erlaubt das Speichern von verschlüsselten Nutzer-Einstellungen im Rahmen der Initialisierung.
* `getEncryptedSettings(id bytes<16>) -> (enum<OK, ERR>, {OK: bytes<1,8192>, ERR: Error})`: Erlaubt das Abrufen von verschlüsselten Betreiber-Einstellungen.

#### Sicherheitsaspekte

Die Betreiber-API besitzt in der Standardkonfiguration keine Authentifizierung und kann gespeicherte Daten zudem keinem spezifischen Betreiber zuordnen. Sie muss daher robust gegenüber der massenhaften Einreichung ungültiger Besuchsdaten sein (da keine Möglichkeit zur Prüfung der Echtheit dieser Besuchsdaten besteht). Dies kann ggf. durch Rate-Limiting, Datenlängebeschränkungen und eine effiziente Speicherung erreicht werden.

Falls sich trotz dieser Gegenmaßnahmen ein Missbrauch der API nicht beherrschen lässt kann eine optionale Authentifizierung von Anfragen über einen zweiten Faktor, beispielsweise ein Token oder eine hieraus gebildete HMAC-Signatur, erfolgen (jedoch müssen diese dann an Betreiber verteilt werden).

#### Erfüllung von Nachweispflichten

Optional kann die Betreiber-API auch einen Endpunkt bereitstellen, der für einen gegebenen Gruppen-Identifikator $G _ j$ Metadaten $M _ j$ zurückliefert. Betreiber-Anwendungen können diesen Endpunkt nutzen, um zu beweisen, dass sie Besuche korrekt dokumentiert haben. Weitere Mechanismen sind hierfür vorstellbar, z.B. die Rückgabe signierter Bestätigungen durch die Betreiber-API. Wie in jedem System zur Kontaktnachverfolgung kann jedoch keine abschließende Garantie für die korrekte und vollständige Nutzung des Systems gegeben werden.