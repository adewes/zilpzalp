# Einfachheit vs. Sicherheit

Eine der Herausforderungen beim Design eines sicheren und privatsphäre-freundlichen Systems zur Kontaktnachverfolgung ist die Einfachheit oder "Usability" der Lösung für Nutzer und Betreiber von Ortschaften.
Ziel beim Entwurf von Zilp-Zalp war, die Nutzung möglichst einfach zu gestalten und gleichzeitig sehr hohe Sicherheits- & Datenschutz-Standards einzuhalten.
Um Missbrauchsszenarien durch gefälschte Check-Ins zu vermeiden wurde bewusst darauf verzichtet, einen Selbstregistrierungsprozess anzubieten.
Dementsprechend müssen Gäste, Kunden oder Besucher vom Betreiber einer Ortschaft registriert werden.
Hierzu muss ein QR-Code gescannt werden, welcher vom Nutzer in Papierform oder digital über ein Smartphone gezeigt werden kann.
Der Betreiber muss hierbei auch relevante Meta-Daten (z.B. Tischnummer, Besuchszeiten etc.) erfassen um sicherzstellen, dass die erhobenen Daten sinnvoll verwendbar sind.

Erste Tests mit einem Web-basierten QR-Code Scanner basierend auf [jsQR](https://github.com/cozmo/jsQR) haben zwar gezeigt, dass das Einscannen von QR-Codes hiermit möglichst ist, jedoch lässt die Genauigkeit stark zu wünschen übrig, das Einscannen von Codes kann daher sehr mühsam werden.

Um den Prozess zu vereinfachen, ist daher folgender Vorschlag entstanden:

* Statt wie aktuell zu verlangen, dass QR-Codes in einer speziellen Web-Anwendung gescannt werden, könnten diese so gestaltet werden, dass sie mithilfe eines integrierten Smartphone-Scanners gescannt werden können.
Hierbei kann der QR-Code eine URL enthalten, die zu einer einfachen Scanner-Web-Anwendung führt.
Über diese Web-Anwendung kann der Betreiber oder ein Angestellter die relevanten Meta-Daten erfassen.
Da QR-Code Scanner von Smartphones sehr viel besser funktionieren als Javascript-basierte Scanner, ist es viel einfacher Besuche so zu dokumentieren.

Die auf dem Smartphone vorliegenden Daten müssen nun jedoch noch in die Web-Anwendung des Betreibers gelangen, wo sie schließlich zusätzlich verschlüsselt und für einen eventuellen Abruf durch Gesundheitsämter gesichert werden.
Zur Realisierung dieser Übertragung habe ich verschiedene Möglichkeiten evaluiert.
Ein Peer-To-Peer Datenaustausch über WebRTC wäre z.B. technisch möglich, jedoch mit hohen Hürden verbunden und vermutlich nicht zuverlässig zu realisieren (niemand möchte z.B. im laufenden Restaurant-Betrieb fehlerhafte WebRTC-Verbindungen debuggen).
Eine einfachere Möglichkeit stellt der verschlüsselte Austausch der Daten über einen externen Service dar, der die Kommunikation zwischen der Betreiber-Anwendung und dem Smartphone mit den Besuchsdaten vermittelt.
Hierbei muss das Smartphone zunächst lokal mit der Web-Anwendung "gepaart" werden.
Dies kann über das Einlesen eines QR-Codes geschehen, der von der Web-Anwendung bereitgestellt wird und eine geheime ID sowie einen geheimen Schlüssel enthält.
Die Web-Anwendung des Smartphones kann dann Besuchsdaten mit dem geheimen Schlüssel verschlüsseln (und hierbei ggf. eine Schlüsselrotation über eine kryptographische Ratsche- anwenden), sie mit der zufälligen ID verknüpfen und sie auf dem externen Service ablegen.
Die Web-Anwendung des Betreibers kann die Daten von dort über die geheime ID anfordern und mit dem geheimen Schlüssel entschlüsseln.

Dies schafft die Möglichkeit, Besuchsdaten unkompliziert von einzelnen Mitarbeiter erfassen zu lassen und die Daten trotzdem in einer gemeinsamen, lokalen Anwendung weiterzuverarbeiten.
Durch Einsatz eines externen Service eröffnen sich jedoch auch Risiken, da dieser u.a. Metadaten analysieren kann und der Austausch von Nachrichten immer ein Sicherheitsrisiko darstellt.

Problematisch ist zudem, dass die Besuchsdaten auf zusätzlichen Geräten verarbeitet werden.
Insbesondere wenn hierzu private Smartphones benutzt werden (was in der Praxis sicherlich häufig der Fall sein wird) besteht dass Risiko, dass es zu einem Datenabfluss kommt.
Da Zilp-Zalp QR-Codes jedoch keine besonders sensiblen Daten enthalten und nur bei systematischer Erfassung und Auswertung Privatsphäre-Risiken für Betroffene bergen kann dieses Risiko eventuell akzeptiert werden.
Eine direkte, smartphone-basierte Erfassung von QR-Codes hat insbesondere bei papierbasierten Codes den Vorteil, dass diese nicht beim Betreiber verbleiben müssen und somit das Verlust- oder Diebstahlrisiko dieser Codes ebenfalls minimiert wird.

Technisch versierte Betreiber können einen solchen Service zur Datenübermittlung auch selbst in einem lokalen Netzwerk betreiben und diesen über zusätzliche Authentifizierungsmechanismen absichern.
Hierdurch wäre gewährleistet, dass Daten nur lokal verarbeitet werden.
Nicht allen Betreibern kann der Betrieb eines solchen Services jedoch zugemutet werden.
Daher könnten z.B. öffentliche Stellen oder vertrauenswürdige, zivilgesellschaftliche Organisationen ebenfalls solche Services anbieten.
Wie bei allen Komponenten ist es hierbei wichtig, eine Zentralisierung und die damit einhergende Möglichkeit zur Metadaten-Analyse möglichst zu unterbinden.