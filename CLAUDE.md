# VYO — Expo Mobile App

## Project Overview

**VYO** is a women's health mobile app focused on menstrual cycle tracking, endometriosis, PCOS, and primary dysmenorrhea management. Features include:
- Cycle phase tracking (menstrual, follicular, ovulation, luteal)
- Symptom and pain management
- Phase-based care plans and nutrition recommendations
- Video lessons, articles, shopping lists
- Multi-step diagnostic quiz (endometriosis, PCOS, primary dysmenorrhea scoring)

**Platforms**: iOS, Android, Web (via Expo)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo ~54 + React Native 0.81 |
| Language | TypeScript ~5.9 (strict mode) |
| Navigation | Expo Router ~6 (file-based) |
| State | Zustand ^5 (local) + TanStack Query ^5 (server) |
| Backend | Supabase ^2 (PostgreSQL + Auth) |
| Forms | React Hook Form ^7 + Zod ^4 |
| Animations | React Native Reanimated ~4 + Lottie |
| Styling | React Native StyleSheet (no Tailwind/CSS) |
| Fonts | Poppins (Regular/Medium/SemiBold/Bold) + ArchivoBlack |
| Icons | Lucide React Native |
| i18n | i18next + react-i18next (EN / UK) |
| Dates | dayjs |
| Local storage | AsyncStorage |

---

## Project Structure

```
app/                        # File-based routing (expo-router)
  _layout.tsx               # Root layout: SessionProvider, QueryClient, ThemeProvider
  index.tsx                 # Login screen
  (tabs)/                   # Tab group (home, care-plan)
  onboarding/               # Multi-step onboarding
  symptoms/                 # Symptom survey
  pain-steps/               # Multi-step pain quiz
  calendar/                 # Cycle calendar
  phase/                    # Cycle phase info
  profile/                  # User profile
  products/                 # Food/product recommendations
  ...

components/                 # Reusable components
  ui/                       # Low-level UI primitives (ButtonGradient, Input, Slider, etc.)

store/                      # Zustand stores
  useUserStore.ts           # Full user profile (cycle data, diagnoses, symptoms, scores)
  useProducts.ts            # Products/nutrition state
  useSymptoms.tsx           # Symptoms state
  phase.ts                  # Cycle phase logic

hooks/                      # Custom hooks (one domain per file)
  useSupabaseAuth.ts        # Auth: signIn, signUp, signOut, OTP, Google
  useLoadUserData.ts        # Load user profile via React Query
  useDiagnosisData.ts       # Diagnosis scoring logic
  getEndo.ts / getPCOS.ts / getPrimaryDysmenorrhea.ts

contexts/
  session.tsx               # SessionProvider + useSession()

config/
  supabase.ts               # Supabase client with AsyncStorage
  i18n.ts                   # i18next init

constants/
  theme.ts                  # Colors, fonts
  typography.ts             # Typography scale
  phases.ts                 # Phase definitions
  sleepTips.ts

types/
  types.ts                  # RootStackParamList, TabParamList
  validationSchemas.ts      # Zod schemas for all forms
  diagnosis.ts              # Diagnosis types

locales/
  en.json                   # English translations
  uk.json                   # Ukrainian translations

migrations/                 # Supabase SQL migrations
supabase/                   # Supabase project config
scripts/                    # Dev utility scripts
assets/                     # Static files (images, fonts, animations)
```

---

## Architecture Conventions

### State Management
- **Zustand** for local UI/user state (useUserStore is the main store)
- **React Query** for all server data — always use `useQuery` / `useMutation`, never raw Supabase calls in components
- **React Context** only for session (auth status)

### Navigation
- File-based routing via Expo Router — no manual navigation config
- Route protection via `Stack.Protected` in `_layout.tsx`
- Typed routes enabled (`typedRoutes: true` in `app.json`)

### Forms
- Always use React Hook Form + Zod resolver
- Zod schemas live in `types/validationSchemas.ts`
- No manual form state management

### Styling
- React Native `StyleSheet.create()` only — no inline styles, no Tailwind
- Gradients via `expo-linear-gradient`
- Colors from `constants/theme.ts` — never hardcode hex values in components

### Localization
- All user-facing strings must use `useTranslation()` from `react-i18next`
- Translation keys in `locales/en.json` and `locales/uk.json`
- Never hardcode display text in components

### Diagnosis System
- Scoring functions: `getEndo()`, `getPCOS()`, `getPrimaryDysmenorrhea()` in hooks/
- Scores stored in Zustand (`primaryScore`, `secondaryScore`, `menstrualPainScore`)
- Results persisted to Supabase `diagnosis_results` table

---

## Key Commands

```bash
# Development
npx expo start              # Start dev server
npx expo start --web        # Web version
npx expo run:ios            # Run on iOS
npx expo run:android        # Run on Android

# Code quality
npx expo lint               # ESLint check

# Scripts
node scripts/convert-to-webp.js       # Convert images to WebP
node scripts/rename-to-kebab-case.js  # Rename files to kebab-case
```

---

## Environment Variables

Required in `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
```

Never commit `.env` — use `.env.example` as reference.

---

## Supabase Tables (key)

| Table | Purpose |
|---|---|
| `profiles` | User profile (name, avatar, age, weight, height) |
| `medical_data` | Cycle data (startMenstruation, duration, flow, symptoms) |
| `diagnosis_results` | Diagnosis scores and classification |

---

## Do Not

- No `any` types — use precise types or `unknown`
- No inline styles — use `StyleSheet.create()`
- No hardcoded colors — import from `constants/theme.ts`
- No hardcoded strings — use i18n keys
- No raw Supabase calls in components — go through hooks/React Query
- No skipping TypeScript strict mode
- No adding dependencies without checking bundle size and maintenance status
- No tests currently — do not add Jest/Vitest without discussion
