# Papiergestützte Kontaktnachverfolgung

Viele Systeme zur Kontaktnachverfolgung wie Luca oder Recover setzen primär auf technische Hilfsmittel wie Smartphone-Apps, um Besuche zu dokumentieren.
Dies ist aus verschiedenen Gründen problematisch. Papiergestützte bzw. analoge Protokolle werden zwar auch von anderen Systemen wie Luca angeboten (z.B. in Form von "Schlüsselanhängern"), jedoch weisen statische QR-Codes eine Reihe von Datenschutz-Problemen auf.

Zilp-Zalp setzt hingegen primär auf ein papiergestütztes Protokoll, das nur unterstützend technologische Hilfsmittel wie Web-Anwendungen nutzt und im Wesentlichen für den Nutzer bei Besuchen komplett ohne technologische Hilfsmittel funktioniert. Ein solches Protokoll hat in der Praxis viele Vorteile:

* Nutzer müssen keine Smartphone-Anwendungen von eventuell nicht vertrauenswürdigen Quellen installieren.
* Für die Dokumentation von Besuchen ist es nicht notwendig, ein Smartphone mit sich zu führen oder über Internet-Konnektivität zu verfügen.
* Das Verfahren ist auch für Menschen nutzbar die keine Erfahrung im Umgang mit Smartphone Apps haben oder diese aus anderen Gründen nicht nutzen können.

## Grundideen

Um die in der [Übersicht]({{'protocols.index'|href}}) genannten Anforderungen an die Kontaktnachverfolgung zu erfüllen, muss folgendes gegeben sein:

* Ein Betreiber einer **Ortschaft** muss in der Lage sein, den **Besuch** eines **Nutzers** rechtskonform zu dokumentieren.
* Ein **Gesundheitsamt (GA)** (Plural: **GÄ**) muss in der Lage sein, in Zusammenarbeit mit einem infizierten Nutzer (unter möglichst geringem Aufwand) mögliche Risikokontakte dieses **Nutzers** basierend auf dessen **Besuchshistorie** zu identifizieren und zu kontaktieren.

Grundlegend müssen wir für eine robuste Kontaktermittlung in der Lage sein, mögliche Schnittmengen zwischen Besuchen einzelner Nutzer zu ermitteln. Dies erfordert generell eine Dokumentation der Besuche einzelner Nutzer, sowie ein Verfahren um für einen spezifischen Besuch eines Nutzers alle Besuche anderer Nutzer zu ermitteln die in der gleichen Ortschaft und im gleichen Zeitraum erfolgten.

### Mögliche Strategien

Prinzipiell gibt es verschiedene Strategien, um diese Anforderungen umzusetzen. Die wohl naheliegendste aber nicht unbedingt privatsphäre-freundlichste Strategie ist, Besuchsdaten zentral zu verwalten und bei Bedarf aus dieser zentralen Datenhaltung relevante Besuche zu ermitteln. Dieser Ansatz wird u.a. von **Luca** verfolgt. Problematisch hierbei ist, dass durch die zentrale Datenhaltung eine Vielzahl von Möglichkeiten zur Überwachung von Nutzern entstehen, die sich nur schwer technologisch oder organisatorisch lösen lassen.

Eine datenschutzfreundlichere Lösung ist daher die dezentrale Speicherung von Kontaktdaten. Um diese zu evaluieren teilen wir das Problem der Kontaktverfolgung zunächst in zwei Unterprobleme auf:

* GÄ müssen in der Lage sein, **Besuchshistorien** einzelner Nutzer zu rekonstruieren und zu diesen Historien relevante **Besuche** anderer Nutzer zu erhalten.
* GÄ müssen ebenfalls in der Lage sein, **Kontaktdaten** der Personen zu ermitteln, die zu den extrahierten **Besuchen** gehören.

Hier zeigt sich, dass wir das Problem der Dokumentation von **Besuchen** unabhängig vom Problem der Speicherung von **Kontaktdaten** betrachten können.

* Zunächst schaffen wir eine Möglichkeit, Kontaktdaten so zu hinterlegen, dass sie nur **anlassbezogen** von GÄ zur Kontaktnachverfolgung verarbeitet werden können und auch verschlüsselt keinen anderen Akteuren im System zugänglich sind.
* Weiterhin schaffen wir eine Möglichkeit, **Besuche** robust und datensparsam zu dokumentieren.

## Protokoll (v0.5)

### Änderungshistorie

* `v0.5`
  * Daten zu Örtlichkeiten können jeweils mit einem Gruppenschlüssel verschlüsselt und zu Besuchsdaten hinzugefügt werden. Dies ermöglicht die anonyme Speicherung der Daten in einem Backend, was die Verfügbarkeit der Daten erhöht und das Verlustrisiko im Gegensatz zu einer voll dezentralen Speicherung reduziert. Daten können hierbei vom Backend keiner spezifischen Ortschaft zugeordnet werden.
  * Es wird ein Ombuds-Prozess beschrieben, der den Datenzugriff für Fälle regelt, in denen ein Gesundheitsamt Daten anfragt ohne den Geheimschlüssel eines Nutzers vorlegen zu können.
  * Es wurde eine Erweiterung hinzugefügt, welche die manuelle Erfassung von Kontaktdaten durch den Betreiber einer Ortschaft beschreibt, sowie einen Prozess für Gesundheitsämter um auf diese im Auftrag des Nutzers erhobenen Daten zweckgebunden zugreifen zu können.

