# Papiergestützte Kontaktnachverfolgung

Viele Systeme zur Kontaktnachverfolgung wie **Luca** oder **Recover** setzen primär auf technische Hilfsmittel wie Smartphone-Apps, um **Besuche** zu dokumentieren. Dies ist aus verschiedenen Gründen problematisch. Papiergestützte bzw. analoge Protokolle werden zwar auch von anderen Systemen wie **Luca** angeboten (in Form von Schlüsselanhängern), jedoch weisen diese eine Reihe von Datenschutz-Problemen auf.

**Zilp-Zalp** setzt hingegen **primär** auf ein papiergestütztes Protokoll, das nur unterstützend technologische Hilfsmittel wie Web-Anwendungen nutzt, im Wesentlichen für den **Nutzer** bei **Besuchen** komplett ohne technologische Hilfsmittel funktioniert. Ein solches Protokoll hat in der Praxis viele Vorteile:

* Nutzer müssen keine Smartphone-Anwendungen von eventuell nicht vertrauenswürdigen Quellen installieren.
* Für die Dokumentation von **Besuchen** ist es nicht notwendig, ein Smartphone mit sich zu führen oder über Internet-Konnektivität zu verfügen.
* Das Verfahren ist auch für Menschen nutzbar die keine Erfahrung im Umgang mit Smartphone Apps haben oder diese aus anderen Gründen nicht nutzen können.

## Grundideen

Um die in der [Übersicht]({{'protocols.index'|href}}) genannten Anforderungen an die Kontaktnachverfolgung zu erfüllen, muss folgendes gegeben sein:

* Ein **Betreiber** einer **Ortschaft** muss in der Lage sein, den **Besuch** eines **Nutzers** rechtskonform zu dokumentieren.
* Ein **Gesundheitsamt** muss in der Lage sein, in Zusammenarbeit mit einem infizierten **Nutzer** (unter möglichst geringem Aufwand) mögliche Risikokontakte dieses **Nutzers** basierend auf dessen **Besuchshistorie** zu identifizieren und zu kontaktieren.

Grundlegend müssen wir für eine robuste Kontaktermittlung in der Lage sein, mögliche Schnittmengen zwischen **Besuchen** einzelner **Nutzer** zu ermitteln. Dies erfordert generell eine Dokumentation der Besuche einzelner Nutzer, sowie ein Verfahren um für einen spezifischen Besuch eines Nutzers alle Besuche anderer Nutzer zu ermitteln die in der gleichen Ortschaft und im gleichen Zeitraum erfolgten.

### Mögliche Strategien

Prinzipiell gibt es verschiedene Strategien, um diese Anforderungen umzusetzen. Die wohl naheliegendste aber nicht unbedingt privatsphäre-freundlichste Strategie ist, Besuchsdaten zentral zu verwalten und bei Bedarf aus dieser zentralen Datenhaltung relevante Besuche zu ermitteln. Dieser Ansatz wird u.a. von **Luca** verfolgt. Problematisch hierbei ist, dass durch die zentrale Datenhaltung eine Vielzahl von Möglichkeiten zur Überwachung von Nutzern entstehen, die sich nur schwer technologisch oder organisatorisch lösen lassen.

Eine datenschutzfreundlichere Lösung ist daher die dezentrale Speicherung von Kontaktdaten. Um diese zu evaluieren teilen wir das Problem der Kontaktverfolgung zunächst in zwei Unterprobleme auf:

* **Gesundheitsämter** müssen in der Lage sein, **Besuchshistorien** einzelner **Nutzer** zu rekonstruieren und zu diesen Historien relevante **Besuche** anderer Nutzer zu erhalten.
* **Gesundheitsämter** müssen ebenfalls in der Lage sein, **Kontaktdaten** der Personen zu ermitteln, die zu den extrahierten **Besuchen** gehören.

Hier zeigt sich, dass wir das Problem der Dokumentation von **Besuchen** unabhängig vom Problem der Speicherung von **Kontaktdaten** betrachten können.

* Zunächst schaffen wir eine Möglichkeit, Kontaktdaten so zu hinterlegen, dass sie nur **anlassbezogen** von **Gesundheitsämtern** zur Kontaktnachverfolgung verarbeitet werden können und auch verschlüsselt keinen anderen Akteuren im System zugänglich sind.
* Weiterhin schaffen wir eine Möglichkeit, **Besuche** robust und datensparsam zu dokumentieren.

