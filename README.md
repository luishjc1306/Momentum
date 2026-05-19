# Momentum
Personalized AI wellness coaching platform combining habit tracking, recovery insights, gamification, and behavioral reinforcement.

A mobile-first React + Vite wellness tracking MVP for personal weight-loss and habit coaching. It tracks calories, macros, workouts, walking/cardio, sleep, weight trends, streaks, quests, achievements, XP, and mock AI coach feedback.

This is positioned as a wellness and lifestyle coaching app only. It does not provide diagnosis, treatment recommendations, or disease-specific claims.

## Run locally

```bash
npm install
npm run dev
```

## Tech stack

- React + Vite
- TypeScript
- Tailwind CSS
- Recharts
- lucide-react icons
- localStorage persistence

## Architecture notes

- `src/types.ts` defines the app data model.
- `src/data/storage.ts` is the localStorage repository boundary. Swap this for Supabase, Firebase, or an API client later.
- `src/utils/coach.ts` contains the mock AI coach logic. A future OpenAI or server-side coach endpoint can replace this function.
- `src/data/seedData.ts` includes the sample goals, logs, achievements, quests, and preferred foods.
- Screens live in `src/screens`, while reusable UI pieces live in `src/components`.

## Future integration points

- Authentication and user profiles
- Backend database sync
- Apple Health, Oura Ring, and WHOOP imports
- Macro/micronutrient database
- Barcode scanning
- Photo food logging
- Voice logging
- Paid subscription gates
