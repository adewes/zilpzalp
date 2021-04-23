# Protokolle

Hier beschreiben wir die Protokolle, die Zilp-Zalp für den Austausch von Kontaktdaten zur Infektionsverfolgung unterstützt. Wir formulieren zunächst die Anforderungen an ein generelles Protokoll zum Austausch von Kontaktdaten und diskutieren darauf aufbauend mögliche Protokollvarianten.

## Anforderungen

Wir legen folgende funktionale Anforderungen zugrunde:

* **Nutzer** sollen gegenüber **Betreibern** einen **Besuch** in deren **Ortschaften** dokumentieren können. Die Dokumentation soll es mittelbar **Gesundheitsämtern** ermöglichen, mögliche Infektionsketten durch die Auswertung von Kontaktdaten nachzuverfolgen und mit betroffenen Personen in Kontakt zu treten.
* Die Dokumentation eines **Besuchs** soll möglichst genau sein und soweit möglich und sinnvoll Angaben zum genauen Aufenthaltsort, Kontaktpersonen und Besuchszeiten enthalten.

Zusätzlich legen wir folgende Sicherheits- & Datenschutzanforderungen zugrunde:

* Die Erfassung, Speicherung und Verarbeitung der **Kontaktdaten** und **Besuchshistorien** einzelner **Nutzer** soll möglichst datensparsam und privatsphärefreundlich erfolgen.
* Lediglich **Gesundheitsämter** sollen **anlassbezogen** in der Lage sein, Kontaktdaten einzusehen, und dies nur mit Mitwirkung eines betroffenen **Nutzers** sowie eines **Betreibers**.

## Protokolle

Ausgehend von diesen Anforderungen wurden Protokolle entwickelt, die diese umsetzen. Hierbei wurde zunächst eine [papiergestütztes Protokoll]({{'protocols.paper-based'|href}}) entwickelt, dass barrierefrei für den Nutzer ohne technologische Hilfsmittel wie Apps und Smartphones nutzbar ist. Darauf aufbauend wurde ein [digitales Protokoll]({{'protocols.digital'|href}}) formuliert, das die Dokumentation von Besuchshistorien mithilfe einer Web-Anwendung ermöglicht.

## Abwägungen

Generell muss bei der Kontaktnachverfolgung Datenschutz gegenüber anderen Interessen abgewogen werden. Da diese Abwägung lokal unterschiedlich ausfallen kann, bietet Zilp-Zalp unterschiedliche Implementierungsmöglichkeiten.

### Zentrale vs. dezentrale Speicherung von Besuchsdaten

Generell erfolgt die Speicherung von Besuchsdaten im Zilp-Zalp System dezentral bei Betreibern von Örtlichkeiten.
Um eine sichere Speicherung und Verarbeitung der Daten zu garantieren ist jedoch erfordlich, dass Betreiber ein lokale Anwendung installieren und betreiben, sowie über zuverlässige Internet-Konnektivität verfügen (nicht zwangsweise permanent und direkt am Ort des Besuchs).
Da ab Zilp-Zalp Protokollversion `0.4` Besuchsdaten mit den Gruppenschlüsseln von Infektionsgemeinschaften verschlüsselt werden, können die zugehörigen Daten im Gegensatz zu anderen Systemen auch bei konspirativer Zusammenarbeit zwischen dem Backend-Betreiber und Gesundheitsämtern nicht ohne Mitwirkung von zumindest einem Nutzer aus der relevanten Gemeinschaft entschlüsselt werden.
Dementsprechend kann prinzipiell auch eine zentrale Speicherung dieser verschlüsselten Daten in Betracht gezogen werden, um die Datenverfügbarkeit und Zuverlässigkeit der Verarbeitung zu erhöhen.
Betreiber können in diesem Fall weiterhin über eine Datennutzung informiert werden, die Kontrolle der Datenverarbeitung obliegt jedoch dem betroffenen Nutzer.
Eine zentrale Speicherung senkt hierbei auch die technischen Anforderungen an Betreibern von Öffentlichkeiten, da Daten nur über einen kurzen Zeitraum lokal gespeichert werden müssen.

### Nachgelagerte vs. direkte Kontaktdatenhinterlegung

Prinzipiell kann die Initialisierung von Zilp-Zalp für Nutzer ohne Involvierung des Backends stattfinden.
Nutzer können hierbei QR-Codes generieren und die zugehörige ID lokal generieren.
Kontaktdaten können dann über einen zusätzlichen Mechanismus im Bedarfsfall nachgereicht werden.
Dies schafft den bestmöglichen Schutz der Privatsphäre von Nutzern, kann jedoch die Kontaktnachverfolgung durch Gesundheitsämter erschweren.
Nutzer können eventuell auch nur pseudonyme Kontaktdaten angeben (z.B. eine E-Mail Adresse) und im Falle einer Kontakdatenanfrage aufgerfordert werden, ihre Daten zu vervollständigen.
Dies kann ggf. zu einer höheren Akzeptanz des Systems führen, da das Risiko des Verlusts personenbezogener Daten geringer ausfällt.
Wiederum ist dies jedoch mit einem höheren Aufwand und einer eventuellen Verzögerung bei der Kontaktnachverfolgung verbunden.