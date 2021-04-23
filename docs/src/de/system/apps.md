# Anwendungen

Zilp-Zalp stellt verschiedene Anwendungen für Nutzer, Betreiber von Ortschaften und Gesundheitsämter zur Verfügung, die hier beschrieben werden.

## Nutzer-Anwendung

Nutzer müssen lediglich initial QR-Codes generieren, hierzu können sie eine Web-Anwendung nutzen. Diese Anwendung erstellt das Schlüsselmaterial für Nutzer und stellt ihnen ihre geheimen Daten zur Verfügung. Die Anwendung speichert keine langlebigen Daten und wird nur zur Initialisierung sowie eventuell zur einmaligen Übermittlung von Daten an ein Gesundheitsamt genutzt, dementsprechend kann sie als Web-Anwendung implementiert werden.

## Betreiber-Anwendung

Betreiber müssen Daten über Ihre Ortschaft(en) erfassen, QR-Codes von Nutzern einlesen und ggf. mit Metadaten versehen. Die Anwendung speichert Daten über einen längeren Zeitraum und wird häufiger genutzt, dementsprechend sollte sie nicht alleine auf Web-Technologien zurückgreifen da diese keine robuste langlebige Speicherung garantieren können. Dies kann jedoch andererseits eine einfache Nutzung durch Betreiber erschweren oder in bestimmten Fällen eine Nutzung generell unmöglich machen.

Aus diesem Grund wird die Betreiber-Anwendung in zwei Varianten angeboten, welche Daten jeweils im Browser speichern oder zur Speicherung auf eine externe API zurückgreifen können, die lokal deployed wird und eine SQLite-Datenbank zur Speicherung von Daten nutzt. Letztere Variante kann insbesondere für Betreiber größerer Ortschaften interessant sein, da hierdurch ein parallele und gleichzeitige Nutzung der Anwendung möglich wird. Demgegenüber steht jedoch ein höherer Betreiberaufwand.

## Gesundheitsamt-Anwendung

Gesundheitsämter verarbeiten mit Zilp-Zalp hochsensible Daten und müssen zudem sicherheitskritische Schlüsselpaare verwalten.
Dementsprechend verbietet sich hier der Einsatz einer reinen Web-Anwendung, die Daten und Schlüssel im Browser vorhalten müsste.
Daher kommt hier ebenfalls eine lokal deploybare API mit zugehöriger Web-Anwendung zum Einsatz, die Daten in einer SQLite-Datenbank speichert und über Mehrnutzerfähigkeit sowie lokale Authentifizierung verfügt.
Die API generiert und verwaltet hierbei auch kryptographische Schlüssel.
Dies verhindert die einfache Extraktion von Schlüsseln im Falle der Kompromittierung der Web-Anwendung.
