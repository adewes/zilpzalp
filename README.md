# Zilp-Zalp - Dezentrale Kontaktnachverfolgung.

<!--<img src="/materials/images/zilp-zalp.jpg" alt="Zilp-Zalp - Logo" title="Zilp-Zalp - Logo" width="40%" />-->

**Disclaimer**: *Dies ist ein erster, grober Entwurf des Design-Dokuments. Weitere Details folgen in den kommenden Tagen und Wochen.*

Dies ist das Design-Dokument von **Zilp-Zalp**, einem System zur Kontaktnachverfolgung das mit Methoden des **Privacy & Security Engineering** entworfen wurde. Das Design ist als Gegenentwurf zu zentralisierten Systemen wie **Luca** gedacht und soll zeigen, dass viele Design-Entscheidungen in diesen Systemen mehr von kommerziellen Interessen als von **Privacy & Security By Design** getrieben sind, und für eine effektive Kontaktnachverfolgung nicht notwendig sind.

(wir benutzen aktuell das generische Maskulinum, der Text wird aber in Kürze überarbeitet um genderneutral zu sein)

# Motivation

Warum Zilp-Zalp? Obwohl es vielleicht zu spät ist um die Diskussion um Kontaktnachverfolgungs-Apps in die richtige Richtung zu lenken ist es wichtig zu zeigen, dass viele Aussagen der Luca-Macher vielfach faktisch falsch sind.

Das Konzept ist folgt angewandten Best-Practices im **Privacy Engineering** und soll zeigen, wie man privatsphäre-freundliche Systeme kollaborativ und offen entwickeln kann.

## Problemstellung

Zilp-Zalp soll folgendes Problem lösen:

* Die Nachverfolgung von Kontakten zur Eindämmung von Covid-19, in Übereinstimmung mit der Corona-Verordnung des Bundes sowie den entsprechenden Landes-Verordnungen.

## Anforderungen

Um den gesetzlichen Anforderungen genüge zu tun, müssen Betreiber von **Ortschaften** (Gaststätten, Kinos, Fitnessstudios etc.) Gästelisten führen, die bei Bedarf dem zuständigen Gesundheitsamt zur Verfügung gestellt werden müssen. Diese Gästelisten müssen erlauben zu rekonstruieren, welche potentiellen Kontakte ein infizierter Gast im Rahmen des Besuchs einer **Ortschaft** hatte. Das Gesundheitsamt nutzt diese Daten dann, um diese Kontakte zu warnen und ggf. zu einem Covid-19 Test oder häuslicher Quarantäne aufzufordern.

## Notwendige Arbeitsabläufe

Folgende Arbeitsabläufe müssen von Zilp-Zalp unterstützt werden, um eine Kontaktnachverfolgung zu gewährleisten:

* Erfassung eines **Check-Ins** in einer **Ortschaft** (sowie des zugehörigen **Check-Outs**). Hierzu müssen ein **Nutzer** und ein **Betreiber** kooperieren um die Anwesenheit des **Nutzers** in der **Ortschaft** des **Betreibers** zu dokumentieren. Gesetzlich muss ein möglichst genauer Aufenthaltsort sowie die Zeit des Aufenthalts dokumentiert werden. Durch die **Check-Ins/Check-Outs** eines **Nutzers** entsteht ein **Kontakttagebuch**, das später dem **Gesundheitsamt** die Kontaktnachverfolgung ermöglicht.
* Bereitstellung des **Kontakttagebuchs** eines **Nutzers** an das **Gesundheitsamt** zum Zweck der Kontaktnachverfolgung.
* Bereitstellung aller Kontaktdaten von **Nutzern** die in verschiedenen **Ortschaften** einen möglichen Risikokontakt mit einem infizierten **Nutzer** hatten an ein zuständiges **Gesundheitsamt**. Optional Information dieser Nutzer über einen möglichen Risikokontakt. 

## Komponenten des Systems & zentrale Abläufe

Die erforderlichen Arbeitsabläufe können auf unterschiedlichen Wegen umgesetzt werden. Bisher werden hierzu papierbasierte Listen eingesetzt, die jedoch einige Nachteile aufweisen, wie z.B. hoher manueller Erstellungsaufwand und Datenschutzrisiken.

**Zilp-Zalp** hat folgende Systemkomponenten (wir kommen später auf die mit diesen Komponenten verbundenen Risiken und Strategien zu derer Minimierung):

### Web-Anwendung für **Nutzer**