## Protokoll (v0.3)

Das papiergestützte, dezentrale Protokoll von Zilp-Zalp umfasst folgende Akteure:

* **Nutzer**, welche Ihre Kontaktdaten sowie ihre **Besuchshistorie** anlassbezogen **Gesundheitsämtern** zur **Kontaktnachverfolgung** zur Verfügung stellen.
* **Betreiber** von **Ortschaften**, die **Besuche** von **Nutzern** dokumentieren um eine **Kontaktnachverfolgung** von **Gesundheitsämtern** zu ermöglichen.
* **Gesundheitsämter**, die **Besuchshistorien** und **Kontaktdaten** nutzen um Kontaktnachverfolgung zu betreiben.

Um den Austausch dieser Daten zwischen den Akteuren zu ermöglichen implementiert **Zilp-Zalp** eine Infrastruktur mit verschiedenen Diensten:

* **Web-Anwendungen** für **Betreiber**, **Gesundheitsämter** und **Nutzer** (für letztere hier nur zur Erstellung von QR-Codes benötigt).
* Eine **API** zum Austausch von Besuchshistorien und Kontaktdaten.

Die Verschlüsselung von Daten für **Gesundheitsämtern** sowie die Authentifizierung von öffentlichen Anfragen dieser erfolgt durch **Public-Key Verschlüsselung**. Im Folgenden nehmen wir an, dass Gesundheitsämter jeweils über ein Schlüsselpaar zum Signieren sowie zum Ver- & Entschlüsseln von Daten verfügen, und andere Akteure die Vertrauenswürdigkeit der öffentlichen Schlüssel dieser Paare über einen geeigneten Mechanismus (z.B. ein Root-Zertifikat das gemeinsam mit der Web-Anwendung ausgeliefert wird) verifizieren können.

### Initialisierung

Nutzer im System möchten **Gesundheitsämtern** anlassbezogen ihre **Kontaktdaten** zur Verfügung stellen. Hierbei legen wir die Annahme zugrunde, dass Nutzer die Daten so hinterlegen möchten, dass **GÄs** bei gegebenem Anlass ohne weiteres Zutun der Nutzer (allerdings für diese nachvollziebar) auf die Daten zugreifen können.

Die Kontaktdaten sollen hierbei nur von vertauenswürdigen Akteuren verarbeitet werden können und generell möglichst wenigen Akteuren im System vorliegen (egal ob in verschlüsselter oder unverschlüsselter Form).

Um Kontaktdaten zu erfassen, öffnen Nutzer zunächst die Web-Anwendung und erfassen dort relevante Daten wie Name, Anschrift, Telefonnummer und E-Mail Adresse (eine Validierung dieser Daten wird unten beschrieben). Anschließend generiert die Anwendung zwei zufallsgenerierte, symmetrische Schlüssel $K _ A$ und $K _ B$, die über ein geeignetes Schlüsselableitungsverfahren miteinander zu einem Schlüssel $K _ C$ kombiniert werden. Die Anwendung verschlüsselt nun die Kontaktdaten des Nutzers symmetrisch mit Schlüssel $K _ C$, fügt zu diesen verschlüsselten Daten den Schlüssel $K _ A$ hinzu, verschlüsselt diese Daten asymmetrisch mit dem öffentlichen Schlüssel der **GÄs** und übermittelt diese Daten an die **API**, welche sie in einem Backend ablegt und einen zufälligen Identifier $I_D$ zurückgibt. Die dort abgelegten Daten sind für keinen Akteur ohne Kenntnis des Schlüssels $K _ B$ sowie des privaten Schlüssels der **GÄs** entschlüsselbar. Letzterer befindet sich zunächst unter Kontrolle des Nutzers und kann nur über diesen oder über einen Betreiber an ein **GÄ** gelangen, das diesen entschlüsseln kann.

Weiterhin generiert die Anwendung des Nutzers einen Zufallswert $H _ s$, aus dem mit ein geeigneten Verfahren eine pseudozufällige Reihe weiterer Zufallswerte $H _ 1, H _ 2, \cdots H _ n$ erzeugt wird. Die Web-Anwendung speichert nun $H _ s$, $I _ D$ und $ K _ B$ zusammen in einer Datenstruktur und verschlüsselt diese mit dem öffentlichen GÄ-Schlüssel. Diese Daten verbleiben beim Nutzer und werden nur zur Kontaktnachverfolgung an ein GA weitergegeben.

