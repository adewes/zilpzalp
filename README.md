# Brunhilde - Dezentrale Kontaktnachverfolgung. Ohne App & ohne Rapper!

![Brunhilde - Schildmaid der Datenschützer](/materials/images/bruni.jpg "Brunhilde - Schildmaid der Datenschützer")

**Disclaimer**: *Dies ist ein erster, grober Entwurf des Design-Dokuments. Weitere Details folgen in den kommenden Tagen und Wochen.*

Dies ist das Design-Dokument von **Brunhilde**, einem System zur Kontaktnachverfolgung das mit Methoden des **Privacy & Security Engineering** entworfen wurde. Das Design ist als Gegenentwurf zu zentralisierten Systemen wie **Luca** gedacht und soll zeigen, dass viele Design-Entscheidungen in diesen Systemen mehr von kommerziellen Interessen als von **Privacy & Security By Design** getrieben sind, und für eine effektive Kontaktnachverfolgung nicht notwendig sind.

# Motivation

Warum Brunhilde? Obwohl es vielleicht zu spät ist um die Diskussion um Kontaktnachverfolgungs-Apps in die richtige Richtung zu lenken ist es wichtig zu zeigen, dass viele Aussagen der Luca-Macher einfach faktisch falsch sind, und dass Luca mit Sicherheit nicht "der sicherste mögliche Ansatz" zur Realisierung eines rechtskonformen Systems zur Kontaktnachverfolgung ist.

Es ist vermutlich unwahrscheinlich, dass Brunhilde jemals in der Praxis eingesetzt werden wird (Walküren sind auch leider nicht mehr so populär wie Popstars). Das Konzept ist daher eher eine "einfache" Übung im angewandten **Privacy Engineering** mit der gezeigt werden soll, wie man privatsphäre-freundliche Systeme kollaborativ und offen entwickeln kann.
## Problemstellung

Brunhilde soll folgende Problemes lösen:

* Die Nachverfolgung von Kontakten zur Eindämmung von Covid-19, in Übereinstimmung mit den Infektionsschutzverordnungen der Bundesländer.

## Anforderungen

Um den gesetzlichen Anforderungen genüge zu tun, müssen Betreiber von **Ortschaften** (Gaststätten, Kinos, Fitnessstudios etc.) Gästelisten führen, die bei Bedarf dem zuständigen Gesundheitsamt zur Verfügung gestellt werden müssen. Diese Gästelisten müssen erlauben zu rekonstruieren, welche potentiellen Kontakte ein infizierter Gast im Rahmen des Besuchs einer **Ortschaft** hatte. Das Gesundheitsamt nutzt diese Daten dann, um diese Kontakte zu warnen und ggf. zu einem Covid-19 Test oder häuslicher Quarantäne aufzufordern.

## Notwendige Arbeitsabläufe

Folgende Arbeitsabläufe müssen von Brunhilde unterstützt werden, um eine Kontaktnachverfolgung zu gewährleisten:

* Erfassung eines **Check-Ins** in einer **Ortschaft**. Hierzu müssen ein **Nutzer** und ein **Betreiber** kooperieren um die Anwesenheit des **Nutzer** in der **Ortschaft** des **Betreiber** zu dokumentieren. Gesetzlich muss ein möglichst genauer Aufenthaltsort sowie die Zeit des Aufenthalts dokumentiert werden. Durch die **Check-Ins** eines **Nutzer** entsteht ein **Contact Diary** (Kontakttagebuch), das später dem **Gesundheitsamt** die Kontaktnachverfolgung ermöglicht.
* Bereitstellung des **Contact Diary** an das **Gesundheitsamt** zur Kontaktnachverfolgung.
* Kontaktierung der **Nutzer** die einen möglichen Risikokontakt mit dem infizierten **Nutzer** hatten durch das **Gesundheitsamt**. 

## Komponenten des Systems & zentrale Abläufe

Die erforderlichen Arbeitsabläufe können auf unterschiedlichen Wegen umgesetzt werden. Bisher werden hierzu papierbasierte Listen eingesetzt, die jedoch einige Nachteile aufweisen wie hoher manueller Erstellungsaufwand und schlechten Datenschutz.

