# Deployment

Die folgenden Abschnitte beschreiben das Deployment der Zilp-Zalp Systemkomponenten für Betreiber von Ortschaften, Gesundheitsämter und Anbieter von Backend- sowie Betreiber-Servern.

## Betreiber von Ortschaften

Betreiber von Ortschaften können die Zilp-Zalp Web-Anwendung nutzen. Diese kann Daten lokal speichern oder eine Betreiber-API nutzen, um Besuchsdaten und (optional) Einstellungen verschlüsselt zu speichern. Hierfür ist keine Registrierung erforderlich.

## Anbieter von Betreiber-Servern

Anbieter von Betreiber-Servern führen diesen auf einem geeigneten System aus:

<!--translate:ignore-->
```bash
curl https://downloads.zilpzalp.eu/operator/zilpzalp-operator-latest.tar.gz
tar -xvzf zilpzalp-operator-latest.tar.gz
```
<!--translate:ignore-->

Der Betreiber-Server kann anschließend einfach gestartet werden:

<!--translate:ignore-->
```bash
zilpzalp
```
<!--translate:ignore-->

Sie müssen über eine entsprechende Konfiguration die korrekte Einbindung in das föderierte Zilp-Zalp System sicherstellen.

## Gesundheitsämter

Gesundheitsämter kommunizieren über einen (oder mehrere) externe Backend-Server mit dem Zilp-Zalp System. Gesundheitsämter müssen hierzu über einen Signierschlüssel verfügen, der mit einem von dem Gesun

## Anbieter von Backend-Servern

Anbieter von Backend-Servern führen diese auf einem geeigneten System aus:

<!--translate:ignore-->
```bash
curl https://downloads.zilpzalp.eu/operator/zilpzalp-backend-latest.tar.gz
tar -xvzf zilpzalp-backend-latest.tar.gz
```
<!--translate:ignore-->

Der Backend-Server kann anschließend einfach gestartet werden:

<!--translate:ignore-->
```bash
zilpzalp
```
<!--translate:ignore-->

Sie müssen über eine entsprechende Konfiguration ebenfalls die korrekte Einbindung in das föderierte Zilp-Zalp System sicherstellen.