Das papiergestützte, dezentrale Protokoll von Zilp-Zalp umfasst folgende Akteure:

* **Nutzer**, welche Ihre **Kontaktdaten** sowie ihre **Besuchshistorie** anlassbezogen GÄ zur **Kontaktnachverfolgung** zur Verfügung stellen.
* **Betreiber** von **Ortschaften**, die **Besuche** von **Nutzern** dokumentieren um eine **Kontaktnachverfolgung** von GÄ zu ermöglichen.
* **Gesundheitsämter (GÄ)**, die **Besuchshistorien** und **Kontaktdaten** nutzen um Kontaktnachverfolgung zu betreiben.

Um den Austausch dieser Daten zwischen den Akteuren zu ermöglichen implementiert Zilp-Zalp eine Infrastruktur mit verschiedenen Diensten:

* **Web-Anwendungen** für Betreiber, GÄ und Nutzer (für letztere hier nur zur Erstellung von QR-Codes benötigt).
* Eine **API** zum Austausch von Besuchshistorien und Kontaktdaten.

Die Verschlüsselung von Daten für GÄ sowie die Authentifizierung von öffentlichen Anfragen dieser erfolgt durch Public-Key Verschlüsselung. Im Folgenden nehmen wir an, dass GÄ jeweils über ein Schlüsselpaar zum Signieren sowie zum Ver- & Entschlüsseln von Daten verfügen, und andere Akteure die Vertrauenswürdigkeit der öffentlichen Schlüssel dieser Paare über einen geeigneten Mechanismus (z.B. ein Root-Zertifikat das gemeinsam mit der Web-Anwendung ausgeliefert wird) verifizieren können.

<!--translate:ignore-->
<aside>
<div style="max-width: 300px">
    {{'diagrams/Folie8.PNG'|picture(class="img")}}
</div>
<p>
<!--translate:ignore-->
Erläuterungen der im Text folgenden Digramme. a) Öffentlicher aymmetrischer Schlüssel. b) Privater asymmetrischer Schlüssel. c) Symmetrischer Schlüssel. d) Verschlüsselung mit einem symmetrischen oder asymmetrischen Schlüssel. e) Signierung mit einem privaten asymmetrischen Schlüssel. 
<!--translate:ignore-->
</p>
</aside>
<!--translate:ignore-->


### Initialisierung

Nutzer im System möchten GÄ anlassbezogen ihre Kontaktdaten zur Verfügung stellen. Hierbei legen wir die Annahme zugrunde, dass Nutzer die Daten so hinterlegen möchten, dass GÄ bei gegebenem Anlass ohne weiteres Zutun der Nutzer (allerdings für diese nachvollziebar) auf die Daten zugreifen können.

Die Kontaktdaten sollen hierbei nur von vertauenswürdigen Akteuren verarbeitet werden können und generell möglichst wenigen Akteuren im System vorliegen (egal ob in verschlüsselter oder unverschlüsselter Form).

Um Kontaktdaten zu erfassen, öffnen Nutzer zunächst die Web-Anwendung und erfassen dort relevante Daten wie Name, Anschrift, Telefonnummer und E-Mail Adresse (eine Validierung dieser Daten wird unten beschrieben). Anschließend generiert die Anwendung zwei zufallsgenerierte, symmetrische Schlüssel $K _ a$ und $K _ b$, die über ein geeignetes Schlüsselableitungsverfahren miteinander zu einem Schlüssel $K _ c$ kombiniert werden. Die Anwendung verschlüsselt nun die Kontaktdaten des Nutzers symmetrisch mit Schlüssel $K _ c$, fügt zu diesen verschlüsselten Daten den Schlüssel $K _ a$ hinzu, verschlüsselt diese Daten asymmetrisch mit dem öffentlichen GÄ-Datenschlüssel und übermittelt diese Daten an die API, welche sie in einem Backend ablegt und einen zufälligen Identifier $I_D$ zurückgibt. Die dort abgelegten Daten sind für keinen Akteur ohne Kenntnis des Schlüssels $K _ b$ sowie des privaten Schlüssels der GÄ entschlüsselbar. Letzterer befindet sich zunächst unter Kontrolle des Nutzers und kann nur über diesen oder über einen Betreiber an ein GÄ gelangen, das diesen entschlüsseln kann.

<!--translate:ignore-->
<aside>
<div style="max-width: 300px">
    {{'diagrams/Folie6.PNG'|picture(class="img img-responsive")}}
</div>
<p>
<!--translate:ignore-->
Kontaktdaten $ U _ d $, die ein Nutzer mit dem Schlüssel $ K _ a + K _ b $ verschüsselt in einem Backend verknüpft mit seiner $ I _ D $ (unverschlüsselt) speichert. Eine zunächst rein lokale Speicherung ist ebenfalls möglich (aber nur bei Verwendung der digitalen Kontaktnachverfolgung empfohlen).
<!--translate:ignore-->
</p>
</aside>
<!--translate:ignore-->