Nun generiert die Anwendung Wertepaare bestehend aus $H _ i$ ($ \ge 1$) einerseits und $K _ B$ und $I _ D$ andererseits, wobei $H _ i$ unverschlüsselt und $(K _ B, I _ D)$ jeweils für jedes Wertepaar individuell mit dem GÄ-Schlüssel verschlüsselt wird. Diese Paare werden für die Kontaktnachverfolgung genutzt und an Betreiber von Öffentlichkeiten weitergegeben.

Die Anwendung generiert anschließend aus allen Datenstrukturen QR-Codes, übergibt diese dem Nutzer (z.B. zum Ausdruck) und löscht anschließend alle Daten.

#### Optional: Initialisierung mit Daten-Validierung

Im Rahmen der normalen Initialisierung erfolgt keine Prüfung der vom Nutzer angegebenen Kontaktdaten. Wenn eine Validierung dieser Daten gewünscht ist, muss die Initialisierung mithilfe eines vertrauenswürdigen Dritten erfolgen. Hierzu betreibt dieser Dritte eine spezielle Version der Web-Anwendung, über die Nutzer zunächst genau wie oben ihre Daten initialisieren. Im Gegensatz zur normalen Initialisierung prüft der Dritte hierbei jedoch vor der Verschlüsselung die Daten (z.B. durch Abgleich mit einem Ausweisdokument) und bestätigt deren Korrektheit. Die Web-Anwendung signiert anschließend jedes Wertepaar des Nutzers mit einer Signatur, welche das Vorhandensein korrekter Nutzerdaten zu dem Wertepaar zertifiziert. Diese Signaturen $ S _ i $ werden zusätzlich zu den Wertepaaren auf den QR-Codes des Nutzers aufgebracht. Die Web-Anwendung eines Betreibers kann beim Scannen eines QR-Codes diese Signatur einlesen und bestätigen. Der Betreiber kann hiermit bestätigen, dass zu dem QR-Code validierte Nutzerdaten gehören.

Vertrauenswürdige Dritte könnten beispielsweise staatliche Institutionen aber auch ggf. privatwirtschaftliche Akteure (z.B. Postfilialen) sein, die bereits Erfahrung mit der Validierung von Daten haben. Die Umsetzung eines solchen Systems erfordert jedoch voraussichtlich einen sehr hohen Aufwand und schafft ein zusätzliches Risiko, da ein weiterer Dritter bei der Initialisierung Zugang zu den Daten eines Nutzers hat. Der Nutzen sollte daher dem Aufwand gegenüber abgewogen werden.

Eine Validierung über Dritt-APIs wie sie in anderen, zentralen Systemen vorgenommen wird kann theoretisch ebenfalls erfolgen, z.B. kann die Web-Anwendung die Erstellung von QR-Codes nur erlauben, nachdem bestimmte Daten wie eine Telefonnummer oder eine E-Mail Adresse über einen externen Dienst bestätigt wurden. Da die Web-Anwendung (oder generell jede Client-Anwendung) unter Kontrolle des Nutzers ist kann dieser diese leicht manipulieren, um die Validierung zu umgehen. Dass dies praktikabel ist wurde bereits demonstriert. Eine clientseitige Validierung von Daten hält daher nur technisch nicht versierte, kooperationswillige Nutzer von der Angabe falscher Daten ab (dies heißt jedoch nicht, dass eine solche zusätzliche Validierung vollständig nutzlos ist, sie sollte jedoch keineswegs als sicher oder verlässlich eingestuft werden).

### Besuchsdokumentation

Zur Dokumentation des Besuchs einer Ortschaft gegenüber Betreibern übergeben Nutzer diesen einfach jeweils einen zufälligen QR-Code. Hierbei ist es möglich, neben dem QR-Code zusätzliche Meta-Daten wie die genaue Ankunftszeit sowie die Verweildauer einzutragen, um die Genauigkeit der Dokumentation zu erhöhen. Der Betreiber erfasst die über einen gegebenen Zeitraum (z.B. einen Tag) erhaltenen QR-Codes anschließend mithilfe der Web-Anwendung. Sie werden zunächst nur lokal gespeichert. Betreiber können hierbei auch zusätzliche Meta-Daten erfassen um die Genauigkeit zur Kontaktnachverfolgung zu verbessern.

