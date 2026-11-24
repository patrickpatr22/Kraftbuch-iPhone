# Kraftbuch als echte iPhone-App

Dieser Ordner enthält das fertige iPhone-Projekt von Kraftbuch. Daraus entsteht eine **IPA-Datei**, die du mit deinem Windows-PC und deiner normalen Apple-ID auf dein iPhone spielst. Die App läuft danach komplett offline und meldet sich per Mitteilung, sobald im Training deine **Richtzeit** erreicht ist – auch wenn das iPhone gesperrt ist.

Du brauchst keinen Mac. Gebaut wird die App kostenlos auf einem Mac von GitHub, installiert wird sie mit dem Programm **Sideloadly**.

---

## Teil A – IPA-Datei bauen lassen (einmalig ca. 15 Minuten)

1. **GitHub-Konto anlegen:** auf <https://github.com> kostenlos registrieren und anmelden.
2. **Neues Repository:** oben rechts auf **+** › **New repository**. Name z. B. `kraftbuch`, Sichtbarkeit **Private** reicht. Den Haken bei „Add a README file“ setzen und auf **Create repository** klicken.
3. **Dateien hochladen:** im Repository auf **Add file** › **Upload files**. Den entpackten Ordner `Kraftbuch-iPhone` öffnen, **alles darin markieren** (Strg + A) und in das Browserfenster ziehen. Wichtig ist auch der Ordner `.github` – falls du ihn nicht siehst: im Windows-Explorer unter **Anzeigen** › **Ausgeblendete Elemente** einschalten. Danach unten auf **Commit changes** klicken.
4. **Bau starten:** oben auf den Reiter **Actions**. Falls GitHub fragt, die Workflows mit dem grünen Knopf erlauben. Links **„iOS-App bauen“** wählen, rechts **Run workflow** › **Run workflow**. (Nach dem Hochladen startet der Bau meist schon von selbst.)
5. **Warten:** nach etwa 10–15 Minuten erscheint ein grüner Haken. Auf den Lauf klicken und ganz unten unter **Artifacts** die Datei **Kraftbuch-IPA** herunterladen. Das ist eine ZIP-Datei – entpacken, darin liegt `Kraftbuch.ipa`.

> Rotes Kreuz statt grünem Haken? Auf den Lauf klicken, den roten Schritt öffnen und mir die letzten Zeilen schicken – dann behebe ich das.

---

## Teil B – Auf das iPhone spielen (Windows)

**Einmalig vorbereiten**

1. **iTunes und iCloud von der Apple-Webseite** installieren – **nicht** aus dem Microsoft Store (die Store-Versionen funktionieren mit Sideloadly nicht; falls vorhanden, vorher deinstallieren):
   - iTunes: <https://www.apple.com/itunes/download/win64>
   - iCloud: <https://updates.cdn-apple.com/2020/windows/001-39935-20200911-1A70AA56-F448-11EA-8CC0-99D41950005E/iCloudSetup.exe>
   - Beide Links stehen auch auf der Sideloadly-Seite.
2. **Sideloadly** herunterladen und installieren: <https://sideloadly.io>
3. iPhone per **USB-Kabel** anschließen, entsperren und auf dem iPhone **„Diesem Computer vertrauen“** bestätigen.

**Installieren**

4. Sideloadly öffnen. Die Datei `Kraftbuch.ipa` in das Fenster ziehen.
5. Bei **Apple account** deine Apple-ID (E-Mail) eintragen und auf **Start** klicken. Passwort und ggf. den Bestätigungscode von deinem iPhone eingeben. Nach einer Minute meldet Sideloadly **Done**.
6. **Auf dem iPhone freigeben:**
   - **Einstellungen › Datenschutz & Sicherheit › Entwicklermodus** einschalten und das iPhone neu starten (nur beim ersten Mal).
   - **Einstellungen › Allgemein › VPN & Geräteverwaltung** › deine Apple-ID antippen › **Vertrauen**.
7. Kraftbuch auf dem Home-Bildschirm öffnen. Beim ersten Training fragt die App, ob sie **Mitteilungen** senden darf – erlauben, damit die Richtzeit-Meldung kommt.

---

## Teil C – Alle 7 Tage auffrischen

Mit einer kostenlosen Apple-ID läuft eine selbst installierte App **7 Tage**. Danach öffnet sie sich nicht mehr – deine Daten bleiben aber erhalten.

- iPhone anschließen, in Sideloadly wieder `Kraftbuch.ipa` mit **derselben Apple-ID** installieren. Die App wird überschrieben, alle Trainings bleiben drin.
- **Die App vorher nicht löschen** – sonst sind die Daten auf dem iPhone weg.
- Zur Sicherheit ab und zu in der App **Profil › Daten › Sicherung speichern** antippen und die Datei in „Dateien“ ablegen.
- Mit einer kostenlosen Apple-ID sind höchstens 3 solche Apps gleichzeitig möglich.

---

## Teil D – Deine bisherigen Daten mitnehmen

1. Kraftbuch in Claude öffnen › **Profil › Daten › Sicherung speichern** (oder **Sicherung kopieren**).
2. In der iPhone-App › **Profil › Daten › Sicherung laden** › Datei auswählen bzw. den kopierten Text einfügen › **Laden**.

So geht es auch umgekehrt von der App zurück in die Claude-Version.

---

## Fortschrittsfotos

- Nach dem Training (**Speichern & Fortschrittsfoto machen**) oder jederzeit unter **Verlauf › Fotos** ein Foto aufnehmen oder auswählen. Beim ersten Mal fragt das iPhone nach Kamera- bzw. Fotozugriff – erlauben.
- Oben links erscheinen Tag, Dauer, Übungen, Sätze, deine trainierten Muskeln und das Kraftbuch-Logo. **Teilen oder sichern** speichert das fertige Bild in deinen Fotos oder schickt es z. B. an Instagram; **Vergleichen** setzt zwei Tage nebeneinander.
- Die Fotos liegen nur auf deinem iPhone. **Sicherung speichern** nimmt sie mit; **Sicherung kopieren** enthält nur die Daten ohne Fotos.

## Gut zu wissen

- **Mitteilungen:** Die App meldet sich zur Richtzeit (einstellbar unter **Profil › Einstellungen › Richtzeit**), auch im Hintergrund und ohne Internet. Push-Nachrichten von einem Server bräuchten das kostenpflichtige Apple-Entwicklerprogramm (99 € im Jahr) – für Kraftbuch ist das nicht nötig.
- **Nur in der Claude-Version:** „Von Claude prüfen & ergänzen“ bei eigenen Übungen und die Synchronisierung mit deinem Claude-Konto. Die iPhone-App speichert alles auf dem iPhone.
- **Neue Version:** Wenn ich dir eine neue `www/index.html` schicke, ersetzt du die Datei im Repository (Ordner `www` › Datei öffnen › Stift-Symbol bzw. erneut hochladen). Der Bau startet dann automatisch neu.

## Was steckt im Ordner?

| Ordner / Datei | Inhalt |
|---|---|
| `www/` | die App selbst (läuft offline) |
| `src/native.js` | Verbindung zu Mitteilungen, Vibration, Speicher und Teilen-Menü des iPhones |
| `ios/` | das Xcode-Projekt mit App-Symbol und Startbild |
| `.github/workflows/ios.yml` | Bauanleitung für GitHub (erstellt die IPA ohne Signatur) |
| `resources/` | App-Symbol und Startbild als Bilddateien |
