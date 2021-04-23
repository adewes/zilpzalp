# Deployment

Die folgenden Abschnitte beschreiben das Deployment der Zilp-Zalp Systemkomponenten für Betreiber von Ortschaften und Gesundheitsämter.

## Betreiber von Ortschaften

Betreiber von Ortschaften können entweder die Zilp-Zalp Web-Anwendung nutzen, oder ebenfalls eine lokale API-Anwendung deployen, welche zusätzlich auch die Web-Anwendung enthält:

<!--translate:ignore-->
```bash
curl https://downloads.zilpzalp.eu/operator/zilpzalp-operator-latest.tar.gz
tar -xvzf zilpzalp-operator-latest.tar.gz
```
<!--translate:ignore-->

Die Anwendung kann anschließend einfach ausgeführt werden:

<!--translate:ignore-->
```bash
zilpzalp
```
<!--translate:ignore-->

## Gesundheitsämter

Gesundheitsämter müssen zum Betrieb von Zilp-Zalp lediglich die paketierte `ga`API-Anwendung deployen, welche zusätzlich auch die Web-Anwendung enthält.

<!--translate:ignore-->
```
curl https://downloads.zilpzalp.eu/ga/zilpzalp-ga-latest.tar.gz
tar -xvzf zilpzalp-ga-latest.tar.gz
```
<!--translate:ignore-->

Die Anwendung benötigt zudem Konfigurationseinstellungen, welche in einem Verzeichnis abgelegt werden könenn das über die Umgebungsvariable `ZILPZALP_SETTINGS` definiert wird (standardmäßig werden diese im `settings` Unterverzeichnis des aktuellen Arbeitsverzeichnisses gesucht), sowie verschiedene Dateien (Migrationen, Frontend-Code), deren Speicherort über eine Umgebungsvariable `ZILPZALP_ASSETS` definiert wird (standardmäßig werden diese im `assets` Unterverzeichnis des aktuellen Arbeitsverzeichnisses gesucht).

<!--translate:ignore-->
```bash
export ZILPZALP_SETTINGS=`readlink -f settings`
export ZILPZALP_ASSES=`readlink -f assets`
zilpzalp
```
<!--translate:ignore-->

Geheimnisse wie Schlüssel können hierbei auch dynamisch injiziert werden um eine lokale Speicherung zu vermeiden. Hierzu kann die `zilpzalp` Dienstanwendung benutzt werden.

<!--translate:ignore-->
```bash
zilpzalp settings inject
```
<!--translate:ignore-->