**Brunhilde** hat folgende Systemkomponenten (wir kommen später auf die mit diesen Komponenten verbundenen Risiken und Strategien zu derer Minimierung):

* (Progressive) Web-Applikationen für das Führen eines Kontakttagebuchs, dem Durchführen eines Check-Ins, der Datenübermittlung an das Gesundheitsamt und der Warnung von Kontaktpersonen

### Web-Anwendung für **Nutzer**

Um als **Nutzer** ein Kontakttagebuch zu führen nutzen andere Systeme wie *Luca* und *Recover* Smartphone-Apps. Dies hat jedoch verschiedene Nachteile wie z.B. Zentralisierung, möglicher Feature Creep und Deployment-Komplexität. Brunhilde hingegen nutzt eine einfache Web-Applikation, die vollständig lokal arbeitet und auf kein zentrales Backend angewiesen ist.

**Nutzer** können diese Web-Anwendung einfach über eine URL öffnen. Es ist vorstellbar, dass eine öffentliche Stelle wie das RKI diese Web-Applikation unter einer offiziellen Domain hostet. Zur Nutzung der Applikation reicht es aus, die URL z.B. von einem QR-Code zu scannen, der in Restaurants und anderen Lokalitäten verteilt werden kann.

Zur Speicherung von Kontaktdaten nutzt die Web-App bestehende Browser-Mechanismen wie IndexDB oder localStorage. Diese können Daten für mindestens zwei Wochen speichern und erfüllen damit die gesetzlichen Anforderungen an die Dauerhaftigkeit eines Kontakttagebuchs. Um die Speicherdauer zu verlängern können Mechanismen wie "progressive Web-Applikationen" benutzt werden, welche eine längere Speicherung der Daten (unter voller Kontrolle des Nutzers erlauben).

Beim ersten Öffnen der Web-App wird der Nutzer aufgefordert, seine Kontaktdaten anzugeben. Diese werden anschließend lokal gespeichert. Zur Verifikation einzelner Daten wie z.B. der Telefonnummer können hierbei auch externe Systeme zum Einsatz kommen. Die Belegung der Echtheit von Daten kann hierbei kryptographisch erfolgen, ohne dass eine zentrale Speicherung oder Erfassung notwendig ist (Details folgen).

Die Web-App generiert anschließend einen QR-Code, der die verschlüsselten Kontaktdaten des Nutzers enthält, sowie eine Signatur die mit einem lokal gespeicherten Schlüssel erzeugt wurde (um missbräuchlichen Upload von falschen Daten zu verhindern). Diese werden mit einem öffentlichen Schlüssel verschlüsselt, der täglich rotiert wird und über eine öffentliche, vertrauenswürdige URL verteilt wird. Die Gesundheitsämter besitzen den zugehörigen privaten Schlüssel, mit dem die Daten entschlüsselt werden können.

Für Nutzer die keine Web-Anwendungen nutzen können (da sie kein Smartphone besitzen oder keine App nutzen wollen) kann alternativ ein papierbasierter Ablauf implementiert werden.

### Web-Anwendung für **Betreiber**

Ähnlich zum **Nutzer** nutzen auch **Betreiber** eine Web-Applikation, um Gästelisten zu verwalten. Diese können sie ebenfalls von einer vertrauenswürdigen URL beziehen und lokal ausführen. Datenhaltung geschieht ebenfalls über Web-Speichertechnologien wie IndexDB oder localStorage.

Eine Registrierung oder die Eingabe von Daten zur Örtlichkeit ist **nicht** verpflichtend, kann jedoch gemacht werden um dem **Gesundheitsamt** im Zweifelsfall zusätzliche Informationen zur Verfügung zu stellen.

Um einen Gast einzuchecken scannt die Web-Applikation den QR-Code des Gastes. Anschließend wird für den Check-In ein Zufallswert erzeugt, der wiederum in einen QR-Code kodiert wird. Diesen Zufallswerte scannt wiederum der Gast mit seiner Web-Applikation. Beide Applikationen speichern die ID lokal in ihren jeweiligen Datenbanken. Die Web-App des Nutzers zeigt nun einen QR-Code mit dem Zufallswert an.

