import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { storage } from '@/lib/storage';

const STORAGE_KEY = 'aurin.settings.v1';

export type ExperienceLevel = 'new' | 'some' | 'seasoned';
export type RitualTime = 'morning' | 'evening' | 'anytime';

export type Settings = {
  /** Preferred deck tradition (Deck.id), or null for "no preference". */
  defaultDeckId: string | null;
  /** Preferred spread shape (a SPREADS key), or null. */
  defaultSpreadKey: string | null;
  /** Whether the user has finished (or skipped) the first-run onboarding. */
  onboardingComplete: boolean;
  /** Tarot experience, captured during onboarding. */
  experienceLevel: ExperienceLevel | null;
  /** When the user likes to read — for future reminders. */
  ritualTime: RitualTime | null;
  /** What brings them to Aurín — a free intention picked during onboarding. */
  intention: string | null;
  /** ISO date (YYYY-MM-DD) of the last completed daily ritual, or null. */
  lastRitualDate: string | null;
};

const DEFAULT_SETTINGS: Settings = {
  defaultDeckId: null,
  defaultSpreadKey: null,
  onboardingComplete: false,
  experienceLevel: null,
  ritualTime: null,
  intention: null,
  lastRitualDate: null,
};

type SettingsContextValue = {
  settings: Settings;
  /** True until the persisted settings have loaded from storage. */
  hydrating: boolean;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [hydrating, setHydrating] = useState(true);

  // Load persisted settings once on mount.
  useEffect(() => {
    let active = true;
    storage.getJSON<Partial<Settings>>(STORAGE_KEY).then((saved) => {
      if (active && saved) {
        setSettings((prev) => ({ ...prev, ...saved }));
      }
      if (active) setHydrating(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<SettingsContextValue>(
    () => ({
      settings,
      hydrating,
      setSetting: (key, val) => {
        setSettings((prev) => {
          const next = { ...prev, [key]: val };
          void storage.setJSON(STORAGE_KEY, next);
          return next;
        });
      },
    }),
    [settings, hydrating],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}
