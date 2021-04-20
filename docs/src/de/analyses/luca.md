# Analyse & Vergleich mit Luca

In diesem Dokument analysieren wir das [Luca](https://www.luca-app.de) System und vergleichen die dort getroffenen Entscheidungen mit denen die wir beim Entwurf des Zilp-Zalp Protokolls getroffen haben.

## Vergleich

Zilp-Zalp bietet gegenüber Luca aus unserer Sicht folgende Vorteile:

* Im Gegensatz zu Luca kann kein einzelner Akteur durch alleinige technische Manipulation von Systemkomponenten die Kontaktdaten eines Nutzers entschlüsseln oder die Besuchshistorie des Nutzers offenlegen.
* Da jeder Nutzer über eine Vielzahl von QR-Codes verfügt und diese nur unter Zuhilfenahme eines geheimen Schlüssel im Besitz des Nutzers sowie des GÄ-Schlüssels miteinander in Verbindung gebracht werden können ist es für einen Angreifer fast unmöglich, Besuchsdaten einzelner Nutzer miteinander zu korrelieren um z.B. Besuchshistorien zu erstellen.
* Ein Verlust von Besuchsdaten eines Betreibers oder selbst ein konspirativer Missbrauch des Systems durch verschiedene Betreiber führt nicht zu einem Verlust personenbezogener Daten oder der Offenlegung von Besuchshistorien einzelner Nutzer.
* Eine Kompromittierung des Backends macht einem Angreifer lediglich wenige, relativ unkritische Meta-Daten zugänglich. Das Backend speichert nur verschlüsselte Kontaktdaten und IDs, nicht jedoch wie z.B. das Luca-Backend komplette Besuchshistorien.
* Die Datenhaltung im Backend sowie der Kommunikationsaufwand ist sehr gering, nur im Falle einer Kontaktnachverfolgung sowie bei der Initialisierung werden Daten zwischen dem Backend und anderen Akteuren ausgetauscht. Die Dokumentation von Besuchen erfolgt dezentral und ohne Kommunikation mit dem Backend, es fallen daher bei Besuchen keine Meta-Daten an.
* Eine missbräuchliche Abfrage großer Datenmengen ist leicht zu entdecken. Da alle Anfragen über eine öffentliche Schnittstelle verfügbar gemacht werden ist von außen ersichtlich, wieviele Daten von Gesundheitsämtern abgefragt werden.
* Für die Dokumentation eines Besuchs ist keine Interaktion eines Nutzers mit einer Web-Anwendung oder einem Smartphone notwendig. Betreiber können Besuche auch asynchron erfassen und mit zusätzlichen Metadaten versehen. Der Aufwand zum Einlesen von QR-Codes ist gering, und die Aufbewahrung der Codes durch Betreiber stellt ein zusätzliches Backup zu den digitalen Daten dar und kann diesen auch als Nachweis der Erfüllung ihrer Dokumentationspflichten dienen.
* QR-Codes müssen nicht in Form von Schlüsselanhängern bezogen werden sondern können von Nutzern selbst dezentral erstellt und ausgedruckt werden. Betreiber oder andere Akteure können theoretisch auch vorgefertigte QR-Code Serien an Nutzer ausgeben, welche diese dann im Rahmen der Protokollerweiterung unten selbst mit ihren Daten verknüpfen. In anderen Konstellationen können pseudonyme QR-Codes ausgegeben werden um eine Kontaktnachverfolgung unter Beteiligung eines neutralen Dritten zu ermöglichen.
* Backends können föderiert und kooperativ betrieben werden, ebenso können Web-Anwendungen regional bereitgestellt und angepasst werden. Eine zentrale Datenhaltung ist nicht notwendig.
* Die Dokumentation von Besuchen ist technisch auch bei sehr großen Veranstaltungen ohne Internet-Konnektivität (z.B. Konzerten) problemlos möglich.
* Betreiber sind nicht auf eine ständige Internet-Verbindung angewiesen, sie können Besuchsdaten asynchron erfassen und z.B. täglich verarbeiten. Dies macht Zilp-Zalp auch für Ortschaften und Veranstaltungen nutzbar, die abseits einer funktionalen Internet-Infrastruktur liegen.
* Zilp-Zalp kann durch die optionale Validierung mithilfe von vertrauenswürdigen Dritten als einziges System die Schaffung valider Kontaktdaten garantieren.
* Zilp-Zalp ist als Open-Source Software lizensiert und kann einfach betrieben werden.
* Zilp-Zalp ist nicht profitorientiert und soll nicht privatwirtschaftlich betrieben werden, eine Weiternutzung zu kommerziellen Zwecken ist nicht geplant.

## Schwachstellenanalyse

In den folgenden Abschnitten beschreiben wir einige Schwachstellen des Designs des Luca-Systems und vergleichen sie mit dem Design von Zilp-Zalp. Dies ist keine abschließende Bewertung der Sicherheit des Luca-Systems. Es existiert vielmehr bereits eine Reihe vone externen Analysen[^1]. Diese Aufstellung ist nur ergänzend.

### Szenario: Kompromittierung des System-Betreibers

Gelingt es einem Angreifer die Luca-Infrastruktur (Backend, Apps) zu kompromittieren, oder modifiziert der Betreiber von Luca das System selbst, kann er problemlos alle Nutzerdaten extrahieren:

* Die Luca-App kann jederzeit auf alle geheimen Schlüssel eines Nutzers zugreifen, insbesondere auf das **data secret** sowie das **tracing secret**. Diese Informationen werden u.a. beim Transfer der Nutzerdaten für Gesundheitsämter in einem sogenannten "Guest Data Transfer Object" zusammengefasst.
* Durch Veränderung des App-Codes kann der Luca-Betreiber oder ein Angreifer diese dazu veranlassen, das **data secret** sowie das **tracing secret** ohne Nutzerinteraktion an das Backend zu übertragen. Mit diesem kann er die auf dem Backend hinterlegten Kontaktdaten des Nutzers entschlüsseln sowie die Besuchshistorie dieses Nutzers rekonstruieren.

Das Design des Systems entspricht somit aus unserer Sicht nicht dem gängigen Konzept einer Ende-zu-Ende Verschlüsselung, zumindest wenn man eines der Enden beim Nutzer sieht und das andere bei den Gesundheitsämtern. Eine echte Ende-zu-Ende Verschlüsselung würde den Luca-Betreiber als Intermediär betrachten, der kein besonderes Vertrauen im System genießt. Selbst bei vollständiger Kompromittierung dieses Intermediärs sollte es diesem nicht möglich sein, sensible Nutzerdaten zu entschlüsseln.

Das Risiko das durch eine Kompromittierung des System-Betreibers entsteht ist hierbei nicht unumgänglich und kann durch verschiedene Maßnahmen gemindert werden:

* Geheime Schlüssel sollten nicht in der Nutzer-App vorgehalten werden. Stattdessen sollte diese aus den geheimen Schlüsseln abzuleitende Daten einmalig bei der Initialisierung erstellen und diese anschließend vernichten. Das Luca-Protokoll ist hierauf jedoch nicht ausgelegt und müsste maßgeblich modifiziert werden, um ein solches Vorgehen zu unterstützen.
* Systemkomponenten wie Smartphone-Apps und Web-Anwendungen sollten nicht der Kontrolle eines einzelnen Akteurs unterliegen.
* Wenn die kontinuierliche Nutzung von geheimen Schlüsseln im Rahmen einer App unumgänglich ist, sollte geprüft werden ob Plattform-spezifische Mittel wie sichere Enklaven genutzt werden können um diese Schlüssel vor einer Extraktion zu schützen.
* Besuchshistorien sollten nicht zentral in einem Backend gespeichert werden.
* Nutzerdaten sollten nicht lediglich mit einem symmetrischen Schlüssel geschützt werden.

## Externe Analysen

Folgende externe Analysen des Luca-Systems sind uns bekannt:

[^1]: [Preliminary Analysis of Potential Harms in the Luca TracingSystem - Theresa Stadler et. al.](https://arxiv.org/pdf/2103.11958.pdf)