Weiterhin generiert die Anwendung des Nutzers einen Zufallswert $H _ s$, aus dem mit ein geeigneten Verfahren eine pseudozufällige Reihe weiterer Werte $H _ 1, H _ 2, \ldots H _ n$ erzeugt wird. Die Web-Anwendung speichert nun $H _ s$, $I _ D$ und $ K _ b$ zusammen in einer Datenstruktur und verschlüsselt diese mit dem öffentlichen GÄ-Datenschlüssel. Diese Daten verbleiben beim Nutzer und werden nur zur Kontaktnachverfolgung an ein GA weitergegeben.

Nun generiert die Anwendung Wertepaare bestehend aus $H _ i$ ($ \ge 1$) einerseits und $K _ b$ und $I _ D$ andererseits, wobei $H _ i$ unverschlüsselt und $(K _ b, I _ D)$ jeweils für jedes Wertepaar individuell mit dem GÄ-Datenschlüssel verschlüsselt wird. Hierbei wird an den Datensatz der im Rahmen der für diese generierte öffentliche Schlüssel $U _ i ^ \mathrm{pub} $ angehängt, den zugehörigen privaten Schlüssel $U _ i ^ \mathrm{priv} $ speichert die Anwendung zur späteren eventuellen Übergabe an das Gesundheitsamt.
Diese Paare werden für die Kontaktnachverfolgung genutzt und an Betreiber von Öffentlichkeiten weitergegeben.

<!--translate:ignore-->
<aside>
<div style="max-width: 600px">
    {{'diagrams/Folie3.PNG'|picture(class="img img-responsive")}}
</div>
<p>
<!--translate:ignore-->
a) Daten, die der Nutzer zur eventuellen Übergabe an das Gesundheitsamt verwahrt. $ K _ b $, $ I _ D $ und $ H _ s $ sind Nutzerdaten wie im Text beschrieben, $ U _ 1 \ldots U _ n $ private Datenschlüssel des Nutzers. b) Daten, die der Nutzer für sich selbst zur Kontrolle verwahrt. $ U $ bezeichnet einen Nutzerschlüssel mit dem dieser seine Daten verschlüsselt.
<!--translate:ignore-->
</p>
</aside>
<!--translate:ignore-->

Die Anwendung generiert anschließend aus den Daten QR-Codes, übergibt diese dem Nutzer zum Ausdruck und löscht anschließend alle Daten.
Die Daten welche im Falle der Kontaktnachverfolgung dem Gesundheitsamt übergeben werden $ ( K _ b, I _ D, H _ s, U _ 1 ^ \mathrm{priv} \ldots U _ n ^ \mathrm{priv} ) $, sowie die Daten die der Nutzer selbst zur Kontrolle und Anpassung seiner Daten nutzt können entweder in Dateien gespeichert werden, oder lokal verschlüsselt und anschließend im Backend abgelegt werden.
Im letzteren Fall wird von der Anwendung ein zufallsbasiertes Passwort sowie eine zufällige ID generiert, die der Nutzer notieren muss um die Daten später wiederherstellen zu können.
Eine lokale Speicherung als Datei ist hierbei aus Datenschutzsicht zu bevorzugen.

Hinweis: Aktuell wird die Sicherheit des Systems durch die Ableitung von $K _ c$ aus $(K _ a, K _ b)$ nicht erhöht, da $K _ b $ permanent mit den Kontaktdaten des Nutzers aufbewahrt wird.
In einer Erweiterung des Proktolls ist jedoch geplant, den Schlüssel $K _ b$ in einem zusätzlichen Schritt von durch ein GA von den Kontaktdaten zu trennen, ihn von Anfang an separat zu speichern oder ihn asymmetrisch zu verschlüsseln und einer weiteren Partei die Kontrolle über die Entschlüsselung zu geben.
Er wurde daher vorerst in dem Protokoll belassen.


<!--translate:ignore-->
<aside>
<div style="max-width: 800px">
    {{'diagrams/Folie4.PNG'|picture(class="img img-responsive")}}
</div>
<p>
<!--translate:ignore-->
Daten, die der Nutzer einem Betreiber zur Besuchsdokumentation übergibt. Jeweils nur ein Datenpaket wird pro Besuch übergeben und danach nicht wiederverwendet.
<!--translate:ignore-->
</p>
</aside>
<!--translate:ignore-->

#### Sequenzdiagramm

Das folgende Sequenzdiagramm fasst den Initialisierungsprozess zusammen.

<div>
    {% include "common/protocols/_initialization.html" %}
</div>

#### Optional: Initialisierung mit Daten-Validierung

