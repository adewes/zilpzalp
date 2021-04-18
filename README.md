# Zilp-Zalp - Dezentrale Kontaktnachverfolgung. Ohne App & ohne Rapper!

<!--<img src="/materials/images/zilp-zalp.jpg" alt="Zilp-Zalp - Logo" title="Zilp-Zalp - Logo" width="40%" />-->

**Disclaimer**: *Dies ist ein erster, grober Entwurf des Design-Dokuments. Weitere Details folgen in den kommenden Tagen und Wochen.*

Dies ist das Design-Dokument von **Zilp-Zalp**, einem System zur Kontaktnachverfolgung das mit Methoden des **Privacy & Security Engineering** entworfen wurde. Das Design ist als Gegenentwurf zu zentralisierten Systemen wie **Luca** gedacht und soll zeigen, dass viele Design-Entscheidungen in diesen Systemen mehr von kommerziellen Interessen als von **Privacy & Security By Design** getrieben sind, und für eine effektive Kontaktnachverfolgung nicht notwendig sind.

(wir benutzen aktuell das generische Maskulinum, der Text wird aber in Kürze überarbeitet um genderneutral zu sein)

# Motivation

Warum Zilp-Zalp? Obwohl es vielleicht zu spät ist um die Diskussion um Kontaktnachverfolgungs-Apps in die richtige Richtung zu lenken ist es wichtig zu zeigen, dass viele Aussagen der Luca-Macher einfach faktisch falsch sind, und dass Luca mit Sicherheit nicht "der sicherste mögliche Ansatz" zur Realisierung eines rechtskonformen Systems zur Kontaktnachverfolgung ist.

Es ist vermutlich unwahrscheinlich, dass Zilp-Zalp jemals in der Praxis eingesetzt werden wird (Walküren sind auch leider nicht mehr so populär wie Popstars). Das Konzept ist daher eher eine "einfache" Übung im angewandten **Privacy Engineering** mit der gezeigt werden soll, wie man privatsphäre-freundliche Systeme kollaborativ und offen entwickeln kann.

## Problemstellung

Zilp-Zalp soll folgendes Problem lösen:

* Die Nachverfolgung von Kontakten zur Eindämmung von Covid-19, in Übereinstimmung mit den Infektionsschutzverordnungen der Bundesländer.

## Anforderungen

Um den gesetzlichen Anforderungen genüge zu tun, müssen Betreiber von **Ortschaften** (Gaststätten, Kinos, Fitnessstudios etc.) Gästelisten führen, die bei Bedarf dem zuständigen Gesundheitsamt zur Verfügung gestellt werden müssen. Diese Gästelisten müssen erlauben zu rekonstruieren, welche potentiellen Kontakte ein infizierter Gast im Rahmen des Besuchs einer **Ortschaft** hatte. Das Gesundheitsamt nutzt diese Daten dann, um diese Kontakte zu warnen und ggf. zu einem Covid-19 Test oder häuslicher Quarantäne aufzufordern.

## Notwendige Arbeitsabläufe

Folgende Arbeitsabläufe müssen von Zilp-Zalp unterstützt werden, um eine Kontaktnachverfolgung zu gewährleisten:

* Erfassung eines **Check-Ins** in einer **Ortschaft**. Hierzu müssen ein **Nutzer** und ein **Betreiber** kooperieren um die Anwesenheit des **Nutzers** in der **Ortschaft** des **Betreibers** zu dokumentieren. Gesetzlich muss ein möglichst genauer Aufenthaltsort sowie die Zeit des Aufenthalts dokumentiert werden. Durch die **Check-Ins** eines **Nutzers** entsteht ein **Kontakttagebuch**, das später dem **Gesundheitsamt** die Kontaktnachverfolgung ermöglicht.
* Bereitstellung des **Kontakttagebuchs** eines **Nutzers** an das **Gesundheitsamt** zum Zweck der Kontaktnachverfolgung.
* Bereitstellung aller Kontaktdaten von **Nutzern** die in verschiedenen **Ortschaften** einen möglichen Risikokontakt mit einem infizierten **Nutzer** hatten an ein zuständiges **Gesundheitsamt**. Optional Information dieser Nutzer über einen möglichen Risikokontakt. 

## Komponenten des Systems & zentrale Abläufe

Die erforderlichen Arbeitsabläufe können auf unterschiedlichen Wegen umgesetzt werden. Bisher werden hierzu papierbasierte Listen eingesetzt, die jedoch einige Nachteile aufweisen, wie z.B. hoher manueller Erstellungsaufwand und Datenschutzrisiken.

**Zilp-Zalp** hat folgende Systemkomponenten (wir kommen später auf die mit diesen Komponenten verbundenen Risiken und Strategien zu derer Minimierung):

### Web-Anwendung für **Nutzer**

