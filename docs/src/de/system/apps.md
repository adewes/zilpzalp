# Anwendungen

Zilp-Zalp stellt verschiedene Anwendungen für Nutzer, Betreiber von Ortschaften und Gesundheitsämter zur Verfügung, die hier beschrieben werden.

## Nutzer-Anwendung

Nutzer müssen lediglich initial QR-Codes generieren, hierzu können sie eine Web-Anwendung nutzen. Diese Anwendung erstellt das Schlüsselmaterial für Nutzer und stellt ihnen ihre geheimen Daten zur Verfügung. Die Anwendung speichert keine langlebigen Daten und wird nur zur Initialisierung sowie eventuell zur einmaligen Übermittlung von Daten an ein Gesundheitsamt genutzt, dementsprechend kann sie als Web-Anwendung implementiert werden.

## Betreiber-Anwendung

Betreiber müssen Daten über Ihre Ortschaft(en) erfassen, QR-Codes von Nutzern einlesen und ggf. mit Metadaten versehen. Die Anwendung verschlüsselt Besuchsdaten über den im Protokoll beschriebenen Mechanismus und hinterlegt die verschlüsselten Daten auf einem oder mehreren Betreiber-Servern.

## Gesundheitsamt-Anwendung

Gesundheitsämter verarbeiten mit Zilp-Zalp hochsensible Daten und müssen zudem sicherheitskritische Schlüsselpaare verwalten.
Dementsprechend empfiehlt sich hier der Einsatz einer reinen Web-Anwendung nicht, da Daten und Schlüssel dort im Browser vorgehalten werden müssten.
Hierzu kann daher optional ein lokal deploybarer Server zum Einsatz kommen, der private Schlüssel speichert und die Datenverarbeitung übernimmt.

Alternativ kann Zilp-Zalp über einen anbieterübergreifenden Gateway an Gesundheitsämter angebunden werden.