Im Rahmen der normalen Initialisierung erfolgt keine Prüfung der vom Nutzer angegebenen Kontaktdaten. Wenn eine Validierung dieser Daten gewünscht ist, muss die Initialisierung mithilfe eines vertrauenswürdigen Dritten erfolgen. Hierzu betreibt dieser Dritte eine spezielle Version der Web-Anwendung, über die Nutzer zunächst genau wie oben ihre Daten initialisieren. Im Gegensatz zur normalen Initialisierung prüft der Dritte hierbei jedoch vor der Verschlüsselung die Daten (z.B. durch Abgleich mit einem Ausweisdokument) und bestätigt deren Korrektheit. Die Web-Anwendung signiert anschließend jedes Wertepaar des Nutzers mit einer Signatur, welche das Vorhandensein korrekter Nutzerdaten zu dem Wertepaar zertifiziert. Diese Signaturen $ S _ i $ werden zusätzlich zu den Wertepaaren auf den QR-Codes des Nutzers aufgebracht. Die Web-Anwendung eines Betreibers kann beim Scannen eines QR-Codes diese Signatur einlesen und bestätigen. Der Betreiber kann hiermit bestätigen, dass zu dem QR-Code validierte Nutzerdaten gehören. Zudem kann der Dritte die Gültigkeit der QR-Codes beschränken. Dies ist sinnvoll um die Wiederverwendung im System zu verhindern.

Vertrauenswürdige Dritte könnten beispielsweise staatliche Institutionen aber auch ggf. privatwirtschaftliche Akteure (z.B. Postfilialen) sein, die bereits Erfahrung mit der Validierung von Daten haben. Die Umsetzung eines solchen Systems erfordert jedoch voraussichtlich einen sehr hohen Aufwand und schafft ein zusätzliches Risiko, da ein weiterer Dritter bei der Initialisierung Zugang zu den Daten eines Nutzers hat. Der Nutzen sollte daher dem Aufwand gegenüber abgewogen werden.

<!--translate:ignore-->
<aside>
<div style="max-width: 350px">
    {{'diagrams/Folie5.PNG'|picture(class="img img-responsive")}}
</div>
<p>
<!--translate:ignore-->
Validierte Daten, die der Nutzer einem Betreiber einer Ortschaft zur Besuchsdokumentation übergibt. Dieser kann mit dem öffentlichen Schlüssel der signierenden Stelle ($ TC $) die Validität der Daten überprüfen.
<!--translate:ignore-->
</p>
</aside>
<!--translate:ignore-->


Eine Validierung über Dritt-APIs wie sie in anderen, zentralen Systemen vorgenommen wird kann theoretisch ebenfalls erfolgen, z.B. kann die Web-Anwendung die Erstellung von QR-Codes nur erlauben, nachdem bestimmte Daten wie eine Telefonnummer oder eine E-Mail Adresse über einen externen Dienst bestätigt wurden. Da die Web-Anwendung (oder generell jede Client-Anwendung) unter Kontrolle des Nutzers ist kann dieser diese leicht manipulieren, um die Validierung zu umgehen. Dass dies praktikabel ist wurde bereits demonstriert. Eine clientseitige Validierung von Daten hält daher nur technisch nicht versierte, kooperationswillige Nutzer von der Angabe falscher Daten ab (dies heißt jedoch nicht, dass eine solche zusätzliche Validierung vollständig nutzlos ist, sie sollte jedoch keineswegs als sicher oder verlässlich eingestuft werden).

### Besuchsdokumentation

<!--translate:ignore-->
<aside>
<div style="max-width: 600px">
    {{'diagrams/Folie1.PNG'|picture(class="img img-responsive")}}
</div>
<p>
<!--translate:ignore-->
Besuchsdaten, die ein Betreiber anhand von ihm übergebenen Nutzerdaten generiert und lokal oder in einem Backend speichert. $ H _ i $ bezeichnet den i-ten öffentlichen Hashwert eines Nutzers, $ G _ j $ den Identifikationswert einer von der Betreiber-Anwendung gebildeten Gruppe/Infektionsgemeinschaft, $ M _ j $ öffentliche Meta-Daten dieser Gruppe (nicht zu einem Betreiber zuordenbar) $ K _ b $ und $ I _ D $ sind Nutzerdaten wie oben beschrieben, $ L _ D $ enthält die Kontaktdaten des Betreibers und $ N _ j $ nicht-öffentliche Meta-Daten für das Gesundheitsamt (z.B. Tisch, Rauminformation etc.). $ U _ i ^a $ bezeichnet einen Datenschlüssel eines Nutzers aus der gebildeten Gruppe. $ G _ j $ bezeichnet farbcodiert den privaten bzw. öffentlichen Gruppenschlüssel. $ Ob $ bezeichnet den Ombuds-Schlüssel, $ Op $ den Betreiber-Schlüssel.
<!--translate:ignore-->
</p>
</aside>
<!--translate:ignore-->


Zur Dokumentation des Besuchs einer Ortschaft gegenüber Betreibern übergeben Nutzer diesen einfach jeweils einen zufälligen QR-Code. Hierbei ist es möglich, neben dem QR-Code zusätzliche Meta-Daten wie die genaue Ankunftszeit sowie die Verweildauer einzutragen, um die Genauigkeit der Dokumentation zu erhöhen. Der Betreiber erfasst die über einen gegebenen Zeitraum (z.B. einen Tag) erhaltenen QR-Codes anschließend mithilfe der Web-Anwendung. Sie werden zunächst nur lokal gespeichert. Betreiber können hierbei auch zusätzliche Meta-Daten erfassen um die Genauigkeit zur Kontaktnachverfolgung zu verbessern.