Um als **Nutzer** ein Kontakttagebuch zu führen nutzen andere Systeme wie *Luca* und *Recover* Smartphone-Apps. Dies hat jedoch verschiedene Nachteile wie z.B. Zentralisierung, möglicher Feature Creep und Deployment-Komplexität. Zilp-Zalp hingegen nutzt eine einfache Web-Applikation, die vollständig lokal arbeitet und auf kein zentrales Backend angewiesen ist. Diese Anwendung kann über eine (oder mehrere) vertrauenswürdige URL(s) verteilt werden und ohne Installation genutzt werden. Es können auch lokal unterschiedliche Varianten der Web-Anwendung verbreitet werden um z.B. regionale Besonderheiten bei der Kontaktnachverfolgung umzusetzen. Die Web-Anwendung ist wie alle Komponenten open-source, der Quelltext kann von jedem Nutzer inspiziert werden.

**Nutzer** können diese Web-Anwendung einfach über eine URL in ihrem Browser öffnen. Es ist vorstellbar, dass eine öffentliche Stelle wie das RKI diese Web-Applikation unter einer offiziellen Domain hostet. Zur Nutzung der Applikation reicht es aus, die URL manuell einzugeben oder z.B. von einem QR-Code zu scannen, der in Restaurants und anderen Lokalitäten verteilt werden kann.

Zur Speicherung von Kontaktdaten nutzt die Web-App bestehende Browser-Mechanismen wie IndexDB oder localStorage. Diese können Daten für mindestens zwei Wochen speichern und erfüllen damit die gesetzlichen Anforderungen an die Dauerhaftigkeit eines Kontakttagebuchs. Um die Speicherdauer zu verlängern kann die App auf Mobilgeräten auch als "progressive Web-Applikationen" betrieben werden, hierbei wird die App lokal "installiert" und kann u.a. eine längere Speicherung von Daten durchführen (unter voller Kontrolle des Nutzers).

Beim ersten Öffnen der Web-App wird der Nutzer aufgefordert, seine Kontaktdaten anzugeben. Diese werden anschließend lokal gespeichert. Zur Verifikation einzelner Daten wie z.B. der Telefonnummer können hierbei auch externe Systeme zum Einsatz kommen. Die Belegung der Echtheit von Daten kann hierbei kryptographisch erfolgen, ohne dass eine zentrale Speicherung oder Erfassung dieser Verifikationen notwendig ist (Details folgen).

Die Web-App generiert anschließend einen QR-Code, der die verschlüsselten Kontaktdaten des Nutzers enthält, sowie eine Signatur die mit einem lokal gespeicherten, zufälligen Schlüssel erzeugt wurde (um spätr einen missbräuchlichen Upload von falschen Daten durch Dritte zu verhindern). Die Daten werden mit einem öffentlichen Schlüssel verschlüsselt, der täglich rotiert wird und über eine öffentliche, vertrauenswürdige URL verteilt wird. Die Gesundheitsämter besitzen den zugehörigen privaten Schlüssel, mit dem die Daten entschlüsselt werden können.

Für Nutzer die keine Web-Anwendungen nutzen können (da sie kein Smartphone besitzen oder schlicht keine App nutzen wollen) kann alternativ ein komplett papierbasierter Check-In Ablauf implementiert werden.

### Web-Anwendung für **Betreiber**

Ähnlich zum **Nutzer** nutzen auch **Betreiber** eine Web-Applikation, um Gästelisten zu verwalten. Diese können sie ebenfalls von einer vertrauenswürdigen URL beziehen und lokal im Browser ausführen. Die Datenhaltung geschieht ebenfalls über Web-Speichertechnologien wie IndexDB oder localStorage.

Eine Registrierung oder die zentrale Speicherung von Daten zur Örtlichkeit ist **nicht** erforderlich. Der Betreiber muss jedoch lokal grundlegende Daten zur Ortschaft angeben, die dem **Gesundheitsamt** als Informationen zur Bewertung der Risikokontakte zur Verfügung gestellt werden. Diese Informationen werden nur verschlüsselt an das Gesundheitsamt übermittelt.

Um einen Nutzer einzuchecken scannt die Web-Applikation des Betreibers den QR-Code des Nutzers. Anschließend wird für den Check-In ein Zufallswert erzeugt, der wiederum in einen QR-Code kodiert wird. Diesen Zufallswert scannt wiederum der Gast mit seiner Web-Applikation. Beide Applikationen speichern den Wert lokal in ihren jeweiligen Datenbanken. Die Web-App des Nutzers zeigt dann einen QR-Code mit dem Zufallswert an, der später für den Check-Out genutzt wird.

Um einen Check-Out durchzuführen scannt die Web-Applikation des Betreibers wiederum den Check-Out QR-Code des Nutzers und vermerkt die Check-Out Zeit lokal im System. Der Zufallswert des Nutzers wird mit den verschlüsselten Daten zusammen lokal beim Betreiber abgelegt. Dieser kann die Daten nicht entschlüsseln!

