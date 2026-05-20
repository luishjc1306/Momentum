import { useEffect, useMemo, useState } from 'react';
import { loadState, resetState, saveState } from '../data/storage';
import { buildQuests, createInitialState } from '../data/seedData';
import type { StoredWellnessState, UserGoals, UserProfile } from '../types';

export const useWellnessState = () => {
  const [state, setState] = useState<StoredWellnessState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  const quests = useMemo(() => (state ? buildQuests(state) : []), [state]);

  const completeOnboarding = (profile: UserProfile, goals: UserGoals) => {
    setState(createInitialState(profile, goals));
  };

  const resetAppData = () => {
    resetState();
    setState(null);
  };

  return { state, setState, quests, completeOnboarding, resetAppData };
};