Um als **Nutzer** ein Kontakttagebuch zu führen nutzen andere Systeme wie *Luca* und *Recover* Smartphone-Apps. Dies hat jedoch verschiedene Nachteile wie z.B. Zentralisierung, möglicher Feature Creep und Deployment-Komplexität. Zilp-Zalp hingegen nutzt eine einfache Web-Anwendung, die vollständig lokal arbeitet und auf kein zentrales Backend angewiesen ist. Diese Anwendung kann über eine (oder mehrere) vertrauenswürdige URL(s) verteilt werden und ohne Installation genutzt werden. Es können auch lokal unterschiedliche Varianten der Web-Anwendung verbreitet werden um z.B. regional spezifische Anforderungen bei der Kontaktnachverfolgung umzusetzen. Die Web-Anwendung ist wie alle Komponenten open-source, der Quelltext kann von jedem Nutzer inspiziert werden und es wird nicht wie bei Smartphone-Apps ein Binärpaket ausgeliefert, das nicht oder nur schwer dem Ursprungs-Code zugeordnet werden kann.

**Nutzer** können diese Web-Anwendung einfach über eine URL in ihrem Browser öffnen. Es ist vorstellbar, dass eine öffentliche Stelle wie das RKI diese Web-Anwendung unter einer offiziellen Domain hostet. Zur Nutzung der Anwendung reicht es aus, die URL manuell einzugeben oder z.B. von einem QR-Code zu scannen, der in Restaurants und anderen Lokalitäten ausgehängt werden kann.

Zur Speicherung von Kontaktdaten nutzt die Web-App bestehende Browser-Mechanismen wie **IndexDB** oder **localStorage**. Diese können Daten für mindestens zwei Wochen speichern und erfüllen damit die gesetzlichen Anforderungen an die Dauerhaftigkeit eines Kontakttagebuchs. Um die Speicherdauer zu verlängern kann die App auf Mobilgeräten auch als "progressive Web-Anwendungen" betrieben werden, hierbei wird die App lokal "installiert" und kann u.a. eine längere Speicherung von Daten durchführen (unter voller Kontrolle des Nutzers).

Beim ersten Öffnen der Web-App wird der Nutzer aufgefordert, seine Kontaktdaten (Name, Anschrift, Telefonnummer etc.) anzugeben. Diese werden anschließend lokal gespeichert. Zur Verifikation einzelner Daten wie z.B. der Telefonnummer können hierbei auch externe Systeme zum Einsatz kommen. Die Belegung der Echtheit von Daten kann hierbei kryptographisch erfolgen, ohne dass eine zentrale Speicherung oder Erfassung dieser Verifikationen notwendig ist (Details folgen). Generell wird jedoch auch bei anderen Apps auf Eigenverantwortung von Nutzern gesetzt, Daten werden nur bedingt oder nicht verifiziert. Im vorliegenden System ist eine Verifikation zudem weniger relevant da die Missbrauchsmöglichkeiten z.B. durch das Verhindern unechter Check-Ins deutlich beschränkter sind.

Die Web-App generiert anschließend einen QR-Code, der die verschlüsselten Kontaktdaten des Nutzers enthält, sowie einen gemeinsam mit diesen Daten verschlüsselten Zufallswert, der nur lokal gespeichert wird und vom Gesundheitsamt veröffentlicht werden kann um dem Nutzer über einen möglichen Risikokontakt zu warnen. Die Daten werden mit einem öffentlichen "Gesundheitsämter-Schlüssel" (GÄ-Schlüssel) verschlüsselt, der von diesen täglich rotiert wird und über eine öffentliche, vertrauenswürdige URL (oder z.B. die Zilp-Zalp API) verteilt wird. Die Gesundheitsämter besitzen den zugehörigen privaten Schlüssel, mit dem die Daten entschlüsselt werden können.

Für Nutzer, die keine Web-Anwendungen nutzen können da sie kein Smartphone besitzen oder schlicht keine App nutzen wollen kann alternativ ein komplett papierbasierter Onboarding-Ablauf implementiert werden (siehe unten).

### Web-Anwendung für **Betreiber**

Ähnlich zum **Nutzer** nutzen auch **Betreiber** eine Web-Anwendung, um Gästelisten zu verwalten. Diese können sie ebenfalls von einer vertrauenswürdigen URL beziehen und lokal im Browser ausführen. Die Datenhaltung geschieht ebenfalls lokal über Web-Speichertechnologien wie IndexDB oder localStorage.

