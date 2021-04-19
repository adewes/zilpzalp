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

Ausgehend von diesen Anforderungen wurden Protokolle entwickelt, die diese umsetzen. Hierbei wurde zunächst eine [papiergestütztes Protokoll]({{'protocols.paper-based'|href}}) entwickelt, dass barrierefrei für den **Nutzer** ohne technologische Hilfsmittel wie Apps und Smartphones nutzbar ist.