Die Web-Anwendung des Betreibers gruppiert Besuchsdaten möglichst zeitnah (innerhalb weniger Stunden) in Gruppen.
Einzelne Besuchsdaten können hierbei in mehreren Gruppen (überlappend) vorhanden sein.
Für jede Gruppe generiert die Web-Anwendung ein asymmetrisches Schlüsselpaar.
Alle Besuchsdaten der Gruppe werden mit dem öffentlichen Schlüssel dieses Paares verschlüsselt. Der zugehörige private Schlüssel wird jeweils mit dem öffentlichen Schlüssel jedes Besuchsdatensatzes verschlüsselt und mit dem Datensatz gespeichert. Zusätzlich verschlüsselt der Betreiber die Daten der Ortschaft jeweils mit den jeweiligen Gruppenschlüsseln eines Besuchsdatensatzes und fügt diese dort an.

Sobald klar ist, dass einer Gruppe keine weiteren Besuchsdatensätze zugeordnet werden, löscht die Web-Anwendung den zur Gruppe gehörigen privaten Schlüssel. 
Der öffentliche Schlüssel wird zusammen mit den Gruppendaten abgelegt.
Ebenso löscht die Web-Anwendung die ursprünglichen Besuchsdaten eines Nutzers sobald klar ist, dass diese zu keiner weiteren Gruppe hinzugefügt werden.

Die so verschlüsselten Daten können nur unter Zuhilfename des GÄ-Datenschlüssels sowie eines passenden privaten Schlüssels eines der Gruppe zugehörigen Besuchsdatensatzes. Diese privaten Schlüssel befinden sich unter Kontrolle des Nutzers und werden von diesem nur im Falle einer Infektion an das GA übermittelt. Dementsprechend kann das GA selbst wenn es auf alle Daten der Betreiber zugreifen könnte nur epidemiologisch relevante Daten entschlüsseln, zu denen ein Nutzer den passenden privaten Schlüssel bereitgestellt hat.

<!--translate:ignore-->
<aside>
<div style="max-width: 400px">
    {{'diagrams/Folie2.PNG'|picture(class="img img-responsive")}}
</div>
<p>
<!--translate:ignore-->
Daten, die ein Betreiber zur Erbringung seiner Nachweispflicht gegenüber dem Gesundheitsamt sowie zur eventuellen Entschlüsselung von Besuchsdaten im Rahmen des Ombuds-Prozesses verschlüsselt lokal oder in einem Backend verwahrt. $ G _ i $ bezeichnet den Identifikator einer Gruppe/Infektionsgemeinschaft, $ M _ k $ bezeichnet relevante Meta-Daten zu der Gruppe (u.a. Zeit der Erfassung). $ Op $ (rot) bezeichnet den privaten Datenschlüssel des Betreibers (welcher für den Ombuds-Prozess benötigt wird), $ Op $ (gelb) bezeichnet den geheimen Datenschlüssel mit dem der Betreiber die Daten verschlüsselt. Der Betreiber kann diese Daten verschlüsselt lokal oder in einem Backend speichern.
<!--translate:ignore-->
</p>
</aside>
<!--translate:ignore-->



<div>
    {% include "common/protocols/_check_in.html" %}
</div>

#### Manuelle Besuchserfassung

Der Betreiber muss auch für Personen die Zilp-Zalp nicht nutzen in der Lage sein, Kontaktdaten zu erfassen und verschlüsselt abzulegen. Hierbei stellt sich jedoch die Frage, wie für diese Daten eine Zweckbindung erreicht werden kann, da in diesem Fall die Person keine Initialisierung im Zilp-Zalp System durchlaufen hat. Hierzu gibt es mehrere Möglichkeiten:

* Es kann eine einmalige Initialisierung mit Unterstützung des Betreibers erfolgen. Hierbei müssen der Person die entsprechenden Geheimschlüssel ausgehändigt werden, beispielsweise in Form eines QR-Code Ausdrucks oder durch Notieren von zwei Zahlen (im Falle der verschlüsselten Speicherung).
* Es kann eine Schlüsselableitung anhand der Kontaktdaten der Person sowie Daten der Ortschaft erfolgen (beispielsweise durch Zusammenführung und Hashing des Namens und der Anschrift der Person sowie der Ortschaft).
  Wendet sich die Person an das Gesundheitsamt zur Kontaktnachverfolgung, kann dieses die Geheimschlüssel des Nutzers basierend auf den gegebenen Daten (Name der Person und Angaben zu der besuchten Ortschaft) rekonstruieren und anschließend die Kontaktnachverfolgung regulär durchführen.
  Dies schwächt jedoch die Sicherheits- und Privatsphäregarantien für diese Person sowie alle weiteren Nutzer in deren Infektionsgemeinschaft.
* Es kann komplett auf eine Speicherung der Geheimschlüssel der Person verzichtet werden, die Besuchsdaten dieser sind dann lediglich zweckgebunden über einen Gruppenschlüssel der entsprechenden Infektionsgemeinschaft oder mithilfe des Ombuds-Prozesses entschlüsselbar.

Betreiber können prinzipiell Personen auch vorgefertigte QR-Code Blöcke aushändigen, die sie mithilfe der Initialisierung einer Person zuordnen. Dies birgt jedoch das Risiko, dass Betreiber die gesamten QR-Codes eines Blocks einsehen können. Durch technische Mittel kann dieses Risiko jedoch begrenzt werden. 