Eine Registrierung oder die zentrale Speicherung von Daten zur Örtlichkeit ist **nicht** erforderlich. Der Betreiber muss jedoch lokal grundlegende Daten zur Ortschaft angeben, die dem **Gesundheitsamt** als Informationen zur Bewertung der Risikokontakte zur Verfügung gestellt werden. Diese Informationen werden nur im Falle einer Kontaktnachverfolgung verschlüsselt an das Gesundheitsamt übermittelt. Zudem erstellt der Betreiber z.B. täglich ein asymmetrisches Schlüsselpaar.

Um einen Nutzer einzuchecken scannt die Web-Anwendung des Betreibers zunächst den QR-Code des Nutzers. Anschließend wird für den Check-In ein Datenpaket erzeugt, das den öffentlichen Schlüssel des Betreibers enthält sowie die Daten zum Check-In. Diese Informationen werden wiederum in einen QR-Code kodiert, welchen die Web-Anwendung des Nutzers scannt. Beide Anwendungen speichern die Daten lokal in ihren jeweiligen Datenbanken.

Der Check-Out erfolgt analog, wobei die Check-In Daten referenziert werden und sowohl der Betreiber als auch der Nutzer ihre Datenpakete und Metadaten aktualisieren.

## Web-Anwendung für **Gesundheitsämter**

Gesundheitsämter nutzen zur Kontaktnachverfolgung ebenfalls eine Web-Anwendung. Infizierte Nutzer schicken den Gesundheitsämtern hierzu über die Zilpzalp-API (oder einen anderen Kommunikationskanal) die verschlüsselten Check-In/Check-Out Daten, die sie von Betreibern erhalten haben und die in ihrer Web-Anwendung gespeichert sind. Die Daten werden wiederum mit dem öffentlichen Schlüssel der Gesundheitsämter verschlüsselt. Das zuständige Gesundheitsamt kann die Daten von der API authentifiziert abrufen.

Die Web-Anwendung des Gesundheitsamts entschlüsselt die Daten und erhält eine Liste von Check-In/Check-Out Zeiten sowie den öffentlichen (Tages-)Schlüssel von den betroffenen Ortschaften. Die Anwendung erstellt nun anhand der Liste verschlüsselte Anfragen zur Übermittlung von Kontaktdaten an die jeweiligen Betreiber, die mit der ID des jeweiligen Betreiber-Schlüssels verknüpft und über die Zilpzalp-API veröffentlicht werden. Diese Anfragen enthalten auch den öffentlichen Schlüssel eines für die jeweilige Anfrage zufallsgenerierten Schlüsselpaares, über den die Betreiber die zu übermittelnden Daten vor der Übertragung verschlüsseln. Die Web-Anwendung eines Betreibers ruft diese Liste regelmäßig ab und gleicht die Schlüssel-IDs mit den eigenen Schlüsseln ab. Findet die Anwendung eine Übereinstimmung, wird die Anfrage entschlüsselt, die geforderten Check-In/Check-Out Daten extrahiert und mit dem in der Anfrage enthaltenen öffentlichen Schlüssel des Gesundheitsamts verschlüsselt und über die Zilpzalp-API an dieses übertragen.

Die Web-Anwendungen der Gesundheitsämter können wiederum die übermittelten Daten über die API abrufen, einer Anfrage zuordnen mit den beiden privaten Schlüsseln (Anfrage-Schlüssel und GÄ-Schlüssel) entschlüsseln und zur Kontaktnachverfolgung nutzen. Die zur Übermittlung eingesetzte API kann die Daten damit zu keinem Zeitpunkt entschlüsseln und kann zudem nur sehr wenige Meta-Daten über diese ableiten. Eine Kompromittierung der API führt daher nicht zur Kompromittierung des Gesamtsystems (unter der Annahme, dass alle Anfragen der Gesundheitsämter authentifiziert sind und von den Betreibern entsprechend geprüft werden).

## Papierbasierter Check-In

