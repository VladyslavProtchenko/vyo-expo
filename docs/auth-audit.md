# Authentication System Audit

## Current Architecture

```
config/supabase.ts          — Supabase client (AsyncStorage, auto-token)
contexts/session.tsx        — SessionProvider + useSession() hook
hooks/useSupabaseAuth.ts    — signIn, signUp, signOut, OTP, resetPassword
hooks/useGoogleSignIn.ts    — Google OAuth (browser-based)
hooks/useAuthCleanup.ts     — cleanup on logout (Zustand, React Query)
hooks/useDeleteAccount.ts   — account deletion via RPC
hooks/useLoadUserData.ts    — load profile on login
utils/authSessionEvents.ts  — manual sign-out flag (vs session expiry)
types/validationSchemas.ts  — Zod schemas for all auth forms
```

### Auth Flow

```
SessionProvider (onAuthStateChange)
  ├─ INITIAL_SESSION → validate token via getUser()
  │   ├─ valid   → setSession, Sentry.setUser
  │   └─ invalid → signOut, clear session
  ├─ SIGNED_IN  → update session
  └─ SIGNED_OUT → clear session, show toast if expired
```

### Route Protection

- `app/_layout.tsx` uses `Stack.Protected` with `guard` prop
- Public screens: index, login, email-login, email-registration, email-reset-password, account-deleted
- Protected screens: (tabs), onboarding, symptoms, calendar, profile, etc.

### Supported Auth Methods

| Method | Implementation |
|--------|---------------|
| Email/Password | `useSignIn()` / `useSignUp()` — standard Supabase auth |
| OTP (password reset) | `useResetPassword()` → `useVerifyOTP()` → `useUpdatePassword()` |
| Google OAuth | Browser-based via `expo-web-browser` + manual token parsing |
| Account deletion | `supabase.rpc('delete_user_account')` |

### What Works Well

- SessionProvider with server-side token validation on app start
- Manual sign-out vs session expiry distinction (`authSessionEvents`)
- Sentry integration (breadcrumbs, user context, error capture)
- Zod validation on all auth forms (email, password, OTP code)
- Auth cleanup on logout (Zustand stores + React Query cache)
- `useMemo` for context value to prevent unnecessary re-renders

---

## Issues Found

### 1. Storage: AsyncStorage (unencrypted, async)

**Current** (`config/supabase.ts`):
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase = createClient(url, key, {
  auth: { storage: AsyncStorage },
});
```

**Recommended** (Expo docs):
```typescript
import 'expo-sqlite/localStorage/install';

export const supabase = createClient(url, key, {
  auth: { storage: localStorage }, // synchronous, built-in
});
```

- `expo-sqlite/localStorage` is the officially recommended storage for Expo + Supabase
- Synchronous API — faster session restoration on app start
- Removes `@react-native-async-storage/async-storage` dependency

**Priority**: High | **Effort**: Low

---

### 2. Google OAuth: Browser-based instead of Native

**Current** (`hooks/useGoogleSignIn.ts`):
- Opens system browser via `expo-web-browser`
- User leaves the app, authenticates in browser, returns
- Manual parsing of callback URL for tokens (search params + hash fallback)
- Hardcoded redirect URL: `com.vyo://auth/callback`

**Recommended** (Supabase docs):
```typescript
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({ webClientId: 'YOUR_CLIENT_ID' });

const signIn = async () => {
  await GoogleSignin.hasPlayServices();
  const response = await GoogleSignin.signIn();
  if (response.data?.idToken) {
    await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.data.idToken,
    });
  }
};
```

Benefits:
- Native account picker UI (no browser redirect)
- More secure (no tokens in URLs)
- No manual URL/token parsing
- Better UX on both platforms

**Priority**: High | **Effort**: Medium

---

### 3. Unnecessary Polyfill

**Current** (`config/supabase.ts`):
```typescript
import 'react-native-url-polyfill/auto';
```

React Native 0.81 (used in this project) includes the URL API natively. This polyfill is no longer needed.

**Priority**: Low | **Effort**: Low

---

### 4. Token Storage Security

**Current**: Auth tokens stored in AsyncStorage without encryption.

**Recommended** (Supabase docs): `LargeSecureStore` pattern — AES-256 encryption with key in `expo-secure-store`:
- Encryption key → SecureStore (Keychain on iOS / Keystore on Android)
- Encrypted session data → AsyncStorage (or localStorage)

This is especially relevant for a health app handling medical data.

**Priority**: Medium | **Effort**: Medium

---

### 5. Registration Race Condition (BUG — data not saving on onboarding step-1)

**Symptom**: After account creation, onboarding step-1 fails to save profile/medical data.

**Root cause**: `email-registration/index.tsx` has a race condition in the post-signUp flow.

**Current** (`app/email-registration/index.tsx:70-90`):
```typescript
const result = await signUp(data.email, data.password, data.name);
if (result.success) {
  await new Promise(resolve => setTimeout(resolve, 500)); // arbitrary wait
  const { data: { session } } = await supabase.auth.getSession(); // race condition
  if (session?.user) {
    await supabase.from('profiles').update({ ... }).eq('id', session.user.id);
  }
  router.replace('/onboarding/step-1');
}
```

Three problems:
1. `signUp()` already returns `result.data.session` — no need for setTimeout + getSession
2. If `getSession()` returns null (race), consent update is silently skipped
3. On step-1, `useUpdateMedicalData` inserts into `medical_data` with FK `REFERENCES profiles(id)` — if trigger `handle_new_user` hasn't created the profile yet → FK violation

**Fix**:
1. Use session from `signUp()` response directly — remove setTimeout + getSession
2. Use `upsert` for consent fields (profile already created by trigger, but guarantee it)
3. In `useUpdateMedicalData`, ensure profile exists before inserting medical_data

**Priority**: Critical | **Effort**: Low

---

## Action Plan

| # | Task | Impact | Effort | Status |
|---|------|--------|--------|--------|
| 5 | Fix registration race condition | Critical bug fix | Low | TODO |
| 1 | Replace `AsyncStorage` with `expo-sqlite/localStorage` | Performance, fewer deps | Low | TODO |
| 2 | Replace browser OAuth with native `@react-native-google-signin` | UX, security | Medium | TODO |
| 3 | Remove `react-native-url-polyfill/auto` | Clean deps | Low | TODO |
| 4 | Add `LargeSecureStore` (AES-256 encrypted storage) | Security | Medium | TODO |

### Files to Modify

**Item 5 (race condition fix)**:
- `app/email-registration/index.tsx` — use session from signUp response, remove setTimeout
- `hooks/useUpdateMedicalData.ts` — ensure profile exists before FK insert

**Items 1, 3, 4**:
- `config/supabase.ts` — storage + remove polyfill

**Item 2**:
- `hooks/useGoogleSignIn.ts` — rewrite to native Google Sign-In
- `package.json` — add `@react-native-google-signin/google-signin`, remove `react-native-url-polyfill`
- `app.json` — add Google Sign-In config plugin if needed