### Kontaktnachverfolgung

Um mögliche Risikokontakte eines infizierten Nutzers zu ermitteln übergibt dieser zunächst dem Gesundheitsamt den für diesen bestimmten QR-Code (entweder digital oder analog). Dieses kann ihn mit dem privaten GÄ-Schlüssel entschlüsseln, wodurch es die Werte $H _ s ^ l$, $I _ D ^ l$ und $K _ B ^ l$ erhält ($l$ bezeichnet hier die Daten des $l$-ten Nutzers). Mit dem Wert $I _ D$ kann das GA vom Backend die verschlüsselten Nutzerdaten erhalten, welche unter Zuhilfenahme des privaten Schlüssels sowie von $K _ B$ entschlüsselt werden können. Weiterhin kann das GA mithilfe von $H _ s$ alle Hashwerte $H _ i$ des Nutzers erstellen. Diese Werte veröffentlicht es über das Backend (gemeinsam mit anderen Hashwerten um die Anonymität des Nutzers zu schützen). Die Web-Anwendungen der Betreiber laden regelmäßig die Liste dieser Werte herunter und gleichen sie mit den lokal gespeicherten Hashwerten ab. Ergibt sich eine Übereinstimmung, werden nach Bestätigung durch den Betreiber alle Besuchsdaten die mit diesen Hashwerten $H _ i$ in Zusammenhang stehen (z.B. ermittelt durch Vergleich der Besuchszeiten) über die öffentliche API an das Backend übertragen (ggf. können die Daten nochmals mit dem GÄ-Schlüssel verschlüsselt werden). Von dort können sie durch das GA abegrufen werden. Dieses entschlüsselt dann wiederum mit dem privaten GÄ-Schlüssel die Werte $ I _ D ^ k$, und $K _ B ^ k$, womit wiederum die Kontaktdaten des Nutzers vom Backend abgefragt werden können. Da das GA von diesem Nutzer jedoch nicht den Schlüssel $ H _ s ^ k$ besitzt, kann es dessen Besuchshistorie nicht ohne dessen Einwilligung rekonstruieren. Hierzu ist vielmehr wiederum die aktive Mitarbeit dieses Nutzers notwendig.

### Vorteile & Motivation

Das vorgestellte Protokoll hat aus unserer Sicht folgende Vorteile:

* Personenbezogene Daten werden nur von einer einzelnen, vertauenswürdigen Stelle im System aufbewahrt. Im Gegensatz zu anderen Systemen wie Luca kann kein einzelner Akteur durch alleinige technische Manipulation von Systemkomponenten die Daten eines Nutzers entschlüsseln.
* Da jeder Nutzer über eine Vielzahl von QR-Codes verfügt und diese nur unter Zuhilfenahme eines geheimen Schlüssel im Besitz des Nutzers sowie des GÄ-Schlüssels miteinander in Verbindung gebracht werden können ist es für einen Angreifer fast unmöglich, Besuchsdaten einzelner Nutzer miteinander zu korrelieren um z.B. Besuchshistorien zu erstellen.
* Ein Verlust von Besuchsdaten eines Betreibers oder selbst ein konspirativer Missbrauch des Systems durch verschiedene Betreiber führt nicht zu einem Verlust personenbezogener Daten.
* Eine Kompromittierung des Backends macht einem Angreifer lediglich wenige, relativ unkritische Meta-Daten zugänglich. Das Backend speichert nur verschlüsselte Kontaktdaten und IDs, nicht jedoch wie in anderen Systemen komplette Besuchshistorien.
* Die Datenhaltung im Backend sowie der Kommunikationsaufwand ist sehr gering, nur im Falle einer Kontaktnachverfolgung sowie bei der Initialisierung werden Daten zwischen dem Backend und anderen Akteuren ausgetauscht. Die Dokumentation von Besuchen erfolgt dezentral und ohne Kommunikation mit dem Backend, es fallen daher bei Besuchen keine Meta-Daten an.
* Eine missbräuchliche Abfrage großer Datenmengen ist leicht zu entdecken. Da alle Anfragen über eine öffentliche Schnittstelle verfügbar gemacht werden ist von außen ersichtlich, wieviele Daten von Gesundheitsämtern abgefragt werden.
* Für die Dokumentation eines Besuchs ist keine Interaktion eines Nutzers mit einer Web-Anwendung oder einem Smartphone notwendig. Betreiber können Besuche auch asynchron erfassen und mit zusätzlichen Metadaten versehen. Der Aufwand zum Einlesen von QR-Codes ist gering, und die Aufbewahrung der Codes durch Betreiber stellt ein zusätzliches Backup zu den digitalen Daten dar und kann diesen auch als Nachweis der Erfüllung ihrer Dokumentationspflichten dienen.
* QR-Codes müssen nicht in Form von Schlüsselanhängern bezogen werden sondern können von Nutzern selbst dezentral erstellt und ausgedruckt werden. Betreiber oder andere Akteure können theoretisch auch vorgefertigte QR-Code Serien an Nutzer ausgeben, welche diese dann im Rahmen der Protokollerweiterung unten selbst mit ihren Daten verknüpfen. In anderen Konstellationen können pseudonyme QR-Codes ausgegeben werden um eine Kontaktnachverfolgung unter Beteiligung eines neutralen Dritten zu ermöglichen.