Alternativ zur Web-Anwendung für Nutzer bietet Zilp-Zalp auch einen komplett analogen Check-In Ablauf, der papiergestützt funktioniert. Dieser erfordert lediglich, einmalig mithilfe einer Web-Anwendung und einem Drucker einen Ausdruck zu erzeugen, der einen QR-Code enthält welcher wie bei der Web-App verschlüsselt die Daten des Nutzers enthält. Dieser kann von Nutzer dann eingesetzt werden um in einer Ortschaft einzuchecken. Die Check-In/Check-Out Zeiten werden einfach auf dem Blatt aufgeschrieben. Zusätzlich schreibt der Nutzer einen kurzen Zufallswert auf, der von der Web-Anwendung des Betreibers generiert wird und von diesem mit dem Check-In/Check-Out assoziiert wird. Im Falle einer Infektion kann der Zettel an das zuständige Gesundheitsamt übermittelt werden. Das Gesundheitsamt veröffentlicht dann die Zufallswerte als Anfrage, welche dann von den Web-Anwendungen der Betreiber über die API abgerufen und abgeglichen werden. Finden diese passende Check-Ins, übermitteln sie diese wiederum verschlüsselt an das zuständige Gesundheitsamt. Dies exponiert im Gegensatz zum App-basierten Ablauf etwas mehr Meta-Daten, da es den Betreibern u.a. die Zuordnung von Anfragen zu einzelnen Gästen ermöglicht und die von den Gesundheitsämtern abgefragten Zeiten öffentlich macht. Es ermöglicht jedoch nicht die Zuordnung von Abfragen zu einzelnen Ortschaften.

## Öffentliche API zur Datenübermittlung

**Zilp-Zalp** benötigt zur Kommunikation zwischen den Gesundheitsämtern, Nutzern und Betreibern verschiedene Schnittstellen:

* Gesundheitsämter müssen die Möglichkeit haben, mit Check-Ins/Check-Outs verbundene Betreiber-Schlüssel zusammen mit Anfragen zu veröffentlichen um Betreiber aufzufordern, die zugehörigen Kontaktdaten zu übermitteln.
* Betrieber müssen die Möglichkeit haben, verschlüsselte Daten an Gesundheitsämter zu übermitteln.
* Nutzer müssen die Möglichkeit haben, ihre mit Check-Ins verbundenen Daten an Gesundheitsämter zu übermitteln.

Um diese Funktionalität umzusetzen kann eine einfache REST-API zur Verfügung gestellt werden, mit folgenden Endpunkten:

* `/location-requests`: Erhält eine öffentliche Liste von Zufallswerten, die von Gesundheitsämtern von Betreibern angefordert werden.
* `/location-uploads`: Erlaubt den Upload von Kontaktdaten durch Betreiber an die Gesundheitsämter zur Kontaktnachverfolgung.
* `/checkin-uploads`: Erlaubt den Upload von Check-In/Check-Out Daten durch Nutzer an die Gesundheitsämter zur Kontaktnachverfolgung.

Diese Endpunkte müssen gegen Missbrauch und den Upload manipulierter/gefälschter Daten geschützt werden, Details hierzu folgen.

## Private API für Gesundheitsämter

Zusätzlich benötigt Zilp-Zalp eine private API für Gesundheitsämter, über die diese verschlüsselte/anonyme Anfragen veröffentlichen und von Betreibern sowie Nutzern bereitgestellte Daten abrufen können.

## Generelle Annahmen

Neben Verschlüsselung ist auch die Authentizität der insbesondere von Gesundheitsämtern veröffentlichten Anfragen zu garantieren. Hierfür wird angenommen, dass diese über öffentlich verifizierbare Schlüsselpaare zum Signieren von Daten verfügen. Da andere Akteure nicht zentral verwaltet werden kann für die von diesen übertragenen Daten keine Authentizität garantiert werden. Auf sich hieraus ergebende mögliche Risiken wird in einer Sicherheitsanalyse eingegangen.

# Vorteile gegenüber Luca

**Zilp-Zalp** hat eine Reihe von Vorteilen gegenüber dem Luca-System:

* Es werden nicht indiskriminiert Check-In Daten zentral erfasst und gespeichert.
* Das System benötigt keine zentrale Stelle, der einzelne Akteure ungeprüft vertrauen müssen.
* Das System ist sehr einfach zu betreiben und zu warten.
* Das System erlaubt Check-Ins ohne Internet-Konnektivität.
* Das System erfordert keine Installation von Anwendungen oder Apps.
* Das System erfordert keine Registrierung von Betreibern oder Nutzern. 
* Das System kann nicht durch einen zentralen Akteur "gekapert" und für andere Zwecke missbraucht werden.
* Alle lokalen Systemkomponenten können von jedem Akteur jederzeit inspiziert werden, es werden keine Binärartefakte benötigt.

# Mögliche Nachteile gegenüber Luca

**Zilp-Zalp** bietet alle Funktionalität die für die Nachverfolgung von Kontakten gemäß der Corona-Verordnung notwendig ist. Gegenüber Luca weist das System einige Unterschiede auf, die eventuell als Nachteile ausgelegt werden könnten (die aber aus unserer Sicht keine Nachteile darstellen):