#### Speicherung von Besuchsdaten

Besuchsdaten können entweder lokal gespeichert werden, oder in einem (föderierten) Backend abgelegt werden.
Die lokale Speicherung ist datenschutzfreundlich, birgt aber auch Verfügbarkeitsrisiken, da der Betreiber einer Ortschaft sicherstellen muss, dass die Daten ausfallsicher gespeichert werden.
Zudem verlangsamt die lokale Speicherung eventuell die Kontaktnachverfolgung.
Da Zilp-Zalp bereits einen Mechanismus integriert, der Besuchsdaten von Nutzern mithilfe einer Zuordnung zu Infektionsgemeinschaften schützt, ist die Zweckbindung bereits hierüber gegeben.
Dementsprechend können Besuchsdaten auch in einem Backend abgelegt werden, welches dann automatisiert auf ausgeschriebene Hashes antworten kann.
Hierbei kann die Web-Anwendung des Betreibers die Daten zur Ortschaft zu allen verschlüsselten Besuchsdaten hinzufügen und sie wie diese ebenfalls mit dem entsprechenden Gruppenschlüssel verschlüsseln.
Das Backend kann hierbei keine Zuordnung von einzelnen Besuchsdaten zu spezifischen Ortschaften vornehmen. Lediglich über Metadaten (IP-Adresse der hochladenenden Stelle) wäre es einem Backend möglich, ggf. eine Zuordnung herzustellen.

Das Backend soll wiederum föderiert betreibbar sein um das Risiko der Metadaten-Analyse zu reduzieren. Die Speicherung von Daten kann ebenfalls asynchron erfolgen

### Kontaktnachverfolgung


<!--translate:ignore-->
<aside>
<div style="max-width: 300px">
    {{'diagrams/Folie7.PNG'|picture(class="img img-responsive")}}
</div>
<p>
<!--translate:ignore-->
Hashwerte, die ein Gesundheitsamt zum Zweck der Kontaktnachverfolgung veröffentlicht.
<!--translate:ignore-->
</p>
</aside>
<!--translate:ignore-->


Um mögliche Risikokontakte eines infizierten Nutzers zu ermitteln übergibt dieser zunächst dem GA den für diesen bestimmten QR-Code (entweder digital oder analog).
Dieses kann ihn mit dem privaten GÄ-Datenschlüssel entschlüsseln, wodurch es die Werte $H _ s ^ l$, $I _ D ^ l$ und $K _ b ^ l$ erhält ($l$ bezeichnet hier die Daten des $l$-ten Nutzers).
Mit dem Wert $I _ D$ kann das GA vom Backend die verschlüsselten Nutzerdaten erhalten, welche unter Zuhilfenahme des privaten Datenschlüssels sowie von $K _ b$ entschlüsselt werden können.
Weiterhin kann das GA mithilfe von $H _ s$ alle Hashwerte $H _ i$ des Nutzers erstellen. Diese Werte veröffentlicht es über das Backend (gemeinsam mit anderen Hashwerten um die Anonymität des Nutzers zu schützen).
Die Web-Anwendungen der Betreiber laden regelmäßig die Liste dieser Werte herunter und gleichen sie mit den lokal gespeicherten Hashwerten ab.
Ergibt sich eine Übereinstimmung, werden nach Bestätigung durch den Betreiber alle Besuchsdaten die mit diesen Hashwerten $H _ i$ in Zusammenhang stehen (z.B. ermittelt durch Vergleich der Besuchszeiten) über die öffentliche API an das Backend übertragen (ggf. können die Daten nochmals mit dem GÄ-Datenschlüssel verschlüsselt werden).
Von dort können sie durch das GA abegrufen werden.
Dieses kann Daten von Nutzern entschlüsseln, die mit diesem eine Infektionsgemeinschaft gebildet haben und dementsprechend mit dem gleichen Gruppenschlüssel verschlüsselt wurden.
Hierzu entschlüsselt das GA zunächst den Gruppenschlüssel mit dem passenden privaten Schlüssel $U _ i ^ {pub}$ der zu den ursprünglichen Besuchsdaten gehört.
Mit diesem sowie dem privaten GÄ-Datenschlüssel kann es wiederum die Werte $ I _ D ^ k$, und $K _ b ^ k$ relevanter Nutzer entschlüsseln, womit wiederum die Kontaktdaten des Nutzers vom Backend abgefragt und entschlüsselt werden können.
Da das GA von diesem Nutzer jedoch nicht den Schlüssel $ H _ s ^ k$ besitzt, kann es dessen Besuchshistorie nicht ohne Einwilligung rekonstruieren.
Hierzu ist vielmehr wiederum die aktive Mitarbeit dieses Nutzers notwendig.
Ebensowenig kann das GA Besuchs- oder Kontaktdaten von Nutzern entschlüsseln, die keine Infektionsgemeinschaft mit dem ursprünglichen Nutzer gebildet haben.

#### Sequenzdiagramm

Die folgenden Sequenzdiagramme zeigen den Ablauf der Kontaktnachverfolgung. Aus Übersichtsgründen wurde der Prozess dabei in drei Schritte aufgeteilt.

##### Übergabe der Nutzerdaten an das GA

