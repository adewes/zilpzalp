# Überblick

Das Zilp-Zalp System besteht aus mehreren Komponenten, die unabhängig voneinander und ohne zentrale Koordination eingesetzt werden können. Gemeinsam bilden sie ein föderiertes, dezentrales System zur Kontaktnachverfolgung.

Das System verfügt über zwei Server-Typen:

* **Backend-Server** speichern verschlüsselte Kontaktdaten von Nutzern und optional verschlüsselte Nutzer-Einstellungen. Weiterhin kommunizieren sie mit Gesundheitsämtern um Hashwerte für die Kontaktnachverfolgung auszuschreiben, von Betreiber-Servern zu diesen Hashes zurückgegebene Besuchsdaten zwischenspeichern und diese dem anfragenden Gesundheitsämtern zur Verfügung stellen.
* **Betreiber-Server** speichern verschlüsselte Besuchsdaten von Betreibern von Ortschaften und optional verschlüsselte Betreiber-Einstellungen. Sie rufen ausgeschriebene Hashwerte von Backend-Servern ab und antworten auf diese Anfragen.

Zudem verfügt das System über mehrere Client-Anwendungen:

* Die **Nutzer-Anwendung** erlaubt die Initialisierung der Kontaktnachverfolgung für Nutzer.
* Die **Betreiber-Anwendung** erlaubt die Erfassung von Besuchsdaten durch Betreiber sowie die Übermittlung der Daten an einen oder mehrere **Betreiber-Server**.
* Die **Gesundheitsamt-Anwendung** erlaubt die Anfrage von Kontaktdaten durch Gesundheitsämter, den Abruf zurückgelieferter Daten sowie die Entschlüsselung und Weiterverarbeitung dieser Daten.

## Systemkonzept

Die Gestaltung der Komponenten zielt darauf ab, ein System zu erhalten das **redundant**, **dezentral**, **föderiert**, **resilient**, **sicher** und **privatsphäre-freundlich** ist. Dies wird über mehrere Aspekte erreicht:

### Dezentralität

Es gibt im Zilp-Zalp System keine zentrale Stelle, die den Betrieb des Gesamtsystems kontrolliert. Betreiber-Server und Backend-Server können unabhängig betrieben werden. Die funktionale Einbindung erfolgt über einen Vertrauensansatz im Rahmen eines "Web of Trust".

### Föderiertheit

Anbieter von Betreiber-Servern können selbst festlegen, mit welchen Backend-Servern sie kommunizieren, dies kann somit z.B. regional unterschiedlich ausgestaltet werden. Anbieter von Backend-Servern können ebenfalls selbst festlegen, mit welchen Betreiber-Servern sowie ggf. mit welchen Gesundheitsämtern sie eine Kommunikation zulassen. So kann leicht eine Bundesland-spezifische, föderierte Infrastruktur aufgebaut werden.

### Resilienz

Sowohl Backend-Server als auch Betreiber-Server können redundant ausgelegt werden, Daten können somit auf mehreren Servern gespeichert werden. Fällt ein einzelner Server aus, bleiben Daten so trotzdem abrufbar.

### Sicherheit

Backend- und Betreiber-Server speichern lediglich verschlüsselte Daten mit sehr wenigen Metadaten. Selbst eine vollständige Kompromittierung und ein kompletter Verlust aller Daten eines Servers führt nur zu einem sehr geringen Risiko, da Angreifer eine Reihe weiterer Informationen benötigen um Daten sinnvoll verwerten zu können. Auch die Manipulation eines Servers bietet Angreifern nur wenige Möglichkeiten, relevante Metadaten zu sammeln oder sensible Informationen zu extrahieren. Server speichern auch keine privaten Schlüssel-

### Privatsphäre-Freundlichkeit

Backend- noch Betreiber-Server haben nur in sehr geringem Maße Zugriff auf Metadaten, die Rückschlüsse auf personenbezogene oder sensible Informationen liefern können. Da keine direkte Kommunikation mit Nutzern stattfindet sind die Möglichkeit eines IP-basierten Profilings nicht gegeben. Besuchsdaten werden zudem strikt verschlüsselt gespeichert und können keinem spezifischen Betreiber zugeordnet werden, ein gezielter Abruf von Daten einzelner Ortschaften ist somit nicht möglich.
