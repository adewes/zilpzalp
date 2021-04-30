# Schlüsselmanagement

Zilp-Zalp nutzt eine externe Public-Key Infrastruktur (PKI) zur Verschlüsselung von Daten sowie zur Authentifizierung von Gesundheitsämtern gegenüber Backend-Servern und zur Signierung von Anfragen, die von diesen veröffentlicht werden.

Die Sicherheit des Gesamtsystems hängt wie bei allen Systee entscheidend von der Sicherheit dieser PKI ab. Zilp-Zalp ist darauf ausgelegt, mit existierenden PKI-Systemen zusammenarbeiten zu können.

## Grundideen

Gesundheitsämter besitzen individuelle asymmetrische Schlüsselpaare zur Signierung von Daten, sowie ein geteiltes Schlüsselpaar zur Ver- & Entschlüsselung von Daten.
Diese werden von einem oder mehreren Root-Zertifikaten signiert, welche den Backend-Servern als Vertrauensanker dienen.
Um das Gesamtsystem möglichst robust gegenüber dem Verlust von Schlüsseln zu machen, sollten folgende Maßnahmen beachtet werden:

* Die Anwendbarkeit und Macht von individuellen Schlüsseln sollte räumlich und zeitlich möglichst stark beschränkt werden.
* Private Schlüssel sollten nur vor Ort generiert und nicht "bewegt" werden.

## Notwendige Schlüssel

Zilp-Zalp benötigt im Betrieb folgende Schlüsselpaare:

* Ein oder mehrere Root-Zertifikate, die als Vertrauensanker dienen.
* Für jedes Gesundheitsamt einen oder mehrere Schlüsselpaare (GA-Schlüssel) für das Signieren von Anfragen an die Backend-Server.
* Für die globale Verschlüsselung von Besuchsdaten teilen alle Gesundheitsämter einen GÄ-Datenschlüssel.
* Für eine Ombuds-Stelle ein asymmetrisches Schlüsselpaar mit dem Besuchsdaten zusätzlich verschlüsselt werden und das erlaubt, in Ausnahmefällen den Zugriff auf solche Daten ohne Mitwirkung eines Nutzers zu erreichen.

Root-Schlüsselpaare werden von einer vertrauenswürdigen Stelle generiert, die öffentlichen Schlüssel und Zertifikatsdetails werden im System verteilt und dienen allen Akteuren als Vertrauensanker.

GA-Signierschlüssel werden lokal generiert und von der vertrauenswürdigen Stelle über Signieranfragen (Certificate Signing Requests, CSR) signiert. Der gemeinsame GA-Datenschlüssel wird ebenfalls lokal generiert, signiert und anschließend über einen sicheren Kanal an einzelne GÄ verteilt. Er sollte regelmäßig gewechselt werden, hierzu ist ein "Key Agreement" Prozess zwischen den GÄs notwendig.

## Risiko-Analyse

Die folgenden Abschnitte beschreiben Risiken, die durch den Verlust von privaten Schlüsseln im System entstehen.

### Verlust eines privaten GÄ-Datenschlüssels

Erlangt ein Angreifer Zugang zu einem privaten GÄ-Datenschlüssel, kann er die äußere Entschlüsselung von Kontaktdaten eines Nutzers entfernen.
Er kann diese Daten jedoch nur unter Zuhilfenahme des Schlüssel $K _ a$ entschlüsseln, dieser muss vom Nutzer bereitgestellt oder über die Besuchsdaten des Nutzers ermittelt werden.
Besuchsdaten können nur unter Zuhilfenahme eines Gruppenschlüssels entschlüsselt werden, ein solcher wiederum kann nur durch Mitwirkung eines Nutzers oder im Rahmen des Ombuds-Prozesses durch Mitwirkung der Ombuds-Stelle sowie eines Betreibers erlangt werden.
Der Verlust eines privaten GÄ-Datenschlüssels führt somit nur zu einem sehr geringen Risiko der Enschlüsselung personenbezogener Daten, zumindest wenn es dem Angreifer nicht ebenfalls gelingt, weitere Schlüssel zu erlangen.
Da diese weiteren Schlüssel dezentral verwahrt und nur mit manueller Beteiligung einzelner Akteure erlangt werden können ist die Hürde zur Erlangung für den Angreifer sehr hoch.

### Verlust eines privaten GÄ-Signierschlüssels

Erlangt ein Angreifer Zugang zu einem privaten GÄ-Signierschlüssel, kann er sich hiermit gegenüber einem Backend-Server authentifizieren, Daten von dort abrufen und missbräuchliche Anfragen stellen. Er kann jedoch ohne Kenntnis von $I _ D$ Werten keine (verschlüsselten) Kontaktdaten von Backend-Servern abfragen. Um an solche $I _ D$ Werte zu gelangen, kann er Anfragen zu Besuchsdaten stellen.
Hierfür ist jedoch ebenfalls das Vorliegen eines (sich unter Kontrolle von Nutzern befindlichen) GA-Datenpakets nötig, oder eines entschlüsselten Besuchsdatenpaket nötig.
Wie oben erläutert ist die systematische Erlangung dieser Informationen mit hohen Hürden für den Angreifer verbunden.

### Verlust eines privaten Root-Zertifikatschlüssels

Erlangt ein Angreifer Zugang zu einem privaten Root-Zertifikatschlüssel, kann er selbst eigene Schlüsselpaare signieren und diese gegenüber allen Akteuren als vertauenswürdig erscheinen lassen. Er kann damit Backend-Server dazu veranlassen, Anfragen zu Besuchsdaten zu stellen oder Daten von diesen abrufen.
Da zum Abruf von Daten jedoch zusätzliche Geheimwerte notwendig sind und ein Abruf spezifischer Informationen (z.B. Kontaktdaten) nur bei Vorliegen entsprechender Identifikationsmerkmale (z.b. $I _ D$) möglich wird, ist die Hürde für den Angreifer auch hier sehr hoch.

### Kompromittierung von Systemkomponenten

In beiden oben genannten Szenarien wird davon ausgegangen, dass der Angreifer lediglich Zugang zu Schlüsselmaterial erhalten hat, jedoch abgesehen hiervon keine Systemkomponenten kompromittiert hat. Diese Szenarien werden ausführlicher in der [Risiko-Analyse]({{'analyses.risks'|href}}) beschrieben und bleiben hier daher außen vor.