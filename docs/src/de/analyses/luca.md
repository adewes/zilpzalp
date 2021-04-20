# Analyse & Vergleich mit Luca

In diesem Dokument analysieren wir das [Luca](https://www.luca-app.de) System und vergleichen die dort getroffenen Entscheidungen mit denen die wir beim Entwurf des Zilp-Zalp Protokolls getroffen haben.

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
