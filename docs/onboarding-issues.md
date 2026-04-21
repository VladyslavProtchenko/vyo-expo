# Onboarding — Issues & Improvement Plan

## Flow Overview

11 steps total, but 3 possible exit points:
- **Step 7** — user says "no pain" → computes PCOS → exits to `/sync-data`
- **Step 10** — `getPrimaryDysmenorrhea()` ≠ endometriosis → computes PCOS → exits
- **Step 11** — final step (surgery + additional symptoms) → exits to `/sync-data`

### Step Data Map

| Step | Collects | Saves to | Forward | Early exit? |
|------|----------|----------|---------|-------------|
| 1 | Age, cycle start, menstruation duration, cycle duration | `profiles` + `medical_data` | → 2 | No |
| 2 | Weight, height, waist, hips, unit system | `profiles` | → 3 | No |
| 3 | Diagnosed conditions (multi-select) | `medical_data` + premature `diagnosis` | → 4 | No |
| 4 | Additional symptoms (PCOS indicators) | `medical_data` | → 5 | No |
| 5 | Menstrual symptoms | `medical_data` | → 6 | No |
| 6 | Flow intensity, regularity | `medical_data` | → 7 | No |
| 7 | Pain yes/no, intensity, pain types | `medical_data` | → 8 or `/sync-data` | **YES** (no pain) |
| 8 | Pain period, location, duration | `medical_data` | → 9 | No |
| 9 | Pain triggers, medicine effect | `medical_data` | → 10 | No |
| 10 | Pain change over time | `medical_data` + conditional `diagnosis` | → 11 or `/sync-data` | **YES** (not endo) |
| 11 | Surgery history, additional symptoms | `medical_data` + final `diagnosis` | → `/sync-data` | No |

---

## Critical Issues

### P0-1: Diagnosis computed at multiple steps, overwrites itself

- **Step 3**: Sets `diagnosis = 'endometriosis'` just because user selected the condition — premature, missing `endo_type`, `is_endo_surgery`, `is_endo_additional`
- **Step 7** (no pain): Overwrites with PCOS diagnosis
- **Step 10**: Recomputes via `getPrimaryDysmenorrhea()`, may overwrite again
- **Step 11**: Final computation, but only considers surgery data

**Result**: Same user gets different diagnosis depending on which step they exit at.

**Fix**: Remove all intermediate diagnosis writes. Compute diagnosis ONCE at the exit point (Step 7/10/11) using ALL collected data.

### P0-2: Race conditions on chained mutations

Step 1 chains: `updateProfile()` → onSuccess → `updateMedical()`. If profile succeeds but medical fails, user navigates to Step 2 with partial data saved.

Same pattern in Steps 7, 10, 11 where multiple mutations fire sequentially.

**Fix**: Wrap dependent mutations in try/catch with proper error handling. Don't navigate until ALL mutations succeed.

### P0-3: `initialized.current` prevents form re-initialization

All steps use `useRef(false)` flag. If mutation triggers refetch of `useOnboardingData`, the query cache updates but the form stays stale because the flag is already `true`.

**Fix**: Use `data` as source of truth for `defaultValues`. Reset flag when step component unmounts, or derive form state from query data directly.

---

## High Priority Issues

### P1-1: Inconsistent exit destinations

- SkipQuiz → `/(tabs)/home`
- Early exit (Step 7, 10) → `/sync-data`
- Normal completion (Step 11) → `/sync-data`

**Fix**: All exits → `/sync-data`. SkipQuiz should also go to `/sync-data`.

### P1-2: Progress bar shows 11 steps for everyone

User who exits at Step 7 (no pain) sees 63% → then quiz ends. Misleading.

**Fix**: Calculate total steps dynamically based on answers. If no pain → total = 7, progress = 100% at Step 7.

### P1-3: Step 7 forces pain = true for endo/adenomyosis users

If user selected Endometriosis/Adenomyosis in Step 3, Step 7 auto-sets `isPain = true`. But if they skip quiz at Step 7, pain detail steps (8-11) are never answered — incomplete diagnosis data.

**Fix**: Either don't force the value, or ensure skip at Step 7 still saves appropriate data.

---

## Medium Priority Issues

### P2-1: Typo in diagnosis calculation

`getPrimaryDysmenorrhea.ts` uses `'Weel relieve'` — should be `'Well relieve'`. Also in types definition.

### P2-2: `is_regular_period` stored as array, but single-select

Step 6 allows only one selection but wraps it in array: `[period]`. Should be a plain string.

### P2-3: Missing validations before diagnosis computation

- Step 4 can be empty, but PCOS scoring depends on it
- No check that all required fields exist before running `getPCOS()` / `getPrimaryDysmenorrhea()`

### P2-4: No rollback on partial save failure

If `updateProfile` succeeds but `updateDiagnosis` fails — tables are out of sync. No retry or rollback mechanism.

---

## Implementation Plan

### Phase 1 — Fix diagnosis logic (P0-1)
1. Remove `updateDiagnosis` call from Step 3
2. Create unified `computeFinalDiagnosis()` function that takes ALL medical data
3. Call it only at exit points: Step 7 (no pain), Step 10 (not endo), Step 11 (final)
4. Each exit point passes full medical data snapshot to the same function

### Phase 2 — Fix mutations & navigation (P0-2, P0-3)
1. Wrap chained mutations in async functions with try/catch
2. Navigate only after all mutations succeed
3. Show error toast on failure instead of navigating
4. Replace `initialized.current` pattern with controlled form state

### Phase 3 — UX consistency (P1-1, P1-2, P1-3)
1. All exits (skip, early, normal) → `/sync-data`
2. Dynamic progress calculation based on expected total steps
3. Review forced values in Step 7

### Phase 4 — Data cleanup (P2-*)
1. Fix `'Weel relieve'` typo
2. Migrate `is_regular_period` from array to string
3. Add validation guards before diagnosis computation
