# Schlüsselmanagement

Zilp-Zalp nutzt eine Public-Key Infrastruktur (PKI) zur Verschlüsselung von Daten, zur Authentifizierung von Akteuren gegenüber dem Backend und zur Signierung von Anfragen, die veröffentlicht werden.

Die Sicherheit des Gesamtsystems hängt wie bei allen Systee entscheidend von der Sicherheit dieser PKI ab. Zilp-Zalp ist darauf ausgelegt, mit existierenden PKI-Systemen zusammenarbeiten zu können. Zu Demonstrationszwecken verfügt das System auch über eine eigene PKI, diese sollte jedoch bei einen realen Einsatz des Systems nach Möglichkeit ausgetauscht werden.

## Grundideen

Gesundheitsämter, Backend-Betreiber und ggf. Betreiber von Ortschaften besitzen jeweils einzelne asymmetrische Schlüsselpaare zur Ver-/Entschlüsselung und Signierung von Daten. Zusätzlich existieren eine oder mehrere Root-Schlüsselpaare, mit denen andere Schlüssel im System zertifiziert werden und die im Backend sowie den Web-Anwendungen als Vertrauensanker dienen.
Um das Gesamtsystem möglichst robust gegenüber dem Verlust von Schlüsseln zu machen, sollten folgende Maßnahmen beachtet werden:

* Die Anwendbarkeit und Macht von individuellen Schlüsseln sollte räumlich und zeitlich möglichst stark beschränkt werden.
* Private Schlüssel sollten nur vor Ort generiert und nicht "bewegt" werden.

## Notwendige Schlüssel

Zilp-Zalp benötigt im Betrieb folgende Schlüsselpaare:

* Für jede Backend-Instanz einen oder mehrere Root-Signaturschlüsselpaare, die andere Schlüssel im System zertifizieren und als Vertrauensanker dienen.
* Für jedes Gesundheitsamt einen oder mehrere Schlüsselpaare (GA-Schlüssel), jeweils für die Ver-/Entschlüsselung von Daten sowie für das Signieren von Daten.
* Für die globale Verschlüsselung von Besuchsdaten teilen alle Gesundheitsämter einen GÄ-Datenschlüssel.
* Optional für Betreiber ein oder mehrere Schlüsselpaare zum Signieren von Daten.

Root-Schlüsselpaare werden vom Betreiber des Backends generiert und regelmäßig ausgetauscht. Öffentliche Root-Schlüssel werden als Konfigurationsdateien mit den Web-Anwendungen ausgeliefert (um unabhängig vom Backend selbst zu sein).

GA-Schlüsselpaare werden lokal generiert, öffentliche Schlüssel werden über einen vertrauenswürdigen Kanal an den Backend-Betreiber geschickt, der diese signiert und im System hinterlegt.

GA-Schlüsselpaare können häufig rotiert werden, jedoch macht in der Praxis eine Rotation die schneller erfolgt als die durchschnittliche Datenverweildauer im System wenig Sinn, da GÄ während dieser Dauer in der Lage sein müssen, mit vorherigen GA-Schlüsseln verschlüsselte Daten zu entschlüssen, und die entsprechenden Schlüssel daher trotzdem gemeinsam am gleichen Ort vorgehalten werden müssen (für Signaturschlüssel gilt dies nicht).
In der Praxis können daher 2-4 Wochen jeweils sinnvolle Rotationszeiträume für Root- und GA-Schlüssel darstellen. Häufigere z.B. tägliche Schlüsselwechsel wie sie in anderen Systemen vorgeschlagen werden führen oft dazu, dass Schlüsselrotation automatisch abläuft (z.B. über API-Endpunkte im selben System, das Schlüssel publiziert), dies konterkariert zumindest in Teilen die Sicherheit eines solchen Austauschs.

Der GÄ-Schlüssel sollte häufig gewechselt werden, hierzu ist ein "Key Agreement" Prozess zwischen den GÄs notwendig. Dies kann erfolgen, indem ein GA anderen GÄ jeweils einen Zufallswert verschlüsselt über das Backend zur Verfügung stellt, dieser kann mit den öffentlichen Datenschlüsseln der GÄ verschlüsselt und vom sendenden GA zusätzlich signiert werden. Dieser Zufallswert wird anschließend lokal mit einem gemeinsamen, langlebigen Zufallswert kombiniert, aus dem resultierenden Wert wird dann deterministisch ein Schlüsselpaar abgeleitet. Der gemeinsame langlebige Zufallswert muss hierbei über einen anderen Kanal sicher geteilt werden, kann jedoch langlebig sein um den Aufwand gering zu halten. Durch die Verwendung eines Ableitungsmechanismus statt eines direkten Schlüsselaustauschs kann verhindert werden, dass ein privater Datenschlüssel im Falle der Kompromittierung eines GA-Datenschlüssels kompromittiert wird.

Um das Risiko eines Schlüsselverlusts weiter zu senken können zudem mehrere GA-Schlüssel zur Verschlüsselung von Daten verwendet werden. Dies würde es jedoch wiederum erforderlich machen, dass GÄ über das Backend "Amtshilfe" beim Entschlüsseln von Daten leisten. Aufgrund des großen Datenvolumns würde dies wirderum eine automatische Lösung erfordern, die hierbei wiederum eine Aufteilung der Schlüssel obsolet machen würde.

Generell besteht das Problem, dass in der Web-Anwendung der GÄ sowohl Signatur- als auch Datenschlüsselpaare vorliegen müssen. Aus Sicherheitsgründen wäre jedoch eine Trennung dieser Schlüssel sinnvoll. Dementsprechend sollte die Web-Anwendung eventuell aufgeteilt und über einen "Air-Gap" geschützt werden. Hierbei würde der öffentliche Teil den Signaturschlüssel besitzen, Anfragen an das Backend stellen und Daten empfangen. Der private Teil würde hingegen den Datenschlüssel besitzen, die empfangenen Daten entschlüsseln und bearbeiten. Ob eine solche Trennung sinnvoll ist muss abgewogen werden.

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