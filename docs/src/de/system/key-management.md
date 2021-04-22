# Schlüsselmanagement

Zilp-Zalp nutzt eine Public-Key Infrastruktur (PKI) zur Verschlüsselung von Daten, zur Authentifizierung von Akteuren gegenüber dem Backend und zur Signierung von Anfragen, die veröffentlicht werden.

Die Sicherheit des Gesamtsystems hängt wie bei allen Systee entscheidend von der Sicherheit dieser PKI ab. Zilp-Zalp ist darauf ausgelegt, mit existierenden PKI-Systemen zusammenarbeiten zu können. Zu Demonstrationszwecken verfügt das System auch über eine eigene PKI, diese sollte jedoch bei einen realen Einsatz des Systems nach Möglichkeit ausgetauscht werden.

## Grundideen

Gesundheitsämter, Backend-Betreiber und ggf. Betreiber von Ortschaften besitzen jeweils einzelne asymmetrische Schlüsselpaare zur Ver-/Entschlüsselung und Signierung von Daten. Zusätzlich existieren eine oder mehrere Root-Schlüsselpaare, mit denen andere Schlüssel im System zertifiziert werden und die im Backend sowie den Web-Anwendungen als Vertrauensanker dienen.
Um das Gesamtsystem möglichst robust gegenüber dem Verlust von Schlüsseln zu machen, sollten folgende Maßnahmen beachtet werden:

* Die Anwendbarkeit und Macht von individuellen Schlüsseln sollte räumlich und zeitlich beschränkt werden.
* Private Schlüssel sollten nur vor Ort generiert und nicht "bewegt" werden.

## Notwendige Schlüssel

Zilp-Zalp benötigt im Betrieb folgende Schlüsselpaare:

* Für jede Backend-Instanz einen oder mehrere Root-Signaturschlüsselpaare, die andere Schlüssel im System zertifizieren und als Vertrauensanker dienen.
* Für jedes Gesundheitsamt einen oder mehrere Schlüsselpaare, jeweils für die Ver-/Entschlüsselung von Daten sowie für das Signieren von Daten.
* Optional für Betreiber ein oder mehrere Schlüsselpaare zum Signieren von Daten.

Root-Schlüssel werden 

## Risiko-Analyse

Die folgenden Abschnitte beschreiben Risiken, die durch den Verlust von privaten Schlüsseln im System entstehen.

### Verlust eines privaten GÄ-Datenschlüssels

Erlangt ein Angreifer Zugang zu einem privaten GÄ-Datenschlüssel, kann er hiermit sowohl die mit dem zugehörigen öffentlichen Schlüssel verschlüsselten Besuchsdaten entschlüsseln, als auch die äußere Entschlüsselung von Kontaktdaten eines Nutzers die mit dem öffentlichen Schlüssel verschlüsselt wurden entfernen.
Erlangt er Zugang zu Besuchsdaten von Betreibern, kann er hiermit die Besuchshistorie von Nutzern rekonstruieren.
Erlangt er für diese Besuchsdaten zusätzlich Zugang zu den im Backend gespeicherten Kontaktdaten, kann er diese ebenfalls komplett entschlüsseln (da sich der Schlüssel $K _ B$ in den Besuchsdaten befindet).

### Verlust eines privaten GÄ-Signierschlüssels

Erlangt ein Angreifer Zugang zu einem privaten GÄ-Signierschlüssel, kann er sich hiermit gegenüber dem Backend authentifizieren, Daten von dort abrufen und missbräuchliche Anfragen stellen. Er kann jedoch ohne Kenntnis von $I _ D$ Werten keine Kontaktdaten vom Backend abfragen. Um an solche $I _ D$ Werte zu gelangen, kann er Anfragen zu Besuchsdaten stellen. Hierfür ist jedoch ebenfalls das Vorliegen eines (sich unter Kontrolle von Nutzern befindlichen) GA-Datenpakets nötig. Um dieses zu entschlüsseln muss der Angreifer zusätzlich den zugehörigen privaten GÄ-Datenschlüssel besitzen.

### Verlust eines privaten Root-Signierschlüssels

Erlangt ein Angreifer Zugang zu einem privaten Root-Signierschlüssel, kann er selbst eigene Schlüsselpaare im System registrieren und diese gegenüber allen Akteuren als vertauenswürdig erscheinen lassen. Er kann damit z.B. Akteure veranlassen, Daten mit diesen Schlüsseln zu verschlüsseln und im System zu hinterlegen.

### Kompromittierung von Systemkomponenten

In beiden oben genannten Szenarien wird davon ausgegangen, dass der Angreifer lediglich Zugang zu Schlüsselmaterial erhalten hat, jedoch abgesehen hiervon keine Systemkomponenten kompromittiert hat. Diese Szenarien werden ausführlicher in der [Risiko-Analyse]({{'analyses.risks'|href}}) beschrieben und bleiben hier daher außen vor.