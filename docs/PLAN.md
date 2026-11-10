# PLAN: Wie die App gebaut wird

Diese Datei füllt /plan aus docs/SPEC.md.

## Stack

Siehe docs/STACK.md. Keine Abweichungen.

## Ordner und Dateien

- `docs/SPEC.md` und `docs/TASKS.md` (durch `/plan`): Plan für Bau 1, Look Aurora.
- `src/` und alle Konfigurationsdateien: legt `scripts/setup.mjs` in Task 1 wörtlich an (siehe STACK.md, «Dateien für Task 1»).
- `src/features/tasks/model.ts`: Typ `Task` plus reine Funktionen addTask, toggleTask, removeTask.
- `src/features/tasks/model.test.ts`: Tests für die Modell-Funktionen.
- `src/lib/storage.ts`: localStorage lesen, schreiben, migrieren (`loadState`, `saveState`).
- `src/lib/storage.test.ts`: Tests für `loadState`/`saveState` inklusive kaputtem JSON.
- `src/features/tasks/useTasks.ts`: React-Hook, verbindet `model.ts` mit `storage.ts`.
- `src/features/tasks/useTasks.test.ts`: Tests für den Hook.
- `src/features/tasks/components/TaskList.tsx`: Liste mit AnimatePresence-Animation (DESIGN.md, Rezept 4).
- `src/features/tasks/components/TaskCard.tsx`: Karte mit Checkbox, Durchstreichen, Löschen (Rezept 3).
- `src/features/tasks/components/TaskCard.test.tsx`: Tests für Karte.
- `src/features/tasks/components/TaskInput.tsx`: Eingabefeld mit Plus-Knopf (Rezept 2).
- `src/features/tasks/components/TaskInput.test.tsx`: Tests für Eingabe.
- `src/features/tasks/components/EmptyState.tsx`: leerer Zustand mit Look-Illustration (Rezept 5).
- `src/components/ProgressRing.tsx`: Fortschrittsring im Kopf (Rezept 1).
- `src/components/ProgressRing.test.tsx`: Tests für den Ring.
- `src/lib/useHotkey.ts`: Hook, «N» fokussiert die Eingabe (Rezept 9).
- `src/lib/celebrate.ts`: kapselt den Konfetti-Aufruf, damit er im Test ersetzbar ist (Rezept 3).
- `src/lib/theme.ts`: liest Konfetti-Farben aus den CSS-Variablen (DESIGN.md, «Werte für JavaScript»).
- `src/App.tsx`: App-Rahmen mit Hero, Fortschrittsring, TaskList (Rezept 1).

## Datenmodell

```ts
localStorage "hwz-todo" = { version: 1, tasks: Task[] }

export type Task = {
  id: string // crypto.randomUUID()
  title: string // getrimmt, 1 bis 200 Zeichen
  done: boolean
  createdAt: number // Date.now()
}
```

`loadState` gibt bei fehlendem Schlüssel oder kaputtem Inhalt `{ version: 1, tasks: [] }` zurück. `saveState` speichert nach jeder Änderung den ganzen Zustand. Erst mit Bau 2 (Board) wird `done` durch `status` ersetzt (Version 2, Migration).

## Komponenten

- ProgressRing: SVG-Ring mit erledigt/gesamt in der Mitte, spring-federt (DESIGN.md, Rezept 1).
- TaskInput: Eingabefeld mit Plus-Knopf, Enter fügt hinzu, leeres Feld schüttelt (Rezept 2).
- TaskCard: Karte mit Checkbox, animierter Durchstreichung, Lösch-Knopf mit Toast «Rückgängig», Konfetti beim Abhaken (Rezept 3).
- TaskList: Liste mit AnimatePresence, Karten gleiten herein und hinaus, sortieren gleitet (Rezept 4).
- EmptyState: Illustration des Looks plus freundlicher Satz, wenn keine Aufgaben da sind (Rezept 5).

## Risiken

- Kaputter oder fehlender Inhalt im localStorage stürzt die App ab: `loadState` fängt das ab und gibt eine leere Liste zurück (AGENTS.md, Regel 9).
- Konfetti stört Tests oder läuft mit «Bewegung reduzieren» weiter: Aufruf in `celebrate.ts` kapseln, im Test ersetzen, `prefers-reduced-motion` respektieren.
- Ein knappes Zeichen-Layout bei 200 Zeichen: Karten mit `min-w-0` und `[overflow-wrap:anywhere]` (Rezept 7), auf 360 px geprüft.
