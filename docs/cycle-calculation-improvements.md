# Cycle Phase Calculation — Analysis & Improvements

Current implementation: `store/phase.ts` → `CurrentPhaseInfo()`

---

## What's Done Right

1. **Luteal phase counted from cycle end** (`cycleDuration - 14`) — standard approach used by Flo, Clue, Ovia
2. **Day normalization** (`startOf('day')`) — avoids time-of-day drift
3. **Modular arithmetic** for cycling (`% cycleDuration`) — correctly handles multiple elapsed cycles
4. **Collapsed phase filtering** — good edge case handling for very short cycles
5. **Default values** (28-day cycle / 5-day period) — match medical averages

---

## Issues & Improvements

### P0 — Critical Bug

#### Not reactive (UI won't update)
```ts
// Current — snapshot, NOT a subscription
const state = useUserStore.getState();

// Fix — use selector so component re-renders on change
const startMenstruation = useUserStore((s) => s.startMenstruation);
const menstruationDuration = useUserStore((s) => s.menstruationDuration);
const cycleDuration = useUserStore((s) => s.cycleDuration);
```
**Impact:** If user data changes in the store, the UI stays stale until a full remount.

---

### P1 — Medical Accuracy

#### 1. Luteal phase: 14 days is an oversimplification
- Real average = **12.4 days** (Fehring et al., 2006)
- Normal range: **10–16 days**
- Stable for individual women (±1-2 days) but **varies between women**
- **Fix:** Store `lutealPhaseLength` as a configurable parameter in `useUserStore` (default: 14)

#### 2. Fertile window too narrow
- Current: 4 days (ovulation ± 2)
- Medical standard: **6 days** (5 days before ovulation + ovulation day)
- Sperm survival: up to 5 days. Egg survival: 12–24 hours
- **Fix:**
```ts
const fertileStart = ovulationDay - 5;
const fertileEnd = ovulationDay;
// Ovulation "phase" for display can remain shorter (e.g. 3 days around peak)
// But fertile window data should be exposed separately for calendar UI
```

#### 3. `cycleDates` calculated from stale start date
- If multiple cycles have passed, `start` points to the original period date
- Calendar shows wrong dates
- **Fix:**
```ts
const cyclesPassed = Math.floor(diffFromStart / finalCycleDuration);
const currentCycleStart = start.add(cyclesPassed * finalCycleDuration, 'day');
const cycleDates = Array.from({ length: finalCycleDuration }, (_, i) =>
  currentCycleStart.add(i, 'day')
);
```

---

### P2 — Edge Cases & Validation

#### 1. No cycle length validation
- Cycles <21 days (**polymenorrhea**) — fertile window may overlap with menstruation
- Cycles >35 days (**oligomenorrhea**) — common with PCOS (VYO's focus!)
- **Fix:** Clamp cycle to 15–90 days, show medical warning outside 21–35 range

#### 2. No handling for PCOS/endo-specific patterns
- PCOS: cycles often 35–90 days, ovulation unpredictable
- Endometriosis: may have normal cycle length but heavier/longer periods
- **Fix:** When diagnosis = PCOS, show "low confidence" indicator for ovulation prediction, recommend LH tests

#### 3. No "period late" detection
- If current day > expected period start + 7 days — should notify
- Flo shows "period is late" after 7 days, suggests pregnancy test if applicable

---

### P3 — Prediction Accuracy

#### 1. No cycle history / Weighted Moving Average
- Currently uses only ONE cycle (last `startMenstruation`)
- Flo/Clue use **weighted moving average** from last 3–6 cycles:
```ts
function predictCycleLength(cycles: number[]): number {
  const recent = cycles.slice(-6);
  const weights = [0.35, 0.25, 0.20, 0.10, 0.05, 0.05];

  let sum = 0;
  let weightSum = 0;
  for (let i = 0; i < recent.length; i++) {
    sum += recent[recent.length - 1 - i] * weights[i];
    weightSum += weights[i];
  }

  return Math.round(sum / weightSum);
}
```

#### 2. No prediction confidence level
- With <3 recorded cycles: show "estimated" label
- With 3+ cycles and low variance: show "predicted"
- With irregular cycles (CV > 15%): show date range instead of exact date
```ts
type Confidence = 'estimated' | 'predicted' | 'low_confidence';
```

#### 3. Next period prediction
- Basic: `next_period = last_period_start + predicted_cycle_length`
- With WMA: more accurate over time
- With irregular cycles: show range `[shortest - 2, longest + 2]`

---

## Industry Reference

### How top apps calculate phases

| App | Ovulation method | Luteal default | Irregular handling |
|---|---|---|---|
| **Flo** | Calendar + ML | 14 days | Expands fertile window, "low confidence" |
| **Clue** | Calendar + Bayesian | 14 days | Range prediction after 6+ cycles |
| **Natural Cycles** | BBT (FDA approved) | Measured from BBT | Binary red/green days |
| **Ovia** | Calendar + LH input | 14 days | Uses min/max from 6 months |

### Key medical references
- Wilcox et al., NEJM 1995 — fertile window = 6 days
- Fehring et al., 2006 — average luteal phase = 12.4 days (not 14)
- Standard Days Method (Georgetown University) — days 8–19 fertile for 26–32 day cycles

---

## Proposed Data Model Changes

### New fields in `useUserStore`
```ts
// Configurable luteal phase (P1)
lutealPhaseLength: number; // default: 14, range: 10–16

// Cycle history for WMA prediction (P3)
cycleHistory: { startDate: string; length: number }[];

// Diagnosis-aware confidence (P2)
cycleRegularity: 'regular' | 'irregular' | 'unknown';
```

### New fields in `PhaseResult`
```ts
// Fertile window separate from ovulation phase (P1)
fertileWindow: { start: number; end: number };

// Prediction confidence (P3)
confidence: 'estimated' | 'predicted' | 'low_confidence';

// Next period prediction (P3)
nextPeriodStart: Dayjs;
nextPeriodRange?: { earliest: Dayjs; latest: Dayjs };
```

---

## Implementation Order

| Step | Priority | Scope | Estimate |
|---|---|---|---|
| Fix reactivity (`getState` → selector) | P0 | `store/phase.ts` | Small |
| Add `lutealPhaseLength` to store + use it | P1 | store + phase.ts | Small |
| Fix fertile window to 6 days | P1 | `store/phase.ts` | Small |
| Fix `cycleDates` to current cycle | P1 | `store/phase.ts` | Small |
| Add cycle length validation (15–90) | P2 | `store/phase.ts` + UI | Medium |
| PCOS/endo confidence indicators | P2 | phase.ts + UI | Medium |
| Cycle history + WMA prediction | P3 | store + Supabase migration | Large |
| Prediction confidence level | P3 | phase.ts + UI | Medium |
| Next period prediction with range | P3 | phase.ts + calendar UI | Medium |
