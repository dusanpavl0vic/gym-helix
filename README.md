<p align="center"><img src="assets/brand/wordmark.png" alt="GymPersonal" width="560"></p>

# GymPersonal

Offline trening planer (Expo, React Native, TypeScript). Rotacija Full Body A → B → C bez vezivanja za dane u nedelji,
double progression, RIR, deload, kardio, telesne mere, grafici napretka i backup — sve lokalno na telefonu.

## Pokretanje

```bash
npm install
npx expo start          # skeniraj QR kod u Expo Go aplikaciji (Android)
```

APK (preko EAS Build, traži Expo nalog):

```bash
npx eas-cli@latest login
npx eas-cli@latest build -p android --profile preview
```

## Skripte

| Komanda | Opis |
|---|---|
| `npm test` | Jest testovi (rotacija, deload, progresija, pločice, analitika, i18n ključevi) |
| `npm run typecheck` | TypeScript provera |
| `npm run generate:brand` | Iz `src/constants/brand.ts` generiše ikonicu, Android adaptive ikonicu, splash, favicon i baner |
| `npm run fetch:exercises` | Povlači slike vežbi iz free-exercise-db u `assets/exercises/` i generiše `exercises.generated.ts` |

## Arhitektura

```
src/
├── app/            Expo Router rute (samo tanki fajlovi)
├── components/     ui/ (dizajn sistem) i common/ (layout, grafici, animacije)
├── features/       home, plan, programs, workout, exercises, progress, body, cardio, plates, backup, settings
│                   └ screens/ components/ hooks/ helpers/ logic/ store/ db/
├── hooks/          globalni hookovi
├── lib/            db (expo-sqlite), i18n (sr/en), notifikacije, zvuk, fajlovi, provideri
├── store/          Redux Toolkit + redux-persist
├── types/          domenski tipovi
├── constants/      boje, tipografija, razmaci, radijusi, trening, tajmer…
└── helpers/, utils/
```

Svaka komponenta ima svoj folder: `X.tsx`, `X.styles.ts`, `X.types.ts`, `index.ts`.
