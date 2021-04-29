# Digitale Kontaktnachverfolgung

Diese Seite beschreibt das Protokoll zur digitalen Kontaktnachverfolgung mit **Zilp-Zalp**. Grundlegend basiert das Protokoll auf dem [papiergestützten Protokoll]({{'protocols.paper-based'|href}}) und setzt dieses mit verschiedenen Verbesserungen (die im papiergestützten Protokoll nicht implementierbar sind) um.

## Ablauf

Generell erfolgt die Initialisierung ebenso wie im papiergestützten Protokoll. Im Unterschied hierzu werden die generierten QR-Code Daten jedoch nicht gelöscht, sondern im Browser (oder einer Smartphone-App) gespeichert. Der Nutzer kann zur Besuchsdokumentation die (Browser-/Smartphone-)App öffnen, diese zeigt dann einen der vorab generierten QR-Codes an, welcher wiederum vom Betreiber gescannt wird. Das Scanning muss hierbei synchron erfolgen. Beim Verlassen der Ortschaft kann der gleiche Code nochmals gescannt werden, um die Anwesenheitszeit zu dokumentieren.

## Unterschiede zum papiergestützten Protokoll

Zur Verhinderung der unberechtigten Wiederverwendung von QR-Codes können bei der Initialisierung im Falle der digitalen Nachverfolgung sowie dem Einsatz zeitlimitierter QR-Codes sehr viel mehr Codes generiert werden (z.B. einer für jede Stunde der kommenden zwölf Monate). Hierbei muss die Initialisierung jedoch ebenfalls über einen validierenden Dritten erfolgen. Eine Selbst-Zertifizierung der QR-Codes durch die Web-Anwendung des Nutzers ist ebenfalls möglich, die Aufdeckung einer möglichen Mehrfachverwendung kann jedoch in diesem Fall erst bei der Analyse der Daten durch Gesundheitsämter erfolgen.

### Optionales Kontakttagebuch

Die Web-Anwendung kann theoretisch auch als Kontakttagebuch genutzt werden. Hierzu kann ein statischer QR-Code in der Ortschaft des Betreibers gescannt werden. Eventuell sind hierfür jedoch bestehende Anwendungen wie die Corona-Warn-App zu bevorzugen, da sie mit dem Durchführen eines anonymen Check-Ins auch gleichzeitig im Falle einer Infektion anonyme Warnungen an Nutzer schicken kann.