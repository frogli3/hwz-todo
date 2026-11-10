# SPEC: Was die App können muss

Diese Datei füllt /spec. Ein ausgefülltes Beispiel steht in docs/PROMPTS.md unter «Beispiel einer SPEC».

## Ziel

Eine persönliche ToDo-App, mit der ich Aufgaben schnell erfassen, abhaken und löschen kann.

## Muss

- Eine neue Aufgabe in einem Eingabefeld erfassen und mit Enter oder einem Plus-Knopf hinzufügen.
- Aufgaben untereinander als Karten anzeigen, mit einem Häkchen zum Abhaken und einem Lösch-Knopf.
- Der Fortschrittsring oben zeigt an, wie viele der Aufgaben bereits erledigt sind.
- Aufgaben bleiben nach dem Neuladen der Seite erhalten.
- Das Feld schüttelt sich kurz, wenn ich versuche, eine leere Aufgabe hinzuzufügen.

## Look

Aurora

## Nicht

- Kein Login, kein Server. Die Daten bleiben im Browser.
- Keine Prioritäten, keine Termine, keine Kategorien.
- Kein Board mit mehreren Spalten, kein Drag and Drop (kommt in Bau 2).

## Fertig, wenn

1. Leere Eingabe
   - Gegeben: Das Eingabefeld ist leer oder enthält nur Leerzeichen.
   - Wenn: Ich Enter drücke.
   - Dann: Wird keine Aufgabe hinzugefügt und das Feld schüttelt sich kurz.

2. 200 Zeichen
   - Gegeben: Ich tippe einen Titel mit mehr als 200 Zeichen ein.
   - Wenn: Ich die Aufgabe hinzufüge.
   - Dann: Wird der Titel auf 200 Zeichen gekürzt, bricht in der Karte um und läuft nicht aus der Karte hinaus.

3. Neu laden
   - Gegeben: Ich habe Aufgaben erfasst, davon einige abgehakt.
   - Wenn: Ich die Seite neu lade.
   - Dann: Sind alle Aufgaben samt ihrem erledigt-Zustand noch da.

4. Abhaken
   - Gegeben: Eine offene Aufgabe ist sichtbar.
   - Wenn: Ich das Häkchen setze.
   - Dann: Wird der Text animiert durchgestrichen, es gibt Konfetti und der Zähler im Ring steigt; ein zweiter Klick macht es rückgängig.

5. Schmales Fenster
   - Gegeben: Das Fenster ist 360 px breit.
   - Wenn: Ich die App bediene, auch mit einem langen Titel.
   - Dann: Ist alles lesbar und bedienbar, ohne seitliches Scrollen.

6. Aufgabe erfassen
   - Gegeben: Das Eingabefeld ist sichtbar und fokussiert.
   - Wenn: Ich einen Titel tippe und Enter drücke.
   - Dann: Erscheint die neue Aufgabe oben in der Liste, das Feld ist leer und bleibt fokussiert.

7. Aufgabe löschen
   - Gegeben: Eine Aufgabe ist sichtbar.
   - Wenn: Ich den Lösch-Knopf drücke.
   - Dann: Verschwindet die Aufgabe aus der Liste und es erscheint eine Meldung mit «Rückgängig», die die Aufgabe wiederherstellt.

8. Fortschritt
   - Gegeben: Es sind mehrere Aufgaben vorhanden, einige erledigt.
   - Wenn: Ich den Fortschrittsring anschaue.
   - Dann: Zeigt er die Zahl der erledigten von allen Aufgaben, z. B. «3/5».

## Features

(leer)