## Web-Anwendung für **Gesundheitsämter**

Gesundheitsämter nutzen zur Kontaktnachverfolgung ebenfalls eine Web-Applikation. Infizierte Nutzer schicken den Gesundheitsämtern ihre bei den Check-Ins generierten Zufallswerte, die in ihrer Web-Anwendung gespeichert sind. Dies kann ebenfalls automatisiert über verschiedene Kanäle erfolgen, z.B. kann die Web-Anwendung des Nutzers die Werte wiederum mit dem öffentlichen Schlüssel der Gesundheitsämter verschlüsseln und an einen öffentlich verfügbaren Endpunkt übertragen. Gesundheitsämter können die Daten von dort authentifiziert abrufen. Alternativ kann die Übertragung per E-Mail, vor Ort per QR-Code Scanning, durch Ausdrucken und Zufaxen (wichtig!) oder sogar mündlich durch Ablesen der Zufallswerte erfolgen.

Das Gesundheitsamt veröffentlich nun diese Zufallswerte über eine festgelegte URL. Die Web-Anwendungen der Betreiber rufen diese Liste regelmäßig ab und gleichen sie mit den vor Ort gespeicherten Zufallswerten ab. Findet die Anwendung eine Übereinstimmung, werden alle Checks-Ins herausgesucht, die eine Überschneidung zum mit dem Zufallswert verbundenen Check-Ins besitzen. Die verschlüsselten Daten dieser Check-Ins werden dann an einen öffentlichen Endpunkt geschickt über den die Gesundheitsämter diese abrufen können, verknüpft mit dem jeweils zugehörigen Zufallswert und ebenfalls verschlüsselten Daten zur Ortschaft.

Die Web-Anwendungen der Gesundheitsämter können wiederum die übermittelten Daten mit ihrem privaten Schlüssel(n) entschlüsseln und zur Kontaktnachverfolgung nutzen. Das zur Übermittlung eingesetzte System kann die Daten zu keinem Zeitpunkt entschlüsseln und nur sehr wenige Meta-Daten über diese generieren, eine Kompromittierung dieses Übermittlungs-Systems führt daher nicht zur Kompromittierung des Gesamtsystems.

## Papierbasierter Check-In

Alternativ zur Web-Anwendung für Nutzer bietet Zilp-Zalp auch einen komplett analogen Check-In Ablauf, der papiergestützt funktioniert. Dieser erfordert lediglich, einmalig mithilfe einer Web-Anwendung und einem Drucker einen Ausdruck zu erzeugen, der einen QR-Code enthält welcher wie bei der Web-App verschlüsselt die Daten des Nutzers enthält. Dieser kann von Nutzer dann eingesetzt werden um einzuchecken. Die beim Check-In generierten Zufallszahlen können einfach auf dem Blatt aufgeschrieben und im Falle einer Infektion ans Gesundheitsamt gefaxt werden (wir lieben Faxe). Der für die Verschlüsselung verwendete öffentliche Schlüssel bleibt hierbei jedoch länger gültig, gegenüber der Web-Anwendung, welche jeden Tag einen neuen öffentlichen Schlüssel nutzen kann werden hierbei daher mehr Meta-Daten erzeugt, was die Sicherheit etwas reduziert.

## Öffentliche API zur Datenübermittlung

**Zilp-Zalp** benötigt zur Kommunikation zwischen den Gesundheitsämtern, Nutzern und Betreibern verschiedene Schnittstellen:

* Gesundheitsämter müssen die Möglichkeit haben, mit Check-Ins verbundene Zufallswerten zu veröffentlichen um Betreiber aufzufordern, diese zu übermitteln.
* Betrieber müssen die Möglichkeit haben, Daten an Gesundheitsämter zu schicken.
* Nutzer müssen die Möglichkeit haben, ihre mit Check-Ins verbundenen Zufallszahlen an Gesundheitsämter zu übermitteln.

Um diese Funktionalität umzustzen kann eine einfache REST-API zur Verfügung gestellt werden, mit folgenden Endpunkten:

* `/trace-requests`: Erhält eine öffentliche Liste von Zufallswerten, die von Gesundheitsämtern von Betreibern angefordert werden.
* `/trace-uploads`: Erlaubt den Upload von Kontaktdaten durch Betreiber an die Gesundheitsämter zur Kontaktnachverfolgung.
* `/id-uploads`: Erlaubt den Upload von Zufallswerten durch Nutzer an die Gesundheitsämter zur Kontaktnachverfolgung.

Diese Endpunkte müssen gegen Missbrauch und den Upload manipulierter/gefälschter Daten geschützt werden, dies ist jedoch durch verschiedene Schritte problemlos möglich.