### Risiko-Analyse

Folgende Risiken wurden von uns bisher identifiziert:

#### Wiederverwendung von QR-Codes

Da QR-Codes nur dezentral erfasst werden können sie zunächst unerkannt mehrfach benutzt werden. Hierbei könnte z.B. ein Betreiber oder ein Dritter der Zugang zu einem bereits verwendeten QR-Code eines Nutzers erhält diesen verwenden, um in anderen Ortschaften Besuche zu dokumentieren.

Dieser Angriff ist jedoch bei der Kontaktnachverfolung leicht erkennbar, die durch Mehrfachverwendung eines QR-Codes generierten Daten können vermutlich leicht entfernt werden. Mögliche Quellen des Missbrauchs lassen sich zudem anhand vorliegender sowie fehlender Daten mithilfe einer Befragung des betroffenen Nutzers einfach rekonstruieren und fehlende QR-Codes können bei der Überprüfung eines Betreibers anschließend identifziert werden. Eine missbräuchliche Nutzung ist damit (wie bei anderen Verfahren) nicht ausgeschlossen, kann aber im Gegensatz zu diesen effektiv nachverfolgt und gegebenenfalls geahndet werden. Dies schafft für Betreiber und Nutzer effektive Anreize, QR-Codes sicher zu verwahren und nicht zu missbrauchen.

Das Risiko der Wiederverwendung kann zudem über einen Gültigkeitsmechanismus begrenzt werden (bestimmte QR-Codes können z.B. nur an bestimmten Tagen verwendet werden), dies würde jedoch die Verwendung der Codes durch den Nutzer etwas komplizierter gestalten. Ob dies sinnvoll ist muss abgewogen werden (im Rahmen der Nutzung einer App ist ein solches Verfahren jedoch leicht zu implementieren, daher wird es auch im digitalen Protokoll entsprechend umgesetzt).

#### Hinterlegung falscher Daten

Der oben beschriebene Validierungs-Ablauf kann das Vorhandensein und die Echtheit bestimmter Nutzerdaten im System garantieren. Er erfordert jedoch die Einbindung einer vertrauenswürdigen Stelle im Initialisierungsprozess.

#### Rekonstruktion von Besuchshistorien

Zur Rekonstruktion einer Besuchshistorie muss eine Akteur wissen, welche Werte $H _ i$ zu einem gegebenen Nutzer gehören. Da diese Werte mithilfe eines geheimen Schlüssels $ H _ s $ erzeugt werden, muss der Angreifer daher im Besitz dieses Schlüssels sein um die Serie $H _ 1 \cdots H _ n$ zu rekonstruieren. Der Schlüssel $ H _ s $ befindet sich unter Kontrolle des Nutzers und kann nur von GÄs entschlüsselt werden. Ein Angreifer muss daher sowohl den privaten GÄ-Schlüssel besitzen, als auch den QR-Code des Nutzers mit dem Wert $ H _ s$. Zusätzlich muss der Angreifer die Besuchsdaten einzelne von den Betreibern extrahieren, z.B. durch Manipulation der Web-Anwendungen.

Unter der Annahme, dass zumindest eine dieser drei Angriffe fehlschlägt kann die Rekonstruktion von Besuchshistorien ausgeschlossen werden.

