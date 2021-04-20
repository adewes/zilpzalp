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

Hier zeigt sich, dass wir das Problem der Dokumentation von **Besuchen** unabhängig vom Problem der Speicherung von **Kontaktdaten** betrachten können. Systeme wie **Luca** vermischen beide Aspekte, indem sie Kontaktdaten zusammen mit der Dokumentation eines Besuchs verarbeiten. Im Gegensatz hierzu löst Zilp-Zalp beide Probleme unabhängig:

* Zunächst schaffen wir eine Möglichkeit, Kontaktdaten so zu hinterlegen, dass sie nur **anlassbezogen** von **Gesundheitsämtern** zur Kontaktnachverfolgung verarbeitet werden können und auch verschlüsselt keinen anderen Akteuren im System zugänglich sind.
* Weiterhin schaffen wir eine Möglichkeit, **Besuche** robust und datensparsam zu dokumentieren.

## Protokoll (v0.1)

Das papiergestützte, dezentrale Protokoll von Zilp-Zalp umfasst folgende Akteure:

* **Nutzer**, welche Ihre Kontaktdaten sowie ihre **Besuchshistorie** anlassbezogen **Gesundheitsämtern** zur **Kontaktnachverfolgung** zur Verfügung stellen.
* **Betreiber** von **Ortschaften**, die **Besuche** von **Nutzern** dokumentieren um eine **Kontaktnachverfolgung** von **Gesundheitsämtern** zu ermöglichen.
* **Gesundheitsämter**, die **Besuchshistorien** und **Kontaktdaten** nutzen um Kontaktnachverfolgung zu betreiben.

Um den Austausch dieser Daten zwischen den Akteuren zu ermöglichen implementiert **Zilp-Zalp** eine Infrastruktur mit verschiedenen Diensten:

* **Web-Anwendungen** für **Betreiber**, **Gesundheitsämter** und **Nutzer** (für letztere hier nur zur Erstellung von QR-Codes benötigt).
* Eine **öffentliche API** zum Austausch von Besuchshistorien und Kontaktdaten.
* Eine **private API** zur Nutzung durch Gesundheitsämter.

Die Kommunikation zwischen **Gesundheitsämtern** und anderen **Akteuren** im System wird durch **Public-Key Verschlüsselung** gesichert. Diese dient dazu, beliebigen Akteuren zu erlauben Anfragen von Gesundheitsämtern zu validieren sowie für Daten die an Gesundheitsämter geschickt werden eine Ende-zu-Ende Verschlüsselung zu ermöglichen. Im Folgenden nehmen wir an, dass Gesundheitsämter jeweils über ein Schlüsselpaar zum Signieren sowie zum Ver- & Entschlüsseln von Daten verfügen, und andere Akteure die Vertrauenswürdigkeit der öffentlichen Schlüssel dieser Paare über einen geeigneten Mechanismus (z.B. ein Root-Zertifikat das gemeinsam mit der Web-Anwendung ausgeliefert wird) verifizieren können.

### Hinterlegung von Kontaktdaten für Gesundheitsämter

Nutzer im System möchten **Gesundheitsämtern** anlassbezogen ihre **Kontaktdaten** zur Verfügung stellen. Hierbei legen wir die Annahme zugrunde, dass Nutzer die Daten so hinterlegen möchten, dass **GÄs** bei gegebenem Anlass ohne weiteres Zutun der Nutzer (allerdings für diese nachvollziebar) auf die Daten zugreifen können.

Die Kontaktdaten sollen hierbei nur von vertauenswürdigen Akteuren verarbeitet werden können und generell möglichst wenigen Akteuren im System vorliegen (egal ob in verschlüsselter oder unverschlüsselter Form).