Um einen Check-Out durchzuführen scannt die Web-Applikation des Betreibers wiederum den QR-Code des Nutzers und vermerkt die Check-Out Zeit lokal im System.

## Web-Anwendung für **Gesundheitsämter**

Gesundheitsämter nutzen zur Kontaktnachverfolgung ebenfalls eine Web-Applikation. Infizierte Nutzer schicken den Gesundheitsämtern ihre bei den Check-Ins generierten Zufallswerte. Dies kann ebenfalls automatisiert über verschiedene Kanäle erfolgen, z.B. kann die Web-Applikation des Nutzers die Werte wiederum mit dem öffentlichen Schlüssel der Gesundheitsämter verschlüsseln und an einen öffentlich verfügbaren Endpunkt übertragen. Alternativ kann die Übertragung per E-Mail, vor Ort per QR-Code Scanning, durch Ausdrucken und Zufaxen (wichtig!) oder sogar mündlich erfolgen.

Das Gesundheitsamt macht diese Zufallswerte öffentlich über eine feste URL verfügbar. Die Web-Anwendungen der Betreiber prüfen diese Liste regelmäßig und gleichen sie mit den vor Ort gespeicherten Zufallswerten ab. Findet die Anwendung eine Übereinstimmung, werden alle Checks-Ins herausgesucht, die eine Überschneidung zum mit dem Zufallswert verbundenen Check-In besitzen. Die verschlüsselten Daten dieser Check-Ins werden anschließend an einen Endpunkt geschickt, über den die Gesundheitsämter diese abrufen können, verknüpft mit dem jeweils zugehörigen Zufallswert.

Die Web-Anwendungen der Gesundheitsämter können wiederum die übermittelten Daten mit ihrem privaten Schlüssel(n) entschlüsseln und zur Kontaktnachverfolgung nutzen.

## Papierbasierter Check-In

Alternativ zur Web-Anwendung für Nutzer bietet Brunhilde auch einen komplett analogen Check-In Ablauf, der papiergestützt funktioniert. Dieser erfordert lediglich, einmalig mithilfe eine Web-Anwendung und einem Drucker einen Ausdruck zu erzeugen, der einen QR-Code enthält. Dieser kann von Nutzer dann eingesetzt werden um einzuchecken. Die beim Check-In generierten Zufallszahlen können einfach auf dem Blatt aufgeschrieben und im Falle einer Infektion ans Gesundheitsamt gefaxt werden (wir lieben Faxe).

## Öffentliche API zur Datenübermittlung

**Brunhilde** benötigt zur Kommunikation zwischen den Gesundheitsämtern, Nutzern und Betreibern verschiedene Schnittstellen:

* Gesundheitsämter müssen die Möglichkeit haben, mit Check-Ins verbundene Zufallswerten zu veröffentlichen um Betreiber aufzufordern, diese zu übermitteln.
* Betrieber müssen die Möglichkeit haben, Daten an Gesundheitsämter zu schicken.
* Nutzer müssen die Möglichkeit haben, ihre mit Check-Ins verbundenen Zufallszahlen an Gesundheitsämter zu übermitteln.

Um diese Funktionalität umzustzen kann eine einfache REST-API zur Verfügung gestellt werden, mit folgenden Endpunkten:

* `/trace-requests`: Erhält eine öffentliche Liste von Zufallswerten, die von Gesundheitsämtern von Betreibern angefordert werden.
* `/trace-uploads`: Erlaubt den Upload von Kontaktdaten durch Betreiber an die Gesundheitsämter zur Kontaktnachverfolgung.
* `/id-uploads`: Erlaubt den Upload von Zufallswerten durch Nutzer an die Gesundheitsämter zur Kontaktnachverfolgung.

Diese Endpunkte müssen gegen Missbrauch und den Upload manipulierter/gefälschter Daten geschützt werden, dies ist jedoch durch verschiedene Schritte problemlos möglich.

# Vorteile gegenüber Luca