Zunächst muss das GA vom Nutzer die GA-Daten erhalten, um die weitere Kontaktnachverfolgung veranlassen zu können.

<div>
    {% include "common/protocols/_contact_tracing_1.html" %}
</div>

##### Ausschreibung von Hashes

Anschließend schreibt das GA relevante Hashes zur Kontaktnachverfolgung aus und wartet auf die Rückmeldung von Betreibern.
Wichtig: Um die Abgabe manipulierter Daten zu verhindern, müssen Betreiber hierbei immer auch die zu dem ausgeschriebenen Hash vorliegenden Daten übermitteln.
Diese Daten können von einem Betreiber ohne Kenntnis des Schlüssels $K _ b$ nicht gefälscht werden, GÄ konnen so manipulierte oder fehlerhafte Daten ausschließen.
Ein Betreiber kann immer noch unrelevante Daten zurückliefern, jedoch lässt sich ein solches Verhalten auf verschiedenen Wegen auf den Betreiber zurückführen und entsprechend ahnden.
Ein Betreiber liefert immer komplette Gruppendaten zurück, welche Besuchsdaten enthalten die mit einem privaten Gruppenschlüssel verschlüsselt wurden. Der private Schlüssel wiederum wurde mit den öffentlichen Schlüsseln der Besuchsdaten aller Gruppenmitglieder verschlüsselt.

<div>
    {% include "common/protocols/_contact_tracing_2.html" %}
</div>

##### Verarbeiten relevanter Kontaktdaten

Schließlich verarbeitet das GA die Daten der Betreiber. Daten epidemiologischer Gruppen können jedoch nur entschlüsselt werden, wenn das GA vom Nutzer einen passenden privaten Schlüssel zu Besuchsdaten erhält, die den verschlüsselten privaten Schlüssel der jeweiligen Gruppendaten enthalten. Ohne Vorliegen eines solchen Schlüssels kann das GA auch bei Vorliegen aller Daten und aller sonstigen Schlüssel die Daten nicht entschlüsseln.

<div>
    {% include "common/protocols/_contact_tracing_3.html" %}
</div>

#### Ombuds-Prozess

Es sind Szenarien denkbar, in denen eine Kontaktnachverfolgung von einem Gesundheitsamt durchgeführt werden muss, ohne dass dieses die Geheimschlüssel eines Nutzers kennt. Beispielsweise wäre es denkbar, dass ein Nutzer seine Geheimschlüssel verliert, dem Gesundheitsamt jedoch eine Liste besuchter Ortschaften zur Verfügung stellen kann. Das Gesundheitsamt sollte dann in der Lage sein, von diesen Ortschaften die mithilfe von Zilp-Zalp erfassten Besuchsdaten zur Kontaktnachverfolgung zu nutzen. Gleichzeitig muss sichergestellt sein, dass Gesundheitsämter oder andere Akteure diese Möglichkeit nicht nutzen können, um Besuchsdaten zweckungebunden zu entschlüsseln.

Eine Möglichkeit, einen solchen Prozess zu gestalten ist die Zuhilfenahme einer Ombuds-Stelle, welche als neutraler Dritter die Datenanforderung überwacht und kontrolliert. Hierzu kann für diese Stelle ein Schlüsselpaar generiert werden, der öffentliche Schlüssel wird hierbei Betreibern zur Verfügung gestellt. Gruppenschlüssel werden anschließend zusätzlich mit diesem Schlüssel verschlüsselt. Fordert ein Gesundheitsamt Besuchsdaten von einem Betreiber an, muss es zur Nutzbarmachung der Daten bei der Ombudsstelle eine Entschlüsselung des entsprechenden Gruppenschlüssels anfordern. Dieses prüft die Anfrage, entschlüsselt ggf. den Gruppenschlüssel. Dieser Vorgang wird anschließend ggf. öffentlich dokumentiert.