Um Kontaktdaten zu erfassen, öffnen Nutzer zunächst die **Zilp-Zalp** Web-Anwendung und erfassen dort relevante Daten wie Name, Anschrift, Telefonnummer und E-Mail Adresse (eine Validierung dieser Daten kann in einer Protokollerweiterung durch externe Dienste erfolgen  und wird in `v0.2` beschrieben). Anschließend generiert die Anwendung zwei zufallsgenerierte, symmetrische Schlüssel $K _ A$ und $K _ B$, die über ein geeignetes Schlüsselableitungsverfahren miteinander zu einem Schlüssel $K _ C$ kombiniert werden. Die Anwendung verschlüsselt nun die Kontaktdaten des Nutzers symmetrisch mit Schlüssel $K _ C$, fügt zu diesen verschlüsselten Daten den Schlüssel $K _ A$ hinzu, verschlüsselt diese Daten asymmetrisch mit dem öffentlichen Schlüssel der **GÄs** und übermittelt diese Daten an die **Zilp-Zalp API**, welche sie in einem Backend ablegt. Die dort abgelegten Daten sind für keinen Akteur ohne Kenntnis des Schlüssels $K _ B$ und des privaten Schlüssels der **GÄs** entschlüsselbar. Obgleich hier eine zentrale Speicherung vorliegt, kann eine Verarbeitung der gespeicherten Daten nur unter Zuhilfenahme des privaten Schlüssels der **GÄ** sowie von $K _ B$ erfolgen, letzterer befindet sich zunächst unter Kontrolle des Nutzers und kann nur über diesen oder über einen Betreiber an das Backend gelangen. Nur das Backend kann zudem den Schlüssel effektiv extrahieren. Um eine solche zentrale Speicherung zu umgehen wurde eine zusätzliche Variante des Protokolls erarbeitet (siehe unten).

Als Antwort auf die Speicher-Anfrage der Web-Anwendung liefert das Backend dieser eine gegebene Anzahl von Hashwerten zurück (z.B. 100). Diese Werte werden vom Backend errechnet, indem zunächst ein Zufallswert $H _ 1$ generiert wird und dieser anschließend mit einem nur dem Backend vorliegenden Schlüssels $K _ s$ wiederholt iterativ mit sich selbst kombiniert wird um eine Reihe von Werten $H _ 2\cdots H _ n$ zu erzeugen. Das Backend speichert hierbei den Wert $H _ 1$ zusammen mit den verschlüsselten Daten in einer Datenbank ab.

Die Anwendung des Nutzers generiert nun Werte $Z _ i = H _ {2i+1} \oplus K _ B$ und paart sie mit den Werten $H _ {2i+2}$ zu $(Z _ i, H _ {2i+2}) = (H _ {2i+1} \oplus K _ B, H _ {2i+2})$. Diese Wertepaare dienen zur Kontaktnachverfolgung und können vom Backend verschlüsselten Kontaktdaten zugeordnet werden. Andere Akteure wie Betreiber oder Nutzer können hingegen ohne Kenntnis von $K _ s $ Wertepaare nicht einzelnen Nutzern zuordnen oder erkennen, dass zwei Wertepaare vom gleichen Nutzer stammen. Gegebenenfalls kann das Backend jeden der Hashwerte $H _ i$ zusäzlich mit einer Signatur $S _ i$ versehen um dessen Herkunft zu belegen (`v0.2`).

Jedes Wertepaar $(Z _ i, H _ {2i+2})$ kann nun zu einem QR-Code kodiert werden, diese Codes können ausgedruckt und zur Dokumentation von Besuchen verwendet werden. Hierbei können für Nutzer eine große Zahl an QR-Codes generiert werden (z.B. 100). Einer der QR-Codes wird hierbei für die Übermittlung ans Gesundheitsamt vorbehalten, welches diesen zur Kontaktnachverfolgung nutzt. Alle anderen werden für die Dokumentation von Besuchen verwendet.

### Besuchsdokumentation

Zur Dokumentation des Besuchs einer Ortschaft gegenüber Betreibern übergeben Nutzer diesen einfach jeweils einen zufälligen QR-Code. Hierbei ist es möglich, neben dem QR-Code zusätzliche Meta-Daten wie die genaue Ankunftszeit sowie die Verweildauer einzutragen, um die Genauigkeit der Dokumentation zu erhöhen. Der Betreiber erfasst die über einen gegebenen Zeitraum (z.B. einen Tag) erhaltenen QR-Codes anschließend mithilfe der Web-Anwendung, sie werden zunächst nur lokal gespeichert. Betreiber können hierbei auch zusätzliche Meta-Daten erfassen um die Genauigkeit zur Kontaktnachverfolgung zu verbessern.