* **Manueller Check-In**: Im Gegensatz zu Luca erlaubt **Zilp-Zalp** keine automatisierten Check-Ins, d.h. solche ohne Beteiligung des Betreibers. Dies ist aus unserer Sicht jedoch ein Vorteil da es sich gezeigt hat, dass automatische Check-Ins ohne Zutun des Betreibers einfach missbraucht werden können und zudem die Genauigkeit der Kontaktdaten stark reduzieren.
* **Zeitverzögerung bei Kontaktdaten-Upload**: Da Zilp-Zalp dezentral funktioniert, kann die Übertragung von Kontaktdaten eventuell etwas langsamer sein als bei Systemen wie Luca. Da jedoch auch bei Luca eine manuelle Freigabe von Kontaktdaten durch Betreiber vorgesehen ist, sollte dies in der Praxis keine Rolle spielen.
* **Dezentrale Datenhaltung**: Zilp-Zalp speichert Daten dezentral, dementsprechend ist das Verlustrisiko gegenüber einem System wie Luca höher. Da jedoch von Betreibern nur verschlüsselte Daten gespeichert werden und zudem auch Luca Abhängigkeiten von lokal gespeicherten Daten (z.B. privaten Schlüsseln von Betreibern) hat, ist die dezentrale Datenhaltung aus unserer Sicht nicht problematischer und hat sogar viele Vorteile (geringere Aufwände im Backend, geringeres Risiko eines Totalverlusts von Daten).
* **Web-Anwendungen statt Apps**: Apps bieten verschiedene Vorteile wie z.B. eine unlimitierte Speicherdauer und privilegierten Zugriff auf Systemfunktionen wie Kameras oder Adressbücher. Zusätzlich können sie einfacher asynchrone Funktionalitäten wie z.B. regelmäßige Prüfungen durchführen. Viele dieser Funktionalitäten lassen sich jedoch auch mit Web-Anwendungen realisieren, so können z.B. Service-Worker genutzt werden um regelmäßig Daten zu prüfen und Nutzer über Risikokontake zu warnen.

# Mögliche Varianten und Erweiterungen

Zilp-Zalp kann wie andere Systeme auch auf Apps zurückgreifen um Kontaktdaten zu übermitteln, wir halten dies jedoch für unnötig und teilweise schädlich. Zilp-Zalp kann bestehende Infrastruktur, z.B. Schlüsselpaare wie sie von Luca generiert werden für Gesundheitsämter nutzen um den Datenaustausch zu ermöglichen, der Wechsel von Luca zu Zilp-Zalp sollte daher sowohl für Gesundheitsämter als auch für Betreiber sowie Nutzer sehr einfach sein.

Da Zilp-Zalp einen validierten Check-In/Check-Out Ablauf nutzt ist es eventuell sinnvoll, über eine Alternative zur Nutzung von QR-Codes nachzudenken um die bidirektionale Kommunikation zwischen Betreiber-Anwendung und Nutzer-Anwendung zu erleichtern. Hierfür kommen u.a. Audio-/Video-Kanäle oder Technologien wie Bluetooth in Frage, wobei fraglich ist ob letztere einfach angebunden werden könnte. Auch die Bereitstellung eines API-Endpunkt in einem lokalen WLAN eines Betreibers wäre möglich, jedoch mit zusätzlichem Aufwand verbunden, der für viele Betriebe unverhältnismäßig sein könnte.

# Weitere Schritte

Dies ist ein erstes, grobes Design-Konzept das verdeutlichen soll, dass viele Komponenten des Luca-Systems nicht notwendig sind und nur existieren um als Grundlage eines kommerziellen Geschäftsmodells zu dienen.

In den kommenden Tagen wird an dieser Stelle das Konzept von **Zilp-Zalp** komplett ausgearbeitet werden, um die Sicherheit und die Privatsphäre-Eigenschaften zu beweisen. Sämtliche Arbeiten sollen öffentlich durchgeführt werden.

Eventuell werden einzelne Systemkomponenten anschließend als PoCs umgesetzt. Sämtliche Entwicklungsschritte sollen offen und nachvollziehbar hier auf Github erfolgen, Mitwirkung ist höchst willkommen. Alle Software-Bestandteile des Systems sollen unter BSD-3 Lizenz veröffentlicht werden, alle Nicht-Software-Bestandteile unter einer Creative-Commons (CC) NC-Lizenz.
