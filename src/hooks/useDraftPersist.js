// ─────────────────────────────────────────────
// useDraftPersist.js — Session Draft Persistence
// ─────────────────────────────────────────────
// Saves user's progress to sessionStorage so that
// accidental refresh or tab sleep never loses data.

import { useEffect } from 'react';

const DRAFT_KEY = 'photo_contest_draft';

export const saveDraft = (data) => {
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage full or unavailable — fail silently
  }
};

export const loadDraft = () => {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const clearDraft = () => {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
};

/**
 * Hook: auto-saves draft on every state change.
 * @param {{ step, employeeId, userData }} state
 */
const useDraftPersist = (state) => {
  useEffect(() => {
    if (state.step > 1 || state.employeeId) {
      saveDraft(state);
    }
  }, [state.step, state.employeeId, state.userData]);
};

export default useDraftPersist;