### Kontaktnachverfolgung

Um mögliche Risikokontakte eines infizierten Nutzers zu ermitteln übergibt dieser zunächst einen seiner QR-Codes an das Gesundheitsamt (entweder digital oder analog). Dieses erstellt unter Zuhilfenahme des Backends eine signierte Anfrage, die alle Hashwerte $H _ {2i+2}$ des Nutzers beinhaltet. Die Web-Anwendungen der Betreiber laden regelmäßig die Liste dieser Anfragen herunter und gleichen sie mit den lokal gespeicherten Hashwerten ab. Ergibt sich eine Übereinstimmung, werden nach Bestätigung durch den Betreiber alle Besuchsdaten die mit diesen in Zusammenhang stehen (z.B. ermittelt durch Vergleich der Besuchszeiten) über die öffentliche API an das Backend übertragen. Dieses sucht die diesen entsprechenden, zweifach verschlüsselten Kontaktdaten heraus und stellt sie zusammen mit den Besuchsdaten dem Gesundheitsamt zur Verfügung. Dieses entfernt dann zunächst mit seinem privaten Schlüssel die äußere Verschlüsselung und nutzt dann den innen vorliegenden Schlüssel $K _ A$, sowie den aus den Besuchsdaten mithilfe von $K _ s$ durch das Backend rekonstruierten Schlüssel $K _ B$ um wiederum $K _ C$ zu rekonstruieren, womit anschließend die Kontaktdaten entschlüsselt werden können. Diese können nun mit ihren Meta-Daten für die Kontaktnachverfolgung genutzt werden.

### Vorteile & Motivation

Das vorgestellte Protokoll hat aus unserer Sicht folgende Vorteile:

* Personenbezogene Daten werden nur von einer einzelnen, vertauenswürdigen Stelle im System aufbewahrt. Im Gegensatz zu anderen Systemen erhalten weder Betreiber noch andere Dritte Zugang zu verschlüsselten Kontaktdaten der Nutzer.
* Da jeder Nutzer über eine Vielzahl von QR-Codes verfügt und diese nur vom Backend miteinander in Verbindung gebracht werden können ist es für Betreiber ohne Besitz der entsprechenden Schlüssel fast unmöglich, Besuchsdaten einzelner Nutzer miteinander zu korrelieren um z.B. Besuchshistorien zu erstellen.
* Ein Verlust von Besuchsdaten eines Betreibers oder selbst ein konspirativer Missbrauch des Systems durch verschiedene Betreiber führt nicht zu einem Verlust personenbezogener Daten.
* Eine Kompromittierung des Backends macht einem Angreifer lediglich wenige, relativ unkritische Meta-Daten zugänglich. Das Backend speichert nur verschlüsselte Kontaktdaten und Hash-Werte, nicht jedoch wie in anderen Systemen komplette Besuchshistorien.
* Die Datenhaltung im Backend sowie der Kommunikationsaufwand ist sehr gering, nur im Falle einer Kontaktnachverfolgung sowie beim Erstellen von QR-Codes werden Daten zwischen dem Backend und anderen Akteuren ausgetauscht. Die Dokumentation von Besuchen erfolgt dezentral und ohne Kommunikation mit dem Backend, es fallen daher bei Besuchen keine Meta-Daten an.
* Eine missbräuchliche Abfrage großer Datenmengen ist leicht zu entdecken. Da alle Anfragen über eine öffentliche Schnittstelle verfügbar gemacht werden ist von außen ersichtlich, wieviele Daten von Gesundheitsämtern abgefragt werden.
* Für die Dokumentation eines Besuchs ist keine Interaktion eines Nutzers mit einer Web-Anwendung oder einem Smartphone notwendig. Betreiber können Besuche auch asynchron erfassen und mit zusätzlichen Metadaten versehen. Der Aufwand zum Einlesen von QR-Codes ist gering, und die Aufbewahrung der Codes durch Betreiber stellt ein zusätzliches Backup zu den digitalen Daten dar und kann diesen auch als Nachweis der Erfüllung ihrer Dokumentationspflichten dienen.
* QR-Codes müssen nicht in Form von Schlüsselanhängern bezogen werden sondern können von Nutzern selbst dezentral erstellt und ausgedruckt werden. Betreiber oder andere Akteure können theoretisch auch vorgefertigte QR-Code Serien an Nutzer ausgeben, welche diese dann im Rahmen der Protokollerweiterung unten selbst mit ihren Daten verknüpfen. In anderen Konstellationen können pseudonyme QR-Codes ausgegeben werden um eine Kontaktnachverfolgung unter Beteiligung eines neutralen Dritten zu ermöglichen.


