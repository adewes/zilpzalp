
### Risiko-Analyse

Die folgenden Abschnitte beschreiben von uns bisher identifizierte Risiken.

#### Re-Identifizierbarkeit von QR-Code Serien

Da Nutzer QR-Codes im aktuellen Entwurf selbst ausdrucken und die Codes bei der asynchronen Erfassung bei Betreibern von Ortschaften verbleiben, könnten diese bei konsiprativer Sammlung von QR-Codes eventuell versuchen, verschiedene Codes auf einen einzelnen Nutzer zurückzuführen.
Bestimmte Drucker generieren beispielsweise sogenannte [Machine Identification Codes (MICs)](https://en.wikipedia.org/wiki/Machine_Identification_Code), welche für das bloße Auge unsichtbar auf einem Ausdruck platziert werden und mithilfe technischer Hilfsmittel ausgelesen werden können.
Diese Codes lassen es zu, einen Ausdruck auf einen spezifischen Drucker zurückzuführen.
Dritte könnten somit beim Vorliegen mehrerer QR-Codes mit solchen MICs eine Rückführung der Codes auf einen einzelnen Nutzer vornehmen.

Unabhängig vom Vorliegen solcher MICs kann eventuell bereits das Druckbild sowie das verwendete Papier Rückschlüsse auf den zur Erstellung genutzten Drucker bieten.

Um diese Rückführbarkeit zu reduzieren können verschiedene technische und organisatorische Maßnahmen ergriffen werden.
QR-Code Serien können z.B. ähnlich wie Checkhefte in großer Zahl vorgeneriert und vorgedruckt werden.
Nutzer könnten diese z.B. von einem vertrauenswürdigen Dritten beziehen und einen im Heft befindlichen QR-Code nutzen, um den gegebenen Block mit ihren Kontaktdaten zu verknüpfen.
Hierzu muss dem ausstellenden Dritten sowie allen an der Produktion beteiligten Parteien jedoch vertraut werden, da diese die QR-Codes aufzeichnen könnten.
Trotzdem wäre diese Variante in der Praxis eine einfache Möglichkeit, QR-Code Serien schnell und unkompliziert zur Verfügung zu stellen.

#### Verlust oder Diebstahl von QR-Codes

Ein Risiko der Generierung großer Anzahl von QR-Codes ist der Verlust durch den Nutzer.
Aufgefundene Codes könnten einfach missbraucht werden z.B. um die Besuchsdokumentation zu umgehen.
Um dies zu verhindern, kann ein Mechanismus zur Ungültigmachung von Hashes eingeführt werden.
Hierbei müsste der Nutzer eine zusätzliche Datenstruktur zur eigenen Verwendung erhalten, welche das Geheimnis $H _ s$ enthält (eine solche Datenstruktur kann auch zur Nachprüfung des Datenabrufs eingesetzt werden, was in einer Protokollerweiterung unten beschrieben wird).
Das Backend veröffentlicht zusätzlich ein Token $Z _ h$ welches von der Web-Anwendung des Nutzers abgefragt werden kann.
Die Anwendung kann mithilfe von $ H _ s $ dann alle Hashes $H _ i $ des Nutzers regenerieren, dies über ein geeignetes Hashverfahren mit $ Z _ h$ kombinieren und die Liste der gehashten Tokens ans Backend schicken, welche sie anschließend publiziert (gemeinsam mit anderen Hashes um die Anonymität zu gewährleisten).
Web-Anwendungen von Betreibern können diese Listen beziehen (z.B. auch als Bloom-Filter) und bei der Dokumentation eines Besuchs unter Zuhilfename des Tokens $ Z _ h $ prüfen, ob ein gegebener Hash ungültig gemacht wurde.
Die Dokumentation basierend auf diesem Hash kann dann abgelehnt werden.
Um die Besuchsdokumentation mit einem ungültigen QR-Code zu verhindern erfordert dies jedoch eine dirkte Prüfung der Codes.
Auch bei einer späteren Prüfung kann der Mechanismus jedoch verhindern, dass Besuche einem Nutzer zugeordnet werden, dessen QR-Codes gestohlen wurden oder verloren gingen.
Manipulierte QR-Codes generell nur beim Einsatz des Validierungsmechanismus entdeckt werden können ist eine Generierung manipulierter Codes für einen Angreifer jedoch sehr viel einfacher als der Diebstahl fremder Codes um eine Besuchsdokumentation zu umgehen.

#### Wiederverwendung von QR-Codes

Da QR-Codes nur dezentral erfasst werden können sie zunächst unerkannt mehrfach benutzt werden. Hierbei könnte z.B. ein Betreiber oder ein Dritter der Zugang zu einem bereits verwendeten QR-Code eines Nutzers erhält diesen verwenden, um in anderen Ortschaften Besuche zu dokumentieren.

Dieser Angriff ist jedoch bei der Kontaktnachverfolung leicht erkennbar, die durch Mehrfachverwendung eines QR-Codes generierten Daten können vermutlich leicht entfernt werden. Mögliche Quellen des Missbrauchs lassen sich zudem anhand vorliegender sowie fehlender Daten mithilfe einer Befragung des betroffenen Nutzers einfach rekonstruieren und fehlende QR-Codes können bei der Überprüfung eines Betreibers anschließend identifziert werden. Eine missbräuchliche Nutzung ist damit (wie bei anderen Verfahren) nicht ausgeschlossen, kann aber im Gegensatz zu diesen effektiv nachverfolgt und gegebenenfalls geahndet werden. Dies schafft für Betreiber und Nutzer effektive Anreize, QR-Codes sicher zu verwahren und nicht zu missbrauchen.

Das Risiko der Wiederverwendung kann zudem über einen Gültigkeitsmechanismus begrenzt werden (bestimmte QR-Codes können z.B. nur an bestimmten Tagen verwendet werden). Dies würde zum Einen jedoch die Verwendung der Codes durch den Nutzer etwas komplizierter gestalten. Zum Anderen kann eine manipulationssichere Beschränkung der Gültigkeit von QR-Codes nur unter Zuhilfenahme eines validierenden Dritten erfolgen, wie oben beschrieben. Ob dies sinnvoll ist muss abgewogen werden. Eine "einfache" Beschränkung der Gültigkeit von QR-Codes kann durch Hinzufügen eines Zeitstempels erreicht werden, dies ist jedoch für einen technisch versierten Angreifer leicht zu umgehen. Trotzdem kann ein solcher Zeitstempel sinnvoll sein, um "Gelegenheits-Missbrauch" von QR-Codes zu unterbinden. Weiterhin kann die Web-Anwendung des Nutzers bei der Initialisierung eine HMAC-basierte Prüfsumme für diesen Zeitstempel erstellen, diese kann zwar von der Anwendung des Betreibers nicht verarbeitet werden, macht aber die Erkennung der missbräuchlichen Nutzung bei der Analyse durch das GA einfacher (die jedoch ohnehin einfach möglich ist).

#### Hinterlegung falscher Daten

Der oben beschriebene Validierungs-Ablauf kann das Vorhandensein und die Echtheit bestimmter Nutzerdaten im System garantieren. Er erfordert jedoch die Einbindung einer vertrauenswürdigen Stelle im Initialisierungsprozess.

#### Rekonstruktion von Besuchshistorien

Zur Rekonstruktion einer Besuchshistorie muss eine Akteur wissen, welche Werte $H _ i$ zu einem gegebenen Nutzer gehören. Da diese Werte mithilfe eines geheimen Schlüssels $ H _ s $ erzeugt werden, muss der Angreifer daher im Besitz dieses Schlüssels sein um die Serie $H _ 1 \ldots H _ n$ zu rekonstruieren. Der Schlüssel $ H _ s $ befindet sich unter Kontrolle des Nutzers und kann nur von GÄ entschlüsselt werden. Ein Angreifer muss daher sowohl den privaten GÄ-Schlüssel besitzen, als auch den QR-Code des Nutzers mit dem Wert $ H _ s$. Zusätzlich muss der Angreifer die Besuchsdaten einzelne von den Betreibern extrahieren, z.B. durch Manipulation der Web-Anwendungen.

Unter der Annahme, dass zumindest eine dieser drei Angriffe fehlschlägt kann die Rekonstruktion von Besuchshistorien ausgeschlossen werden.