### Verbesserungsmöglichkeiten

Die folgenden Aspekte des Protokolls können aus unserer Sicht noch verbessert werden:

* **Datenhaltung im Backend**: Im aktuellen Entwurf werden die Kontaktdaten eines Nutzers verschlüsselt in einem Backend gespeichert, um im Bedarfsfall von einem Gesundheitsamt abgerufen werden zu können. Eine Entschlüsselung ist prinzipiell nur möglich, wenn dem Gesundheitsamt zusätzlich noch eine Schlüsselhälfte des Nutzers vorliegt, die dieser entweder direkt an das Gesundheitsamt übermittelt hat, oder die im Rahmen einer Besuchsdatenabfrage von einem Betreiber übermittelt wurde. Trotzdem stellt jede zentrale Datenhaltung eine Gefahr für die Privatsphäre der Nutzer dar. Eine Variante dieses Protokolls kann daher die Zentralisierung dieser Daten verzögern. Dies hat jedoch seinerseits Nachteile, da in diesem Fall Gesundheitsämter nur unter aktiver Mithilfe von Nutzern deren Kontaktdaten erhalten können. Wenn Nutzer nur schwer erreichbar sind kann dies eine effektive Kontaktnachverfolgung verzögern und behindern. In diesem Sinne ist die Privatsphäre der Nutzer gegenüber dem Interesse des Gesundheitsamts abzuwägen.

### Varianten

Um den Schutz der Privatsphäre von Nutzern weiter zu verbessern, können verschiedene Varianten des Protokolls erstellt werden, die in den folgenden Abschnitten diskutiert werden.

#### Anlassbezogene Datenfreigabe

Die Besuchsdatenerfassung mithilfe der QR-Daten funktioniert auch ohne die Hinterlegung von Kontaktdaten in einem zentralen Backend. Dementsprechend kann die Erfassung und Speicherung dieser Daten folgendermaßen hinausgezögert werden:

* Statt bei der Erstellung von QR-Codes direkt dem Backend verschlüsselte Kontaktdaten bereitzustellen, kann die Web-Anwendung des Nutzers zunächst nur einen $ I _ D$ Wert sowie ein Token $ Z $ vom Backend anfordern und gleichzeitig den öffentlichen Teil eines von der Anwendung generierten asymmetrischen Schlüsselpaars für dieses dort hinterlegen. Das Backend speichert diesen gemeinsam mit $ Z $ und $I _ D$ ab. Der zugehörige private Schlüssel, $ I _ D$ und $ Z $ können von der Anwendung dem Nutzer zur Aufbewahrung zur Verfügung gestellt werden.
* Werden bei der Kontaktnachverfolgung die entsprechenden Besuchsdaten gefunden stellt das Backend fest, dass zu diesen noch keine Kontaktdaten existieren. Es schreibt dann das Token $ Z $ über eine öffentliche Liste zur Vervollständigung aus.
* Der Nutzer kann der Web-Anwendung regelmäßig die Daten $ Z $ und $ I _ D $ vorlegen, diese erkennt dann anhand des veröffentlichten Tokens $ Z $, dass die Daten des Nutzers zur Kontaktnachverfolgung angefordert wurden. Es fordert diesen dann dazu auf, die Daten anzugeben, verschlüsselt diese mit dem öffentlich GÄ-Schlüssel, signiert die Daten mit dem privaten Schlüssel des generierten Schlüsselpaares und teilt sie über die API dem Backend mit, das diese speichert.
* Das Gesundheitsamt kann die Daten nun regulär über die API vom Backend abrufen.

Dieser Ablauf ist datenschutzfreundlicher, aber für ein papiergestütztes Verfahren eventuell nicht praktikabel da er auf die aktive Mitarbeit des Nutzers angewiesen ist. Nutzer welche die Web-Anwendung nicht regelmäßig öffnen erfahren nicht, dass ihre Daten angefordert wurden. Das Verfahren ist jedoch sehr gut geeignet für eine digitale Kontaktnachverfolgung per App. Es zögert in diesem Fall die Speicherung personenbezogener Informationen solange hinaus, bis diese wirklich benötigt werden.

Die mit dem Verfahren verbundene, verzögerte Bereitstellung von Kontaktdaten muss wiederum gegen den Schutz der Privatsphäre einzelner Nutzer abgewogen werden.