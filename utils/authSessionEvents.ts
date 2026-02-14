let manualSignOutAt = 0;

const MANUAL_SIGN_OUT_WINDOW_MS = 10_000;

export function markManualSignOut() {
  manualSignOutAt = Date.now();
}

export function consumeManualSignOutFlag() {
  const isManualSignOut = Date.now() - manualSignOutAt < MANUAL_SIGN_OUT_WINDOW_MS;

  if (isManualSignOut) {
    manualSignOutAt = 0;
  }

  return isManualSignOut;
}