Der Nachteil dieses Verfahrens ist, dass Ombudsschlüssel wiederum die globale Entschlüsselung von Besuchsdaten ermöglichen. Der Betreiber einer Ortschaft kann daher als weitere Vertrauensstelle herangezogen werden. Eine alleinige Kontrolle der Entschlüsselung durch Betreiber sollte jedoch ebenso vermieden werden, da diese gegenüber öffentlichen Stellen keine effektive Kontrollfunktion ausüben können, wie die [Zugänglichmachung von Gästelisten an die Polizeibehörden](https://www.sueddeutsche.de/bayern/bayern-polizei-corona-gaestelisten-ermittlungen-1.5018271) bereits gezeigt hat.

Generell sollte die Anforderung von Besuchsdaten über diesen Mechanismus eine absolute Ausnahme darstellen, dementsprechend kann der Prozess ohne starke Reduktion der Effektivität mit einem starken zusätzlichen Kontrollmechanismus in Form eines Ombuds-Prozesses ausgestattet werden.
### Risikoanalyse

Eine ausführliche Risikoanalyse findet sich in einem [separaten Dokument]({{'analyses.risks'|href}}).

### Verbesserungsmöglichkeiten

Die folgenden Aspekte des Protokolls können aus unserer Sicht noch verbessert werden:

* **Datenhaltung im Backend**: Im aktuellen Entwurf werden die Kontaktdaten eines Nutzers verschlüsselt in einem Backend gespeichert, um im Bedarfsfall von einem GA abgerufen werden zu können. Eine Entschlüsselung ist prinzipiell nur möglich, wenn dem GA zusätzlich noch eine Schlüsselhälfte des Nutzers vorliegt, die dieser entweder direkt an das GA übermittelt hat, oder die im Rahmen einer Besuchsdatenabfrage von einem Betreiber übermittelt wurde. Trotzdem stellt jede zentrale Datenhaltung eine Gefahr für die Privatsphäre der Nutzer dar. Eine Variante dieses Protokolls kann daher die Zentralisierung dieser Daten verzögern. Dies hat jedoch seinerseits Nachteile, da in diesem Fall GÄ nur unter aktiver Mithilfe von Nutzern deren Kontaktdaten erhalten können. Wenn Nutzer nur schwer erreichbar sind kann dies eine effektive Kontaktnachverfolgung verzögern und behindern. In diesem Sinne ist die Privatsphäre der Nutzer gegenüber dem Interesse des GAs abzuwägen.

### Varianten

Um den Schutz der Privatsphäre von Nutzern weiter zu verbessern, können verschiedene Varianten des Protokolls erstellt werden, die in den folgenden Abschnitten diskutiert werden.

#### Anlassbezogene Datenfreigabe

Die Besuchsdatenerfassung mithilfe der QR-Daten funktioniert auch ohne die Hinterlegung von Kontaktdaten in einem zentralen Backend. Dementsprechend kann die Erfassung und Speicherung dieser Daten folgendermaßen hinausgezögert werden:

* Statt bei der Erstellung von QR-Codes direkt dem Backend verschlüsselte Kontaktdaten bereitzustellen, kann die Web-Anwendung des Nutzers zunächst nur einen $ I _ D$ Wert sowie ein Token $ Z $ vom Backend anfordern und gleichzeitig den öffentlichen Teil eines von der Anwendung generierten asymmetrischen Schlüsselpaars für dieses dort hinterlegen. Das Backend speichert diesen gemeinsam mit $ Z $ und $I _ D$ ab. Der zugehörige private Schlüssel, $ I _ D$ und $ Z $ können von der Anwendung dem Nutzer zur Aufbewahrung zur Verfügung gestellt werden.
* Werden bei der Kontaktnachverfolgung die entsprechenden Besuchsdaten gefunden stellt das Backend fest, dass zu diesen noch keine Kontaktdaten existieren. Es schreibt dann das Token $ Z $ über eine öffentliche Liste zur Vervollständigung aus.
* Der Nutzer kann der Web-Anwendung regelmäßig die Daten $ Z $ und $ I _ D $ vorlegen, diese erkennt dann anhand des veröffentlichten Tokens $ Z $, dass die Daten des Nutzers zur Kontaktnachverfolgung angefordert wurden. Es fordert diesen dann dazu auf, die Daten anzugeben, verschlüsselt diese mit dem öffentlichen GÄ-Datenschlüssel, signiert die Daten mit dem privaten Schlüssel des generierten Schlüsselpaares und teilt sie über die API dem Backend mit, das diese speichert.
* Das GA kann die Daten nun regulär über die API vom Backend abrufen.

Dieser Ablauf ist datenschutzfreundlicher, aber für ein papiergestütztes Verfahren eventuell nicht praktikabel da er auf die aktive Mitarbeit des Nutzers angewiesen ist. Nutzer welche die Web-Anwendung nicht regelmäßig öffnen erfahren nicht, dass ihre Daten angefordert wurden. Das Verfahren ist jedoch sehr gut geeignet für eine digitale Kontaktnachverfolgung per App. Es zögert in diesem Fall die Speicherung personenbezogener Informationen solange hinaus, bis diese wirklich benötigt werden.

Die mit dem Verfahren verbundene, verzögerte Bereitstellung von Kontaktdaten muss wiederum gegen den Schutz der Privatsphäre einzelner Nutzer abgewogen werden.

### Erweiterungen

Die folgenden Abschnitte beschreiben mögliche Erweiterungen des Protokolls, die über die grundlegende Funktionalität hinausgehen.

#### Überprüfung durch den Nutzer

Bei der Initialisierung kann zusätzlich zu den GA-Daten auch ein Datenpaket für den Nutzer generiert werden, welches u.a. das Geheimnis $ H _ s $ enthalten kann (dieses Datenpaket kann zusätzlich mit einem selbstgewählten Passwort geschützt werden).

Der Nutzer kann dieses Datenpaket, welches auch als QR-Code bereitgestellt werden kann, der Web-Anwendung zur Verfügung stellen. Diese kann mit den Daten die Hashes $ H _ i $ des Nutzers rekonstruieren und mithilfe des Backends prüfen, ob und von wem diese Hashes ausgeschrieben wurden. Der Nutzer erhält somit eine Information darüber, ob seine Besuchsdaten von einem GA angefragt wurden und kann im Falle einer Nichtbenachrichtigung bei diesem Amt mit seinen GA-Daten weitere Daten zu der Nutzung anfragen.

Das Datenpaket kann zudem wie oben beschrieben genutzt werden, um Hashes z.B. im Fall des Verlusts oder Diebstahls für ungültig erklären zu lassen.