Zusätzlich benötigt Zilp-Zalp eine private API für Gesundheitsämter, über die diese Zufallswerte veröffentlichen und von Betreibern sowie Nutzern bereitgestellte Daten abrufen können.

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

**Zilp-Zalp** bietet alle Funktionalität die für die Nachverfolgung von Kontakten notwendig ist. Gegenüber Luca weist das System einige Unterschiede auf, die eventuell als Nachteile ausgelegt werden könnten (die aber aus unserer Sicht keine Nachteile darstellen):

* **Manueller Check-In**: Im Gegensatz zu Luca erlaubt **Zilp-Zalp** keine automatisierten Check-Ins, d.h. solche ohne Beteiligung des Betreibers. Dies ist aus unserer Sicht jedoch ein Vorteil da es sich gezeigt hat, dass automatische Check-Ins ohne Zutun des Betreibers einfach missbraucht werden können und zudem die Genauigkeit der Kontaktdaten stark reduzieren.
* **Zeitverzögerung bei Kontaktdaten-Upload**: Da Zilp-Zalp dezentral funktioniert, kann die Übertragung von Kontaktdaten eventuell etwas langsamer sein als bei Systemen wie Luca. Da jedoch auch bei Luca eine manuelle Freigabe von Kontaktdaten durch Betreiber vorgesehen ist, sollte dies in der Praxis keine Rolle spielen.
* **Dezentrale Datenhaltung**: Zilp-Zalp speichert Daten dezentral, dementsprechend ist das Verlustrisiko gegenüber einem System wie Luca höher. Da jedoch von Betreibern nur verschlüsselte Daten gespeichert werden und zudem auch Luca Abhängigkeiten von lokal gespeicherten Daten (z.B. privaten Schlüsseln von Betreibern) hat, ist die dezentrale Datenhaltung aus unserer Sicht nicht problematischer und hat sogar viele Vorteile (geringere Aufwände im Backend, geringeres Risiko eines Totalverlusts von Daten).
* **Web-Anwendungen statt Apps**: Apps bieten verschiedene Vorteile wie z.B. eine unlimitierte Speicherdauer und privilegierten Zugriff auf Systemfunktionen wie Kameras oder Adressbücher. Zusätzlich können sie einfacher asynchrone Funktionalitäten wie z.B. regelmäßige Prüfungen durchführen. Viele dieser Funktionalitäten lassen sich jedoch auch mit Web-Anwendungen realisieren, so können z.B. Service-Worker genutzt werden um regelmäßig Daten zu prüfen und Nutzer über Risikokontake zu warnen.

# Sicherheitsaspekte

Zilp-Zalp nutzt Web-Anwendungen um Daten zu verarbeiten. Das ist nicht unproblematisch, denn solche Anwendungen laufen in Web-Browsern, die u.a. durch "bösartige" Erweiterungen oder "Adware/Malware" eine Bedrohung darstellen können. Um diese Risiken zu minimieren stehen verschiedene Strategien zur Verfügung, die wir in der Erweiterung dieses Dokuments diskutieren werden.

# Mögliche Varianten und Erweiterungen

Zilp-Zalp kann wie andere Systeme auch auf Apps zurückgreifen um Kontaktdaten zu übermitteln, wir halten dies jedoch für unnötig und teilweise schädlich. Zilp-Zalp kann bestehende Infrastruktur, z.B. Schlüsselpaare wie sie von Luca generiert werden für Gesundheitsämter nutzen um den Datenaustausch zu ermöglichen, der Wechsel von Luca zu Zilp-Zalp sollte daher sowohl für Gesundheitsämter als auch für Betreiber und Nutzer sehr einfach sein.

# Weitere Schritte

Dies ist ein erstes, grobes Design-Konzept das verdeutlichen soll, dass viele Komponenten des Luca-Systems nicht notwendig sind und nur existieren um als Grundlage eines kommerziellen Geschäftsmodells zu dienen.

In den kommenden Tagen wird an dieser Stelle das Konzept von **Zilp-Zalp** komplett ausgearbeitet werden, um die Sicherheit und die Privatsphäre-Eigenschaften zu beweisen. Sämtliche Arbeiten sollen öffentlich durchgeführt werden.

Eventuell werden einzelne Systemkomponenten anschließend als PoCs umgesetzt. Sämtliche Entwicklungsschritte sollen offen und nachvollziehbar hier auf Github erfolgen, Mitwirkung ist höchst willkommen. Alle Software-Bestandteile des Systems sollen unter BSD-3 Lizenz veröffentlicht werden, alle Nicht-Software-Bestandteile unter einer Creative-Commons (CC) NC-Lizenz.

# Bildnachweise

1.) By Gaston Bussière - [1], Public Domain, https://commons.wikimedia.org/w/index.php?curid=4491753