**Brunhilde** hat eine Reihe von Vorteilen gegenüber dem Luca-System:

* Es werden nicht indiskriminiert Check-In Daten zentral erfasst und gespeichert.
* Das System benötigt keine zentrale Stelle, der einzelne Akteure ungeprüft vertrauen müssen.
* Das System erlaubt Check-Ins ohne Internet-Konnektivität.
* Das System erfordert keine Installation von Anwendungen oder Apps.
* Das System erfordert keine Registrierung von Betreibern oder Nutzern. 
* Das System kann nicht durch einen zentralen Akteur "gekapert" und für andere Zwecke missbraucht werden.
* Alle lokalen Systemkomponenten können von jedem Akteur jederzeit inspiziert werden, es werden keine Binärartefakte benötigt.

# Mögliche Nachteile gegenüber Luca

**Brunhilde** bietet alle Funktionalität die für die Nachverfolgung von Kontakten notwendig ist. Gegenüber Luca weist das System einige Unterschiede auf, die eventuell als Nachteile ausgelegt werden könnten (die aber aus unserer Sicht keine Nachteile darstellen):

* **Manueller Check-In**: Im Gegensatz zu Luca erlaubt **Brunhilde** keine automatisierten Check-Ins, d.h. solche ohne Beteiligung des Betreibers. Dies ist aus unserer Sicht jedoch ein Vorteil da es sich gezeigt hat, dass automatische Check-Ins ohne Zutun des Betreibers einfach missbraucht werden können und zudem die Genauigkeit der Kontaktdaten stark reduzieren.
* **Zeitverzögerung bei Kontaktdaten-Upload**: Da Brunhilde dezentral funktioniert, kann die Übertragung von Kontaktdaten eventuell etwas langsamer sein als bei Systemen wie Luca. Da jedoch auch bei Luca eine manuelle Freigabe von Kontaktdaten durch Betreiber vorgesehen ist, sollte dies in der Praxis keine Rolle spielen.
* **Dezentrale Datenhaltung**: Brunhilde speichert Daten dezentral, dementsprechend ist das Verlustrisiko gegenüber einem System wie Luca höher. Da jedoch von Betreibern nur verschlüsselte Daten gespeichert werden und zudem auch Luca Abhängigkeiten von lokal gespeicherten Daten (z.B. privaten Schlüsseln von Betreibern) hat, ist die dezentrale Datenhaltung aus unserer Sicht nicht problematischer und hat sogar viele Vorteile (geringere Aufwände im Backend, geringeres Risiko eines Totalverlusts von Daten).

# Sicherheitsaspekte

Brunhilde nutzt Web-Anwendungen um Daten zu verarbeiten. Das ist nicht unproblematisch, denn solche Anwendungen laufen in Web-Browsern, die u.a. durch "bösartige" Erweiterungen oder "Adware/Malware" eine Bedrohung darstellen können. Um diese Risiken zu minimieren stehen verschiedene Strategien zur Verfügung, die wir in der Erweiterung dieses Dokuments diskutieren werden.

# Weitere Schritte

Dies ist ein erstes, grobes Design-Konzept das verdeutlichen soll, dass viele Komponenten des Luca-Systems nicht notwendig sind und nur existieren um als Grundlage eines kommerziellen Geschäftsmodells zu dienen.

In den kommenden Tagen wird an dieser Stelle das Konzept von **Brunhilde** komplett ausgearbeitet werden, um die Sicherheit und die Privatsphäre-Eigenschaften zu beweisen. Sämtliche Arbeiten sollen öffentlich durchgeführt werden.

Eventuell werden einzelne Systemkomponenten anschließend als PoCs umgesetzt. Sämtliche Entwicklungsschritte sollen offen und nachvollziehbar hier auf Github erfolgen, Mitwirkung ist höchst willkommen. Alle Software-Bestandteile des Systems sollen unter BSD-3 Lizenz veröffentlicht werden, alle Nicht-Software-Bestandteile unter einer Creative-Commons (CC) NC-Lizenz.

# Bildnachweise

1.) By Gaston Bussière - [1], Public Domain, https://commons.wikimedia.org/w/index.php?curid=4491753