### Risiko-Analyse

Folgende Risiken wurden von uns bisher identifiziert:

#### Wiederverwendung von QR-Codes

Da QR-Codes nur dezentral erfasst werden können sie zunächst unerkannt mehrfach benutzt werden. Hierbei könnte z.B. ein Betreiber oder ein Dritter der Zugang zu einem bereits verwendeten QR-Code eines Nutzers erhält diesen verwenden, um in anderen Ortschaften Besuche zu dokumentieren.

Dieser Angriff ist jedoch bei der Kontaktnachverfolung leicht erkennbar, die durch Mehrfachverwendung eines QR-Codes generierten Daten können vermutlich leicht entfernt werden. Mögliche Quellen des Missbrauchs lassen sich zudem anhand vorliegender sowie fehlender Daten mithilfe einer Befragung des betroffenen Nutzers einfach rekonstruieren und fehlende QR-Codes können bei der Überprüfung eines Betreibers anschließend identifziert werden. Eine missbräuchliche Nutzung ist damit (wie bei anderen Verfahren) nicht ausgeschlossen, kann aber im Gegensatz zu diesen effektiv nachverfolgt und gegebenenfalls geahndet werden. Dies schafft für Betreiber und Nutzer effektive Anreize, QR-Codes sicher zu verwahren und nicht zu missbrauchen.

#### Hinterlegung falscher Daten

Wie bei anderen Systemen ist die Validierung von Nutzerdaten bei gleichzeitiger Einhaltung der Pseudonymität eines Nutzers schwierig. Die folgende Version (`0.2`) dieses Protokolls soll daher eine Möglichkeit zur Validierung einzelner Kontaktdaten beinhalten. Generell ist eine durchgängige Validierung jedoch kaum möglich, ohne ein sehr invasives Überwachungssystem zu schaffen. Kontaktnachverfolgung basiert jedoch auf dem Eigeninteresse und der Eigenverantwortung der Beteiligten und selbst die Gesetzgebung hat hierbei anerkannt, dass eine zwangsweise Validierung nicht sinnvoll ist.

#### Rekonstruktion von Besuchshistorien

Das **Backend** verfügt über alle Informationen die nötig sind, um alle Hashwerte die einem Nutzer zugeordnet sind zu rekonstruieren. Dies ist im Rahmen des Protokolls notwendig, um die Besuchshistorie eines Nutzers mithilfe der Betreiber zu rekonstruieren. Würde ein Dritter sowohl in den Besitz der im Backend gespeicherten Werte $H _ 1$ als auch des Schlüssels $ K _ s$ gelangen, könnte er eventuell beobachtete einzelne Besuchsdaten spezifischen Nutzern zuorden. Hierzu wäre jedoch weiterhin erforderlich, dass er ebenfalls Zugang zu diesen Daten erhält, welche dezentral bei den Betreibern gespeichert werden.

Generell führt eine Kompromittierung sowohl des Backends als auch der Betreiber-Anwendungen in dem Protokoll dazu, dass Besuchshistorien rekonstruiert werden können. Dies kann in der nächsten Protokollversion adressiert werden. 

