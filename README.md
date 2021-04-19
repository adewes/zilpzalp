# Zilp-Zalp - Dezentrale Kontaktnachverfolgung.

<img src="/materials/images/zilpzalp-1.png" alt="Zilp-Zalp - Logo" title="Zilp-Zalp - Logo" width="40%" />

**Disclaimer**: *Dies ist ein erster, grober Entwurf des Design-Dokuments. Weitere Details folgen in den kommenden Tagen und Wochen.*

Dies ist das Design-Dokument von **Zilp-Zalp**, einem System zur Kontaktnachverfolgung das mit Methoden des **Privacy & Security Engineering** entworfen wurde. Das Design ist als Gegenentwurf zu zentralisierten Systemen wie **Luca** gedacht und soll zeigen, dass viele Design-Entscheidungen in diesen Systemen mehr von kommerziellen Interessen als von **Privacy & Security By Design** getrieben sind, und für eine effektive Kontaktnachverfolgung nicht notwendig sind.

(wir benutzen aktuell das generische Maskulinum, der Text wird aber in Kürze überarbeitet um genderneutral zu sein)

# Motivation

Warum Zilp-Zalp? Obwohl es vielleicht zu spät ist um die Diskussion um Kontaktnachverfolgungs-Apps in die richtige Richtung zu lenken ist es wichtig zu zeigen, dass viele Aussagen der Luca-Macher vielfach faktisch falsch sind.

Das Konzept ist folgt angewandten Best-Practices im **Privacy Engineering** und soll zeigen, wie man privatsphäre-freundliche Systeme kollaborativ und offen entwickeln kann.

## Problemstellung

Zilp-Zalp soll folgendes Problem lösen:

* Die Nachverfolgung von Kontakten zur Eindämmung von Covid-19, in Übereinstimmung mit der Corona-Verordnung des Bundes sowie den entsprechenden Landes-Verordnungen.

## Anforderungen

Um den gesetzlichen Anforderungen genüge zu tun, müssen Betreiber von **Ortschaften** (Gaststätten, Kinos, Fitnessstudios etc.) Gästelisten führen, die bei Bedarf dem zuständigen Gesundheitsamt zur Verfügung gestellt werden müssen. Diese Gästelisten müssen erlauben zu rekonstruieren, welche potentiellen Kontakte ein infizierter Gast im Rahmen des Besuchs einer **Ortschaft** hatte. Das Gesundheitsamt nutzt diese Daten dann, um diese Kontakte zu warnen und ggf. zu einem Covid-19 Test oder häuslicher Quarantäne aufzufordern.

## Dokumentation

Eine detaillierte Dokumentation aller Protokolle und Anwendungen aus denen Zilp-Zalp besteht findet sich auf der [Webseite](https://zilpzalp.eu)