### Verbesserungsmöglichkeiten

Die folgenden Aspekte des Protokolls können aus unserer Sicht noch verbessert werden:

* **Datenhaltung im Backend**: Im aktuellen Entwurf werden die Kontaktdaten eines Nutzers verschlüsselt in einem Backend gespeichert, um im Bedarfsfall von einem Gesundheitsamt abgerufen werden zu können. Eine Entschlüsselung ist prinzipiell nur möglich, wenn dem Gesundheitsamt zusätzlich noch eine Schlüsselhälfte des Nutzers vorliegt, die dieser entweder direkt an das Gesundheitsamt übermittelt hat, oder die im Rahmen einer Besuchsdatenabfrage von einem Betreiber übermittelt wurde. Trotzdem stellt jede zentrale Datenhaltung eine Gefahr für die Privatsphäre der Nutzer dar. Eine Variante dieses Protokolls verzögert daher die Zentralisierung dieser Daten. Dies hat jedoch seinerseits Nachteile, da in diesem Fall Gesundheitsämter nur unter aktiver Mithilfe von Nutzern deren Kontaktdaten erhalten können. Wenn Nutzer nur schwer erreichbar sind kann dies eine effektive Kontaktnachverfolgung verzögern und behindern. In diesem Sinne ist die Privatsphäre der Nutzer gegenüber dem Interesse des Gesundheitsamts abzuwägen.

### Varianten

Um den Schutz der Privatsphäre von Nutzern weiter zu verbessern, können verschiedene Varianten des Protokolls erstellt werden, die in den folgenden Abschnitten diskutiert werden.

#### Anlassbezogene Datenfreigabe

Die Besuchsdatenerfassung mithilfe der QR-Daten funktioniert auch ohne die Hinterlegung von Kontaktdaten in einem zentralen Backend. Dementsprechend kann die Erfassung und Speicherung dieser Daten folgendermaßen hinausgezögert werden:

* Statt bei der Erstellung von QR-Codes direkt dem Backend verschlüsselte Kontaktdaten bereitzustellen, kann die Web-Anwendung des Nutzers zunächst nur die Hashwerte anfragen und diese vom Backend zusammen mit zwei Zufallswerten $Z _ 1$ und $ Z _ 2$ speichern lassen. Beide Zufallswerte erhält der Nutzer anschließend zur Verwahrung.
* Werden bei der Kontaktnachverfolgung die entsprechenden Besuchsdaten gefunden stellt das Backend fest, dass zu diesen noch keine Kontaktdaten existieren. Es schreibt den Zufallswert $ Z _ 1$ über eine öffentliche Liste zur Vervollständigung aus.
* Die Web-Anwendung des Nutzers erkennt anhand des veröffentlichten Zufallswert $Z _ 1$, dass die Daten des Nutzers zur Kontaktnachverfolgung angefordert wurden. Es fordert diesen dann dazu auf, die Daten anzugeben, verschlüsselt diese wie im normalen Protokollablauf und teilt sie über die API dem Backend mit, wobei der Zufallswert $ Z _ 2 $ ebenfalls übermmittelt wird, um zu verhindern, dass andere Nutzer die Daten vervollständigen können.
* Das Gesundheitsamt kann die Daten nun über die API vom Backend abrufen.

Dieser Ablauf ist datenschutzfreundlicher, aber für ein papiergestütztes Verfahren eventuell nicht praktikabel da er auf die aktive Mitarbeit des Nutzers angewiesen ist. Nutzer welche die Web-Anwendung nicht regelmäßig öffnen erfahren nicht, dass ihre Daten angefordert wurden. Das Verfahren ist jedoch sehr gut geeignet für eine digitale Kontaktnachverfolgung per App. Es zögert in diesem Fall die Speicherung personenbezogener Informationen solange hinaus, bis diese wirklich benötigt werden.

Die mit dem Verfahrenv verbundene, verzögerte Bereitstellung von Kontaktdaten muss wiederum gegen den Schutz der Privatsphäre einzelner Nutzer abgewogen werden.